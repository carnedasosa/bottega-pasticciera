import { h } from '../core/dom.js';

/**
 * Lista con anteprima: passando sopra una voce, un'immagine ad arco segue
 * il puntatore. Solo su dispositivi con mouse; altrove resta una lista.
 * Ogni voce contiene un <img> nascosto: così Vite ne gestisce il percorso.
 */
export default function mount(list) {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const img = h('img', { alt: '', class: 'hover-preview__img' });
  const preview = h('div', { class: 'hover-preview', 'aria-hidden': 'true' }, img);
  document.body.append(preview);

  let x = 0;
  let y = 0;
  let frame = 0;
  const follow = () => {
    preview.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    frame = 0;
  };

  list.addEventListener('pointermove', (event) => {
    x = event.clientX;
    y = event.clientY;
    frame ||= requestAnimationFrame(follow);
  });

  list.querySelectorAll('li').forEach((item) => {
    const source = item.querySelector('img');
    if (!source) return;
    item.addEventListener('pointerenter', () => {
      img.src = source.currentSrc || source.src;
      preview.classList.add('is-visible');
    });
  });
  list.addEventListener('pointerleave', () => preview.classList.remove('is-visible'));
}
