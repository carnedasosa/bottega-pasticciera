import { eventTypes } from '../../data/catering.js';
import { h } from '../core/dom.js';
import { initReveal } from '../core/reveal.js';
import { icon } from '../core/icons.js';

/** Griglia delle tipologie di evento; ogni card porta al configuratore già compilato. */
export default function mount(list) {
  list.append(
    ...eventTypes.map((type) =>
      h(
        'li',
        { class: 'event-card', 'data-reveal': true },
        h('span', { class: 'event-card__icon', html: icon(type.icon, { size: 36 }) }),
        h('h3', { class: 'event-card__title' }, type.label),
        h('p', { class: 'event-card__text' }, type.blurb),
        h(
          'a',
          { class: 'link-arrow', href: `#preventivo`, dataset: { preset: type.id } },
          'Chiedi un preventivo',
          h('span', { html: icon('arrow', { size: 18 }) }),
        ),
      ),
    ),
  );

  initReveal(list);

  // Comunica la scelta al configuratore senza accoppiare i due componenti.
  list.addEventListener('click', (event) => {
    const link = event.target.closest('[data-preset]');
    if (link) document.dispatchEvent(new CustomEvent('catering:preset', { detail: { event: link.dataset.preset } }));
  });
}
