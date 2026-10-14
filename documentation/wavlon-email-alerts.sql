create schema if not exists wavlon_internal;
revoke all on schema wavlon_internal from public, anon, authenticated;
create table public.wavlon_alert_config (
 id boolean primary key default true check(id),
 token_hash text not null
);
alter table public.wavlon_alert_config enable row level security;
revoke all on public.wavlon_alert_config from public, anon, authenticated;
grant select on public.wavlon_alert_config to service_role;
create table public.wavlon_email_outbox (
 id uuid primary key default gen_random_uuid(),
 source_table text not null check(source_table in ('Wavlon_Quote_Requests','Wavlon_Contact_Messages','Wavlon_Leads','catalog_download_leads')),
 source_id uuid not null,
 recipient text not null check(recipient in ('kartar.c@risetekmachinery.com','info@risetekmachinery.com')),
 payload jsonb not null,
 status text not null default 'pending' check(status in ('pending','processing','sent','needs_review')),
 attempts integer not null default 0,
 next_attempt_at timestamptz not null default now(),
 first_attempt_at timestamptz,
 lease_until timestamptz,
 provider_id text,
 last_error text,
 created_at timestamptz not null default now(),
 sent_at timestamptz,
 unique(source_table,source_id,recipient)
);
alter table public.wavlon_email_outbox enable row level security;
revoke all on public.wavlon_email_outbox from public,anon,authenticated;
grant select,update on public.wavlon_email_outbox to service_role;
create index wavlon_email_outbox_pending on public.wavlon_email_outbox(next_attempt_at) where status in ('pending','processing');

-- Trigger-only privileged operation, private schema, no callable public RPC.
-- Restricted to these tables; it never accepts a recipient or arbitrary record from a caller.
create function wavlon_internal.enqueue_email() returns trigger
language plpgsql security definer set search_path='' as $fn$
declare r jsonb := to_jsonb(new); snapshot jsonb;
begin
 if TG_TABLE_SCHEMA <> 'public' or TG_TABLE_NAME not in ('Wavlon_Quote_Requests','Wavlon_Contact_Messages','Wavlon_Leads','catalog_download_leads') then
  raise exception 'Unsupported alert source';
 end if;
 -- Catalog table is shared. Only this website's explicitly identified downloads qualify.
 if TG_TABLE_NAME='catalog_download_leads' and coalesce(r->>'page_url','') !~ '^https://(www\.)?wavlonlasers\.com(/|$)' then return new; end if;
 snapshot := jsonb_build_object(
  'name',left(coalesce(nullif(r->>'name',''),concat_ws(' ',r->>'first_name',r->>'last_name')),200),
  'email',left(coalesce(nullif(r->>'email',''),r->>'company_email',''),320),
  'company',left(coalesce(r->>'company',r->>'company_name',''),200),
  'phone',left(coalesce(r->>'phone',''),80),
  'interest',left(coalesce(r->>'machine_interest',r->>'subject',r->>'catalog_name',''),300),
  'source',left(coalesce(r->>'source',''),200),
  'message',left(coalesce(r->>'message',''),3000)
 );
 insert into public.wavlon_email_outbox(source_table,source_id,recipient,payload)
 select TG_TABLE_NAME,new.id,recipient,snapshot
 from unnest(array['kartar.c@risetekmachinery.com','info@risetekmachinery.com']) recipient
 on conflict(source_table,source_id,recipient) do nothing;
 return new;
exception when others then
 -- Email queue failure must never roll back a valid customer enquiry.
 raise warning 'Wavlon email queue failed: %',SQLSTATE;
 return new;
end $fn$;
revoke all on function wavlon_internal.enqueue_email() from public,anon,authenticated;
create trigger wavlon_email_alert after insert on public."Wavlon_Quote_Requests" for each row execute function wavlon_internal.enqueue_email();
create trigger wavlon_email_alert after insert on public."Wavlon_Contact_Messages" for each row execute function wavlon_internal.enqueue_email();
create trigger wavlon_email_alert after insert on public."Wavlon_Leads" for each row execute function wavlon_internal.enqueue_email();
create trigger wavlon_email_alert after insert on public.catalog_download_leads for each row execute function wavlon_internal.enqueue_email();

-- Invoker RPC: service_role only; claims are atomic and safe across overlapping workers.
create function public.wavlon_claim_email_alerts() returns setof public.wavlon_email_outbox
language sql security invoker set search_path='' as $fn$
 with candidates as (
  select id from public.wavlon_email_outbox
  where (status='pending' and next_attempt_at<=now())
     or (status='processing' and lease_until<now())
  order by created_at for update skip locked limit 8
 )
 update public.wavlon_email_outbox o set
  status='processing',attempts=attempts+1,
  first_attempt_at=coalesce(first_attempt_at,now()),lease_until=now()+interval '5 minutes'
 from candidates c where o.id=c.id returning o.*;
$fn$;
revoke all on function public.wavlon_claim_email_alerts() from public,anon,authenticated;
grant execute on function public.wavlon_claim_email_alerts() to service_role;

-- Generate and store the scheduler credential entirely in the database; never return it.
do $block$
declare token text := encode(extensions.gen_random_bytes(32),'hex');
begin
 perform vault.create_secret(token,'wavlon_email_worker_token','Wavlon email worker only');
 insert into public.wavlon_alert_config(id,token_hash)
 values(true,encode(extensions.digest(token,'sha256'),'hex'));
end $block$;
