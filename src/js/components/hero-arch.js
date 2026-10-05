import { onScroll, prefersReducedMotion, scrollProgress } from '../core/motion.js';

/**
 * Hero: allo scroll l'arco con la foto della sala si allarga fino a
 * riempire lo schermo, come se si entrasse sotto la volta.
 * Il JS espone solo --p (0 → 1); tutta la resa è in CSS (sections/hero.css).
 */
export default function mount(hero) {
  if (prefersReducedMotion()) return;
  onScroll(() => {
    hero.style.setProperty('--p', scrollProgress(hero, { pinned: true }).toFixed(4));
  });
}
