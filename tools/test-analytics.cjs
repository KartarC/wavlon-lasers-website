const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../assets/cookie-consent.js'), 'utf8');
function boot(consent) {
  const scripts = [], listeners = {};
  const context = {URL, Date, Object, window:{}, location:{origin:'https://wavlonlasers.com',pathname:'/contact',search:'?email=private@example.com',hash:'#private'}, localStorage:{getItem:()=>JSON.stringify({analytics:consent,marketing:false})},document:{referrer:'https://example.com/private?email=private@example.com',head:{appendChild:s=>scripts.push(s)},createElement:()=>({}),addEventListener:(n,f)=>listeners[n]=f}};
  vm.runInNewContext(source, context);
  return {...context, scripts, listeners, events:()=>context.window.dataLayer.filter(x=>x.event && !x.event.startsWith('gtm.'))};
}
test('consent refusal sends no data and loads no container',()=>{
  const x=boot(false); x.window.WavlonAnalytics.quoteSuccess('cqForm');
  x.window.WavlonAnalytics.formError('cqForm');
  assert.equal(x.scripts.length,0); assert.equal(x.window.dataLayer,undefined);
});
test('one container and one sanitized page view after repeated enable',()=>{
  const x=boot(true); x.window.WavlonAnalytics.enable();
  assert.equal(x.scripts.length,2); assert.match(x.scripts[0].src,/gtm.js\?id=GTM-KXFXRNWZ$/);
  assert.equal(x.scripts[1].src,'https://www.googletagmanager.com/gtag/js?id=AW-18520923229');
  const configs=x.window.dataLayer.filter(x=>x[0]==='config');
  assert.equal(configs.length,1); assert.equal(configs[0][1],'AW-18520923229');
  assert.equal(configs[0][2].page_location,'https://wavlonlasers.com/contact');
  assert.equal(configs[0][2].page_referrer,'https://example.com/');
  assert.equal(configs[0][2].allow_ad_personalization_signals,false);
  assert.equal(x.window.dataLayer[0][2].ad_user_data,'denied');
  assert.equal(x.window.dataLayer[0][2].ad_personalization,'denied');
  assert.equal(x.window.dataLayer.filter(x=>x[0]==='consent').length,1);
  assert.equal(x.events().length,1); assert.equal(x.events()[0].event,'page_view');
  assert.equal(x.events()[0].page_location,'https://wavlonlasers.com/contact');
  assert.equal(x.events()[0].page_referrer,'https://example.com/');
  const c=x.window.dataLayer[0]; assert.equal(c[0],'consent'); assert.equal(c[2].analytics_storage,'granted'); assert.equal(c[2].ad_storage,'denied');
});
test('successful leads are categorized and duplicate success is ignored',()=>{
  const x=boot(true);
  for(const [id,type] of [['sqForm','machine_quote'],['cqForm','contact_enquiry'],['partsForm','parts_enquiry'],['finForm','financing_enquiry']]) {
    x.window.WavlonAnalytics.quoteSuccess(id,type); x.window.WavlonAnalytics.quoteSuccess(id,type);
    const e=x.events().filter(e=>e.form_id===id); assert.equal(e.length,1); assert.equal(e[0].lead_type,type);
  }
  x.window.WavlonAnalytics.quoteSuccess('unknown'); assert.equal(x.events().filter(e=>e.event==='generate_lead').length,4);
});
test('errors and contact clicks do not count as leads or inherit lead details',()=>{
  const x=boot(true); x.window.WavlonAnalytics.quoteSuccess('sqForm');
  x.window.WavlonAnalytics.formError('cqForm');
  x.listeners.click({target:{closest:()=>({getAttribute:()=> 'mailto:private@example.com'})}});
  const e=x.events().at(-1); assert.equal(e.event,'contact_click'); assert.equal(e.contact_method,'email');
  assert.equal(e.form_id,undefined); assert.equal(e.lead_type,undefined);
  assert.equal(x.events().filter(e=>e.event==='generate_lead').length,1);
  assert.ok(!JSON.stringify(x.events()).includes('private'));
});
