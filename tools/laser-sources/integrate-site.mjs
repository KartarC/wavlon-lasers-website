import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "..");
const read = (file) => fs.readFile(path.join(root, file), "utf8");
const write = (file, value) => fs.writeFile(path.join(root, file), value);

const sourcePanel = `<div class="mega-panel" id="panel-tech-resonators"><p class="mega-panel-label">Laser Sources</p><div class="mega-products-grid"><a href="/technologies/laser-sources/max-photonics/" class="mega-prod-card"><div class="mega-prod-img" style="background:#f7f8fa;padding:18px;overflow:hidden;"><img src="/assets/laser-sources/max/max-logo.svg" alt="MAX Photonics Elite Series" style="width:100%;height:100%;object-fit:contain;" loading="lazy"></div><div class="mega-prod-info"><div class="mega-prod-name">MAX Elite Series</div><div class="mega-prod-spec">0.5–85kW · 15 reviewed products</div></div></a><a href="/technologies/laser-sources/ipg-photonics/" class="mega-prod-card"><div class="mega-prod-img" style="background:#f7f8fa;padding:18px;overflow:hidden;"><img src="/assets/laser-sources/ipg/ipg-logo.svg" alt="IPG Photonics CW Fiber Lasers" style="width:100%;height:100%;object-fit:contain;" loading="lazy"></div><div class="mega-prod-info"><div class="mega-prod-name">IPG Industrial CW</div><div class="mega-prod-spec">YLR · YLS · ECO</div></div></a><a href="/technologies/laser-sources/compare/" class="mega-prod-card"><div class="mega-prod-img" style="background:linear-gradient(145deg,#0d1b2a,#183a59);padding:22px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:28px;font-weight:900;">A ↔ B</div><div class="mega-prod-info"><div class="mega-prod-name">Compare Sources</div><div class="mega-prod-spec">Choose up to four models</div></div></a></div></div>`;

let header = await read("_partials/header.html");
header = header.replace('data-panel="tech-resonators" href="/contact/"', 'data-panel="tech-resonators" href="/technologies/laser-sources/"');
header = header.replace(/<div class="mega-panel" id="panel-tech-resonators">[\s\S]*?(?=<div class="mega-panel" id="panel-tech-servos">)/, sourcePanel);
if (!header.includes('/technologies/laser-sources/max-photonics/')) throw new Error("Header laser-source panel integration failed");
await write("_partials/header.html", header);

let footer = await read("_partials/footer.html");
if (!footer.includes('/technologies/laser-sources/')) {
  footer = footer.replace('<li><a href="/resources/">Resources &amp; Guides</a></li>', '<li><a href="/resources/">Resources &amp; Guides</a></li><li><a href="/technologies/laser-sources/">Laser Source Hub</a></li>');
}
await write("_partials/footer.html", footer);

const technologyCard = `      <!-- Laser Sources -->
      <a href="/technologies/laser-sources/" class="tech-card">
        <div class="tech-card-img" style="background:#f3f6fa;padding:28px;display:flex;align-items:center;justify-content:center;gap:32px;">
          <img src="/assets/laser-sources/max/max-logo.svg" alt="MAX Photonics" style="width:42%;max-height:70px;object-fit:contain;">
          <img src="/assets/laser-sources/ipg/ipg-logo.svg" alt="IPG Photonics" style="width:42%;max-height:70px;object-fit:contain;">
        </div>
        <div class="tech-card-body">
          <div class="tech-card-eyebrow">Laser Sources</div>
          <h3>MAX Elite &amp; IPG Industrial CW</h3>
          <p>Explore 40 reviewed model and power variants across MAX Photonics Elite Series and IPG Photonics YLR, YLS and ECO platforms. Compare power, efficiency, controls, cooling, safety wording, warranty and current Wavlon range screening.</p>
          <div class="tech-card-links"><span>MAX Elite Series</span><span>IPG CW Fiber Lasers</span><span>Manual Comparison</span></div>
          <div class="tech-card-link" style="margin-top:20px;">Explore Laser Sources &rarr;</div>
        </div>
      </a>
`;
let technologies = await read("technologies/index.html");
technologies = technologies.replace('content="Intelligent laser cutting components — BLT heads, FSCUT controllers, water chillers, IPG/Raycus laser sources, and Yaskawa servo systems."', 'content="Intelligent laser cutting components — BLT heads, FSCUT controllers, water chillers, MAX and IPG laser sources, and Yaskawa servo systems."');
technologies = technologies.replace(/      <!-- Laser Sources — Coming Soon -->[\s\S]*?(?=      <!-- Servo Systems — Coming Soon -->)/, technologyCard);
if (!technologies.includes('MAX Elite &amp; IPG Industrial CW')) throw new Error("Technologies card integration failed");
await write("technologies/index.html", technologies);

let sitemap = await read("sitemap.xml");
if (!sitemap.includes('https://wavlonlasers.com/technologies/laser-sources/')) {
  const routes = [
    "/technologies/laser-sources/",
    "/technologies/laser-sources/max-photonics/",
    "/technologies/laser-sources/ipg-photonics/",
    "/technologies/laser-sources/compare/",
    ...JSON.parse(await fs.readFile(path.join(root, "assets/data/laser-sources.json"), "utf8")).models
      .filter((model) => model.brandId === "max-photonics")
      .map((model) => `/technologies/laser-sources/max-photonics/elite-series/${model.slug}/`),
  ];
  const entries = routes.map((route) => `  <url>\n    <loc>https://wavlonlasers.com${route}</loc>\n    <lastmod>2026-08-20</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${route === "/technologies/laser-sources/" ? "0.8" : route.endsWith("compare/") ? "0.7" : "0.6"}</priority>\n  </url>`).join("\n");
  sitemap = sitemap.replace("</urlset>", `  <!-- Laser Sources -->\n${entries}\n</urlset>`);
}
await write("sitemap.xml", sitemap);

let llms = await read("llms.txt");
if (!llms.includes('Laser Source Hub')) {
  llms = llms.replace('- [Laser Heads and Controllers](https://wavlonlasers.com/technologies/laser-heads/)', '- [Laser Source Hub](https://wavlonlasers.com/technologies/laser-sources/) — MAX Photonics Elite Series and IPG Photonics industrial CW sources, model-level reference specifications and configuration guidance\n- [Compare Laser Sources](https://wavlonlasers.com/technologies/laser-sources/compare/) — manual side-by-side comparison for up to four MAX or IPG source variants\n- [MAX Photonics Elite Series](https://wavlonlasers.com/technologies/laser-sources/max-photonics/) — 15 reviewed products from 500 W to 85 kW with exact certification and warranty wording\n- [IPG Photonics CW Fiber Lasers](https://wavlonlasers.com/technologies/laser-sources/ipg-photonics/) — YLR, YLS, YLS-U-ECO and YLS-ECO representative variants\n- [Laser Heads and Controllers](https://wavlonlasers.com/technologies/laser-heads/)');
}
await write("llms.txt", llms);

console.log("Integrated shared navigation, technologies hub, footer, sitemap and llms.txt.");
