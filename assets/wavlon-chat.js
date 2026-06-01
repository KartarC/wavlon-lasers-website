/* Wavlon Lasers — Custom AI Chat Widget
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
      align-items: center; gap: 12px;
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
      display: flex; gap: 8px; align-items: center;
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
      font-size: 10px; color: #adb5bd; background: #fff;
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
    <div class="wlc-messages" id="wlc-messages">
      <div class="wlc-msg bot">Hi! I'm Wavlon's AI assistant. Ask me anything about our fiber laser machines — specs, cutting capabilities, pricing, or financing.</div>
    </div>
    <div class="wlc-footer">
      <input class="wlc-input" id="wlc-input" type="text" placeholder="Ask about machines, specs, lead times..." maxlength="300" autocomplete="off"/>
      <button class="wlc-send" id="wlc-send" aria-label="Send">
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
    <div class="wlc-branding">Powered by Wavlon Lasers AI</div>
  `;

  document.body.appendChild(bubble);
  document.body.appendChild(panel);

  // ── Logic ─────────────────────────────────────────────────────────────
  var messagesEl = document.getElementById('wlc-messages');
  var inputEl    = document.getElementById('wlc-input');
  var sendBtn    = document.getElementById('wlc-send');
  var isOpen     = false;
  var isLoading  = false;

  function togglePanel() {
    isOpen = !isOpen;
    bubble.classList.toggle('open', isOpen);
    panel.classList.toggle('open', isOpen);
    if (isOpen) inputEl.focus();
  }

  function formatText(text) {
    // Convert **bold** → <strong>
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Convert newlines → <br>
    text = text.replace(/\n/g, '<br>');
    return text;
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
        body: JSON.stringify({ question: q })
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
