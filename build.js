/**
 * Wavlon Lasers — Universal Header/Footer Sync
 *
 * Reads _partials/header.html and _partials/footer.html and injects them
 * into every HTML page on the site. Run manually or auto-triggered by Vercel.
 *
 * Usage:  node build.js
 * Vercel: automatically runs via package.json "build" script on every deploy.
 *
 * To update the header/footer across all pages:
 *   1. Edit _partials/header.html or _partials/footer.html
 *   2. Run:  node build.js
 *   3. git add . && git commit && git push origin main
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PARTIALS = path.join(ROOT, '_partials');

// Load partials
const headerHtml = fs.readFileSync(path.join(PARTIALS, 'header.html'), 'utf8').trim();
const footerHtml = fs.readFileSync(path.join(PARTIALS, 'footer.html'), 'utf8').trim();

// Skip these directories / files
const SKIP_DIRS  = new Set(['node_modules', '_partials', '.git', 'api']);
const SKIP_FILES = new Set(['header.html', 'footer.html']);

function walkHtml(dir, results = []) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!SKIP_DIRS.has(entry)) walkHtml(full, results);
    } else if (entry.endsWith('.html') && !SKIP_FILES.has(entry)) {
      results.push(full);
    }
  }
  return results;
}

const files = walkHtml(ROOT);
let synced = 0;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace header: matches both plain and decorated comment variants
  const newHtml1 = html.replace(
    /<!--[^>]*HEADER[^>]*inline copy[^>]*-->[\s\S]*?<\/header>/,
    `<!-- HEADER — inline copy -->\n${headerHtml}`
  );
  if (newHtml1 !== html) { html = newHtml1; changed = true; }

  // Replace footer: matches both plain and decorated comment variants
  const newHtml2 = html.replace(
    /<!--[^>]*FOOTER[^>]*inline copy[^>]*-->[\s\S]*?<\/footer>(?:\s*<script src="\/assets\/cookie-consent\.js" defer><\/script>)*/,
    `<!-- FOOTER — inline copy -->\n${footerHtml}`
  );
  if (newHtml2 !== html) { html = newHtml2; changed = true; }

  if (changed) {
    fs.writeFileSync(file, html);
    console.log('Synced:', path.relative(ROOT, file));
    synced++;
  }
}

console.log(`\nDone. Synced header/footer into ${synced} pages.`);
