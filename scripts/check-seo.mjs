// Build-output SEO checks. Run after `npm run build`. Works in both modes:
//   PUBLIC_SITE_URL set   -> every indexable page must be canonical on that origin
//   PUBLIC_SITE_URL unset -> every page must be noindex, no sitemap, robots disallows
// In both modes: titles, descriptions, OG/Twitter tags and valid JSON-LD must exist.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const dist = resolve('dist');
const site = process.env.PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
const walk = (d) =>
  readdirSync(d).flatMap((n) => {
    const p = join(d, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const pages = walk(dist).filter((f) => f.endsWith('.html'));
const errors = [];
const meta = (html, re) => html.match(re)?.[1];
const noindexPages = /\/(privacy|terms|404)(\/index)?\.html$/;

for (const file of pages) {
  const rel = file.slice(dist.length);
  const html = readFileSync(file, 'utf8');
  const robots = meta(html, /<meta name="robots" content="([^"]*)"/);
  const canonical = meta(html, /<link rel="canonical" href="([^"]*)"/);
  const title = meta(html, /<title>([^<]*)<\/title>/);
  const desc = meta(html, /<meta name="description" content="([^"]*)"/);

  if (!title || title.length < 10) errors.push(`${rel}: missing/short title`);
  const isNoindexPage = noindexPages.test(rel);
  if (!desc || (!isNoindexPage && desc.length < 50))
    errors.push(`${rel}: missing/short description`);
  if (desc && desc.length > 200) errors.push(`${rel}: description over 200 chars (${desc.length})`);
  for (const tag of ['og:title', 'og:description', 'og:type', 'twitter:card'])
    if (!html.includes(`"${tag}"`)) errors.push(`${rel}: missing ${tag}`);

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      errors.push(`${rel}: invalid JSON-LD`);
    }
  }

  if (!site) {
    if (!/noindex/.test(robots ?? '')) errors.push(`${rel}: expected noindex when site URL unset`);
    if (canonical) errors.push(`${rel}: canonical present without a configured site URL`);
    if (/localhost/.test(html)) errors.push(`${rel}: localhost leaked into output`);
  } else {
    const expectIndex = !noindexPages.test(rel);
    if (expectIndex && /noindex/.test(robots ?? '')) errors.push(`${rel}: unexpectedly noindex`);
    if (!expectIndex && !/noindex/.test(robots ?? '')) errors.push(`${rel}: should be noindex`);
    if (!canonical?.startsWith(site + '/')) errors.push(`${rel}: canonical not on ${site}`);
    if (!html.includes(`"og:url" content="${canonical}"`) && canonical)
      errors.push(`${rel}: og:url differs from canonical`);
  }
}

const robotsTxt = readFileSync(join(dist, 'robots.txt'), 'utf8');
const hasSitemap = existsSync(join(dist, 'sitemap-index.xml'));
if (!site) {
  if (!/Disallow: \//.test(robotsTxt))
    errors.push('robots.txt should disallow when site URL unset');
  if (hasSitemap) errors.push('sitemap should not be generated when site URL unset');
} else {
  if (!robotsTxt.includes(`Sitemap: ${site}/sitemap-index.xml`))
    errors.push('robots.txt missing sitemap line');
  if (!hasSitemap) errors.push('sitemap-index.xml missing');
  else {
    const maps = walk(dist).filter((f) => /sitemap-\d+\.xml$/.test(f));
    const urls = maps.flatMap((f) =>
      [...readFileSync(f, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]),
    );
    if (!urls.length) errors.push('sitemap has no URLs');
    for (const u of urls) {
      if (!u.startsWith(site + '/')) errors.push(`sitemap URL off-origin: ${u}`);
      if (/\/(privacy|terms|404)\//.test(u)) errors.push(`noindex page in sitemap: ${u}`);
    }
    console.log(`sitemap: ${urls.length} URLs`);
  }
}

console.log(`${pages.length} pages checked in ${site ? 'configured' : 'unconfigured'} mode`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('SEO checks passed');
