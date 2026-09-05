import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const dist = resolve(root, 'dist');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const entry of ['index.html', 'assets', 'data', 'docs']) {
  await cp(resolve(root, entry), resolve(dist, entry), { recursive: true });
}
console.log('Built static Amplify artifact at dist/');
