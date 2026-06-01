// Wavlon Lasers — AI Chat API
// 1. Routes question to correct handler (greeting / contact / pricing / KB)
// 2. Logs every exchange to Wavlon_Chat_Logs in Supabase

const GREETING_TRIGGERS = ['hello','hi','hey','good morning','good afternoon','good evening','howdy','greetings','sup','yo'];
const CONTACT_TRIGGERS  = ['contact me','call me','reach me','sales agent','agent contact','speak to someone','talk to someone','human','representative','sales rep','callback'];
const QUOTE_TRIGGERS    = ['get a quote','request quote','how much','cost','quote'];

// ── Logging helper ────────────────────────────────────────────────────
async function logChat({ sessionId, question, answer, matchType, kbScore, pageUrl, supabaseUrl, serviceKey }) {
  if (!supabaseUrl || !serviceKey) return; // silently skip if not configured
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
        kb_score:   kbScore   || null,
        page_url:   pageUrl   || null,
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

  const logCtx = { sessionId, question: q, pageUrl, supabaseUrl, serviceKey };

  // ── Greeting ──────────────────────────────────────────────────────
  if (GREETING_TRIGGERS.some(t => qLo === t || qLo.startsWith(t + ' ') || qLo.startsWith(t + '!'))) {
    const answer = "Hi there! 👋 I'm Wavlon's AI sales assistant. I can help you with:\n\n• Machine specs and comparisons\n• Cutting capabilities by material & thickness\n• Pricing and financing options\n• Lead times and delivery\n• Parts and support\n\nWhat would you like to know about our fiber laser machines?";
    await logChat({ ...logCtx, answer, matchType: 'greeting' });
    return res.status(200).json({ answer });
  }

  // ── Contact / callback request ────────────────────────────────────
  if (CONTACT_TRIGGERS.some(t => qLo.includes(t))) {
    const answer = "Absolutely! Our sales team would love to connect with you.\n\n📞 **Call us:** (888) 277-6144 — Mon–Fri 8am–6pm EST\n✉️ **Email:** sales@wavlonlasers.com\n📋 **Request a quote:** Fill out the form on any machine page and we'll respond within 24 business hours.\n\nIs there anything specific about our machines I can answer for you in the meantime?";
    await logChat({ ...logCtx, answer, matchType: 'contact' });
    return res.status(200).json({ answer });
  }

  // ── Pricing / quote ───────────────────────────────────────────────
  if (QUOTE_TRIGGERS.some(t => qLo.includes(t)) && !qLo.includes('what') && !qLo.includes('which')) {
    const answer = "We don't publish prices publicly since each machine is configured for the customer's specific application — power level, frame size, and options all affect the final price.\n\nTo get accurate pricing:\n📋 Fill out a quote request on any machine page\n✉️ Email sales@wavlonlasers.com\n📞 Call (888) 277-6144\n\nWe also offer **equipment financing** with most approvals within 48 hours. Can I help you figure out which machine best fits your needs?";
    await logChat({ ...logCtx, answer, matchType: 'pricing' });
    return res.status(200).json({ answer });
  }

  // ── Voiceflow KB query ────────────────────────────────────────────
  if (!vfKey) {
    const answer = "I'm having trouble connecting to my knowledge base right now. For immediate help, please email sales@wavlonlasers.com or call (888) 277-6144 — Mon–Fri 8am–6pm EST.";
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
      body: JSON.stringify({
        question: q,
        synthesis: true,
        settings: {
          model: 'claude-3-5-sonnet',
          temperature: 0.2,
          systemPrompt: `You are Wavlon's AI sales assistant for wavlonlasers.com — a Toronto-based company selling industrial fiber laser cutting machines to Canadian manufacturers. Answer questions helpfully and conversationally using the provided knowledge base. Be specific with numbers and specs. If you don't have the exact answer, direct customers to sales@wavlonlasers.com or (888) 277-6144. Keep responses concise and use line breaks for readability.`
        }
      })
    });

    const data = await vfRes.json();
    const topScore = data.chunks && data.chunks.length > 0 ? data.chunks[0].score : null;

    if (data.output && data.output.trim().length > 0) {
      await logChat({ ...logCtx, answer: data.output, matchType: 'kb', kbScore: topScore });
      return res.status(200).json({ answer: data.output });
    }

    // No KB match
    const answer = "That's a great question! I don't have specific details on that in my knowledge base right now.\n\n📞 **(888) 277-6144** — Mon–Fri 8am–6pm EST\n✉️ **sales@wavlonlasers.com**\n\nOur team will get back to you quickly. Is there anything else about our fiber laser machines I can help with?";
    await logChat({ ...logCtx, answer, matchType: 'fallback', kbScore: topScore });
    return res.status(200).json({ answer });

  } catch (err) {
    console.error('Chat API error:', err.message);
    const answer = "I'm having a technical issue right now. Please reach out directly:\n\n📞 (888) 277-6144\n✉️ sales@wavlonlasers.com\n\nSorry for the inconvenience!";
    await logChat({ ...logCtx, answer, matchType: 'error' });
    return res.status(200).json({ answer });
  }
};
