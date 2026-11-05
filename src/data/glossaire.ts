/**
 * GLOSSAIRE — une définition courte et autonome par mot.
 * - `id` : ancre de l'adresse (/glossaire/#id). Ne jamais le changer une fois publié.
 * - `variantes` : autres formes reconnues par le traducteur de jargon (pluriel, sigle…).
 * - `voir` : module qui approfondit (rubrique/module), facultatif.
 * Ordre alphabétique automatique à l'affichage.
 */
export interface Terme {
  id: string;
  terme: string;
  definition: string;
  variantes?: string[];
  voir?: string;
}

export const glossaire: Terme[] = [
  { id: 'alt-gr', terme: 'Alt Gr', definition: "Touche à droite de la barre d'espace sur les claviers Windows. Maintenue enfoncée, elle donne le troisième caractère d'une touche, comme @ ou €.", voir: 'ordinateur/clavier-raccourcis' },
  { id: 'application', terme: 'Application', definition: "Programme qui sert à une tâche précise : écrire, téléphoner, regarder des vidéos. On dit aussi « appli » ou « logiciel » sur ordinateur.", variantes: ['applications', 'appli', 'applis', 'app', 'apps'] },
  { id: 'barre-des-taches', terme: 'Barre des tâches', definition: "Bande en bas de l'écran de Windows. Elle montre le bouton Démarrer et les logiciels ouverts.", variantes: ['barre de tâches'] },
  { id: 'bluetooth', terme: 'Bluetooth', definition: "Liaison sans fil à courte distance (quelques mètres) entre deux appareils, par exemple un téléphone et des écouteurs." },
  { id: 'box', terme: 'Box', definition: "Boîtier fourni par l'opérateur qui relie la maison à Internet et diffuse le Wi-Fi.", variantes: ['box internet', 'routeur'] },
  { id: 'capture-ecran', terme: "Capture d'écran", definition: "Photo de ce qui s'affiche à l'écran, enregistrée comme une image.", variantes: ["captures d'écran", 'screenshot', "copie d'écran"] },
  { id: 'cloud', terme: 'Cloud', definition: "Espace de stockage sur Internet. Vos fichiers sont gardés sur les ordinateurs d'une entreprise et accessibles depuis tous vos appareils.", variantes: ['nuage', 'stockage en ligne'], voir: 'internet/cloud' },
  { id: 'commande', terme: 'Commande (⌘)', definition: "Touche principale des raccourcis sur Mac, marquée ⌘ ou « cmd ». Elle joue le rôle de la touche Ctrl de Windows.", variantes: ['cmd', '⌘', 'touche commande'], voir: 'ordinateur/clavier-raccourcis' },
  { id: 'cookie', terme: 'Cookie', definition: "Petit fichier qu'un site enregistre dans votre navigateur pour se souvenir de vous : panier, langue, mais aussi publicité ciblée.", variantes: ['cookies'], voir: 'securite/cookies-publicites' },
  { id: 'ctrl', terme: 'Ctrl', definition: "Touche « Contrôle », en bas à gauche du clavier sur Windows. Associée à une autre touche, elle déclenche un raccourci.", variantes: ['contrôle', 'control', 'touche ctrl'], voir: 'ordinateur/clavier-raccourcis' },
  { id: 'curseur', terme: 'Curseur', definition: "Petite barre qui clignote là où le texte va s'écrire. Désigne aussi la flèche que l'on déplace avec la souris (le pointeur).", variantes: ['pointeur'] },
  { id: 'dossier', terme: 'Dossier', definition: "Rangement qui contient des fichiers ou d'autres dossiers, comme une chemise cartonnée.", variantes: ['dossiers', 'répertoire'], voir: 'ordinateur/fichiers-dossiers' },
  { id: 'double-authentification', terme: 'Double authentification', definition: "Sécurité qui demande, en plus du mot de passe, une seconde preuve : un code reçu par SMS ou une validation dans une appli.", variantes: ['2fa', 'authentification à deux facteurs', 'validation en deux étapes'], voir: 'securite/double-authentification' },
  { id: 'e-mail', terme: 'E-mail', definition: "Message envoyé par Internet à une adresse électronique (exemple : prenom.nom@exemple.fr). On dit aussi courriel ou mail.", variantes: ['email', 'mail', 'mails', 'courriel', 'e-mails', 'adresse mail'], voir: 'communiquer/e-mail' },
  { id: 'fenetre', terme: 'Fenêtre', definition: "Cadre dans lequel s'affiche un logiciel ou un dossier ouvert. On peut l'agrandir, la réduire ou la fermer.", variantes: ['fenêtres'] },
  { id: 'fichier', terme: 'Fichier', definition: "Document enregistré dans l'ordinateur ou le téléphone : une lettre, une photo, un PDF.", variantes: ['fichiers'], voir: 'ordinateur/fichiers-dossiers' },
  { id: 'franceconnect', terme: 'FranceConnect', definition: "Bouton de connexion de l'État qui permet d'entrer sur un site administratif avec un compte que vous avez déjà (impots.gouv, Ameli…).", voir: 'demarches/franceconnect' },
  { id: 'hameconnage', terme: 'Hameçonnage', definition: "Arnaque par faux message (e-mail, SMS) qui imite une banque ou une administration pour voler vos codes. En anglais : phishing.", variantes: ['phishing', 'smishing'], voir: 'securite/arnaques' },
  { id: 'icone', terme: 'Icône', definition: "Petit dessin sur l'écran qui représente une application, un fichier ou une action. On touche ou on clique dessus.", variantes: ['icônes', 'icone'] },
  { id: 'intelligence-artificielle', terme: 'Intelligence artificielle', definition: "Programme capable de produire du texte, des images ou des réponses en imitant ce qu'il a appris sur d'immenses quantités d'exemples. Il peut se tromper.", variantes: ['ia', 'i.a.'], voir: 'intelligence-artificielle/comprendre' },
  { id: 'lien', terme: 'Lien', definition: "Texte ou image sur lequel on clique pour aller sur une autre page. Souvent souligné ou en couleur.", variantes: ['liens', 'hyperlien', 'lien hypertexte'] },
  { id: 'macos', terme: 'macOS', definition: "Système d'exploitation des ordinateurs Mac, fabriqués par Apple.", variantes: ['mac os', 'os x'], voir: 'ordinateur/systemes-exploitation' },
  { id: 'majuscule', terme: 'Maj (touche)', definition: "Touche marquée d'une flèche vers le haut. Maintenue enfoncée, elle donne la majuscule ou le caractère du haut d'une touche. En anglais : Shift.", variantes: ['shift', 'touche maj', 'majuscule'], voir: 'ordinateur/clavier-raccourcis' },
  { id: 'mise-a-jour', terme: 'Mise à jour', definition: "Nouvelle version d'un logiciel ou du système qui corrige des erreurs et des failles de sécurité. À installer sans tarder.", variantes: ['mises à jour', 'update', 'màj'], voir: 'ordinateur/entretien' },
  { id: 'moteur-de-recherche', terme: 'Moteur de recherche', definition: "Site qui trouve des pages web à partir de mots tapés : Google, Bing, Qwant…", variantes: ['moteurs de recherche'], voir: 'internet/rechercher' },
  { id: 'navigateur', terme: 'Navigateur', definition: "Logiciel qui affiche les sites web : Firefox, Chrome, Edge, Safari.", variantes: ['navigateurs', 'navigateur web', 'browser'], voir: 'internet/navigateur' },
  { id: 'onglet', terme: 'Onglet', definition: "Dans le navigateur, chaque page ouverte occupe un onglet, comme les intercalaires d'un classeur. On passe de l'un à l'autre en haut de la fenêtre.", variantes: ['onglets'], voir: 'internet/navigateur' },
  { id: 'option', terme: 'Option (⌥)', definition: "Touche du clavier Mac, marquée ⌥ ou « alt ». Elle donne des caractères supplémentaires et sert dans certains raccourcis.", variantes: ['⌥', 'touche option'], voir: 'ordinateur/clavier-raccourcis' },
  { id: 'pave-numerique', terme: 'Pavé numérique', definition: "Bloc de touches de chiffres à droite de certains claviers, disposées comme sur une calculatrice.", variantes: ['pavé num'] },
  { id: 'pdf', terme: 'PDF', definition: "Format de document qui garde la même apparence sur tous les appareils. Idéal pour envoyer ou imprimer un document officiel.", variantes: ['fichier pdf'], voir: 'bureautique/enregistrer-pdf' },
  { id: 'piece-jointe', terme: 'Pièce jointe', definition: "Fichier (photo, document) attaché à un e-mail.", variantes: ['pièces jointes', 'pj'], voir: 'communiquer/pieces-jointes' },
  { id: 'presse-papiers', terme: 'Presse-papiers', definition: "Mémoire temporaire de l'ordinateur où va ce que l'on copie, en attendant d'être collé ailleurs. Une nouvelle copie remplace la précédente.", variantes: ['presse papier', 'presse-papier', 'clipboard'], voir: 'ordinateur/clavier-raccourcis' },
  { id: 'qr-code', terme: 'QR code', definition: "Carré de petits motifs noirs et blancs que l'appareil photo du téléphone lit pour ouvrir une adresse web ou une information.", variantes: ['qrcode', 'code qr'], voir: 'smartphone/qr-code' },
  { id: 'raccourci-clavier', terme: 'Raccourci clavier', definition: "Combinaison de touches appuyées ensemble pour faire une action sans la souris, par exemple Ctrl + C pour copier.", variantes: ['raccourcis clavier', 'raccourci', 'raccourcis'], voir: 'ordinateur/clavier-raccourcis' },
  { id: 'selectionner', terme: 'Sélectionner', definition: "Désigner un texte, un fichier ou une image avant d'agir dessus. Ce qui est sélectionné apparaît surligné.", variantes: ['sélection', 'sélectionné', 'surligner'] },
  { id: 'smartphone', terme: 'Smartphone', definition: "Téléphone portable à écran tactile qui permet d'aller sur Internet et d'installer des applications.", variantes: ['smartphones', 'téléphone intelligent', 'mobile'], voir: 'smartphone/premiers-pas' },
  { id: 'spam', terme: 'Spam', definition: "Message non désiré, souvent publicitaire ou frauduleux, reçu par e-mail ou SMS. On dit aussi courrier indésirable.", variantes: ['spams', 'pourriel', 'courrier indésirable'], voir: 'communiquer/trier-e-mails' },
  { id: 'systeme-exploitation', terme: "Système d'exploitation", definition: "Logiciel de base qui fait fonctionner l'appareil et tous les autres logiciels : Windows, macOS, Android, iOS.", variantes: ['systèmes d\'exploitation', 'os'], voir: 'ordinateur/systemes-exploitation' },
  { id: 'url', terme: 'URL', definition: "Adresse d'une page web, par exemple https://www.service-public.fr. Elle s'affiche dans la barre d'adresse du navigateur.", variantes: ['adresse web', 'adresse internet', 'url'], voir: 'internet/adresse-web' },
  { id: 'wi-fi', terme: 'Wi-Fi', definition: "Connexion sans fil à Internet, diffusée par une box ou un point d'accès, sur quelques dizaines de mètres.", variantes: ['wifi', 'wi fi'], voir: 'internet/se-connecter' },
  { id: 'windows', terme: 'Windows', definition: "Système d'exploitation de Microsoft, installé sur la plupart des ordinateurs PC.", variantes: ['windows 10', 'windows 11'], voir: 'ordinateur/systemes-exploitation' },
];
