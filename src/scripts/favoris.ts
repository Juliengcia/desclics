/* ==========================================================================
   Favoris : sans compte, gardés dans ce navigateur (localStorage).
   Bouton « Ajouter aux favoris » sur chaque page, liste dans l'en-tête (étoile) et sur /favoris/.
   ========================================================================== */

interface Favori { url: string; titre: string; rubrique?: string; ajoute: string }
const CLE = 'desclics-favoris';

export function lireFavoris(): Favori[] {
  try { const l = JSON.parse(localStorage.getItem(CLE) || '[]'); return Array.isArray(l) ? l : []; } catch { return []; }
}
function ecrire(l: Favori[]) {
  try { localStorage.setItem(CLE, JSON.stringify(l)); return true; } catch { return false; }
}
const adresse = () => location.pathname;
const echapper = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

function majCompteur() {
  const n = lireFavoris().length;
  document.querySelectorAll<HTMLElement>('[data-favoris-compte]').forEach((b) => {
    b.hidden = n === 0;
    b.textContent = String(n);
    b.setAttribute('aria-hidden', 'true');
  });
  document.querySelectorAll<HTMLElement>('[data-ouvre-favoris] .visually-hidden').forEach((s) => (s.textContent = n ? `Mes favoris (${n})` : 'Mes favoris'));
}

function majBoutons() {
  const present = lireFavoris().some((f) => f.url === adresse());
  document.querySelectorAll<HTMLButtonElement>('[data-favori-bouton]').forEach((b) => {
    b.setAttribute('aria-pressed', String(present));
    const t = b.querySelector('[data-favori-texte]');
    if (t) t.textContent = present ? 'Dans mes favoris' : 'Ajouter aux favoris';
    b.dataset.infobulle = present ? 'Retirer cette page de mes favoris' : 'Garder cette page dans mes favoris, sur cet appareil';
  });
}

/** Affiche la liste dans un conteneur (boîte de dialogue ou page /favoris/). */
function afficherListe(conteneur: HTMLElement) {
  const l = lireFavoris();
  if (!l.length) {
    conteneur.innerHTML = `<p class="favoris-vide">Aucune page en favori pour l'instant. Sur une page utile, appuyez sur « Ajouter aux favoris » (l'étoile, près du titre).</p>`;
    return;
  }
  conteneur.innerHTML = `<ul class="favoris-liste">${l.map((f, i) => `
    <li><a href="${echapper(f.url)}">${echapper(f.titre)}</a>${f.rubrique ? `<span class="favoris-rubrique">${echapper(f.rubrique)}</span>` : ''}
      <button type="button" class="bouton-icone favoris-retirer" data-retirer="${i}" data-infobulle="Retirer « ${echapper(f.titre)} » des favoris">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
        <span class="visually-hidden">Retirer « ${echapper(f.titre)} » des favoris</span>
      </button></li>`).join('')}</ul>`;
  conteneur.querySelectorAll<HTMLButtonElement>('[data-retirer]').forEach((b) => b.addEventListener('click', () => {
    const liste = lireFavoris();
    const retire = liste.splice(Number(b.dataset.retirer), 1)[0];
    ecrire(liste);
    afficherListe(conteneur);
    majCompteur(); majBoutons();
    const statut = document.querySelector('[data-favoris-statut]');
    if (statut) statut.textContent = `« ${retire?.titre ?? ''} » retiré des favoris.`;
    (conteneur.querySelector('a, button') as HTMLElement | null)?.focus();
  }));
}

export function initialiserFavoris() {
  majCompteur();
  majBoutons();
  document.querySelectorAll<HTMLButtonElement>('[data-favori-bouton]').forEach((b) => b.addEventListener('click', () => {
    const l = lireFavoris();
    const i = l.findIndex((f) => f.url === adresse());
    const statut = document.querySelector('[data-favoris-statut]');
    if (i >= 0) { l.splice(i, 1); if (statut) statut.textContent = 'Page retirée de vos favoris.'; }
    else {
      const titre = document.querySelector('main h1')?.textContent?.trim() || document.title.replace(/\s*\|.*$/, '');
      l.unshift({ url: adresse(), titre, rubrique: b.dataset.rubrique || undefined, ajoute: new Date().toISOString().slice(0, 10) });
      if (statut) statut.textContent = 'Page ajoutée à vos favoris. Retrouvez-la avec l’étoile, en haut de l’écran.';
    }
    if (!ecrire(l) && statut) statut.textContent = "Votre navigateur bloque l'enregistrement (navigation privée ?). Les favoris ne peuvent pas être gardés.";
    majBoutons(); majCompteur();
  }));

  const dlg = document.getElementById('dialogue-favoris') as HTMLDialogElement | null;
  const zoneDlg = dlg?.querySelector<HTMLElement>('[data-favoris-liste]');
  document.querySelectorAll<HTMLAnchorElement>('[data-ouvre-favoris]').forEach((a) => a.addEventListener('click', (e) => {
    if (!dlg || !zoneDlg) return;
    e.preventDefault();
    afficherListe(zoneDlg);
    dlg.showModal();
  }));
  // Page /favoris/
  const zonePage = document.querySelector<HTMLElement>('[data-favoris-page]');
  if (zonePage) afficherListe(zonePage);
  window.addEventListener('storage', (e) => { if (e.key === CLE) { majCompteur(); majBoutons(); if (zonePage) afficherListe(zonePage); } });
}
