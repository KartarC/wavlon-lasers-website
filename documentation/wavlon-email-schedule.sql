select cron.schedule('wavlon-email-alert-worker','* * * * *',$job$
 select net.http_post(
 url:='https://tpxadsuaaxoqvhptkltt.supabase.co/functions/v1/wavlon-lead-alerts',
 headers:=jsonb_build_object('Content-Type','application/json','Authorization',
 'Bearer '||(select decrypted_secret from vault.decrypted_secrets where name='wavlon_email_worker_token')),
 body:='{}'::jsonb,timeout_milliseconds:=120000
 ) where exists(select 1 from public.wavlon_email_outbox
 where (status='pending' and next_attempt_at<=now()) or (status='processing' and lease_until<now()));
$job$);
