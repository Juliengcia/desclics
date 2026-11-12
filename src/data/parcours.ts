/**
 * Parcours « Je viens de… » : une situation, puis les modules à lire dans l'ordre.
 * Chaque étape pointe vers un module publié (et, si utile, un chapitre précis).
 * Les faits restent dans les modules : un parcours ne fait que les ordonner.
 */
export interface EtapeParcours {
  /** Ce que la personne fait à cette étape, formulé comme une action. */
  titre: string;
  /** Une ou deux phrases : pourquoi maintenant. */
  texte: string;
  /** Module visé, sous la forme rubrique/module. */
  module: string;
  ancre?: string;
}

export interface Parcours {
  slug: string;
  /** Suite de « Je viens de… » */
  situation: string;
  /** Situation sans « de » : pour les listes qui commencent déjà par « Je viens de… » */
  court: string;
  titre: string;
  titreSeo: string;
  metaDescription: string;
  chapo: string;
  pastel: 'ciel' | 'menthe' | 'peche' | 'lilas' | 'citron' | 'rose';
  icone: string;
  /** Temps total de lecture, en minutes (somme approximative des chapitres visés). */
  duree: number;
  etapes: EtapeParcours[];
  /** Ce qu'il faut absolument retenir, en trois lignes au plus. */
  aRetenir: string[];
}

export const parcours: Parcours[] = [
  {
    slug: 'nouveau-smartphone',
    court: 'acheter un smartphone',
    situation: 'd’acheter un smartphone',
    titre: 'Je viens d’acheter un smartphone',
    titreSeo: 'J’ai un nouveau smartphone : par quoi commencer ?',
    metaDescription: 'Les sept étapes pour démarrer avec un nouveau téléphone : gestes de base, compte Google ou Apple, appels, Wi-Fi, applis, réglages et sauvegarde des photos.',
    chapo: 'Sept étapes, dans l’ordre, pour passer de la boîte au téléphone prêt à servir. Prenez-les une par une, sur plusieurs jours si besoin.',
    pastel: 'menthe',
    icone: 'smartphone',
    duree: 45,
    etapes: [
      { titre: 'Allumer le téléphone et apprendre les gestes', texte: 'Toucher, glisser, revenir en arrière : tout le reste s’appuie sur ces quelques gestes.', module: 'smartphone/premiers-pas' },
      { titre: 'Créer ou vérifier le compte Google ou Apple', texte: 'Le téléphone le demande au premier démarrage. Ce compte sert à installer les applis et à sauvegarder vos données. Notez son mot de passe.', module: 'smartphone/compte-google-apple', ancre: 'creer' },
      { titre: 'Téléphoner et enregistrer ses contacts', texte: 'Décrocher, raccrocher, mettre le haut-parleur, puis enregistrer les numéros importants.', module: 'smartphone/appels-contacts' },
      { titre: 'Se connecter au Wi-Fi de la maison', texte: 'Le Wi-Fi évite de consommer les données mobiles de votre forfait.', module: 'internet/se-connecter', ancre: 'wi-fi' },
      { titre: 'Installer les premières applis', texte: 'Uniquement depuis le magasin officiel du téléphone, en vérifiant le nom de l’éditeur.', module: 'smartphone/applications', ancre: 'installer' },
      { titre: 'Régler le son, le texte et les notifications', texte: 'Agrandir le texte, calmer les notifications et faire durer la batterie rendent le téléphone plus confortable.', module: 'smartphone/reglages' },
      { titre: 'Sauvegarder ses photos automatiquement', texte: 'Si le téléphone est perdu ou cassé, les photos sauvegardées ne sont pas perdues.', module: 'smartphone/photos', ancre: 'sauvegarde' },
    ],
    aRetenir: [
      'Notez le code de déverrouillage et le mot de passe du compte Google ou Apple, et rangez-les en lieu sûr.',
      'Installez les applis seulement depuis Google Play ou l’App Store.',
      'Activez la sauvegarde des photos dès le premier jour.',
    ],
  },
  {
    slug: 'internet-maison',
    court: 'avoir Internet à la maison',
    situation: 'd’avoir Internet à la maison',
    titre: 'Je viens d’avoir Internet à la maison',
    titreSeo: 'Internet installé à la maison : et maintenant ?',
    metaDescription: 'Box installée ? Les étapes pour comprendre sa connexion, brancher ses appareils en Wi-Fi, naviguer, créer une adresse e-mail et savoir quoi faire en cas de coupure.',
    chapo: 'La box est branchée. Voici, dans l’ordre, ce qu’il faut savoir pour en profiter sereinement.',
    pastel: 'ciel',
    icone: 'globe',
    duree: 40,
    etapes: [
      { titre: 'Comprendre à quoi sert la box', texte: 'Elle relie votre logement à Internet et diffuse le Wi-Fi dans la maison.', module: 'internet/fonctionnement', ancre: 'box' },
      { titre: 'Connecter le téléphone et l’ordinateur au Wi-Fi', texte: 'Le nom du réseau et la clé Wi-Fi sont écrits sur une étiquette, sous ou derrière la box.', module: 'internet/se-connecter', ancre: 'wi-fi' },
      { titre: 'Apprendre à se servir du navigateur', texte: 'C’est le logiciel qui ouvre les sites : onglets, favoris, historique.', module: 'internet/navigateur' },
      { titre: 'Créer une adresse e-mail', texte: 'Elle est demandée par presque tous les services en ligne. Une adresse indépendante de l’opérateur vous suit si vous en changez.', module: 'communiquer/e-mail', ancre: 'fournisseur' },
      { titre: 'Choisir de bons mots de passe', texte: 'Un mot de passe différent pour chaque compte, à commencer par l’adresse e-mail.', module: 'securite/mots-de-passe' },
      { titre: 'Savoir quoi faire si Internet coupe', texte: 'Redémarrer la box règle la plupart des coupures. Sinon, vérifiez s’il y a une panne chez l’opérateur.', module: 'depannage/plus-internet' },
      { titre: 'Lire sa facture et comparer les offres', texte: 'Pour vérifier ce que vous payez, et savoir comment changer d’opérateur si besoin.', module: 'argent/forfait-operateur', ancre: 'facture' },
    ],
    aRetenir: [
      'La clé Wi-Fi est sur l’étiquette de la box.',
      'En cas de coupure, débranchez la box, attendez, rebranchez.',
      'Gardez une adresse e-mail qui ne dépend pas de votre opérateur.',
    ],
  },
  {
    slug: 'sms-bizarre',
    court: 'recevoir un SMS bizarre',
    situation: 'de recevoir un SMS bizarre',
    titre: 'Je viens de recevoir un SMS bizarre',
    titreSeo: 'J’ai reçu un SMS bizarre : que faire ?',
    metaDescription: 'Colis, amende, compte bloqué : comment savoir si un SMS est une arnaque, le signaler au 33700 et réagir vite si vous avez cliqué ou donné vos coordonnées.',
    chapo: 'Colis en attente, amende, compte bloqué, «\u00a0Maman, j’ai changé de numéro\u00a0» : avant de toucher au message, suivez ces étapes.',
    pastel: 'peche',
    icone: 'bouclier',
    duree: 20,
    etapes: [
      { titre: 'Ne pas cliquer, ne pas répondre', texte: 'Ne touchez ni au lien ni au numéro du message. Prenez le temps : l’urgence est le premier signe d’arnaque.', module: 'securite/arnaques', ancre: 'signes' },
      { titre: 'Vérifier les signes d’un faux SMS', texte: 'Expéditeur inconnu, lien étrange, demande de paiement ou de code : comparez avec la liste.', module: 'securite/arnaques', ancre: 'faux-messages' },
      { titre: 'En cas de doute, contacter l’organisme vous-même', texte: 'Ouvrez l’appli officielle ou tapez l’adresse du site vous-même. N’utilisez jamais le lien du message.', module: 'internet/adresse-web' },
      { titre: 'Signaler le message au 33700, puis le supprimer', texte: 'Le transfert est gratuit et aide à bloquer les fraudeurs.', module: 'securite/arnaques', ancre: 'signaler' },
      { titre: 'Bloquer le numéro', texte: 'Le téléphone permet de bloquer un numéro en quelques gestes.', module: 'smartphone/appels-contacts', ancre: 'bloquer' },
      { titre: 'Vous avez cliqué ou payé ? Agir dans l’heure', texte: 'Appelez votre banque pour faire opposition, changez vos mots de passe, gardez les preuves.', module: 'securite/victime', ancre: 'premiers-gestes' },
    ],
    aRetenir: [
      'Votre banque ne vous demande jamais le code reçu par SMS.',
      'Transférez les SMS suspects au 33700, gratuitement.',
      'Vous avez payé ? Appelez tout de suite votre banque.',
    ],
  },
  {
    slug: 'nouvel-ordinateur',
    court: 'acheter un ordinateur',
    situation: 'd’acheter un ordinateur',
    titre: 'Je viens d’acheter un ordinateur',
    titreSeo: 'J’ai un nouvel ordinateur : par quoi commencer ?',
    metaDescription: 'Les étapes pour démarrer avec un nouvel ordinateur : allumer et éteindre, se repérer sur Windows ou Mac, Wi-Fi, mises à jour, rangement des fichiers et sécurité.',
    chapo: 'Allumer, se repérer, se connecter, ranger, protéger : les étapes pour bien démarrer, que l’ordinateur soit sous Windows ou sur Mac.',
    pastel: 'lilas',
    icone: 'ordinateur',
    duree: 50,
    etapes: [
      { titre: 'Allumer, mettre en veille et éteindre', texte: 'Les bons gestes pour ne rien abîmer ni perdre de travail.', module: 'ordinateur/materiel', ancre: 'allumer-eteindre' },
      { titre: 'Se repérer sur le bureau', texte: 'Menu Démarrer ou Dock, fenêtres, barre des tâches : les repères de base de Windows et de macOS.', module: 'ordinateur/systemes-exploitation', ancre: 'bureau' },
      { titre: 'Se connecter au Wi-Fi', texte: 'Une fois connecté, l’ordinateur peut télécharger ses mises à jour.', module: 'internet/se-connecter', ancre: 'wi-fi' },
      { titre: 'Lancer les mises à jour', texte: 'Elles corrigent des failles de sécurité. Faites-les dès le premier jour, puis laissez-les se faire.', module: 'ordinateur/entretien', ancre: 'lancer' },
      { titre: 'Apprendre les raccourcis utiles', texte: 'Copier, coller, annuler : quelques touches font gagner beaucoup de temps.', module: 'ordinateur/clavier-raccourcis' },
      { titre: 'Ranger ses fichiers dans des dossiers', texte: 'Savoir où vont les fichiers téléchargés évite de les chercher ensuite.', module: 'ordinateur/fichiers-dossiers' },
      { titre: 'Savoir s’il faut un antivirus', texte: 'Windows comprend déjà un antivirus, activé par défaut. Si vous en installez un autre, gardez-en un seul à la fois.', module: 'ordinateur/entretien', ancre: 'antivirus' },
    ],
    aRetenir: [
      'Faites les mises à jour dès le premier jour.',
      'Méfiez-vous des fenêtres qui affirment que l’ordinateur est infecté et donnent un numéro à appeler.',
      'Rangez vos fichiers dans Documents, Images et Téléchargements.',
    ],
  },
];
