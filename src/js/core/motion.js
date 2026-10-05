import { clamp, rafThrottle } from './dom.js';

const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

/** True se l'utente ha chiesto di ridurre le animazioni. */
export const prefersReducedMotion = () => reducedQuery.matches;

/**
 * Avanzamento (0 → 1) di un elemento mentre attraversa il viewport.
 * 0 = il bordo superiore entra dal basso, 1 = il bordo inferiore esce in alto.
 * Con `pinned: true` misura lo scroll *dentro* un contenitore sticky:
 * 0 = inizio del contenitore in cima, 1 = fine del contenitore in fondo.
 */
export function scrollProgress(el, { pinned = false } = {}) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  if (pinned) return clamp(-rect.top / (rect.height - vh || 1));
  return clamp((vh - rect.top) / (vh + rect.height));
}

/**
 * Registra una callback legata allo scroll (throttled su rAF).
 * Restituisce la funzione per rimuoverla.
 */
export function onScroll(callback) {
  const handler = rafThrottle(callback);
  window.addEventListener('scroll', handler, { passive: true });
  window.addEventListener('resize', handler);
  handler();
  return () => {
    window.removeEventListener('scroll', handler);
    window.removeEventListener('resize', handler);
  };
}
