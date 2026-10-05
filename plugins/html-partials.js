/**
 * Plugin Vite minimale per includere frammenti HTML condivisi e
 * interpolare variabili.
 *
 * Sintassi nelle pagine:
 *   <!-- @include header.html { "page": "menu" } -->
 *   <a href="tel:{{ site.contacts.phone }}">{{ site.contacts.phoneLabel }}</a>
 *
 * - Il file viene cercato in `partialsDir`.
 * - Il JSON opzionale espone variabili locali al partial ({{ page }}).
 * - `globals` è disponibile ovunque: così i dati di src/data/site.js
 *   restano l'unica fonte di verità anche per l'HTML statico.
 * - Le inclusioni possono essere annidate (con protezione dai cicli).
 *
 * Header e footer restano HTML statico (ottimo per SEO e accessibilità)
 * senza duplicarli in ogni pagina.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const INCLUDE_RE = /<!--\s*@include\s+([\w./-]+)\s*(\{[^]*?\})?\s*-->/g;
const VAR_RE = /\{\{\s*([\w.]+)\s*\}\}/g;

/** Legge un percorso puntato ("site.contacts.phone") da un oggetto. */
const lookup = (vars, path) => path.split('.').reduce((value, key) => value?.[key], vars);

/** Sostituisce i segnaposto; le liste vengono unite con " · ". */
const interpolate = (html, vars) =>
  html.replace(VAR_RE, (_, path) => {
    const value = lookup(vars, path);
    return Array.isArray(value) ? value.join(' · ') : (value ?? '');
  });

export function renderPartials(html, partialsDir, vars = {}, depth = 0) {
  if (depth > 10) throw new Error('[html-partials] Profondità massima superata: inclusione ciclica?');

  const withIncludes = html.replace(INCLUDE_RE, (_, file, rawVars) => {
    const localVars = { ...vars, ...(rawVars ? JSON.parse(rawVars) : {}) };
    const source = readFileSync(resolve(partialsDir, file), 'utf8');
    return renderPartials(interpolate(source, localVars), partialsDir, localVars, depth + 1);
  });

  return depth === 0 ? interpolate(withIncludes, vars) : withIncludes;
}

export default function htmlPartials({ partialsDir, globals = {} }) {
  return {
    name: 'html-partials',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => renderPartials(html, partialsDir, globals),
    },
    handleHotUpdate({ file, server }) {
      // Una modifica a un partial ricarica tutte le pagine.
      if (file.startsWith(partialsDir)) server.ws.send({ type: 'full-reload' });
    },
  };
}
