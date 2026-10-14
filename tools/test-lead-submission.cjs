const {test}=require('node:test');
const assert=require('node:assert/strict');
const handler=require('../api/submit-form');
const schemas={
 Wavlon_Contact_Messages:['status','name','email','phone','subject','message','source'],
 Wavlon_Quote_Requests:['status','name','email','phone','company','machine_interest','machine_id','material','thickness','budget','message','source'],
 Wavlon_Leads:['status','name','email','phone','company','machine_interest','machine_id','budget','message','source','session_id'],
 Wavlon_Chat_Logs:['session_id','question','answer','match_type','source','user_name','user_email','user_company','user_phone']
};
async function submit(body,fail=false){
 const inserts=[];process.env.SUPABASE_URL='https://database.invalid';process.env.SUPABASE_SERVICE_KEY='unit-test-only';
 const original=global.fetch;
 global.fetch=async(url,options)=>{const table=decodeURIComponent(new URL(url).pathname.split('/').pop()),row=JSON.parse(options.body);inserts.push({table,row});assert.ok(schemas[table]);assert.deepEqual(Object.keys(row).filter(k=>!schemas[table].includes(k)),[]);return {ok:!fail,status:fail?500:201,json:async()=>({code:'TEST_FAILURE'})};};
 const res={setHeader(){},status(n){this.code=n;return this;},json(v){this.body=v;return this;}};
 try{await handler({method:'POST',body},res);return {res,inserts};}finally{global.fetch=original;}
}
test('contact company is retained without an unsupported database field',async()=>{
 const {res,inserts}=await submit({email:'buyer@example.com',company:'Example Shop',subject:'General Question',message:'Please call',source:'contact-page',status:'closed'});
 assert.equal(res.code,200);assert.equal(inserts[0].table,'Wavlon_Contact_Messages');assert.equal(inserts[0].row.message,'Company: Example Shop\n\nPlease call');assert.equal(inserts[0].row.status,'new');
});
test('contact quotes reach quote CRM with company and selected machine',async()=>{
 const {res,inserts}=await submit({email:'buyer@example.com',company:'Example Shop',subject:'Quote Request — ProCut Series (3–12kW)',source:'contact-page'});
 assert.equal(res.code,200);assert.equal(inserts[0].table,'Wavlon_Quote_Requests');assert.equal(inserts[0].row.company,'Example Shop');assert.equal(inserts[0].row.machine_interest,'ProCut Series (3–12kW)');
});
test('all source families use compatible columns',async()=>{
 for(const source of ['pro-cut-series-page','pro-cut-series-ul-page','power-cut-series-page','ultra-cut-series-page','tubecut-double-chuck-page','tubecut-triple-chuck-page','tower-system-page','parts-page','financing-page','chat-widget']){
  const {res}=await submit({email:'buyer@example.com',source,material:'Steel',thickness:'3 mm',subject:'ignored',session_id:'test-session',company:'Shop'});assert.equal(res.code,200,source);
 }
});
test('invalid request never attempts database insert',async()=>{
 for(const body of [null,{}, {email:[]},{email:'not-an-email'}]){const {res,inserts}=await submit(body);assert.equal(res.code,400);assert.equal(inserts.length,0);}
});
test('database failure cannot return successful lead',async()=>{const {res}=await submit({email:'buyer@example.com',source:'contact-page'},true);assert.equal(res.code,500);assert.equal(res.body.success,undefined);});
