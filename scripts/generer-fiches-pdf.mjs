/**
 * Fiches Bristol en PDF (A5, texte sélectionnable), générées à chaque build
 * depuis les métadonnées des modules : elles restent toujours à jour.
 * 1. lit les gabarits dist/fiches/a5/** (construits par Astro) ;
 * 2. les imprime en PDF avec Chromium (Playwright) dans dist/fiches/pdf/ ;
 * 3. supprime les gabarits de dist/ (ils ne sont pas des pages du site).
 * SANS_PDF=1 : passe cette étape (aperçu rapide sans Playwright).
 */
import { createRequire } from 'node:module';
import { mkdir, readdir, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { demarrer, BASE } from './serveur.mjs';

const dossierA5 = 'dist/fiches/a5';
const sortie = 'dist/fiches/pdf';
if (process.env.SANS_PDF === '1') {
  await rm(dossierA5, { recursive: true, force: true });
  console.log('Fiches PDF : étape passée (SANS_PDF=1).');
  process.exit(0);
}
let chromium;
try { ({ chromium } = createRequire(import.meta.url)('playwright')); }
catch {
  console.error('Fiches PDF : Playwright est nécessaire (npm install --no-save playwright && npx playwright install chromium), ou lancez avec SANS_PDF=1.');
  process.exit(1);
}

// Gabarits : dist/fiches/a5/<rubrique>/index.html et dist/fiches/a5/<rubrique>/<module>/index.html
const gabarits = [];
for (const r of await readdir(dossierA5)) {
  if (!(await stat(join(dossierA5, r))).isDirectory()) continue;
  gabarits.push({ url: `${r}/`, fichier: `${r}.pdf` });
  for (const m of await readdir(join(dossierA5, r))) {
    if ((await stat(join(dossierA5, r, m))).isDirectory()) gabarits.push({ url: `${r}/${m}/`, fichier: `${r}-${m}.pdf` });
  }
}

await mkdir(sortie, { recursive: true });
const serveur = await demarrer(4325);
const navigateur = await chromium.launch();
const page = await navigateur.newPage();
for (const g of gabarits) {
  await page.goto(`http://localhost:4325${BASE}/fiches/a5/${g.url}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: join(sortie, g.fichier), format: 'A5', printBackground: true, preferCSSPageSize: true, tagged: true });
}
await navigateur.close();
serveur.close();
await rm(dossierA5, { recursive: true, force: true });
console.log(`Fiches PDF : ${gabarits.length} fichiers dans ${sortie}/.`);
