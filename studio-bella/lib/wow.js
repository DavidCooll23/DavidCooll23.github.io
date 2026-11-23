/* wow.js - motion kit for static sites (_claude/web/BOOK.md). Built on the official GSAP skills
   (greensock/gsap-skills: Lenis + ScrollTrigger sync, SplitText onSplit/autoSplit) - all free, MIT/GSAP no-charge licence.
   Load AFTER content is in the DOM (defer), after gsap, ScrollTrigger, SplitText, lenis:
     <link rel="stylesheet" href="lib/wow.css">
     <script>document.documentElement.classList.add('wow-js');try{sessionStorage.wowL&&document.documentElement.classList.add('wow-noload')}catch(e){};window.__wowT=setTimeout(()=>document.documentElement.classList.add('wow-safe'),3000)</script>
     <script defer src="lib/gsap.min.js"></script> ... ScrollTrigger, SplitText, lenis ... <script defer src="lib/wow.js"></script>
   Marks (all optional, mix freely):
     data-intro           hero block: children with data-split / data-reveal / data-clip play as one timeline on load
     data-split           heading: lines rise out of a mask, word by word (on scroll, or inside data-intro)
     data-reveal          block: its children fade+rise in sequence when scrolled to ("self" = the element itself)
     data-clip            image frame: wipes open from the bottom, the photo settles from 1.25
     data-parallax="0.15" image frame: photo drifts by that share while the frame crosses the screen
     data-speed="0.9"     any element: moves slower (<1) or faster (>1) than the scroll
     data-marquee="40"    row that loops sideways (px/s), speeds up with scroll velocity, reverses with direction
     data-highlight       statement paragraph: words light up one by one, tied to the scroll
     data-count           number counts up from 0 when seen (keeps prefix/suffix text)
     data-magnetic        button/link pulls towards the pointer
     data-cursor="Look"   custom cursor grows and shows this label over the element (fine pointer only)
     data-float="a.jpg"   row: a photo follows the pointer while hovering the row
     data-hscroll         section is pinned and its [data-hscroll-track] child slides sideways (desktop)
     data-hide-header     header hides scrolling down, shows scrolling up
     data-progress        put on <body>: thin progress line on top
     data-loader          full-screen curtain (first child of body) with a [data-loader-n] counter 0-100;
                          lifts into the hero intro, once per session (CSS hides it on its own after 4 s)
     data-skew            element leans with scroll speed (skewX; ="y" for skewY), desktop only
     data-roll  (CSS)     button: its first <span> rolls up to a copy of itself on hover
     data-grain (CSS)     put on <body>: static film grain over the page
   Under prefers-reduced-motion, or when a lib fails to load: nothing hides, everything shows (html.wow-safe;
   the 3 s timer only fires if wow.js never starts - wow.js clears it).
   Inner scroll areas (chat, modal, dialog): Lenis leaves them alone if they are dialog/[role=dialog]/[aria-modal] or carry data-lenis-prevent.
   API: window.wow = { lenis, refresh(), resplit() }  - call wow.resplit() after replacing text (language switch). */
(() => {
  const html = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const phone = matchMedia('(max-width: 899px)').matches;
  if (reduce || !window.gsap || !window.ScrollTrigger) { html.classList.add('wow-safe'); return; }
  clearTimeout(window.__wowT);   // we are alive: keep the hidden start states, the failsafe is not needed
  gsap.registerPlugin(ScrollTrigger, ...(window.SplitText ? [SplitText] : []));
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const EASE = 'expo.out';

  // 1. smooth scroll (Lenis) driven by the GSAP ticker - the sync the GSAP skill prescribes
  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true,
      prevent: n => !!(n.closest && n.closest('[data-lenis-prevent],dialog,[role=dialog],[aria-modal=true]')) });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const id = a.getAttribute('href'); if (id.length < 2) return;
      const t = document.querySelector(id); if (!t) return;
      e.preventDefault(); lenis.scrollTo(t, { offset: -40, duration: 1.4 });
    }));
  }

  // 1b. loader curtain: counter 0-100, then the curtain lifts and the hero intro plays under it. Once per session.
  let introAt = 0.15;
  const loader = document.querySelector('[data-loader]');
  if (loader && !matchMedia('(min-width: 900px) and (pointer: fine)').matches) loader.style.display = 'none';   // phones: no curtain, first screen speed first
  else if (loader) {
    let seen = false; try { seen = !!sessionStorage.wowL; sessionStorage.wowL = 1; } catch (e) {}
    if (seen) loader.style.display = 'none';
    else {
      const num = loader.querySelector('[data-loader-n]'), o = { n: 0 };
      if (lenis) lenis.stop();
      const lt = gsap.timeline({ onComplete: () => { loader.style.display = 'none'; if (lenis) lenis.start(); } });
      lt.to(o, { n: 100, duration: 1.05, ease: 'power2.inOut', onUpdate: () => { if (num) num.textContent = Math.round(o.n); } })
        .to(loader.children, { yPercent: -60, opacity: 0, duration: 0.45, ease: 'power2.in', stagger: 0.05 }, '-=0.1')
        .to(loader, { yPercent: -100, duration: 0.95, ease: 'expo.inOut' }, '-=0.2');
      introAt = lt.duration() - 0.6;
    }
  }

  // 2. split headings
  const splits = [];
  const intro = document.querySelector('[data-intro]');
  function splitOne(el, tl) {
    if (!window.SplitText) { el.classList.add('is-split'); return; }
    const inIntro = intro && intro.contains(el);
    const s = SplitText.create(el, {
      type: 'lines,words', mask: 'lines', autoSplit: true, linesClass: 'wow-l',
      onSplit(self) {
        el.classList.add('is-split');
        const anim = gsap.from(self.words, { yPercent: 115, rotate: 3, duration: 1.25, ease: EASE, stagger: 0.045, paused: inIntro });
        if (inIntro) { if (tl && !el.__wowPlaced) { tl.add(anim.play(), el.dataset.at || '<0.15'); el.__wowPlaced = 1; } else anim.progress(1); }
        else ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => anim.play() }), anim.pause();
        return anim;
      }
    });
    splits.push(s);
  }

  // 3. intro timeline for the hero
  const tl = gsap.timeline({ defaults: { ease: EASE }, delay: introAt });
  if (intro) {
    $$('[data-split],[data-reveal],[data-clip]', intro).forEach(el => {
      if (el.matches('[data-split]')) splitOne(el, tl);
      else if (el.matches('[data-clip]')) clipIn(el, tl);
      else tl.to(el.dataset.reveal === 'self' ? el : el.children, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, el.dataset.at || '<0.2');
    });
  }
  $$('[data-split]').forEach(el => { if (!intro || !intro.contains(el)) splitOne(el); });

  // 4. reveals
  $$('[data-reveal]').forEach(el => {
    if (intro && intro.contains(el)) return;
    const items = el.dataset.reveal === 'self' ? [el] : [...el.children];
    gsap.to(items, { opacity: 1, y: 0, duration: 1.1, ease: EASE, stagger: 0.09,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });

  // 5. clip-in images
  function clipIn(el, tl) {
    const img = el.querySelector('img,video');
    const a = gsap.timeline({ paused: !tl });
    // phones: the first-screen photo is visible from the first paint (it is the LCP), only its settle plays
    if (!(tl && phone)) a.to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'expo.inOut' });
    a.from(img, { scale: 1.25, duration: 2, ease: EASE }, 0);
    if (tl) tl.add(a.play(), el.dataset.at || '<0.1');
    else ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => a.play() });
  }
  $$('[data-clip]').forEach(el => { if (!intro || !intro.contains(el)) clipIn(el); });

  // 6. parallax & speed
  $$('[data-parallax]').forEach(el => {
    const img = el.querySelector('img,video'); const k = parseFloat(el.dataset.parallax) || 0.15;
    gsap.fromTo(img, { yPercent: -k * 100 }, { yPercent: 0, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  $$('[data-speed]').forEach(el => {
    const k = 1 - (parseFloat(el.dataset.speed) || 1);
    gsap.to(el, { y: () => k * window.innerHeight * 0.6, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
  });

  // 6b. velocity skew: marked elements lean with the scroll speed and settle back (desktop)
  const skews = $$('[data-skew]');
  if (skews.length && matchMedia('(min-width: 900px)').matches) {
    const p = { v: 0 }, lim = gsap.utils.clamp(-7, 7);
    const set = skews.map(el => gsap.quickSetter(el, el.dataset.skew === 'y' ? 'skewY' : 'skewX', 'deg'));
    ScrollTrigger.create({ onUpdate: self => {
      const v = lim(self.getVelocity() / -300);
      if (Math.abs(v) > Math.abs(p.v)) { p.v = v; gsap.to(p, { v: 0, duration: 0.9, ease: 'power3', overwrite: true, onUpdate: () => set.forEach(f => f(p.v)) }); }
    } });
  }

  // 7. marquee with scroll velocity
  const marquees = [];
  $$('[data-marquee]').forEach(el => {
    const track = el.firstElementChild; if (!track) return;
    track.classList.add('wow-track');
    const n = track.children.length;
    const clone = () => {   // originals stay in place (other scripts may hold them, e.g. a language switcher); only copies are rebuilt
      while (track.children.length > n) track.removeChild(track.lastElementChild);
      const orig = [...track.children];
      for (let k = 0; k < 2; k++) orig.forEach(c => { const d = c.cloneNode(true); d.setAttribute('aria-hidden', 'true'); d.removeAttribute('data-i'); track.appendChild(d); });
    };
    clone(); marquees.push(clone);
    const speed = parseFloat(el.dataset.marquee) || 40; let x = 0, dir = 1, boost = 0;
    gsap.ticker.add((t, dt) => {
      const w = track.scrollWidth / 3; if (!w) return;
      const v = lenis ? lenis.velocity : 0; if (v) dir = v > 0 ? 1 : -1;
      boost += (Math.min(Math.abs(v), 60) * 6 - boost) * 0.08;
      x -= dir * (speed + boost) * dt / 1000; x = ((x % w) - w) % w;
      track.style.transform = `translate3d(${x}px,0,0)`;
    });
  });

  // 8. highlight statement
  $$('[data-highlight]').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.innerHTML = words.map(w => `<span class="wow-w" aria-hidden="true">${w}</span>`).join(' ');
    gsap.to($$('.wow-w', el), { opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 } });
  });

  // 9. counters
  $$('[data-count]').forEach(el => {
    const m = el.textContent.match(/(\D*)([\d\s.,]+)(.*)/); if (!m) return;
    const to = parseFloat(m[2].replace(/[\s,]/g, '')); const o = { v: 0 };
    ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () =>
      gsap.to(o, { v: to, duration: 1.6, ease: 'power3.out', onUpdate: () => el.textContent = m[1] + Math.round(o.v) + m[3] }) });
  });

  // 10. horizontal pinned section (desktop only)
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    $$('[data-hscroll]').forEach(sec => {
      const track = sec.querySelector('[data-hscroll-track]'); if (!track) return;
      const dist = () => track.scrollWidth - sec.clientWidth;
      gsap.to(track, { x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 } });
    });
  });

  // 11. pointer things (fine pointer only)
  if (fine) {
    $$('[data-magnetic]').forEach(el => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1,0.4)' }), yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1,0.4)' });
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * 0.35); yTo((e.clientY - r.top - r.height / 2) * 0.45); });
      el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
    const c = document.createElement('div'); c.className = 'wow-cursor'; c.innerHTML = '<div class="r"></div><div class="d"></div>'; document.body.append(c);
    const ring = c.querySelector('.r'), dot = c.querySelector('.d');
    const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' }), ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
    const dx = gsap.quickTo(dot, 'x', { duration: 0.08 }), dy = gsap.quickTo(dot, 'y', { duration: 0.08 });
    addEventListener('pointermove', e => { rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY); }, { passive: true });
    document.addEventListener('pointerover', e => {
      const t = e.target.closest('[data-cursor]'), l = e.target.closest('a,button,input,textarea,select,label');
      c.classList.toggle('big', !!t); ring.textContent = t ? t.dataset.cursor : '';
      c.classList.toggle('link', !t && !!l);
    });
    const rows = $$('[data-float]');
    if (rows.length) {
      const f = document.createElement('div'); f.className = 'wow-float'; document.body.append(f);
      const imgs = {}; rows.forEach(r => { const s = r.dataset.float; if (!imgs[s]) { const i = new Image(); i.src = s; i.alt = ''; f.append(i); imgs[s] = i; } });
      const fx = gsap.quickTo(f, 'x', { duration: 0.7, ease: 'power3' }), fy = gsap.quickTo(f, 'y', { duration: 0.7, ease: 'power3' });
      gsap.set(f, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });
      rows.forEach(r => {
        r.addEventListener('pointerenter', () => { Object.values(imgs).forEach(i => i.style.opacity = i === imgs[r.dataset.float] ? 1 : 0); gsap.to(f, { autoAlpha: 1, scale: 1, rotate: -3, duration: 0.5, ease: EASE }); });
        r.addEventListener('pointerleave', () => gsap.to(f, { autoAlpha: 0, scale: 0.6, rotate: 0, duration: 0.4, ease: 'power2.in' }));
        r.addEventListener('pointermove', e => { fx(e.clientX + 170); fy(e.clientY); });
      });
    }
  }

  // 12. header + progress
  const head = document.querySelector('[data-hide-header]');
  if (head) ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => head.classList.toggle('wow-up', s.direction === 1 && s.scroll() > 200) });
  if (document.body.hasAttribute('data-progress')) {
    const p = document.createElement('div'); p.className = 'wow-progress'; document.body.append(p);
    gsap.to(p, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
  }

  // refresh after fonts and images change sizes
  document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh());
  window.wow = {
    lenis, refresh: () => ScrollTrigger.refresh(),
    // after a script replaced texts (language switch): drop the splits but keep the NEW text, re-copy marquee rows
    resplit: () => {
      const keep = $$('[data-split]').map(el => [el, el.textContent]);
      splits.forEach(s => s.revert()); splits.length = 0;
      keep.forEach(([el, t]) => { if (el.textContent !== t) el.textContent = t; el.classList.add('is-split'); });
      $$('[data-highlight]').forEach(el => { if (!el.querySelector('.wow-w')) el.setAttribute('aria-label', el.textContent.trim()); });
      marquees.forEach(f => f()); ScrollTrigger.refresh();
    }
  };
})();
