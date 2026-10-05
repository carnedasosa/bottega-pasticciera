/**
 * Logica degli orari di apertura. Funzioni pure: ricevono gli orari e una
 * data, non toccano il DOM (vedi tests/opening-hours.test.js).
 */

/** "06:30" → 390 */
export function toMinutes(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/** 390 → "06:30" (1440 → "24:00") */
export function fromMinutes(total) {
  const h = String(Math.floor(total / 60)).padStart(2, '0');
  const m = String(total % 60).padStart(2, '0');
  return `${h}:${m}`;
}

const minutesOfDay = (date) => date.getHours() * 60 + date.getMinutes();

/**
 * Stato di apertura in un dato istante.
 * @returns {{ open: true, closesAt: string } |
 *           { open: false, opensAt: string, dayOffset: number } |
 *           { open: false, opensAt: null }}
 *   dayOffset: 0 = oggi, 1 = domani, …
 */
export function getOpeningStatus(hours, date = new Date()) {
  const today = date.getDay();
  const now = minutesOfDay(date);

  for (const [from, to] of hours[today]) {
    if (now >= toMinutes(from) && now < toMinutes(to)) {
      return { open: true, closesAt: to };
    }
  }

  // Cerca la prossima fascia, a partire da oggi, nell'arco di una settimana.
  for (let offset = 0; offset < 7; offset++) {
    const day = (today + offset) % 7;
    const next = hours[day].find(([from]) => offset > 0 || toMinutes(from) > now);
    if (next) return { open: false, opensAt: next[0], dayOffset: offset };
  }

  return { open: false, opensAt: null };
}

/** Minuti mancanti alla chiusura (null se chiuso). */
export function minutesUntilClose(hours, date = new Date()) {
  const status = getOpeningStatus(hours, date);
  if (!status.open) return null;
  return toMinutes(status.closesAt) - minutesOfDay(date);
}

/**
 * Raggruppa i giorni con gli stessi orari, partendo dal lunedì.
 * → [{ days: [1, 2], ranges: [['06:00','24:00']] }, …]
 */
export function groupWeek(hours) {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const groups = [];
  for (const day of order) {
    const key = JSON.stringify(hours[day]);
    const last = groups.at(-1);
    if (last && last.key === key) last.days.push(day);
    else groups.push({ key, days: [day], ranges: hours[day] });
  }
  return groups.map(({ days, ranges }) => ({ days, ranges }));
}
