# BACKLOG

Idées, améliorations, retours des lecteurs, informations à revérifier.

## Décisions attendues

- [ ] **Identité de l'éditeur** pour les mentions légales (nom ou pseudonyme, moyen de contact). Obligatoire avant ouverture publique.
- [ ] **« Cette page vous a aidé ? »** : sans serveur, les réponses doivent passer par un outil. Proposition : GoatCounter (gratuit, sans cookie, hébergé en Europe ? à vérifier) pour compter Oui / Non et les recherches sans résultat ; les commentaires libres via un formulaire tiers sans compte. À choisir avant de l'afficher (pas de bouton factice).
- [ ] **Mesure d'audience sans cookie** : Plausible (payant), Umami (auto-hébergé) ou GoatCounter (gratuit pour usage non commercial). Recommandation : GoatCounter.
- [ ] **Aperçu par branche** : GitHub Pages ne publie qu'une version. Aujourd'hui, chaque branche produit un aperçu téléchargeable (site + captures) dans l'onglet Actions. Pour un vrai lien d'aperçu par branche : Cloudflare Pages ou Netlify (gratuits), à connecter au dépôt.
- [ ] **Nom de domaine** (ex. desclics.fr) : vérifier la disponibilité et le registre INPI avant achat.

## À revérifier

- [ ] **Liens externes** (199, liste dans rapports/liens-externes.txt) : le réseau de développement bloque la plupart des sites ; vérifier à la main en priorité les pages d'aide Apple, Google, Samsung, CNIL (adresses de pages précises rédigées d'après les recherches).
- [ ] **Menus Samsung** (One UI) : les intitulés varient selon les versions (« Batterie et maintenance de l'appareil », « Gestion globale »). À contrôler sur un appareil récent.
- [ ] **Prix et conditions** : passeport 86 €, timbre perte 25 €, carte Avantage 49 €, conditions d'échange SNCF, quotas cloud gratuits : à revérifier chaque année.
- [ ] **Messagerie vocale** : numéros 888 / 123 / 660 / 666 issus de sources non officielles concordantes ; vérifier sur les sites des opérateurs.
- [ ] **Actualités IA** : sources presse ; à mettre à jour chaque mois (commande « Mets à jour les actualités IA »).
- [ ] **Adresses e-mail d'opérateur** après résiliation : aucune obligation légale trouvée ; texte rédigé de façon prudente.

- [ ] Mac : majuscule accentuée (É) via Verr. Maj + appui long sur E — à tester sur un vrai Mac (source Apple ne précise que l'appui long).
- [ ] Mac : € = Option + $ sur clavier français — confirmé par des sources secondaires seulement.
- [ ] Liens externes (rapports/liens-externes.txt) : le réseau du poste de développement bloque support.apple.com et support.microsoft.com ; vérifier à la main que les pages citées existent en français.
- [ ] Frise des connectiques : dates RJ11 et RJ45 données en décennies ; USB (1996) et USB-C (2014) à confirmer sur les sites de l'USB-IF. Sources actuelles : Wikipédia.
- [ ] Windows 11 : libellés « Recommandations de nettoyage » et « Applications installées » à revoir à chaque mise à jour majeure (captures réelles à faire).
- [ ] Captures réelles (Playwright impossible pour Windows/macOS) : à défaut, illustrations SVG de l'écran Windows Update et du Gestionnaire des tâches à prévoir.
- [ ] Adresse France Services utilisée sur l'accueil (france-services.gouv.fr) à confirmer.

## Prochaines étapes

- [x] Rubrique 1 « Comprendre l'ordinateur » (7 modules).
- [x] Étape 5 : les 12 rubriques sont rédigées (89 modules).
- [ ] Étape 6 : audit final (accessibilité manuelle, Lighthouse, relecture orthographique complète).
- [ ] Visuels : seuls 4 schémas existent (ordinateur). Prévoir des illustrations SVG simplifiées pour les modules smartphone (écran d'appel, réglages rapides), WhatsApp, banque.
- [ ] Page « Où se faire aider près de chez soi » (France Services, conseillers numériques, médiathèques), sources à vérifier.
- [ ] Parcours « Je viens de… » (4 parcours) dès que leurs modules existent.
- [ ] Version FALC des pages clés (démarches, arnaques, premiers pas smartphone).
- [ ] Page « Fiches Bristol » : imprimer toutes les fiches d'une rubrique.
- [ ] Audit Lighthouse (performance, SEO) en plus d'axe-core, dans la CI.
- [ ] Images : passer les futures captures en WebP / AVIF (composant `<Image>` d'Astro).
- [ ] Mettre à jour Astro (version majeure 7 disponible ; le socle utilise la 5, stable).

## Retours des lecteurs

(Aucun pour l'instant.)
