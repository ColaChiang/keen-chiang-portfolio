import fs from 'node:fs';
import path from 'node:path';
const root = import.meta.dirname || path.dirname(new URL(import.meta.url).pathname);
const dist = path.join(root, 'dist');
fs.rmSync(dist, {force: true, recursive: true});
fs.mkdirSync(dist, {recursive: true});
for (const file of ['index.html', 'styles.css', 'responsive.css', 'data.js', 'cms.js', 'script.js']) {
  fs.copyFileSync(path.join(root, file), path.join(dist, file));
}
fs.cpSync(path.join(root, 'assets'), path.join(dist, 'assets'), {recursive: true});
const configured = fs.readFileSync(path.join(root, 'cms-config.js'), 'utf8');
const pid = process.env.SANITY_PROJECT_ID?.trim();
const dataset = process.env.SANITY_DATASET?.trim() || 'production';
const apiVersion = '2025-02-19';
const config = pid ? `window.SANITY_CONFIG = ${JSON.stringify({projectId:pid,dataset,apiVersion})};\n` : configured;
fs.writeFileSync(path.join(dist, 'cms-config.js'), config);
console.log(`Built ${dist}. Sanity: ${pid ? pid + '/' + dataset : 'not configured (local preview)'}`);
