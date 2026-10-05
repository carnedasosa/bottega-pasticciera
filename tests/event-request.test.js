import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildMailtoUrl,
  buildRequestMessage,
  buildWhatsAppUrl,
  formatEventDate,
} from '../src/js/services/event-request.js';

test('formatEventDate produce una data italiana leggibile', () => {
  assert.equal(formatEventDate('2027-06-13'), 'domenica 13 giugno 2027');
  assert.equal(formatEventDate(''), '');
});

test('il messaggio contiene solo i campi compilati', () => {
  const text = buildRequestMessage({ eventLabel: 'Matrimonio', guests: 120, extras: [] });
  assert.match(text, /Evento: Matrimonio/);
  assert.match(text, /Ospiti: circa 120/);
  assert.doesNotMatch(text, /Formula|Data|Luogo|Dolci/);
});

test('il messaggio completo include tutti i dettagli', () => {
  const text = buildRequestMessage({
    eventLabel: 'Evento aziendale',
    guests: '400+',
    formatLabel: 'Finger food',
    extras: ['Torta personalizzata', 'Open bar e caffetteria'],
    date: '2027-03-20',
    place: '  Bari ',
    name: 'Giulia',
    notes: 'Due ospiti celiaci',
  });
  assert.match(text, /Formula: Finger food/);
  assert.match(text, /Dolci ed extra: Torta personalizzata, Open bar e caffetteria/);
  assert.match(text, /Data: sabato 20 marzo 2027/);
  assert.match(text, /Luogo: Bari$/m);
  assert.match(text, /Due ospiti celiaci/);
  assert.ok(text.trimEnd().endsWith('Giulia'));
});

test('i link codificano correttamente il testo', () => {
  assert.equal(
    buildWhatsAppUrl('393479846548', 'Ciao & grazie'),
    'https://wa.me/393479846548?text=Ciao%20%26%20grazie',
  );
  assert.equal(
    buildMailtoUrl('a@b.it', 'Oggetto', 'riga 1\nriga 2'),
    'mailto:a@b.it?subject=Oggetto&body=riga%201%0Ariga%202',
  );
});
