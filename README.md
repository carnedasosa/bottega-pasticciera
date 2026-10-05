# La Bottega Pasticcera — sito web

Sito di **La Bottega Pasticcera**, bar, pasticceria e catering in Corso Vittorio Emanuele 106 a Sannicandro di Bari (BA).

```bash
npm install
npm run dev       # server di sviluppo con hot reload
npm test          # test unitari (node:test, nessuna dipendenza)
npm run build     # build di produzione in dist/
npm run preview   # anteprima della build
```

Requisiti: Node.js ≥ 20.

---

## Concept di design

Lo stile nasce dal locale stesso: una **sala con volta a botte** nel centro storico, pareti bianche, zoccolatura e sedute in **velluto terracotta**, pavimento in **graniglia**, dettagli in ottone. Il marchio è una torta con **glassa al cioccolato colante**.

| Elemento del locale | Traduzione nel sito |
| --- | --- |
| Volta e archi | **L'arco è il motivo ricorrente**: foto, card, mappa, pulsanti, menu mobile e footer hanno forma ad arco |
| Velluto terracotta | Colore d'accento `--terracotta` |
| Glassa del logo | Testo e superfici scure `--cioccolato` |
| Pavimento in graniglia | Texture `terrazzo.svg` generata come pattern di sfondo |
| Aperto dalle 6 a mezzanotte | Sezione **"Una giornata in Bottega"**: lo scroll fa scorrere la giornata, il cielo cambia colore, l'orologio avanza |

Tipografia: **Fraunces** (serif morbido con corsivo "scritto a mano", richiama il lettering del menu) e **Manrope** per i testi. I font sono **self-hosted** (`@fontsource`): nessuna richiesta a Google, scelta consigliata per il GDPR.

### Elementi distintivi

- **Hero "la volta che si apre"**: scorrendo, la finestra ad arco sulla foto della sala si allarga fino a tutto schermo ("Benvenuti sotto la volta").
- **Stato "Aperto ora" in tempo reale**, calcolato sull'ora italiana anche per chi visita il sito dall'estero.
- **Una giornata in Bottega**: scroll verticale → movimento orizzontale, con il momento della giornata attuale contrassegnato come "adesso".
- **Menu interattivo** con ricerca, filtri (tradizione pugliese, laboratorio, senza lattosio) e navigazione che segue lo scroll.
- **Configuratore di eventi**: il cliente compone la richiesta (evento, ospiti, formula, dolci, data, luogo) e un "biglietto" si aggiorna in tempo reale; il messaggio parte già compilato su **WhatsApp** o per **e-mail**. Non serve un backend e non si salvano dati personali.

Tutte le animazioni rispettano `prefers-reduced-motion`.

---

## Albero delle cartelle

```
bottega-pasticciera/
├── index.html              Home
├── menu.html               Menu completo con prezzi
├── catering.html           Catering ed eventi + configuratore
├── vite.config.js          Build multipagina
├── plugins/
│   └── html-partials.js    Plugin Vite: include HTML + variabili da site.js
├── public/                 File copiati così come sono (favicon, robots, sitemap, og-image)
├── src/
│   ├── partials/           Frammenti HTML condivisi (head, header, footer, sprite SVG)
│   ├── data/               ★ CONTENUTI: l'unico posto da modificare per aggiornare il sito
│   │   ├── site.js         Contatti, indirizzo, orari, social, partner
│   │   ├── menu.js         Menu e prezzi
│   │   ├── day.js          Momenti di "Una giornata in Bottega"
│   │   ├── catering.js     Tipologie di evento, formule, extra, metodo
│   │   └── reviews.js      Recensioni e valutazioni
│   ├── js/
│   │   ├── main.js         Entry point unico
│   │   ├── registry.js     Nome componente → import dinamico
│   │   ├── core/           Utility trasversali (DOM, motion, mount, reveal, icone)
│   │   ├── services/       Logica pura, testabile, senza DOM
│   │   └── components/     Un file per componente: `export default function mount(el)`
│   ├── styles/
│   │   ├── main.css        Dichiara i cascade layers e importa tutto
│   │   ├── base/           reset, token, tipografia, globali, utility
│   │   ├── layout/         container, header, footer
│   │   ├── components/     pezzi riutilizzabili (bottoni, chip, card, form…)
│   │   └── sections/       stili delle singole sezioni di pagina
│   └── assets/
│       ├── img/            Foto ottimizzate (WebP)
│       └── brand/          Marchio e texture graniglia (SVG)
└── tests/                  Test unitari dei servizi e del plugin
```

---

## Architettura

```
 data/ (contenuti) ──► services/ (logica pura) ──► components/ (DOM)
        │                                              ▲
        └──► plugins/html-partials.js ──► HTML statico ─┘ data-component="…"
```

**1. Contenuti separati dalla presentazione.** Tutto ciò che il cliente può voler cambiare sta in `src/data/`. Il menu, le tipologie di evento, i momenti della giornata e le recensioni vengono generati dai dati. Contatti e indirizzo finiscono anche nell'HTML statico tramite i segnaposto `{{ site.… }}` del plugin. Cambiando il numero di telefono in `site.js`, quindi, si aggiornano header, footer, JSON-LD, link WhatsApp e configuratore.

**2. Componenti montati in modo dichiarativo.** Un elemento dichiara il proprio comportamento:

```html
<section data-component="day-timeline">…</section>
```

`core/mount.js` trova gli elementi, carica il modulo con un **import dinamico** e chiama `mount(el)`. Vite crea un chunk per componente, così ogni pagina scarica solo il JavaScript che le serve. Per aggiungere un componente basta creare il file in `components/` e registrarlo in `registry.js`.

**3. Logica pura nei servizi.** Orari di apertura, fuso orario, momento della giornata e costruzione del messaggio di preventivo sono funzioni senza DOM, coperte da test (`npm test`).

**4. Componenti disaccoppiati.** Le card degli eventi preselezionano il configuratore tramite un `CustomEvent` (`catering:preset`), senza importarsi a vicenda.

**5. CSS con cascade layers.** `@layer reset, tokens, base, layout, components, sections, utilities`: la precedenza è data dal layer e non dalla specificità, quindi niente `!important` e niente selettori lunghi. I colori, gli spazi e le forme sono token in `base/tokens.css`. Le animazioni legate allo scroll ricevono dal JS una sola variabile (es. `--p` da 0 a 1) e la resa visiva sta tutta nel CSS.

**6. HTML semantico e accessibile.** Skip link, landmark, `aria-current`, `aria-expanded`, `aria-live` sul riepilogo del preventivo, focus visibile, testi alternativi, `noscript` di riserva.

---

## Fonti delle informazioni

- Sito storico del locale (`bottegapasticcera.pugliaprint.com`): contatti, recensioni, **menu ufficiale in PDF** (prezzi), foto della sala e della vetrina.
- Schede PagineBianche, PagineGialle, OrariDiApertura24, NuovaOpinione, Tripadvisor: indirizzo, orari, servizi, valutazioni.
- Profili social: Instagram [@labottegapasticcera](https://www.instagram.com/labottegapasticcera/) e [@catering_labottegapasticcera](https://www.instagram.com/catering_labottegapasticcera/), [Facebook](https://www.facebook.com/labottegapasticcera/).
- Villa Ieva (Acquaviva delle Fonti): il catering della villa è curato da La Bottega Pasticcera.

## Da verificare con i titolari prima della pubblicazione

- [ ] **Orari**: le fonti online non concordano (es. una scheda Google riporta lunedì chiuso e una pausa pomeridiana). Basta aggiornare `hours` in `src/data/site.js`.
- [ ] **Foto**: online erano disponibili solo due foto reali (sala e vetrina), da cui sono stati ricavati i dettagli. Con le foto dei profili Instagram (torte, allestimenti catering, laboratorio) il sito migliora molto: vanno messe in `src/assets/img/` e collegate negli HTML.
- [ ] **Formule catering** (buffet, finger food, servito) e **extra**: confermare in `src/data/catering.js`.
- [ ] **Dominio**: `labottegapasticcera.it` è un segnaposto (`site.url`, `public/sitemap.xml`, `public/robots.txt`).
- [ ] Valutazioni Google e Tripadvisor in `src/data/reviews.js`: aggiornarle periodicamente.

> Nota: le modifiche a `src/data/site.js` che riguardano l'HTML statico (i segnaposto `{{ site.… }}`) richiedono di riavviare `npm run dev`.
