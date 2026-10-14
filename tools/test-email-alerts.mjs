import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
import {handle,messageFor} from '../supabase/functions/wavlon-lead-alerts/worker.mjs';
globalThis.crypto ??= webcrypto;
const token='a'.repeat(64);
const hash=Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token))).toString('hex');
const env={get:k=>({SUPABASE_URL:'https://example.invalid',SUPABASE_SERVICE_ROLE_KEY:'server-only',RESEND_API_KEY:'test-key'}[k])};
const job={id:'12345678-1234-1234-1234-123456789012',source_id:'22345678-1234-1234-1234-123456789012',source_table:'Wavlon_Quote_Requests',recipient:'kartar.c@risetekmachinery.com',payload:{name:'INTERNAL ALERT TEST',message:'<script>untrusted</script>'},attempts:1,first_attempt_at:new Date().toISOString()};
const request=(auth=token)=>new Request('https://example.invalid',{method:'POST',headers:{authorization:'Bearer '+auth}});
async function run(row=job,providerStatus=200,auth=token){
 const calls=[];
 const result=await handle(request(auth),env,async(url,options)=>{
  calls.push({url,...options});
  if(url.includes('wavlon_alert_config')) return Response.json([{token_hash:hash}]);
  if(url.includes('rpc/')) return Response.json([row]);
  if(url.includes('api.resend.com')) return Response.json({id:'provider-id'},{status:providerStatus});
  if(options.method==='PATCH') return new Response(null,{status:204});
  throw Error('unexpected request');
 });
 return {status:result.status,body:await result.json(),calls};
}
assert.equal((await run(job,200,'b'.repeat(64))).status,401);
assert.equal((await run(job,200,'')).calls.length,0);
const ok=await run(); assert.equal(ok.body.sent,1);
const sent=ok.calls.find(c=>c.url.includes('api.resend.com'));
assert.equal(sent.headers['Idempotency-Key'],'wavlon-alert/'+job.id);
assert.deepEqual(JSON.parse(sent.body).to,['kartar.c@risetekmachinery.com']);
assert.equal(JSON.parse(sent.body).html,undefined);
assert.match(JSON.parse(sent.body).subject,/INTERNAL TEST/);
const retry=await run(job,503);assert.equal(retry.body.retry,1);
assert.equal(JSON.parse(retry.calls.at(-1).body).status,'pending');
const stale=await run({...job,first_attempt_at:new Date(Date.now()-24*3600000).toISOString()});
assert.equal(stale.body.review,1);assert(!stale.calls.some(c=>c.url.includes('api.resend.com')));
assert.throws(()=>messageFor({...job,recipient:'other@example.com'}),/invalid_job/);
assert.throws(()=>messageFor({...job,source_table:'profiles'}),/invalid_job/);
assert.deepEqual(messageFor({...job,recipient:'info@risetekmachinery.com'}).to,['info@risetekmachinery.com']);
console.log('Email alerts: authentication, recipient/table restrictions, plain-text safety, deduplication key, retry and expiry tests pass.');
