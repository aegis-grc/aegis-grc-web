// Writes the static brand assets from the single source of truth in src/brand/aegis.mjs.
//   node scripts/generate-brand.mjs
// Outputs (committed): public/brand/*.svg, public/favicon.svg, public/favicon-32.png,
// public/apple-touch-icon.png, public/brand/aegis-mark-512.png
// The social image is generated separately by scripts/generate-og.mjs (it needs the built fonts).
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { lockupSvg, markSvg } from '../src/brand/aegis.mjs';

mkdirSync('public/brand', { recursive: true });
const files = {
  'public/brand/aegis-logo.svg': lockupSvg({ height: 120 }),
  'public/brand/aegis-logo-dark.svg': lockupSvg({ dark: true, height: 120 }),
  'public/brand/aegis-logo-mono.svg': lockupSvg({ mono: true, height: 120 }),
  'public/brand/aegis-mark.svg': markSvg({ height: 240 }),
  'public/brand/aegis-mark-mono.svg': markSvg({ mono: true, height: 240 }),
  'public/favicon.svg': markSvg({ simple: true, height: 64 }),
};
for (const [path, svg] of Object.entries(files)) writeFileSync(path, svg);

const browser = await chromium.launch({ channel: 'chrome' });
async function png(svg, out, size, background) {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  const inner = Math.round(size * (background ? 0.66 : 0.94));
  const html = `<style>html,body{margin:0;width:${size}px;height:${size}px;display:grid;place-items:center;background:${background ?? 'transparent'}}svg{width:${inner}px;height:${inner}px}</style>${svg.replace(/ width="\d+" height="\d+"/, '')}`;
  await page.setContent(html);
  await page.screenshot({ path: out, omitBackground: !background });
  await page.close();
}
await png(markSvg({ simple: true }), 'public/favicon-32.png', 32);
await png(markSvg(), 'public/apple-touch-icon.png', 180, '#ffffff');
await png(markSvg(), 'public/brand/aegis-mark-512.png', 512);
await browser.close();
console.log('wrote', Object.keys(files).length, 'SVGs and 3 PNGs');
