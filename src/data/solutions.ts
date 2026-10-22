import type { ProductId } from './products';

export interface Solution {
  id: string;
  title: string;
  problem: string;
  change: string;
  products: ProductId[];
  /** Extra in-site links shown with the solution */
  links?: { label: string; href: string }[];
}

export const solutions: Solution[] = [
  {
    id: 'govern-risk-and-compliance',
    title: 'Govern risk and compliance',
    problem:
      'Policies, contracts, vendor reviews, and audit evidence live in different tools, so nobody can see the whole program.',
    change:
      'Run compliance, risk, audit, vendor management, contracts, quality, and training from one connected record.',
    products: ['grc'],
    links: [
      { label: 'Aegis Contracts', href: '/products/grc/contracts/' },
      { label: 'Aegis QMS', href: '/products/grc/qms/' },
    ],
  },
  {
    id: 'automate-revenue-operations',
    title: 'Automate revenue operations',
    problem:
      'Leads arrive faster than a small team can answer them, and estimates go quiet after the first quote.',
    change:
      'Respond to new leads right away, keep nurturing them, recover stalled estimates, and see which campaigns bring in work.',
    products: ['amplify'],
  },
  {
    id: 'modernize-security-operations',
    title: 'Modernize security operations',
    problem:
      'Alerts pile up across security tools, and analysts spend their time stitching context together by hand.',
    change:
      'Ingest alerts from several vendors, correlate them deterministically, and work each investigation as a case with an evidence timeline.',
    products: ['sentinel'],
  },
  {
    id: 'govern-ai-assisted-workflows',
    title: 'Govern AI-assisted workflows',
    problem:
      'AI can speed work up, but only if you can see what it did and keep it from doing what it should not.',
    change:
      'Use AI that works within limits, asks for approval before consequential actions, and leaves a record people can review.',
    products: ['grc', 'amplify', 'sentinel'],
    links: [
      { label: 'Aria, the Aegis intelligence layer', href: '/platform/intelligence/' },
      { label: 'How Aegis approaches security', href: '/security/' },
    ],
  },
  {
    id: 'improve-operational-visibility',
    title: 'Improve operational visibility',
    problem: 'Important work is spread across tools, so leaders see it late or not at all.',
    change:
      'Give each team one place to see its work: the compliance program, the sales pipeline, the security case queue.',
    products: ['grc', 'amplify', 'sentinel'],
  },
];
