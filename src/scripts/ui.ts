/**
 * The only client script on the site: nav disclosure and the mobile drawer.
 * Everything works without it (see the `.js` class set in BaseLayout), so this
 * only enhances. There is deliberately no scroll-reveal: content is never hidden
 * waiting for JS, an observer, or a scroll.
 */

const header = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle') as HTMLButtonElement | null;
const productsItem = document.getElementById('products-item');
const productsTrigger = document.getElementById('products-trigger') as HTMLButtonElement | null;
const drawer = document.getElementById('site-nav');

/* ---- Mobile drawer ---- */
function setDrawer(open: boolean) {
  if (!header || !menuToggle) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  header.classList.toggle('menu-open', open);
}
menuToggle?.addEventListener('click', () => {
  setDrawer(menuToggle.getAttribute('aria-expanded') !== 'true');
});
drawer?.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).closest('a')) setDrawer(false);
});

/* ---- Products mega-menu: disclosure pattern ----
 * States: closed, hover-open (closes when the pointer leaves), and pinned (opened by
 * click or keyboard; stays open until closed). A click on a hover-opened menu pins it,
 * so hovering and then clicking never makes the menu flicker shut. */
let closeTimer: number | undefined;
let pinned = false;
function setMega(open: boolean, pin = false) {
  if (!productsItem || !productsTrigger) return;
  productsItem.classList.toggle('is-open', open);
  productsTrigger.setAttribute('aria-expanded', String(open));
  pinned = open && pin;
}
if (productsItem && productsTrigger) {
  productsTrigger.addEventListener('click', () => {
    const isOpen = productsTrigger.getAttribute('aria-expanded') === 'true';
    if (isOpen && !pinned) setMega(true, true);
    else setMega(!isOpen, true);
  });
  // Hover opens for mouse users only; touch and keyboard use the button.
  productsItem.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    window.clearTimeout(closeTimer);
    if (!productsItem.classList.contains('is-open')) setMega(true);
  });
  productsItem.addEventListener('pointerleave', (e) => {
    if (e.pointerType !== 'mouse' || pinned) return;
    closeTimer = window.setTimeout(() => setMega(false), 140);
  });
  productsItem.addEventListener('focusout', (e) => {
    const next = e.relatedTarget as Node | null;
    if (next && !productsItem.contains(next)) setMega(false);
  });
  document.addEventListener('click', (e) => {
    if (!productsItem.contains(e.target as Node)) setMega(false);
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (productsItem?.classList.contains('is-open')) {
    setMega(false);
    productsTrigger?.focus();
  } else if (menuToggle?.getAttribute('aria-expanded') === 'true') {
    setDrawer(false);
    menuToggle.focus();
  }
});
