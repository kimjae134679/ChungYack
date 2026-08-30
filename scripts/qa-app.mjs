import fs from 'node:fs';

const mustExist = [
  'public/index.html',
  'public/assets/app.css',
  'public/assets/app.js',
  'public/data/app.json',
  'public/manifest.webmanifest',
  'public/sw.js',
  'capacitor.config.json',
  'VERSION'
];
for (const p of mustExist) {
  if (!fs.existsSync(p) || fs.statSync(p).size === 0) throw new Error(`Missing/empty: ${p}`);
}
const data = JSON.parse(fs.readFileSync('public/data/app.json','utf8'));
if (!Array.isArray(data.tracking) || !data.tracking.length) throw new Error('tracking empty');
if (!Array.isArray(data.recommendations) || !data.recommendations.length) throw new Error('recommendations empty');
if (data.recommendations.some(x => Number(x.type) === 59)) throw new Error('59㎡ must be excluded from realistic recommendation board');
const orders = data.recommendations.map(x => x.order);
if (new Set(orders).size !== orders.length) throw new Error('duplicate recommendation order');
if (data.recommendations.some(x => !x.map || !x.reason || !x.competition)) throw new Error('recommendation required field missing');
const html = fs.readFileSync('public/index.html','utf8');
for (const marker of ['청약 레이더','bottom-nav','recommendList','trackingGrid','viewport-fit=cover']) {
  if (!html.includes(marker)) throw new Error(`index marker missing: ${marker}`);
}
const css = fs.readFileSync('public/assets/app.css','utf8');
for (const marker of ['safe-area-inset-top','safe-area-inset-bottom','overflow-x:hidden']) {
  if (!css.includes(marker)) throw new Error(`mobile QA marker missing: ${marker}`);
}
console.log(`QA OK: tracking=${data.tracking.length}, recommendations=${data.recommendations.length}, version=${data.version}`);
