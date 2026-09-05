import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const dist = resolve(root, 'dist');
const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const configuredBasePath = process.env.TRACKER_BASE_PATH ?? packageJson.config.trackerBasePath;
const canonicalUrl = process.env.TRACKER_CANONICAL_URL ?? packageJson.config.trackerCanonicalUrl;
const basePath = `/${configuredBasePath.split('/').filter(Boolean).join('/')}`;
const baseHref = basePath === '/' ? '/' : `${basePath}/`;
const output = resolve(dist, `.${basePath}`);

if (output !== dist && !output.startsWith(`${dist}\\`) && !output.startsWith(`${dist}/`)) {
  throw new Error(`Tracker base path resolves outside dist: ${basePath}`);
}

await rm(dist, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of ['assets', 'data', 'docs']) {
  await cp(resolve(root, entry), resolve(output, entry), { recursive: true });
}

const indexHtml = (await readFile(resolve(root, 'index.html'), 'utf8'))
  .replace(/(<meta name="application-base-path" content=")[^"]+(" \/>)/, `$1${basePath}$2`)
  .replace(/(<meta property="og:url" content=")[^"]+(" \/>)/, `$1${canonicalUrl}$2`)
  .replace(/(<base href=")[^"]+(" \/>)/, `$1${baseHref}$2`)
  .replace(/(<link rel="canonical" href=")[^"]+(" \/>)/, `$1${canonicalUrl}$2`);
await writeFile(resolve(output, 'index.html'), indexHtml);

console.log(`Built static tracker artifact at dist${basePath}/`);
