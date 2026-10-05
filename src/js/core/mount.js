/**
 * Montaggio dei componenti.
 *
 * Nell'HTML un elemento dichiara il proprio comportamento:
 *   <section data-component="day-timeline">…</section>
 *
 * Il registro associa ogni nome a un import dinamico: Vite genera un chunk
 * per componente e ogni pagina scarica solo il JavaScript che le serve.
 * Ogni modulo esporta `default function mount(element)`.
 */
export async function mountComponents(registry, root = document) {
  const elements = root.querySelectorAll('[data-component]');

  const jobs = [...elements].flatMap((el) =>
    el.dataset.component.split(/\s+/).map(async (name) => {
      const load = registry[name];
      if (!load) {
        console.warn(`[mount] Componente sconosciuto: "${name}"`);
        return;
      }
      try {
        const { default: mount } = await load();
        mount(el);
      } catch (error) {
        console.error(`[mount] Errore nel componente "${name}"`, error);
      }
    }),
  );

  await Promise.all(jobs);
}
