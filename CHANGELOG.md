# Journal des modifications

Chaque modification, datée, la plus récente en haut.

## 2026-11-05

- **Module modèle** : « Le clavier et les raccourcis » (rubrique Comprendre l'ordinateur) : 7 chapitres, schéma annoté du clavier, onglets Windows / Mac, atelier copier-coller, testeur de touches, quiz facultatif, fiche Bristol, sources datées.
- **Socle technique** : Astro 5 (site statique, MDX), React pour les ateliers seulement, schéma de métadonnées obligatoires, organisation générée depuis `src/data/rubriques.ts` (12 rubriques, 89 modules prévus).
- **Navigation** : en-tête avec méga-menu, menu mobile repliable, fil d'Ariane, sommaire de chapitres, module précédent / suivant, plan du site, page 404.
- **Recherche** : Pagefind (index statique, instantané, chapitres et glossaire), recherche à la voix si le navigateur la propose.
- **Glossaire** (41 mots) et **traducteur de jargon**.
- **Accessibilité** : panneau (taille du texte, contraste élevé, dyslexie, règle de lecture, loupe, grand curseur, animations, lecture simple, lecture à voix haute, choix de l'appareil), lien d'évitement, focus visible, déclaration d'accessibilité.
- **Thème** clair / sombre, PWA (installable, lisible hors connexion), SEO (titres, méta-descriptions, Open Graph, sitemap, robots.txt, données structurées).
- **Qualité** : scripts de vérification (liens, axe-core, responsive 360 → 1920 px et texte à 200 %), GitHub Actions (vérifications sur chaque branche, publication sur GitHub Pages depuis `main`).
- **Pages légales** : mentions légales (identité de l'éditeur à compléter), confidentialité, accessibilité.
- Références visuelles rangées dans `refs/`. Nom retenu : Desclics.
- Étape 2 : trois pistes d'identité (`docs/02-identites.html`).
- Étape 1 : étude des sites existants et arborescence validée (`docs/01-etude-et-arborescence.md`).
