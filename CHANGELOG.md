# Journal des modifications

Chaque modification, datée, la plus récente en haut.

## 2026-11-10 (retours de Julien sur la version en ligne)

- **En-tête** : fixe et toujours visible, il s'affine quand on descend. Le méga-menu et le menu mobile s'ouvrent par-dessus la page (la hauteur ne bouge plus). Chaque rubrique y montre son nombre de modules, 3 modules et « Voir les X modules ». Nouvelle icône étoile : la liste des favoris.
- **Recherche** : une seule barre sur l'accueil (celle de l'en-tête n'apparaît qu'une fois la grande recherche dépassée). Ailleurs, la recherche de l'en-tête est un vrai champ « Que cherchez-vous ? ». Résultats dans une liste déroulante par-dessus la page : 4 résultats (avec le chapitre visé) puis « Voir tous les résultats », flèches du clavier, Entrée, Échap. Dictée : messages d'erreur clairs (micro bloqué, pas de connexion…), bouton masqué si le navigateur ne sait pas dicter (Firefox, Brave, page non sécurisée).
- **Accueil** : première section en pleine hauteur, contenu centré, sans l'argument « gratuit, sans compte ». Petites illustrations animées (coupées par « Réduire les animations »). Nouvelles sections « Comment ça marche », « Les questions les plus posées » (6, données structurées FAQ), « Alerte arnaques » (sources Cybermalveillance.gouv.fr datées, `src/data/alertes.ts`). « Quoi de neuf » : les 3 derniers modules ajoutés ou mis à jour, datés. Bandeau d'information refermable (fermeture mémorisée, texte dans `src/data/site.ts`).
- **Cartes** : nombre de modules sur chaque rubrique ; seul le titre est un lien, le texte se sélectionne et se copie, un clic ailleurs sur la carte ouvre la page. Page de rubrique : bascule grille / liste mémorisée.
- **Favoris** : bouton « Ajouter aux favoris » sur chaque page, liste dans l'en-tête et sur `/favoris/`, sans compte (stockés dans le navigateur, avec la phrase d'avertissement).
- **Mon appareil** : choix multiple (Windows, Mac, Android, iPhone, un, plusieurs ou tous), système détecté automatiquement par défaut. Les blocs par appareil affichent les versions choisies (Windows + Mac = les deux) ; un sujet mobile lu sur ordinateur montre Android et iPhone, et l'inverse.
- **Accessibilité** : texte réductible jusqu'à 80 %. Liens externes dans un nouvel onglet, avec icône et texte caché « s'ouvre dans un nouvel onglet ». Infobulles sur les éléments cliquables, au survol et au focus clavier (refermables avec Échap).
- **Modules** : page jusqu'à 1440 px, paragraphes à environ 70 caractères. Chapitres repliables (ouverts par défaut, « Tout replier / Tout déplier »), retrouvables par Ctrl + F même repliés. Raccourcis clavier ligne par ligne (touche à gauche, action à droite), adaptés à l'appareil (composant `Raccourcis`).
- **Fiche Bristol** : la ligne « Desclics · adresse » n'apparaît plus qu'à l'impression. Chaque fiche existe en PDF A5 soigné, texte sélectionnable, généré à chaque build depuis le module (`scripts/generer-fiches-pdf.mjs`), plus un PDF par rubrique.
- **Traducteur de jargon** : reconnaît pluriels et conjugaisons, bouton « Expliquer les mots », exemples, phrase surlignée, message clair quand aucun mot n'est reconnu. **Glossaire : 190 mots** (93 ajoutés).
- Vérifications : 130 pages, 0 lien interne cassé, 0 erreur axe-core (clair et sombre, plus menus, liste de recherche, favoris et panneau ouverts), responsive 360 → 1920 px et texte à 200 %.

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
