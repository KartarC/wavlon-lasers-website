const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..', '..');
const mediaRoot = path.join(root, 'assets', 'laser-sources');
const catalogPath = path.join(root, 'assets', 'data', 'laser-sources.json');

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
  const rasterFiles = (await walk(mediaRoot)).filter((file) => /\.(?:jpe?g|png)$/i.test(file));
  for (const source of rasterFiles) {
    const target = source.replace(/\.(?:jpe?g|png)$/i, '.webp');
    const image = sharp(source).rotate();
    const metadata = await image.metadata();
    const maxWidth = source.includes(`${path.sep}max${path.sep}elite${path.sep}`) ? 1600 : 1400;
    await image
      .resize({ width: Math.min(metadata.width || maxWidth, maxWidth), withoutEnlargement: true })
      .webp({ quality: 84, effort: 6, smartSubsample: true })
      .toFile(target);
    await fs.unlink(source);
    console.log(`${path.relative(root, source)} -> ${path.relative(root, target)}`);
  }

  const catalog = JSON.parse(await fs.readFile(catalogPath, 'utf8'));
  for (const brand of catalog.brands) {
    if (brand.logo.endsWith('.png')) brand.logo = brand.logo.replace(/\.png$/, '.webp');
  }
  for (const model of catalog.models) {
    model.primaryImage = model.primaryImage.replace(/\.(?:jpe?g|png)$/i, '.webp');
  }
  await fs.writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);

  console.log(`Optimized ${rasterFiles.length} raster assets.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});