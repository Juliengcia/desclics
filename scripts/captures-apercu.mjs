/** Captures d'aperçu (pour le compte rendu) : accueil et module modèle, ordinateur et mobile, clair et sombre. */
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { demarrer, BASE } from './serveur.mjs';
const { chromium } = createRequire(import.meta.url)('playwright');
await mkdir('docs/apercus', { recursive: true });
const s = await demarrer(4331);
const b = await chromium.launch();
const cas = [
  ['accueil-ordinateur-clair', '/', 1280, 'light', 2, true],
  ['accueil-mobile-clair', '/', 390, 'light', 2, true],
  ['module-ordinateur-clair', '/ordinateur/clavier-raccourcis/', 1280, 'light', 1, true],
  ['module-mobile-sombre', '/ordinateur/clavier-raccourcis/', 390, 'dark', 2, false],
  ['megamenu-ordinateur', '/', 1280, 'light', 1, false, 'mega'],
  ['accessibilite-panneau', '/ordinateur/clavier-raccourcis/', 1280, 'light', 1, false, 'a11y'],
];
for (const [nom, chemin, largeur, theme, dsf, pleine, action] of cas) {
  const p = await b.newPage({ viewport: { width: largeur, height: largeur < 500 ? 844 : 860 }, colorScheme: theme, deviceScaleFactor: dsf });
  await p.goto(`http://localhost:4331${BASE}${chemin}`, { waitUntil: 'networkidle' });
  await p.waitForTimeout(400);
  if (action === 'mega') await p.click('[data-ouvre="mega-menu"]');
  if (action === 'a11y') await p.click('[data-ouvre-a11y]');
  await p.waitForTimeout(300);
  await p.screenshot({ path: `docs/apercus/${nom}.png`, fullPage: pleine });
  await p.close();
}
await b.close(); s.close();
console.log('Captures dans docs/apercus/.');
