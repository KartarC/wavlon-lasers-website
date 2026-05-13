/* ============================================
   WAVLON LASERS — main scroll choreography
   ============================================ */

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   HERO entrance
   ============================================ */
function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.hero-logo img', { y: 24, opacity: 0, duration: 0.9 })
    .from('.hero-meta div', { y: 20, opacity: 0, duration: 0.7, stagger: 0.06 }, '-=0.6')
    .from('.hero-headline .small', { y: 30, opacity: 0, duration: 0.7 }, '-=0.4')
    .from('.hero-headline h1', { y: 60, opacity: 0, duration: 1.1, ease: 'power4.out' }, '-=0.4')
    .from('.hero-sub > *', { y: 30, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=0.6');
}

/* ============================================
   MACHINE REEL — 5 frame cross-fade tied to scroll
   ============================================ */
const REEL_VIEWS = [
  { num: 'FIG·01', title: 'Front Elevation',     sub: 'Closed cabin · operator door · cooler' },
  { num: 'FIG·02', title: 'Right Three-Quarter', sub: 'HMI side · electrical cabinet' },
  { num: 'FIG·03', title: 'Rear Elevation',      sub: 'Exchange table extended · safety fence' },
  { num: 'FIG·04', title: 'Left Three-Quarter',  sub: 'Service side · feed-out · branding' },
  { num: 'FIG·05', title: 'On the Shop Floor',   sub: 'Scale reference · installed environment' },
];

function setupReel() {
  const track = document.getElementById('reelTrack');
  if (!track) return;
  const frames = [...track.querySelectorAll('.reel-frame')];
  const steps = [...track.querySelectorAll('.reel-progress .step')];
  const idxEl = document.getElementById('reelIdx');
  const titleEl = document.getElementById('reelTitle');
  const subEl = document.getElementById('reelSub');
  const numEl = document.getElementById('reelNum');

  let current = -1;
  function showFrame(i) {
    if (i === current) return;
    current = i;
    frames.forEach((f, idx) => f.classList.toggle('is-active', idx === i));
    steps.forEach((s, idx) => {
      s.classList.toggle('is-active', idx === i);
      s.classList.toggle('is-done', idx < i);
    });
    idxEl.textContent = String(i + 1).padStart(2, '0');
    titleEl.textContent = REEL_VIEWS[i].title;
    subEl.textContent = REEL_VIEWS[i].sub;
    numEl.textContent = REEL_VIEWS[i].num;
  }

  // Pin the inner via ScrollTrigger
  ScrollTrigger.create({
    trigger: track,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const p = self.progress;
      // Map [0,1] -> 5 frames with a hold at start/end
      const n = REEL_VIEWS.length;
      const idx = Math.min(n - 1, Math.floor(p * n));
      showFrame(idx);
    },
  });

  // Subtle parallax / scale on the active image
  frames.forEach((f) => {
    const img = f.querySelector('img');
    gsap.fromTo(img, { scale: 1.06 }, {
      scale: 1.0,
      ease: 'none',
      scrollTrigger: {
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
      },
    });
  });
}

/* ============================================
   EXCHANGE TABLE — continuous swap animation
   ============================================ */
function setupExchange() {
  const stage = document.getElementById('exchangeStage');
  if (!stage) return;
  const top = stage.querySelector('.pallet-top');
  const bot = stage.querySelector('.pallet-bottom');
  const cycleNumEl = document.getElementById('cycleNum');
  const cycleStateEl = document.getElementById('cycleState');

  let cycle = 1;

  // 6.4-second loop
  function buildLoop() {
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'power2.inOut' },
      onRepeat: () => {
        cycle += 1;
        cycleNumEl.textContent = String(cycle).padStart(3, '0');
      },
    });
    tl
      // STATE: Loading
      .call(() => { cycleStateEl.textContent = 'Loading'; }, [], 0)
      .to({}, { duration: 0.6 }, 0)
      // SWAP: top pallet slides down, bottom pallet slides up
      .call(() => { cycleStateEl.textContent = 'Swapping'; }, [], 0.6)
      .to(top, { yPercent: 50,  duration: 1.6 }, 0.6)
      .to(bot, { yPercent: -50, duration: 1.6 }, 0.6)
      // STATE: Cutting (swapped position)
      .call(() => { cycleStateEl.textContent = 'Cutting'; }, [], 2.2)
      .to({}, { duration: 1.6 }, 2.2)
      // SWAP BACK
      .call(() => { cycleStateEl.textContent = 'Swapping'; }, [], 3.8)
      .to(top, { yPercent: 0, duration: 1.6 }, 3.8)
      .to(bot, { yPercent: 0, duration: 1.6 }, 3.8)
      // STATE: Loaded
      .to({}, { duration: 0.6 }, 5.4);
    return tl;
  }

  let loop = null;
  // Pause when out of view to save CPU
  ScrollTrigger.create({
    trigger: stage,
    start: 'top 90%',
    end: 'bottom 10%',
    onEnter: () => { if (!loop) loop = buildLoop(); loop.play(); },
    onEnterBack: () => { loop && loop.play(); },
    onLeave: () => { loop && loop.pause(); },
    onLeaveBack: () => { loop && loop.pause(); },
  });
}

/* ============================================
   BOCHU — pinned 4-frame sequence
   ============================================ */
function setupBochu() {
  const track = document.getElementById('bochuTrack');
  if (!track) return;
  const frames = [...track.querySelectorAll('.bochu-frame')];
  const texts = [...track.querySelectorAll('.bochu-text-frame')];
  const pips = [...track.querySelectorAll('.bochu-stage-progress .pip')];
  const stepLabelEl = document.getElementById('bochuStepLabel');

  let current = -1;
  function showStep(i) {
    if (i === current) return;
    current = i;
    frames.forEach((f, idx) => f.classList.toggle('is-active', idx === i));
    texts.forEach((t, idx) => t.classList.toggle('is-active', idx === i));
    pips.forEach((p, idx) => {
      p.classList.toggle('is-active', idx === i);
      p.classList.toggle('is-done', idx < i);
    });
    stepLabelEl.textContent = `${String(i + 1).padStart(2, '0')} / 04`;
  }

  ScrollTrigger.create({
    trigger: track,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const p = self.progress;
      const n = frames.length;
      const idx = Math.min(n - 1, Math.floor(p * n));
      showStep(idx);
    },
  });

  // Subtle scale on the active image
  frames.forEach((f) => {
    const img = f.querySelector('img');
    if (!img) return;
    gsap.fromTo(img, { scale: 1.04 }, {
      scale: 1.0,
      ease: 'none',
      scrollTrigger: {
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
      },
    });
  });
}

/* ============================================
   CYPCUT — fade in on scroll
   ============================================ */
function setupCypcut() {
  gsap.from('.cypcut-text > *', {
    y: 40,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.cypcut', start: 'top 70%' },
  });
  gsap.from('.cypcut-stage', {
    y: 60,
    opacity: 0,
    duration: 1.0,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.cypcut', start: 'top 70%' },
  });
}

/* ============================================
   EXCHANGE / BOCHU / CYPCUT entrance fades for heads
   ============================================ */
function setupSectionHeads() {
  document.querySelectorAll('.exchange-head > *, .bochu-head-block > *').forEach((el) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%' },
    });
  });
  gsap.from('.exchange-spec', {
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.08,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.exchange-specs', start: 'top 85%' },
  });
}

/* ============================================
   INIT (after loader done)
   ============================================ */
function init() {
  heroIntro();
  setupReel();
  setupExchange();
  setupBochu();
  setupCypcut();
  setupSectionHeads();

  // Re-measure once fonts and images settle
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

document.addEventListener('wv:loader-done', init, { once: true });

// Fallback — if loader event somehow doesn't fire within 6s, init anyway
setTimeout(() => {
  if (!document.body.dataset.wvInited) {
    document.body.dataset.wvInited = '1';
    init();
  }
}, 6000);
document.addEventListener('wv:loader-done', () => { document.body.dataset.wvInited = '1'; }, { once: true });
