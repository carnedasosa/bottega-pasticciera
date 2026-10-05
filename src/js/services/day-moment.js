import { toMinutes } from './opening-hours.js';

/**
 * Restituisce l'indice del momento della giornata attivo a una certa ora.
 * Prima del primo momento (notte fonda) si considera l'ultimo.
 */
export function getMomentIndex(moments, date = new Date()) {
  const now = date.getHours() * 60 + date.getMinutes();
  let index = moments.length - 1;
  moments.forEach((moment, i) => {
    if (now >= toMinutes(moment.from)) index = i;
  });
  return now < toMinutes(moments[0].from) ? moments.length - 1 : index;
}
