// One-off generator for public/og/aegis.png (1200x630). Run after `npm run build`:
//   node scripts/generate-og.mjs
// Renders the approved lockup and tagline on the brand's light blue/silver ground, using the
// site's own self-hosted Geist file. The PNG is committed; re-run when the identity changes.
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { lockupSvg } from '../src/brand/aegis.mjs';

const built = readFileSync('dist/index.html', 'utf8');
const face = [...built.matchAll(/@font-face\{([^}]*)\}/g)]
  .map((m) => m[1])
  .find((f) => /font-family:"?Geist-/.test(f) && !/fallback/.test(f) && /\.woff2/.test(f));
const src = face?.match(/url\(["']?([^"')]+\.woff2)/);
if (!src) throw new Error('Geist font not found in dist; run npm run build first');
const fontUrl = pathToFileURL(resolve('dist' + src[1])).href;

const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:G;src:url(${fontUrl});font-weight:100 900}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;font-family:G;color:#364055;overflow:hidden;display:grid;place-items:center;
 background:
  linear-gradient(112deg,transparent 36%,rgba(122,167,255,.2) 46%,rgba(186,195,210,.3) 51%,transparent 61%),
  linear-gradient(112deg,transparent 18%,rgba(30,107,255,.08) 28%,transparent 40%),
  linear-gradient(180deg,#f4f7fb,#fff)}
.c{display:grid;gap:44px;justify-items:center}
.t{display:grid;gap:12px;text-align:center;text-transform:uppercase;letter-spacing:.4em;font-weight:500;font-size:26px;line-height:1.2}
.t span{margin-right:-.4em}
em{font-style:normal;font-weight:600;background:linear-gradient(90deg,#1252d6,#00a37b);-webkit-background-clip:text;background-clip:text;color:transparent}
</style><div class="c">${lockupSvg({ height: 190 })}<p class="t"><span>Intelligence for</span><span>A <em>Stronger</em> Tomorrow</span></p></div>`;

mkdirSync('public/og', { recursive: true });
writeFileSync('dist/og-source.html', html);
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(pathToFileURL(resolve('dist/og-source.html')).href);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og/aegis.png' });
await browser.close();
console.log('wrote public/og/aegis.png');
