import { site, DAY_NAMES } from '../../data/site.js';
import { h } from '../core/dom.js';
import { zonedNow } from '../services/clock.js';
import { groupWeek } from '../services/opening-hours.js';

const formatRange = ([from, to]) => `${from} – ${to}`;

function dayLabel(days) {
  const first = DAY_NAMES[days[0]];
  if (days.length === 1) return first;
  return `${first} – ${DAY_NAMES[days.at(-1)]}`;
}

/** Tabella orari settimanale, con il giorno corrente evidenziato. */
export default function mount(el) {
  const today = zonedNow(site.timeZone).getDay();

  const rows = groupWeek(site.hours).map(({ days, ranges }) =>
    h(
      'div',
      { class: `hours__row${days.includes(today) ? ' is-today' : ''}` },
      h('dt', {}, dayLabel(days), days.includes(today) && h('span', { class: 'hours__today' }, 'oggi')),
      h('dd', {}, ranges.length ? ranges.map(formatRange).join(' · ') : 'Chiuso'),
    ),
  );

  el.append(h('h3', { class: 'hours__title' }, 'Orari'), h('dl', { class: 'hours__list' }, rows));
}
