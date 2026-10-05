import { onScroll } from '../core/motion.js';

/**
 * Header: si compatta dopo lo scroll, si nasconde scendendo e ricompare
 * risalendo; gestisce il menu mobile e segna la pagina corrente.
 */
export default function mount(header) {
  const toggle = header.querySelector('.nav-toggle');
  const nav = header.querySelector('.site-nav');
  let lastY = window.scrollY;

  const setHidden = (hidden) => {
    header.classList.toggle('is-hidden', hidden);
    // Esposto sulla radice: altri elementi sticky (es. toolbar del menu) si adeguano.
    document.documentElement.classList.toggle('header-hidden', hidden);
  };

  onScroll(() => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    if (y !== lastY) setHidden(y > lastY && y > 400 && !header.classList.contains('is-open'));
    lastY = y;
  });

  const setOpen = (open) => {
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
