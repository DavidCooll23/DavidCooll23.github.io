/* Main page only (konstantinov.sk): Cuberto-style scroll moves that wow.js lacks.
   Loaded right before wow.js, so the motion guard counts these tweens too.
   Letter rise: AntislopUI text-effects pattern (MIT), yPercent + expo.out + stagger. */
(() => {
  const g = window.gsap, ST = window.ScrollTrigger;
  if (!g || !ST || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  g.registerPlugin(ST);
  const phone = matchMedia('(max-width: 760px)').matches;

  // first-screen dark card grows 0.93 -> 1 and its corners get smaller as you scroll
  const card = document.getElementById('live-demo');
  if (card) {
    const r0 = parseFloat(getComputedStyle(card).borderTopLeftRadius) || 24;
    g.fromTo(card, { '--cs': phone ? .96 : .93, '--cr': r0 + 'px' },
      { '--cs': 1, '--cr': r0 * .4 + 'px', ease: 'none',
        scrollTrigger: { trigger: card, start: 0, end: 'top 15%', scrub: true } });
  }

  // the white page above the dark final ends in an arc that straightens (Snellenberg)
  const arc = document.querySelector('#contact .arc');
  if (arc) g.fromTo(arc, { scaleY: 1 }, { scaleY: 0, ease: 'none',
    scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'top 35%', scrub: true, refreshPriority: -1 } });

  // giant footer signature: letters rise one by one
  const sig = document.querySelectorAll('footer .sig i');
  if (sig.length) g.from(sig, { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: .035, immediateRender: false,
    scrollTrigger: { trigger: 'footer .sig', start: 'top bottom', refreshPriority: -1 } });

  // 24.11 (FORMULA §1 Cuberto, §3 Rejouice/Snellenberg): more of the page moves on scroll
  const once = (el, from, to, start = 'top 92%') => g.fromTo(el, from, Object.assign({ immediateRender: false,
    scrollTrigger: { trigger: el, start, once: true } }, to));
  // section headings rise from under a mask as one block (word-by-word read as broken type, judges)
  document.querySelectorAll('#work h2, #prices h2, #faq h2, #contact h2').forEach(h =>
    once(h, { clipPath: 'inset(0 0 100% 0)', yPercent: 40 }, { clipPath: 'inset(0 0 0% 0)', yPercent: 0, duration: .9, ease: 'expo.out', clearProps: 'clipPath' }));
  // small label lines draw out
  document.querySelectorAll('main .kicker').forEach(k => once(k, { '--kl': 0 }, { '--kl': 1, duration: 1, ease: 'expo.inOut' }));
  // price list lines draw from left to right with the scroll (Collins)
  document.querySelectorAll('.packages, .packages > .prow').forEach(l => g.fromTo(l, { '--ln': 0 }, { '--ln': 1, ease: 'none',
    scrollTrigger: { trigger: l, start: 'top 95%', end: 'top 55%', scrub: true } }));
  // demo cards drift apart a little inside the dark card
  const ldc = document.querySelector('.live-demo .ld-client') || document.querySelector('.vh-demo'), ldo = document.querySelector('.live-demo .ld-owner') || document.querySelector('.vh-demo .ld-owner');
  if (card && ldc && ldo) [[ldc, 14], [ldo, 40]].forEach(([el, d]) => g.fromTo(el, { y: d }, { y: -d, ease: 'none',
    scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } }));
  // the blue glows breathe
  // 27.11 jank: the glow keeps its own ready-drawn layer (will-change) and breathes only while its block is on screen
  document.querySelectorAll('.live-demo .glow, .vh-demo .glow, #contact .glow').forEach((gl, i) => {
    gl.style.willChange = 'transform, opacity';
    const tw = g.to(gl, { scale: 1.14, opacity: .72, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 1.5, paused: true });
    ST.create({ trigger: gl.parentElement, start: 'top bottom', end: 'bottom top', onToggle: s => s.isActive ? tw.play() : tw.pause() });
  });
  // dark islands grow into place (Cuberto); the work island is pinned on PC, so only on phones
  const faq = document.getElementById('faq'), wp = document.querySelector('.work-pin');
  [faq, phone && matchMedia('(max-width: 899px)').matches ? wp : null].forEach(el => el && g.fromTo(el, { scale: .94 }, { scale: 1, ease: 'none',
    scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 30%', scrub: true } }));
  // the round WhatsApp button grows in (Snellenberg)
  const wa = document.querySelector('#contact .bigbtn');
  if (wa) once(wa, { scale: .4, rotate: -25 }, { scale: 1, rotate: 0, duration: 1.2, ease: 'elastic.out(1,.6)' }, 'top 90%');
  // footer slides out from under the page (Rejouice)
  const ft = document.querySelector('footer');
  if (ft) g.fromTo(ft, { yPercent: -18 }, { yPercent: 0, ease: 'none',
    scrollTrigger: { trigger: ft, start: 'top bottom', end: 'bottom bottom', scrub: true, refreshPriority: -2 } });
  // PC: while the work strip slides sideways its title stays on top with a yellow progress line (Codex polish)
  const now = document.querySelector('.work-now'), wt = document.querySelector('[data-hscroll-track]');
  if (now && wt && matchMedia('(min-width: 900px)').matches) {
    const dist = () => wt.scrollWidth - wp.clientWidth;
    const st = { trigger: wp, start: 'top top', end: () => '+=' + dist(), scrub: .8, invalidateOnRefresh: true, refreshPriority: -1 };
    g.fromTo(now, { '--wp': 0 }, { '--wp': 1, ease: 'none', scrollTrigger: st });
    g.fromTo(now, { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: Object.assign({}, st, { end: () => '+=' + dist() * .18 }) });
  }

  // cursor turns white over the dark islands
  document.addEventListener('pointerover', e => {
    const c = document.querySelector('.wow-cursor');
    if (!c || !e.target.closest) return;
    c.classList.toggle('dark', !!e.target.closest('.work-pin,#faq,#contact,footer,.live-demo') && !e.target.closest('.ld-client,.ld-owner'));
  }, { passive: true });
})();
