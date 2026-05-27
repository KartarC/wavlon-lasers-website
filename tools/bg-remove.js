#!/usr/bin/env node
/**
 * bg-remove.js — Remove solid-color backgrounds from PNG images
 *
 * Usage:
 *   node tools/bg-remove.js [options] <image> [<image2> ...]
 *
 * Options:
 *   --bg=black       Background colour to remove: black (default) | white | auto
 *   --threshold=28   Phase-1 global threshold (0–255). Pixels with all channels
 *                    below this value are zapped regardless of connectivity.
 *   --spread=80      Phase-2 BFS spread threshold. Controls how far anti-aliasing
 *                    is peeled away from the transparent boundary.
 *   --push           Git commit + push after processing.
 *   --dry-run        Show what would happen without writing files.
 *   --help           Print this message.
 *
 * Examples:
 *   node tools/bg-remove.js assets/machine-right.png
 *   node tools/bg-remove.js --push assets/machine-front.png assets/machine-right.png
 *   node tools/bg-remove.js --bg=white --threshold=220 --spread=180 assets/my-photo.png
 */

const path = require('path');
const { execSync } = require('child_process');
const { Jimp } = require('jimp');

// ── Argument parsing ──────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.includes('--help') || args.length === 0) {
  console.log(require('fs').readFileSync(__filename, 'utf8').match(/\/\*\*([\s\S]*?)\*\//)[0]);
  process.exit(0);
}

const flags = {
  bg:        (args.find(a => a.startsWith('--bg='))         || '--bg=black').split('=')[1],
  threshold: +(args.find(a => a.startsWith('--threshold=')) || '--threshold=28').split('=')[1],
  spread:    +(args.find(a => a.startsWith('--spread='))    || '--spread=80').split('=')[1],
  push:      args.includes('--push'),
  dryRun:    args.includes('--dry-run'),
};

const files = args.filter(a => !a.startsWith('--'));

if (files.length === 0) {
  console.error('ERROR: no image files specified.');
  process.exit(1);
}

// ── Core removal logic ────────────────────────────────────────────────────────

/**
 * Returns true if a pixel is considered "background" in phase 1.
 * Operates on the raw bitmap data array.
 */
function isPhase1Background(d, idx, bg, threshold) {
  const r = d[idx], g = d[idx + 1], b = d[idx + 2], a = d[idx + 3];
  if (a < 10) return false; // already transparent

  if (bg === 'black') {
    return r < threshold && g < threshold && b < threshold;
  }
  if (bg === 'white') {
    return r > (255 - threshold) && g > (255 - threshold) && b > (255 - threshold);
  }
  if (bg === 'auto') {
    // Snap to whichever extreme the pixel is closest to
    const toBlack = Math.max(r, g, b);
    const toWhite = 255 - Math.min(r, g, b);
    if (toBlack < threshold) return true;
    if (toWhite < threshold) return true;
    return false;
  }
  return false;
}

/**
 * Returns true if a pixel should be consumed by the phase-2 BFS expansion.
 */
function isPhase2Background(d, idx, bg, spread) {
  const r = d[idx], g = d[idx + 1], b = d[idx + 2], a = d[idx + 3];
  if (a < 10) return true; // already transparent — expand through it

  if (bg === 'black') return r < spread && g < spread && b < spread;
  if (bg === 'white') return r > (255 - spread) && g > (255 - spread) && b > (255 - spread);
  if (bg === 'auto') {
    const toBlack = Math.max(r, g, b);
    const toWhite = 255 - Math.min(r, g, b);
    return toBlack < spread || toWhite < spread;
  }
  return false;
}

async function removeBackground(filePath) {
  const abs = path.resolve(filePath);
  console.log(`\n▶  ${filePath}`);

  const img = await Jimp.read(abs);
  const w = img.bitmap.width;
  const h = img.bitmap.height;
  const d = img.bitmap.data;
  const total = w * h;

  const beforeTransparent = (() => {
    let n = 0;
    for (let i = 0; i < d.length; i += 4) if (d[i + 3] < 10) n++;
    return n;
  })();

  // ── Phase 1: Global flat zap of near-solid background pixels ──────────────
  let phase1Count = 0;
  for (let i = 0; i < d.length; i += 4) {
    if (isPhase1Background(d, i, flags.bg, flags.threshold)) {
      d[i] = 0; d[i + 1] = 0; d[i + 2] = 0; d[i + 3] = 0;
      phase1Count++;
    }
  }
  console.log(`   Phase 1 (global zap threshold=${flags.threshold}): removed ${phase1Count.toLocaleString()} px`);

  // ── Phase 2: BFS from all transparent pixels through anti-aliasing ────────
  const visited = new Uint8Array(total);
  const queue = [];
  let head = 0;

  for (let i = 0; i < total; i++) {
    if (d[i * 4 + 3] < 10) {
      visited[i] = 1;
      queue.push(i);
    }
  }

  let phase2Count = 0;
  while (head < queue.length) {
    const pos = queue[head++];
    const px = pos % w;
    const py = Math.floor(pos / w);
    const idx = pos * 4;

    if (d[idx + 3] > 0) {
      d[idx] = 0; d[idx + 1] = 0; d[idx + 2] = 0; d[idx + 3] = 0;
      phase2Count++;
    }

    const neighbors = [];
    if (px > 0)     neighbors.push(pos - 1);
    if (px < w - 1) neighbors.push(pos + 1);
    if (py > 0)     neighbors.push(pos - w);
    if (py < h - 1) neighbors.push(pos + w);

    for (const n of neighbors) {
      if (!visited[n]) {
        visited[n] = 1;
        if (isPhase2Background(d, n * 4, flags.bg, flags.spread)) {
          queue.push(n);
        }
      }
    }
  }
  console.log(`   Phase 2 (BFS spread=${flags.spread}): removed ${phase2Count.toLocaleString()} more px`);

  const afterTransparent = (() => {
    let n = 0;
    for (let i = 0; i < d.length; i += 4) if (d[i + 3] < 10) n++;
    return n;
  })();

  const pct = v => Math.round(100 * v / total) + '%';
  console.log(`   Transparent: ${pct(beforeTransparent)} → ${pct(afterTransparent)}  (${afterTransparent.toLocaleString()}/${total.toLocaleString()} px)`);

  if (!flags.dryRun) {
    await img.write(abs);
    console.log(`   ✓ Saved: ${filePath}`);
  } else {
    console.log(`   ⚠  Dry run — file not written`);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

(async () => {
  console.log(`bg-remove  bg=${flags.bg}  threshold=${flags.threshold}  spread=${flags.spread}${flags.dryRun ? '  [DRY RUN]' : ''}`);

  for (const f of files) {
    try {
      await removeBackground(f);
    } catch (err) {
      console.error(`   ERROR: ${err.message}`);
      process.exit(1);
    }
  }

  if (!flags.dryRun && flags.push) {
    console.log('\n▶  Git commit + push …');
    const names = files.map(f => path.basename(f)).join(', ');
    try {
      execSync(`git add ${files.map(f => `"${f}"`).join(' ')}`, { stdio: 'inherit' });
      execSync(
        `git commit -m "Remove background from ${names} via bg-remove.js"`,
        { stdio: 'inherit' }
      );
      execSync('git push origin main', { stdio: 'inherit' });
      console.log('   ✓ Pushed to origin/main');
    } catch (err) {
      console.error('   ERROR during git operations:', err.message);
      process.exit(1);
    }
  } else if (flags.push) {
    console.log('\n   (--push skipped in dry-run mode)');
  }

  console.log('\nDone.');
})();
