import type { ProductId } from './products';

export type Relevance = 'primary' | 'relevant' | 'none';

export interface Industry {
  id: string;
  name: string;
  matters: string;
  relevance: Record<ProductId, Relevance>;
}

export const industries: Industry[] = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    matters:
      'Teams that handle protected health information need security and compliance programs that are documented and reviewable.',
    relevance: { grc: 'primary', amplify: 'none', sentinel: 'relevant' },
  },
  {
    id: 'saas',
    name: 'SaaS',
    matters:
      'Software companies answer customer security questionnaires, sign vendor and customer contracts, and keep controls documented for enterprise buyers.',
    relevance: { grc: 'primary', amplify: 'none', sentinel: 'relevant' },
  },
  {
    id: 'professional-services',
    name: 'Professional services',
    matters:
      'Firms manage client contracts, vendor relationships, and internal policies as they grow.',
    relevance: { grc: 'primary', amplify: 'none', sentinel: 'none' },
  },
  {
    id: 'home-services',
    name: 'Home services and contractors',
    matters:
      'Contractors win or lose work in how fast they respond to a lead and how well they follow up on an estimate.',
    relevance: { grc: 'none', amplify: 'primary', sentinel: 'none' },
  },
  {
    id: 'msp-vciso',
    name: 'MSPs and vCISOs',
    matters:
      'Advisors who run compliance for several clients need tenant isolation and per-client configuration in one place.',
    relevance: { grc: 'primary', amplify: 'none', sentinel: 'none' },
  },
];
