import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "..");
const catalog = JSON.parse(await fs.readFile(path.join(root, "assets", "data", "laser-sources.json"), "utf8"));
const migrationDir = path.join(root, "supabase", "migrations");
const migrationPath = path.join(migrationDir, "20260820180000_laser_source_catalog.sql");

const literal = (value) => {
  if (value === null || value === undefined || value === "") return "null";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);
  return `'${String(value).replaceAll("'", "''")}'`;
};
const json = (value) => `${literal(JSON.stringify(value))}::jsonb`;

const brandRows = catalog.brands.map((brand) => `(${[
  literal(brand.id), literal(brand.name), literal(brand.officialName), literal(brand.website),
  literal(brand.logo), literal(brand.summary), literal(catalog.generatedAt.slice(0, 10)),
].join(", ")})`).join(",\n");

const seriesRows = catalog.series.map((series) => `(${[
  literal(series.id), literal(series.brandId), literal(series.name), series.minPowerW,
  series.maxPowerW, json(series.sourceUrls), literal(catalog.generatedAt.slice(0, 10)),
].join(", ")})`).join(",\n");

const modelRows = catalog.models.map((model) => `(${[
  literal(model.id), literal(model.brandId), literal(model.seriesId), literal(model.model),
  literal(model.displayName), literal(model.slug), literal(model.productType), model.nominalPowerW,
  literal(model.nominalPowerLabel), literal(model.moduleType), literal(model.housingForm),
  literal(model.polarization), literal(model.wavelength), literal(model.powerTunability),
  literal(model.powerStability), literal(model.powerRedundancy), literal(model.modulationFrequency),
  literal(model.beamQuality), literal(model.fiberConnectors), literal(model.interface),
  literal(model.cooling), literal(model.certifications), literal(model.warranty),
  literal(model.efficiency), json(model.applications), literal(model.description),
  model.powerRangeMatch, literal(model.compatibilityNote), literal(model.primaryImage),
  literal(model.sourceImageUrl), json(model.sourceUrls), literal(model.retrievedAt), true,
].join(", ")})`).join(",\n");

const sql = `-- Laser-source knowledge base for Wavlon Lasers.
-- Official-source snapshot generated ${catalog.generatedAt}.

create table if not exists public.laser_source_brands (
  id text primary key,
  name text not null,
  official_name text not null,
  website_url text not null,
  logo_path text,
  summary text,
  source_retrieved_at date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.laser_source_series (
  id text primary key,
  brand_id text not null references public.laser_source_brands(id) on delete cascade,
  name text not null,
  min_power_w integer not null check (min_power_w > 0),
  max_power_w integer not null check (max_power_w >= min_power_w),
  source_urls jsonb not null default '[]'::jsonb check (jsonb_typeof(source_urls) = 'array'),
  source_retrieved_at date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.laser_source_models (
  id text primary key,
  brand_id text not null references public.laser_source_brands(id) on delete cascade,
  series_id text not null references public.laser_source_series(id) on delete cascade,
  model text not null,
  display_name text not null,
  slug text not null unique,
  product_type text not null,
  nominal_power_w integer not null check (nominal_power_w > 0),
  nominal_power_label text not null,
  module_type text,
  housing_form text,
  polarization text,
  wavelength text,
  power_tunability text,
  power_stability text,
  power_redundancy text,
  modulation_frequency text,
  beam_quality text,
  fiber_connectors text,
  interface text,
  cooling text,
  certifications text,
  warranty text,
  efficiency text,
  applications jsonb not null default '[]'::jsonb check (jsonb_typeof(applications) = 'array'),
  description text,
  power_range_match boolean not null default false,
  compatibility_note text,
  primary_image_path text,
  source_image_url text,
  source_urls jsonb not null default '[]'::jsonb check (jsonb_typeof(source_urls) = 'array'),
  source_retrieved_at date not null,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists laser_source_series_brand_idx on public.laser_source_series (brand_id);
create index if not exists laser_source_models_brand_idx on public.laser_source_models (brand_id);
create index if not exists laser_source_models_series_idx on public.laser_source_models (series_id);
create index if not exists laser_source_models_power_idx on public.laser_source_models (nominal_power_w);
create index if not exists laser_source_models_published_idx on public.laser_source_models (published) where published = true;

alter table public.laser_source_brands enable row level security;
alter table public.laser_source_series enable row level security;
alter table public.laser_source_models enable row level security;

drop policy if exists "Public can read laser source brands" on public.laser_source_brands;
create policy "Public can read laser source brands"
  on public.laser_source_brands for select to anon, authenticated using (true);

drop policy if exists "Public can read laser source series" on public.laser_source_series;
create policy "Public can read laser source series"
  on public.laser_source_series for select to anon, authenticated using (true);

drop policy if exists "Public can read published laser source models" on public.laser_source_models;
create policy "Public can read published laser source models"
  on public.laser_source_models for select to anon, authenticated using (published = true);

revoke all on table public.laser_source_brands from anon, authenticated;
revoke all on table public.laser_source_series from anon, authenticated;
revoke all on table public.laser_source_models from anon, authenticated;
grant select on table public.laser_source_brands to anon, authenticated;
grant select on table public.laser_source_series to anon, authenticated;
grant select on table public.laser_source_models to anon, authenticated;

insert into public.laser_source_brands
  (id, name, official_name, website_url, logo_path, summary, source_retrieved_at)
values
${brandRows}
on conflict (id) do update set
  name = excluded.name,
  official_name = excluded.official_name,
  website_url = excluded.website_url,
  logo_path = excluded.logo_path,
  summary = excluded.summary,
  source_retrieved_at = excluded.source_retrieved_at,
  updated_at = now();

insert into public.laser_source_series
  (id, brand_id, name, min_power_w, max_power_w, source_urls, source_retrieved_at)
values
${seriesRows}
on conflict (id) do update set
  brand_id = excluded.brand_id,
  name = excluded.name,
  min_power_w = excluded.min_power_w,
  max_power_w = excluded.max_power_w,
  source_urls = excluded.source_urls,
  source_retrieved_at = excluded.source_retrieved_at,
  updated_at = now();

insert into public.laser_source_models
  (id, brand_id, series_id, model, display_name, slug, product_type, nominal_power_w,
   nominal_power_label, module_type, housing_form, polarization, wavelength, power_tunability,
   power_stability, power_redundancy, modulation_frequency, beam_quality, fiber_connectors,
   interface, cooling, certifications, warranty, efficiency, applications, description,
   power_range_match, compatibility_note, primary_image_path, source_image_url, source_urls,
   source_retrieved_at, published)
values
${modelRows}
on conflict (id) do update set
  brand_id = excluded.brand_id,
  series_id = excluded.series_id,
  model = excluded.model,
  display_name = excluded.display_name,
  slug = excluded.slug,
  product_type = excluded.product_type,
  nominal_power_w = excluded.nominal_power_w,
  nominal_power_label = excluded.nominal_power_label,
  module_type = excluded.module_type,
  housing_form = excluded.housing_form,
  polarization = excluded.polarization,
  wavelength = excluded.wavelength,
  power_tunability = excluded.power_tunability,
  power_stability = excluded.power_stability,
  power_redundancy = excluded.power_redundancy,
  modulation_frequency = excluded.modulation_frequency,
  beam_quality = excluded.beam_quality,
  fiber_connectors = excluded.fiber_connectors,
  interface = excluded.interface,
  cooling = excluded.cooling,
  certifications = excluded.certifications,
  warranty = excluded.warranty,
  efficiency = excluded.efficiency,
  applications = excluded.applications,
  description = excluded.description,
  power_range_match = excluded.power_range_match,
  compatibility_note = excluded.compatibility_note,
  primary_image_path = excluded.primary_image_path,
  source_image_url = excluded.source_image_url,
  source_urls = excluded.source_urls,
  source_retrieved_at = excluded.source_retrieved_at,
  published = excluded.published,
  updated_at = now();

comment on table public.laser_source_models is
  'Public read-only laser-source catalog. Static website uses a committed JSON snapshot; Supabase is the maintainable knowledge source.';
`;

await fs.mkdir(migrationDir, { recursive: true });
await fs.writeFile(migrationPath, sql);
console.log(migrationPath);
