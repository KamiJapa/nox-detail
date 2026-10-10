import { createRequire } from 'node:module';
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
const esbuild = require('esbuild');
await mkdir(path.join(root, 'css'), { recursive: true });
const input = path.join(root, 'src/styles.css');
const result = await postcss([tailwind({ base: root, optimize: { minify: true } })]).process(await readFile(input, 'utf8'), { from: input, to: path.join(root, 'css/styles.css') });
await writeFile(path.join(root, 'css/styles.css'), result.css);
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const icons = [...new Set([...html.matchAll(/data-lucide="([a-z0-9-]+)"/g)].map(match => match[1].split('-').map(part => part[0].toUpperCase() + part.slice(1)).join('')))];
await esbuild.build({
  stdin: { contents: `import { createIcons, ${icons.join(',')} } from 'lucide'; window.lucide = { createIcons: (options) => createIcons({ ...options, icons: { ${icons.join(',')} } }) };`, resolveDir: root },
  bundle: true, minify: true, format: 'iife', target: ['es2020'],
  legalComments: 'inline', outfile: path.join(root, 'assets/vendor/lucide.min.js')
});
await esbuild.build({ entryPoints: [path.join(root, 'js/app.js')], minify: true, target: ['es2020'], outfile: path.join(root, 'js/app.min.js') });
// Libraries are checked in as local production assets; rebuild GSAP when installed.
for (const name of ['gsap.min.js', 'ScrollTrigger.min.js']) {
  await copyFile(require.resolve(`gsap/dist/${name}`), path.join(root, 'assets/vendor', name));
}
console.log(`Production CSS: ${Buffer.byteLength(result.css)} bytes. Lucide: ${icons.length} icons. Local GSAP refreshed.`);
