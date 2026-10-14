const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');
const script = fs.readFileSync('assets/quote-selection.js', 'utf8');
const html = fs.readFileSync('contact/index.html', 'utf8');
const labels = [...html.matchAll(/<option(?: value="[^"]*")?>([^<]+)<\/option>/g)].map(m=>m[1]);
function run(search='', hash='', value='') {
 const select={value};
 vm.runInNewContext(script,{document:{getElementById:()=>select},location:{search,hash},URLSearchParams});
 return select.value;
}
test('all six model links choose an actual matching option',()=>{
 for(const [key,model] of [['procut','ProCut'],['powercut','PowerCut'],['ultracut','UltraCut'],['double-chuck','TubeCut Double Chuck'],['triple-chuck','TubeCut Triple Chuck'],['tower','Tower Automation']]) {
 const value=run('?machine='+key,'#quote');
 assert.ok(labels.includes(value));assert.ok(value.includes(model));
 }
});
test('generic quote links and unrecognized input safely choose help',()=>{
 for(const query of ['', '?machine=', '?machine=unknown','?machine=__proto__','?machine=%3Cscript%3E'])assert.equal(run(query,'#quote'),'Quote Request — Help me choose');
});
test('ordinary contact visit keeps subject unselected',()=>assert.equal(run('?utm_source=test'),''));
test('existing or restored user choice is never overwritten',()=>assert.equal(run('?machine=procut','#quote','Technical Support'),'Technical Support'));
test('missing form does not throw',()=>assert.doesNotThrow(()=>vm.runInNewContext(script,{document:{getElementById:()=>null}})));
