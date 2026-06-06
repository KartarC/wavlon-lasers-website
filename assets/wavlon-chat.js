/* Wavlon Lasers — Custom AI Chat Widget
   Pre-chat lead form → AI chat → /api/chat
   Auto-nudge: shows "Ask Wavlon AI!" bubble after 5s, auto-opens after 18s (once per session). */
(function () {
  'use strict';

  var css = `
    #wlc-bubble {
      position: fixed; bottom: 24px; right: 24px; z-index: 9998;
      width: 60px; height: 60px; border-radius: 50%;
      background: linear-gradient(135deg,#0066cc 0%,#0055b3 100%);
      box-shadow: 0 4px 24px rgba(0,102,204,.5);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: transform .2s,box-shadow .2s;
      border: none; outline: none; position: fixed;
    }
    #wlc-bubble:hover { transform: scale(1.1); box-shadow: 0 6px 32px rgba(0,102,204,.65); }
    #wlc-bubble svg { width: 28px; height: 28px; fill: #fff; }
    #wlc-bubble .wlc-close { display: none; }
    #wlc-bubble.open .wlc-chat-icon { display: none; }
    #wlc-bubble.open .wlc-close { display: flex; }

    #wlc-bubble.pulse::before {
      content:''; position:absolute; inset:-5px; border-radius:50%;
      border:2.5px solid rgba(0,102,204,.6);
      animation:wlc-pulse 1.8s ease-out infinite;
    }
    #wlc-bubble.pulse::after {
      content:''; position:absolute; inset:-13px; border-radius:50%;
      border:2px solid rgba(0,102,204,.25);
      animation:wlc-pulse 1.8s ease-out .55s infinite;
    }
    @keyframes wlc-pulse {
      0%   { transform:scale(.9); opacity:1; }
      100% { transform:scale(1.5); opacity:0; }
    }

    #wlc-nudge {
      position:fixed; bottom:96px; right:24px; z-index:9997;
      background:#fff; border-radius:16px 16px 4px 16px;
      box-shadow:0 6px 28px rgba(0,0,0,.16);
      padding:14px 42px 14px 16px; max-width:228px;
      font-family:'Inter',system-ui,sans-serif;
      cursor:pointer; border:1.5px solid rgba(0,102,204,.12);
      display:none;
      animation:wlc-nudge-in .32s cubic-bezier(.34,1.56,.64,1);
    }
    @keyframes wlc-nudge-in {
      from { opacity:0; transform:translateY(14px) scale(.9); }
      to   { opacity:1; transform:translateY(0) scale(1); }
    }
    #wlc-nudge p  { font-size:13.5px; font-weight:700; color:#1a1a2e; margin:0 0 3px; line-height:1.35; }
    #wlc-nudge span { font-size:11.5px; color:#868e96; display:block; line-height:1.45; }
    #wlc-nudge-close {
      position:absolute; top:8px; right:10px;
      background:none; border:none; cursor:pointer;
      color:#adb5bd; font-size:17px; line-height:1; padding:2px 4px;
      border-radius:4px; transition:color .15s,background .15s;
    }
    #wlc-nudge-close:hover { color:#495057; background:#f0f2f5; }

    #wlc-panel {
      position:fixed; bottom:96px; right:24px; z-index:9999;
      width:360px; max-height:580px;
      background:#fff; border-radius:18px;
      box-shadow:0 12px 48px rgba(0,0,0,.2);
      display:none; flex-direction:column; overflow:hidden;
      font-family:'Inter',system-ui,sans-serif;
      animation:wlc-slide-up .22s cubic-bezier(.34,1.3,.64,1);
    }
    #wlc-panel.open { display:flex; }
    @keyframes wlc-slide-up {
      from { opacity:0; transform:translateY(16px) scale(.97); }
      to   { opacity:1; transform:translateY(0) scale(1); }
    }

    .wlc-header {
      background:linear-gradient(135deg,#0066cc 0%,#0055b3 100%);
      padding:16px 18px; display:flex; align-items:center; gap:12px; flex-shrink:0;
    }
    .wlc-header-avatar {
      width:40px; height:40px; border-radius:50%;
      background:rgba(255,255,255,.2); display:flex;
      align-items:center; justify-content:center; flex-shrink:0;
    }
    .wlc-header-avatar svg { width:22px; height:22px; fill:#fff; }
    .wlc-header-text h4 { font-size:14px; font-weight:700; color:#fff; margin:0; }
    .wlc-header-text p  { font-size:11.5px; color:rgba(255,255,255,.78); margin:2px 0 0; }
    .wlc-header-status  {
      width:8px; height:8px; border-radius:50%;
      background:#34d058; margin-left:auto; flex-shrink:0;
      box-shadow:0 0 0 2px rgba(52,208,88,.25);
    }

    #wlc-prechat {
      flex:1; overflow-y:auto; padding:20px 18px 16px;
      background:#f8f9fa; display:flex; flex-direction:column;
    }
    .wlc-prechat-intro { font-size:13px; color:#495057; line-height:1.55; margin-bottom:16px; }
    .wlc-prechat-intro strong { color:#1a1a2e; }
    .wlc-field { display:flex; flex-direction:column; gap:4px; margin-bottom:11px; }
    .wlc-field label { font-size:11px; font-weight:600; color:#495057; text-transform:uppercase; letter-spacing:.5px; }
    .wlc-field input {
      border:1.5px solid #dee2e6; border-radius:8px;
      padding:9px 12px; font-size:13px; color:#1a1a2e;
      font-family:inherit; outline:none; background:#fff; transition:border-color .15s;
    }
    .wlc-field input:focus { border-color:#0066cc; }
    .wlc-field input::placeholder { color:#adb5bd; }
    .wlc-required { color:#dc3545; margin-left:2px; }
    .wlc-prechat-submit {
      width:100%; padding:12px; margin-top:6px;
      background:linear-gradient(135deg,#0066cc 0%,#0055b3 100%);
      color:#fff; border:none; border-radius:8px;
      font-size:14px; font-weight:600; cursor:pointer;
      font-family:inherit; transition:opacity .15s;
      display:flex; align-items:center; justify-content:center; gap:8px;
    }
    .wlc-prechat-submit:hover { opacity:.9; }
    .wlc-prechat-submit:disabled { background:#ced4da; cursor:default; }
    .wlc-prechat-submit svg { width:16px; height:16px; fill:#fff; }
    .wlc-skip-link { text-align:center; margin-top:10px; font-size:11px; color:#adb5bd; }
    .wlc-skip-link a { color:#adb5bd; text-decoration:underline; cursor:pointer; }
    .wlc-skip-link a:hover { color:#868e96; }
    .wlc-field-error { font-size:11px; color:#dc3545; margin-top:2px; display:none; }

    .wlc-messages {
      flex:1; overflow-y:auto; padding:16px;
      display:flex; flex-direction:column; gap:12px; background:#f8f9fa;
    }
    .wlc-msg { max-width:86%; padding:10px 14px; border-radius:14px; font-size:13px; line-height:1.55; }
    .wlc-msg.bot {
      background:#fff; color:#1a1a2e;
      border:1px solid #e9ecef; align-self:flex-start; border-bottom-left-radius:4px;
    }
    .wlc-msg.user {
      background:#0066cc; color:#fff;
      align-self:flex-end; border-bottom-right-radius:4px;
    }
    .wlc-typing {
      display:flex; gap:5px; align-items:center;
      padding:12px 16px; background:#fff;
      border:1px solid #e9ecef; border-radius:14px;
      border-bottom-left-radius:4px; align-self:flex-start; width:58px;
    }
    .wlc-dot { width:6px; height:6px; border-radius:50%; background:#adb5bd; animation:wlc-bounce .9s infinite; }
    .wlc-dot:nth-child(2) { animation-delay:.15s; }
    .wlc-dot:nth-child(3) { animation-delay:.30s; }
    @keyframes wlc-bounce { 0%,60%,100%{transform:translateY(0);} 30%{transform:translateY(-5px);} }

    .wlc-footer {
      padding:12px 14px; background:#fff; border-top:1px solid #e9ecef;
      display:flex; gap:8px; align-items:center; flex-shrink:0;
    }
    .wlc-input {
      flex:1; border:1.5px solid #dee2e6; border-radius:8px;
      padding:9px 12px; font-size:13px; color:#1a1a2e;
      outline:none; font-family:inherit; resize:none; transition:border-color .15s;
    }
    .wlc-input:focus { border-color:#0066cc; }
    .wlc-input::placeholder { color:#adb5bd; }
    .wlc-send {
      width:36px; height:36px; border-radius:8px; background:#0066cc;
      border:none; cursor:pointer; display:flex; align-items:center;
      justify-content:center; transition:background .15s; flex-shrink:0;
    }
    .wlc-send:hover { background:#0055b3; }
    .wlc-send svg { width:16px; height:16px; fill:#fff; }
    .wlc-send:disabled { background:#ced4da; cursor:default; }
    .wlc-branding { text-align:center; padding:6px; font-size:10px; color:#adb5bd; background:#fff; flex-shrink:0; }

    @media(max-width:400px){
      #wlc-panel  { width:calc(100vw - 24px); right:12px; bottom:84px; }
      #wlc-bubble { bottom:16px; right:16px; }
      #wlc-nudge  { right:12px; }
    }
  `;

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── Nudge bubble ──────────────────────────────────────────────────────
  var nudge = document.createElement('div');
  nudge.id = 'wlc-nudge';
  nudge.innerHTML = '<button id="wlc-nudge-close" aria-label="Dismiss">&times;</button><p>Ask our Wavlon AI ✦</p><span>Instant answers on specs, cutting&nbsp;thickness, pricing &amp; lead&nbsp;times.</span>';

  // ── Bubble ────────────────────────────────────────────────────────────
  var bubble = document.createElement('button');
  bubble.id = 'wlc-bubble';
  bubble.setAttribute('aria-label','Open Wavlon AI Assistant');
  bubble.innerHTML = '<svg class="wlc-chat-icon" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg><svg class="wlc-close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';

  // ── Panel ─────────────────────────────────────────────────────────────
  var panel = document.createElement('div');
  panel.id = 'wlc-panel';
  panel.innerHTML = `
    <div class="wlc-header">
      <div class="wlc-header-avatar"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div>
      <div class="wlc-header-text"><h4>Wavlon AI Assistant</h4><p>Ask about machines, specs &amp; pricing</p></div>
      <div class="wlc-header-status" title="Online"></div>
    </div>
    <div id="wlc-prechat">
      <p class="wlc-prechat-intro"><strong>Before we chat —</strong> let us know who you are so our team can follow up if needed.</p>
      <div class="wlc-field"><label>Your Name <span class="wlc-required">*</span></label><input id="wlc-f-name" type="text" placeholder="e.g. John Smith" autocomplete="name" maxlength="80"/><span class="wlc-field-error" id="wlc-err-name">Please enter your name.</span></div>
      <div class="wlc-field"><label>Company Name</label><input id="wlc-f-company" type="text" placeholder="e.g. Acme Fabrication" autocomplete="organization" maxlength="100"/></div>
      <div class="wlc-field"><label>Email Address <span class="wlc-required">*</span></label><input id="wlc-f-email" type="email" placeholder="you@company.com" autocomplete="email" maxlength="120"/><span class="wlc-field-error" id="wlc-err-email">Please enter a valid email.</span></div>
      <div class="wlc-field"><label>Phone Number</label><input id="wlc-f-phone" type="tel" placeholder="(555) 000-0000" autocomplete="tel" maxlength="30"/></div>
      <button class="wlc-prechat-submit" id="wlc-prechat-submit">Start Chatting <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>
      <p class="wlc-skip-link"><a id="wlc-skip">Skip and chat anonymously</a></p>
    </div>
    <div class="wlc-messages" id="wlc-messages" style="display:none;"></div>
    <div class="wlc-footer" id="wlc-chat-footer" style="display:none;">
      <input class="wlc-input" id="wlc-input" type="text" placeholder="Ask about specs, thickness, pricing…" maxlength="300" autocomplete="off"/>
      <button class="wlc-send" id="wlc-send" aria-label="Send"><svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button>
    </div>
    <div class="wlc-branding">Powered by Wavlon Lasers AI</div>
  `;

  document.body.appendChild(nudge);
  document.body.appendChild(bubble);
  document.body.appendChild(panel);

  // ── Refs ──────────────────────────────────────────────────────────────
  var messagesEl = document.getElementById('wlc-messages');
  var chatFooter = document.getElementById('wlc-chat-footer');
  var inputEl    = document.getElementById('wlc-input');
  var sendBtn    = document.getElementById('wlc-send');
  var prechatEl  = document.getElementById('wlc-prechat');
  var submitBtn  = document.getElementById('wlc-prechat-submit');
  var skipLink   = document.getElementById('wlc-skip');
  var nudgeClose = document.getElementById('wlc-nudge-close');
  var isOpen     = false;
  var isLoading  = false;

  var sessionId = 'wl-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,7);

  var userInfo = null;
  try { var s = localStorage.getItem('wlc_user'); if (s) userInfo = JSON.parse(s); } catch(e) {}

  // ── Nudge / auto-open ─────────────────────────────────────────────────
  function showNudge() { if (!isOpen) { nudge.style.display = 'block'; bubble.classList.add('pulse'); } }
  function hideNudge() { nudge.style.display = 'none'; bubble.classList.remove('pulse'); }

  try {
    if (!sessionStorage.getItem('wlc_nudged')) {
      sessionStorage.setItem('wlc_nudged','1');
      setTimeout(showNudge, 5000);
      setTimeout(function(){ hideNudge(); if (!isOpen) togglePanel(); }, 18000);
    }
  } catch(e) {}

  nudge.addEventListener('click', function(){ hideNudge(); if (!isOpen) togglePanel(); });
  nudgeClose.addEventListener('click', function(e){ e.stopPropagation(); hideNudge(); });

  // ── Panel toggle ──────────────────────────────────────────────────────
  function togglePanel() {
    hideNudge();
    isOpen = !isOpen;
    bubble.classList.toggle('open', isOpen);
    panel.classList.toggle('open', isOpen);
    if (isOpen) {
      if (userInfo) { showChat(); inputEl.focus(); }
      else document.getElementById('wlc-f-name').focus();
    }
  }

  function showChat() {
    prechatEl.style.display = 'none';
    messagesEl.style.display = 'flex';
    chatFooter.style.display = 'flex';
    if (!messagesEl.hasChildNodes()) {
      var first = (userInfo && userInfo.name) ? userInfo.name.split(' ')[0] : null;
      var g = first
        ? 'Hi ' + first + '! I\'m the Wavlon AI.\n\nAsk me anything about our fiber laser machines — specs, cutting thickness, power options, lead times, or financing.'
        : 'Hi! I\'m the Wavlon AI Assistant.\n\nAsk me anything about our fiber laser machines — specs, cutting thickness, power options, lead times, or financing.';
      appendMsg(g, 'bot');
    }
  }

  // ── Pre-chat form ─────────────────────────────────────────────────────
  function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function clearErrors() {
    document.getElementById('wlc-err-name').style.display = 'none';
    document.getElementById('wlc-err-email').style.display = 'none';
    document.getElementById('wlc-f-name').style.borderColor = '';
    document.getElementById('wlc-f-email').style.borderColor = '';
  }
  async function submitPrechat() {
    clearErrors();
    var name    = document.getElementById('wlc-f-name').value.trim();
    var company = document.getElementById('wlc-f-company').value.trim();
    var email   = document.getElementById('wlc-f-email').value.trim();
    var phone   = document.getElementById('wlc-f-phone').value.trim();
    var ok = true;
    if (!name) { document.getElementById('wlc-err-name').style.display='block'; document.getElementById('wlc-f-name').style.borderColor='#dc3545'; ok=false; }
    if (!email || !validateEmail(email)) { document.getElementById('wlc-err-email').style.display='block'; document.getElementById('wlc-f-email').style.borderColor='#dc3545'; ok=false; }
    if (!ok) return;
    submitBtn.disabled=true; submitBtn.textContent='Starting…';
    userInfo = { name, company, email, phone };
    try { localStorage.setItem('wlc_user', JSON.stringify(userInfo)); } catch(e) {}
    fetch('/api/submit-form', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ name, company, email, phone, source:'chat-widget', status:'new', session_id:sessionId }) }).catch(function(){});
    showChat(); inputEl.focus();
  }
  submitBtn.addEventListener('click', submitPrechat);
  skipLink.addEventListener('click', function(e) {
    e.preventDefault();
    userInfo = {};
    try { localStorage.setItem('wlc_user', JSON.stringify(userInfo)); } catch(e) {}
    showChat(); inputEl.focus();
  });
  ['wlc-f-name','wlc-f-company','wlc-f-email','wlc-f-phone'].forEach(function(id,i,arr) {
    document.getElementById(id).addEventListener('keydown', function(e) {
      if (e.key !== 'Enter') return; e.preventDefault();
      if (i < arr.length-1) document.getElementById(arr[i+1]).focus(); else submitPrechat();
    });
  });

  // ── Chat ──────────────────────────────────────────────────────────────
  function fmt(text) {
    var h = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    h = h.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
    h = h.replace(/^- (.+)$/gm,'<span style="display:block;padding-left:12px;position:relative;"><span style="position:absolute;left:0">•</span>$1</span>');
    return h.replace(/\n/g,'<br>');
  }
  function appendMsg(text, role) {
    var m = document.createElement('div'); m.className='wlc-msg '+role;
    if (role==='bot') m.innerHTML=fmt(text); else m.textContent=text;
    messagesEl.appendChild(m); messagesEl.scrollTop=messagesEl.scrollHeight;
  }
  function showTyping() {
    var el=document.createElement('div'); el.className='wlc-typing'; el.id='wlc-typing';
    el.innerHTML='<div class="wlc-dot"></div><div class="wlc-dot"></div><div class="wlc-dot"></div>';
    messagesEl.appendChild(el); messagesEl.scrollTop=messagesEl.scrollHeight;
  }
  function hideTyping() { var el=document.getElementById('wlc-typing'); if(el) el.remove(); }
  async function sendMessage() {
    var q = inputEl.value.trim(); if(!q || isLoading) return;
    isLoading=true; sendBtn.disabled=true; inputEl.value='';
    appendMsg(q,'user'); showTyping();
    try {
      var res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q,sessionId,pageUrl:window.location.href,userInfo:userInfo||{}})});
      var d=await res.json(); hideTyping();
      appendMsg(d.answer||"I don't have that info right now. Contact us at sales@wavlonlasers.com or (888) 277-6144.",'bot');
    } catch(e) { hideTyping(); appendMsg("Connection error. Please try again or email sales@wavlonlasers.com.",'bot'); }
    isLoading=false; sendBtn.disabled=false; inputEl.focus();
  }

  bubble.addEventListener('click', togglePanel);
  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', function(e){ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage();} });
  document.addEventListener('click', function(e){
    if(isOpen && !panel.contains(e.target) && !bubble.contains(e.target) && !nudge.contains(e.target)) togglePanel();
  });

})();
