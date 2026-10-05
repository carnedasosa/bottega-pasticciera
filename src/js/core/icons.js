/**
 * Icone SVG a tratto (24×24, stroke = currentColor) disegnate per il sito.
 * Usate dai componenti che generano markup dinamico.
 */
const paths = {
  cup: '<path d="M4 9h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6V9Z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3"/>',
  croissant: '<path d="M3 15c2-6 6-9 9-9s7 3 9 9c-2 1-4 1-5 0l-1-4-3 5-3-5-1 4c-1 1-3 1-5 0Z"/>',
  cake: '<path d="M5 11a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v2c0 1-1 1-1.5 0s-1.5-1-1.5 0v1c0 1-2 1-2 0v-1c0-1-1.5-1-1.5 0s-2 1-2 0-1.5-1-2 0-1.5 1-1.5 0V11Z"/><path d="M5 13v5h14v-5M3 20.5h18"/><path d="M12 4v4"/>',
  gelato: '<path d="M8 12h8l-4 9-4-9Z"/><path d="M7 12a5 5 0 1 1 10 0"/>',
  panzerotto:
    '<path d="M3 16a9 9 0 0 1 18 0H3Z"/><path d="M5 16l1 1 1-1 1 1 1-1 1 1 1-1 1 1 1-1 1 1 1-1 1 1 1-1 1 1"/>',
  sandwich: '<path d="M3 11a9 5 0 0 1 18 0H3Z"/><path d="M3 14h18M4 17h16l-1 2H5l-1-2Z"/>',
  leaf: '<path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19 13 11"/>',
  fry: '<path d="M6 10h12l-1.5 10h-9L6 10Z"/><path d="M8 10 7 4M11 10V3M14 10l1-6M17 10l1.5-4"/>',
  board:
    '<rect x="3" y="8" width="18" height="11" rx="5"/><circle cx="9" cy="13.5" r="1.5"/><circle cx="15" cy="13.5" r="1.5"/>',
  spritz: '<path d="M7 3h10l-1 7a4 4 0 0 1-8 0L7 3Z"/><path d="M12 14v7M8 21h8"/>',
  beer: '<path d="M6 7h10v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7Z"/><path d="M16 10h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2M6 7a3 3 0 0 1 5-2 3 3 0 0 1 5 2"/>',
  bottle: '<path d="M10 3h4v4l2 3v10a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V10l2-3V3Z"/><path d="M8 13h8"/>',
  rings: '<circle cx="9" cy="14" r="5"/><circle cx="15" cy="14" r="5"/><path d="M10 5l2-2 2 2"/>',
  dove: '<path d="M3 13c4 0 6-2 8-6 1 3 3 5 6 5l4-2-2 4c-1 4-5 6-9 6-3 0-5-2-7-7Z"/>',
  balloon:
    '<path d="M12 3a6 6 0 0 1 6 6c0 4-3 7-6 7s-6-3-6-7a6 6 0 0 1 6-6Z"/><path d="M12 16l-1 2h2l-1-2M12 18c0 2-2 2-2 4"/>',
  briefcase:
    '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 12h18"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
};

export function icon(name, { size = 24, label } = {}) {
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${a11y}>${paths[name] ?? ''}</svg>`;
}
