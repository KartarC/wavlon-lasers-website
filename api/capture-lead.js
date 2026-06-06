// Wavlon Lasers — Catalog Lead Capture API
// Inserts into catalog_download_leads — service role key is server-side only

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { first_name, last_name, company_email, company_name, catalog_name, page_url } = req.body || {};

  if (!first_name || !last_name || !company_email || !company_name) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY env vars');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  // Read visitor IP server-side — never exposed to browser
  const forwarded   = req.headers['x-forwarded-for'];
  const ip_address  = forwarded
    ? forwarded.split(',')[0].trim()
    : (req.socket?.remoteAddress || null);

  const payload = {
    first_name,
    last_name,
    company_email,
    company_name,
    source:       'Catalog Download',
    catalog_name: catalog_name || null,
    page_url:     page_url     || null,
    ip_address,
  };

  try {
    const r = await fetch(
      `${supabaseUrl}/rest/v1/catalog_download_leads`,
      {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'apikey':        serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Prefer':        'return=minimal',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!r.ok) {
      const err = await r.text();
      throw new Error(err);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Capture lead error:', err.message);
    return res.status(500).json({ error: 'Database insert failed' });
  }
};
