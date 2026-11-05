/** Préfixe une adresse interne avec la base du site (GitHub Pages : /desclics/). */
export function lien(chemin = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const propre = chemin.replace(/^\//, '');
  if (!propre) return `${base}/`;
  const [sansAncre, ancre] = propre.split('#');
  const avecSlash = /\.[a-z0-9]+$/i.test(sansAncre) || sansAncre.endsWith('/') ? sansAncre : `${sansAncre}/`;
  return `${base}/${avecSlash}${ancre ? `#${ancre}` : ''}`;
}
