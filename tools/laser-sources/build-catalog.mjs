import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..', '..');
const DATA_DIR = path.join(ROOT, 'assets', 'data');
const MEDIA_DIR = path.join(ROOT, 'assets', 'laser-sources');
const RETRIEVED_AT = '2026-08-20';

const MAX_BASE = 'https://maxlasers.com/products/';
const MAX_SERIES_URL = 'https://maxlasers.com/products/elite-series';
const IPG_HIGH_POWER_URL = 'https://www.ipgphotonics.com/products/lasers/industrial-cw-fiber-lasers/high-power-fiber-lasers';
const IPG_EFFICIENCY_URL = 'https://www.ipgphotonics.com/products/lasers/industrial-cw-fiber-lasers/high-efficiency-fiber-lasers';
const IPG_YLS_DS = 'https://cdn.ipgphotonics.com/5b6f3db3-e2af-4331-b634-b0c000f9351e/IPG_YLS-Series_DS_EN_LTR.pdf';
const IPG_YLR_DS = 'https://cdn.ipgphotonics.com/6f98cba1-ae50-4feb-8635-b10901309bcd/IPG_YLR-Series_DS_EN_LTR.pdf';
const IPG_ECO_DS = 'https://cdn.ipgphotonics.com/607abf5d-cb13-458e-8b1f-b0b40131917f/IPG_YLS-ECO-Series_DS_EN_LTR.pdf';
const IPG_U_ECO_DS = 'https://cdn.ipgphotonics.com/4be8a158-00db-4fa5-ae1a-b01f00ee3212/IPG_YLS-U-ECO_DS_EN_LTR.pdf';

const maxSlugs = [
  'elite-mfsc-500',
  'elite-mfsc-1000',
  'elite-mfsc-2000',
  'elite-mfsc-3000',
  'elite-mfsc-4000',
  'elite-mfsc-6000',
  'elite-mfsc-6000-cabinet',
  'elite-mfsc-12000',
  'elite-mfmc-20000',
  'elite-mfmc-30000',
  'elite-mfmc-40000',
  'elite-mfmc-50000',
  'elite-mfmc-60000',
  'elite-mfmc-80000',
  'elite-mfmc-85000',
];

const decode = (value = '') => value
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#x27;|&#39;/g, "'")
  .replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const stripTags = (value = '') => decode(value.replace(/<[^>]*>/g, ' '));
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function fetchText(url) {
  const response = await fetch(url, { headers: { 'user-agent': 'Wavlon catalog research/1.0' } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.text();
}

async function download(url, target) {
  const response = await fetch(url, { headers: { 'user-agent': 'Wavlon catalog research/1.0' } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, Buffer.from(await response.arrayBuffer()));
}

function extractSpec(html, label) {
  const pattern = new RegExp(`<span[^>]*>\\s*${escapeRegExp(label)}\\s*</span>\\s*</div>\\s*<span[^>]*>([\\s\\S]*?)</span>`, 'i');
  return stripTags(html.match(pattern)?.[1] || '');
}

function extractDescription(html, title) {
  const titlePattern = new RegExp(`<h1[^>]*>\\s*${escapeRegExp(title)}\\s*</h1>[\\s\\S]{0,3000}?<p[^>]*>([\\s\\S]*?)</p>`, 'i');
  return stripTags(html.match(titlePattern)?.[1] || '');
}

function outputPowerFrom(value) {
  const match = value.match(/[\d,.]+/);
  return match ? Number(match[0].replace(/,/g, '')) : null;
}

function maxApplications(powerW) {
  if (powerW <= 1000) return ['Additive manufacturing', 'Precision processing'];
  if (powerW < 12000) return ['Sheet cutting', 'Welding', 'Cladding'];
  return ['Sheet cutting', 'Heavy plate cutting', 'Welding', 'Cladding'];
}

async function scrapeMaxModel(slug) {
  const sourceUrl = `${MAX_BASE}${slug}`;
  const html = await fetchText(sourceUrl);
  const title = stripTags(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || slug);
  const imageTag = html.match(/<img[^>]+alt="Maxphotonics Elite[^>]+>/i)?.[0] || '';
  const imageUrl = decode(imageTag.match(/\ssrc="([^"]+)"/i)?.[1] || '');
  const nominalPowerLabel = extractSpec(html, 'Nominal Power');
  const powerW = outputPowerFrom(nominalPowerLabel);
  const moduleType = title.includes('MFMC') ? 'Multi-module' : 'Single-module';
  const housingForm = slug.includes('cabinet') || moduleType === 'Multi-module' ? 'Cabinet' : 'Rack';
  const certifications = extractSpec(html, 'Certificates');
  const model = {
    id: `max-${slug}`,
    brandId: 'max-photonics',
    brand: 'MAX Photonics',
    seriesId: 'max-elite',
    series: 'Elite Series',
    model: title.replace(/^Elite\s+/, ''),
    displayName: title,
    slug,
    productType: 'CW / Modulated fiber laser',
    nominalPowerW: powerW,
    nominalPowerLabel,
    moduleType,
    housingForm,
    polarization: 'Random',
    wavelength: 'Not published on product page',
    powerTunability: 'Not published on product page',
    powerStability: '±1%',
    powerRedundancy: extractSpec(html, 'Power Redundancy') || '≥5% typical',
    modulationFrequency: extractSpec(html, 'Modulation Frequency') || 'Not published on product page',
    beamQuality: extractSpec(html, 'Beam Quality BPP') || extractSpec(html, 'Beam Quality M²') || 'Not published on product page',
    fiberConnectors: extractSpec(html, 'Fiber Cable Connectors (BDO)') || 'Not published on product page',
    interface: extractSpec(html, 'Interface') || 'Digital I/O; EtherCAT / PROFINET optional',
    cooling: 'Integrated industrial cooling architecture; confirm by configuration',
    certifications: certifications || 'Not published on product page',
    warranty: extractSpec(html, 'Warranty') || 'Confirm by configuration',
    efficiency: 'Not published on product page',
    applications: maxApplications(powerW || 0),
    description: extractDescription(html, title),
    powerRangeMatch: powerW >= 1500 && powerW <= 30000,
    compatibilityNote: powerW >= 1500 && powerW <= 30000
      ? 'Within at least one published Wavlon machine power range; final engineering validation required.'
      : 'Outside the currently published Wavlon cutting-machine power ranges or intended for a different process; consult engineering.',
    primaryImage: imageUrl ? `/assets/laser-sources/max/elite/${slug}.jpg` : '',
    sourceImageUrl: imageUrl,
    sourceUrls: [sourceUrl, MAX_SERIES_URL],
    retrievedAt: RETRIEVED_AT,
  };

  if (imageUrl) {
    await download(imageUrl, path.join(ROOT, model.primaryImage.replace(/^\//, '')));
  }
  return model;
}

const ipgSeries = [
  {
    id: 'ipg-ylr', name: 'YLR Series', family: 'High-Power Fiber Laser Racks',
    powers: [100, 150, 200, 300, 400, 500, 600, 700, 1000, 1500, 2000, 2500, 3000, 4000],
    image: '/assets/laser-sources/ipg/ylr-series.jpg',
    sourceImageUrl: 'https://cdn.ipgphotonics.com/1099a549-0ca4-42ba-a0b1-b01400e28df4/YLR_Series_Card_cms_crd_2x.png?disable=upscale&width=760&format=jpg',
    productType: 'CW / Modulated fiber laser', moduleType: 'Single-module rack', housingForm: '19-inch rack',
    wavelength: '1070 ±10 nm', powerTunability: '10–100%', powerStability: '±0.5%',
    modulationFrequency: '0–50 kHz', efficiency: 'High wall-plug efficiency; exact value not stated in current datasheet',
    coolingForPower: (power) => power <= 700 ? 'Air or water, depending on model' : 'Water-cooled',
    connectorForPower: (power) => power <= 400 ? 'Affixed collimator available' : 'HLC-8 / QBH-type',
    beamQualityForPower: (power) => power <= 3000 ? 'Single-mode M² <1.1 available; multimode options also available' : 'Multimode; fiber-dependent',
    applications: ['Precision cutting', 'Welding', 'Additive manufacturing', 'Heat treating'],
    sourceUrls: [IPG_HIGH_POWER_URL, IPG_YLR_DS],
  },
  {
    id: 'ipg-yls', name: 'YLS Series', family: 'High-Power Laser Cabinets',
    powers: [8000, 10000, 20000, 40000, 60000, 120000],
    image: '/assets/laser-sources/ipg/yls-series.jpg',
    sourceImageUrl: 'https://cdn.ipgphotonics.com/d486cdff-f45c-466f-8c8e-b01400e28e5d/YLS_Series_Card_cms_crd_2x.png?disable=upscale&width=760&format=jpg',
    productType: 'CW / Modulated fiber laser', moduleType: 'Multi-module cabinet', housingForm: 'Sealed industrial cabinet',
    wavelength: '1070 ±5 nm', powerTunability: '10–100%', powerStability: '±1%',
    modulationFrequency: '0–5 kHz', efficiency: '>40%',
    coolingForPower: () => 'Water-cooled', connectorForPower: () => 'HLC (QBH-type) or LCA (QD-style)',
    beamQualityForPower: () => 'Feed/process fiber dependent; see official datasheet',
    applications: ['2D/3D cutting', 'Welding', 'Drilling', 'Cladding', 'Brazing', 'Heat treating'],
    sourceUrls: [IPG_HIGH_POWER_URL, IPG_YLS_DS],
  },
  {
    id: 'ipg-yls-u-eco', name: 'YLS-U-ECO Series', family: 'Ultra-Compact High-Efficiency Lasers',
    powers: [4000, 6000, 10000], image: '/assets/laser-sources/ipg/yls-u-eco-series.jpg',
    sourceImageUrl: 'https://cdn.ipgphotonics.com/6275d977-3d6e-423d-85bb-b01401337478/YLS_ECO_Series_Main_cms_hero_1x.png?disable=upscale&width=834&format=jpg',
    productType: 'CW / Modulated high-efficiency fiber laser', moduleType: 'Ultra-compact cabinet', housingForm: 'Compact cabinet',
    wavelength: '1074 ±6 nm', powerTunability: '10–100%', powerStability: '±2%',
    modulationFrequency: '0–5 kHz', efficiency: '50%', coolingForPower: () => 'Water-cooled',
    connectorForPower: () => 'Confirm by configuration', beamQualityForPower: () => 'BPP 2.0–6.0 mm·mrad, fiber-dependent',
    applications: ['2D/3D cutting', 'Welding', 'Drilling', 'Cladding', 'Brazing', 'Heat treating'],
    sourceUrls: [IPG_EFFICIENCY_URL, IPG_U_ECO_DS],
  },
  {
    id: 'ipg-yls-eco', name: 'YLS-ECO Series', family: 'High-Efficiency High-Power Lasers',
    powers: [20000, 30000], image: '/assets/laser-sources/ipg/yls-eco-series.jpg',
    sourceImageUrl: 'https://cdn.ipgphotonics.com/6275d977-3d6e-423d-85bb-b01401337478/YLS_ECO_Series_Main_cms_hero_2x.png?disable=upscale&width=1668&format=jpg',
    productType: 'CW / Modulated high-efficiency fiber laser', moduleType: 'High-power cabinet', housingForm: 'Industrial cabinet',
    wavelength: '1074 ±6 nm', powerTunability: '10–100%', powerStability: '±2%',
    modulationFrequency: '0–5 kHz', efficiency: '50%', coolingForPower: () => 'Water-cooled',
    connectorForPower: () => 'Confirm by configuration', beamQualityForPower: () => 'BPP 3.9–6.5 mm·mrad, fiber-dependent',
    applications: ['2D/3D cutting', 'Welding', 'Drilling', 'Cladding', 'Brazing', 'Heat treating'],
    sourceUrls: [IPG_EFFICIENCY_URL, IPG_ECO_DS],
  },
];

function buildIpgModels() {
  return ipgSeries.flatMap((series) => series.powers.map((power) => ({
    id: `${series.id}-${power}`,
    brandId: 'ipg-photonics',
    brand: 'IPG Photonics',
    seriesId: series.id,
    series: series.name,
    model: `${series.name.replace(' Series', '')}-${power}`,
    displayName: `${series.name.replace(' Series', '')} ${power >= 1000 ? `${power / 1000} kW` : `${power} W`}`,
    slug: `${series.id}-${power}`,
    productType: series.productType,
    nominalPowerW: power,
    nominalPowerLabel: power >= 1000 ? `${power / 1000} kW` : `${power} W`,
    moduleType: series.moduleType,
    housingForm: series.housingForm,
    polarization: 'Random / configuration-dependent',
    wavelength: series.wavelength,
    powerTunability: series.powerTunability,
    powerStability: series.powerStability,
    powerRedundancy: series.id === 'ipg-yls' ? 'Hot-diode redundancy; configuration-dependent' : 'Not published for this series',
    modulationFrequency: series.modulationFrequency,
    beamQuality: series.beamQualityForPower(power),
    fiberConnectors: series.connectorForPower(power),
    interface: series.id === 'ipg-yls' ? 'Digital / analogue / LaserNet; industrial fieldbus options' : 'Analogue, RS-232 or Ethernet; options vary',
    cooling: series.coolingForPower(power),
    certifications: 'Class 4 laser product; IEC 60825-1:2014 marking shown in official datasheet',
    warranty: 'Confirm with Wavlon/IPG for selected configuration',
    efficiency: series.efficiency,
    applications: series.applications,
    description: `${series.family} with ${power >= 1000 ? `${power / 1000} kW` : `${power} W`} nominal output. Exact options and regional availability require configuration review.`,
    powerRangeMatch: power >= 1500 && power <= 30000,
    compatibilityNote: power >= 1500 && power <= 30000
      ? 'Within at least one published Wavlon machine power range; final engineering validation required.'
      : 'Outside the currently published Wavlon cutting-machine power ranges or intended for a different process; consult engineering.',
    primaryImage: series.image,
    sourceImageUrl: series.sourceImageUrl,
    sourceUrls: series.sourceUrls,
    retrievedAt: RETRIEVED_AT,
  })));
}

const brands = [
  {
    id: 'max-photonics', name: 'MAX Photonics', officialName: 'Maxphotonics',
    website: 'https://maxlasers.com/', logo: '/assets/laser-sources/max/max-logo.svg',
    summary: 'Elite Series CW fiber lasers from compact single-module sources through high-power multi-module cabinets.',
  },
  {
    id: 'ipg-photonics', name: 'IPG Photonics', officialName: 'IPG Photonics Corporation',
    website: 'https://www.ipgphotonics.com/', logo: '/assets/laser-sources/ipg/ipg-logo.svg',
    summary: 'Industrial CW fiber laser racks, high-power cabinets and high-efficiency ECO configurations.',
  },
];

const maxModels = [];
for (const slug of maxSlugs) {
  process.stdout.write(`Scraping ${slug}... `);
  const model = await scrapeMaxModel(slug);
  maxModels.push(model);
  console.log(`${model.nominalPowerLabel} | ${model.certifications}`);
}

for (const series of ipgSeries) {
  await download(series.sourceImageUrl, path.join(ROOT, series.image.replace(/^\//, '')));
}

await download('https://maxlasers.fra1.digitaloceanspaces.com/max-logo-red-long.svg', path.join(MEDIA_DIR, 'max', 'max-logo.svg'));
await download('https://www.ipgphotonics.com/getmedia/5bc4780b-0474-42fd-b85e-c7bd90953ff6/IPG_Logo_Blue_Solid.svg?ext=.svg', path.join(MEDIA_DIR, 'ipg', 'ipg-logo.svg'));

const models = [...maxModels, ...buildIpgModels()].sort((a, b) => a.brand.localeCompare(b.brand) || a.nominalPowerW - b.nominalPowerW);
const catalog = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  retrievedAt: RETRIEVED_AT,
  publicationPolicy: {
    certification: 'Display exact model-level manufacturer wording. Never infer UL certification from ETL or UL-compatible language.',
    compatibility: 'Power-range match is informational only. Wavlon engineering must validate source, head, chiller, electrical and machine-platform compatibility.',
    availability: 'Manufacturer availability and options may change by region and configuration.',
  },
  brands,
  series: [
    { id: 'max-elite', brandId: 'max-photonics', name: 'Elite Series', minPowerW: 500, maxPowerW: 85000, sourceUrls: [MAX_SERIES_URL] },
    ...ipgSeries.map((series) => ({
      id: series.id, brandId: 'ipg-photonics', name: series.name,
      minPowerW: Math.min(...series.powers), maxPowerW: Math.max(...series.powers), sourceUrls: series.sourceUrls,
    })),
  ],
  models,
};

await fs.mkdir(DATA_DIR, { recursive: true });
await fs.writeFile(path.join(DATA_DIR, 'laser-sources.json'), `${JSON.stringify(catalog, null, 2)}\n`);
await fs.writeFile(path.join(DATA_DIR, 'laser-source-source-manifest.json'), `${JSON.stringify({
  retrievedAt: RETRIEVED_AT,
  officialSources: [...new Set(models.flatMap((model) => model.sourceUrls))],
  mediaSources: [...new Set(models.map((model) => model.sourceImageUrl).filter(Boolean))],
}, null, 2)}\n`);

console.log(`Wrote ${models.length} model variants (${maxModels.length} MAX, ${models.length - maxModels.length} IPG).`);
