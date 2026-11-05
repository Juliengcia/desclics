/**
 * Entrées « Je veux… » de l'accueil. Chaque entrée pointe vers un chapitre précis.
 * Seules les entrées dont le module est publié s'affichent.
 */
export const jeVeux: { libelle: string; module: string; ancre?: string }[] = [
  { libelle: 'refaire ma carte d’identité', module: 'demarches/ants' },
  { libelle: 'envoyer une photo', module: 'communiquer/whatsapp', ancre: 'photos-gif-liens' },
  { libelle: 'reconnaître une arnaque', module: 'securite/arnaques' },
  { libelle: 'raccrocher un appel', module: 'smartphone/appels-contacts', ancre: 'decrocher-raccrocher' },
  { libelle: 'faire un virement', module: 'argent/banque-en-ligne' },
  { libelle: 'prendre rendez-vous chez le médecin', module: 'vie-pratique/rendez-vous' },
  { libelle: 'déclarer mes impôts', module: 'demarches/impots' },
  { libelle: 'retrouver un fichier', module: 'ordinateur/fichiers-dossiers' },
  { libelle: 'copier-coller un texte', module: 'ordinateur/clavier-raccourcis', ancre: 'copier-coller' },
  { libelle: 'taper @ ou €', module: 'ordinateur/clavier-raccourcis', ancre: 'caracteres-speciaux' },
  { libelle: 'faire une capture d’écran', module: 'ordinateur/clavier-raccourcis', ancre: 'raccourcis-windows' },
];
