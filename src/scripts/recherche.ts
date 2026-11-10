/* ==========================================================================
   Recherche (Pagefind) : liste déroulante accessible (combobox) ou liste complète,
   et dictée vocale quand le navigateur la propose vraiment.
   ========================================================================== */

interface ResultatPagefind {
  url: string; excerpt: string; meta: { title?: string };
  sub_results?: { title: string; url: string; excerpt: string }[];
}
interface Pagefind {
  options?: (o: Record<string, unknown>) => Promise<void>;
  debouncedSearch: (q: string, o?: unknown, ms?: number) => Promise<{ results: { data: () => Promise<ResultatPagefind> }[] } | null>;
}
let pagefind: Promise<Pagefind | null> | null = null;
function chargerPagefind(url: string) {
  pagefind ??= import(/* @vite-ignore */ url)
    .then(async (pf: Pagefind) => { await pf.options?.({ excerptLength: 18 }); return pf; })
    .catch(() => null);
  return pagefind;
}
const echapper = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
/** Titre de page sans « | Desclics ». */
const titrePropre = (t?: string) => (t ?? '').replace(/\s*\|\s*Desclics$/, '');

/* ---------- Dictée vocale ---------- */
type Reco = {
  lang: string; interimResults: boolean; continuous: boolean; maxAlternatives: number;
  start: () => void; stop: () => void; abort: () => void;
  onresult: ((e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onend: (() => void) | null; onerror: ((e: { error: string }) => void) | null; onstart: (() => void) | null;
};
const W = window as unknown as { SpeechRecognition?: new () => Reco; webkitSpeechRecognition?: new () => Reco; isSecureContext: boolean };
const Reconnaissance = W.SpeechRecognition ?? W.webkitSpeechRecognition;
// Brave expose l'interface mais refuse toujours la dictée : on ne montre pas un bouton qui ne marche pas.
const dicteeDispo = Boolean(Reconnaissance) && W.isSecureContext && !('brave' in navigator);
let dicteeCassee = false;

const MESSAGES_ERREUR: Record<string, string> = {
  'not-allowed': "Le micro est bloqué. Autorisez-le dans la barre d'adresse du navigateur, puis réessayez.",
  'service-not-allowed': "La dictée est désactivée sur cet appareil. Tapez votre question au clavier.",
  'no-speech': "Je n'ai rien entendu. Appuyez sur le micro et parlez juste après.",
  'audio-capture': "Aucun micro n'a été trouvé sur cet appareil.",
  network: "La dictée a besoin d'Internet et n'a pas pu se connecter. Tapez votre question au clavier.",
  'language-not-supported': "La dictée en français n'est pas disponible dans ce navigateur.",
};

export function initialiserRecherche() {
  document.querySelectorAll<HTMLElement>('[data-recherche]').forEach((bloc) => {
    const champ = bloc.querySelector<HTMLInputElement>('[data-recherche-champ]')!;
    const etat = bloc.querySelector<HTMLElement>('[data-recherche-etat]')!;
    const liste = bloc.querySelector<HTMLElement>('[data-recherche-resultats]')!;
    const deroulant = bloc.querySelector<HTMLElement>('[data-recherche-deroulant]');
    const pied = bloc.querySelector<HTMLElement>('[data-recherche-pied]');
    const index = bloc.dataset.index!;
    const pageResultats = bloc.dataset.pageResultats!;
    const enListe = bloc.dataset.mode === 'deroulant';
    let actif = -1;
    let options: HTMLElement[] = [];

    function ouvrir(o: boolean) {
      if (!deroulant) return;
      deroulant.hidden = !o;
      champ.setAttribute('aria-expanded', String(o));
      if (!o) { actif = -1; champ.removeAttribute('aria-activedescendant'); }
    }
    function selectionner(i: number) {
      options.forEach((o, j) => o.setAttribute('aria-selected', String(j === i)));
      actif = i;
      if (i >= 0) { champ.setAttribute('aria-activedescendant', options[i].id); options[i].scrollIntoView({ block: 'nearest' }); }
      else champ.removeAttribute('aria-activedescendant');
    }
    function aller(url: string) { window.location.href = url; }
    const urlTous = (q: string) => `${pageResultats}?q=${encodeURIComponent(q)}`;

    async function chercher() {
      const q = champ.value.trim();
      if (q.length < 2) { liste.innerHTML = ''; etat.textContent = ''; ouvrir(false); return; }
      const pf = await chargerPagefind(index);
      if (!pf) { etat.textContent = "La recherche n'est disponible qu'une fois le site construit (npm run build)."; return; }
      const rep = await pf.debouncedSearch(q, {}, 200);
      if (!rep || champ.value.trim() !== q) return; // remplacée par une frappe plus récente
      const total = rep.results.length;
      const nb = enListe ? 4 : 20;
      const donnees = await Promise.all(rep.results.slice(0, nb).map((r) => r.data()));

      if (enListe) {
        const lignes = donnees.map((d, i) => {
          const chap = (d.sub_results ?? []).find((s) => s.url !== d.url && !s.url.endsWith('#'));
          const url = chap?.url ?? d.url;
          return `<li role="option" id="${champ.id}-opt-${i}" aria-selected="false" data-url="${echapper(url)}">
            <span class="opt-titre">${echapper(titrePropre(d.meta.title) || d.url)}</span>
            ${chap ? `<span class="opt-chapitre">${echapper(chap.title)}</span>` : ''}
            <span class="opt-extrait">${chap?.excerpt ?? d.excerpt}</span></li>`;
        });
        if (total > 0) {
          lignes.push(`<li role="option" id="${champ.id}-opt-tous" aria-selected="false" class="opt-tous" data-url="${echapper(urlTous(q))}">Voir tous les résultats (${total}) <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></li>`);
        }
        liste.innerHTML = lignes.join('');
        options = Array.from(liste.querySelectorAll<HTMLElement>('[role=option]'));
        if (pied) pied.textContent = total === 0 ? `Aucun résultat pour « ${q} ». Essayez un mot plus simple, ou consultez le glossaire.` : '';
        etat.textContent = total === 0 ? `Aucun résultat pour « ${q} ».` : `${total} résultat${total > 1 ? 's' : ''}. Flèches haut et bas pour parcourir, Entrée pour ouvrir.`;
        actif = -1;
        ouvrir(true);
      } else {
        etat.textContent = total === 0
          ? `Aucun résultat pour « ${q} ». Essayez un mot plus simple, ou consultez le glossaire.`
          : `${total} résultat${total > 1 ? 's' : ''} pour « ${q} ».`;
        liste.innerHTML = donnees.map((d) => {
          const sous = (d.sub_results ?? []).filter((s) => s.url !== d.url).slice(0, 3);
          return `<li><a class="res-titre" href="${d.url}">${echapper(titrePropre(d.meta.title) || d.url)}</a>
            <p class="res-extrait">${d.excerpt}</p>
            ${sous.length ? `<ul class="res-sous">${sous.map((s) => `<li><a href="${s.url}">${echapper(s.title)}</a></li>`).join('')}</ul>` : ''}</li>`;
        }).join('');
      }
    }

    champ.addEventListener('input', chercher);
    champ.addEventListener('focus', () => { chargerPagefind(index); if (enListe && liste.children.length) ouvrir(true); });

    if (enListe) {
      champ.addEventListener('keydown', (e) => {
        const ouvert = deroulant && !deroulant.hidden;
        if (e.key === 'ArrowDown') { e.preventDefault(); if (!ouvert) { chercher(); return; } selectionner(Math.min(options.length - 1, actif + 1)); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); if (ouvert) selectionner(Math.max(-1, actif - 1)); }
        else if (e.key === 'Home' && ouvert && actif >= 0) { e.preventDefault(); selectionner(0); }
        else if (e.key === 'End' && ouvert && actif >= 0) { e.preventDefault(); selectionner(options.length - 1); }
        else if (e.key === 'Escape') { if (ouvert) { e.preventDefault(); e.stopPropagation(); ouvrir(false); } else if (champ.value) { champ.value = ''; chercher(); } }
        else if (e.key === 'Enter') {
          e.preventDefault();
          const q = champ.value.trim();
          if (actif >= 0 && options[actif]) aller(options[actif].dataset.url!);
          else if (q) aller(urlTous(q));
        }
      });
      liste.addEventListener('mousedown', (e) => e.preventDefault()); // garde le focus dans le champ
      liste.addEventListener('click', (e) => {
        const o = (e.target as HTMLElement).closest<HTMLElement>('[role=option]');
        if (o) aller(o.dataset.url!);
      });
      document.addEventListener('click', (e) => { if (!bloc.contains(e.target as Node)) ouvrir(false); });
      champ.addEventListener('blur', () => setTimeout(() => { if (!bloc.contains(document.activeElement)) ouvrir(false); }, 150));
    } else {
      bloc.querySelector('form')?.addEventListener('submit', (e) => { e.preventDefault(); chercher(); });
      const q = new URLSearchParams(location.search).get('q');
      if (q) { champ.value = q; chercher(); }
    }

    /* Dictée */
    const boutonVoix = bloc.querySelector<HTMLButtonElement>('[data-recherche-voix]');
    const note = bloc.querySelector<HTMLElement>('[data-recherche-voix-note]');
    if (!boutonVoix || !dicteeDispo || dicteeCassee) return;
    boutonVoix.hidden = false;
    let reco: Reco | null = null;
    function dire(message: string) { if (note) { note.textContent = message; note.hidden = !message; } }
    boutonVoix.addEventListener('click', () => {
      if (reco) { reco.stop(); return; }
      dire('');
      try { reco = new Reconnaissance!(); } catch { boutonVoix.hidden = true; return; }
      reco.lang = 'fr-FR'; reco.interimResults = true; reco.continuous = false; reco.maxAlternatives = 1;
      reco.onstart = () => { boutonVoix.setAttribute('aria-pressed', 'true'); dire('Parlez maintenant… La recherche démarre dès que vous vous arrêtez.'); };
      reco.onresult = (e) => {
        let texte = '';
        let fini = false;
        for (let i = 0; i < e.results.length; i++) { texte += e.results[i][0].transcript; if (e.results[i].isFinal) fini = true; }
        champ.value = texte.trim().replace(/[.?!]$/, '');
        if (fini) { champ.focus(); chercher(); dire(''); }
      };
      reco.onerror = (e) => {
        dire(MESSAGES_ERREUR[e.error] ?? 'La dictée a échoué. Tapez votre question au clavier.');
        if (['network', 'service-not-allowed', 'language-not-supported'].includes(e.error)) {
          dicteeCassee = true;
          document.querySelectorAll<HTMLElement>('[data-recherche-voix]').forEach((b) => (b.hidden = true));
        }
      };
      reco.onend = () => { reco = null; boutonVoix.setAttribute('aria-pressed', 'false'); if (note?.textContent?.startsWith('Parlez')) dire(''); };
      try { reco.start(); } catch { reco = null; dire('La dictée a échoué. Tapez votre question au clavier.'); }
    });
  });
}
