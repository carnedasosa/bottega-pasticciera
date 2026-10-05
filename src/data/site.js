/**
 * Anagrafica del locale: unica fonte di verità per contatti, orari e social.
 * Modificando questo file si aggiornano tutte le pagine.
 *
 * Fonti: sito storico (bottegapasticcera.pugliaprint.com), menu ufficiale PDF,
 * schede PagineBianche / OrariDiApertura24 / NuovaOpinione, profili social.
 */
export const site = {
  name: 'La Bottega Pasticcera',
  claim: 'Pasticcieri per vocazione',
  url: 'https://www.labottegapasticcera.it',
  timeZone: 'Europe/Rome',

  address: {
    street: 'Corso Vittorio Emanuele, 106',
    postalCode: '70028',
    city: 'Sannicandro di Bari',
    province: 'BA',
    region: 'Puglia',
    country: 'IT',
    geo: { lat: 41.0013514, lng: 16.8001678 },
  },

  contacts: {
    phone: '+393479846548',
    phoneLabel: '347 984 6548',
    whatsapp: '393479846548',
    email: 'labottegapasticcera@gmail.com',
  },

  socials: {
    instagram: 'https://www.instagram.com/labottegapasticcera/',
    instagramCatering: 'https://www.instagram.com/catering_labottegapasticcera/',
    facebook: 'https://www.facebook.com/labottegapasticcera/',
  },

  /**
   * Orari settimanali. Indice = Date#getDay() (0 = domenica).
   * Ogni giorno è una lista di fasce [apertura, chiusura] in formato HH:MM;
   * "24:00" indica la mezzanotte. Lista vuota = chiuso.
   * ⚠️ Le fonti online non sono concordi: verificare con i titolari.
   */
  hours: [
    [['06:00', '24:00']], // domenica
    [['06:00', '13:30']], // lunedì
    [['06:00', '24:00']], // martedì
    [['06:00', '24:00']], // mercoledì
    [['06:00', '24:00']], // giovedì
    [['06:00', '24:00']], // venerdì
    [['06:00', '24:00']], // sabato
  ],

  amenities: ['Accessibile in sedia a rotelle', 'Carte e pagamenti contactless', 'Asporto'],

  partner: {
    name: 'Villa Ieva',
    description: 'Villa con piscina per eventi e cerimonie: il catering è firmato La Bottega Pasticcera.',
    address: 'SP 67, Via per Sannicandro km 1,6 — Acquaviva delle Fonti (BA)',
    phoneLabel: '327 666 0188',
    phone: '+393276660188',
  },
};

export const DAY_NAMES = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
