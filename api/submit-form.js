// Wavlon Lasers — Form Submission API
// Vercel serverless function — keeps Supabase service_role key server-side
// All Wavlon website forms POST here. Routes to correct Rise Tek Supabase table.

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const data = req.body;
  if (!data || !data.email) {
    return res.status(400).json({ error: 'Missing required field: email' });
  }

  const source = (data.source || '').toLowerCase();

  // ── Route to correct Wavlon table ────────────────────────────
  // Wavlon_Contact_Messages  → contact page enquiries
  // Wavlon_Leads             → financing, parts, brochure, chat widget leads
  // Wavlon_Quote_Requests    → all machine quote forms
  let table;
  if (source === 'contact-page') {
    table = 'Wavlon_Contact_Messages';
  } else if (
    source.includes('financing') ||
    source.includes('parts')     ||
    source.includes('brochure')  ||
    source.includes('chat')
  ) {
    table = 'Wavlon_Leads';
  } else {
    // Catches: homepage, pro-cut-series, procut-ul, power-cut-series,
    //          ultra-cut-series, t-series, tower-system, w-series, and any future pages
    table = 'Wavlon_Quote_Requests';
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY env vars');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  // Build payload — strip undefined/empty values, never send extra keys Supabase rejects
  const payload = {
    status: data.status || 'new'
  };
  const allowedFields = [
    'name','email','phone','company','machine_interest','machine_id',
    'material','thickness','budget','message','source',
    'subject',          // contact form
    'session_id',       // chat widget
  ];
  allowedFields.forEach(k => {
    if (data[k] !== undefined && data[k] !== null) payload[k] = data[k];
  });

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/${encodeURIComponent(table)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'apikey':        serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Prefer':        'return=minimal'
        },
        body: JSON.stringify(payload)
      }
    );

    if (response.ok) {
      return res.status(200).json({ success: true, table });
    }

    const errText = await response.text();
    console.error(`Supabase insert failed (${table}) [source: ${source}]:`, errText);
    return res.status(500).json({ error: 'Database insert failed' });

  } catch (err) {
    console.error('Submit handler error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};
