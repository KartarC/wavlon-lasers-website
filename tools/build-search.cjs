/* Public search corpus: only canonical, indexable sitemap pages. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
function text(html) {
  return html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&(?:amp|nbsp|quot|apos|lt|gt);/g, x => ({'&amp;':'&','&nbsp;':' ','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>'}[x]))
    .replace(/&#(x[\da-f]+|\d+);/gi, (_, n) => String.fromCodePoint(n[0].toLowerCase() === 'x' ? parseInt(n.slice(1),16) : Number(n)))
    .replace(/\s+/g, ' ').trim();
}
function build() {
  const urls = [...fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
  const entries = urls.map(url => {
    const route = new URL(url).pathname;
    const html = fs.readFileSync(path.join(root,route.slice(1),'index.html'),'utf8');
    if (/name=["']robots["'][^>]+noindex|http-equiv=["']refresh/i.test(html)) throw new Error('Non-public search route: '+route);
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
    if (!main) throw new Error('Missing main: '+route);
    return {url:route,title:text(html.match(/<title>([\s\S]*?)<\/title>/i)[1]),description:text(html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] || ''),text:text(main[1])};
  });
  fs.writeFileSync(path.join(root,'assets/search-index.json'),JSON.stringify(entries));
  console.log('Search index: '+entries.length+' public pages');
  return entries;
}
if (require.main === module) build();
module.exports = {build,text};
