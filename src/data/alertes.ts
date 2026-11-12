/**
 * « Alerte arnaques » de l'accueil : les arnaques du moment et le bon réflexe.
 * Une alerte = une source officielle datée (Cybermalveillance.gouv.fr en priorité).
 * Garder 3 ou 4 alertes, retirer celles de plus de six mois. Les plus récentes en premier.
 */
export interface Alerte {
  date: string;        // date de publication de la source (AAAA-MM-JJ)
  titre: string;
  piege: string;       // ce que reçoit la personne, en une ou deux phrases
  reflexe: string;     // le bon réflexe, en une phrase
  module: string;      // rubrique/module#ancre qui explique plus en détail
  source: { titre: string; url: string; editeur: string };
}

export const alertes: Alerte[] = [
  {
    date: '2026-11-09',
    titre: 'Faux sites de promotions (Black Friday, fêtes)',
    piege: 'Des offres très généreuses, en publicité ou par message, mènent vers de faux sites marchands. Le produit payé n’arrive jamais.',
    reflexe: 'Méfiez-vous des prix trop bas, ne vous précipitez pas, et vérifiez l’adresse et la réputation du site avant de payer.',
    module: 'securite/faux-sites#boutique',
    source: { titre: 'Black Friday et fêtes de fin d’année 2026 : 7 conseils pour éviter les cyber-arnaques', url: 'https://www.cybermalveillance.gouv.fr/tous-nos-contenus/actualites/7-conseils-pour-eviter-les-cyberescroqueries', editeur: 'Cybermalveillance.gouv.fr' },
  },
  {
    date: '2026-10-27',
    titre: 'Faux vote pour un concours sur WhatsApp',
    piege: 'Un contact vous demande de voter pour un concours. La page de vote réclame votre numéro, puis un code : il sert à brancher le compte WhatsApp sur l’appareil de l’escroc.',
    reflexe: 'Ne donnez jamais un code reçu, même à un proche. Vérifiez les appareils connectés dans les réglages de WhatsApp et supprimez les inconnus.',
    module: 'communiquer/whatsapp#confidentialite',
    source: { titre: 'Hameçonnage aux faux votes pour des concours sur WhatsApp', url: 'https://www.cybermalveillance.gouv.fr/tous-nos-contenus/actualites/vigilance-faux-vote-whatsapp', editeur: 'Cybermalveillance.gouv.fr' },
  },
  {
    date: '2026-03-26',
    titre: 'Faux conseiller bancaire',
    piege: 'Un appel, parfois avec le vrai numéro de la banque affiché, annonce une opération suspecte et vous demande de « sécuriser » votre compte.',
    reflexe: 'Raccrochez. Votre banque ne demande jamais un code, une validation ou un virement de sécurité. Rappelez le numéro inscrit au dos de votre carte.',
    module: 'securite/arnaques#faux-appels',
    source: { titre: 'Rapport d’activité 2025 : communiqué de presse', url: 'https://www.cybermalveillance.gouv.fr/medias/2026/03/CP-RA2026.pdf', editeur: 'Cybermalveillance.gouv.fr' },
  },
];
