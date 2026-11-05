import { getCollection, type CollectionEntry } from 'astro:content';
import { rubriques, type Rubrique } from '../data/rubriques';

export type Module = CollectionEntry<'modules'>;

export interface EntreeModule {
  rubrique: Rubrique;
  slug: string;
  titre: string;
  publie: boolean;
  entree?: Module;
  chemin: string;
}

let cache: EntreeModule[] | null = null;

/** Tous les modules prévus, dans l'ordre de src/data/rubriques.ts, avec leur état. */
export async function tousLesModules(): Promise<EntreeModule[]> {
  if (cache) return cache;
  const contenus = await getCollection('modules');
  const parId = new Map(contenus.map((m) => [m.id, m]));

  // Contrôle de cohérence : tout fichier MDX doit être déclaré dans rubriques.ts.
  for (const m of contenus) {
    const r = rubriques.find((x) => x.slug === m.data.rubrique);
    if (!r?.modules.some((p) => p.slug === m.data.identifiant) || m.id !== `${m.data.rubrique}/${m.data.identifiant}`) {
      throw new Error(`Module « ${m.id} » : il doit être rangé dans src/content/modules/${m.data.rubrique}/${m.data.identifiant}.mdx et déclaré dans src/data/rubriques.ts.`);
    }
  }

  cache = rubriques.flatMap((rubrique) =>
    rubrique.modules.map((p) => {
      const entree = parId.get(`${rubrique.slug}/${p.slug}`);
      return {
        rubrique,
        slug: p.slug,
        titre: entree?.data.titre ?? p.titre,
        publie: Boolean(entree),
        entree,
        chemin: `${rubrique.slug}/${p.slug}`,
      };
    }),
  );
  return cache;
}

export async function modulesPublies() {
  return (await tousLesModules()).filter((m) => m.publie);
}

export async function modulesDeRubrique(slug: string) {
  return (await tousLesModules()).filter((m) => m.rubrique.slug === slug);
}

/** Module précédent et suivant parmi les modules publiés (ordre global du site). */
export async function voisins(chemin: string) {
  const publies = await modulesPublies();
  const i = publies.findIndex((m) => m.chemin === chemin);
  return { precedent: i > 0 ? publies[i - 1] : undefined, suivant: i >= 0 && i < publies.length - 1 ? publies[i + 1] : undefined };
}

export async function trouverModule(chemin: string) {
  return (await tousLesModules()).find((m) => m.chemin === chemin);
}
