import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dayMoments } from '../src/data/day.js';
import { getMomentIndex } from '../src/js/services/day-moment.js';

const at = (time) => new Date(`2026-10-05T${time}:00`);
const idAt = (time) => dayMoments[getMomentIndex(dayMoments, at(time))].id;

test('associa l’ora al momento della giornata', () => {
  assert.equal(idAt('06:00'), 'alba');
  assert.equal(idAt('11:15'), 'mattina');
  assert.equal(idAt('13:00'), 'pranzo');
  assert.equal(idAt('19:30'), 'aperitivo');
  assert.equal(idAt('23:59'), 'notte');
});

test('nel cuore della notte vale l’ultimo momento', () => {
  assert.equal(idAt('03:00'), 'notte');
});

test('i momenti sono in ordine cronologico', () => {
  const starts = dayMoments.map((m) => m.from);
  assert.deepEqual(starts, [...starts].sort());
});
