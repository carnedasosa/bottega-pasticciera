import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  fromMinutes,
  getOpeningStatus,
  groupWeek,
  minutesUntilClose,
  toMinutes,
} from '../src/js/services/opening-hours.js';

// Domenica → sabato. Lunedì solo mattina, martedì chiuso (per testare i salti).
const hours = [
  [['06:00', '24:00']],
  [['06:00', '13:30']],
  [],
  [['06:00', '24:00']],
  [['06:00', '24:00']],
  [['06:00', '24:00']],
  [['06:00', '24:00']],
];

// 5 ottobre 2026 è un lunedì
const at = (day, time) => new Date(`2026-10-${String(day).padStart(2, '0')}T${time}:00`);

test('toMinutes / fromMinutes sono inverse', () => {
  assert.equal(toMinutes('06:30'), 390);
  assert.equal(toMinutes('24:00'), 1440);
  assert.equal(fromMinutes(390), '06:30');
  assert.equal(fromMinutes(1440), '24:00');
});

test('aperto durante la fascia, con orario di chiusura', () => {
  assert.deepEqual(getOpeningStatus(hours, at(5, '10:00')), { open: true, closesAt: '13:30' });
});

test("l'orario di chiusura è escluso", () => {
  assert.equal(getOpeningStatus(hours, at(5, '13:30')).open, false);
});

test('prima dell’apertura riapre oggi', () => {
  assert.deepEqual(getOpeningStatus(hours, at(5, '05:00')), { open: false, opensAt: '06:00', dayOffset: 0 });
});

test('salta i giorni di chiusura', () => {
  // lunedì pomeriggio → martedì chiuso → riapre mercoledì (tra 2 giorni)
  assert.deepEqual(getOpeningStatus(hours, at(5, '15:00')), { open: false, opensAt: '06:00', dayOffset: 2 });
});

test('mezzanotte come chiusura (24:00)', () => {
  assert.deepEqual(getOpeningStatus(hours, at(4, '23:59')), { open: true, closesAt: '24:00' });
  assert.equal(minutesUntilClose(hours, at(4, '23:45')), 15);
});

test('settimana sempre chiusa', () => {
  assert.deepEqual(getOpeningStatus(Array(7).fill([]), at(5, '10:00')), { open: false, opensAt: null });
});

test('groupWeek raggruppa i giorni consecutivi uguali partendo dal lunedì', () => {
  const groups = groupWeek(hours);
  assert.deepEqual(
    groups.map((g) => g.days),
    [[1], [2], [3, 4, 5, 6, 0]],
  );
});

test('zonedNow riporta l’ora italiana indipendentemente dal fuso del visitatore', async () => {
  const { zonedNow } = await import('../src/js/services/clock.js');
  // 10:00 UTC del 5 ottobre 2026 = 12:00 a Roma (ora legale)
  const rome = zonedNow('Europe/Rome', new Date('2026-10-05T10:00:00Z'));
  assert.equal(rome.getHours(), 12);
  assert.equal(rome.getDay(), 1);
});
