# Étape 1 — Étude des sites existants et proposition d'arborescence

*Document de travail, 5 novembre 2026. À valider avant toute ligne de code.*

## 1. Ce que je retiens des sites existants (dix lignes)

1. **Les Bons Clics** (WeTechCare) : parcours par besoin et évaluation du niveau ; bien pour l'aidant, mais il faut un compte et le cadre de formation est lourd pour qui veut juste une réponse.
2. **Pix** : des compétences en référentiel et des tests ; son « ABC Diag » en 10 questions montre qu'un diagnostic court suffit. On garde l'idée d'un quiz facultatif, sans score à collectionner.
3. **Aidants Connect / Mednum / conseillers numériques** : la vraie difficulté est la démarche administrative. Il faut des pas-à-pas précis et une sortie vers une aide humaine (France Services).
4. **GCFGlobal** : très bonne granularité (un sujet = une leçon courte, captures annotées, accès sans compte) ; défaut : organisation par logiciel plutôt que par besoin.
5. **Apprendre le numérique (Google)** : ton simple, vidéos courtes, mais ancrage sur ses propres produits. Nous restons neutres, applis comparées en tableau.
6. **Constante utile** : capture annotée + étapes numérotées = format qui marche le mieux pour un public débutant.
7. **Faiblesse commune** : recherche interne médiocre et jargon non expliqué. Nos atouts : recherche instantanée, glossaire relié, « Je veux… ».
8. **Faiblesse commune** : pas de distinction Android / iPhone claire. Nos atouts : choix d'appareil mémorisé, onglets.
9. **Faiblesse commune** : informations datées sans date visible. Chaque module affichera sa date de vérification.
10. **À éviter** : gamification (badges, points), mascottes, comptes obligatoires.

Sources consultées : [Les Bons Clics, fiche CDRIML](https://cdriml.ac-versailles.fr/wp-content/uploads/2025/11/FicheDescriptive_LesBonsClics_CDRIML.pdf) · [Banque des Territoires, Les Bons Clics dans le Morbihan](https://www.banquedesterritoires.fr/experience/avec-les-bons-clics-les-usagers-du-morbihan-sont-accompagnes-dans-leurs-demarches) · [Pix et conseillers numériques](https://www.banquedesterritoires.fr/inclusion-numerique-2800-conseillers-numeriques-formes-et-5000-usagers-accompagnes-avec-pix) · [Mednum, programme Aidants Connect](https://aidantsconnect.beta.gouv.fr/static/guides_aidants_connect/Mednum%20-%20Programme%20de%20formation%20Aidants%20Connect.pdf) · [GCFGlobal](https://edu.gcfglobal.org/en/).

## 2. Principes appliqués à l'arborescence

- Un module = un besoin formulé comme Jacqueline le dirait (« Retrouver un fichier », pas « Explorateur Windows »).
- 4 à 8 chapitres par module ; les sujets trop courts deviennent chapitres ou glossaire.
- Adresses : `/rubrique/module`, en français, sans accent ni majuscule.
- Les marques sont des exemples dans un tableau comparatif, jamais un titre de module.
- ✚ = ajout que je propose, avec la raison en une ligne. ⇄ = regroupement ou séparation par rapport à votre liste.
- FALC = version Facile à lire prévue.

## 3. Arborescence proposée : 12 rubriques, 89 modules

### 1. Comprendre l'ordinateur — `/ordinateur`

| # | Module | Adresse | Chapitres |
|---|---|---|---|
| 1.1 | De quoi est fait un ordinateur ? | `materiel` | Fixe ou portable · Écran, clavier, souris, pavé tactile · Mémoire et stockage, la différence · Allumer, éteindre, mettre en veille · Quel ordinateur me faut-il ? ✚ |
| 1.2 | Windows, macOS, Linux : à quoi sert le système ? | `systemes-exploitation` | Qu'est-ce qu'un système d'exploitation · Reconnaître le sien · Le bureau, la barre des tâches, le Dock · Ouvrir, réduire, fermer une fenêtre · Les comptes utilisateurs |
| 1.3 | Ranger et retrouver ses fichiers | `fichiers-dossiers` | Fichier, dossier, extension · L'Explorateur et le Finder · Créer, renommer, déplacer · Le dossier Téléchargements · Rechercher un fichier perdu · La corbeille |
| 1.4 | Le clavier et les raccourcis | `clavier-raccourcis` | Les touches spéciales · Taper @, €, É, Ç · Copier, couper, coller (atelier Ctrl + A / C / V) · Raccourcis Windows · Raccourcis du navigateur · Équivalents Mac · Testeur de touches |
| 1.5 | Mon ordinateur est bloqué | `ordinateur-bloque` | Attendre ou agir · Ctrl + Alt + Suppr · Le Gestionnaire des tâches · Forcer à quitter sur Mac · Redémarrage forcé · Quand demander de l'aide |
| 1.6 | Brancher ses appareils : les prises et câbles | `connectiques` | Frise chronologique (Péritel → USB-C) · Reconnaître une prise · Brancher un écran ou la télé · Tous les câbles USB-C ne se valent pas · Adaptateurs |
| 1.7 | Entretenir son ordinateur : mises à jour et place | `entretien` ⇄ | Pourquoi mettre à jour · Windows Update · Mises à jour sur Mac · Voir l'espace libre · Faire de la place · Désinstaller un logiciel · L'antivirus intégré suffit-il ? |

⇄ « Mises à jour » et « Faire de la place » réunis : même besoin (garder un ordinateur qui marche), trop courts séparés.

### 2. Bureautique — `/bureautique`

| # | Module | Adresse | Chapitres |
|---|---|---|---|
| 2.1 | Quel logiciel pour écrire, compter, présenter ? | `choisir-logiciel` | Traitement de texte, tableur, présentation · Tableau : Microsoft 365, LibreOffice, Google Docs · Installé ou en ligne · Ouvrir un fichier reçu d'un autre logiciel |
| 2.2 | Écrire et mettre en forme une lettre | `traitement-de-texte` | Créer un document · Mettre en forme (gras, taille, alignement) · Listes et retraits · Insérer une image · Correcteur d'orthographe · Utiliser un modèle de lettre |
| 2.3 | Enregistrer, retrouver et faire un PDF | `enregistrer-pdf` | Enregistrer ou Enregistrer sous · Bien nommer un fichier · Retrouver un document · Qu'est-ce qu'un PDF · Exporter en PDF · Remplir et signer un PDF ✚ |
| 2.4 | Faire un tableau ou un budget | `tableur` | Cellules, lignes, colonnes · Saisir et ajuster · Additionner (SOMME) · Trier · Mettre en forme · Imprimer un tableau sur une page |
| 2.5 | Faire une présentation | `presentation` | Créer des diapositives · Texte et images · Thèmes · Présenter en plein écran · Exporter en PDF |
| 2.6 | Imprimer et scanner | `imprimer-scanner` | Installer une imprimante · Imprimer (pages, recto verso) · Scanner avec l'imprimante · Scanner avec le téléphone · L'imprimante ne répond pas |

✚ Remplir et signer un PDF : demandé dans presque toutes les démarches. Envoyer en pièce jointe → renvoi vers 5.2.

### 3. Le smartphone — `/smartphone` (Android Samsung et iPhone en onglets)

| # | Module | Adresse | Chapitres |
|---|---|---|---|
| 3.1 | Premiers pas avec son smartphone (FALC) | `premiers-pas` | Allumer, déverrouiller · Les gestes (toucher, glisser, pincer) · Écran d'accueil et liste des applis · Boutons et barre de navigation · Réglages rapides · Agrandir le texte ✚ |
| 3.2 | Téléphoner et gérer ses contacts ✚ | `appels-contacts` | Décrocher, raccrocher · Haut-parleur et volume · Appeler un numéro · Ajouter un contact · Messagerie vocale · Bloquer un numéro |
| 3.3 | Compte Google et identifiant Apple | `compte-google-apple` | À quoi sert ce compte · Le créer · Retrouver son mot de passe · Ce qu'il sauvegarde · Ne pas le partager |
| 3.4 | Installer, mettre à jour et supprimer une appli | `applications` | Play Store et App Store · Installer · Reconnaître la vraie appli · Autorisations · Mettre à jour · Désinstaller |
| 3.5 | Prendre de belles photos et vidéos | `appareil-photo` | Ouvrir l'appareil photo · Retourner la caméra · Zoom, flash, portrait · Filmer · Filtres et retouches simples |
| 3.6 | Ranger, sauvegarder et transférer ses photos | `photos` | La galerie · Albums · Sauvegarde automatique (Google Photos, iCloud) · Transférer vers l'ordinateur · Envoyer à quelqu'un · Libérer de la place |
| 3.7 | Régler son téléphone : notifications, batterie, son | `reglages` | Notifications · Ne pas déranger · Batterie qui dure · Luminosité et mode sombre · Sonneries · Mises à jour du téléphone |
| 3.8 | Téléphone perdu ou volé | `telephone-perdu` | La localisation, c'est quoi · L'activer avant · Localiser, faire sonner · Bloquer, effacer à distance · Bloquer la carte SIM · Porter plainte |
| 3.9 | Scanner un QR code (et repérer les faux) | `qr-code` | Qu'est-ce qu'un QR code · Le scanner · Où on en trouve · Les faux QR codes (parcmètres, colis) |
| 3.10 | Changer de téléphone, le vendre ou le donner | `changer-telephone` ⇄ ✚ | Sauvegarder · Transférer vers le nouveau · Retirer son compte · Réinitialiser · La carte SIM et l'eSIM · Vendre, donner, recycler |

✚ Appels et contacts : « raccrocher » est votre premier exemple de blocage. ✚ Transfert vers un nouveau téléphone : même besoin que vendre l'ancien, fait au même moment.

### 4. Internet et navigation — `/internet`

| # | Module | Adresse | Chapitres |
|---|---|---|---|
| 4.1 | Comment fonctionne Internet ? | `fonctionnement` | Un réseau de réseaux · Le fournisseur d'accès et la box · Adresse IP · DNS, l'annuaire d'Internet · Serveurs et sites |
| 4.2 | Se connecter : Wi-Fi, 4G, 5G, Bluetooth | `se-connecter` | Se connecter au Wi-Fi de sa box · 2,4 / 5 / 6 GHz, lequel choisir · Données mobiles 4G et 5G · Partage de connexion · Wi-Fi public : prudence · Bluetooth |
| 4.3 | Lire une adresse web et reconnaître un site | `adresse-web` | Décortiquer une URL · Le cadenas et https · Reconnaître un site officiel (.gouv.fr) · Structure d'un site : menu, pied de page · Les liens |
| 4.4 | Bien utiliser son navigateur | `navigateur` | Tableau : Firefox, Chrome, Edge, Safari · Onglets · Favoris · Historique · Téléchargements · Navigation privée · Navigateur d'entraînement |
| 4.5 | Chercher efficacement sur Internet | `rechercher` | Tableau : Google, Bing, Qwant, Yahoo · Bien formuler · Lire les résultats · Repérer les publicités « Sponsorisé » · Recherche d'images · Recherche vocale |
| 4.6 | Le cloud : ses fichiers en ligne | `cloud` | Qu'est-ce que le cloud · Google Drive, iCloud, OneDrive · Synchronisation · Espace gratuit et payant · Partager un lien |

### 5. Communiquer — `/communiquer`

| # | Module | Adresse | Chapitres |
|---|---|---|---|
| 5.1 | Créer et utiliser une adresse e-mail | `e-mail` | Choisir un fournisseur · Créer l'adresse · Lire, répondre, transférer · À, Cc, Cci : la copie cachée · Signature · Sur le téléphone |
| 5.2 | Envoyer et ouvrir une pièce jointe | `pieces-jointes` | Joindre un fichier · Joindre une photo depuis le téléphone · Ouvrir une pièce jointe sans risque · Fichier trop lourd : solutions |
| 5.3 | Trier sa boîte : spams, dossiers, désabonnement | `trier-e-mails` | Le dossier Spam · Signaler un spam · Se désabonner d'une lettre · Dossiers et libellés · Boîte pleine |
| 5.4 | Changer d'adresse e-mail ou d'opérateur | `changer-adresse-e-mail` | Les messageries d'opérateurs (Orange, SFR…) · Ce qui arrive si l'on résilie · Rediriger ses e-mails · Prévenir ses contacts et services · Récupérer ses anciens messages |
| 5.5 | SMS et MMS | `sms` | Envoyer un SMS · Envoyer une photo · Conversation de groupe · iMessage et RCS : les bulles bleues |
| 5.6 | Utiliser WhatsApp | `whatsapp` | Installer · Écrire un message · Message vocal · Photos, GIF, liens · Appeler et raccrocher · Groupes · Confidentialité |
| 5.7 | Faire un appel vidéo | `appels-video` | Tableau : WhatsApp, FaceTime, Zoom, Teams · Rejoindre avec un lien · Micro et caméra · Partager son écran · Problèmes courants |

### 6. Réseaux sociaux et vidéo — `/reseaux-sociaux`

| # | Module | Adresse | Chapitres |
|---|---|---|---|
| 6.1 | Comprendre les réseaux sociaux | `comprendre` | Réseau social, plateforme, messagerie : tableau · Le vocabulaire (story, reel, short, hashtag, mention) · L'algorithme · Gratuit, mais à quel prix ? |
| 6.2 | Créer un compte et protéger sa vie privée | `compte-confidentialite` | Ce qu'il faut donner ou non · Créer un compte · Compte public ou privé · Qui voit quoi · Supprimer un compte |
| 6.3 | Regarder des vidéos sur YouTube | `youtube` | Chercher une vidéo · Les icônes du lecteur · Sous-titres et vitesse · Playlists et abonnements · Publicités · Sur la télé |
| 6.4 | S'informer et vérifier une information | `verifier-information` | Qui parle ? · Fausses nouvelles · Images truquées et sorties de leur contexte · Recherche d'image inversée · Sites de vérification |

### 7. Démarches en ligne — `/demarches` (FALC sur 7.1 à 7.3)

| # | Module | Adresse | Chapitres |
|---|---|---|---|
| 7.1 | Se connecter avec FranceConnect | `franceconnect` | Qu'est-ce que c'est · Les comptes utilisables · Se connecter pas à pas · FranceConnect+ · Problèmes fréquents |
| 7.2 | Trouver la bonne démarche (service-public) | `service-public` | Service-public.fr · Les sites officiels gratuits · Les faux sites payants · Où se faire aider |
| 7.3 | Carte d'identité, passeport, permis, carte grise | `ants` | L'ANTS · Prédemande · Prendre rendez-vous en mairie · Permis de conduire · Carte grise · Suivre son dossier |
| 7.4 | Sa carte d'identité sur le téléphone (France Identité) | `france-identite` | À quoi ça sert · Téléphones compatibles · Installer et activer · Les usages |
| 7.5 | Santé : Ameli, carte Vitale, Mon espace santé | `sante` | Compte Ameli · Appli carte Vitale · Mon espace santé · Ordonnances et résultats · Téléconsultation |
| 7.6 | Déclarer ses impôts en ligne | `impots` | Créer son espace · Déclarer · Prélèvement à la source · Messagerie sécurisée · Faux e-mails des impôts |
| 7.7 | La CAF en ligne | `caf` | Mon compte · Déclarer ses ressources · Simulations · Envoyer un document |
| 7.8 | France Travail : s'actualiser et chercher un emploi | `france-travail` | Espace personnel · S'actualiser · CV · Candidater · Repérer les fausses offres |
| 7.9 | Préparer sa retraite en ligne ✚ | `retraite` | Le compte retraite · Relevé de carrière · Corriger un trimestre · Simuler · Demander sa retraite |
| 7.10 | La Poste : colis et courrier en ligne | `la-poste` | Suivre un colis · Lettre recommandée en ligne · Faux SMS de livraison |

✚ Retraite : Jacqueline a 50 ans, le relevé de carrière se vérifie tôt.

### 8. Vie pratique — `/vie-pratique`

| # | Module | Adresse | Chapitres |
|---|---|---|---|
| 8.1 | Prendre rendez-vous en ligne | `rendez-vous` ⇄ | Tableau : Doctolib, Planity… · Créer son compte · Réserver · Annuler ou déplacer · Téléconsultation |
| 8.2 | Se déplacer en voiture : GPS et stationnement | `voiture` ⇄ | Google Maps, Waze, Plans · Préparer un trajet · CarPlay et Android Auto · Payer son stationnement (EasyPark…) |
| 8.3 | Voyager en train | `train` | Réserver sur SNCF Connect · Billet sur le téléphone · Cartes de réduction · Échanger, se faire rembourser |
| 8.4 | Bus, métro, vélos et covoiturage | `transports` | Calculer un itinéraire · Tickets sur le téléphone · Vélos en libre-service · Covoiturage (BlaBlaCar) |
| 8.5 | Acheter en ligne en confiance | `acheter-en-ligne` | Choisir un site fiable · Panier et paiement · Livraison et retrait · Retour et rétractation · Avis clients |
| 8.6 | Acheter et vendre d'occasion | `occasion` | Tableau : Vinted, Leboncoin… · Publier une annonce · Acheter · Paiement et envoi sécurisés · Arnaques courantes |
| 8.7 | Se faire livrer un repas ou faire ses courses en drive | `repas-courses` | Livraison de repas · Courses en drive · Créneaux, retrait · Frais cachés |
| 8.8 | Traduire avec son téléphone | `traduire` | Un texte · Une conversation · Une photo de panneau · Hors connexion |
| 8.9 | Télé connectée et streaming | `television` | Télé connectée, box, clé · Replay gratuit · Abonnements (tableau) · Brancher, se connecter |
| 8.10 | Musique, podcasts, livres et médiathèque | `loisirs` | Musique en ligne · Podcasts · Livres numériques et liseuses · Ressources gratuites de la médiathèque |
| 8.11 | Maison connectée et assistants vocaux | `maison-connectee` | Qu'est-ce qu'un objet connecté · Assistants vocaux · Usages utiles · Vie privée |
| 8.12 | Les applis utiles au quotidien | `applis-utiles` | Liste commentée par besoin, mise à jour |

⇄ Doctolib et Planity réunis (même besoin : prendre rendez-vous). ⇄ GPS et stationnement réunis (même trajet).

### 9. Argent et banque — `/argent`

| # | Module | Adresse | Chapitres |
|---|---|---|---|
| 9.1 | Gérer ses comptes en ligne | `banque-en-ligne` | L'appli de sa banque · Se connecter · Consulter ses comptes · RIB · Ajouter un bénéficiaire · Faire un virement · Valider dans l'appli |
| 9.2 | Payer en ligne sans risque | `payer-en-ligne` | Ce qu'on donne · 3D Secure · PayPal · Cartes virtuelles · Ne jamais donner son code |
| 9.3 | Payer avec son téléphone | `paiement-telephone` | Le sans contact · Google Pay, Apple Pay, Samsung Wallet · Ajouter sa carte · Payer · Sécurité |
| 9.4 | Retrouver et résilier ses abonnements | `abonnements` | Repérer ses abonnements · Sur le téléphone · Résilier en ligne · Essais gratuits piégés |
| 9.5 | Forfait mobile et box : comprendre et changer | `forfait-operateur` | Lire sa facture · Comparer les offres · Garder son numéro (RIO) · Changer de box |

### 10. Sécurité et confiance — `/securite` (FALC sur 10.4)

| # | Module | Adresse | Chapitres |
|---|---|---|---|
| 10.1 | Créer de bons mots de passe | `mots-de-passe` | Un bon mot de passe · Un par site · Mot de passe oublié · Le changer |
| 10.2 | Utiliser un gestionnaire de mots de passe | `gestionnaire-mots-de-passe` | À quoi ça sert · Tableau : Bitwarden et alternatives · Installer · Mot de passe maître |
| 10.3 | La double authentification | `double-authentification` | Le principe · Par SMS, appli ou clé · L'activer · Codes de secours |
| 10.4 | Reconnaître une arnaque | `arnaques` | Faux SMS · Faux e-mails · Faux appels (banque, conseiller) · Les signes qui trompent · Simulateur |
| 10.5 | Repérer un faux site | `faux-sites` | Adresse imitée · Faux sites administratifs · Boutiques fantômes · Vérifier avant de payer |
| 10.6 | J'ai été victime : que faire ? ✚ | `victime` | Les premiers gestes · Faire opposition · Changer ses mots de passe · Signaler (17Cyber, Pharos) · Porter plainte |
| 10.7 | Cookies, publicités et pièges d'interface | `cookies-publicites` | Les cookies · Refuser en un clic · Dark patterns · Bloquer les publicités |
| 10.8 | Assistance à distance : quand c'est dangereux | `assistance-distance` | Le principe · TeamViewer et autres · L'arnaque au faux support · Les règles d'or |
| 10.9 | Protéger un enfant ou un petit-enfant | `controle-parental` | Contrôle parental intégré · Temps d'écran · Applis et achats · En parler |
| 10.10 | Héritage numérique | `heritage-numerique` | Ce qui reste après nous · Préparer · Compte d'un proche décédé |

✚ Victime : la page la plus urgente du site, besoin distinct de « reconnaître ».

### 11. Intelligence artificielle — `/intelligence-artificielle`

| # | Module | Adresse | Chapitres |
|---|---|---|---|
| 11.1 | Comprendre l'intelligence artificielle | `comprendre` | Définition · Comment ça marche, simplement · Ce qu'elle sait faire, ce qu'elle ne sait pas · Tableau des outils |
| 11.2 | Se faire aider pour écrire | `ecrire` | Bien formuler sa demande · Écrire un courrier · Résumer, reformuler · Vérifier la réponse |
| 11.3 | Créer une image ou une affiche | `images` | Les générateurs · Décrire ce qu'on veut · Créer une affiche · Droits et usages |
| 11.4 | Limites, erreurs et deepfakes | `limites` | Les erreurs inventées · Données personnelles · Deepfakes : voix et vidéos truquées · Reconnaître un contenu généré |
| 11.5 | Actualités IA | `actualites` | Entrées datées, sources |

### 12. J'ai un problème — `/depannage`

Chaque module : du plus simple au plus avancé, un chapitre par étape, puis « Où se faire aider ».

| # | Module | Adresse |
|---|---|---|
| 12.1 | Je n'ai plus de son | `pas-de-son` |
| 12.2 | Je n'ai plus Internet | `plus-internet` |
| 12.3 | Mon téléphone est plein ou lent | `telephone-plein` |
| 12.4 | L'écran est figé | `ecran-fige` (renvoie à 1.5) |
| 12.5 | J'ai oublié un mot de passe | `mot-de-passe-oublie` |
| 12.6 | La batterie se vide trop vite ✚ | `batterie` |
| 12.7 | L'imprimante ne marche pas ✚ | `imprimante` |

✚ Batterie et imprimante : deux symptômes très fréquents en médiation.

## 4. Pages transversales

| Page | Adresse |
|---|---|
| Parcours « Je viens d'acheter un smartphone » | `/parcours/nouveau-smartphone` |
| Parcours « Je viens d'avoir Internet à la maison » | `/parcours/internet-maison` |
| Parcours « Je viens de recevoir un SMS bizarre » | `/parcours/sms-bizarre` |
| Parcours « Je viens d'acheter un ordinateur » ✚ | `/parcours/nouvel-ordinateur` |
| Où se faire aider près de chez soi | `/aide-pres-de-chez-vous` |
| Glossaire | `/glossaire` |
| Traducteur de jargon | `/glossaire/traducteur` |
| Fiches Bristol (par rubrique) | `/fiches` |
| Quoi de neuf ? | `/nouveautes` |
| Plan du site | `/plan-du-site` |
| Accessibilité, mentions légales, confidentialité | `/accessibilite`, `/mentions-legales`, `/confidentialite` |

**Entrées « Je veux… » de l'accueil** : refaire ma carte d'identité (7.3) · envoyer une photo (5.6 / 5.2) · reconnaître une arnaque (10.4) · raccrocher un appel (3.2) · faire un virement (9.1) · prendre rendez-vous chez le médecin (8.1) · déclarer mes impôts (7.6) · retrouver un fichier (1.3).

## 5. Points à vérifier avant rédaction (signalés, non tranchés)

- Sort exact des adresses e-mail d'opérateur après résiliation (délai légal de maintien) : à vérifier sur service-public.fr et Arcep.
- Téléphones compatibles France Identité et carte Vitale dématérialisée : évoluent vite.
- Numéro et nom du dispositif d'aide aux victimes (17Cyber, Cybermalveillance) : à vérifier au moment de la rédaction.
