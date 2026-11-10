/* ==========================================================================
   « Mon appareil » : un, plusieurs ou tous les appareils (Windows, Mac, Android, iPhone).
   Par défaut, le système de la personne est détecté (attribut data-systeme posé avant l'affichage).
   Le choix est gardé sur l'appareil (localStorage), jamais envoyé.
   ========================================================================== */

export const NOMS_APPAREILS: Record<string, string> = { windows: 'Windows', mac: 'Mac', android: 'Android', iphone: 'iPhone' };
const CLE = 'desclics-prefs';
const racine = document.documentElement;

export function appareilsChoisis(): string[] {
  return (racine.getAttribute('data-appareils') ?? '').split(',').filter((a) => a in NOMS_APPAREILS);
}

/**
 * Versions à afficher pour un bloc qui existe pour `propres` (ex. ['android','iphone']).
 * Intersection avec le choix ; si elle est vide (sujet mobile lu sur un ordinateur, ou l'inverse), toutes.
 */
export function appareilsAffiches(propres: string[]): string[] {
  const choix = appareilsChoisis();
  const communs = propres.filter((a) => choix.includes(a));
  return communs.length ? communs : propres;
}

export function definirAppareils(liste: string[]) {
  const propre = [...new Set(liste)].filter((a) => a in NOMS_APPAREILS);
  let p: Record<string, string> = {};
  try { p = JSON.parse(localStorage.getItem(CLE) || '{}'); } catch { /* */ }
  delete p.appareil; // ancien réglage à choix unique
  if (propre.length) {
    p.appareils = propre.join(',');
    racine.setAttribute('data-appareils', p.appareils);
    racine.removeAttribute('data-appareils-auto');
  } else {
    // Rien de coché : retour à la détection automatique.
    delete p.appareils;
    const det = racine.getAttribute('data-systeme') ?? '';
    if (det) racine.setAttribute('data-appareils', det); else racine.removeAttribute('data-appareils');
    racine.setAttribute('data-appareils-auto', '');
  }
  try { localStorage.setItem(CLE, JSON.stringify(p)); } catch { /* navigation privée */ }
  document.dispatchEvent(new CustomEvent('desclics:appareils', { detail: appareilsChoisis() }));
}

/** Ajoute ou retire un appareil, en partant de ce qui est affiché dans le bloc. */
export function basculerAppareil(a: string, montres: string[]) {
  const base = new Set([...appareilsChoisis(), ...montres]);
  if (base.has(a)) base.delete(a); else base.add(a);
  definirAppareils([...base]);
}

/** Cases à cocher du panneau Accessibilité. */
export function initialiserChoixAppareils() {
  const cases = Array.from(document.querySelectorAll<HTMLInputElement>('[data-choix-appareil]'));
  const detecte = document.querySelector<HTMLElement>('[data-systeme-nom]');
  const sys = racine.getAttribute('data-systeme') ?? '';
  if (detecte) detecte.textContent = sys ? NOMS_APPAREILS[sys] : 'non reconnu';
  const synchro = () => {
    const choix = appareilsChoisis();
    cases.forEach((c) => (c.checked = choix.includes(c.value)));
  };
  cases.forEach((c) => c.addEventListener('change', () => definirAppareils(cases.filter((x) => x.checked).map((x) => x.value))));
  document.querySelector('[data-appareils-tous]')?.addEventListener('click', () => definirAppareils(Object.keys(NOMS_APPAREILS)));
  document.querySelector('[data-appareils-detecter]')?.addEventListener('click', () => definirAppareils([]));
  document.addEventListener('desclics:appareils', synchro);
  synchro();
}
