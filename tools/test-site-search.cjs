const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {search}=require('../assets/site-search');
const pages=require('../assets/search-index.json');
test('every public sitemap page and all fifteen blogs are searchable',()=>{
 const urls=[...fs.readFileSync('sitemap.xml','utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
 assert.deepEqual(pages.map(p=>p.url),urls);
 assert.equal(pages.filter(p=>p.url.startsWith('/blog/')&&!p.url.includes('/category/')).length,15);
 assert.ok(!pages.some(p=>p.url.includes('/fiber-laser-welding')));
});
test('titles rank first and body text, spelling variants, units and accents are searchable',()=>{
 assert.equal(search(pages,'site preparation')[0].url,'/blog/fiber-laser-site-preparation-checklist');
 assert.equal(search(pages,'ProCutter 2.0')[0].url,'/technologies/laser-heads/precitec/procutter-2-0');
 assert.ok(search(pages,'fibre nitrogen').some(p=>p.url.includes('nitrogen-oxygen-air')));
 assert.ok(search(pages,'Montreal').some(p=>p.url.includes('canadian-regions')));
 assert.deepEqual(search(pages,'12 kW'),search(pages,'12kw'));
 assert.deepEqual(search(pages,'unfindablexyz'),[]);assert.deepEqual(search(pages,'   '),[]);
});
test('search has a noindex page, resilient fallback and safe text rendering',()=>{
 const html=fs.readFileSync('search/index.html','utf8'),js=fs.readFileSync('assets/site-search.js','utf8');
 assert.match(html,/noindex,follow/);assert.match(html,/<noscript>/);assert.match(html,/role="status"/);
 assert.ok(!js.includes('innerHTML'));assert.match(js,/textContent=p.title/);
});
