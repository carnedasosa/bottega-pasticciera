/**
 * Registro dei componenti: nome usato in `data-component` → modulo.
 * Per aggiungere un componente: creare il file in components/ con
 * `export default function mount(el)` e registrarlo qui.
 */
export const registry = {
  'site-header': () => import('./components/site-header.js'),
  'open-status': () => import('./components/open-status.js'),
  'hero-arch': () => import('./components/hero-arch.js'),
  'day-timeline': () => import('./components/day-timeline.js'),
  marquee: () => import('./components/marquee.js'),
  reviews: () => import('./components/reviews.js'),
  'hours-table': () => import('./components/hours-table.js'),
  'menu-board': () => import('./components/menu-board.js'),
  'event-types': () => import('./components/event-types.js'),
  'catering-steps': () => import('./components/catering-steps.js'),
  'event-configurator': () => import('./components/event-configurator.js'),
};
