import { dayMoments } from '../../data/day.js';
import { site } from '../../data/site.js';
import { clamp, h } from '../core/dom.js';
import { onScroll, prefersReducedMotion, scrollProgress } from '../core/motion.js';
import { zonedNow } from '../services/clock.js';
import { getMomentIndex } from '../services/day-moment.js';
import { fromMinutes, toMinutes } from '../services/opening-hours.js';

const END_OF_DAY = toMinutes('24:00');

const lerp = (a, b, t) => a + (b - a) * t;

/** Interpola due colori esadecimali (#rrggbb). */
function mixHex(a, b, t) {
  const pa = a.match(/\w\w/g).map((x) => parseInt(x, 16));
  const pb = b.match(/\w\w/g).map((x) => parseInt(x, 16));
  return `#${pa
    .map((v, i) =>
      Math.round(lerp(v, pb[i], t))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
}

function renderCard(moment, isNow) {
  return h(
    'li',
    { class: 'day-card', dataset: { moment: moment.id } },
    h('p', { class: 'day-card__time' }, moment.from, isNow && h('span', { class: 'day-card__now' }, 'adesso')),
    h('p', { class: 'day-card__label' }, moment.label),
    h('h3', { class: 'day-card__title' }, moment.title),
    h('p', { class: 'day-card__text' }, moment.text),
    h(
      'ul',
      { class: 'day-card__picks' },
      moment.picks.map((pick) => h('li', {}, pick)),
    ),
  );
}

/**
 * "Una giornata in Bottega": scrollando in verticale la giornata scorre in
 * orizzontale, l'orologio avanza e il cielo cambia colore dall'alba alla notte.
 * Il momento corrispondente all'ora reale è evidenziato con "adesso".
 */
export default function mount(section) {
  const track = section.querySelector('[data-day-track]');
  const timeLabel = section.querySelector('[data-day-time]');
  const bar = section.querySelector('[data-day-bar]');
  const nowIndex = getMomentIndex(dayMoments, zonedNow(site.timeZone));

  track.append(...dayMoments.map((moment, i) => renderCard(moment, i === nowIndex)));
  const cards = [...track.children];

  if (prefersReducedMotion()) {
    section.classList.add('day--static');
    return;
  }

  const last = dayMoments.length - 1;

  onScroll(() => {
    // Ingresso (0 → 1) mentre la sezione sale dal fondo alla cima dello
    // schermo, con ease-out: su mobile porta l'orologio accanto al titolo.
    const enter = clamp(1 - section.getBoundingClientRect().top / window.innerHeight);
    section.style.setProperty('--day-in', (1 - (1 - enter) ** 3).toFixed(3));

    const p = scrollProgress(section, { pinned: true });
    const segment = p * last;
    const i = Math.min(Math.floor(segment), last - 1);
    const t = segment - i;
    const from = dayMoments[i];
    const to = dayMoments[i + 1];

    const shift = Math.max(0, track.scrollWidth - track.clientWidth);
    track.style.transform = `translate3d(${-p * shift}px, 0, 0)`;

    const minutes = lerp(toMinutes(from.from), toMinutes(to?.from ?? '24:00'), t);
    timeLabel.textContent = fromMinutes(Math.round(minutes / 5) * 5);
    section.style.setProperty('--day-angle', `${(minutes / END_OF_DAY) * 720}deg`);
    section.style.setProperty('--sky-a', mixHex(from.sky[0], to.sky[0], t));
    section.style.setProperty('--sky-b', mixHex(from.sky[1], to.sky[1], t));
    section.classList.toggle('day--night', segment > last - 1.5);
    bar.style.transform = `scaleX(${p})`;

    const active = Math.round(segment);
    cards.forEach((card, index) => card.classList.toggle('is-active', index === active));
  });
}
