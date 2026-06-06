// Removes the stray <li><a href="/parts/">...</li></ul></li> orphan
// left behind by the bad regex in fix_support.js on all pages.
const fs = require('fs');
const path = require('path');

function walkHtml(dir, files = []) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      if (entry === 'node_modules' || entry === '_partials') continue;
      walkHtml(full, files);
    } else if (entry.endsWith('.html') && entry !== 'header.html' && entry !== 'footer.html') {
      files.push(full);
    }
  }
  return files;
}

const root = __dirname;
const files = walkHtml(root);

// The orphan pattern: stray <li><a href="/parts/">...Parts & Consumables...</a></li></ul></li>
// that was left after the bad regex stopped at the first inner </li>
const orphan = /<li><a href="\/parts\/"><div class="nav-dropdown-icon">[\s\S]*?Lenses, nozzles, ceramic holders<\/div><\/div><\/a><\/li><\/ul><\/li>/g;

let fixed = 0;
for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  if (orphan.test(html)) {
    orphan.lastIndex = 0;
    html = html.replace(orphan, '');
    fs.writeFileSync(file, html);
    console.log('Fixed:', path.relative(root, file));
    fixed++;
  } else {
    orphan.lastIndex = 0;
  }
}

console.log(`\nDone. Fixed ${fixed} files.`);
