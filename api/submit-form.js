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
  if (!data || typeof data !== 'object' || typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    return res.status(400).json({ error: 'Missing required field: email' });
  }

  const source = typeof data.source === 'string' ? data.source.toLowerCase() : '';
  const contactQuote = source === 'contact-page' && typeof data.subject === 'string' && data.subject.startsWith('Quote Request');

  // ── Route to correct Wavlon table ────────────────────────────
  // Wavlon_Contact_Messages  → contact page enquiries
  // Wavlon_Leads             → financing, parts, brochure, chat widget leads
  // Wavlon_Quote_Requests    → all machine quote forms
  let table;
  if (source === 'contact-page' && !contactQuote) {
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
    //          ultra-cut-series, TubeCut pages, tower-system, and any future pages
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
    status: 'new'
  };
  // Each destination has a different schema. An unsupported key rejects the entire insert.
  const commonFields = ['name','email','phone','message','source'];
  const allowedFields = commonFields.concat(table === 'Wavlon_Contact_Messages'
    ? ['subject']
    : ['company','machine_interest','machine_id','budget'].concat(
      table === 'Wavlon_Leads' ? ['session_id'] : ['material','thickness']));
  allowedFields.forEach(k => {
    if (typeof data[k] === 'string') payload[k] = data[k].trim();
  });
  if (table === 'Wavlon_Contact_Messages' && typeof data.company === 'string' && data.company.trim()) {
    payload.message = `Company: ${data.company.trim()}\n\n${payload.message || ''}`;
  }
  if (contactQuote) {
    payload.machine_interest = data.subject.replace(/^Quote Request\s*[—-]?\s*/, '').trim() || 'Help me choose';
  }

  const countryLabels = {ca:'Canada', us:'United States', other:'Other country'};
  const country = typeof data.installation_country === 'string' && Object.prototype.hasOwnProperty.call(countryLabels, data.installation_country) ? countryLabels[data.installation_country] : '';
  if (country) payload.message = `Installation country: ${country}\n\n${payload.message || ''}`;

  // Helper — single Supabase insert
  async function insertRow(targetTable, row) {
    const r = await fetch(
      `${supabaseUrl}/rest/v1/${encodeURIComponent(targetTable)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'apikey':        serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Prefer':        'return=minimal'
        },
        body: JSON.stringify(row)
      }
    );
    if (!r.ok) {
      // Log status/code, not database errors that may contain submitted personal data.
      const err = await r.json().catch(() => ({}));
      throw new Error(`${targetTable}: HTTP ${r.status} (${err.code || 'unknown'})`);
    }
  }

  try {
    // ── Primary insert ────────────────────────────────────────
    await insertRow(table, payload);

    // ── Chat widget: also log to Wavlon_Chat_Logs so both
    //    the lead table AND the chat table have the contact ──
    if (source.includes('chat')) {
      const chatLogPayload = {
        session_id:   data.session_id  || null,
        question:     '[Pre-chat lead form submitted]',
        answer:       null,
        match_type:   'lead_capture',
        source:       'wavlon-chat',
        user_name:    data.name        || null,
        user_email:   data.email       || null,
        user_company: data.company     || null,
        user_phone:   data.phone       || null,
      };
      // fire-and-forget — don't fail the whole request if this fails
      insertRow('Wavlon_Chat_Logs', chatLogPayload).catch(e =>
        console.error('Chat log secondary insert error:', e.message)
      );
    }

    return res.status(200).json({ success: true, table });

  } catch (err) {
    console.error(`Submit handler error [source: ${source}]:`, err.message);
    return res.status(500).json({ error: 'Database insert failed' });
  }
};
