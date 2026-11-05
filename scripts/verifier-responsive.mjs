/**
 * Responsive : chaque page à 360, 768, 1280 et 1920 px (portrait et paysage pour les petits écrans),
 * puis avec le texte agrandi à 200 %. Échec en cas de défilement horizontal.
 * Option CAPTURES=1 : enregistre des captures dans rapports/responsive/.
 */
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { demarrer, pagesDuSite, BASE } from './serveur.mjs';
const { chromium } = createRequire(import.meta.url)('playwright');

const formats = [
  { nom: '360-portrait', width: 360, height: 780 }, { nom: '360-paysage', width: 780, height: 360 },
  { nom: '768-portrait', width: 768, height: 1024 }, { nom: '768-paysage', width: 1024, height: 768 },
  { nom: '1280', width: 1280, height: 800 }, { nom: '1920', width: 1920, height: 1080 },
];
const serveur = await demarrer(4323);
const navigateur = await chromium.launch();
const pages = await pagesDuSite();
const captures = process.env.CAPTURES === '1';
if (captures) await mkdir('rapports/responsive', { recursive: true });
const echecs = [];
for (const f of formats) {
  for (const zoom of [1, 2]) {
    if (zoom === 2 && f.width > 1280) continue;
    const ctx = await navigateur.newContext({ viewport: { width: f.width, height: f.height } });
    const page = await ctx.newPage();
    for (const p of pages) {
      await page.goto(`http://localhost:4323${BASE}${p}`, { waitUntil: 'networkidle' });
      if (zoom === 2) await page.evaluate(() => { document.documentElement.style.setProperty('--echelle-texte', '2'); document.documentElement.setAttribute('data-grand-texte', ''); });
      const debord = await page.evaluate(() => {
        const d = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        if (d <= 1) return null;
        const fautifs = [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > document.documentElement.clientWidth + 1 && !e.closest('.tableau-defilant, .figure-image, .peinture, [hidden], dialog:not([open])'))
          .slice(0, 3).map((e) => e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.split(' ')[0] : ''));
        return `${d}px (${fautifs.join(', ')})`;
      });
      if (debord) echecs.push(`${p} à ${f.nom}${zoom === 2 ? ', texte 200 %' : ''} : défilement horizontal de ${debord}`);
      if (captures && zoom === 1 && ['360-portrait', '1280'].includes(f.nom)) {
        await page.screenshot({ path: `rapports/responsive/${p.replaceAll('/', '_') || 'accueil'}-${f.nom}.png`, fullPage: true });
      }
    }
    await ctx.close();
  }
}
await navigateur.close();
serveur.close();
console.log(`${pages.length} pages × ${formats.length} formats (+ texte à 200 %) vérifiées.`);
if (echecs.length) { console.error(`\n${echecs.length} problème(s) :\n- ${echecs.join('\n- ')}`); process.exit(1); }
console.log('Aucun défilement horizontal.');
