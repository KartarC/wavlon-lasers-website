-- ============================================
-- Wavlon Lasers — Supabase Database Schema
-- Run this once in your Supabase SQL Editor
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── MACHINES TABLE (product catalogue) ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS machines (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Identity
  model           TEXT NOT NULL,                            -- e.g. "WV-3015 Pro"
  series          TEXT,                                     -- e.g. "Mid Series"
  category        TEXT CHECK (category IN ('entry','mid','industrial','heavy')),
  -- Laser specs
  power_watts     INTEGER NOT NULL,                         -- e.g. 3000
  -- Bed dimensions
  bed_length_mm   INTEGER,                                  -- e.g. 3000
  bed_width_mm    INTEGER,                                  -- e.g. 1500
  -- Pricing
  price           NUMERIC(14, 2),
  price_display   TEXT,                                     -- e.g. "CAD $95,000"
  -- Content
  description     TEXT,
  photos          TEXT[],
  specs           JSONB DEFAULT '{}',
  -- e.g. {"max_mild_steel_mm":20,"max_stainless_mm":12,"max_aluminum_mm":8,
  --        "cutting_speed_mmin":70,"accuracy_mm":0.03,"laser_source":"IPG",
  --        "control_system":"Cypcut","power_consumption_kw":18}
  -- Admin
  sort_order      INTEGER DEFAULT 99,
  featured        BOOLEAN DEFAULT FALSE,
  status          TEXT DEFAULT 'active' CHECK (status IN ('active','out_of_stock','discontinued','draft'))
);

-- ─── LEADS TABLE (general buyer inquiries) ───────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name             TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT,
  company          TEXT,
  machine_interest TEXT,
  machine_id       UUID REFERENCES machines(id) ON DELETE SET NULL,
  budget           TEXT,
  message          TEXT,
  status           TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','qualified','closed_won','closed_lost')),
  notes            TEXT,
  source           TEXT DEFAULT 'website'
);

-- ─── QUOTE REQUESTS (detailed quote form) ────────────────────────────────────
CREATE TABLE IF NOT EXISTS quote_requests (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Contact
  name             TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT,
  company          TEXT,
  -- Application details
  machine_interest TEXT,
  machine_id       UUID REFERENCES machines(id) ON DELETE SET NULL,
  material         TEXT,
  thickness        TEXT,
  annual_volume    TEXT,
  current_process  TEXT,
  -- Budget
  budget           TEXT,
  message          TEXT,
  -- Admin
  status           TEXT DEFAULT 'new' CHECK (status IN ('new','sent','follow_up','closed_won','closed_lost')),
  notes            TEXT,
  source           TEXT DEFAULT 'website'
);

-- ─── CONTACT MESSAGES (general contact form) ─────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  subject    TEXT,
  message    TEXT NOT NULL,
  source     TEXT,
  status     TEXT DEFAULT 'new' CHECK (status IN ('new','read','replied'))
);

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────

ALTER TABLE machines ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Public can view active machines" ON machines FOR SELECT USING (status = 'active');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Public can submit leads" ON leads FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Public can submit quote requests" ON quote_requests FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Public can submit contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ─── INDEXES ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_machines_status      ON machines(status);
CREATE INDEX IF NOT EXISTS idx_machines_category    ON machines(category);
CREATE INDEX IF NOT EXISTS idx_machines_featured    ON machines(featured);
CREATE INDEX IF NOT EXISTS idx_machines_sort        ON machines(sort_order);
CREATE INDEX IF NOT EXISTS idx_leads_status         ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created        ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status        ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created       ON quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status      ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created     ON contact_messages(created_at DESC);

-- ─── SAMPLE MACHINES ──────────────────────────────────────────────────────────
INSERT INTO machines (model, series, category, power_watts, bed_length_mm, bed_width_mm, price, price_display, featured, sort_order, description, specs) VALUES
  ('WV-1530 Entry',   'Entry Series',      'entry',      1000,  1500, 3000,  45000,  'CAD $45,000',  FALSE, 1,
   'Perfect entry-point fiber laser for small shops and job shops cutting thin mild steel, stainless, and aluminium. Compact footprint, reliable IPG source.',
   '{"max_mild_steel_mm":10,"max_stainless_mm":6,"max_aluminum_mm":4,"cutting_speed_mmin":30,"accuracy_mm":0.05,"laser_source":"Raycus","control_system":"Cypcut","power_consumption_kw":8}'),

  ('WV-3015 Pro',     'Mid Series',        'mid',        3000,  3000, 1500,  89000,  'CAD $89,000',  TRUE,  2,
   'Our most popular model. 3kW IPG fiber laser on a 3×1.5m bed — handles structural steel, stainless cladding, and aluminium sheet at production speed.',
   '{"max_mild_steel_mm":20,"max_stainless_mm":12,"max_aluminum_mm":8,"cutting_speed_mmin":60,"accuracy_mm":0.03,"laser_source":"IPG","control_system":"Cypcut","power_consumption_kw":14}'),

  ('WV-4020 Elite',   'Industrial Series', 'industrial', 6000,  4000, 2000,  185000, 'CAD $185,000', TRUE,  3,
   '6kW industrial powerhouse on a large-format 4×2m table. Cuts 25mm mild steel with ease. Ideal for structural fabricators and contract manufacturers.',
   '{"max_mild_steel_mm":30,"max_stainless_mm":20,"max_aluminum_mm":14,"cutting_speed_mmin":80,"accuracy_mm":0.03,"laser_source":"IPG","control_system":"PA8000","power_consumption_kw":22}'),

  ('WV-6020 Heavy',   'Heavy Duty',        'heavy',      12000, 6000, 2000,  390000, 'CAD $390,000', TRUE,  4,
   '12kW heavy-duty machine for thick-plate cutting in shipbuilding, pressure vessel, and heavy structural applications. Exchange table for continuous production.',
   '{"max_mild_steel_mm":60,"max_stainless_mm":40,"max_aluminum_mm":25,"cutting_speed_mmin":100,"accuracy_mm":0.03,"laser_source":"IPG","control_system":"PA8000","power_consumption_kw":40}');
