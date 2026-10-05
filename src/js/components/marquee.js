/**
 * Nastro scorrevole infinito: duplica il contenuto quanto basta per
 * coprire due volte la larghezza dello schermo. L'animazione è in CSS.
 */
export default function mount(marquee) {
  const track = marquee.querySelector('.marquee__track');
  const original = [...track.children];
  const minWidth = window.innerWidth * 2;

  while (track.scrollWidth < minWidth) {
    track.append(...original.map((node) => node.cloneNode(true)));
  }
  // Una copia completa in più: l'animazione trasla del 50% senza salti.
  track.append(...[...track.children].map((node) => node.cloneNode(true)));
  marquee.classList.add('is-ready');
}
