import { onScroll } from '../core/motion.js';

/**
 * Header: si compatta dopo lo scroll, si nasconde scendendo e ricompare
 * risalendo; gestisce il menu mobile e segna la pagina corrente.
 */
export default function mount(header) {
  const toggle = header.querySelector('.nav-toggle');
  const nav = header.querySelector('.site-nav');
  let lastY = window.scrollY;
  // Durata della chiusura del menu mobile (clip-path in layout/header.css):
  // finché l'animazione è in corso l'header non va nascosto, altrimenti il
  // transform lo trasforma in containing block e il menu "salta".
  const CLOSE_MS = 750;
  let lockedUntil = 0;

  const setHidden = (hidden) => {
    header.classList.toggle('is-hidden', hidden);
    // Esposto sulla radice: altri elementi sticky (es. toolbar del menu) si adeguano.
    document.documentElement.classList.toggle('header-hidden', hidden);
  };

  onScroll(() => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    const locked = header.classList.contains('is-open') || performance.now() < lockedUntil;
    if (y !== lastY) setHidden(y > lastY && y > 400 && !locked);
    lastY = y;
  });

  const setOpen = (open) => {
    const wasOpen = header.classList.contains('is-open');
    if (wasOpen === open) return;
    if (open) setHidden(false);
    else lockedUntil = performance.now() + CLOSE_MS;
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('no-scroll', open);
  };

  toggle.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));
  nav.addEventListener('click', (event) => event.target.closest('a') && setOpen(false));
  document.addEventListener('keydown', (event) => event.key === 'Escape' && setOpen(false));

  // Pagina corrente
  const current = location.pathname.replace(/index\.html$/, '');
  nav.querySelectorAll('.site-nav__link').forEach((link) => {
    const url = new URL(link.href);
    if (!url.hash && url.pathname === current) link.setAttribute('aria-current', 'page');
  });
}
