const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const cases=[['machines/fiber-laser-sheet-cutting/pro-cut-series/index.html','sqForm'],['machines/fiber-laser-sheet-cutting/pro-cut-series/index.html','sqULForm'],['machines/fiber-laser-sheet-cutting/power-cut-series/index.html','pqForm'],['machines/fiber-laser-sheet-cutting/ultra-cut-series/index.html','xqForm'],['machines/fiber-laser-tube-cutting/double-chuck/index.html','dcqForm'],['machines/fiber-laser-tube-cutting/triple-chuck/index.html','tcqForm'],['machines/fiber-laser-automation/tower-system/index.html','tsqForm']];
for(const [file,id] of cases)test(id+' requires confirmed database success and sends country',async()=>{
 const html=fs.readFileSync(file,'utf8'),handlers={},fields={},events=[],payloads=[];let saved=false;
 function field(key){return fields[key] ||= {value:key===id+'_country'?'us':'example',style:{},hidden:true,addEventListener:(name,fn)=>{handlers[key+':'+name]=fn;},querySelector:()=>({}),focus(){}};}
 const ctx={window:{WavlonAnalytics:{quoteSuccess:()=>events.push('success'),formError:()=>events.push('error')}},document:{getElementById:field,querySelectorAll:()=>[],addEventListener(){}},fetch:async(url,o)=>{payloads.push(JSON.parse(o.body));return {ok:true,status:200,json:async()=>({success:saved})};},alert(){},console};
 const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(s=>s.includes("quoteSuccess('"+id+"')"));
 assert.equal(scripts.length,1);vm.runInNewContext(scripts[0],ctx);
 const handler=handlers[id+':submit'];assert.ok(handler);
 await handler.call(field(id),{preventDefault(){}});assert.ok(!events.includes('success'));
 saved=true;await handler.call(field(id),{preventDefault(){}});assert.equal(events.filter(x=>x==='success').length,1);assert.equal(payloads.at(-1).installation_country,'us');
});
