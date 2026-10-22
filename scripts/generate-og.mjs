// One-off generator for public/og/aegis.png (1200x630). Run after `npm run build`:
//   node scripts/generate-og.mjs
// It renders a static card with the site's own self-hosted fonts, using the Chrome
// that Playwright already uses for tests. The PNG is committed; re-run only when the
// mark or tagline changes.
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Astro emits hash-named font files; resolve them from the @font-face rules in the built HTML.
const built = readFileSync('dist/index.html', 'utf8');
const faces = [...built.matchAll(/@font-face\{([^}]*)\}/g)].map((m) => m[1]);
const pick = (family, weight) => {
  const face = faces.find(
    (f) =>
      f.includes(family) && new RegExp(`font-weight:\\s*${weight}\\b`).test(f) && /normal/.test(f),
  );
  const src = face && face.match(/url\(["']?([^"')]+\.woff2)/);
  if (!src) throw new Error(`font ${family} ${weight} not found; run npm run build first`);
  return pathToFileURL(resolve('dist' + src[1])).href;
};

const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:D;src:url(${pick('Cormorant Garamond', 500)});font-weight:500}
@font-face{font-family:B;src:url(${pick('Outfit', 400)});font-weight:400}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:radial-gradient(ellipse 60% 80% at 80% 40%,#16284a 0%,#070b14 70%);color:#e8edf5;font-family:B;display:flex;align-items:center;padding:0 88px;gap:60px;overflow:hidden}
.l{flex:1}
.w{font-family:D;font-weight:500;letter-spacing:.2em;font-size:34px;margin-bottom:34px;color:#c9d3e3}
h1{font-family:D;font-weight:500;font-size:76px;line-height:1.02;letter-spacing:-.012em}
p{margin-top:26px;font-size:28px;color:#a3aec2}
svg{flex:none}
</style>
<div class="l"><div class="w">AEGIS</div><h1>AI-native platforms for revenue, risk, and security.</h1><p>Aegis Amplify · Aegis GRC · Aegis Sentinel</p></div>
<svg width="300" height="340" viewBox="0 0 360 410" fill="none">
<defs><clipPath id="c"><path transform="scale(11.25)" d="M16 1.6 29 6.6v11.4c0 8.7-5.7 13.9-13 16.6C8.7 31.9 3 26.7 3 18V6.6L16 1.6Z"/></clipPath>
<linearGradient id="a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4d9bff" stop-opacity=".7"/><stop offset="1" stop-color="#4d9bff" stop-opacity=".08"/></linearGradient>
<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2fc987" stop-opacity=".65"/><stop offset="1" stop-color="#2fc987" stop-opacity=".06"/></linearGradient>
<linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34d1d1" stop-opacity=".62"/><stop offset="1" stop-color="#34d1d1" stop-opacity=".06"/></linearGradient></defs>
<g clip-path="url(#c)"><rect x="30" width="94" height="410" fill="url(#a)"/><rect x="124" width="112" height="410" fill="url(#g)"/><rect x="236" width="94" height="410" fill="url(#s)"/><path d="M124 0v410M236 0v410" stroke="rgba(190,206,235,.3)"/></g>
<path transform="scale(11.25)" d="M16 1.6 29 6.6v11.4c0 8.7-5.7 13.9-13 16.6C8.7 31.9 3 26.7 3 18V6.6L16 1.6Z" stroke="#c9d3e3" stroke-width=".15" stroke-linejoin="round"/>
<path d="M112 268 180 112l68 156M141 215h78" stroke="#e8edf5" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

mkdirSync('public/og', { recursive: true });
writeFileSync('dist/og-source.html', html);
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(pathToFileURL(resolve('dist/og-source.html')).href);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og/aegis.png' });
await browser.close();
console.log('wrote public/og/aegis.png');
