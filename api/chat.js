// Wavlon Lasers — AI Chat API
// Routes to Voiceflow KB · handles greetings/contact/pricing · logs to Supabase

const GREETING_TRIGGERS = ['hello','hi','hey','good morning','good afternoon','good evening','howdy','greetings','sup','yo'];
const CONTACT_TRIGGERS  = ['contact me','call me','reach me','sales agent','agent contact','speak to someone','talk to someone','human','representative','sales rep','callback'];
const QUOTE_TRIGGERS    = ['how much','cost','quote','get a quote','request quote'];

// ── Log to Supabase (fire-and-forget) ────────────────────────────────
async function logChat({ sessionId, question, answer, matchType, kbScore, pageUrl, supabaseUrl, serviceKey }) {
  if (!supabaseUrl || !serviceKey) return;
  try {
    await fetch(`${supabaseUrl}/rest/v1/${encodeURIComponent('Wavlon_Chat_Logs')}`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':        serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Prefer':        'return=minimal'
      },
      body: JSON.stringify({
        session_id: sessionId || null,
        question,
        answer,
        match_type: matchType,
        kb_score:   kbScore || null,
        page_url:   pageUrl || null,
        source:     'wavlon-chat'
      })
    });
  } catch (e) {
    console.error('Chat log error:', e.message);
  }
}

// ── Main handler ──────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { question, sessionId, pageUrl } = req.body || {};
  if (!question || question.trim().length < 1) {
    return res.status(400).json({ error: 'Missing question' });
  }

  const q   = question.trim();
  const qLo = q.toLowerCase();

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_KEY;
  const vfKey       = process.env.VOICEFLOW_API_KEY;
  const logCtx      = { sessionId, question: q, pageUrl, supabaseUrl, serviceKey };

  // ── Greeting ──────────────────────────────────────────────────────
  if (GREETING_TRIGGERS.some(t => qLo === t || qLo.startsWith(t + ' ') || qLo.startsWith(t + '!'))) {
    const answer = "Hi there! I'm Wavlon's AI assistant.\n\nI can help you with:\n- Machine specs and comparisons\n- Cutting capabilities by material and thickness\n- Pricing and financing options\n- Lead times and delivery\n- Parts and support\n\nWhat would you like to know about our fiber laser machines?";
    await logChat({ ...logCtx, answer, matchType: 'greeting' });
    return res.status(200).json({ answer });
  }

  // ── Contact / callback ────────────────────────────────────────────
  if (CONTACT_TRIGGERS.some(t => qLo.includes(t))) {
    const answer = "Our sales team would love to connect with you!\n\nCall us: (888) 277-6144 — Mon–Fri 8am–6pm EST\nEmail: sales@wavlonlasers.com\nOr fill out the quote form on any machine page and we will respond within 24 business hours.\n\nIs there anything specific about our machines I can answer for you in the meantime?";
    await logChat({ ...logCtx, answer, matchType: 'contact' });
    return res.status(200).json({ answer });
  }

  // ── Pricing / quote ───────────────────────────────────────────────
  if (QUOTE_TRIGGERS.some(t => qLo.includes(t)) && !qLo.includes('what') && !qLo.includes('which') && !qLo.includes('spec')) {
    const answer = "We configure each machine to your specific application, so pricing depends on power level, frame size, and options selected.\n\nTo get accurate pricing:\n- Fill out a quote request on any machine page\n- Email sales@wavlonlasers.com\n- Call (888) 277-6144\n\nWe also offer equipment financing with most approvals within 48 hours.\n\nWould you like help figuring out which machine fits your needs?";
    await logChat({ ...logCtx, answer, matchType: 'pricing' });
    return res.status(200).json({ answer });
  }

  // ── Voiceflow Knowledge Base query ────────────────────────────────
  if (!vfKey) {
    const answer = "I'm having trouble connecting right now. Please email sales@wavlonlasers.com or call (888) 277-6144 — Mon–Fri 8am–6pm EST.";
    await logChat({ ...logCtx, answer, matchType: 'error' });
    return res.status(200).json({ answer });
  }

  try {
    const vfRes = await fetch('https://general-runtime.voiceflow.com/knowledge-base/query', {
      method: 'POST',
      headers: {
        'Authorization': vfKey,
        'Content-Type':  'application/json'
      },
      // Plain query — no settings object (settings broke the KB query)
      body: JSON.stringify({ question: q, synthesis: true })
    });

    const data     = await vfRes.json();
    const topScore = data.chunks && data.chunks.length > 0 ? data.chunks[0].score : null;

    if (data.output && data.output.trim().length > 0) {
      await logChat({ ...logCtx, answer: data.output, matchType: 'kb', kbScore: topScore });
      return res.status(200).json({ answer: data.output });
    }

    // No KB match — friendly fallback
    const answer = "I don't have specific details on that right now. Our team can help:\n\nCall: (888) 277-6144 — Mon–Fri 8am–6pm EST\nEmail: sales@wavlonlasers.com\n\nIs there anything else about our fiber laser machines I can help with?";
    await logChat({ ...logCtx, answer, matchType: 'fallback', kbScore: topScore });
    return res.status(200).json({ answer });

  } catch (err) {
    console.error('Chat API error:', err.message);
    const answer = "I'm having a technical issue. Please contact us:\nCall: (888) 277-6144\nEmail: sales@wavlonlasers.com";
    await logChat({ ...logCtx, answer, matchType: 'error' });
    return res.status(200).json({ answer });
  }
};
