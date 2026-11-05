import { useState } from 'react';

/**
 * Testeur de touches : affiche en clair la touche ou la combinaison appuyée.
 * La touche Tab n'est jamais bloquée, pour pouvoir sortir du cadre au clavier.
 */
const NOMS: Record<string, string> = {
  Control: 'Ctrl', Shift: 'Maj', Alt: 'Alt', AltGraph: 'Alt Gr', Meta: 'Windows ou ⌘ Commande', OS: 'Windows',
  ' ': 'Espace', Enter: 'Entrée', Backspace: 'Retour arrière (effacer)', Delete: 'Suppr', Escape: 'Échap',
  Tab: 'Tab', CapsLock: 'Verr. Maj', ArrowUp: 'Flèche haut', ArrowDown: 'Flèche bas', ArrowLeft: 'Flèche gauche',
  ArrowRight: 'Flèche droite', Home: 'Début', End: 'Fin', PageUp: 'Page précédente', PageDown: 'Page suivante',
  Insert: 'Inser', ContextMenu: 'Menu contextuel', Dead: 'Accent (touche morte)', NumLock: 'Verr. Num',
};
const ROLES: Record<string, string> = {
  Enter: 'Valide ou passe à la ligne.',
  Backspace: 'Efface le caractère à gauche du curseur.',
  Delete: 'Efface le caractère à droite du curseur.',
  Escape: 'Annule ou ferme une fenêtre.',
  Tab: 'Passe à l’élément suivant (ici, il fait sortir du cadre).',
  CapsLock: 'Bloque l’écriture en majuscules. Rappuyez pour débloquer.',
  ' ': 'Ajoute une espace entre deux mots.',
  Shift: 'Maintenue, donne la majuscule ou le symbole du haut de la touche.',
  AltGraph: 'Maintenue, donne le troisième symbole d’une touche (@, €, #).',
  Control: 'Sert aux raccourcis, avec une autre touche.',
  Meta: 'Ouvre le menu Démarrer sur Windows ; sert aux raccourcis sur Mac.',
};

function nom(k: string) {
  if (NOMS[k]) return NOMS[k];
  if (/^F\d{1,2}$/.test(k)) return k;
  return k;
}

export default function TesteurTouches() {
  const [combi, setCombi] = useState<string[]>([]);
  const [role, setRole] = useState('');

  return (
    <div className="atelier">
      <p className="atelier-type">Atelier · testeur de touches</p>
      <p>Cliquez dans le cadre, puis appuyez sur une touche ou une combinaison. Pour sortir, appuyez sur <kbd>Tab</kbd>.</p>
      <div
        className="testeur-zone"
        tabIndex={0}
        role="group"
        aria-label="Zone de test du clavier"
        onKeyDown={(e) => {
          if (e.key === 'Tab') return; // jamais de piège clavier
          e.preventDefault();
          const parts: string[] = [];
          if (e.ctrlKey && e.key !== 'Control') parts.push('Ctrl');
          if (e.altKey && e.key !== 'Alt' && e.key !== 'AltGraph') parts.push('Alt');
          if (e.shiftKey && e.key !== 'Shift' && e.key.length !== 1) parts.push('Maj');
          if (e.metaKey && e.key !== 'Meta') parts.push('⌘');
          parts.push(nom(e.key));
          setCombi(parts);
          setRole(ROLES[e.key] ?? (e.key.length === 1 ? 'Écrit ce caractère.' : ''));
        }}
      >
        {combi.length === 0 ? <span className="testeur-vide">Appuyez sur une touche…</span> : (
          <span className="testeur-combi">{combi.map((c, i) => <span key={i}>{i > 0 && ' + '}<kbd>{c}</kbd></span>)}</span>
        )}
      </div>
      <p className="atelier-message" role="status" aria-live="polite">
        {combi.length > 0 && `Vous avez appuyé sur ${combi.join(' + ')}. ${role}`}
      </p>
      <p className="atelier-note">Certaines combinaisons (comme <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Suppr</kbd>) sont réservées à l'ordinateur et ne s'affichent pas ici.</p>
    </div>
  );
}
