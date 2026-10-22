import { products, type Product } from '../data/products';
import { siteName } from '../data/site';

/** True only when PUBLIC_SITE_URL was provided; otherwise the site is noindex and URL-less. */
export const siteConfigured = Boolean(import.meta.env.PUBLIC_SITE_URL?.trim());

/** Absolute URL for a site path, or undefined when the public origin is not configured. */
export function abs(path: string, site: URL | undefined): string | undefined {
  if (!siteConfigured || !site) return undefined;
  return new URL(path, site).toString();
}

export function organizationSchema(site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    description:
      'Aegis builds AI-native operating platforms for high-stakes business operations: revenue, risk, and security.',
    ...(abs('/', site) && { url: abs('/', site), logo: abs('/favicon.svg', site) }),
  };
}

export function productSchema(product: Product, description: string, site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    applicationCategory: product.schemaCategory,
    operatingSystem: 'Web',
    description,
    publisher: { '@type': 'Organization', name: siteName },
    ...(abs(product.path, site) && { url: abs(product.path, site) }),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[], site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(abs(item.path, site) && { item: abs(item.path, site) }),
    })),
  };
}

export { products };
