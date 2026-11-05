/**
 * SOURCE UNIQUE DE L'ORGANISATION DU SITE.
 *
 * L'ordre des rubriques et des modules est fixé ici, et seulement ici.
 * Menu, accueil, pages de rubrique, plan du site, liens « précédent / suivant »
 * et fil d'Ariane en sont générés.
 *
 * - Déplacer un module : couper sa ligne et la coller ailleurs (et ajouter une
 *   redirection dans astro.config.mjs si l'adresse change).
 * - Un module listé ici sans fichier MDX s'affiche « En préparation » sur la page
 *   de sa rubrique, mais n'apparaît pas dans le menu.
 * - Le fichier MDX d'un module vit dans src/content/modules/<rubrique>/<module>.mdx
 */

export type IconeRubrique =
  | 'ordinateur' | 'document' | 'smartphone' | 'globe' | 'bulle' | 'video'
  | 'tampon' | 'panier' | 'carte' | 'bouclier' | 'etincelle' | 'cle';

export interface ModulePrevu {
  /** Partie finale de l'adresse : /rubrique/<slug>/ */
  slug: string;
  /** Titre affiché tant que le module n'est pas rédigé (ensuite : titre du MDX). */
  titre: string;
}

export interface Rubrique {
  slug: string;
  titre: string;
  /** Une phrase, affichée sur l'accueil et la page de rubrique. */
  description: string;
  icone: IconeRubrique;
  /** Couleur pastel de fond (cartes, en-tête de rubrique). */
  pastel: 'ciel' | 'menthe' | 'peche' | 'lilas' | 'citron' | 'rose';
  modules: ModulePrevu[];
}

export const rubriques: Rubrique[] = [
  {
    slug: 'ordinateur',
    titre: "Comprendre l'ordinateur",
    description: "Le matériel, Windows et Mac, les fichiers, le clavier et l'entretien.",
    icone: 'ordinateur',
    pastel: 'ciel',
    modules: [
      { slug: 'materiel', titre: 'De quoi est fait un ordinateur ?' },
      { slug: 'systemes-exploitation', titre: 'Windows, macOS, Linux : à quoi sert le système ?' },
      { slug: 'fichiers-dossiers', titre: 'Ranger et retrouver ses fichiers' },
      { slug: 'clavier-raccourcis', titre: 'Le clavier et les raccourcis' },
      { slug: 'ordinateur-bloque', titre: 'Mon ordinateur est bloqué' },
      { slug: 'connectiques', titre: 'Brancher ses appareils : les prises et câbles' },
      { slug: 'entretien', titre: 'Entretenir son ordinateur : mises à jour et place' },
    ],
  },
  {
    slug: 'bureautique',
    titre: 'Bureautique',
    description: 'Écrire une lettre, faire un tableau, créer un PDF, imprimer et scanner.',
    icone: 'document',
    pastel: 'citron',
    modules: [
      { slug: 'choisir-logiciel', titre: 'Quel logiciel pour écrire, compter, présenter ?' },
      { slug: 'traitement-de-texte', titre: 'Écrire et mettre en forme une lettre' },
      { slug: 'enregistrer-pdf', titre: 'Enregistrer, retrouver et faire un PDF' },
      { slug: 'tableur', titre: 'Faire un tableau ou un budget' },
      { slug: 'presentation', titre: 'Faire une présentation' },
      { slug: 'imprimer-scanner', titre: 'Imprimer et scanner' },
    ],
  },
  {
    slug: 'smartphone',
    titre: 'Le smartphone',
    description: 'Les gestes, les appels, les applis, les photos et les réglages, sur Android et iPhone.',
    icone: 'smartphone',
    pastel: 'menthe',
    modules: [
      { slug: 'premiers-pas', titre: 'Premiers pas avec son smartphone' },
      { slug: 'appels-contacts', titre: 'Téléphoner et gérer ses contacts' },
      { slug: 'compte-google-apple', titre: 'Compte Google et identifiant Apple' },
      { slug: 'applications', titre: 'Installer, mettre à jour et supprimer une appli' },
      { slug: 'appareil-photo', titre: 'Prendre de belles photos et vidéos' },
      { slug: 'photos', titre: 'Ranger, sauvegarder et transférer ses photos' },
      { slug: 'reglages', titre: 'Régler son téléphone : notifications, batterie, son' },
      { slug: 'telephone-perdu', titre: 'Téléphone perdu ou volé' },
      { slug: 'qr-code', titre: 'Scanner un QR code (et repérer les faux)' },
      { slug: 'changer-telephone', titre: 'Changer de téléphone, le vendre ou le donner' },
    ],
  },
  {
    slug: 'internet',
    titre: 'Internet et navigation',
    description: 'Comment marche Internet, le Wi-Fi, le navigateur et la recherche.',
    icone: 'globe',
    pastel: 'lilas',
    modules: [
      { slug: 'fonctionnement', titre: 'Comment fonctionne Internet ?' },
      { slug: 'se-connecter', titre: 'Se connecter : Wi-Fi, 4G, 5G, Bluetooth' },
      { slug: 'adresse-web', titre: 'Lire une adresse web et reconnaître un site' },
      { slug: 'navigateur', titre: 'Bien utiliser son navigateur' },
      { slug: 'rechercher', titre: 'Chercher efficacement sur Internet' },
      { slug: 'cloud', titre: 'Le cloud : ses fichiers en ligne' },
    ],
  },
  {
    slug: 'communiquer',
    titre: 'Communiquer',
    description: 'E-mail, SMS, WhatsApp et appels vidéo.',
    icone: 'bulle',
    pastel: 'peche',
    modules: [
      { slug: 'e-mail', titre: 'Créer et utiliser une adresse e-mail' },
      { slug: 'pieces-jointes', titre: 'Envoyer et ouvrir une pièce jointe' },
      { slug: 'trier-e-mails', titre: 'Trier sa boîte : spams, dossiers, désabonnement' },
      { slug: 'changer-adresse-e-mail', titre: "Changer d'adresse e-mail ou d'opérateur" },
      { slug: 'sms', titre: 'SMS et MMS' },
      { slug: 'whatsapp', titre: 'Utiliser WhatsApp' },
      { slug: 'appels-video', titre: 'Faire un appel vidéo' },
    ],
  },
  {
    slug: 'reseaux-sociaux',
    titre: 'Réseaux sociaux et vidéo',
    description: 'Comprendre les réseaux, protéger sa vie privée, YouTube et vérifier une info.',
    icone: 'video',
    pastel: 'rose',
    modules: [
      { slug: 'comprendre', titre: 'Comprendre les réseaux sociaux' },
      { slug: 'compte-confidentialite', titre: 'Créer un compte et protéger sa vie privée' },
      { slug: 'youtube', titre: 'Regarder des vidéos sur YouTube' },
      { slug: 'verifier-information', titre: "S'informer et vérifier une information" },
    ],
  },
  {
    slug: 'demarches',
    titre: 'Démarches en ligne',
    description: "FranceConnect, papiers d'identité, santé, impôts, CAF, France Travail.",
    icone: 'tampon',
    pastel: 'ciel',
    modules: [
      { slug: 'franceconnect', titre: 'Se connecter avec FranceConnect' },
      { slug: 'service-public', titre: 'Trouver la bonne démarche' },
      { slug: 'ants', titre: "Carte d'identité, passeport, permis, carte grise" },
      { slug: 'france-identite', titre: "Sa carte d'identité sur le téléphone" },
      { slug: 'sante', titre: 'Santé : Ameli, carte Vitale, Mon espace santé' },
      { slug: 'impots', titre: 'Déclarer ses impôts en ligne' },
      { slug: 'caf', titre: 'La CAF en ligne' },
      { slug: 'france-travail', titre: "France Travail : s'actualiser et chercher un emploi" },
      { slug: 'retraite', titre: 'Préparer sa retraite en ligne' },
      { slug: 'la-poste', titre: 'La Poste : colis et courrier en ligne' },
    ],
  },
  {
    slug: 'vie-pratique',
    titre: 'Vie pratique',
    description: 'Rendez-vous, transports, achats, loisirs : le numérique au quotidien.',
    icone: 'panier',
    pastel: 'menthe',
    modules: [
      { slug: 'rendez-vous', titre: 'Prendre rendez-vous en ligne' },
      { slug: 'voiture', titre: 'Se déplacer en voiture : GPS et stationnement' },
      { slug: 'train', titre: 'Voyager en train' },
      { slug: 'transports', titre: 'Bus, métro, vélos et covoiturage' },
      { slug: 'acheter-en-ligne', titre: 'Acheter en ligne en confiance' },
      { slug: 'occasion', titre: "Acheter et vendre d'occasion" },
      { slug: 'repas-courses', titre: 'Se faire livrer un repas ou faire ses courses en drive' },
      { slug: 'traduire', titre: 'Traduire avec son téléphone' },
      { slug: 'television', titre: 'Télé connectée et streaming' },
      { slug: 'loisirs', titre: 'Musique, podcasts, livres et médiathèque' },
      { slug: 'maison-connectee', titre: 'Maison connectée et assistants vocaux' },
      { slug: 'applis-utiles', titre: 'Les applis utiles au quotidien' },
    ],
  },
  {
    slug: 'argent',
    titre: 'Argent et banque',
    description: 'Banque en ligne, paiement sans risque, abonnements et forfaits.',
    icone: 'carte',
    pastel: 'citron',
    modules: [
      { slug: 'banque-en-ligne', titre: 'Gérer ses comptes en ligne' },
      { slug: 'payer-en-ligne', titre: 'Payer en ligne sans risque' },
      { slug: 'paiement-telephone', titre: 'Payer avec son téléphone' },
      { slug: 'abonnements', titre: 'Retrouver et résilier ses abonnements' },
      { slug: 'forfait-operateur', titre: 'Forfait mobile et box : comprendre et changer' },
    ],
  },
  {
    slug: 'securite',
    titre: 'Sécurité et confiance',
    description: 'Mots de passe, arnaques, faux sites et que faire si l’on est victime.',
    icone: 'bouclier',
    pastel: 'lilas',
    modules: [
      { slug: 'mots-de-passe', titre: 'Créer de bons mots de passe' },
      { slug: 'gestionnaire-mots-de-passe', titre: 'Utiliser un gestionnaire de mots de passe' },
      { slug: 'double-authentification', titre: 'La double authentification' },
      { slug: 'arnaques', titre: 'Reconnaître une arnaque' },
      { slug: 'faux-sites', titre: 'Repérer un faux site' },
      { slug: 'victime', titre: "J'ai été victime : que faire ?" },
      { slug: 'cookies-publicites', titre: "Cookies, publicités et pièges d'interface" },
      { slug: 'assistance-distance', titre: "Assistance à distance : quand c'est dangereux" },
      { slug: 'controle-parental', titre: 'Protéger un enfant ou un petit-enfant' },
      { slug: 'heritage-numerique', titre: 'Héritage numérique' },
    ],
  },
  {
    slug: 'intelligence-artificielle',
    titre: 'Intelligence artificielle',
    description: "Ce qu'est l'IA, comment s'en servir et ses limites.",
    icone: 'etincelle',
    pastel: 'rose',
    modules: [
      { slug: 'comprendre', titre: "Comprendre l'intelligence artificielle" },
      { slug: 'ecrire', titre: 'Se faire aider pour écrire' },
      { slug: 'images', titre: 'Créer une image ou une affiche' },
      { slug: 'limites', titre: 'Limites, erreurs et deepfakes' },
      { slug: 'actualites', titre: 'Actualités IA' },
    ],
  },
  {
    slug: 'depannage',
    titre: "J'ai un problème",
    description: 'Dépannage par symptôme, du plus simple au plus avancé.',
    icone: 'cle',
    pastel: 'peche',
    modules: [
      { slug: 'pas-de-son', titre: "Je n'ai plus de son" },
      { slug: 'plus-internet', titre: "Je n'ai plus Internet" },
      { slug: 'telephone-plein', titre: 'Mon téléphone est plein ou lent' },
      { slug: 'ecran-fige', titre: "L'écran est figé" },
      { slug: 'mot-de-passe-oublie', titre: "J'ai oublié un mot de passe" },
      { slug: 'batterie', titre: 'La batterie se vide trop vite' },
      { slug: 'imprimante', titre: "L'imprimante ne marche pas" },
    ],
  },
];
