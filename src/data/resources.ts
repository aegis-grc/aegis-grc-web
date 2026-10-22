import type { ProductId } from './products';

/** Kinds the Resources page can hold as the library grows. Only product guides exist today. */
export type ResourceKind =
  | 'guide'
  | 'article'
  | 'case-study'
  | 'whitepaper'
  | 'update'
  | 'documentation';

export type ResourceArea = ProductId | 'security' | 'intelligence';

export interface Resource {
  title: string;
  summary: string;
  href: string;
  kind: ResourceKind;
  area: ResourceArea;
}

export const kindLabels: Record<ResourceKind, string> = {
  guide: 'Product guide',
  article: 'Article',
  'case-study': 'Case study',
  whitepaper: 'Whitepaper',
  update: 'Product update',
  documentation: 'Documentation',
};

export const areas: { id: ResourceArea; title: string; blurb: string }[] = [
  { id: 'grc', title: 'GRC', blurb: 'Governance, risk, compliance, contracts, and quality.' },
  { id: 'amplify', title: 'Revenue operations', blurb: 'Sales, marketing, and lead follow-up.' },
  { id: 'sentinel', title: 'Security operations', blurb: 'Alerts, investigations, and response.' },
  {
    id: 'intelligence',
    title: 'Aria and governed AI',
    blurb: 'How Aegis applies AI across its products.',
  },
  { id: 'security', title: 'Security and trust', blurb: 'How Aegis approaches security.' },
];

export const resources: Resource[] = [
  {
    title: 'Aegis GRC overview',
    summary: 'What the GRC platform covers and how the pieces connect.',
    href: '/products/grc/',
    kind: 'guide',
    area: 'grc',
  },
  {
    title: 'Aegis Contracts overview',
    summary: 'Contract lifecycle management inside Aegis GRC.',
    href: '/products/grc/contracts/',
    kind: 'guide',
    area: 'grc',
  },
  {
    title: 'Aegis QMS overview',
    summary: 'Controlled documents and quality workflows inside Aegis GRC.',
    href: '/products/grc/qms/',
    kind: 'guide',
    area: 'grc',
  },
  {
    title: 'Aegis Amplify overview',
    summary: 'The lead-to-job workflow for contractors and home-service businesses.',
    href: '/products/amplify/',
    kind: 'guide',
    area: 'amplify',
  },
  {
    title: 'Aegis Sentinel overview',
    summary: 'How alerts become investigations, cases, and gated response plans.',
    href: '/products/sentinel/',
    kind: 'guide',
    area: 'sentinel',
  },
  {
    title: 'Aria, the Aegis intelligence layer',
    summary: 'The shared approach to AI across Aegis products.',
    href: '/platform/intelligence/',
    kind: 'guide',
    area: 'intelligence',
  },
  {
    title: 'How Aegis approaches security',
    summary: 'Corporate security principles, kept separate from product detail.',
    href: '/security/',
    kind: 'guide',
    area: 'security',
  },
];
