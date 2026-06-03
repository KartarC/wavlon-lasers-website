// Wavlon — Supabase connection health check
// Visit /api/health to diagnose env var issues
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_KEY;

  const report = {
    SUPABASE_URL_set:         !!supabaseUrl,
    SUPABASE_URL_value:       supabaseUrl ? supabaseUrl.slice(0, 40) + '...' : 'MISSING',
    SUPABASE_SERVICE_KEY_set: !!serviceKey,
    SUPABASE_SERVICE_KEY_len: serviceKey ? serviceKey.length : 0,
    insert_test:              null,
    insert_error:             null
  };

  if (supabaseUrl && serviceKey) {
    try {
      const resp = await fetch(
        `${supabaseUrl}/rest/v1/${encodeURIComponent('Wavlon_Chat_Logs')}`,
        {
          method: 'POST',
          headers: {
            'Content-Type':  'application/json',
            'apikey':        serviceKey,
            'Authorization': `Bearer ${serviceKey}`,
            'Prefer':        'return=minimal'
          },
          body: JSON.stringify({
            session_id:  'health-check',
            question:    'health check',
            answer:      'ok',
            match_type:  'health',
            source:      'health-check'
          })
        }
      );
      if (resp.ok) {
        report.insert_test = 'SUCCESS';
        // Clean up the test row
        await fetch(
          `${supabaseUrl}/rest/v1/${encodeURIComponent('Wavlon_Chat_Logs')}?session_id=eq.health-check`,
          {
            method: 'DELETE',
            headers: {
              'apikey':        serviceKey,
              'Authorization': `Bearer ${serviceKey}`
            }
          }
        );
      } else {
        const errText = await resp.text();
        report.insert_test  = 'FAILED';
        report.insert_error = `HTTP ${resp.status}: ${errText.slice(0, 200)}`;
      }
    } catch (e) {
      report.insert_test  = 'FAILED';
      report.insert_error = e.message;
    }
  } else {
    report.insert_test = 'SKIPPED — missing env vars';
  }

  const allGood = report.insert_test === 'SUCCESS';
  return res.status(200).json({
    status: allGood ? 'OK' : 'ERROR',
    ...report
  });
};
