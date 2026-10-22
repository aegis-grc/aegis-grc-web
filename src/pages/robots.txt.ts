import type { APIRoute } from 'astro';
import { siteConfigured } from '../lib/seo';

/** Crawling is only invited once a real public origin is configured. */
export const GET: APIRoute = ({ site }) => {
  const body =
    siteConfigured && site
      ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`
      : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
