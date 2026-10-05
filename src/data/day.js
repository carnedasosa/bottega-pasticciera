/**
 * "Una giornata in Bottega": i momenti del giorno, dalle 6 a mezzanotte.
 * Ogni momento definisce l'ora di inizio, i prodotti del menu che lo
 * rappresentano e la palette del "cielo" usata dalla sezione animata.
 */
export const dayMoments = [
  {
    id: 'alba',
    from: '06:00',
    label: 'Alba',
    title: 'Il primo cornetto',
    text: 'Il paese si sveglia e il bancone è già pieno: cornetti artigianali, cappuccino e un caffè leccese per chi ha fretta.',
    picks: ['Cornetto artigianale', 'Cappuccino', 'Caffè leccese'],
    sky: ['#f7d9b9', '#f3b98f'],
  },
  {
    id: 'mattina',
    from: '10:00',
    label: 'Mattina',
    title: 'La vetrina è piena',
    text: 'Zeppole, tette della monaca, code di rospo: la pasticceria pugliese in formato XXL, appena uscita dal laboratorio.',
    picks: ['Zeppola XXL', 'Tetta della monaca', 'Pasticcini mignon'],
    sky: ['#fbefdc', '#f6d7ae'],
  },
  {
    id: 'pranzo',
    from: '12:30',
    label: 'Pranzo',
    title: 'Ora di panzerotti',
    text: 'Classico o con ricotta forte, mortadella e pistacchio, capocollo: fritti al momento. Oppure medaglioni, piadine e insalatone.',
    picks: ['Panzerotto classico', 'Medaglione', 'Insalatona'],
    sky: ['#fff4e2', '#f9e0b8'],
  },
  {
    id: 'merenda',
    from: '16:00',
    label: 'Merenda',
    title: 'Dolce pomeriggio',
    text: 'Pancake e waffle al pistacchio, soufflé al cioccolato, frappè e il primo gelato della giornata.',
    picks: ['Pancake & waffle', 'Soufflé al cioccolato', 'Frappè'],
    sky: ['#f9d6b4', '#e9a77c'],
  },
  {
    id: 'aperitivo',
    from: '19:00',
    label: 'Aperitivo',
    title: 'Sotto la volta',
    text: 'Gin selezionati, aperitivo rinforzato, taglieri con le nostre frittelle e la scrocchiarella da condividere.',
    picks: ['Aperitivo rinforzato', 'Tagliere con frittelle', 'Gin tonic'],
    sky: ['#e58e62', '#a8472a'],
  },
  {
    id: 'notte',
    from: '22:00',
    label: 'Dopocena',
    title: 'L’ultimo cucchiaino',
    text: 'Una coppa di gelato, un babà, un tiramisù. Si chiude a mezzanotte, ma solo per ricominciare.',
    picks: ['Coppa di gelato', 'Babà XXL', 'Tiramisù'],
    sky: ['#5a2a1d', '#2c140d'],
  },
];
