import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { rubriques } from './data/rubriques';

const slugsRubriques = rubriques.map((r) => r.slug) as [string, ...string[]];

/**
 * Métadonnées obligatoires d'un module. Le build échoue si l'une manque
 * ou ne respecte pas les règles (longueur du titre SEO, etc.).
 * L'ORDRE des modules n'est pas ici : il est fixé dans src/data/rubriques.ts
 * (source unique, pour qu'un déplacement ne demande qu'une ligne).
 */
const modules = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/modules' }),
  schema: z.object({
    identifiant: z.string().regex(/^[a-z0-9-]+$/, 'minuscules, chiffres et tirets seulement'),
    titre: z.string().min(5),
    rubrique: z.enum(slugsRubriques),
    resume: z.string().min(20).max(200),
    duree: z.number().int().min(2).max(20).describe('Temps de lecture en minutes'),
    niveau: z.enum(['Premiers pas', 'Intermédiaire', 'Avancé']),
    objectifs: z.array(z.string()).min(2).max(6),
    motsCles: z.array(z.string()).min(3),
    titreSeo: z.string().max(60, 'Le titre SEO doit faire moins de 60 caractères'),
    metaDescription: z.string().min(110).max(170, 'Méta-description : environ 150 caractères'),
    bristol: z.array(z.string()).min(3).max(8),
    sources: z.array(z.object({ titre: z.string(), url: z.string().url(), editeur: z.string() })).min(1),
    verifieLe: z.coerce.date(),
    appareils: z.array(z.enum(['windows', 'mac', 'android', 'iphone'])).default([]),
    pourAidant: z.array(z.string()).default([]),
    liesA: z.array(z.string().regex(/^[a-z0-9-]+\/[a-z0-9-]+$/)).max(4).default([]),
    falc: z.boolean().default(false),
  }),
});

export const collections = { modules };
