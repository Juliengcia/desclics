/** Petit serveur statique pour tester le site construit (dist/) sous son adresse de base. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif',
  '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json',
  '.pf_meta': 'application/octet-stream', '.pf_index': 'application/octet-stream', '.pf_fragment': 'application/octet-stream', '.pagefind': 'application/octet-stream', '.wasm': 'application/wasm' };

export const BASE = (process.env.BASE_PATH ?? '/desclics').replace(/\/$/, '');

export function demarrer(port = 4321, dossier = 'dist') {
  const serveur = createServer(async (req, res) => {
    let chemin = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (!chemin.startsWith(`${BASE}/`) && chemin !== BASE) { res.writeHead(404); return res.end(); }
    chemin = chemin.slice(BASE.length) || '/';
    let fichier = normalize(join(dossier, chemin));
    try {
      if ((await stat(fichier)).isDirectory()) fichier = join(fichier, 'index.html');
      const contenu = await readFile(fichier);
      res.writeHead(200, { 'Content-Type': TYPES[extname(fichier)] ?? 'application/octet-stream' });
      res.end(contenu);
    } catch {
      const page404 = await readFile(join(dossier, '404.html')).catch(() => '');
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(page404);
    }
  });
  return new Promise((ok) => serveur.listen(port, () => ok(serveur)));
}

export async function pagesDuSite(dossier = 'dist') {
  const { readdir } = await import('node:fs/promises');
  const pages = [];
  async function parcourir(d, prefixe) {
    for (const e of await readdir(d, { withFileTypes: true })) {
      if (e.isDirectory()) { if (!['pagefind', '_astro'].includes(e.name)) await parcourir(join(d, e.name), `${prefixe}${e.name}/`); }
      else if (e.name === 'index.html') pages.push(prefixe);
    }
  }
  await parcourir(dossier, '/');
  return pages.sort();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await demarrer(Number(process.env.PORT ?? 4321));
  console.log(`Site servi sur http://localhost:${process.env.PORT ?? 4321}${BASE}/`);
}
