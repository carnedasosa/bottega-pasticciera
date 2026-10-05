import { cateringSteps } from '../../data/catering.js';
import { h } from '../core/dom.js';
import { initReveal } from '../core/reveal.js';

/** Le fasi del metodo di lavoro, numerate dentro archi. */
export default function mount(list) {
  list.append(
    ...cateringSteps.map((step, i) =>
      h(
        'li',
        { class: 'step', 'data-reveal': true },
        h('span', { class: 'step__num', 'aria-hidden': 'true' }, String(i + 1).padStart(2, '0')),
        h('h3', { class: 'step__title' }, step.title),
        h('p', { class: 'step__text' }, step.text),
      ),
    ),
  );
  initReveal(list);
}
