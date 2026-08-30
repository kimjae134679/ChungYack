import fs from 'node:fs';

const mustExist = [
  'public/index.html',
  'public/assets/app.css',
  'public/assets/app-v2.css',
  'public/assets/app-v3.css',
  'public/assets/app.js',
  'public/assets/app-v2-fixes.js',
  'public/assets/app-v3.js',
  'public/assets/app-icon.svg',
  'public/data/app.json',
  'public/data/sh-2026.csv',
  'public/manifest.webmanifest',
  'public/sw.js',
  'scripts/apply-android-branding.mjs',
  'capacitor.config.json',
  'package.json',
  'VERSION'
];
for (const p of mustExist) {
  if (!fs.existsSync(p) || fs.statSync(p).size === 0) throw new Error(`Missing/empty: ${p}`);
}
const data = JSON.parse(fs.readFileSync('public/data/app.json','utf8'));
const pkg = JSON.parse(fs.readFileSync('package.json','utf8'));
const version = fs.readFileSync('VERSION','utf8').trim();
if (pkg.version !== version || data.version !== version) throw new Error(`Version mismatch package=${pkg.version} data=${data.version} VERSION=${version}`);
if (!Array.isArray(data.trackingSeed) || !data.trackingSeed.length) throw new Error('trackingSeed empty');
if (data.trackingSeed.some(x => !x.id || !x.name || !x.status)) throw new Error('trackingSeed required field missing');
if (!Array.isArray(data.insights) || !data.insights.length) throw new Error('insights empty');
if (data.insights.some(x => !x.matchName || !x.type || !x.competition)) throw new Error('insight required field missing');
const csv = fs.readFileSync('public/data/sh-2026.csv','utf8');
const rows = csv.trim().split(/\r?\n/);
if (rows.length !== 80) throw new Error(`SH catalog row count expected 79, got ${rows.length-1}`);
if (!csv.includes(',59,')) throw new Error('59㎡ catalog rows missing: filters must be user-selectable, not hard-excluded');
if (!csv.includes(',29,') || !csv.includes(',39,') || !csv.includes(',49,')) throw new Error('catalog type coverage missing');
const html = fs.readFileSync('public/index.html','utf8');
for (const marker of ['청약 레이더','bottom-nav','recommendList','trackingGrid','trackingEditor','typeFilter','regionFilter','viewport-fit=cover','app-v2.css','app-v3.css','app-v2-fixes.js','app-v3.js','exportLocalBtn','importLocalBtn','취소/추적중단']) {
  if (!html.includes(marker)) throw new Error(`index marker missing: ${marker}`);
}
const js = fs.readFileSync('public/assets/app.js','utf8');
for (const marker of ['chungyack.filters.v2','chungyack.tracking.v2','localStorage','removeTracking','addCatalogToTracking','NORTH_REGIONS','__CY_HANDLE_NATIVE_BACK__']) {
  if (!js.includes(marker)) throw new Error(`JS behavior marker missing: ${marker}`);
}
const fix = fs.readFileSync('public/assets/app-v2-fixes.js','utf8');
if (!fix.includes('catalog-${id}') || !fix.includes('openTrackEditor')) throw new Error('catalog tracking stability fix missing');
const v3 = fs.readFileSync('public/assets/app-v3.js','utf8');
for (const marker of ['CY_APP_VERSION','chungyack.tracking.trash.v1','cyExportBackup','cyImportBackup','cyRestoreRemoved','되돌리기','취소/추적중단']) {
  if (!v3.includes(marker)) throw new Error(`v3 recovery marker missing: ${marker}`);
}
if (!v3.includes(`CY_APP_VERSION='${version}'`)) throw new Error('v3 displayed version does not match VERSION');
const css = fs.readFileSync('public/assets/app.css','utf8');
for (const marker of ['safe-area-inset-top','safe-area-inset-bottom','overflow-x:hidden']) {
  if (!css.includes(marker)) throw new Error(`mobile QA marker missing: ${marker}`);
}
const css3 = fs.readFileSync('public/assets/app-v3.css','utf8');
if (!css3.includes('safe-area-inset-bottom') || !css3.includes('.cy-toast')) throw new Error('v3 mobile recovery UI marker missing');
const manifest = fs.readFileSync('public/manifest.webmanifest','utf8');
if (!manifest.includes('assets/app-icon.svg')) throw new Error('manifest icon missing');
const sw = fs.readFileSync('public/sw.js','utf8');
for (const marker of ['app-v2-fixes.js','app-v3.js','app-v3.css','sh-2026.csv','app-icon.svg']) if (!sw.includes(marker)) throw new Error(`service worker asset missing: ${marker}`);
console.log(`QA OK: trackingSeed=${data.trackingSeed.length}, catalog=79, insights=${data.insights.length}, version=${version}, backup+undo=enabled`);
