import { menu, MENU_TAGS } from '../../data/menu.js';
import { h } from '../core/dom.js';
import { icon } from '../core/icons.js';
import { formatPrice, normalize } from '../services/format.js';

/**
 * Menu interattivo: categorie generate da data/menu.js, ricerca testuale,
 * filtri per specialità e navigazione che segue lo scroll (scrollspy).
 */
export default function mount(board) {
  const grid = board.querySelector('[data-menu-grid]');
  const nav = board.querySelector('[data-menu-nav]');
  const tagsBox = board.querySelector('[data-menu-tags]');
  const search = board.querySelector('[data-menu-search]');
  const empty = board.querySelector('[data-menu-empty]');

  const state = { query: '', tag: null };

  // ── Rendering iniziale ───────────────────────────────────────────
  const sections = menu.map((category) => renderCategory(category));
  grid.append(...sections.map((s) => s.el));

  nav.append(
    ...menu.map((category) =>
      h('li', {}, h('a', { class: 'menu-board__nav-link', href: `#${category.id}` }, category.title)),
    ),
  );

  const tagButtons = Object.entries(MENU_TAGS).map(([id, label]) =>
    h('button', { class: 'chip', type: 'button', 'aria-pressed': 'false', dataset: { tag: id } }, label),
  );
  tagsBox.append(...tagButtons);

  // ── Filtri ───────────────────────────────────────────────────────
  function applyFilters() {
    const query = normalize(state.query.trim());
    let visibleTotal = 0;

    for (const section of sections) {
      let visible = 0;
      for (const { el, item, haystack } of section.rows) {
        const matchesQuery = !query || haystack.includes(query) || section.haystack.includes(query);
        const matchesTag = !state.tag || item.tags?.includes(state.tag);
        const show = matchesQuery && matchesTag;
        el.hidden = !show;
        if (show) visible++;
      }
      section.el.hidden = visible === 0;
      visibleTotal += visible;
    }

    empty.hidden = visibleTotal > 0;
  }

  search.addEventListener('input', () => {
    state.query = search.value;
    applyFilters();
  });

  tagsBox.addEventListener('click', (event) => {
    const button = event.target.closest('[data-tag]');
    if (!button) return;
    state.tag = state.tag === button.dataset.tag ? null : button.dataset.tag;
    tagButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tag === state.tag)));
    applyFilters();
  });

  // ── Scrollspy ────────────────────────────────────────────────────
  const links = new Map([...nav.querySelectorAll('a')].map((a) => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((link) => link.removeAttribute('aria-current'));
        const link = links.get(entry.target.id);
        link?.setAttribute('aria-current', 'true');
        link?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((section) => spy.observe(section.el));
}

function renderCategory(category) {
  const rows = category.items.map((item) => {
    const el = h(
      'li',
      { class: 'dish' },
      h(
        'div',
        { class: 'dish__line' },
        h('span', { class: 'dish__name' }, item.name),
        h('span', { class: 'dish__leader', 'aria-hidden': 'true' }),
        h('span', { class: 'dish__price' }, formatPrice(item.price)),
      ),
      item.note && h('p', { class: 'dish__note' }, item.note),
      item.tags?.length &&
        h(
          'ul',
          { class: 'dish__tags' },
          item.tags.map((tag) => h('li', { class: `tag tag--${tag}` }, MENU_TAGS[tag])),
        ),
    );
    return { el, item, haystack: normalize(`${item.name} ${item.note ?? ''}`) };
  });

  const el = h(
    'article',
    { class: 'menu-card', id: category.id, 'aria-labelledby': `${category.id}-title` },
    h(
      'header',
      { class: 'menu-card__head' },
      h('span', { class: 'menu-card__icon', html: icon(category.icon, { size: 28 }) }),
      h('h2', { class: 'menu-card__title', id: `${category.id}-title` }, category.title),
    ),
    h(
      'ul',
      { class: 'menu-card__list' },
      rows.map((r) => r.el),
    ),
  );

  return { el, rows, haystack: normalize(category.title) };
}
