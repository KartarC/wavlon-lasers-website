// Wavlon Lasers — AI Chat API
// Architecture:
//   1. Local handlers  → greeting / contact / pricing  (instant, no API cost)
//   2. Voiceflow KB    → product-specific spec questions (fast, ~free)
//   3. Claude Haiku    → everything else (brand, comparisons, recommendations)
//   4. Supabase log    → every exchange logged to Wavlon_Chat_Logs

// ── Wavlon company knowledge (baked into Claude's system prompt) ──────
const WAVLON_SYSTEM_PROMPT = `You are the AI sales assistant for Wavlon Lasers — a Toronto-based supplier of industrial fiber laser cutting machines serving Canadian manufacturers, job shops, and metal fabricators.

## Your role
Help customers understand which Wavlon machine fits their application, answer technical questions accurately, and guide them toward requesting a quote. Be professional, direct, and technically confident — like a knowledgeable Wavlon sales engineer.

## Company
- Name: Wavlon Lasers Inc.
- Location: 5250 Solar Dr #32, Mississauga, ON L4W 0G4
- Phone: (888) 277-6144
- Email: sales@wavlonlasers.com
- Hours: Monday–Friday 8am–6pm EST
- Website: wavlonlasers.com
- Service area: All of Canada

## Machine lineup

### ProCut Series (WPC) — Entry-level gantry
- Power: 3kW, 6kW, 12kW
- Frames: 3015 (3m × 1.5m bed), 4020 (4m × 2m bed)
- Design: Open gantry beam, open cutting bed
- Speed: 100 m/min | Acceleration: 1.0G
- Positioning accuracy: ±0.03mm | Repeat: ±0.02mm
- Laser source: IPG or Raycus fiber laser
- Cutting head: BOCI BLT-310 (3kW) or BLT-421S (6–12kW)
- Control: Cypcut CNC, 27" touchscreen
- Drive: Yaskawa servo motors | Electrical: Schneider Electric
- Best for: Entry-level job shops, first fiber laser, light-to-medium fabrication
- Max steel: 8mm (3kW), 16mm (6kW), 25mm (12kW)

### PowerCut Series (WFC) — Mid-range enclosed
- Power: 3kW, 6kW, 12kW
- Frame: 3015 only
- Design: Fully enclosed safety cabin, single auto pull-out table
- Speed: 120 m/min | Acceleration: 1.2G
- Cutting head: BOCI BLT-421S
- Best for: Shops needing safety enclosure and higher throughput
- Max steel: 8mm (3kW), 16mm (6kW), 25mm (12kW)

### UltraCut Series (WUC) — Flagship dual-exchange
- Power: 3kW, 6kW, 12kW, 20kW (up to 160kW on request)
- Frames: 3015 and 4020
- Design: Fully enclosed cabin, DUAL SHUTTLE EXCHANGE TABLES (zero-downtime loading)
- Speed: 120 m/min | Acceleration: 1.2G | Repeat precision: ±0.02mm
- Cutting head: BLT-421S (3–12kW) or BLT-442 (20kW)
- Features: HD monitoring cameras, safety light curtains, Cypcut CNC
- Best for: High-volume production, shops needing maximum uptime
- Max steel: 8mm (3kW), 16mm (6kW), 25mm (12kW), 40mm (20kW)

### T-Series — Fiber laser tube cutting
- Power: 2kW, 3kW, 6kW, 12kW
- Profiles: Round, square, rectangular, oval, I-beam, C-channel, angle iron
- Chuck capacity: up to 220mm diameter
- Max tube length: 6m or 9m
- Best for: Structural steel, handrails, furniture, automotive

### Tower System — Automated sheet storage & loading
- Integrates with ProCut, PowerCut, UltraCut
- Lights-out operation capability
- Automated sheet retrieval, loading, sorting

### Air-Cooled W-Series — Fiber laser welding
- Power: 1.5kW, 2kW, 3kW
- Handheld welding torch, air-cooled
- Materials: Carbon steel, stainless, aluminum, galvanized
- Best for: Stainless fabrication, aluminum welding, repair work

## Cutting capabilities by material and power
Carbon steel: 3kW→8mm | 6kW→16mm | 12kW→25mm | 20kW→40mm
Stainless steel: 3kW→5mm | 6kW→12mm | 12kW→20mm | 20kW→30mm
Aluminum: 3kW→4mm | 6kW→8mm | 12kW→16mm | 20kW→25mm
Brass/copper: 3kW→3mm | 6kW→8mm | 12kW→12mm
Cutting gas: O₂ for carbon steel | N₂ for stainless, aluminum, brass | Air for thin sheet

## Key components (all standard on every Wavlon machine)
- Laser source: IPG Photonics or Raycus (tier-1 brands)
- Cutting head: BOCI BLT series (BLT-310, BLT-421S, BLT-442) — auto-focus, IP65, collision protection
- Optional upgrade: Precitec ProCutter head (German-made premium alternative)
- CNC control: Cypcut (27" touchscreen)
- Servo drives: Yaskawa (Japanese precision)
- Electrical cabinet: Schneider Electric (PLCs, inverters, breakers)
- Linear rails: Techmech precision rack-and-pinion

## Pricing & quoting
- Prices are NOT published online — each machine is configured per application
- Pricing depends on: power level, frame size, options
- To get a quote: fill out form on any machine page, email, or call
- Response time: within 24 business hours

## Financing
- Equipment financing available for all Canadian businesses
- Monthly payment plans with approved credit
- Most approvals within 24–48 hours
- Apply at wavlonlasers.com/financing

## Lead times & delivery
- Typical: 6–10 weeks from order confirmation
- Machines shipped to your facility across Canada
- Wavlon coordinates all logistics

## Installation & support
- On-site installation and commissioning anywhere in Canada (1–3 days)
- Operator training included
- Remote technical support via video call
- Lifetime technical support included with every machine
- 2-year warranty on structure and electrical | 1-year on laser source and head
- Extended warranty available | All warranty service handled in Canada

## Parts
- Replacement parts stocked in Toronto warehouse
- Next-business-day delivery across Canada
- Online store: machinistsvault.com/collections/fiber-laser-parts
- Common parts: protective lenses, nozzles, ceramic holders, BLT components

## Industries served
Metal fabrication, structural steel, HVAC, automotive, agriculture equipment, signage, furniture manufacturing, construction equipment, electrical enclosures, food processing, architectural metalwork

## How to respond
- Be direct and specific — give actual numbers when asked
- When a customer asks about thickness or material, give them the right power recommendation
- Never say "I don't know" — if unsure of something not covered above, direct to sales team
- Keep answers concise (3–6 sentences unless a detailed spec is needed)
- Use line breaks for readability — avoid long walls of text
- If the question is about competing brands, acknowledge they exist but focus on Wavlon's strengths: Canadian support, dual-exchange tables, premium components, full warranty
- Always end with a helpful next step if relevant (quote form, call, email)`;

// ── Local trigger lists ───────────────────────────────────────────────
const GREETING = ['hello','hi','hey','good morning','good afternoon','good evening','howdy','greetings','yo','sup'];
const CONTACT  = ['contact me','call me','reach me','sales agent','agent contact','speak to someone','talk to someone','human','representative','sales rep','callback'];
const PRICING  = ['how much','cost','price','get a quote','request quote'];

// ── IP Geolocation (ipapi.co — free tier, no key needed) ─────────────
async function getLocation(ip) {
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168') || ip.startsWith('10.')) {
    return {}; // skip private/local IPs
  }
  try {
    const resp = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { 'User-Agent': 'WavlonLasers/1.0 (sales@wavlonlasers.com)' }
    });
    if (!resp.ok) return {};
    const d = await resp.json();
    return {
      city:    d.city    || null,
      region:  d.region  || null,
      country: d.country_name || null
    };
  } catch (e) {
    return {};
  }
}

// ── Extract real IP from Vercel request ──────────────────────────────
function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || null;
}

// ── Supabase logger (fire-and-forget) ────────────────────────────────
async function logChat({ sessionId, question, answer, matchType, kbScore, pageUrl,
                         userInfo, userIp, userCity, userRegion, userCountry,
                         supabaseUrl, serviceKey }) {
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
        session_id:   sessionId  || null,
        question,
        answer,
        match_type:   matchType,
        kb_score:     kbScore    || null,
        page_url:     pageUrl    || null,
        source:       'wavlon-chat',
        // Lead info
        user_name:    userInfo?.name    || null,
        user_email:   userInfo?.email   || null,
        user_company: userInfo?.company || null,
        user_phone:   userInfo?.phone   || null,
        // Geolocation
        user_ip:      userIp      || null,
        user_city:    userCity    || null,
        user_region:  userRegion  || null,
        user_country: userCountry || null
      })
    });
  } catch (e) {
    console.error('Log error:', e.message);
  }
}

// ── Claude Haiku call ────────────────────────────────────────────────
async function askClaude(question) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');

  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key':         apiKey,
      'anthropic-version': '2023-06-01',
      'content-type':      'application/json'
    },
    body: JSON.stringify({
      model:      'claude-haiku-4-5',
      max_tokens: 600,
      system:     WAVLON_SYSTEM_PROMPT,
      messages:   [{ role: 'user', content: question }]
    })
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Claude API error ${resp.status}: ${err}`);
  }

  const data = await resp.json();
  return data.content[0].text.trim();
}

// ── Voiceflow KB query ────────────────────────────────────────────────
async function queryKB(question) {
  const vfKey = process.env.VOICEFLOW_API_KEY;
  if (!vfKey) return { output: null, topScore: null };

  const resp = await fetch('https://general-runtime.voiceflow.com/knowledge-base/query', {
    method: 'POST',
    headers: { 'Authorization': vfKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, synthesis: true })
  });

  const data     = await resp.json();
  const topScore = data.chunks && data.chunks.length > 0 ? data.chunks[0].score : null;
  return { output: data.output || null, topScore };
}

// ── Main handler ──────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const { question, sessionId, pageUrl, userInfo } = req.body || {};
  if (!question || !question.trim()) return res.status(400).json({ error: 'Missing question' });

  const q   = question.trim();
  const qLo = q.toLowerCase();

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_KEY;

  // IP geolocation — run in parallel with processing (fire-and-forget on error)
  const userIp = getClientIp(req);
  const locPromise = getLocation(userIp);

  const logCtx = async (extra) => {
    const loc = await locPromise;
    return {
      sessionId, question: q, pageUrl,
      userInfo: userInfo || {},
      userIp,
      userCity:    loc.city    || null,
      userRegion:  loc.region  || null,
      userCountry: loc.country || null,
      supabaseUrl, serviceKey,
      ...extra
    };
  };

  // ── 1. Greeting ───────────────────────────────────────────────────
  if (GREETING.some(t => qLo === t || qLo.startsWith(t + ' ') || qLo.startsWith(t + '!'))) {
    const answer = "Hi there! I'm Wavlon's AI assistant.\n\nI can help you with:\n- Machine specs and comparisons\n- Cutting capabilities by material and thickness\n- Pricing and financing\n- Lead times and delivery\n- Parts and technical support\n\nWhat would you like to know about our fiber laser machines?";
    await logChat(await logCtx({ answer, matchType: 'greeting' }));
    return res.status(200).json({ answer });
  }

  // ── 2. Contact / callback ─────────────────────────────────────────
  if (CONTACT.some(t => qLo.includes(t))) {
    const answer = "Our sales team would love to connect with you!\n\nCall: (888) 277-6144 — Mon–Fri 8am–6pm EST\nEmail: sales@wavlonlasers.com\nOr fill out the quote form on any machine page — we respond within 24 business hours.\n\nIs there anything specific about our machines I can answer right now?";
    await logChat(await logCtx({ answer, matchType: 'contact' }));
    return res.status(200).json({ answer });
  }

  // ── 3. Pricing (without product specifics) ────────────────────────
  if (PRICING.some(t => qLo.includes(t)) && !qLo.includes('what') && !qLo.includes('which') && !qLo.includes('spec') && !qLo.includes('kw')) {
    const answer = "We configure every machine to the customer's application, so pricing depends on power level, frame size, and options.\n\nTo get accurate pricing:\n- Fill out the quote form on any machine page\n- Email sales@wavlonlasers.com\n- Call (888) 277-6144\n\nWe also offer equipment financing — most Canadian businesses are approved within 48 hours. Want me to help figure out which machine fits your needs first?";
    await logChat(await logCtx({ answer, matchType: 'pricing' }));
    return res.status(200).json({ answer });
  }

  // ── 4. Try Voiceflow KB (fast, spec-exact answers) ────────────────
  try {
    const { output, topScore } = await queryKB(q);
    // Use KB answer if confidence is good
    if (output && topScore && topScore >= 0.55) {
      await logChat(await logCtx({ answer: output, matchType: 'kb', kbScore: topScore }));
      return res.status(200).json({ answer: output });
    }
  } catch (e) {
    console.error('KB error:', e.message);
  }

  // ── 5. Claude Haiku — answers anything ───────────────────────────
  try {
    const answer = await askClaude(q);
    await logChat(await logCtx({ answer, matchType: 'claude' }));
    return res.status(200).json({ answer });
  } catch (e) {
    console.error('Claude error:', e.message);
    const answer = "I'm having a technical issue right now. Please contact our team directly:\n\nCall: (888) 277-6144 — Mon–Fri 8am–6pm EST\nEmail: sales@wavlonlasers.com";
    await logChat(await logCtx({ answer, matchType: 'error' }));
    return res.status(200).json({ answer });
  }
};
