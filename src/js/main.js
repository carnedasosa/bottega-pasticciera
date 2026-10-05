/**
 * Entry point unico per tutte le pagine.
 * I comportamenti globali partono subito; i componenti vengono caricati
 * solo se presenti nella pagina (vedi core/mount.js e registry.js).
 */
import { mountComponents } from './core/mount.js';
import { initReveal } from './core/reveal.js';
import { registry } from './registry.js';

document.documentElement.classList.add('js');

initReveal();
document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
mountComponents(registry);
