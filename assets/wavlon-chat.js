/* Wavlon Lasers — Custom AI Chat Widget
   Pre-chat lead form → AI chat
   Calls /api/chat → Voiceflow KB → answers from wavlon-faq, wavlon-specs, wavlon-materials
   No third-party watermark. Full Wavlon branding. */
(function () {
  'use strict';

  // ── Styles ───────────────────────────────────────────────────────────
  var css = `
    #wlc-bubble {
      position: fixed; bottom: 24px; right: 24px; z-index: 9998;
      width: 56px; height: 56px; border-radius: 50%;
      background: #0066cc; box-shadow: 0 4px 20px rgba(0,102,204,.45);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: transform .2s, box-shadow .2s;
      border: none; outline: none;
    }
    #wlc-bubble:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(0,102,204,.55); }
    #wlc-bubble svg { width: 26px; height: 26px; fill: #fff; }
    #wlc-bubble .wlc-close { display: none; }
    #wlc-bubble.open .wlc-chat-icon { display: none; }
    #wlc-bubble.open .wlc-close { display: flex; }

    #wlc-panel {
      position: fixed; bottom: 92px; right: 24px; z-index: 9999;
      width: 360px; max-height: 560px;
      background: #fff; border-radius: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,.18);
      display: none; flex-direction: column; overflow: hidden;
      font-family: 'Inter', system-ui, sans-serif;
      animation: wlc-slide-up .2s ease;
    }
    #wlc-panel.open { display: flex; }
    @keyframes wlc-slide-up {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .wlc-header {
      background: #0066cc; padding: 16px 18px; display: flex;
      align-items: center; gap: 12px; flex-shrink: 0;
    }
    .wlc-header-avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(255,255,255,.2); display: flex;
      align-items: center; justify-content: center; flex-shrink: 0;
    }
    .wlc-header-avatar svg { width: 20px; height: 20px; fill: #fff; }
    .wlc-header-text h4 {
      font-size: 14px; font-weight: 700; color: #fff; margin: 0;
    }
    .wlc-header-text p {
      font-size: 11px; color: rgba(255,255,255,.75); margin: 2px 0 0;
    }

    /* ── Pre-chat form ── */
    #wlc-prechat {
      flex: 1; overflow-y: auto; padding: 20px 18px 16px;
      background: #f8f9fa; display: flex; flex-direction: column; gap: 0;
    }
    .wlc-prechat-intro {
      font-size: 13px; color: #495057; line-height: 1.55;
      margin-bottom: 16px;
    }
    .wlc-prechat-intro strong { color: #1a1a2e; }
    .wlc-field {
      display: flex; flex-direction: column; gap: 4px; margin-bottom: 11px;
    }
    .wlc-field label {
      font-size: 11px; font-weight: 600; color: #495057;
      text-transform: uppercase; letter-spacing: .5px;
    }
    .wlc-field input {
      border: 1.5px solid #dee2e6; border-radius: 8px;
      padding: 9px 12px; font-size: 13px; color: #1a1a2e;
      font-family: inherit; outline: none; background: #fff;
      transition: border-color .15s;
    }
    .wlc-field input:focus { border-color: #0066cc; }
    .wlc-field input::placeholder { color: #adb5bd; }
    .wlc-field .wlc-required { color: #dc3545; margin-left: 2px; }
    .wlc-prechat-submit {
      width: 100%; padding: 11px; margin-top: 6px;
      background: #0066cc; color: #fff; border: none;
      border-radius: 8px; font-size: 14px; font-weight: 600;
      cursor: pointer; font-family: inherit;
      transition: background .15s; display: flex;
      align-items: center; justify-content: center; gap: 8px;
    }
    .wlc-prechat-submit:hover { background: #0055b3; }
    .wlc-prechat-submit:disabled { background: #ced4da; cursor: default; }
    .wlc-prechat-submit svg { width: 16px; height: 16px; fill: #fff; }
    .wlc-skip-link {
      text-align: center; margin-top: 10px;
      font-size: 11px; color: #adb5bd;
    }
    .wlc-skip-link a {
      color: #adb5bd; text-decoration: underline; cursor: pointer;
    }
    .wlc-skip-link a:hover { color: #868e96; }
    .wlc-field-error {
      font-size: 11px; color: #dc3545; margin-top: 2px; display: none;
    }

    /* ── Chat view ── */
    .wlc-messages {
      flex: 1; overflow-y: auto; padding: 16px;
      display: flex; flex-direction: column; gap: 12px;
      background: #f8f9fa;
    }
    .wlc-msg {
      max-width: 85%; padding: 10px 14px; border-radius: 12px;
      font-size: 13px; line-height: 1.55;
    }
    .wlc-msg.bot {
      background: #fff; color: #1a1a2e;
      border: 1px solid #e9ecef; align-self: flex-start;
      border-bottom-left-radius: 4px;
    }
    .wlc-msg.user {
      background: #0066cc; color: #fff;
      align-self: flex-end; border-bottom-right-radius: 4px;
    }
    .wlc-typing {
      display: flex; gap: 4px; align-items: center;
      padding: 10px 14px; background: #fff;
      border: 1px solid #e9ecef; border-radius: 12px;
      border-bottom-left-radius: 4px; align-self: flex-start; width: 52px;
    }
    .wlc-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: #adb5bd; animation: wlc-bounce .9s infinite;
    }
    .wlc-dot:nth-child(2) { animation-delay: .15s; }
    .wlc-dot:nth-child(3) { animation-delay: .30s; }
    @keyframes wlc-bounce {
      0%,60%,100% { transform: translateY(0); }
      30%          { transform: translateY(-5px); }
    }

    .wlc-footer {
      padding: 12px 14px; background: #fff;
      border-top: 1px solid #e9ecef;
      display: flex; gap: 8px; align-items: center; flex-shrink: 0;
    }
    .wlc-input {
      flex: 1; border: 1.5px solid #dee2e6; border-radius: 8px;
      padding: 9px 12px; font-size: 13px; color: #1a1a2e;
      outline: none; font-family: inherit; resize: none;
      transition: border-color .15s;
    }
    .wlc-input:focus { border-color: #0066cc; }
    .wlc-input::placeholder { color: #adb5bd; }
    .wlc-send {
      width: 36px; height: 36px; border-radius: 8px;
      background: #0066cc; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background .15s; flex-shrink: 0;
    }
    .wlc-send:hover { background: #0055b3; }
    .wlc-send svg { width: 16px; height: 16px; fill: #fff; }
    .wlc-send:disabled { background: #ced4da; cursor: default; }

    .wlc-branding {
      text-align: center; padding: 6px;
      font-size: 10px; color: #adb5bd; background: #fff; flex-shrink: 0;
    }

    @media (max-width: 400px) {
      #wlc-panel { width: calc(100vw - 24px); right: 12px; bottom: 80px; }
      #wlc-bubble { bottom: 16px; right: 16px; }
    }
  `;

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── HTML ─────────────────────────────────────────────────────────────
  var bubble = document.createElement('button');
  bubble.id = 'wlc-bubble';
  bubble.setAttribute('aria-label', 'Open Wavlon AI Assistant');
  bubble.innerHTML = `
    <svg class="wlc-chat-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
    </svg>
    <svg class="wlc-close" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  `;

  var panel = document.createElement('div');
  panel.id = 'wlc-panel';
  panel.innerHTML = `
    <div class="wlc-header">
      <div class="wlc-header-avatar">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      </div>
      <div class="wlc-header-text">
        <h4>Wavlon Assistant</h4>
        <p>Ask about machines, specs, pricing &amp; more</p>
      </div>
    </div>

    <!-- Pre-chat lead capture form -->
    <div id="wlc-prechat">
      <p class="wlc-prechat-intro">
        <strong>Before we chat —</strong> let us know who you are so our team can follow up if needed.
      </p>
      <div class="wlc-field">
        <label>Your Name <span class="wlc-required">*</span></label>
        <input id="wlc-f-name" type="text" placeholder="e.g. John Smith" autocomplete="name" maxlength="80"/>
        <span class="wlc-field-error" id="wlc-err-name">Please enter your name.</span>
      </div>
      <div class="wlc-field">
        <label>Company Name</label>
        <input id="wlc-f-company" type="text" placeholder="e.g. Acme Fabrication" autocomplete="organization" maxlength="100"/>
      </div>
      <div class="wlc-field">
        <label>Email Address <span class="wlc-required">*</span></label>
        <input id="wlc-f-email" type="email" placeholder="you@company.com" autocomplete="email" maxlength="120"/>
        <span class="wlc-field-error" id="wlc-err-email">Please enter a valid email.</span>
      </div>
      <div class="wlc-field">
        <label>Phone Number</label>
        <input id="wlc-f-phone" type="tel" placeholder="(555) 000-0000" autocomplete="tel" maxlength="30"/>
      </div>
      <button class="wlc-prechat-submit" id="wlc-prechat-submit">
        Start Chatting
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
      <p class="wlc-skip-link"><a id="wlc-skip">Skip and chat anonymously</a></p>
    </div>

    <!-- Chat view (hidden until form submitted) -->
    <div class="wlc-messages" id="wlc-messages" style="display:none;"></div>
    <div class="wlc-footer" id="wlc-chat-footer" style="display:none;">
      <input class="wlc-input" id="wlc-input" type="text" placeholder="Ask about machines, specs, lead times..." maxlength="300" autocomplete="off"/>
      <button class="wlc-send" id="wlc-send" aria-label="Send">
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
    <div class="wlc-branding" id="wlc-branding">Powered by Wavlon Lasers AI</div>
  `;

  document.body.appendChild(bubble);
  document.body.appendChild(panel);

  // ── State ─────────────────────────────────────────────────────────────
  var messagesEl   = document.getElementById('wlc-messages');
  var chatFooter   = document.getElementById('wlc-chat-footer');
  var inputEl      = document.getElementById('wlc-input');
  var sendBtn      = document.getElementById('wlc-send');
  var prechatEl    = document.getElementById('wlc-prechat');
  var submitBtn    = document.getElementById('wlc-prechat-submit');
  var skipLink     = document.getElementById('wlc-skip');
  var isOpen       = false;
  var isLoading    = false;

  // Generate a unique session ID for this browser session
  var sessionId = 'wl-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);

  // User info — load from localStorage if already captured
  var userInfo = null;
  try {
    var stored = localStorage.getItem('wlc_user');
    if (stored) userInfo = JSON.parse(stored);
  } catch(e) {}

  // ── Panel toggle ──────────────────────────────────────────────────────
  function togglePanel() {
    isOpen = !isOpen;
    bubble.classList.toggle('open', isOpen);
    panel.classList.toggle('open', isOpen);
    if (isOpen) {
      if (userInfo) {
        // Already captured — go straight to chat
        showChat();
        inputEl.focus();
      } else {
        document.getElementById('wlc-f-name').focus();
      }
    }
  }

  // ── Show chat (hide form) ─────────────────────────────────────────────
  function showChat() {
    prechatEl.style.display = 'none';
    messagesEl.style.display = 'flex';
    chatFooter.style.display = 'flex';

    // Only show welcome once per session
    if (!messagesEl.hasChildNodes()) {
      var firstName = (userInfo && userInfo.name) ? userInfo.name.split(' ')[0] : null;
      var greeting  = firstName
        ? 'Hi ' + firstName + '! I\'m Wavlon\'s AI assistant.\n\nAsk me anything about our fiber laser machines — specs, cutting capabilities, pricing, or financing.'
        : 'Hi! I\'m Wavlon\'s AI assistant. Ask me anything about our fiber laser machines — specs, cutting capabilities, pricing, or financing.';
      appendMsg(greeting, 'bot');
    }
  }

  // ── Pre-chat form validation & submit ────────────────────────────────
  function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function clearErrors() {
    document.getElementById('wlc-err-name').style.display  = 'none';
    document.getElementById('wlc-err-email').style.display = 'none';
    document.getElementById('wlc-f-name').style.borderColor  = '';
    document.getElementById('wlc-f-email').style.borderColor = '';
  }

  async function submitPrechat() {
    clearErrors();
    var name    = document.getElementById('wlc-f-name').value.trim();
    var company = document.getElementById('wlc-f-company').value.trim();
    var email   = document.getElementById('wlc-f-email').value.trim();
    var phone   = document.getElementById('wlc-f-phone').value.trim();

    var valid = true;
    if (!name) {
      document.getElementById('wlc-err-name').style.display   = 'block';
      document.getElementById('wlc-f-name').style.borderColor = '#dc3545';
      valid = false;
    }
    if (!email || !validateEmail(email)) {
      document.getElementById('wlc-err-email').style.display   = 'block';
      document.getElementById('wlc-f-email').style.borderColor = '#dc3545';
      valid = false;
    }
    if (!valid) return;

    // Disable button while saving
    submitBtn.disabled = true;
    submitBtn.textContent = 'Starting…';

    userInfo = { name: name, company: company, email: email, phone: phone };

    // Save to localStorage
    try { localStorage.setItem('wlc_user', JSON.stringify(userInfo)); } catch(e) {}

    // Fire-and-forget lead save to Supabase via submit-form proxy
    // session_id links this lead to all chat messages in Wavlon_Chat_Logs
    fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:       name,
        company:    company,
        email:      email,
        phone:      phone,
        source:     'chat-widget',
        status:     'new',
        session_id: sessionId
      })
    }).catch(function(){});

    showChat();
    inputEl.focus();
  }

  submitBtn.addEventListener('click', submitPrechat);

  skipLink.addEventListener('click', function(e) {
    e.preventDefault();
    userInfo = {};
    try { localStorage.setItem('wlc_user', JSON.stringify(userInfo)); } catch(e) {}
    showChat();
    inputEl.focus();
  });

  // Allow Enter key in form fields to advance or submit
  ['wlc-f-name','wlc-f-company','wlc-f-email','wlc-f-phone'].forEach(function(id, i, arr) {
    document.getElementById(id).addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (i < arr.length - 1) {
          document.getElementById(arr[i + 1]).focus();
        } else {
          submitPrechat();
        }
      }
    });
  });

  // ── Chat helpers ──────────────────────────────────────────────────────
  function formatText(text) {
    var escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    escaped = escaped.replace(/^- (.+)$/gm, '<span style="display:block;padding-left:12px;position:relative;"><span style="position:absolute;left:0;">•</span>$1</span>');
    escaped = escaped.replace(/\n/g, '<br>');
    return escaped;
  }

  function appendMsg(text, role) {
    var msg = document.createElement('div');
    msg.className = 'wlc-msg ' + role;
    if (role === 'bot') {
      msg.innerHTML = formatText(text);
    } else {
      msg.textContent = text;
    }
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return msg;
  }

  function showTyping() {
    var el = document.createElement('div');
    el.className = 'wlc-typing';
    el.id = 'wlc-typing';
    el.innerHTML = '<div class="wlc-dot"></div><div class="wlc-dot"></div><div class="wlc-dot"></div>';
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    var el = document.getElementById('wlc-typing');
    if (el) el.remove();
  }

  async function sendMessage() {
    var q = inputEl.value.trim();
    if (!q || isLoading) return;

    isLoading = true;
    sendBtn.disabled = true;
    inputEl.value = '';

    appendMsg(q, 'user');
    showTyping();

    try {
      var res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question:  q,
          sessionId: sessionId,
          pageUrl:   window.location.href,
          userInfo:  userInfo || {}
        })
      });
      var data = await res.json();
      hideTyping();
      appendMsg(data.answer || "I don't have that information right now. Please contact our team at sales@wavlonlasers.com or call (888) 277-6144.", 'bot');
    } catch (e) {
      hideTyping();
      appendMsg("Connection error. Please try again or email sales@wavlonlasers.com.", 'bot');
    }

    isLoading = false;
    sendBtn.disabled = false;
    inputEl.focus();
  }

  bubble.addEventListener('click', togglePanel);
  sendBtn.addEventListener('click', sendMessage);

  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (isOpen && !panel.contains(e.target) && !bubble.contains(e.target)) {
      togglePanel();
    }
  });

})();
