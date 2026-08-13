(function () {
  'use strict';

  var showcase = document.getElementById('heroShowcase');
  if (!showcase) return;

  var scenes = Array.prototype.slice.call(showcase.querySelectorAll('.hero-scene'));
  var dots = Array.prototype.slice.call(showcase.querySelectorAll('.hero-gallery-dot'));
  var prev = document.getElementById('heroPrev');
  var next = document.getElementById('heroNext');
  var kicker = document.getElementById('heroSceneKicker');
  var overline = document.getElementById('heroOverline');
  var titleOne = document.getElementById('heroTitleOne');
  var titleTwo = document.getElementById('heroTitleTwo');
  var total = document.getElementById('heroTotal');
  var copy = document.getElementById('heroSceneCopy');
  var tag = document.getElementById('heroSceneTag');
  var counter = document.getElementById('heroCurrent');
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = 0;
  var timer = null;
  var ROTATE_MS = 6800;

  function sceneLabel(scene) {
    var raw = scene.getAttribute('data-scene') || 'portfolio';
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }

  function animateCopy() {
    if (reducedMotion) return;
    [overline, titleOne, titleTwo].forEach(function (element, index) {
      if (!element || !element.animate) return;
      element.animate([
        { opacity: 0, transform: index === 1 ? 'translate3d(-90px,18px,0)' : 'translate3d(90px,18px,0)', filter: 'blur(8px)' },
        { opacity: 1, transform: 'translate3d(0,0,0)', filter: 'blur(0)' }
      ], { duration: index ? 760 : 520, delay: index * 80, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
    });
  }

  function restartProgress(activeDot) {
    dots.forEach(function (dot) {
      dot.classList.remove('is-active');
      dot.setAttribute('aria-selected', 'false');
    });
    if (!activeDot) return;
    void activeDot.offsetWidth;
    activeDot.classList.add('is-active');
    activeDot.setAttribute('aria-selected', 'true');
  }

  function goTo(index, userInitiated) {
    if (!scenes.length) return;
    index = (index + scenes.length) % scenes.length;
    var outgoing = scenes[current];
    var incoming = scenes[index];

    if (outgoing !== incoming) outgoing.classList.remove('is-active');
    incoming.classList.remove('is-active');
    void incoming.offsetWidth;
    incoming.classList.add('is-active');
    current = index;

    if (kicker) kicker.textContent = incoming.getAttribute('data-kicker') || '';
    if (overline) overline.textContent = incoming.getAttribute('data-overline') || '';
    if (titleOne) titleOne.textContent = incoming.getAttribute('data-title-one') || '';
    if (titleTwo) titleTwo.textContent = incoming.getAttribute('data-title-two') || '';
    if (copy) copy.textContent = incoming.getAttribute('data-copy') || '';
    if (tag) tag.textContent = sceneLabel(incoming);
    if (counter) counter.textContent = String(index + 1).padStart(2, '0');
    restartProgress(dots[index]);
    animateCopy();

    showcase.dispatchEvent(new CustomEvent('wavlon:hero-scene', {
      detail: { label: incoming.getAttribute('data-three-text') || sceneLabel(incoming) }
    }));

    if (userInitiated) restartTimer();
  }

  function restartTimer() {
    window.clearInterval(timer);
    if (!reducedMotion && !document.hidden) {
      timer = window.setInterval(function () { goTo(current + 1, false); }, ROTATE_MS);
    }
  }

  if (prev) prev.addEventListener('click', function () { goTo(current - 1, true); });
  if (next) next.addEventListener('click', function () { goTo(current + 1, true); });
  dots.forEach(function (dot, index) {
    dot.addEventListener('click', function () { goTo(index, true); });
  });

  var touchStartX = null;
  showcase.addEventListener('touchstart', function (event) {
    touchStartX = event.touches[0] ? event.touches[0].clientX : null;
  }, { passive: true });
  showcase.addEventListener('touchend', function (event) {
    if (touchStartX === null || !event.changedTouches[0]) return;
    var delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 48) goTo(current + (delta < 0 ? 1 : -1), true);
    touchStartX = null;
  }, { passive: true });

  showcase.addEventListener('mouseenter', function () { window.clearInterval(timer); });
  showcase.addEventListener('mouseleave', restartTimer);
  document.addEventListener('visibilitychange', restartTimer);
  if (total) total.textContent = String(scenes.length).padStart(2, '0');
  restartProgress(dots[0]);
  restartTimer();

  /* Three.js supplies the spatial typography, particles and laser-floor depth.
     The DOM image carousel remains a complete visual fallback if WebGL/CDN is unavailable. */
  var canvas = document.getElementById('heroThreeCanvas');
  if (!canvas || reducedMotion) return;

  import('https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js')
    .then(function (module) { initThree(module); })
    .catch(function () { showcase.classList.add('hero-three-unavailable'); });

  function initThree(THREE) {
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch (error) {
      showcase.classList.add('hero-three-unavailable');
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(42, 16 / 9, 0.1, 100);
    camera.position.set(0, 0.15, 8.4);

    var positions = new Float32Array(150 * 3);
    for (var i = 0; i < 150; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 13;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    var particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    var particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({
      color: 0x416b98,
      size: 0.02,
      transparent: true,
      opacity: 0.22,
      depthWrite: false
    }));
    scene.add(particles);

    var floor = new THREE.GridHelper(18, 34, 0x8795a3, 0xaab4be);
    floor.position.set(1.7, -2.55, -1.4);
    floor.rotation.x = Math.PI * 0.42;
    floor.material.transparent = true;
    floor.material.opacity = 0.08;
    scene.add(floor);

    var beams = new THREE.Group();
    for (var b = 0; b < 4; b += 1) {
      var beamGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-1.2 + b * 1.5, -3.5, -2.5),
        new THREE.Vector3(2.4 + b * 1.2, 3.5, -2.5)
      ]);
      var beam = new THREE.Line(beamGeometry, new THREE.LineBasicMaterial({
        color: b % 2 ? 0x416b98 : 0x8ca4bb,
        transparent: true,
        opacity: 0.035
      }));
      beams.add(beam);
    }
    scene.add(beams);

    var textCanvas = document.createElement('canvas');
    textCanvas.width = 1600;
    textCanvas.height = 260;
    var textContext = textCanvas.getContext('2d');
    var textTexture = new THREE.CanvasTexture(textCanvas);
    textTexture.colorSpace = THREE.SRGBColorSpace;
    textTexture.minFilter = THREE.LinearFilter;
    var textMaterial = new THREE.SpriteMaterial({ map: textTexture, transparent: true, opacity: 0.08, depthWrite: false });
    var textSprite = new THREE.Sprite(textMaterial);
    textSprite.scale.set(8.2, 1.33, 1);
    textSprite.position.set(2.05, 2.1, -1.8);
    scene.add(textSprite);

    function paintText(label) {
      textContext.clearRect(0, 0, textCanvas.width, textCanvas.height);
      textContext.font = '800 142px Archivo, Arial, sans-serif';
      textContext.textAlign = 'center';
      textContext.textBaseline = 'middle';
      textContext.letterSpacing = '9px';
      textContext.strokeStyle = 'rgba(31,76,124,.42)';
      textContext.lineWidth = 2;
      textContext.strokeText(label.toUpperCase(), 800, 132);
      textContext.fillStyle = 'rgba(31,76,124,.025)';
      textContext.fillText(label.toUpperCase(), 800, 132);
      textTexture.needsUpdate = true;
      textSprite.position.x = 4.6;
      textMaterial.opacity = 0;
    }

    paintText(scenes[0].getAttribute('data-three-text') || 'BUILT FOR PRODUCTION');
    showcase.addEventListener('wavlon:hero-scene', function (event) {
      paintText(event.detail && event.detail.label ? event.detail.label : 'WAVLON LASERS');
    });

    var pointerX = 0;
    var pointerY = 0;
    showcase.addEventListener('pointermove', function (event) {
      var rect = showcase.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.42;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.22;
    }, { passive: true });
    showcase.addEventListener('pointerleave', function () { pointerX = 0; pointerY = 0; });

    function resize() {
      var width = Math.max(1, showcase.clientWidth);
      var height = Math.max(1, showcase.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    resize();
    var resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(showcase);

    var clock = new THREE.Clock();
    var visible = true;
    var observer = new IntersectionObserver(function (entries) {
      visible = entries[0] ? entries[0].isIntersecting : true;
    }, { threshold: 0.02 });
    observer.observe(showcase);

    function render() {
      requestAnimationFrame(render);
      if (!visible || document.hidden) return;
      var t = clock.getElapsedTime();
      particles.rotation.z = t * 0.008;
      particles.position.x += (pointerX - particles.position.x) * 0.025;
      particles.position.y += (-pointerY - particles.position.y) * 0.025;
      beams.position.x = Math.sin(t * 0.22) * 0.18;
      floor.position.x += ((1.7 + pointerX * 1.2) - floor.position.x) * 0.018;
      textSprite.position.x += (2.05 - textSprite.position.x) * 0.075;
      textSprite.position.y = 2.1 + Math.sin(t * 0.55) * 0.06;
      textMaterial.opacity += (0.08 - textMaterial.opacity) * 0.065;
      renderer.render(scene, camera);
    }
    render();
  }
})();
