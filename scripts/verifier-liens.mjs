/**
 * Vérifie les liens internes et les ancres de toutes les pages construites (dist/).
 * Les liens externes ne sont pas testés ici (pas de réseau en intégration continue fiable) :
 * ils sont listés dans rapports/liens-externes.txt pour une vérification manuelle trimestrielle.
 */
import { readFile, mkdir, writeFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { BASE, pagesDuSite } from './serveur.mjs';

const pages = await pagesDuSite();
const ids = new Map();
const html = new Map();
for (const p of pages) {
  const contenu = await readFile(join('dist', p, 'index.html'), 'utf8');
  html.set(p, contenu);
  ids.set(p, new Set([...contenu.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}
const erreurs = [];
const externes = new Set();
for (const [page, contenu] of html) {
  for (const [, href] of contenu.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    if (/^(mailto:|tel:)/.test(href)) continue;
    if (/^https?:/.test(href)) { externes.add(href); continue; }
    const url = new URL(href.replaceAll('&amp;', '&'), `http://x${BASE}${page}`);
    if (!url.pathname.startsWith(`${BASE}/`)) { erreurs.push(`${page} → ${href} : hors de la base ${BASE}/`); continue; }
    const cible = url.pathname.slice(BASE.length);
    if (cible.endsWith('/')) {
      if (!ids.has(cible)) { erreurs.push(`${page} → ${href} : page introuvable`); continue; }
      const ancre = decodeURIComponent(url.hash.slice(1));
      if (ancre && !ids.get(cible).has(ancre)) erreurs.push(`${page} → ${href} : ancre « ${ancre} » introuvable`);
    } else {
      try { await stat(join('dist', cible)); } catch { erreurs.push(`${page} → ${href} : fichier introuvable`); }
    }
  }
}
await mkdir('rapports', { recursive: true });
await writeFile('rapports/liens-externes.txt', [...externes].sort().join('\n') + '\n');
console.log(`${pages.length} pages vérifiées, ${externes.size} liens externes listés dans rapports/liens-externes.txt.`);
if (erreurs.length) { console.error(`\n${erreurs.length} lien(s) cassé(s) :\n- ${erreurs.join('\n- ')}`); process.exit(1); }
console.log('Aucun lien interne cassé.');
