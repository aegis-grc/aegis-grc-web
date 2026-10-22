import { products, productList, grcFamily, ariaPath } from './products';

export const siteName = 'Aegis';

/** Existing inbox from the previous site. Override with PUBLIC_CONTACT_EMAIL. */
export const contactEmail = import.meta.env.PUBLIC_CONTACT_EMAIL?.trim() || 'hello@aegis-grc.com';

export function mailto(subject: string, body?: string): string {
  const q = [`subject=${encodeURIComponent(subject)}`];
  if (body) q.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${contactEmail}?${q.join('&')}`;
}

export const nav = {
  products: {
    label: 'Products',
    items: productList.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.category,
      href: p.path,
      children: p.id === 'grc' ? grcFamily.map((c) => ({ name: c.name, href: c.path })) : [],
    })),
    all: { label: 'View all products', href: '/products/' },
    aria: { label: 'Meet Aria', note: 'Aegis intelligence', href: ariaPath },
  },
  links: [
    { label: 'Solutions', href: '/solutions/' },
    { label: 'Security', href: '/security/' },
    { label: 'Resources', href: '/resources/' },
    { label: 'Company', href: '/company/' },
  ],
  actions: {
    contact: { label: 'Contact sales', href: '/contact/' },
    signIn: { label: 'Sign in', href: '/sign-in/' },
  },
};

export const footer = {
  blurb:
    'Aegis builds AI-native operating platforms for high-stakes business operations: revenue, risk, and security.',
  groups: [
    {
      title: 'Products',
      links: [
        { label: products.grc.name, href: products.grc.path },
        { label: 'Contracts', href: '/products/grc/contracts/', indent: true },
        { label: 'QMS', href: '/products/grc/qms/', indent: true },
        { label: products.amplify.name, href: products.amplify.path },
        { label: products.sentinel.name, href: products.sentinel.path },
        { label: 'All products', href: '/products/' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'By problem', href: '/solutions/' },
        { label: 'By industry', href: '/industries/' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Product guides', href: '/resources/' },
        { label: 'Security', href: '/security/' },
        { label: 'Aria, the Aegis intelligence layer', href: ariaPath },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Aegis', href: '/company/' },
        { label: 'Contact', href: '/contact/' },
        { label: 'Sign in', href: '/sign-in/' },
      ],
    },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy/' },
    { label: 'Terms', href: '/terms/' },
  ],
};
