const fs = require('node:fs/promises');
const path = require('node:path');
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  if (!process.argv[2]) throw error;
  sharp = require(process.argv[2]);
}

const root = path.resolve(__dirname, '..', '..');
const mediaRoot = path.join(root, 'assets', 'laser-heads', 'precitec');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

async function main() {
  const sourceFiles = (await walk(mediaRoot)).filter((file) => /\.jpe?g$/i.test(file));
  for (const source of sourceFiles) {
    const target = source.replace(/\.jpe?g$/i, '.webp');
    const image = sharp(source).rotate();
    const metadata = await image.metadata();
    await image
      .resize({ width: Math.min(metadata.width || 1600, 1600), withoutEnlargement: true })
      .webp({ quality: 84, effort: 6, smartSubsample: true })
      .toFile(target);
    await fs.unlink(source);
    console.log(`${path.relative(root, source)} -> ${path.relative(root, target)}`);
  }
  console.log(`Optimized ${sourceFiles.length} Precitec raster assets.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
