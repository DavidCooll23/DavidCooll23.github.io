/* v2.js - only for the dark preview /v2.html (loaded after home.js, wow.js, novy.js).
   1) re-measure the scroll triggers when the page height changes: the pinned-chapters moment (#ako) gets ~2000 px
      shorter after it mounts and nobody re-measured, so everything below fired late and at the very bottom the footer
      stayed shifted up under #contact (its first line was cut).
   2) a soft blue light follows the mouse over the night (PC only).
   3) the hour grid behind the first screen: the booked hour lights up yellow after "Rezervovať". */
(() => {
  const ST = window.ScrollTrigger;
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (ST && 'ResizeObserver' in window) {
    const H = () => document.documentElement.scrollHeight;
    let last = H(), t = 0;
    ST.addEventListener('refresh', () => { last = H(); });
    new ResizeObserver(() => {
      if (Math.abs(H() - last) < 3) return;
      clearTimeout(t); t = setTimeout(() => { last = H(); ST.refresh(); }, 150);
    }).observe(document.body);
  }

  if (!calm && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const l = document.createElement('i'); l.className = 'v2-light'; l.setAttribute('aria-hidden', 'true');
    document.body.prepend(l);
    let x = innerWidth / 2, y = innerHeight / 3, tx = x, ty = y, run = false;
    const step = () => { x += (tx - x) * .08; y += (ty - y) * .08; l.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (Math.abs(tx - x) + Math.abs(ty - y) > .5) requestAnimationFrame(step); else run = false; };
    addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; l.classList.add('on'); if (!run) { run = true; requestAnimationFrame(step); } }, { passive: true });
    document.addEventListener('pointerleave', () => l.classList.remove('on'));
  }

  // the work cards: load their pictures now, not at the last moment (a big empty dark frame showed while scrolling in)
  document.querySelectorAll('.work-pin img[loading=lazy]').forEach(i => { i.loading = 'eager'; });

  const book = document.querySelector('.ld-book'), hrs = document.querySelectorAll('.v2-hours span');
  if (book && hrs.length) book.addEventListener('click', () => {
    const t = document.querySelector('.ld-times [aria-pressed=true]'), h = t ? parseInt(t.textContent, 10) : 18;
    hrs.forEach(s => s.classList.toggle('on', parseInt(s.textContent, 10) === h));
  });
})();
