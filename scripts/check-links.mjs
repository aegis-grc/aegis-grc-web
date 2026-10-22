// Dependency-free link checker for the built site (run `npm run build` first).
// Verifies every internal href/src resolves to a built file and every #fragment
// points at an id that exists on the target page. External links are listed, not fetched.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const dist = resolve('dist');
const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const pages = walk(dist).filter((f) => f.endsWith('.html'));
const idsCache = new Map();
const idsOf = (file) => {
  if (!idsCache.has(file)) {
    const html = readFileSync(file, 'utf8');
    idsCache.set(file, new Set([...html.matchAll(/\sid=["']([^"']+)["']/g)].map((m) => m[1])));
  }
  return idsCache.get(file);
};
const toFile = (path) => {
  const clean = path.replace(/[?#].*$/, '');
  const candidates = [
    join(dist, clean),
    join(dist, clean, 'index.html'),
    join(dist, clean + '.html'),
  ];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile());
};

const errors = [];
const external = new Set();
let checked = 0;

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const here = '/' + file.slice(dist.length + 1).replace(/index\.html$/, '');
  for (const m of html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)) {
    const url = m[1];
    if (/^(mailto:|tel:|data:|javascript:)/.test(url)) continue;
    if (/^https?:\/\//.test(url)) {
      external.add(url);
      continue;
    }
    checked++;
    const [pathPart, hash] = [url.split('#')[0], url.includes('#') ? url.split('#')[1] : ''];
    const targetPath = pathPart === '' ? here : pathPart;
    const target = toFile(targetPath);
    if (!target) {
      errors.push(`${here}: broken link ${url}`);
      continue;
    }
    if (hash && target.endsWith('.html') && !idsOf(target).has(hash)) {
      errors.push(`${here}: missing anchor #${hash} on ${targetPath || here}`);
    }
  }
}

console.log(
  `${pages.length} pages, ${checked} internal links checked, ${external.size} external URLs`,
);
if (external.size) console.log('external:', [...external].join(', '));
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('no broken internal links or anchors');
