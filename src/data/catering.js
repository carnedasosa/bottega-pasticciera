/**
 * Contenuti del catering: tipologie di evento, formule di servizio,
 * extra di pasticceria e metodo di lavoro.
 * Le stesse opzioni alimentano il configuratore (components/event-configurator.js).
 */
export const eventTypes = [
  {
    id: 'matrimonio',
    label: 'Matrimonio',
    blurb: 'Dal benvenuto agli sposi alla torta nuziale, un unico laboratorio dietro ogni portata.',
    icon: 'rings',
  },
  {
    id: 'cerimonia',
    label: 'Comunione, cresima, battesimo',
    blurb: 'Feste di famiglia con menu pensati per tutte le età e dolci personalizzati.',
    icon: 'dove',
  },
  {
    id: 'compleanno',
    label: 'Compleanno e festa privata',
    blurb: 'Da diciotto a novanta candeline, a casa vostra o in location.',
    icon: 'balloon',
  },
  {
    id: 'aziendale',
    label: 'Evento aziendale',
    blurb: 'Coffee break, inaugurazioni, ricevimenti e cene di gala per aziende.',
    icon: 'briefcase',
  },
];

export const serviceFormats = [
  { id: 'buffet', label: 'Buffet', hint: 'Isole a tema e libertà di movimento' },
  { id: 'finger-food', label: 'Finger food', hint: 'Assaggi in piedi, perfetti per aperitivi e ricevimenti' },
  { id: 'servito', label: 'Menu servito', hint: 'Portate al tavolo per un ricevimento formale' },
  { id: 'consiglio', label: 'Consigliateci voi', hint: 'Ne parliamo insieme' },
];

export const pastryExtras = [
  { id: 'torta', label: 'Torta personalizzata' },
  { id: 'mignon', label: 'Pasticceria mignon' },
  { id: 'monoporzioni', label: 'Dessert monoporzione' },
  { id: 'confettata', label: 'Sweet table / confettata' },
  { id: 'open-bar', label: 'Open bar e caffetteria' },
];

export const cateringSteps = [
  {
    title: 'Ci raccontate l’evento',
    text: 'Data, luogo, numero di ospiti e soprattutto l’atmosfera che immaginate.',
  },
  {
    title: 'Disegniamo il menu',
    text: 'Un menu personalizzato, costruito su ingredienti freschi e locali e sulle vostre esigenze.',
  },
  {
    title: 'Prende forma in laboratorio',
    text: 'Salato e dolce nascono nel nostro laboratorio artigianale di Sannicandro.',
  },
  {
    title: 'Il giorno della festa',
    text: 'Allestimento, servizio e cura dei dettagli: voi pensate solo agli ospiti.',
  },
];

export const GUESTS = { min: 20, max: 400, step: 10, initial: 80 };
