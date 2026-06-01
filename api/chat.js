// Wavlon Lasers — AI Chat API proxy
// Calls Voiceflow KB query endpoint server-side (key never exposed in browser)
// POST { "question": "..." } → { "answer": "..." }

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { question } = req.body || {};
  if (!question || question.trim().length < 2) {
    return res.status(400).json({ error: 'Missing question' });
  }

  const vfKey = process.env.VOICEFLOW_API_KEY;
  if (!vfKey) {
    console.error('Missing VOICEFLOW_API_KEY env var');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  try {
    const vfRes = await fetch('https://general-runtime.voiceflow.com/knowledge-base/query', {
      method: 'POST',
      headers: {
        'Authorization': vfKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: question.trim(), synthesis: true })
    });

    const data = await vfRes.json();

    if (data.output) {
      return res.status(200).json({ answer: data.output });
    }

    // No matching chunks — friendly fallback
    return res.status(200).json({
      answer: "I don't have specific information on that. Our team can help — email sales@wavlonlasers.com or call (888) 277-6144, Mon–Fri 8am–6pm EST."
    });

  } catch (err) {
    console.error('Chat API error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};
