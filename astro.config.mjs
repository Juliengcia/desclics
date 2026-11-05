// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { remarqueAncres, rehypeChapitres } from './src/lib/plugins-markdown.mjs';

// Adresse publique : GitHub Pages (https://<compte>.github.io/desclics/).
// Si un nom de domaine est acheté plus tard, changer SITE et mettre BASE à '/'.
const SITE = process.env.SITE_URL ?? 'https://juliengcia.github.io';
const BASE = process.env.BASE_PATH ?? '/desclics';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  integrations: [mdx(), react(), sitemap()],
  build: { format: 'directory' },
  markdown: {
    remarkPlugins: [remarqueAncres],
    rehypePlugins: [rehypeChapitres],
  },
  // Anciennes adresses -> nouvelles (à compléter à chaque déplacement de module).
  redirects: {},
});
