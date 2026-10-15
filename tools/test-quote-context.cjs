const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('assets/quote-context.js','utf8');
const html = fs.readFileSync('contact/index.html','utf8');
function boot(search='', value='') {
 const fields={cq_country:{value},cq_location:{value:''}};
 const ctx={URLSearchParams,Map,window:{},location:{search},document:{getElementById:id=>fields[id]}};
 vm.runInNewContext(source,ctx);return {ctx,fields,message:ctx.window.WavlonQuoteContext.message};
}
test('only supported guide countries prefill; saved choices win',()=>{
 assert.equal(boot('?country=ca').fields.cq_country.value,'ca');
 assert.equal(boot('?country=us').fields.cq_country.value,'us');
 for(const q of ['','?country=other','?country=__proto__','?country=%3Cscript%3E'])assert.equal(boot(q).fields.cq_country.value,'');
 assert.equal(boot('?country=us','ca').fields.cq_country.value,'ca');
});
test('blank context leaves buyer message unchanged; corrections and cleared selections are respected',()=>{
 const x=boot('?country=us');x.fields.cq_country.value='ca';x.fields.cq_location.value='  Hamilton, ON  ';
 assert.equal(x.message('Steel parts'),'Installation country: Canada\nInstallation city / province / state: Hamilton, ON\n\nSteel parts');
 x.fields.cq_country.value='';x.fields.cq_location.value='';assert.equal(x.message('  Original text\n'),'  Original text\n');assert.equal(x.message(''),'');
});
test('optional context does not require DOM fields or accept arbitrary country labels',()=>{
 const x=boot();x.fields.cq_country.value='<script>';assert.equal(x.message('Parts'),'Parts');
 const absent={URLSearchParams,Map,window:{},location:{search:'?country=us'},document:{getElementById:()=>null}};vm.runInNewContext(source,absent);assert.equal(absent.window.WavlonQuoteContext.message('Parts'),'Parts');
 assert.ok(!/id="cq_(country|location)"[^>]*\brequired\b/.test(html));
});
test('actual form handler sends context in existing message and retains it after failure/retry',async()=>{
 const x=boot('?country=us');const sent=[],events=[];let submit;let fail=true;
 Object.assign(x.fields,{cq_name:{value:'Test'},cq_company:{value:'Test shop'},cq_email:{value:'buyer@example.com'},cq_phone:{value:''},cq_subject:{value:'Quote Request — Help me choose'},cq_message:{value:'Cut brackets'},cqError:{hidden:true,focus(){}},cqSuccess:{style:{},focus(){}},cqFormWrap:{style:{}},cqForm:{addEventListener:(name,fn)=>{submit=fn;}}});
 x.fields.cq_location.value='Buffalo, NY';x.ctx.window.WavlonAnalytics={quoteSuccess:()=>events.push('success'),formError:()=>events.push('error')};
 x.ctx.fetch=async(url,options)=>{assert.equal(url,'/api/submit-form');sent.push(JSON.parse(options.body));return {ok:!fail,json:async()=>({success:!fail})};};
 const script=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].find(m=>m[1].includes("getElementById('cqForm').addEventListener"))[1];vm.runInNewContext(script,x.ctx);
 const button={};const form={querySelector:()=>button};await submit.call(form,{preventDefault(){}});
 assert.equal(button.disabled,false);assert.equal(x.fields.cqError.hidden,false);assert.equal(x.fields.cq_location.value,'Buffalo, NY');assert.deepEqual(events,['error']);
 fail=false;await submit.call(form,{preventDefault(){}});assert.deepEqual(sent[0],sent[1]);
 assert.equal(sent[1].message,'Installation country: United States\nInstallation city / province / state: Buffalo, NY\n\nCut brackets');
 assert.equal(sent[1].source,'contact-page');assert.ok(!('installation_country' in sent[1]));assert.deepEqual(events,['error','success']);
});
