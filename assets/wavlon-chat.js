/* Wavlon Lasers — Chat Widget v2 (Intercom-style)
   Home panel → Chat → /api/chat  */
(function () {
  'use strict';

  var css = `
    #wlc-bubble {
      position:fixed; bottom:24px; right:24px; z-index:9998;
      width:56px; height:56px; border-radius:50%;
      background:linear-gradient(135deg,#0066cc 0%,#0044aa 100%);
      box-shadow:0 4px 20px rgba(0,102,204,.5);
      display:flex; align-items:center; justify-content:center;
      cursor:pointer; border:none; outline:none; transition:transform .2s,box-shadow .2s;
    }
    #wlc-bubble:hover { transform:scale(1.08); box-shadow:0 6px 28px rgba(0,102,204,.65); }
    #wlc-bubble svg { width:26px; height:26px; fill:#fff; }
    #wlc-bubble .wlc-close-icon { display:none; }
    #wlc-bubble.open .wlc-chat-icon { display:none; }
    #wlc-bubble.open .wlc-close-icon { display:flex; }
    #wlc-bubble.pulse::before {
      content:''; position:absolute; inset:-6px; border-radius:50%;
      border:2.5px solid rgba(0,102,204,.5);
      animation:wlc-pulse 1.8s ease-out infinite;
    }
    @keyframes wlc-pulse { 0%{transform:scale(.9);opacity:1;} 100%{transform:scale(1.5);opacity:0;} }

    #wlc-nudge {
      position:fixed; bottom:92px; right:24px; z-index:9997;
      background:#fff; border-radius:16px 16px 4px 16px;
      box-shadow:0 6px 28px rgba(0,0,0,.16);
      padding:14px 42px 14px 16px; max-width:228px;
      font-family:'Inter',system-ui,sans-serif; cursor:pointer;
      border:1.5px solid rgba(0,102,204,.12); display:none;
      animation:wlc-nudge-in .32s cubic-bezier(.34,1.56,.64,1);
    }
    @keyframes wlc-nudge-in { from{opacity:0;transform:translateY(14px) scale(.9);} to{opacity:1;transform:translateY(0) scale(1);} }
    #wlc-nudge p  { font-size:13.5px; font-weight:700; color:#1a1a2e; margin:0 0 3px; line-height:1.35; }
    #wlc-nudge span { font-size:11.5px; color:#868e96; display:block; line-height:1.45; }
    #wlc-nudge-close {
      position:absolute; top:8px; right:10px; background:none; border:none;
      cursor:pointer; color:#adb5bd; font-size:17px; line-height:1; padding:2px 4px;
    }

    #wlc-panel {
      position:fixed; bottom:92px; right:24px; z-index:9999;
      width:368px; height:580px; background:#fff; border-radius:16px;
      box-shadow:0 12px 48px rgba(0,0,0,.22);
      display:none; flex-direction:column; overflow:hidden;
      font-family:'Inter',system-ui,sans-serif;
      animation:wlc-slide-up .22s cubic-bezier(.34,1.3,.64,1);
    }
    #wlc-panel.open { display:flex; }
    @keyframes wlc-slide-up { from{opacity:0;transform:translateY(16px) scale(.97);} to{opacity:1;transform:translateY(0) scale(1);} }

    /* ── HOME ── */
    #wlc-home { display:flex; flex-direction:column; height:100%; }
    .wlc-home-hdr {
      background:linear-gradient(145deg,#0066cc 0%,#0044aa 100%);
      padding:24px 20px 60px; flex-shrink:0; position:relative;
    }
    .wlc-home-hdr-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; }
    .wlc-home-logo { font-size:16px; font-weight:800; color:#fff; letter-spacing:-.3px; }
    .wlc-home-logo em { color:rgba(255,255,255,.55); font-style:normal; font-weight:400; }
    .wlc-home-close {
      width:28px; height:28px; border-radius:50%; background:rgba(255,255,255,.15);
      border:none; cursor:pointer; color:#fff; font-size:18px; line-height:1;
      display:flex; align-items:center; justify-content:center; transition:background .15s;
    }
    .wlc-home-close:hover { background:rgba(255,255,255,.25); }
    .wlc-home-avatars { display:flex; align-items:center; margin-bottom:16px; }
    .wlc-home-av {
      width:36px; height:36px; border-radius:50%;
      border:2.5px solid rgba(255,255,255,.6);
      display:flex; align-items:center; justify-content:center;
      font-size:12px; font-weight:800; color:#fff;
      margin-left:-10px; flex-shrink:0;
    }
    .wlc-home-av:first-child { margin-left:0; }
    .wlc-home-greeting { font-size:22px; font-weight:800; color:#fff; line-height:1.2; letter-spacing:-.4px; }
    .wlc-home-greeting-sub { font-size:13px; color:rgba(255,255,255,.72); margin-top:7px; line-height:1.55; }

    .wlc-home-body { flex:1; overflow-y:auto; padding:12px 14px 8px; margin-top:-36px; position:relative; }

    .wlc-home-card {
      background:#fff; border-radius:13px;
      box-shadow:0 2px 18px rgba(0,0,0,.13);
      padding:16px 18px; margin-bottom:10px; cursor:pointer;
      transition:box-shadow .15s,transform .1s;
      display:flex; align-items:center; justify-content:space-between; gap:12px;
    }
    .wlc-home-card:hover { box-shadow:0 4px 26px rgba(0,0,0,.18); transform:translateY(-1px); }
    .wlc-home-card-title { font-size:14px; font-weight:700; color:#1a1a2e; margin-bottom:2px; }
    .wlc-home-card-sub { font-size:11.5px; color:#868e96; }
    .wlc-home-card-arrow {
      width:34px; height:34px; border-radius:50%; background:#0066cc; flex-shrink:0;
      display:flex; align-items:center; justify-content:center;
    }
    .wlc-home-card-arrow svg { width:15px; height:15px; fill:#fff; }

    .wlc-home-link {
      background:#fff; border-radius:13px; border:1.5px solid #f1f3f5;
      padding:14px 16px; margin-bottom:10px; cursor:pointer;
      display:flex; justify-content:space-between; align-items:center;
      text-decoration:none; transition:border-color .15s;
    }
    .wlc-home-link:hover { border-color:#0066cc; }
    .wlc-home-link-text {}
    .wlc-home-link-title { font-size:13px; font-weight:700; color:#1a1a2e; margin-bottom:2px; }
    .wlc-home-link-sub { font-size:12px; color:#868e96; }
    .wlc-home-link-icon { color:#adb5bd; font-size:18px; }

    .wlc-home-nav {
      display:flex; border-top:1px solid #f1f3f5; flex-shrink:0; background:#fff;
    }
    .wlc-hnav-btn {
      flex:1; padding:12px 8px; display:flex; flex-direction:column; align-items:center; gap:3px;
      border:none; background:transparent; cursor:pointer; font-family:inherit;
      font-size:11px; font-weight:600; color:#adb5bd; transition:color .15s;
    }
    .wlc-hnav-btn.active { color:#0066cc; }
    .wlc-hnav-btn svg { width:20px; height:20px; }

    /* ── CHAT ── */
    #wlc-chat { display:none; flex-direction:column; height:100%; }
    #wlc-chat.show { display:flex; }

    .wlc-chat-hdr {
      padding:12px 14px; background:#fff; border-bottom:1px solid #f1f3f5;
      display:flex; align-items:center; gap:10px; flex-shrink:0;
    }
    .wlc-back-btn {
      width:30px; height:30px; border-radius:8px; background:#f8f9fa;
      border:none; cursor:pointer; display:flex; align-items:center; justify-content:center;
      flex-shrink:0; transition:background .15s;
    }
    .wlc-back-btn:hover { background:#e9ecef; }
    .wlc-back-btn svg { width:16px; height:16px; fill:none; stroke:#495057; stroke-width:2.5; }
    .wlc-chat-hdr-icon {
      width:36px; height:36px; border-radius:10px;
      background:linear-gradient(135deg,#0066cc,#0044aa);
      display:flex; align-items:center; justify-content:center; flex-shrink:0;
    }
    .wlc-chat-hdr-icon svg { width:18px; height:18px; fill:#fff; }
    .wlc-chat-hdr-info { flex:1; min-width:0; }
    .wlc-chat-hdr-name { font-size:14px; font-weight:700; color:#1a1a2e; }
    .wlc-chat-hdr-sub { font-size:11px; color:#868e96; }
    .wlc-close-chat {
      width:28px; height:28px; border-radius:6px; background:none; border:none;
      cursor:pointer; display:flex; align-items:center; justify-content:center;
      color:#adb5bd; font-size:20px; line-height:1; transition:background .15s,color .15s;
    }
    .wlc-close-chat:hover { background:#f8f9fa; color:#495057; }

    .wlc-messages {
      flex:1; overflow-y:auto; padding:16px 14px;
      display:flex; flex-direction:column; gap:10px; background:#f8f9fa;
    }
    .wlc-msg-wrap { display:flex; flex-direction:column; gap:4px; }
    .wlc-msg-wrap.user { align-items:flex-end; }
    .wlc-msg-wrap.bot  { align-items:flex-start; }
    .wlc-msg-meta { font-size:10.5px; color:#adb5bd; padding:0 2px; display:flex; align-items:center; gap:5px; }
    .wlc-bot-dot { width:6px; height:6px; border-radius:50%; background:#34d058; display:inline-block; }
    .wlc-msg {
      max-width:84%; padding:10px 14px; border-radius:18px;
      font-size:13px; line-height:1.58; position:relative;
    }
    .wlc-msg.bot  { background:#fff; color:#1a1a2e; border:1px solid #e9ecef; border-bottom-left-radius:4px; }
    .wlc-msg.user { background:#0066cc; color:#fff; border-bottom-right-radius:4px; }
    .wlc-typing {
      display:flex; gap:5px; align-items:center;
      padding:12px 16px; background:#fff; border:1px solid #e9ecef;
      border-radius:18px; border-bottom-left-radius:4px; align-self:flex-start; width:58px;
    }
    .wlc-dot { width:6px; height:6px; border-radius:50%; background:#adb5bd; animation:wlc-bounce .9s infinite; }
    .wlc-dot:nth-child(2){animation-delay:.15s;} .wlc-dot:nth-child(3){animation-delay:.3s;}
    @keyframes wlc-bounce{0%,60%,100%{transform:translateY(0);}30%{transform:translateY(-5px);}}

    .wlc-quick-replies {
      padding:8px 12px; display:flex; flex-wrap:wrap; gap:6px;
      background:#f8f9fa; border-top:1px solid #eee; flex-shrink:0;
    }
    .wlc-qr-btn {
      padding:7px 14px; border-radius:20px; border:1.5px solid #dee2e6;
      background:#fff; font-size:12px; font-weight:600; color:#1a1a2e;
      cursor:pointer; font-family:inherit; white-space:nowrap;
      transition:border-color .15s,color .15s;
    }
    .wlc-qr-btn:hover { border-color:#0066cc; color:#0066cc; }

    .wlc-chat-footer {
      padding:10px 12px; background:#fff; border-top:1px solid #f1f3f5;
      display:flex; gap:8px; align-items:center; flex-shrink:0;
    }
    .wlc-input {
      flex:1; border:1.5px solid #e9ecef; border-radius:22px;
      padding:9px 16px; font-size:13px; color:#1a1a2e;
      outline:none; font-family:inherit; background:#f8f9fa; transition:border-color .15s,background .15s;
    }
    .wlc-input:focus { border-color:#0066cc; background:#fff; }
    .wlc-input::placeholder { color:#adb5bd; }
    .wlc-send-btn {
      width:36px; height:36px; border-radius:50%; background:#0066cc;
      border:none; cursor:pointer; display:flex; align-items:center;
      justify-content:center; transition:background .15s; flex-shrink:0;
    }
    .wlc-send-btn:hover { background:#0055b3; }
    .wlc-send-btn svg { width:15px; height:15px; fill:#fff; }
    .wlc-send-btn:disabled { background:#ced4da; cursor:default; }
    .wlc-chat-brand { text-align:center; padding:5px 0 4px; font-size:10px; color:#dee2e6; background:#fff; flex-shrink:0; }

    .wlc-cta-row { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
    .wlc-cta-btn {
      display:inline-flex; align-items:center; gap:4px; padding:7px 14px; border-radius:8px;
      background:#0066cc; color:#fff !important; font-size:12px; font-weight:700;
      text-decoration:none; transition:background .15s; white-space:nowrap;
    }
    .wlc-cta-btn:hover { background:#0055b3; }

    @media(max-width:400px){
      #wlc-panel  { width:calc(100vw - 24px); right:12px; bottom:84px; }
      #wlc-bubble { bottom:16px; right:16px; }
      #wlc-nudge  { right:12px; }
    }
  `;

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── Nudge ─────────────────────────────────────────────────────────
  var nudge = document.createElement('div');
  nudge.id = 'wlc-nudge';
  nudge.innerHTML = '<button id="wlc-nudge-close" aria-label="Dismiss">&times;</button><p>Ask our Wavlon AI ✦</p><span>Specs, pricing &amp; lead times — answered instantly.</span>';

  // ── Bubble ────────────────────────────────────────────────────────
  var bubble = document.createElement('button');
  bubble.id = 'wlc-bubble';
  bubble.setAttribute('aria-label','Open Wavlon AI');
  bubble.innerHTML = `
    <svg class="wlc-chat-icon" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
    <svg class="wlc-close-icon" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
  `;

  // ── Main panel ────────────────────────────────────────────────────
  var panel = document.createElement('div');
  panel.id = 'wlc-panel';
  panel.innerHTML = `
    <!-- ── HOME PANEL ── -->
    <div id="wlc-home">
      <div class="wlc-home-hdr">
        <div class="wlc-home-hdr-top">
          <div class="wlc-home-logo">Wavlon<em>Lasers</em></div>
          <button class="wlc-home-close" id="wlc-home-close">&times;</button>
        </div>
        <div class="wlc-home-avatars">
          <div class="wlc-home-av" style="background:rgba(0,80,180,.5);">WL</div>
          <div class="wlc-home-av" style="background:rgba(0,50,120,.6);">AI</div>
          <div class="wlc-home-av" style="background:rgba(0,30,90,.55);">CA</div>
        </div>
        <div class="wlc-home-greeting">Hi there 👋</div>
        <div class="wlc-home-greeting-sub">How can we help? Our AI answers instantly — or send a message and our team responds within a few hours.</div>
      </div>
      <div class="wlc-home-body">
        <div class="wlc-home-card" id="wlc-start-chat">
          <div>
            <div class="wlc-home-card-title">Send us a message</div>
            <div class="wlc-home-card-sub">Chat with Wavlon AI &middot; instant answers</div>
          </div>
          <div class="wlc-home-card-arrow">
            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </div>
        </div>
        <a class="wlc-home-link" href="/contact/#quote">
          <div class="wlc-home-link-text">
            <div class="wlc-home-link-title">💬 Get a Custom Quote</div>
            <div class="wlc-home-link-sub">Response within 24 business hours</div>
          </div>
          <div class="wlc-home-link-icon">›</div>
        </a>
        <a class="wlc-home-link" href="/financing/">
          <div class="wlc-home-link-text">
            <div class="wlc-home-link-title">💳 Equipment Financing</div>
            <div class="wlc-home-link-sub">$0 down &middot; Canadian terms &middot; 48-hr approval</div>
          </div>
          <div class="wlc-home-link-icon">›</div>
        </a>
        <a class="wlc-home-link" href="/machines/">
          <div class="wlc-home-link-text">
            <div class="wlc-home-link-title">⚙️ View All Machines</div>
            <div class="wlc-home-link-sub">Sheet cutting, tube cutting, welding</div>
          </div>
          <div class="wlc-home-link-icon">›</div>
        </a>
      </div>
      <div class="wlc-home-nav">
        <button class="wlc-hnav-btn active" id="wlc-nav-home">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          Home
        </button>
        <button class="wlc-hnav-btn" id="wlc-nav-msg">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          Messages
        </button>
      </div>
    </div>

    <!-- ── CHAT PANEL ── -->
    <div id="wlc-chat">
      <div class="wlc-chat-hdr">
        <button class="wlc-back-btn" id="wlc-back" aria-label="Back">
          <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="wlc-chat-hdr-icon">
          <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        </div>
        <div class="wlc-chat-hdr-info">
          <div class="wlc-chat-hdr-name">Wavlon AI</div>
          <div class="wlc-chat-hdr-sub">Sales team can also help</div>
        </div>
        <button class="wlc-close-chat" id="wlc-chat-close">&times;</button>
      </div>
      <div class="wlc-messages" id="wlc-messages"></div>
      <div class="wlc-quick-replies" id="wlc-qr" style="display:none;"></div>
      <div class="wlc-chat-footer">
        <input class="wlc-input" id="wlc-input" type="text" placeholder="Ask about specs, pricing, lead times…" maxlength="300" autocomplete="off"/>
        <button class="wlc-send-btn" id="wlc-send" aria-label="Send">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
      <div class="wlc-chat-brand">Powered by Wavlon Lasers AI</div>
    </div>
  `;

  document.body.appendChild(nudge);
  document.body.appendChild(bubble);
  document.body.appendChild(panel);

  // ── Refs ──────────────────────────────────────────────────────────
  var homeEl    = document.getElementById('wlc-home');
  var chatEl    = document.getElementById('wlc-chat');
  var msgsEl    = document.getElementById('wlc-messages');
  var qrEl      = document.getElementById('wlc-qr');
  var inputEl   = document.getElementById('wlc-input');
  var sendBtn   = document.getElementById('wlc-send');
  var nudgeClose = document.getElementById('wlc-nudge-close');

  var isOpen     = false;
  var isLoading  = false;
  var chatReady  = false;
  var sessionId  = 'wl-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,7);
  var userInfo   = null;
  try { var _s = localStorage.getItem('wlc_user'); if (_s) userInfo = JSON.parse(_s); } catch(e) {}

  // ── FAQ quick replies ─────────────────────────────────────────────
  var FAQ = [
    { label:'Which machine suits me?',  q:'Which laser machine is right for my application?' },
    { label:'Cutting thickness guide',  q:'What materials and thicknesses can your machines cut?' },
    { label:'Pricing & financing',      q:'What are your pricing and financing options?' },
    { label:'Lead times & delivery',    q:'What are your lead times and how is delivery handled?' },
    { label:'Warranty & service',       q:'What does your warranty and after-sale service include?' },
  ];

  function renderQR() {
    qrEl.innerHTML = '';
    FAQ.forEach(function(f) {
      var b = document.createElement('button');
      b.className = 'wlc-qr-btn'; b.textContent = f.label;
      b.addEventListener('click', function(e){ e.stopPropagation(); hideQR(); inputEl.value = f.q; sendMessage(); });
      qrEl.appendChild(b);
    });
    qrEl.style.display = 'flex';
  }
  function hideQR() { qrEl.style.display = 'none'; qrEl.innerHTML = ''; }

  // ── Nudge ─────────────────────────────────────────────────────────
  function showNudge() { if (!isOpen){ nudge.style.display='block'; bubble.classList.add('pulse'); } }
  function hideNudge() { nudge.style.display='none'; bubble.classList.remove('pulse'); }
  try {
    if (!sessionStorage.getItem('wlc_nudged')) {
      sessionStorage.setItem('wlc_nudged','1');
      setTimeout(showNudge, 5000);
      setTimeout(function(){ hideNudge(); if(!isOpen) openPanel(); }, 18000);
    }
  } catch(e) {}
  nudge.addEventListener('click', function(){ hideNudge(); if(!isOpen) openPanel(); });
  nudgeClose.addEventListener('click', function(e){ e.stopPropagation(); hideNudge(); });

  // ── Panel open/close ──────────────────────────────────────────────
  function openPanel() {
    isOpen = true;
    bubble.classList.add('open');
    panel.classList.add('open');
  }
  function closePanel() {
    isOpen = false;
    bubble.classList.remove('open');
    panel.classList.remove('open');
  }
  function togglePanel() { if (isOpen) closePanel(); else openPanel(); }

  bubble.addEventListener('click', togglePanel);
  document.getElementById('wlc-home-close').addEventListener('click', closePanel);
  document.getElementById('wlc-chat-close').addEventListener('click', closePanel);
  document.addEventListener('click', function(e){
    if (isOpen && !panel.contains(e.target) && !bubble.contains(e.target) && !nudge.contains(e.target)) closePanel();
  });

  // ── Home ↔ Chat navigation ────────────────────────────────────────
  function goChat() {
    homeEl.style.display = 'none';
    chatEl.classList.add('show');
    if (!chatReady) {
      chatReady = true;
      var first = (userInfo && userInfo.name) ? userInfo.name.split(' ')[0] : null;
      var g = first
        ? 'Hi ' + first + '! 👋 I\'m the Wavlon AI.\n\nAsk me anything about our fiber laser machines — specs, cutting thickness, power options, lead times, or financing.'
        : 'Hello 👋 How can I help you today?\n\nI can answer questions about our fiber laser machines — specs, materials, pricing, lead times, and more.';
      appendMsg(g, 'bot');
      renderQR();
      if (userInfo && userInfo.email) {
        fetch('/api/submit-form', { method:'POST', headers:{'Content-Type':'application/json'},
          body:JSON.stringify({ name:userInfo.name||'', email:userInfo.email||'', source:'chat-widget', status:'new', session_id:sessionId }) }).catch(function(){});
      }
    }
    setTimeout(function(){ inputEl.focus(); }, 80);
  }
  function goHome() {
    chatEl.classList.remove('show');
    homeEl.style.display = 'flex';
  }

  document.getElementById('wlc-start-chat').addEventListener('click', goChat);
  document.getElementById('wlc-nav-msg').addEventListener('click', goChat);
  document.getElementById('wlc-back').addEventListener('click', goHome);

  // ── Format + append ───────────────────────────────────────────────
  function fmt(text) {
    var h = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    h = h.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
    h = h.replace(/^- (.+)$/gm,'<span style="display:block;padding-left:12px;position:relative;"><span style="position:absolute;left:0">•</span>$1</span>');
    var ctaBtns = [];
    h = h.replace(/\[CTA:\s*([^\]]+)\]\(([^)]+)\)/g, function(_, l, u){ ctaBtns.push({label:l.trim(),url:u.trim()}); return ''; });
    h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" style="color:#0066cc;text-decoration:underline;">$1</a>');
    h = h.replace(/\n/g,'<br>');
    if (ctaBtns.length) h += '<div class="wlc-cta-row">' + ctaBtns.map(function(b){ return '<a class="wlc-cta-btn" href="'+b.url+'">'+b.label+' &rarr;</a>'; }).join('') + '</div>';
    return h;
  }

  function appendMsg(text, role) {
    var wrap = document.createElement('div');
    wrap.className = 'wlc-msg-wrap ' + role;
    var msg = document.createElement('div');
    msg.className = 'wlc-msg ' + role;
    if (role === 'bot') msg.innerHTML = fmt(text); else msg.textContent = text;
    wrap.appendChild(msg);
    if (role === 'bot') {
      var meta = document.createElement('div');
      meta.className = 'wlc-msg-meta';
      meta.innerHTML = '<span class="wlc-bot-dot"></span>Wavlon AI &nbsp;&middot;&nbsp; AI Agent &nbsp;&middot;&nbsp; just now';
      wrap.appendChild(meta);
    }
    msgsEl.appendChild(wrap);
    msgsEl.scrollTop = msgsEl.scrollHeight;
  }

  function showTyping() {
    var el = document.createElement('div'); el.className='wlc-typing'; el.id='wlc-typing';
    el.innerHTML='<div class="wlc-dot"></div><div class="wlc-dot"></div><div class="wlc-dot"></div>';
    msgsEl.appendChild(el); msgsEl.scrollTop = msgsEl.scrollHeight;
  }
  function hideTyping() { var el=document.getElementById('wlc-typing'); if(el) el.remove(); }

  // ── Send ──────────────────────────────────────────────────────────
  async function sendMessage() {
    var q = inputEl.value.trim(); if (!q || isLoading) return;
    isLoading = true; sendBtn.disabled = true; inputEl.value = '';
    hideQR();
    appendMsg(q, 'user'); showTyping();
    try {
      var res = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ question:q, sessionId, pageUrl:window.location.href, userInfo:userInfo||{} }) });
      var d = await res.json(); hideTyping();
      appendMsg(d.answer || "I don't have that info right now. Contact us at sales@wavlonlasers.com or (888) 277-6144.", 'bot');
    } catch(e) {
      hideTyping();
      appendMsg("Connection error. Please try again or email sales@wavlonlasers.com.", 'bot');
    }
    isLoading = false; sendBtn.disabled = false; inputEl.focus();
  }

  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', function(e){ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); sendMessage(); } });

})();
