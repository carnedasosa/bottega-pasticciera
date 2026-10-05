/** Piccole utility DOM condivise dai componenti. */

export const qs = (selector, root = document) => root.querySelector(selector);
export const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

/**
 * Crea un elemento in modo dichiarativo.
 *   h('li', { class: 'item', dataset: { id: 3 } }, 'Testo', h('span', {}, '€'))
 * Le stringhe figlie sono inserite come testo (mai come HTML).
 */
export function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    if (value == null || value === false) continue;
    if (key === 'class') el.className = value;
    else if (key === 'dataset') Object.assign(el.dataset, value);
    else if (key === 'style') Object.assign(el.style, value);
    else if (key.startsWith('on')) el.addEventListener(key.slice(2).toLowerCase(), value);
    // `html` solo per markup statico interno (icone), mai per testo dell'utente
    else if (key === 'html') el.innerHTML = value;
    else el.setAttribute(key, value === true ? '' : value);
  }
  el.append(...children.flat().filter((c) => c != null && c !== false));
  return el;
}

/** Esegue `fn` al massimo una volta per frame. */
export function rafThrottle(fn) {
  let frame = 0;
  return (...args) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      fn(...args);
    });
  };
}

export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
