/**
 * « Les questions les plus posées » de l'accueil : six questions concrètes,
 * une réponse en une phrase, et le lien vers le bon chapitre.
 */
export const questions: { question: string; reponse: string; lien: string }[] = [
  { question: 'Comment reconnaître un SMS d’arnaque ?', reponse: 'Expéditeur inconnu, urgence et lien à ouvrir : ne cliquez pas, ouvrez vous-même l’appli officielle.', lien: 'securite/arnaques#faux-messages' },
  { question: 'Comment refaire ma carte d’identité ?', reponse: 'Faites la pré-demande en ligne, puis prenez rendez-vous en mairie avec vos justificatifs.', lien: 'demarches/ants#pre-demande' },
  { question: 'Comment décrocher et raccrocher ?', reponse: 'Le bouton vert décroche, le bouton rouge raccroche. Les gestes changent un peu selon le téléphone.', lien: 'smartphone/appels-contacts#decrocher-raccrocher' },
  { question: 'Comment envoyer une photo sur WhatsApp ?', reponse: 'Dans la conversation, touchez le trombone (ou +), puis Galerie, choisissez la photo et envoyez.', lien: 'communiquer/whatsapp#photos-gif-liens' },
  { question: 'J’ai oublié un mot de passe : que faire ?', reponse: 'Utilisez « Mot de passe oublié » sur la page de connexion : un lien arrive par e-mail ou SMS.', lien: 'depannage/mot-de-passe-oublie' },
  { question: 'Comment copier-coller un texte ?', reponse: 'Sélectionnez le texte, copiez avec Ctrl + C, collez avec Ctrl + V (⌘ sur Mac).', lien: 'ordinateur/clavier-raccourcis#copier-coller' },
];
