export type ProductId = 'grc' | 'amplify' | 'sentinel';

export interface Product {
  id: ProductId;
  name: string;
  /** Word used in compact lockups */
  short: string;
  path: string;
  category: string;
  /** One sentence used on cards and in the mega-menu */
  summary: string;
  /** Verified application sign-in URL from the environment; undefined = not configured */
  appUrl?: string;
  /** schema.org applicationCategory */
  schemaCategory: string;
}

const clean = (v?: string) => (v && v.trim() ? v.trim() : undefined);

export const products: Record<ProductId, Product> = {
  grc: {
    id: 'grc',
    name: 'Aegis GRC',
    short: 'GRC',
    path: '/products/grc/',
    category: 'Governance, risk & compliance',
    summary:
      'Run compliance, risk, audit, vendors, contracts, and quality as one connected program.',
    appUrl: clean(import.meta.env.PUBLIC_APP_URL_GRC),
    schemaCategory: 'BusinessApplication',
  },
  amplify: {
    id: 'amplify',
    name: 'Aegis Amplify',
    short: 'Amplify',
    path: '/products/amplify/',
    category: 'AI sales, marketing & revenue operations',
    summary:
      'Capture, respond to, and convert demand for contractors and home-service businesses.',
    appUrl: clean(import.meta.env.PUBLIC_APP_URL_AMPLIFY),
    schemaCategory: 'BusinessApplication',
  },
  sentinel: {
    id: 'sentinel',
    name: 'Aegis Sentinel',
    short: 'Sentinel',
    path: '/products/sentinel/',
    category: 'AI-native security operations',
    summary:
      'Investigate and respond to security alerts with AI assistance that waits for human approval.',
    appUrl: clean(import.meta.env.PUBLIC_APP_URL_SENTINEL),
    schemaCategory: 'SecurityApplication',
  },
};

/** Display order across the site */
export const productList: Product[] = [products.grc, products.amplify, products.sentinel];

/** Members of the Aegis GRC family. They are not top-level portfolio siblings. */
export const grcFamily = [
  {
    id: 'contracts',
    name: 'Aegis Contracts',
    path: '/products/grc/contracts/',
    summary: 'AI-native contract lifecycle management, from first draft to renewal.',
  },
  {
    id: 'qms',
    name: 'Aegis QMS',
    path: '/products/grc/qms/',
    summary: 'Document control and quality workflows that stay audit-ready.',
  },
] as const;

export const ariaPath = '/platform/intelligence/';
