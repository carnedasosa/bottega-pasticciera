/**
 * Ora "da parete" in un fuso orario. Restituisce una Date i cui getter
 * locali (getHours, getDay…) riflettono l'ora del fuso indicato: così lo
 * stato "Aperto ora" è corretto anche per chi visita il sito dall'estero.
 */
export function zonedNow(timeZone, date = new Date()) {
  return new Date(date.toLocaleString('en-US', { timeZone }));
}
