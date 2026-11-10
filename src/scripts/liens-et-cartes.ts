/* ==========================================================================
   1. Liens externes : nouvel onglet, icône « lien externe » et texte caché
      « (s'ouvre dans un nouvel onglet) » pour les lecteurs d'écran.
   2. Cartes cliquables : seul le titre est un vrai lien. Le reste du texte se sélectionne
      et se copie ; un clic simple ailleurs sur la carte suit le lien du titre.
   ========================================================================== */

const ICONE_EXTERNE = '<svg class="icone-externe" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>';

export function marquerLiensExternes(racine: ParentNode = document) {
  racine.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((a) => {
    if (a.dataset.externe !== undefined) return;
    let url: URL;
    try { url = new URL(a.href, location.href); } catch { return; }
    if (!/^https?:$/.test(url.protocol) || url.origin === location.origin) return;
    a.dataset.externe = '';
    a.target = '_blank';
    const rel = new Set((a.rel || '').split(' ').filter(Boolean));
    rel.add('noopener'); rel.add('noreferrer');
    a.rel = [...rel].join(' ');
    a.insertAdjacentHTML('beforeend', `${ICONE_EXTERNE}<span class="visually-hidden"> (s’ouvre dans un nouvel onglet)</span>`);
  });
}

export function initialiserCartes() {
  document.querySelectorAll<HTMLElement>('.carte-lien').forEach((carte) => {
    const lien = carte.querySelector<HTMLAnchorElement>('h2 a, h3 a, [data-carte-lien]') ?? carte.querySelector<HTMLAnchorElement>('a');
    if (!lien) return;
    lien.setAttribute('data-carte-lien', '');
    carte.classList.add('carte-cliquable');
    carte.addEventListener('click', (e) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, input, select, textarea, summary, label')) return;
      // Pas de navigation si l'on vient de sélectionner du texte.
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed && carte.contains(sel.anchorNode)) return;
      if (e.ctrlKey || e.metaKey || e.button === 1) window.open(lien.href, '_blank', 'noopener');
      else lien.click();
    });
    carte.addEventListener('auxclick', (e) => {
      if (e.button === 1 && !(e.target as HTMLElement).closest('a')) window.open(lien.href, '_blank', 'noopener');
    });
  });
}
