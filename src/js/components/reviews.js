import { reviews, ratings } from '../../data/reviews.js';
import { h } from '../core/dom.js';
import { initReveal } from '../core/reveal.js';

const formatScore = (score) => score.toLocaleString('it-IT', { minimumFractionDigits: 1 });

/** Citazioni dei clienti e valutazioni sulle piattaforme. */
export default function mount(el) {
  const quotes = reviews.map((review) =>
    h(
      'figure',
      { class: 'quote', 'data-reveal': true },
      h('blockquote', { class: 'quote__text' }, h('p', {}, review.quote)),
      h('figcaption', { class: 'quote__author' }, review.author),
    ),
  );

  const scores = h(
    'ul',
    { class: 'scores', 'data-reveal': true },
    ratings.map((rating) =>
      h(
        'li',
        { class: 'scores__item' },
        h('strong', { class: 'scores__value' }, formatScore(rating.score)),
        h('span', { class: 'scores__label' }, rating.platform, rating.count && ` · ${rating.count} recensioni`),
      ),
    ),
  );

  el.append(...quotes, scores);
  initReveal(el);
}
