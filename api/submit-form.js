// Wavlon Lasers — Form Submission API
// Vercel serverless function — keeps Supabase service_role key server-side
// Forms POST to /api/submit-form with JSON body including a `source` field
// Routes to correct Wavlon_ table based on source value

module.exports = async function handler(req, res) {
  // CORS headers — allow from wavlonlasers.com only in prod
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

  // Route to correct Wavlon table based on form source
  let table;
  if (source === 'contact-page') {
    table = 'Wavlon_Contact_Messages';
  } else if (
    source.includes('financing') ||
    source.includes('parts') ||
    source.includes('brochure')
  ) {
    table = 'Wavlon_Leads';
  } else {
    table = 'Wavlon_Quote_Requests';
  }

  const supabaseUrl  = process.env.SUPABASE_URL;
  const serviceKey   = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY env vars');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

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
        body: JSON.stringify({
          ...data,
          status: data.status || 'new'
        })
      }
    );

    if (response.ok) {
      return res.status(200).json({ success: true, table });
    }

    const errText = await response.text();
    console.error(`Supabase error (${table}):`, errText);
    return res.status(500).json({ error: 'Database insert failed' });

  } catch (err) {
    console.error('Submit handler error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};
