import { eventTypes, serviceFormats, pastryExtras, GUESTS } from '../../data/catering.js';
import { site } from '../../data/site.js';
import { h } from '../core/dom.js';
import { icon } from '../core/icons.js';
import { buildMailtoUrl, buildRequestMessage, buildWhatsAppUrl, formatEventDate } from '../services/event-request.js';

/**
 * Configuratore di eventi: l'utente compone la richiesta, il "biglietto"
 * accanto si aggiorna in tempo reale e i pulsanti generano un messaggio
 * WhatsApp o un'e-mail precompilati. Nessun backend necessario.
 */
export default function mount(root) {
  const form = root.querySelector('form');
  const ticket = root.querySelector('[data-ticket]');
  const guestsInput = form.elements.guests;
  const guestsOutput = root.querySelector('[data-guests-output]');
  const sendWhatsApp = root.querySelector('[data-send="whatsapp"]');
  const sendEmail = root.querySelector('[data-send="email"]');

  renderOptions(root.querySelector('[data-options="event"]'), eventTypes, 'event', true);
  renderOptions(root.querySelector('[data-options="format"]'), serviceFormats, 'format', false);
  renderChips(root.querySelector('[data-options="extras"]'), pastryExtras);

  Object.assign(guestsInput, { min: GUESTS.min, max: GUESTS.max, step: GUESTS.step, value: GUESTS.initial });
  form.elements.date.min = new Date().toISOString().slice(0, 10);

  // ── Stato derivato dal form (unica fonte di verità) ──────────────
  function readState() {
    const data = new FormData(form);
    const find = (list, id) => list.find((option) => option.id === id);
    return {
      event: find(eventTypes, data.get('event')),
      format: find(serviceFormats, data.get('format')),
      extras: data.getAll('extras').map((id) => find(pastryExtras, id).label),
      guests: Number(data.get('guests')),
      date: data.get('date'),
      place: data.get('place'),
      name: data.get('name'),
      notes: data.get('notes'),
    };
  }

  function update() {
    const state = readState();
    const guestsLabel = state.guests >= GUESTS.max ? `${GUESTS.max}+` : String(state.guests);
    guestsOutput.textContent = `${guestsLabel} ospiti`;
    guestsInput.style.setProperty('--fill', `${((state.guests - GUESTS.min) / (GUESTS.max - GUESTS.min)) * 100}%`);

    renderTicket(ticket, state, guestsLabel);

    const ready = Boolean(state.event);
    root.classList.toggle('is-ready', ready);
    for (const button of [sendWhatsApp, sendEmail]) {
      button.toggleAttribute('aria-disabled', !ready);
      button.tabIndex = ready ? 0 : -1;
    }
    if (!ready) {
      sendWhatsApp.removeAttribute('href');
      sendEmail.removeAttribute('href');
      return;
    }

    const message = buildRequestMessage({
      eventLabel: state.event.label,
      guests: guestsLabel,
      formatLabel: state.format?.label,
      extras: state.extras,
      date: state.date,
      place: state.place,
      name: state.name,
      notes: state.notes,
    });
    sendWhatsApp.href = buildWhatsAppUrl(site.contacts.whatsapp, message);
    sendEmail.href = buildMailtoUrl(site.contacts.email, `Preventivo catering — ${state.event.label}`, message);
  }

  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', (event) => event.preventDefault());

  // Preselezione dall'esterno (card "Chiedi un preventivo").
  document.addEventListener('catering:preset', ({ detail }) => {
    const radio = form.querySelector(`input[name="event"][value="${detail.event}"]`);
    if (radio) {
      radio.checked = true;
      update();
    }
  });

  update();
}

// ── Rendering ───────────────────────────────────────────────────────

function renderOptions(container, options, name, withIcon) {
  container.append(
    ...options.map((option) =>
      h(
        'label',
        { class: 'option' },
        h('input', { class: 'option__input', type: 'radio', name, value: option.id }),
        h(
          'span',
          { class: 'option__body' },
          withIcon && h('span', { class: 'option__icon', html: icon(option.icon, { size: 30 }) }),
          h('span', { class: 'option__label' }, option.label),
          option.hint && h('span', { class: 'option__hint' }, option.hint),
        ),
      ),
    ),
  );
}

function renderChips(container, options) {
  container.append(
    ...options.map((option) =>
      h(
        'label',
        { class: 'chip chip--check' },
        h('input', { class: 'visually-hidden', type: 'checkbox', name: 'extras', value: option.id }),
        option.label,
      ),
    ),
  );
}

function renderTicket(ticket, state, guestsLabel) {
  const rows = [
    ['Evento', state.event?.label ?? 'Da scegliere'],
    ['Ospiti', guestsLabel],
    ['Formula', state.format?.label ?? '—'],
    ['Dolci & extra', state.extras.length ? state.extras.join(', ') : '—'],
    ['Data', formatEventDate(state.date) || '—'],
    ['Luogo', state.place?.trim() || '—'],
  ];
  ticket.replaceChildren(
    ...rows.map(([label, value]) =>
      h('div', { class: `ticket__row${value === '—' ? ' is-empty' : ''}` }, h('dt', {}, label), h('dd', {}, value)),
    ),
  );
}
