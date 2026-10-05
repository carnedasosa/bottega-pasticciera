import { prefersReducedMotion } from './motion.js';

/**
 * Animazione d'ingresso per gli elementi con [data-reveal].
 * Gli elementi fratelli ricevono un ritardo progressivo (--reveal-delay).
 */
export function initReveal(root = document) {
  const targets = root.querySelectorAll('[data-reveal]');
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
  );

  targets.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal'));
    el.style.setProperty('--reveal-delay', `${siblings.indexOf(el) * 90}ms`);
    observer.observe(el);
  });
}
