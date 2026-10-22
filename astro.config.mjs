// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The public origin is deliberately not hardcoded: the corporate domain is not
// decided yet. Set PUBLIC_SITE_URL (e.g. in the hosting provider) to enable
// indexing, canonical URLs and the sitemap. When unset, the build still works
// but every page is noindex and robots.txt disallows crawling.
const configured = process.env.PUBLIC_SITE_URL?.trim();
const site = configured || 'http://localhost:4321';

if (!configured && process.env.NODE_ENV === 'production') {
  console.warn(
    '[aegis] PUBLIC_SITE_URL is not set: building with noindex and a localhost canonical origin.',
  );
}

export default defineConfig({
  site,
  output: 'static',
  // Directory output with trailing slashes is served identically by every static host.
  trailingSlash: 'always',
  build: { format: 'directory' },
  // The sitemap is only generated when a real origin is configured, and it leaves out
  // the noindex pages (privacy/terms holding pages and the 404).
  integrations: configured
    ? [sitemap({ filter: (page) => !/\/(privacy|terms|404)\/?$/.test(page) })]
    : [],
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Cormorant Garamond',
      cssVariable: '--font-display',
      weights: [500, 600, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Outfit',
      cssVariable: '--font-body',
      weights: [300, 400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'DM Mono',
      cssVariable: '--font-mono',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
});
