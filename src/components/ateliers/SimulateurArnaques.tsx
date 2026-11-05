import { useState } from 'react';

/**
 * Simulateur : des messages fictifs, à classer « fiable » ou « arnaque ».
 * Tous les noms, numéros et adresses sont inventés pour l'exercice.
 */
interface Message { canal: 'SMS' | 'E-mail'; expediteur: string; texte: string; arnaque: boolean; indices: string[] }

const MESSAGES: Message[] = [
  { canal: 'SMS', expediteur: '06 12 34 56 78', texte: 'Votre colis est en attente. Des frais de livraison de 1,99 € sont à régler : colis-suivi-fr.info/payer', arnaque: true,
    indices: ['Un numéro de portable ordinaire comme expéditeur.', 'De petits frais à payer par lien : technique classique pour voler la carte bancaire.', 'Une adresse web qui ne correspond à aucun transporteur officiel.'] },
  { canal: 'E-mail', expediteur: 'Assurance Maladie <remboursement@ameli-securite.com>', texte: 'Vous avez droit à un remboursement de 148,20 €. Mettez à jour votre carte Vitale avant 24 h pour le recevoir.', arnaque: true,
    indices: ['L’adresse d’envoi ne se termine pas par ameli.fr.', 'L’urgence (« avant 24 h ») vise à vous empêcher de réfléchir.', 'L’Assurance Maladie ne demande jamais de « mettre à jour » sa carte Vitale par e-mail.'] },
  { canal: 'SMS', expediteur: 'MaBanque', texte: 'Code de validation : 482913. Ne le communiquez à personne, même à un conseiller MaBanque.', arnaque: false,
    indices: ['Il ne contient aucun lien et ne demande rien.', 'Il vous met en garde : c’est le ton d’un vrai message de sécurité.', 'Seul piège possible : quelqu’un qui vous appelle pour vous demander ce code. Ne le donnez jamais.'] },
  { canal: 'SMS', expediteur: '07 98 76 54 32', texte: 'Coucou maman, j’ai cassé mon téléphone, c’est mon nouveau numéro. Tu peux m’écrire sur WhatsApp ? J’ai un souci urgent.', arnaque: true,
    indices: ['Un « nouveau numéro » inconnu qui se fait passer pour un proche.', 'L’urgence et le passage sur WhatsApp précèdent une demande d’argent.', 'Réflexe : appelez votre enfant sur son numéro habituel.'] },
  { canal: 'E-mail', expediteur: 'impots.gouv.fr <ne-pas-repondre@dgfip.finances.gouv.fr>', texte: 'Un nouveau document est disponible dans votre espace particulier. Connectez-vous sur impots.gouv.fr pour le consulter.', arnaque: false,
    indices: ['L’adresse d’envoi se termine par .gouv.fr.', 'Il ne contient ni pièce jointe ni lien vers une page de paiement.', 'Il vous invite à aller vous-même sur le site officiel : c’est la bonne méthode.'] },
  { canal: 'SMS', expediteur: 'ANTAI-Info', texte: 'Avis de contravention impayé : 35 €. Sans règlement sous 48 h, majoration à 375 €. Payez sur antai-amendes-gouv.com', arnaque: true,
    indices: ['L’adresse se termine par .com, pas par .gouv.fr.', 'La menace d’une forte majoration crée la panique.', 'Une amende se vérifie sur le site officiel, en tapant l’adresse vous-même.'] },
];

export default function SimulateurArnaques() {
  const [reponses, setReponses] = useState<(boolean | null)[]>(MESSAGES.map(() => null));
  const repondre = (i: number, v: boolean) => setReponses((r) => r.map((x, j) => (j === i ? v : x)));
  const faites = reponses.filter((r) => r !== null).length;
  const justes = reponses.filter((r, i) => r !== null && r === MESSAGES[i].arnaque).length;

  return (
    <div className="atelier">
      <p className="atelier-type">Atelier · simulateur de faux messages</p>
      <p>Pour chaque message, décidez : fiable ou arnaque ? Tous les noms et numéros sont inventés.</p>
      <ol className="simu-liste">
        {MESSAGES.map((m, i) => {
          const r = reponses[i];
          return (
            <li key={i} className="simu-message">
              <p className="simu-entete"><strong>{m.canal}</strong> · de « {m.expediteur} »</p>
              <p className="simu-texte">{m.texte}</p>
              <div className="simu-boutons" role="group" aria-label={`Message ${i + 1} : votre avis`}>
                <button type="button" className="bouton bouton--secondaire" aria-pressed={r === false} onClick={() => repondre(i, false)}>Fiable</button>
                <button type="button" className="bouton bouton--secondaire" aria-pressed={r === true} onClick={() => repondre(i, true)}>Arnaque</button>
              </div>
              <div role="status" aria-live="polite">
                {r !== null && (
                  <div className={`simu-retour ${r === m.arnaque ? 'ok' : 'ko'}`}>
                    <p><strong>{r === m.arnaque ? 'Bien vu.' : 'Attention.'}</strong> Ce message est {m.arnaque ? 'une arnaque' : 'fiable'}. Les indices :</p>
                    <ul>{m.indices.map((x, k) => <li key={k}>{x}</li>)}</ul>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <p className="atelier-message" role="status" aria-live="polite">{faites === MESSAGES.length ? `Terminé : ${justes} message${justes > 1 ? 's' : ''} bien repéré${justes > 1 ? 's' : ''} sur ${MESSAGES.length}.` : ''}</p>
    </div>
  );
}
