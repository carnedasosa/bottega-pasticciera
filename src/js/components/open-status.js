import { site, DAY_NAMES } from '../../data/site.js';
import { zonedNow } from '../services/clock.js';
import { getOpeningStatus, minutesUntilClose } from '../services/opening-hours.js';

const REFRESH_MS = 60_000;

function describe(date) {
  const status = getOpeningStatus(site.hours, date);

  if (status.open) {
    const soon = minutesUntilClose(site.hours, date) <= 30;
    const closes = status.closesAt === '24:00' ? 'mezzanotte' : `le ${status.closesAt}`;
    return {
      state: soon ? 'closing' : 'open',
      text: soon ? `Chiude a breve · ${closes}` : `Aperto ora · fino a ${closes}`,
    };
  }

  if (!status.opensAt) return { state: 'closed', text: 'Chiuso' };
  const when =
    status.dayOffset === 0
      ? 'oggi'
      : status.dayOffset === 1
        ? 'domani'
        : DAY_NAMES[(date.getDay() + status.dayOffset) % 7].toLowerCase();
  return { state: 'closed', text: `Chiuso · riapre ${when} alle ${status.opensAt}` };
}

/** Indicatore "Aperto ora" calcolato in tempo reale dagli orari in data/site.js. */
export default function mount(el) {
  const render = () => {
    const { state, text } = describe(zonedNow(site.timeZone));
    el.dataset.state = state;
    el.innerHTML = '';
    const dot = document.createElement('span');
    dot.className = 'status-dot';
    dot.setAttribute('aria-hidden', 'true');
    el.append(dot, text);
  };

  render();
  setInterval(render, REFRESH_MS);
}
