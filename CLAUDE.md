# CLAUDE.md — Desclics

À relire au début de chaque session. Tenir à jour.

## 1. Le projet

**Desclics** est un site statique d'information, en français, pour la France : comprendre et utiliser l'ordinateur, le smartphone, Internet, les démarches en ligne, la sécurité et l'IA. C'est d'abord un site d'information ; les ateliers interactifs ne font que compléter les contenus.

- **Public de référence : Jacqueline, 50 ans.** Elle a du mal avec son téléphone (ouvrir WhatsApp, raccrocher) et sait seulement utiliser un traitement de texte. Elle veut comprendre, pas être infantilisée. Pour chaque page : « Comprend-elle du premier coup ? La trouve-t-elle sans aide ? »
- **Ton** : clair, net, précis, adulte, **vouvoiement**. Une idée par phrase. Pas de blabla, pas d'émoji décoratif, pas de chiffres inutiles. Chaque terme technique est expliqué en une ligne la première fois et relié au glossaire (`<Terme id="…">`).
- **Pas de** points, badges, mascotte, compte utilisateur, traceur ni publicité.
- **Identité (v2)** : nom Desclics, logo pointeur + étincelle. **Deux typos** : Bricolage Grotesque (titres, interface) + Atkinson Hyperlegible Next (texte, 18 px minimum). Accent unique bleu `#2440C8` (sombre `#9DB0FF`) pour liens et boutons. **Pastels** (ciel, menthe, pêche, lilas, citron, rose) en fonds seulement, un par rubrique (`pastel` dans `rubriques.ts`). Fond blanc cassé `#F6F6F3`. Références dans `refs/` (01 à 09) : titres serrés avec deuxième partie en ton doux (`.ton-doux`), surtitre à pastille (`.etiquette`), boutons en pilule, cartes plates avec pastille ronde (`.carte`, `.pastille`), carte sombre mise en avant (`.carte--sombre`), séparateurs hachurés (`.hachures`), bande à filets verticaux (`.bande`), navigation en pilule.

## 2. Nomenclature (stricte, identique partout)

| Niveau | Rôle | Où |
|---|---|---|
| **Rubrique** | Grande thématique, dans le menu principal | `src/data/rubriques.ts` |
| **Module** | Une page sur **un besoin** | `src/content/modules/<rubrique>/<module>.mdx` |
| **Chapitre** | Une section H2 avec ancre stable | `## Question ? \{#ancre\}` dans le MDX |
| **Fiche Bristol** | Récapitulatif imprimable A5, en fin de module | champ `bristol` des métadonnées |

**Règle d'or : un module = un besoin, jamais une marque.** Les applis sont des exemples, comparées dans un `<TableauComparatif>`.
Densité : 4 à 8 chapitres, 5 à 10 minutes de lecture. Sujet trop court → chapitre ou glossaire. Plus de 12 chapitres → proposer de séparer.

## 3. Arborescence des dossiers

```
CLAUDE.md  GUIDE.md  CHANGELOG.md  BACKLOG.md  CAPTURES.md  README.md
astro.config.mjs        configuration (adresse du site, redirections, greffons Markdown)
docs/                   étude, arborescence validée, pistes d'identité
refs/                   références visuelles fournies
public/                 favicon, icônes PWA, image de partage, manifeste, service worker
scripts/                vérifications (liens, accessibilité, responsive), génération d'images
src/data/rubriques.ts   SOURCE UNIQUE de l'ordre des rubriques et modules
src/data/glossaire.ts   glossaire (une entrée par mot, ancre stable)
src/data/je-veux.ts     entrées « Je veux… » de l'accueil
src/data/nouveautes.ts  « Quoi de neuf ? »
src/content.config.ts   schéma des métadonnées obligatoires d'un module
src/content/modules/    un fichier MDX par module, un dossier par rubrique
src/components/         en-tête, pied, recherche, panneau d'accessibilité, icônes
src/components/module/  composants de rédaction (voir §4)
src/components/ateliers/ ateliers React (chargés seulement sur leur page)
src/components/schemas/ schémas SVG réutilisables
src/layouts/            Base (toutes les pages), PageTexte (pages légales)
src/pages/              routes ; [rubrique]/index.astro et [rubrique]/[module].astro sont générées
src/scripts/site.ts     comportements communs (menus, thème, accessibilité, voix, recherche)
src/styles/global.css   jetons de couleur (clair, sombre, contraste élevé) et styles de base
```

## 4. Gabarit d'un module

Métadonnées obligatoires (validées au build, voir `src/content.config.ts`) : `identifiant`, `titre`, `rubrique`, `resume` (une phrase), `duree`, `niveau`, `objectifs`, `motsCles`, `titreSeo` (< 60 car., formulé comme la question tapée dans Google), `metaDescription` (~150 car.), `bristol` (3 à 8 lignes), `sources` (titre, url, éditeur), `verifieLe`. Facultatifs : `appareils`, `pourAidant`, `liesA` (2 à 4 modules `rubrique/module`), `falc`.
L'ordre n'est **pas** dans le MDX : il est dans `rubriques.ts` (une seule source de vérité).

Chaque chapitre suit le **gabarit d'explication** :
1. `<Definition>` en une ou deux phrases ;
2. **À quoi ça sert** ;
3. `<Etapes>` « Comment faire » (liste numérotée) ;
4. `<Attention>` si nécessaire. Puis `<Astuce>`, `<ARetenir>` au besoin.

Composants : `Definition`, `Etapes`, `Attention`, `Astuce`, `ARetenir`, `TableauComparatif`, `Figure` (schéma / capture annotée / illustration, avec `alt` complet, `annotations` numérotées et `date`), `Frise`, `Touches` (raccourci clavier), `Terme` (lien glossaire), `Onglets` + `Onglet` (par appareil), `Quiz` (facultatif, sans score), ateliers React (`client:visible`). La fiche Bristol, « Pour l'aidant », les modules liés, les sources et précédent / suivant sont ajoutés automatiquement.

Titres de chapitres = vraies questions. Ancre obligatoire et stable : `## Comment copier un texte ? \{#copier-coller\}` (accolades échappées : c'est du MDX).

**Définition de « terminé »** pour un module : résumé, chapitres, visuels annotés et datés, fiche Bristol, sources datées, termes au glossaire, place dans `rubriques.ts`, titre SEO et méta-description, `npm run check` réussi (build, liens, accessibilité, responsive), CHANGELOG et CAPTURES à jour.

## 5. Procédures des commandes

Pour chaque demande : plan court → exécution → compte rendu (fichiers touchés, ce qui reste, lien d'aperçu). Avant un renommage, déplacement ou suppression importants : annonce en trois lignes, puis action. Demande ambiguë : une seule question précise.

- **« Ajoute un module sur… »** : recherche web sur sources officielles → rédaction selon le gabarit → ligne dans `rubriques.ts` → termes au glossaire → entrée « Je veux » si utile → `nouveautes.ts`, CHANGELOG, CAPTURES → `npm run check` → dire où il est rangé.
- **« Déplace X vers Y »** : déplacer la ligne dans `rubriques.ts` ; si la rubrique change, déplacer le MDX, changer `rubrique`, ajouter la redirection `ancienne → nouvelle` dans `astro.config.mjs` (`redirects`), corriger `liesA`, `je-veux.ts`, `glossaire.ts` (`voir`).
- **« Fusionne X et Y »** : regrouper les chapitres dans un module, supprimer l'autre, redirection de l'ancienne adresse, mettre à jour les liens.
- **« Sépare X en deux »** : créer le second MDX, répartir les chapitres, ligne dans `rubriques.ts`, redirections des anciennes ancres si besoin.
- **« Ajoute une rubrique… »** : nouvel objet dans `rubriques.ts` (icône existante dans `Icone.astro` ou nouvelle), dossier `src/content/modules/<slug>/`.
- **« Renomme… »** : titre seul → MDX (et `rubriques.ts`). Adresse → redirection obligatoire.
- **« Ajoute au glossaire… »** : entrée dans `glossaire.ts` (ancre définitive), relier les modules avec `<Terme>`.
- **« Mets à jour les actualités IA »** : recherche web datée, résumé, sources, `verifieLe`.
- **« Vérifie le site »** : `npm run check` + relecture orthographique + liste des modules dont `verifieLe` a plus d'un an + `rapports/liens-externes.txt` à contrôler.
- **« Que reste-t-il ? »** : résumé du BACKLOG.
- **« Reviens en arrière »** : `git revert` du dernier commit de travail (jamais de réécriture d'historique), nouveau commit, compte rendu de ce qui a été annulé.

## 6. Règles intouchables

1. **Vouvoiement**, ton adulte, gabarit respecté.
2. **Sources vérifiées** avant d'écrire un fait (priorité : .gouv.fr, CNIL, Cybermalveillance, ANSSI, Arcep, aides officielles des éditeurs). En cas de doute : le signaler (BACKLOG), ne jamais inventer.
3. **Accessibilité RGAA 4 / WCAG 2.2 AA** : `npm run check:a11y` sans erreur.
4. **Responsive** : 360, 768, 1280, 1920 px, portrait et paysage, texte à 200 % : `npm run check:responsive` sans erreur.
5. **Aucun traceur**, aucun cookie, polices auto-hébergées.
6. **Jamais de push direct sur `main`.** Une branche par travail (ex. `module/intelligence-artificielle`), fusion après validation. Un commit par changement, message clair en français.
7. Un seul H1 par page ; H2 puis H3 dans l'ordre.

## 7. Au démarrage de chaque session

1. Lire ce fichier, `CHANGELOG.md` et `git status` / `git log -5`.
2. Résumer en trois lignes où on en est.
3. Tous les trois mois : proposer la vérification des informations datées et des captures (voir CAPTURES.md).

## 8. Commandes techniques

```bash
npm install            # une fois
npm run dev            # aperçu local (recherche indisponible en dev)
npm run build          # construit dist/ et l'index de recherche
npm run check          # build + liens + accessibilité + responsive (Playwright requis)
node scripts/serveur.mjs  # sert dist/ sur http://localhost:4321/desclics/
node scripts/generer-images.mjs  # icônes PWA et image de partage
```
