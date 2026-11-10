# Journal des modifications

Chaque modification, datée, la plus récente en haut.

## 2026-11-10

- **Pages transversales** prévues dans l'arborescence (§ 4 de `docs/01-etude-et-arborescence.md`) :
  - **Parcours « Je viens de… »** (`/parcours`) : acheter un smartphone, avoir Internet à la maison, recevoir un SMS bizarre, acheter un ordinateur. Données dans `src/data/parcours.ts` ; chaque étape renvoie à un chapitre d'un module publié (le build échoue sinon).
  - **Se faire aider près de chez vous** (`/aide-pres-de-chez-vous`) : France Services, conseillers numériques, médiathèques et mairies, Aidants Connect, aide aux victimes, préparation du rendez-vous.
  - **Fiches Bristol** (`/fiches`) : toutes les fiches d'une rubrique sur une page, une fiche par page A5 à l'impression. `FicheBristol` accepte un identifiant pour en afficher plusieurs.
  - **Quoi de neuf ?** (`/nouveautes`) : toutes les nouveautés, groupées par date.
- Liens vers ces pages : accueil (section « Je viens de… », carte d'aide, « Toutes les nouveautés »), pied de page, menu mobile, plan du site.
- Vérifications : 129 pages, 0 lien interne cassé, 0 erreur axe-core (clair et sombre), aucun défilement horizontal sur les nouvelles pages.

## 2026-11-09

- **Toutes les rubriques sont rédigées : 89 modules.** Ajout de Smartphone (10), Sécurité et confiance (10), Communiquer (7), Démarches en ligne (10), Internet et navigation (6), Argent et banque (5), Vie pratique (12), Bureautique (6), Réseaux sociaux et vidéo (4), Intelligence artificielle (5, dont « Actualités IA » datée), J'ai un problème (7).
- **Atelier** : simulateur de faux SMS et e-mails (module « Reconnaître une arnaque »).
- **Glossaire** : 97 mots.
- **Direction artistique v2** : deux typos (Bricolage Grotesque + Atkinson Hyperlegible Next), pastels par rubrique, boutons en pilule, cartes plates, séparateurs hachurés, bande d'engagements, navigation en pilule (références 05 à 09 dans `refs/`).
- Vérifications : 109 pages, 0 lien interne cassé, 0 erreur axe-core (clair et sombre).

## 2026-11-05

- **Rubrique « Comprendre l'ordinateur » terminée** (7 modules) : ajout de « De quoi est fait un ordinateur ? », « Windows, macOS, Linux », « Ranger et retrouver ses fichiers », « Mon ordinateur est bloqué », « Brancher ses appareils », « Entretenir son ordinateur ». 3 schémas (ordinateur, dossiers, prises), une frise, 16 mots ajoutés au glossaire (57 au total), 2 entrées « Je veux… ».
- Mise en ligne sur GitHub Pages (https://juliengcia.github.io/desclics/).
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
