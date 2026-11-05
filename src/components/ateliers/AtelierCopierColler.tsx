import { useEffect, useRef, useState } from 'react';

/**
 * Atelier : sélectionner tout, copier, coller (Ctrl + A / C / V, ou ⌘ sur Mac).
 * Rien n'est envoyé : tout se passe dans la page.
 */
const TEXTE = "Bonjour Madame, je vous confirme mon rendez-vous de mardi à 10 heures. Bien cordialement.";

export default function AtelierCopierColler() {
  const [mac, setMac] = useState(false);
  const [etapes, setEtapes] = useState({ selection: false, copie: false, collage: false });
  const [message, setMessage] = useState('');
  const cible = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const lire = () => {
      const choix = document.documentElement.getAttribute('data-appareil');
      setMac(choix ? choix === 'mac' || choix === 'iphone' : /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    };
    lire();
    document.addEventListener('desclics:appareil', lire);
    return () => document.removeEventListener('desclics:appareil', lire);
  }, []);

  const mod = mac ? '⌘' : 'Ctrl';
  const valider = (cle: keyof typeof etapes, texte: string) => {
    setEtapes((e) => (e[cle] ? e : { ...e, [cle]: true }));
    setMessage(texte);
  };

  const recommencer = () => {
    setEtapes({ selection: false, copie: false, collage: false });
    setMessage('Atelier remis à zéro.');
    if (cible.current) cible.current.value = '';
  };

  const fini = etapes.selection && etapes.copie && etapes.collage;

  return (
    <div className="atelier">
      <p className="atelier-type">Atelier · à faire au clavier</p>
      <ol className="atelier-consignes">
        <li className={etapes.selection ? 'fait' : ''}>
          Cliquez dans le texte du cadre 1, puis appuyez sur <kbd>{mod}</kbd> + <kbd>A</kbd> pour tout sélectionner.
          {etapes.selection && <span className="ok"> Fait.</span>}
        </li>
        <li className={etapes.copie ? 'fait' : ''}>
          Appuyez sur <kbd>{mod}</kbd> + <kbd>C</kbd> pour copier.
          {etapes.copie && <span className="ok"> Fait.</span>}
        </li>
        <li className={etapes.collage ? 'fait' : ''}>
          Cliquez dans le cadre 2, puis appuyez sur <kbd>{mod}</kbd> + <kbd>V</kbd> pour coller.
          {etapes.collage && <span className="ok"> Fait.</span>}
        </li>
      </ol>

      <div className="atelier-zones">
        <label className="atelier-zone">
          <span>Cadre 1 : le texte à copier</span>
          <textarea
            readOnly
            defaultValue={TEXTE}
            rows={4}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
                setTimeout(() => valider('selection', 'Bien : tout le texte est sélectionné, il apparaît surligné.'), 0);
              }
            }}
            onSelect={(e) => {
              const t = e.currentTarget;
              if (t.selectionEnd - t.selectionStart >= TEXTE.length - 1) valider('selection', 'Bien : tout le texte est sélectionné.');
            }}
            onCopy={() => valider('copie', 'Copié. Le texte est dans le presse-papiers, invisible pour l’instant.')}
          />
        </label>
        <label className="atelier-zone">
          <span>Cadre 2 : collez ici</span>
          <textarea
            ref={cible}
            rows={4}
            onPaste={() => valider('collage', 'Collé ! Le texte apparaît dans le cadre 2.')}
          />
        </label>
      </div>

      <p className="atelier-message" role="status" aria-live="polite">{fini ? 'Bravo, vous savez copier-coller. Cela marche partout : e-mail, document, formulaire.' : message}</p>
      <button type="button" className="bouton bouton--secondaire" onClick={recommencer}>Recommencer</button>
    </div>
  );
}
