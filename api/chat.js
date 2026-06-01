// Wavlon Lasers — AI Chat API
// Routes to Voiceflow KB for product questions
// Handles greetings, lead requests, and fallbacks conversationally

const GREETING_TRIGGERS = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'greetings', 'sup', 'yo'];
const CONTACT_TRIGGERS  = ['contact me', 'call me', 'reach me', 'sales agent', 'agent contact', 'speak to someone', 'talk to someone', 'human', 'representative', 'sales rep', 'callback'];
const QUOTE_TRIGGERS    = ['get a quote', 'request quote', 'price', 'pricing', 'how much', 'cost', 'quote'];

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { question } = req.body || {};
  if (!question || question.trim().length < 1) {
    return res.status(400).json({ error: 'Missing question' });
  }

  const q   = question.trim();
  const qLo = q.toLowerCase();

  // ── Handle greetings ──────────────────────────────────────────────
  if (GREETING_TRIGGERS.some(t => qLo === t || qLo.startsWith(t + ' ') || qLo.startsWith(t + '!'))) {
    return res.status(200).json({
      answer: "Hi there! 👋 I'm Wavlon's AI sales assistant. I can help you with:\n\n• Machine specs and comparisons\n• Cutting capabilities by material & thickness\n• Pricing and financing options\n• Lead times and delivery\n• Parts and support\n\nWhat would you like to know about our fiber laser machines?"
    });
  }

  // ── Handle contact / callback requests ───────────────────────────
  if (CONTACT_TRIGGERS.some(t => qLo.includes(t))) {
    return res.status(200).json({
      answer: "Absolutely! Our sales team would love to connect with you. You can reach us a few ways:\n\n📞 **Call us:** (888) 277-6144 — Mon–Fri 8am–6pm EST\n✉️ **Email:** sales@wavlonlasers.com\n📋 **Request a quote:** Fill out the form on any machine page at wavlonlasers.com and we'll respond within 24 business hours.\n\nIs there anything specific about our machines I can answer for you in the meantime?"
    });
  }

  // ── Handle direct pricing / quote requests ────────────────────────
  if (QUOTE_TRIGGERS.some(t => qLo.includes(t)) && !qLo.includes('what') && !qLo.includes('which')) {
    return res.status(200).json({
      answer: "We don't publish prices publicly since each machine is configured for the customer's application — power level, frame size, and options all affect the final price.\n\nTo get accurate pricing:\n📋 Fill out a quote request on any machine page\n✉️ Email sales@wavlonlasers.com\n📞 Call (888) 277-6144\n\nOur team responds within 24 business hours. We also offer **equipment financing** — most approvals within 48 hours. Can I help you figure out which machine best fits your needs first?"
    });
  }

  // ── Query Voiceflow Knowledge Base ────────────────────────────────
  const vfKey = process.env.VOICEFLOW_API_KEY;
  if (!vfKey) {
    console.error('VOICEFLOW_API_KEY env var not set');
    return res.status(200).json({
      answer: "I'm having trouble connecting to my knowledge base right now. For immediate help, please email sales@wavlonlasers.com or call (888) 277-6144 — Mon–Fri 8am–6pm EST."
    });
  }

  try {
    const vfRes = await fetch('https://general-runtime.voiceflow.com/knowledge-base/query', {
      method: 'POST',
      headers: {
        'Authorization': vfKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: q,
        synthesis: true,
        settings: {
          model: 'claude-3-5-sonnet',
          temperature: 0.2,
          systemPrompt: `You are Wavlon's AI sales assistant. Wavlon Lasers is a Toronto-based company that sells industrial fiber laser cutting machines to Canadian manufacturers. Your job is to help potential customers understand our machines and guide them toward the right solution.

Be conversational, helpful, and specific. Always answer from the provided knowledge base context. If a customer asks something you don't have details on, direct them to sales@wavlonlasers.com or (888) 277-6144.

Key facts to remember:
- We serve all of Canada with full installation, training, and support
- Lead times are typically 6-10 weeks
- We offer equipment financing
- Our main machines: ProCut (3-12kW gantry), PowerCut (3-12kW enclosed), UltraCut (3-20kW dual exchange), T-Series (tube cutting), Tower System (automation), W-Series (welding)

Keep answers concise but complete. Use line breaks for readability.`
        }
      })
    });

    const data = await vfRes.json();

    if (data.output && data.output.trim().length > 0) {
      return res.status(200).json({ answer: data.output });
    }

    // No KB match — conversational fallback
    return res.status(200).json({
      answer: "That's a great question! I don't have specific details on that in my knowledge base right now. Our team can give you a precise answer:\n\n📞 **(888) 277-6144** — Mon–Fri 8am–6pm EST\n✉️ **sales@wavlonlasers.com**\n\nIs there anything else about our fiber laser machines, specs, or capabilities I can help with?"
    });

  } catch (err) {
    console.error('Chat API error:', err.message);
    return res.status(200).json({
      answer: "I'm having a technical issue right now. Please reach out directly:\n\n📞 (888) 277-6144\n✉️ sales@wavlonlasers.com\n\nSorry for the inconvenience!"
    });
  }
};
