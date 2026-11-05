# Guide : modifier le site à la main

Ce guide explique, en français simple, comment ajouter, déplacer ou supprimer un module sans aide. Vous pouvez faire ces changements directement sur GitHub, dans le navigateur : ouvrez le fichier, cliquez sur le crayon (« Edit »), modifiez, puis enregistrez sur une **nouvelle branche** (jamais sur `main`).

## Où est quoi ?

- **L'ordre du menu** : `src/data/rubriques.ts`. Une ligne = un module.
- **Le texte d'un module** : `src/content/modules/<rubrique>/<module>.mdx`.
- **Le glossaire** : `src/data/glossaire.ts`.

## Ajouter un module

1. Dans `src/data/rubriques.ts`, trouvez la rubrique et ajoutez une ligne à l'endroit voulu :
   `{ slug: 'mon-module', titre: 'Titre du module' },`
   Le `slug` est la fin de l'adresse : minuscules, sans accent, mots séparés par des tirets.
2. Copiez un module existant (par exemple `src/content/modules/ordinateur/clavier-raccourcis.mdx`) dans le dossier de la rubrique, et renommez-le `mon-module.mdx`.
3. En haut du fichier, entre les deux lignes `---`, remplacez toutes les informations (titre, résumé, sources…). `identifiant` doit être identique au `slug`.
4. Écrivez les chapitres. Chaque chapitre commence par `## Question ? \{#ancre\}`.
5. Enregistrez. Tant que le fichier MDX n'existe pas, le module s'affiche « En préparation ».

## Déplacer un module

- **Dans la même rubrique** : dans `rubriques.ts`, coupez la ligne et collez-la plus haut ou plus bas. C'est tout.
- **Vers une autre rubrique** :
  1. coupez la ligne et collez-la dans l'autre rubrique ;
  2. déplacez le fichier `.mdx` dans le dossier de la nouvelle rubrique ;
  3. dans le fichier, changez la ligne `rubrique:` ;
  4. dans `astro.config.mjs`, ajoutez une redirection pour ne pas casser les anciens liens :
     `'/ancienne-rubrique/mon-module/': '/desclics/nouvelle-rubrique/mon-module/',`

## Supprimer un module

1. Supprimez sa ligne dans `rubriques.ts` et son fichier `.mdx`.
2. Ajoutez une redirection vers le module le plus proche (voir ci-dessus).
3. Cherchez son adresse dans le projet (`rubrique/module`) et retirez les liens qui y pointent (`liesA`, `je-veux.ts`, `glossaire.ts`).

## Vérifier avant de publier

Sur chaque branche, GitHub lance automatiquement les vérifications (construction, liens, accessibilité, responsive). Une coche verte = tout va bien. Une croix rouge = ouvrez le détail : le message dit quelle page pose problème. La publication n'a lieu qu'après fusion dans `main` et seulement si tout est vert.
