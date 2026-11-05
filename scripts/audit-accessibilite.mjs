/**
 * Audit automatique d'accessibilité (axe-core, règles WCAG 2.0 / 2.1 / 2.2 A et AA) de toutes les pages,
 * en mode clair et en mode sombre. Échec si une violation est trouvée.
 * Rappel : un audit automatique ne remplace pas un audit RGAA complet.
 */
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { demarrer, pagesDuSite, BASE } from './serveur.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const axe = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');

const serveur = await demarrer(4322);
const navigateur = await chromium.launch();
const pages = await pagesDuSite();
let total = 0;
for (const theme of ['light', 'dark']) {
  const ctx = await navigateur.newContext({ colorScheme: theme, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(`http://localhost:4322${BASE}${p}`, { waitUntil: 'networkidle' });
    await page.addScriptTag({ content: axe });
    const res = await page.evaluate(async () => {
      // @ts-ignore
      return await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } });
    });
    for (const v of res.violations) {
      total += v.nodes.length;
      console.error(`[${theme}] ${p} — ${v.id} (${v.impact}) : ${v.help}`);
      for (const n of v.nodes.slice(0, 3)) console.error(`    ${n.target.join(' ')}  ${n.failureSummary?.split('\n')[1] ?? ''}`);
    }
  }
  await ctx.close();
}
await navigateur.close();
serveur.close();
console.log(`${pages.length} pages × 2 thèmes auditées : ${total} problème(s).`);
process.exit(total ? 1 : 0);
