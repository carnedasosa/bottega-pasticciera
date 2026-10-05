import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { renderPartials } from '../plugins/html-partials.js';

const dir = mkdtempSync(join(tmpdir(), 'partials-'));
writeFileSync(join(dir, 'title.html'), '<h1>{{ title }}</h1>');
writeFileSync(join(dir, 'page.html'), '<main><!-- @include title.html --></main>');
writeFileSync(join(dir, 'loop.html'), '<!-- @include loop.html -->');

test('include un partial e sostituisce le variabili', () => {
  const html = renderPartials('<!-- @include title.html { "title": "Menu" } -->', dir);
  assert.equal(html, '<h1>Menu</h1>');
});

test('le variabili si propagano ai partial annidati', () => {
  const html = renderPartials('<!-- @include page.html { "title": "Catering" } -->', dir);
  assert.equal(html, '<main><h1>Catering</h1></main>');
});

test('le variabili mancanti diventano stringa vuota', () => {
  assert.equal(renderPartials('<!-- @include title.html -->', dir), '<h1></h1>');
});

test('rileva le inclusioni cicliche', () => {
  assert.throws(() => renderPartials('<!-- @include loop.html -->', dir), /ciclica/);
});

test('le variabili globali puntate funzionano anche fuori dai partial', () => {
  const globals = { site: { contacts: { phone: '+39123' }, amenities: ['Asporto', 'Wi-Fi'] } };
  const html = renderPartials('<a href="tel:{{ site.contacts.phone }}">{{ site.amenities }}</a>', dir, globals);
  assert.equal(html, '<a href="tel:+39123">Asporto · Wi-Fi</a>');
});
