const PRICE = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });

/** 1.2 → "1,20 €" */
export const formatPrice = (value) => PRICE.format(value);

/** Normalizza un testo per la ricerca: minuscolo e senza segni diacritici. */
export const normalize = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
