import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { normalizeSiteUrls } from './seo-urls.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://wavlonlasers.com';
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/gs)].map(m => [m[1], m[3]]));
const metadata = (html) => Object.fromEntries([...html.matchAll(/<meta\b[^>]*>/gi)].map(m => attrs(m[0])).map(a => [a.name || a.property || a['http-equiv'], a.content]));
const canonical = (html) => [...html.matchAll(/<link\b[^>]*>/gi)].map(m => attrs(m[0])).filter(a => a.rel === 'canonical').map(a => a.href);
const resolve = (url) => {
  const pathname = decodeURIComponent(new URL(url, origin).pathname).replace(/^\//, '');
  return [pathname, `${pathname.replace(/\/$/, '')}/index.html`, `${pathname}.html`, ...(pathname ? [] : ['index.html'])]
    .find(file => fs.existsSync(path.join(root, file)) && fs.statSync(path.join(root, file)).isFile());
};
const urls = [...read('sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
const titles = new Set(), descriptions = new Set();
for (const url of urls) {
  assert.equal(url, normalizeSiteUrls(url), `Noncanonical sitemap URL: ${url}`);
  const file = resolve(url); assert.ok(file, `Missing sitemap route: ${url}`);
  const html = read(file), meta = metadata(html);
  assert.ok(!/noindex/i.test(meta.robots || ''), `Noindex in sitemap: ${file}`);
  assert.ok(!meta.refresh, `Redirect in sitemap: ${file}`);
  assert.deepEqual(canonical(html), [url], `Canonical mismatch: ${file}`);
  assert.equal([...html.matchAll(/<h1\b/gi)].length, 1, `H1 count: ${file}`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert.ok(title && !titles.has(title), `Missing/duplicate title: ${file}`); titles.add(title);
  assert.ok(meta.description && !descriptions.has(meta.description), `Missing/duplicate description: ${file}`); descriptions.add(meta.description);
  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = attrs(match[0]).href; if (!href) continue;
    const target = new URL(href, url);
    if (target.origin !== origin) continue;
    const destination = resolve(target.href); assert.ok(destination, `Broken link in ${file}: ${href}`);
    if (!destination.endsWith('.html')) continue;
    const destHtml = read(destination);
    assert.ok(!metadata(destHtml).refresh, `Internal link to retired route in ${file}: ${href}`);
    if (target.hash) {
      const ids = [...destHtml.matchAll(/\bid\s*=\s*(["'])(.*?)\1/g)].map(m => m[2]);
      assert.ok(ids.includes(decodeURIComponent(target.hash.slice(1))), `Missing anchor in ${file}: ${href}`);
    }
  }
}
let scripts=0, schemas=0, pages=0, redirects=0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes:true })) {
    const file=path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.')) walk(file);
    else if (entry.isFile() && entry.name.endsWith('.html')) {
      pages++;
      const html=fs.readFileSync(file,'utf8'), meta=metadata(html);
      for (const url of canonical(html)) assert.equal(url, normalizeSiteUrls(url), `Noncanonical URL: ${file}`);
      if (meta.refresh) {
        redirects++;
        const target=meta.refresh.split(/url=/i)[1];
        assert.ok(target && resolve(target), `Invalid redirect: ${file}`);
        assert.deepEqual(canonical(html), [origin+target], `Redirect canonical mismatch: ${file}`);
        assert.ok(!metadata(read(resolve(target))).refresh, `Redirect chain: ${file}`);
      }
      for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
        const a=attrs(m[1]);
        if(a.type==='application/ld+json') { JSON.parse(m[2]); schemas++; }
        else if (!a.src && !a.type) { new vm.Script(m[2], {filename:file}); scripts++; }
      }
    }
  }
}
walk(root);
for (const route of ['/machines/fiber-laser-welding', '/machines/fiber-laser-welding/air-cooled-series']) {
  assert.ok(metadata(read(resolve(route))).robots.includes('noindex'));
  assert.ok(!urls.includes(origin+route));
}
for (const [input, expected] of [
  [origin+'/', origin+'/'], [origin+'/#organization', origin+'/#organization'],
  [origin+'/machines/', origin+'/machines'], [origin+'/machines/?x=1#quote', origin+'/machines?x=1#quote'],
  [origin+'/assets/photo.webp', origin+'/assets/photo.webp'],
  ['https://example.com/machines/', 'https://example.com/machines/'],
  ['/machines/', '/machines/'],
]) assert.equal(normalizeSiteUrls(input), expected);
console.log(`SEO checks passed: ${urls.length} sitemap routes; ${pages} HTML files; ${redirects} redirect targets; ${schemas} JSON-LD blocks; ${scripts} inline scripts.`);
