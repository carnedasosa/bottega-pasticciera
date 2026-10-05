/**
 * Costruzione della richiesta di preventivo catering.
 * Trasforma lo stato del configuratore in testo leggibile e in link
 * WhatsApp / e-mail pronti all'uso. Nessuna dipendenza dal DOM.
 */

const DATE_FORMAT = new Intl.DateTimeFormat('it-IT', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/** "2026-06-14" → "domenica 14 giugno 2026" (stringa vuota se non valida) */
export function formatEventDate(isoDate) {
  if (!isoDate) return '';
  const [y, m, d] = isoDate.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime()) ? '' : DATE_FORMAT.format(date);
}

/**
 * @param {object} request
 * @param {string} request.eventLabel
 * @param {number} request.guests
 * @param {string} [request.formatLabel]
 * @param {string[]} [request.extras]
 * @param {string} [request.date]      ISO yyyy-mm-dd
 * @param {string} [request.place]
 * @param {string} [request.name]
 * @param {string} [request.notes]
 */
export function buildRequestMessage(request) {
  const lines = [
    'Ciao Bottega Pasticcera! Vorrei un preventivo per il catering.',
    '',
    `• Evento: ${request.eventLabel}`,
    `• Ospiti: circa ${request.guests}`,
  ];

  if (request.formatLabel) lines.push(`• Formula: ${request.formatLabel}`);
  if (request.extras?.length) lines.push(`• Dolci ed extra: ${request.extras.join(', ')}`);

  const date = formatEventDate(request.date);
  if (date) lines.push(`• Data: ${date}`);
  if (request.place?.trim()) lines.push(`• Luogo: ${request.place.trim()}`);
  if (request.notes?.trim()) lines.push('', request.notes.trim());
  if (request.name?.trim()) lines.push('', request.name.trim());

  return lines.join('\n');
}

export const buildWhatsAppUrl = (number, text) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const buildMailtoUrl = (email, subject, body) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
