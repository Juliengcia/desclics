/**
 * Petits greffons Markdown maison (sans dépendance).
 *
 * 1. remarqueAncres : « ## Titre du chapitre \\{#mon-ancre\\} » (accolades échappées en MDX) fixe l'ancre du chapitre.
 *    Les ancres sont stables : les entrées « Je veux… » et les liens y pointent.
 * 2. rehypeChapitres : chaque H2 et ce qui le suit deviennent une <section> de chapitre,
 *    pour le sommaire, la lecture à voix haute par chapitre et la progression.
 */

export function remarqueAncres() {
  return (arbre) => {
    const visiter = (n) => {
      if (n.type === 'heading') {
        const dernier = n.children[n.children.length - 1];
        if (dernier?.type === 'text') {
          const m = dernier.value.match(/\s*\{#([a-z0-9-]+)\}\s*$/);
          if (m) {
            dernier.value = dernier.value.slice(0, m.index);
            n.data = { ...(n.data ?? {}), hProperties: { ...(n.data?.hProperties ?? {}), id: m[1] } };
          }
        }
      }
      n.children?.forEach(visiter);
    };
    visiter(arbre);
  };
}

export function rehypeChapitres() {
  return (arbre) => {
    const enfants = arbre.children;
    const sortie = [];
    let courant = null;
    for (const n of enfants) {
      if (n.type === 'element' && n.tagName === 'h2') {
        const id = n.properties?.id;
        courant = {
          type: 'element', tagName: 'section',
          properties: { className: ['chapitre'], id: id ? `chapitre-${id}` : undefined, 'aria-labelledby': id, 'data-chapitre': id ?? '' },
          children: [n],
        };
        sortie.push(courant);
      } else if (courant) {
        courant.children.push(n);
      } else {
        sortie.push(n);
      }
    }
    arbre.children = sortie;
  };
}
