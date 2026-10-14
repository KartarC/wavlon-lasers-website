const RECIPIENTS = ['kartar.c@risetekmachinery.com', 'info@risetekmachinery.com'];
const ROUTES = {
 Wavlon_Quote_Requests: '/wavlon/quotes/',
 Wavlon_Contact_Messages: '/wavlon/contacts/',
 Wavlon_Leads: '/wavlon/leads/',
 catalog_download_leads: '/wavlon/'
};
const LABELS = {Wavlon_Quote_Requests:'Quote request',Wavlon_Contact_Messages:'Enquiry',Wavlon_Leads:'Website lead',catalog_download_leads:'Catalog download'};
const json = (body, status=200) => Response.json(body,{status});
export function messageFor(row) {
 if (!RECIPIENTS.includes(row.recipient) || !Object.hasOwn(ROUTES,row.source_table)) throw new Error('invalid_job');
 if (!/^[0-9a-f-]{36}$/i.test(row.source_id)) throw new Error('invalid_record');
 const p=row.payload;
 const test=String(p.name).startsWith('INTERNAL ALERT TEST');
 const link='https://rise-tek-crm.vercel.app'+ROUTES[row.source_table]+(row.source_table==='catalog_download_leads'?'':row.source_id);
 return {
  from:'Wavlon Lead Alerts <chris@mail.risetekmachinery.com>',
  to:[row.recipient],
  subject:(test?'[INTERNAL TEST] ':'')+'Wavlon — '+LABELS[row.source_table],
  text:[
   test?'INTERNAL DELIVERY TEST — not a sales opportunity.':'A new Wavlon website request is ready for follow-up.',
   '', 'Type: '+LABELS[row.source_table],
   'Name: '+p.name, 'Company: '+p.company, 'Email: '+p.email, 'Phone: '+p.phone,
   'Interest: '+p.interest, 'Source: '+p.source,
   '', 'Message:',p.message,'','Open Rise Tek CRM: '+link,
   'Record ID: '+row.source_id,'',
   'Kartar and Kulwant receive this alert. Please record one owner and the next action in CRM.'
  ].join('\n')
 };
}
export async function handle(req, env, fetcher=fetch) {
 if(req.method!=='POST') return json({error:'method_not_allowed'},405);
 const token=req.headers.get('authorization')?.replace(/^Bearer /,'')||'';
 if(!/^[a-f0-9]{64}$/.test(token)) return json({error:'unauthorized'},401);
 const url=env.get('SUPABASE_URL'), key=env.get('SUPABASE_SERVICE_ROLE_KEY'), resend=env.get('RESEND_API_KEY');
 if(!url||!key||!resend) return json({error:'worker_not_configured'},503);
 const headers={apikey:key,Authorization:'Bearer '+key,'Content-Type':'application/json'};
 async function api(path,method='GET',body) {
  const response=await fetcher(url+'/rest/v1/'+path,{method,headers,body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(12000)});
  if(!response.ok) throw new Error('database_'+response.status);
  return response.status===204?null:await response.json();
 }
 try {
  const cfg=await api('wavlon_alert_config?id=eq.true&select=token_hash');
  const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token)))).map(b=>b.toString(16).padStart(2,'0')).join('');
  const expected=cfg?.[0]?.token_hash||'';
  let mismatch=digest.length^expected.length;
  for(let i=0;i<digest.length;i++) mismatch |= digest.charCodeAt(i)^(expected.charCodeAt(i)||0);
  if(mismatch) return json({error:'unauthorized'},401);
  const jobs=await api('rpc/wavlon_claim_email_alerts','POST',{});
  const counts={claimed:jobs.length,sent:0,retry:0,review:0};
  for(const row of jobs) {
   const patch=async values=>api('wavlon_email_outbox?id=eq.'+row.id+'&attempts=eq.'+row.attempts,'PATCH',values);
   // Provider idempotency expires after 24h. Stop before that rather than risk a duplicate.
   if(row.attempts>12 || Date.now()-Date.parse(row.first_attempt_at)>23*3600000) {
    await patch({status:'needs_review',lease_until:null,last_error:'retry_window_exhausted'});counts.review++;continue;
   }
   try {
    const email=messageFor(row);
    const r=await fetcher('https://api.resend.com/emails',{method:'POST',
     headers:{Authorization:'Bearer '+resend,'Content-Type':'application/json','Idempotency-Key':'wavlon-alert/'+row.id},
     body:JSON.stringify(email),signal:AbortSignal.timeout(12000)});
    if(!r.ok) throw new Error('provider_'+r.status);
    const result=await r.json();
    if(typeof result.id!=='string') throw new Error('provider_missing_id');
    await patch({status:'sent',provider_id:result.id,sent_at:new Date().toISOString(),lease_until:null,last_error:null});
    counts.sent++;
   } catch(e) {
    // Store only safe codes, never credentials or provider bodies containing personal data.
    const code=/^(provider_\d+|provider_missing_id|invalid_job|invalid_record)$/.test(e.message)?e.message:'send_or_record_failed';
    await patch({status:'pending',lease_until:null,last_error:code,
     next_attempt_at:new Date(Date.now()+Math.min(60,2**Math.min(row.attempts,6))*60000).toISOString()});
    counts.retry++;
   }
  }
  return json(counts);
 } catch { return json({error:'worker_failed'},500); }
}
