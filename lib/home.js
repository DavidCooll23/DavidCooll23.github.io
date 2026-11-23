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

  // cursor turns white over the dark islands
  document.addEventListener('pointerover', e => {
    const c = document.querySelector('.wow-cursor');
    if (!c || !e.target.closest) return;
    c.classList.toggle('dark', !!e.target.closest('.work-pin,#faq,#contact,footer,.live-demo') && !e.target.closest('.ld-client,.ld-owner'));
  }, { passive: true });
})();
