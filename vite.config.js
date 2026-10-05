import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import htmlPartials from './plugins/html-partials.js';
import { site } from './src/data/site.js';

const root = import.meta.dirname;

export default defineConfig({
  plugins: [htmlPartials({ partialsDir: resolve(root, 'src/partials'), globals: { site } })],
  build: {
    rollupOptions: {
      // Sito multipagina: ogni pagina HTML è un entry point.
      input: {
        home: resolve(root, 'index.html'),
        menu: resolve(root, 'menu.html'),
        catering: resolve(root, 'catering.html'),
      },
    },
  },
});
