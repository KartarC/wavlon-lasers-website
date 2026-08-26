import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');
const today = '2026-08-20';

const products = [
  {
    id: 'precitec-procutter-thunder',
    brand: 'Precitec',
    name: 'ProCutter Thunder',
    slug: 'procutter-thunder',
    tagline: 'Stable, economical 2D and 3D cutting in the medium-power range.',
    power: '6.6–12 kW',
    applications: ['2D flatbed cutting', 'Tube and profile cutting', '3D free-form cutting'],
    collimation: '100 mm',
    focus: '2D: 150 / 200 mm · 3D: 200 mm',
    numericalAperture: '0.12 max.',
    dimensions: '116 × 113 mm (W × D)',
    weight: 'Not published on the reviewed product page',
    wavelength: 'Confirm for selected laser-source configuration',
    primaryImage: '/assets/laser-heads/precitec/procutter-thunder/thunder-product-transparent.png',
    heroImage: '/assets/laser-heads/precitec/procutter-thunder/thunder-hero.webp',
    sourceUrl: 'https://www.precitec.com/laser-cutting/products/laser-cutting-head/procutter-thunder/',
    features: [
      ['Stable distance sensing', 'A low-drift distance sensor supports clean, reproducible cuts during high machine acceleration.'],
      ['Tool-free service access', 'Protective lenses are designed for quick access and tool-free replacement to reduce service time.'],
      ['Flexible machine integration', 'One platform supports flatbed, tube, profile and 3D free-form cutting configurations.'],
      ['CutBox Pro connectivity', 'Fieldbus communication brings focus control and process-data signals into the machine PLC environment.'],
      ['Integrated cooling', 'Cooling and process-protection-glass monitoring support stable results during continuous operation.'],
      ['Dynamic focus drive', 'The focus system is designed for short non-productive time across defined industrial processes.']
    ],
    images: [
      ['/assets/laser-heads/precitec/procutter-thunder/thunder-hero.webp', 'ProCutter Thunder in an industrial cutting application'],
      ['/assets/laser-heads/precitec/procutter-thunder/thunder-product-transparent.png', 'ProCutter Thunder product view'],
      ['/assets/laser-heads/precitec/procutter-thunder/thunder-benefits.webp', 'ProCutter Thunder feature overview'],
      ['/assets/laser-heads/precitec/procutter-thunder/cutbox-pro.webp', 'CutBox Pro fieldbus control unit']
    ],
    sourceImages: [
      'https://www.precitec.com/fileadmin/products/laser-cutting/procutter-thunder/Thunder_4_1920x480.jpg',
      'https://www.precitec.com/fileadmin/products/laser-cutting/procutter-thunder/ProCutter_Thunder_12kW_768x792.jpg',
      'https://www.precitec.com/fileadmin/products/laser-cutting/procutter-thunder/ProCutter_Thunder_792x600.jpg',
      'https://www.precitec.com/fileadmin/products/laser-cutting/CutBox-Pro/CutBox_Pro_Overview_792x600.jpg'
    ]
  },
  {
    id: 'precitec-procutter-2-0',
    brand: 'Precitec',
    name: 'ProCutter 2.0',
    slug: 'procutter-2-0',
    tagline: 'Automated high-power cutting for flatbed, tube and bevel systems.',
    power: 'Up to 85 kW',
    applications: ['2D flatbed cutting', 'Tube cutting', 'Bevel cutting'],
    collimation: '100 mm',
    focus: '150 / 200 / 250 / 300 mm by power level',
    numericalAperture: '0.13 / 0.16',
    dimensions: '96 × 134 mm (W × D)',
    weight: '6.9 kg (M 3.0)',
    wavelength: '1030–1090 nm',
    primaryImage: '/assets/laser-heads/precitec/procutter-2-0/procutter-product-transparent.png',
    heroImage: '/assets/laser-heads/precitec/procutter-2-0/procutter-hero.webp',
    sourceUrl: 'https://www.precitec.com/laser-cutting/products/laser-cutting-head/pro-cutter/',
    features: [
      ['Up to 85 kW', 'A high-load thermal and optical design supports industrial cutting configurations up to 85 kW.'],
      ['Consistent cut quality', 'The optical and sensor platform is designed for around-the-clock cutting at high laser power.'],
      ['Intelligent sensors', 'Integrated monitoring tracks critical components and process parameters for planned maintenance.'],
      ['PierceTec support', 'Automated piercing control is designed to improve hole quality and reduce cycle time and rework.'],
      ['Broad source compatibility', 'Precitec states compatibility with laser sources in the field; Wavlon validates the final source-head pairing.'],
      ['Connected diagnostics', 'Status and error information can be surfaced through the ProCutter app and machine integration.']
    ],
    images: [
      ['/assets/laser-heads/precitec/procutter-2-0/procutter-hero.webp', 'ProCutter 2.0 in a high-power cutting application'],
      ['/assets/laser-heads/precitec/procutter-2-0/procutter-product-transparent.png', 'ProCutter 2.0 product view'],
      ['/assets/laser-heads/precitec/procutter-2-0/procutter-detail-01.webp', 'ProCutter 2.0 production detail 01'],
      ['/assets/laser-heads/precitec/procutter-2-0/procutter-detail-02.webp', 'ProCutter 2.0 production detail 02'],
      ['/assets/laser-heads/precitec/procutter-2-0/procutter-detail-03.webp', 'ProCutter 2.0 production detail 03'],
      ['/assets/laser-heads/precitec/procutter-2-0/procutter-detail-04.webp', 'ProCutter 2.0 production detail 04'],
      ['/assets/laser-heads/precitec/procutter-2-0/procutter-detail-06.webp', 'ProCutter 2.0 production detail 06'],
      ['/assets/laser-heads/precitec/procutter-2-0/procutter-detail-07.webp', 'ProCutter 2.0 production detail 07'],
      ['/assets/laser-heads/precitec/procutter-2-0/procutter-detail-08.webp', 'ProCutter 2.0 production detail 08'],
      ['/assets/laser-heads/precitec/procutter-2-0/procutter-detail-09.webp', 'ProCutter 2.0 production detail 09'],
      ['/assets/laser-heads/precitec/procutter-2-0/procutter-app.webp', 'ProCutter app overview'],
      ['/assets/laser-heads/precitec/procutter-2-0/cutbox-pro-distance.webp', 'CutBox Pro EtherCAT distance measurement']
    ],
    sourceImages: [
      'https://www.precitec.com/fileadmin/products/laser-cutting/procutter-2.0/Laserschneiden_Produkte_Detail_HEADER_ProCutter_20_02.jpg',
      'https://www.precitec.com/fileadmin/products/laser-cutting/procutter-2.0/ProCutter_2.0_50kW_320x767.jpg',
      'https://www.precitec.com/fileadmin/products/laser-cutting/procutter-2.0/Laserschneiden_Produkte_Detail_ProCutter_20_01.jpg',
      'https://www.precitec.com/fileadmin/products/laser-cutting/procutter-2.0/Laserschneiden_Produkte_Detail_ProCutter_20_02.jpg',
      'https://www.precitec.com/fileadmin/products/laser-cutting/procutter-2.0/Laserschneiden_Produkte_Detail_ProCutter_20_03.jpg',
      'https://www.precitec.com/fileadmin/products/laser-cutting/procutter-2.0/Laserschneiden_Produkte_Detail_ProCutter_20_04.jpg',
      'https://www.precitec.com/fileadmin/products/laser-cutting/procutter-2.0/Laserschneiden_Produkte_Detail_ProCutter_20_06.jpg',
      'https://www.precitec.com/fileadmin/products/laser-cutting/procutter-2.0/Laserschneiden_Produkte_Detail_ProCutter_20_07.jpg',
      'https://www.precitec.com/fileadmin/products/laser-cutting/procutter-2.0/Laserschneiden_Produkte_Detail_ProCutter_20_08.jpg',
      'https://www.precitec.com/fileadmin/products/laser-cutting/procutter-2.0/Laserschneiden_Produkte_Detail_ProCutter_20_09.jpg',
      'https://www.precitec.com/fileadmin/products/laser-cutting/procutter-2.0/explanation_ProCutter_APP.jpg',
      'https://www.precitec.com/fileadmin/products/laser-cutting/CutBox-Pro/Distance_Measurement_with_CutBox_Pro_Ethercat_1200x792.jpg'
    ]
  }
];

const read = (relative) => fs.readFile(path.join(root, relative), 'utf8');
const write = async (relative, contents) => {
  const target = path.join(root, relative);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, `${contents.trim()}\n`, 'utf8');
};

const header = await read('_partials/header.html');
const footer = await read('_partials/footer.html');

function breadcrumbs(items) {
  return `<nav class="lh2-crumbs" aria-label="Breadcrumb">${items.map((item, index) => `${index ? '<span>/</span>' : ''}${item.href ? `<a href="${item.href}">${item.label}</a>` : `<span>${item.label}</span>`}`).join('')}</nav>`;
}

function page({ title, description, canonical, ogImage, body, schema }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${title}</title>
<meta name="description" content="${description}"/>
<link rel="canonical" href="${canonical}"/>
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${description}"/>
<meta property="og:type" content="website"/>
<meta property="og:image" content="https://wavlonlasers.com${ogImage}"/>
<meta property="og:url" content="${canonical}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${title}"/>
<meta name="twitter:description" content="${description}"/>
<meta name="twitter:image" content="https://wavlonlasers.com${ogImage}"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
<link rel="shortcut icon" href="/favicon.ico"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png"/>
<link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon-192.png"/>
<link rel="apple-touch-icon" sizes="512x512" href="/assets/favicon-512.png"/>
<link rel="stylesheet" href="/shared.css"/>
<link rel="stylesheet" href="/assets/laser-heads.css"/>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body class="laser-head-page">
<!-- HEADER — inline copy -->
${header}
${body}
<!-- FOOTER — inline copy -->
${footer}
<script src="/nav.js"></script>
</body>
</html>`;
}

function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.label, item: `https://wavlonlasers.com${item.href}` }))
  };
}

const hubCrumbs = [{ label: 'Home', href: '/' }, { label: 'Technologies', href: '/technologies/' }, { label: 'Laser Heads', href: '/technologies/laser-heads/' }];
const hubBody = `<main>
<section class="lh2-hero">
  <div class="lh2-wrap">
    ${breadcrumbs(hubCrumbs)}
    <div class="lh2-hero-grid">
      <div>
        <span class="lh2-kicker">Configurable cutting technology</span>
        <h1>Laser Heads Built Around <em>Your Work.</em></h1>
        <p class="lh2-lead">Choose factory-matched BOCI intelligent cutting heads or Precitec ProCutter technology. Wavlon validates the cutting head, laser source, controller and machine platform as one production system.</p>
        <div class="lh2-actions"><a class="lh2-btn lh2-btn--primary" href="#brands">Explore head options</a><a class="lh2-btn" href="/contact/#quote">Configure a machine</a></div>
      </div>
      <div class="lh2-stage" aria-label="BOCI BLT and Precitec ProCutter 2.0 laser cutting heads">
        <div class="lh2-stage-brand lh2-stage-brand--boci"><strong>BOCI</strong><span>BLT intelligent cutting</span></div>
        <img class="stage-left" src="/assets/laser-heads/boci-blt-hero-transparent.png" alt="BOCI BLT intelligent cutting head"/>
        <div class="lh2-stage-divider" aria-hidden="true"></div>
        <img class="stage-main" src="/assets/laser-heads/precitec/procutter-2-0/procutter-product-transparent.png" alt="Precitec ProCutter 2.0"/>
        <div class="lh2-stage-brand lh2-stage-brand--precitec"><img src="/assets/laser-heads/precitec/precitec-logo.svg" alt="Precitec"/><span>ProCutter 2.0</span></div>
      </div>
    </div>
    <div class="lh2-stats"><div class="lh2-stat"><strong>2</strong><span>Head brands</span></div><div class="lh2-stat"><strong>2D · 3D</strong><span>Cutting formats</span></div><div class="lh2-stat"><strong>Tube</strong><span>Profile-ready options</span></div><div class="lh2-stat"><strong>85 kW</strong><span>Precitec maximum</span></div></div>
  </div>
</section>

<section class="lh2-section" id="brands"><div class="lh2-wrap">
  <div class="lh2-head"><div><span class="lh2-eyebrow">Choose your platform</span><h2>Two Proven Cutting-Head Ecosystems</h2></div><p>Start with the brand and application. Final compatibility is confirmed against the selected laser source, power level, motion system and cutting process.</p></div>
  <div class="lh2-brand-grid">
    <a class="lh2-brand-card lh2-brand-card--dark" href="/technologies/laser-heads/2d-cutting-heads/">
      <div><div class="lh2-brand-logo"><span class="lh2-wordmark">BOCI <small>BOCHU INTELLIGENT CUTTING</small></span></div><h3>BLT Intelligent Heads</h3><p>Deep integration with Bochu FSCUT controllers for 2D sheet, tube, profile, bevel and structural-steel cutting.</p><span class="lh2-inline-link">Explore the complete BLT lineup →</span></div>
      <img class="lh2-brand-machine" src="/assets/laser-heads/boci-blt-hero-transparent.png" alt="BOCI BLT4 intelligent cutting head" loading="lazy"/>
    </a>
    <a class="lh2-brand-card" href="/technologies/laser-heads/precitec/">
      <div><div class="lh2-brand-logo"><img src="/assets/laser-heads/precitec/precitec-logo.svg" alt="Precitec"/></div><h3>ProCutter Options</h3><p>German-engineered cutting heads for economical medium-power work and automated high-power production.</p><span class="lh2-inline-link">Explore Precitec options →</span></div>
      <img class="lh2-brand-machine" src="/assets/laser-heads/precitec/procutter-thunder/thunder-product-transparent.png" alt="Precitec ProCutter Thunder" loading="lazy"/>
    </a>
  </div>
</div></section>

<section class="lh2-section lh2-section--soft"><div class="lh2-wrap">
  <div class="lh2-head"><div><span class="lh2-eyebrow">Precitec options</span><h2>ProCutter, Selected by Application</h2></div><p>Two focused upgrade paths cover cost-conscious medium-power cutting and demanding automated high-power production.</p></div>
  <div class="lh2-product-grid">
    ${products.map((product) => `<a class="lh2-product-card" href="/technologies/laser-heads/precitec/${product.slug}/"><div class="lh2-product-media"><span class="lh2-product-badge">Factory-fit option</span><img src="${product.primaryImage}" alt="Precitec ${product.name}" loading="lazy"/></div><div class="lh2-product-copy"><img class="brand-mark" src="/assets/laser-heads/precitec/precitec-logo.svg" alt="Precitec"/><h3>${product.name}</h3><p>${product.tagline}</p><div class="lh2-spec-chips"><span class="lh2-chip">${product.power}</span><span class="lh2-chip">${product.applications[0]}</span><span class="lh2-chip">${product.applications[1]}</span></div><span class="lh2-inline-link">View specifications and images →</span></div></a>`).join('')}
  </div>
</div></section>

<section class="lh2-section"><div class="lh2-wrap">
  <div class="lh2-head"><div><span class="lh2-eyebrow">BOCI ecosystem preserved</span><h2>Heads and Controls for Every Motion Platform</h2></div><p>The existing BOCI BLT and Bochu controller library remains fully available alongside the new Precitec choices.</p></div>
  <div class="lh2-path-grid">
    <div class="lh2-path"><span class="num">01 / 04</span><h3>2D Sheet Cutting</h3><p>BLT3 through BLT9 heads for entry, production and ultra-high-power flat-sheet systems.</p><a href="/technologies/laser-heads/2d-cutting-heads/">Browse 2D heads →</a></div>
    <div class="lh2-path"><span class="num">02 / 04</span><h3>Tube &amp; Profile</h3><p>BLT T-Series heads with profile sensing for round, square and structural sections.</p><a href="/technologies/laser-heads/tube-cutting-heads/">Browse tube heads →</a></div>
    <div class="lh2-path"><span class="num">03 / 04</span><h3>3D &amp; Bevel</h3><p>Plane-bevel and structural-steel configurations for complex geometry and prepared edges.</p><a href="/technologies/laser-heads/3d-cutting-heads/">Browse 3D heads →</a></div>
    <div class="lh2-path"><span class="num">04 / 04</span><h3>Bochu Controls</h3><p>FSCUT hardware with CypCut, HypCut and TubePro software for matched machine control.</p><a href="/technologies/laser-heads/controllers/">Browse controllers →</a></div>
  </div>
</div></section>

<section class="lh2-section lh2-section--dark"><div class="lh2-wrap"><div class="lh2-note"><div><span class="lh2-eyebrow">Engineering validation included</span><h2>Choose the head as part of the complete machine package.</h2><p>Tell us your material mix, thickness range, cutting geometry and production target. Wavlon will confirm the correct head, source, controller and cooling configuration.</p></div><a class="lh2-btn lh2-btn--light" href="/contact/#quote">Configure your machine →</a></div></div></section>
</main>`;

await write('technologies/laser-heads/index.html', page({
  title: 'Laser Cutting Heads | BOCI & Precitec | Wavlon',
  description: 'Compare BOCI BLT and Precitec ProCutter laser cutting head options for Wavlon sheet, tube, profile and 3D cutting systems.',
  canonical: 'https://wavlonlasers.com/technologies/laser-heads/',
  ogImage: '/assets/laser-heads/precitec/procutter-thunder/thunder-hero.webp',
  body: hubBody,
  schema: breadcrumbSchema(hubCrumbs)
}));

const brandCrumbs = [...hubCrumbs.slice(0, 2), { label: 'Laser Heads', href: '/technologies/laser-heads/' }, { label: 'Precitec', href: '/technologies/laser-heads/precitec/' }];
const brandBody = `<main>
<section class="lh2-detail-hero"><div class="lh2-wrap"><div class="lh2-detail-grid"><div>${breadcrumbs(brandCrumbs)}<img class="lh2-detail-logo" src="/assets/laser-heads/precitec/precitec-logo.svg" alt="Precitec"/><span class="lh2-kicker">Factory-fit laser cutting heads</span><h1>Precitec ProCutter Options</h1><p class="lh2-lead">Select ProCutter Thunder for a focused medium-power configuration or ProCutter 2.0 for automated high-power production up to 85 kW.</p><div class="lh2-actions"><a class="lh2-btn lh2-btn--primary" href="#models">Compare options</a><a class="lh2-btn" href="/contact/#quote">Request configuration help</a></div><a class="lh2-source-link" href="https://www.precitec.com/laser-cutting/products/laser-cutting-head/" target="_blank" rel="noopener">Official Precitec laser-head portfolio <svg class="lh2-external-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3h7v7M13 3 5 11M11 8v5H3V5h5"/></svg></a></div><div class="lh2-detail-visual"><img src="/assets/laser-heads/precitec/procutter-thunder/thunder-product-transparent.png" alt="Precitec ProCutter Thunder"/></div></div></div></section>
<section class="lh2-section" id="models"><div class="lh2-wrap"><div class="lh2-head"><div><span class="lh2-eyebrow">Available through Wavlon</span><h2>Choose by Power and Process</h2></div><p>Published figures below follow the current official Precitec product pages. Wavlon confirms the exact configuration before order.</p></div><div class="lh2-product-grid">${products.map((product) => `<a class="lh2-product-card" href="/technologies/laser-heads/precitec/${product.slug}/"><div class="lh2-product-media"><span class="lh2-product-badge">${product.power}</span><img src="${product.primaryImage}" alt="${product.name}"/></div><div class="lh2-product-copy"><img class="brand-mark" src="/assets/laser-heads/precitec/precitec-logo.svg" alt="Precitec"/><h3>${product.name}</h3><p>${product.tagline}</p><div class="lh2-spec-chips">${product.applications.map((application) => `<span class="lh2-chip">${application}</span>`).join('')}</div><span class="lh2-inline-link">Explore ${product.name} →</span></div></a>`).join('')}</div></div></section>
<section class="lh2-section lh2-section--soft"><div class="lh2-wrap"><div class="lh2-two-col"><div class="lh2-copy"><span class="lh2-eyebrow">Why Precitec</span><h2>Sensor-led cutting and serviceable optics</h2><p>Precitec’s ProCutter family combines distance sensing, focus control, cooling and process monitoring in compact heads designed for industrial integration.</p><ul class="lh2-list"><li>Stable, repeatable standoff control for demanding motion</li><li>Accessible protective optics for faster maintenance</li><li>Fieldbus and PLC integration through CutBox Pro</li><li>Flatbed, tube, profile, 3D and bevel configurations across the selected range</li></ul></div><div class="lh2-copy"><span class="lh2-eyebrow">Wavlon integration</span><h2>Configured as a complete system</h2><p>A cutting head cannot be selected by laser power alone. Fiber interface, numerical aperture, controller integration, focal lengths, cooling and collision strategy all affect the final machine configuration.</p><div class="lh2-disclaimer">Compatibility and availability depend on the selected Wavlon machine, laser source, power level and regional product configuration. Specifications may change; final order documentation governs.</div></div></div></div></section>
<section class="lh2-section lh2-section--dark"><div class="lh2-wrap"><div class="lh2-note"><div><span class="lh2-eyebrow">Ready to configure</span><h2>Match a Precitec head to your Wavlon machine.</h2><p>Share your material, thickness, geometry and throughput goals. Our team will prepare the appropriate cutting-package recommendation.</p></div><a class="lh2-btn lh2-btn--light" href="/contact/#quote">Talk to Wavlon →</a></div></div></section>
</main>`;

await write('technologies/laser-heads/precitec/index.html', page({
  title: 'Precitec Laser Heads | Wavlon Lasers',
  description: 'Explore Precitec ProCutter Thunder and ProCutter 2.0 laser cutting head options available on configured Wavlon machines.',
  canonical: 'https://wavlonlasers.com/technologies/laser-heads/precitec/',
  ogImage: products[0].heroImage,
  body: brandBody,
  schema: breadcrumbSchema(brandCrumbs)
}));

function productBody(product) {
  const crumbs = [...brandCrumbs, { label: product.name, href: `/technologies/laser-heads/precitec/${product.slug}/` }];
  return { crumbs, html: `<main>
<section class="lh2-detail-hero${product.slug === 'procutter-2-0' ? ' lh2-detail-hero--procutter-2-0' : ''}"><div class="lh2-wrap"><div class="lh2-detail-grid"><div>${breadcrumbs(crumbs)}<img class="lh2-detail-logo" src="/assets/laser-heads/precitec/precitec-logo.svg" alt="Precitec"/><span class="lh2-kicker">Laser cutting head option</span><h1>${product.name}</h1><p class="lh2-lead">${product.tagline}</p><div class="lh2-actions"><a class="lh2-btn lh2-btn--primary" href="/contact/#quote">Request this configuration</a><a class="lh2-btn" href="#specifications">View specifications</a></div><a class="lh2-source-link" href="${product.sourceUrl}" target="_blank" rel="noopener">Review the official Precitec product page <svg class="lh2-external-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3h7v7M13 3 5 11M11 8v5H3V5h5"/></svg></a></div><div class="lh2-detail-visual"><img src="${product.primaryImage}" alt="Precitec ${product.name}"/></div></div><div class="lh2-spec-grid"><div class="lh2-spec"><span>Laser power</span><strong>${product.power}</strong></div><div class="lh2-spec"><span>Primary use</span><strong>${product.applications[0]}</strong></div><div class="lh2-spec"><span>Collimation</span><strong>${product.collimation}</strong></div><div class="lh2-spec"><span>Numerical aperture</span><strong>${product.numericalAperture}</strong></div><div class="lh2-spec"><span>Integration</span><strong>Factory validated</strong></div></div></div></section>
<section class="lh2-section"><div class="lh2-wrap"><div class="lh2-head"><div><span class="lh2-eyebrow">Core advantages</span><h2>Designed for Stable Industrial Cutting</h2></div><p>Feature descriptions are summarized from Precitec’s current official product information and presented for configuration guidance.</p></div><div class="lh2-feature-grid">${product.features.map(([name, text], index) => `<div class="lh2-feature"><span class="icon">${String(index + 1).padStart(2, '0')}</span><h3>${name}</h3><p>${text}</p></div>`).join('')}</div></div></section>
<section class="lh2-section lh2-section--soft" id="specifications"><div class="lh2-wrap"><div class="lh2-two-col"><div class="lh2-copy"><span class="lh2-eyebrow">Technical reference</span><h2>${product.name} specifications</h2><p>Use these published values for initial evaluation. Final Wavlon engineering review confirms the production configuration.</p><table class="lh2-data"><tbody><tr><th>Maximum laser power</th><td>${product.power}</td></tr><tr><th>Applications</th><td>${product.applications.join(' · ')}</td></tr><tr><th>Collimating focal length</th><td>${product.collimation}</td></tr><tr><th>Focusing focal lengths</th><td>${product.focus}</td></tr><tr><th>Maximum NA</th><td>${product.numericalAperture}</td></tr><tr><th>Dimensions</th><td>${product.dimensions}</td></tr><tr><th>Weight</th><td>${product.weight}</td></tr><tr><th>Wavelength</th><td>${product.wavelength}</td></tr></tbody></table></div><div class="lh2-copy"><span class="lh2-eyebrow">Configuration scope</span><h2>Match the entire optical path</h2><p>Wavlon reviews the source fiber, connector, head optics, focus range, cooling, controller and machine kinematics together.</p><ul class="lh2-list"><li>Laser-source power, wavelength and beam delivery</li><li>Material family, thickness range and assist gas</li><li>Flatbed, tube, profile, 3D or bevel motion</li><li>Piercing strategy, monitoring and maintenance goals</li></ul><div class="lh2-disclaimer">Published specifications are manufacturer reference values retrieved ${today}. Availability and exact configuration must be confirmed in the Wavlon quotation and technical agreement.</div></div></div></div></section>
<section class="lh2-section"><div class="lh2-wrap"><div class="lh2-head"><div><span class="lh2-eyebrow">Official product imagery</span><h2>${product.name} Gallery</h2></div><p>Locally hosted, optimized copies of the official product images support faster browsing and reliable product presentation.</p></div><div class="lh2-gallery">${product.images.map(([src, caption], index) => `<figure><img src="${src}" alt="${caption}" loading="${index ? 'lazy' : 'eager'}"/><figcaption>${caption}</figcaption></figure>`).join('')}</div></div></section>
<section class="lh2-section lh2-section--dark"><div class="lh2-wrap"><div class="lh2-note"><div><span class="lh2-eyebrow">Add to a Wavlon machine</span><h2>Configure ${product.name} with the right source and controller.</h2><p>Our team will confirm compatibility, options, lead time and the complete machine specification.</p></div><a class="lh2-btn lh2-btn--light" href="/contact/#quote">Request a configuration →</a></div></div></section>
</main>` };
}

for (const product of products) {
  const rendered = productBody(product);
  const canonical = `https://wavlonlasers.com/technologies/laser-heads/precitec/${product.slug}/`;
  const productSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema(rendered.crumbs),
      {
        '@type': 'Product',
        name: `Precitec ${product.name}`,
        description: product.tagline,
        brand: { '@type': 'Brand', name: 'Precitec' },
        image: product.images.map(([image]) => `https://wavlonlasers.com${image}`),
        url: canonical,
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Laser power', value: product.power },
          { '@type': 'PropertyValue', name: 'Applications', value: product.applications.join(', ') },
          { '@type': 'PropertyValue', name: 'Maximum numerical aperture', value: product.numericalAperture }
        ]
      }
    ]
  };
  await write(`technologies/laser-heads/precitec/${product.slug}/index.html`, page({
    title: `${product.name} Laser Head | Wavlon Lasers`,
    description: `${product.name} specifications, features and official imagery for configured Wavlon laser cutting machines. ${product.power}.`,
    canonical,
    ogImage: product.primaryImage,
    body: rendered.html,
    schema: productSchema
  }));
}

const catalog = {
  schemaVersion: 1,
  retrievedAt: today,
  publicationPolicy: 'Manufacturer specifications are reference values. Wavlon must validate the complete source, head, controller, cooling and machine configuration.',
  brands: [
    { id: 'boci-bochu', name: 'BOCI / Bochu', hub: '/technologies/laser-heads/2d-cutting-heads/', controllerHub: '/technologies/laser-heads/controllers/' },
    { id: 'precitec', name: 'Precitec', website: 'https://www.precitec.com/laser-cutting/products/laser-cutting-head/', logo: '/assets/laser-heads/precitec/precitec-logo.svg' }
  ],
  products
};
await write('assets/data/laser-heads.json', JSON.stringify(catalog, null, 2));
await write('assets/data/precitec-source-manifest.json', JSON.stringify({ retrievedAt: today, pages: ['https://www.precitec.com/laser-cutting/products/laser-cutting-head/', ...products.map((item) => item.sourceUrl)], images: products.flatMap((item) => item.sourceImages) }, null, 2));

const techPanel = `<div class="mega-panel active" id="panel-tech-heads"><p class="mega-panel-label">Laser Heads &amp; Controllers</p><div class="mega-products-grid"><a href="/technologies/laser-heads/2d-cutting-heads/" class="mega-prod-card"><div class="mega-prod-img" style="background:#f0f2f5;padding:8px;overflow:hidden;"><img src="/assets/laser-heads/boci-blt-hero-transparent.png" alt="BOCI BLT cutting heads" style="width:100%;height:100%;object-fit:contain;" loading="lazy"></div><div class="mega-prod-info"><div class="mega-prod-name">BOCI BLT Heads</div><div class="mega-prod-spec">2D · Tube · 3D · 3–60kW</div></div></a><a href="/technologies/laser-heads/precitec/procutter-thunder/" class="mega-prod-card"><div class="mega-prod-img" style="background:#f5f7f9;padding:8px;overflow:hidden;"><img src="/assets/laser-heads/precitec/procutter-thunder/thunder-product-transparent.png" alt="Precitec ProCutter Thunder" style="width:100%;height:100%;object-fit:contain;" loading="lazy"></div><div class="mega-prod-info"><div class="mega-prod-name">ProCutter Thunder</div><div class="mega-prod-spec">6.6–12kW · 2D / 3D / Tube</div></div></a><a href="/technologies/laser-heads/precitec/procutter-2-0/" class="mega-prod-card"><div class="mega-prod-img" style="background:#f5f7f9;padding:8px;overflow:hidden;"><img src="/assets/laser-heads/precitec/procutter-2-0/procutter-product-transparent.png" alt="Precitec ProCutter 2.0" style="width:100%;height:100%;object-fit:contain;" loading="lazy"></div><div class="mega-prod-info"><div class="mega-prod-name">ProCutter 2.0</div><div class="mega-prod-spec">Up to 85kW · Flat / Tube / Bevel</div></div></a><a href="/technologies/laser-heads/controllers/" class="mega-prod-card"><div class="mega-prod-img" style="background:#f0f2f5;padding:8px;overflow:hidden;"><img src="/assets/fscut4000e.png" alt="Bochu FSCUT controllers" style="width:100%;height:100%;object-fit:contain;" loading="lazy"></div><div class="mega-prod-info"><div class="mega-prod-name">Bochu Controllers</div><div class="mega-prod-spec">FSCUT · CypCut · HypCut</div></div></a></div></div>`;

let sharedHeader = await read('_partials/header.html');
sharedHeader = sharedHeader.replace(/<div class="mega-panel active" id="panel-tech-heads">[\s\S]*?<\/div><div class="mega-panel" id="panel-tech-chillers">/, `${techPanel}<div class="mega-panel" id="panel-tech-chillers">`);
if (!sharedHeader.includes('Precitec ProCutter Thunder')) throw new Error('Failed to update Technologies mega menu.');
if (!sharedHeader.includes('mobile-nav-btn">Technologies')) {
  const mobileTech = `<li><button class="mobile-nav-btn">Technologies <span>+</span></button><ul class="mobile-sub">
      <li><a href="/technologies/laser-heads/">Laser Head Hub</a></li>
      <li><a href="/technologies/laser-heads/precitec/procutter-thunder/">Precitec ProCutter Thunder</a></li>
      <li><a href="/technologies/laser-heads/precitec/procutter-2-0/">Precitec ProCutter 2.0</a></li>
      <li><a href="/technologies/laser-heads/controllers/">Bochu Controllers</a></li>
      <li><a href="/technologies/laser-sources/">Laser Source Hub</a></li>
    </ul></li>`;
  sharedHeader = sharedHeader.replace(/(<li><button class="mobile-nav-btn">Machines[\s\S]*?<\/ul><\/li>)\s*(<li><button class="mobile-nav-btn">Industries)/, `$1\n    ${mobileTech}\n    $2`);
}
await write('_partials/header.html', sharedHeader);

let sharedFooter = await read('_partials/footer.html');
if (!sharedFooter.includes('Laser Head Hub')) sharedFooter = sharedFooter.replace('<li><a href="/technologies/laser-sources/">Laser Source Hub</a></li>', '<li><a href="/technologies/laser-heads/">Laser Head Hub</a></li><li><a href="/technologies/laser-sources/">Laser Source Hub</a></li>');
await write('_partials/footer.html', sharedFooter);

let technologies = await read('technologies/index.html');
const techCard = `<!-- Laser Heads & Controllers — LIVE -->
      <a href="/technologies/laser-heads/" class="tech-card">
        <div class="tech-card-img"><img src="/assets/laser-heads/precitec/procutter-thunder/thunder-hero.webp" alt="BOCI and Precitec laser cutting head options" loading="lazy"/></div>
        <div class="tech-card-body"><div class="tech-card-eyebrow">Laser Heads &amp; Controllers</div><h3>BOCI BLT &amp; Precitec ProCutter</h3><p>Configure Wavlon machines with BOCI intelligent cutting heads and matched Bochu controls, or select Precitec ProCutter Thunder and ProCutter 2.0 options for medium- and high-power production.</p><div class="tech-card-links"><a href="/technologies/laser-heads/2d-cutting-heads/">BOCI BLT Heads</a><a href="/technologies/laser-heads/precitec/">Precitec Heads</a><a href="/technologies/laser-heads/controllers/">Controllers</a></div><div class="tech-card-link" style="margin-top:20px;">Explore Laser Heads &amp; Controllers &rarr;</div></div>
      </a>`;
technologies = technologies.replace(/<!-- Laser Heads & Controllers — LIVE -->[\s\S]*?<\/a>\s*\n\s*<!-- Water Chillers — Coming Soon -->/, `${techCard}\n\n      <!-- Water Chillers — Coming Soon -->`);
technologies = technologies.replace('The components that power every Wavlon fiber laser machine — BOCI BLT intelligent laser cutting heads, Bochu controllers, water chillers, laser sources, and servo systems.', 'The components behind every Wavlon fiber laser machine — BOCI BLT and Precitec laser heads, Bochu controllers, water chillers, laser sources, and servo systems.');
await write('technologies/index.html', technologies);

let sitemap = await read('sitemap.xml');
sitemap = sitemap.replace(/(<loc>https:\/\/wavlonlasers\.com\/technologies\/laser-heads\/<\/loc>\s*<lastmod>)[^<]+/, `$1${today}`);
if (!sitemap.includes('/technologies/laser-heads/precitec/')) {
  const routes = ['/technologies/laser-heads/precitec/', '/technologies/laser-heads/precitec/procutter-thunder/', '/technologies/laser-heads/precitec/procutter-2-0/'];
  const xml = routes.map((route) => `  <url>\n    <loc>https://wavlonlasers.com${route}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${route.endsWith('/precitec/') ? '0.7' : '0.65'}</priority>\n  </url>`).join('\n');
  sitemap = sitemap.replace('  <!-- Guides -->', `  <!-- Precitec Laser Heads -->\n${xml}\n\n  <!-- Guides -->`);
}
await write('sitemap.xml', sitemap);

let llms = await read('llms.txt');
llms = llms.replace(/^- \[Laser Heads and Controllers\]\(https:\/\/wavlonlasers\.com\/technologies\/laser-heads\/\).*$/m, '- [Laser Heads and Controllers](https://wavlonlasers.com/technologies/laser-heads/) — BOCI BLT and Precitec ProCutter options with Bochu control systems');
if (!llms.includes('Precitec ProCutter Thunder')) llms = llms.replace('- [Tube Cutting Heads](https://wavlonlasers.com/technologies/laser-heads/tube-cutting-heads/)', '- [Precitec Laser Heads](https://wavlonlasers.com/technologies/laser-heads/precitec/) — ProCutter Thunder and ProCutter 2.0 factory-fit options\n- [Precitec ProCutter Thunder](https://wavlonlasers.com/technologies/laser-heads/precitec/procutter-thunder/) — 6.6–12 kW for 2D, tube/profile and 3D cutting\n- [Precitec ProCutter 2.0](https://wavlonlasers.com/technologies/laser-heads/precitec/procutter-2-0/) — automated high-power flatbed, tube and bevel cutting up to 85 kW\n- [Tube Cutting Heads](https://wavlonlasers.com/technologies/laser-heads/tube-cutting-heads/)');
await write('llms.txt', llms);

console.log(`Generated laser-head hub, Precitec brand page and ${products.length} product pages.`);
