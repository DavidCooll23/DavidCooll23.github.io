/* novy.js - stage 2 of the new home (preview /novy/). Loaded after load, behind wow.js.
   1. one playback master for every clip on the page (only one plays; full video dialog is under it too)
   2. first-screen demo plays itself once: the plate "18:30 · Manikúra" flies into the owner's calendar
   3. the plate travels through the page between [data-plate-slot] places
      (GSAP Flip.fit, after GreenSock's "Consecutive Scrub Flips" demo; phones: it drops into place)
   4. phone parity: fill from the finger, lean from finger speed, heading line masks, card stack depth */
(() => {
  const html = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const BASE = new URL('../media/loop/', (document.currentScript && document.currentScript.src) || location.href).href;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const small = matchMedia('(max-width: 899px)');
  const g = window.gsap, ST = window.ScrollTrigger, Flip = window.Flip;
  const motion = !reduce && !!g && !!ST;
  if (motion) g.registerPlugin(ST, ...(Flip ? [Flip] : []), ...(window.SplitText ? [window.SplitText] : []));
  const dict = () => { try { return T[html.lang] || T.sk; } catch (e) { return {}; } };

  /* ---------- 1. playback master ---------- */
  const auto = !reduce && !saveData;      // otherwise posters only: no video element, no video request
  const live = new Set();
  let current = null, fullOpen = false, queued = false;
  function ensure(box) {
    if (box._v) return box._v;
    const v = box._v = document.createElement('video');
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'none';
    v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true'); v.tabIndex = -1;
    v.addEventListener('playing', () => box.classList.add('is-on'));
    v.addEventListener('error', () => { box.dataset.dead = 1; box.classList.remove('is-on', 'needtap'); v.remove(); if (current === box) current = null; });
    box.append(v);
    return v;
  }
  function play(box) {
    const v = ensure(box);
    if (!v.getAttribute('src')) v.src = BASE + box.dataset.loop + (small.matches ? '-m' : '') + '.mp4';
    const p = v.play();
    if (p) p.catch(e => { if (e && e.name === 'NotAllowedError') box.classList.add('needtap'); });
  }
  function score(box) {
    const r = box.getBoundingClientRect(), W = innerWidth, H = innerHeight;
    const w = Math.min(r.right, W) - Math.max(r.left, 0), h = Math.min(r.bottom, H) - Math.max(r.top, 0);
    if (w <= 0 || h <= 0 || !r.width || !r.height) return 0;
    const share = w * h / (r.width * r.height);
    if (share < .55) return 0;
    const cx = Math.max(r.left, 0) + w / 2, cy = Math.max(r.top, 0) + h / 2;
    const top = document.elementFromPoint(cx, cy);          // a card lying on top (sticky stack) takes the clip out
    if (!top || !box.contains(top)) return 0;
    return share - Math.abs(cy - H / 2) / H * .5 - Math.abs(cx - W / 2) / W * .5;
  }
  function pick() {
    queued = false;
    if (!auto) return;
    let best = null, bs = 0;
    if (!document.hidden && !fullOpen) live.forEach(b => {
      if (b.dataset.dead || b.classList.contains('needtap')) return;
      const s = score(b) + (b === current ? .15 : 0);
      if (s > bs) { bs = s; best = b; }
    });
    if (best !== current) { if (current && current._v) current._v.pause(); current = best; }
    if (current && (!current._v || current._v.paused)) play(current);
  }
  const ask = () => { if (!queued) { queued = true; requestAnimationFrame(pick); } };
  const boxes = $$('.nv-vid[data-loop]');
  if (auto && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? live.add(e.target) : live.delete(e.target)); ask(); }, { threshold: [0, .55] });
    boxes.forEach(b => io.observe(b));
    addEventListener('scroll', ask, { passive: true });
    addEventListener('resize', ask, { passive: true });
    document.addEventListener('visibilitychange', pick);
    setInterval(() => { if (live.size > 1 && !document.hidden) ask(); }, 700);   // the pinned strip and the stack move without a scroll event at times
  }
  boxes.forEach(b => b.addEventListener('click', e => {
    if (b.dataset.full) { openFull(b); return; }
    if (!b.classList.contains('needtap')) return;
    e.preventDefault(); e.stopPropagation(); b.classList.remove('needtap');
    if (current && current !== b && current._v) current._v.pause();
    current = b; play(b);
  }));
  let dlg = null;
  function openFull(btn) {
    if (!dlg) {
      dlg = document.createElement('dialog'); dlg.className = 'nv-full'; dlg.setAttribute('data-lenis-prevent', '');
      dlg.innerHTML = '<form method="dialog"><button class="nv-burger nvf-x"></button></form><video controls playsinline preload="none"></video>';
      document.body.append(dlg);
      dlg.addEventListener('close', () => { const v = $('video', dlg); v.pause(); v.removeAttribute('src'); v.load(); fullOpen = false; pick(); });
      dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
    }
    const v = $('video', dlg), img = $('img', btn), h = btn.closest('.card') && $('h3', btn.closest('.card'));
    $('button', dlg).textContent = dict().nvClose || 'Zavrieť';
    dlg.setAttribute('aria-label', h ? h.textContent : '');
    if (img) v.poster = img.currentSrc || img.src;
    v.src = btn.dataset.full;
    fullOpen = true; if (current && current._v) current._v.pause(); current = null;
    dlg.showModal();                       // Escape closes, focus returns to the card (native dialog)
    const p = v.play(); if (p) p.catch(() => {});
  }

  /* ---------- 2 + 3. the plate ---------- */
  const plate = $('#nv-plate'), demo = $('#live-demo');
  const slots = $$('[data-plate-slot]');
  let fly = null, at = 0;
  function flyer() {
    if (!fly) { fly = document.createElement('b'); fly.className = 'nv-plate nv-fly'; fly.setAttribute('aria-hidden', 'true'); document.body.append(fly); }
    fly.textContent = plate.textContent.replace(/(\d\d:\d\d)\s*/, '$1 · ');
    return fly;
  }
  function land() { if (fly) { g.killTweensOf(fly); fly.classList.remove('on'); } plate.style.visibility = ''; }
  // the flyer lives in <body> (no island clips it): it starts on `from`, the real plate moves to `slot` unseen, the flyer lands on it
  function travel(from, slot, dur) {
    const f = flyer(), flying = f.classList.contains('on');
    g.killTweensOf(f);
    if (!flying) { g.set(f, { clearProps: 'all' }); Flip.fit(f, from); }
    f.classList.add('on');
    if (slot && plate.parentElement !== slot) slot.append(plate);
    plate.style.visibility = 'hidden';
    Flip.fit(f, plate, { duration: dur, ease: 'power3.inOut', onComplete: land });
  }
  if (plate && demo) {
    const times = $$('.ld-times button', demo), book = $('.ld-book', demo), heroSlot = slots[0];
    times.forEach(b => b.addEventListener('click', () => { if (motion) land(); }));
    book.addEventListener('click', () => {      // runs after the page's own handler: the booking already stands in the calendar
      const b = times.find(x => x.getAttribute('aria-pressed') === 'true'); if (!b) return;
      $('time', plate).textContent = b.textContent;
      if (motion && Flip && plate.parentElement === heroSlot) travel(b, null, small.matches ? .6 : .9);
    });
    if (motion) {
      // once, by itself: after the opener on a computer, right away (about 1 s after load) on a phone
      const opener = !html.classList.contains('wow-noload') && matchMedia('(min-width:900px) and (pointer:fine)').matches;
      setTimeout(() => { if (!book.disabled && $('.ld-new.pend', demo)) book.click(); }, opener ? Math.max(0, 2100 - performance.now()) : 0);
      const moveTo = i => {
        if (i === at) return; at = i;
        const slot = slots[i];
        if (small.matches || !Flip) {
          land(); slot.append(plate);
          g.fromTo(plate, { y: -64, rotate: -8, opacity: 0 }, { y: 0, rotate: 0, opacity: 1, duration: .8, ease: 'bounce.out', clearProps: 'transform,opacity', overwrite: true });
        } else travel(plate, slot, .9);
      };
      slots.forEach((s, i) => { if (i) ST.create({ trigger: s, start: i === slots.length - 1 ? 'top 96%' : 'top 72%', onEnter: () => moveTo(i), onLeaveBack: () => moveTo(i - 1) }); });
    }
  }

  /* ---------- 4. phone parity ---------- */
  if (!reduce) addEventListener('pointerdown', e => {      // fill from the point of touch
    if (e.pointerType === 'mouse' || !e.target.closest) return;
    let b = e.target.closest('.btn,.header-contact,.ld-book,.ld-times button,.nv-burger,.nvm-ch a'), mid = false;
    if (!b) { const p = e.target.closest('.project'); b = p && $('.nv-go', p); mid = true; }
    if (!b) return;
    const r = b.getBoundingClientRect(), i = document.createElement('i');
    i.className = 'nv-rip'; i.setAttribute('aria-hidden', 'true');
    i.style.left = (mid ? r.width / 2 : e.clientX - r.left) + 'px'; i.style.top = (mid ? r.height / 2 : e.clientY - r.top) + 'px';
    b.append(i); i.addEventListener('animationend', () => i.remove());
  }, { passive: true });

  if (motion && small.matches) {
    // frames lean with the speed of the finger and settle back (wow.js does this from 900 px only)
    const lean = $$('.work .nv-dev, .nv-bot .slot');
    if (lean.length) {
      const p = { v: 0 }, lim = g.utils.clamp(-3, 3), set = lean.map(el => g.quickSetter(el, 'skewY', 'deg'));
      ST.create({ onUpdate: self => {
        const v = lim(self.getVelocity() / -500);
        if (Math.abs(v) > Math.abs(p.v)) { p.v = v; g.to(p, { v: 0, duration: .8, ease: 'power3', overwrite: true, onUpdate: () => set.forEach(f => f(p.v)) }); }
      } });
    }
    // the backdrop behind the phone frame drifts
    $$('.work .nv-back').forEach(b => g.fromTo(b, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: b.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
    // stack: the card under the next one steps back
    const cards = $$('.work .project');
    cards.forEach((c, i) => { const n = cards[i + 1]; if (n) g.to(c, { scale: .94, ease: 'none', transformOrigin: '50% 0', scrollTrigger: { trigger: n, start: 'top bottom', end: 'top 90px', scrub: true } }); });
    // headings below the first screen: lines rise out of a mask
    if (window.SplitText) $$('main h2').forEach(h => {
      if (h.closest('[data-moment]')) return;
      window.SplitText.create(h, { type: 'lines', mask: 'lines', linesClass: 'nv-l', autoSplit: true,
        onSplit: self => g.from(self.lines, { yPercent: 110, duration: .9, ease: 'expo.out', stagger: .09, scrollTrigger: { trigger: h, start: 'top 92%', once: true } }) });
    });
  }
  if (motion) {
    // bot cards rise one after another
    const bots = $$('.nv-bot');
    if (bots.length) g.fromTo(bots, { y: 46, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: .09, immediateRender: false, scrollTrigger: { trigger: '.nvb-grid', start: 'top 92%', once: true } });
    // price cards and the phone stage: the picture drifts slower than the page
    $$('.nb-card__vis > *').forEach(v => g.fromTo(v, { yPercent: -5, scale: 1.1 }, { yPercent: 5, scale: 1.1, ease: 'none', scrollTrigger: { trigger: v.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
    $$('.nb-stage').forEach(st => g.fromTo(st, { '--nbY': '0%' }, { '--nbY': '100%', ease: 'none', scrollTrigger: { trigger: st, start: 'top bottom', end: 'bottom top', scrub: true } }));
    ST.refresh();
  }
})();
