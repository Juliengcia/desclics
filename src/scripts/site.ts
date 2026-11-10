/* ==========================================================================
   Desclics — comportements communs à toutes les pages.
   Aucune donnée ne quitte l'appareil : réglages dans localStorage uniquement.
   ========================================================================== */

import { initialiserRecherche } from './recherche';
import { initialiserChoixAppareils } from './appareils';
import { initialiserFavoris } from './favoris';
import { initialiserInfobulles } from './infobulles';
import { marquerLiensExternes, initialiserCartes } from './liens-et-cartes';

type Prefs = Partial<Record<'theme' | 'contraste' | 'dyslexie' | 'curseur' | 'animations' | 'simple' | 'regle' | 'loupe' | 'taille' | 'appareil' | 'appareils' | 'voix' | 'vitesse', string>>;
const CLE = 'desclics-prefs';
const racine = document.documentElement;

function lirePrefs(): Prefs {
  try { return JSON.parse(localStorage.getItem(CLE) || '{}'); } catch { return {}; }
}
function ecrirePrefs(p: Prefs) {
  try { localStorage.setItem(CLE, JSON.stringify(p)); } catch { /* navigation privée : on ignore */ }
}
function majPref<K extends keyof Prefs>(k: K, v: Prefs[K] | undefined) {
  const p = lirePrefs();
  if (v === undefined || v === '') delete p[k]; else p[k] = v;
  ecrirePrefs(p);
}

/* ---------- Menus dépliants (méga-menu, menu mobile, sous-menus) ---------- */
const declencheurs = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-ouvre]'));
function fermerMenus(sauf?: HTMLElement) {
  for (const b of declencheurs) {
    const cible = document.getElementById(b.dataset.ouvre!);
    if (!cible || cible === sauf || cible.contains(sauf ?? null) || !['mega-menu', 'menu-mobile'].includes(cible.id)) continue;
    cible.hidden = true; b.setAttribute('aria-expanded', 'false');
  }
}
for (const b of declencheurs) {
  b.addEventListener('click', () => {
    const cible = document.getElementById(b.dataset.ouvre!);
    if (!cible) return;
    const ouvrir = cible.hidden;
    if (ouvrir) fermerMenus(cible);
    cible.hidden = !ouvrir;
    b.setAttribute('aria-expanded', String(ouvrir));
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const ouvert = declencheurs.find((b) => b.getAttribute('aria-expanded') === 'true' && ['mega-menu', 'menu-mobile'].includes(b.dataset.ouvre!));
  if (ouvert) { fermerMenus(); ouvert.focus(); }
});
document.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  if (!t.closest('.site-entete')) fermerMenus();
});

/* ---------- En-tête : toujours visible, affiné quand on descend ---------- */
const entete = document.querySelector<HTMLElement>('[data-entete]');
if (entete) {
  let reduite = false;
  const majEntete = () => {
    const y = window.scrollY;
    // Hystérésis : évite le clignotement quand la hauteur de l'en-tête change.
    if (!reduite && y > 80) { reduite = true; entete.classList.add('entete-reduite'); }
    else if (reduite && y < 8) { reduite = false; entete.classList.remove('entete-reduite'); }
  };
  window.addEventListener('scroll', majEntete, { passive: true });
  majEntete();
  // Accueil : la recherche de l'en-tête apparaît une fois la grande recherche dépassée.
  const heroRecherche = document.querySelector('[data-hero-recherche]');
  if (heroRecherche && entete.classList.contains('entete--accueil')) {
    new IntersectionObserver(([e]) => {
      entete.classList.toggle('recherche-hero-depassee', !e.isIntersecting && e.boundingClientRect.top < 0);
    }, { rootMargin: '-80px 0px 0px 0px' }).observe(heroRecherche);
  }
}

/* ---------- Thème clair / sombre ---------- */
const boutonTheme = document.querySelector<HTMLButtonElement>('[data-bascule-theme]');
function themeEffectif() { return racine.getAttribute('data-theme-effectif') === 'dark' ? 'dark' : 'light'; }
function majBoutonTheme() {
  if (!boutonTheme) return;
  const sombre = themeEffectif() === 'dark';
  boutonTheme.setAttribute('aria-pressed', String(sombre));
  const libelle = boutonTheme.querySelector('[data-theme-libelle]');
  if (libelle) libelle.textContent = 'Mode sombre';
}
boutonTheme?.addEventListener('click', () => {
  const nouveau = themeEffectif() === 'dark' ? 'light' : 'dark';
  racine.setAttribute('data-theme', nouveau);
  racine.setAttribute('data-theme-effectif', nouveau);
  racine.classList.toggle('sombre-systeme', nouveau === 'dark');
  majPref('theme', nouveau);
  majBoutonTheme();
});
majBoutonTheme();

/* ---------- Boîtes de dialogue (recherche, accessibilité) ---------- */
const dlgRecherche = document.getElementById('dialogue-recherche') as HTMLDialogElement | null;
const dlgA11y = document.getElementById('panneau-a11y') as HTMLDialogElement | null;
const dlgFavoris = document.getElementById('dialogue-favoris') as HTMLDialogElement | null;
const boutonA11y = document.querySelector<HTMLButtonElement>('[data-ouvre-a11y]');
function ouvrirDialogue(d: HTMLDialogElement | null, focus?: string) {
  if (!d || d.open) return;
  fermerMenus();
  d.showModal();
  if (focus) d.querySelector<HTMLElement>(focus)?.focus();
}
document.querySelectorAll<HTMLAnchorElement>('[data-ouvre-recherche]').forEach((a) =>
  a.addEventListener('click', (e) => {
    if (!dlgRecherche) return;
    e.preventDefault();
    ouvrirDialogue(dlgRecherche, 'input[type=search]');
  }),
);
boutonA11y?.addEventListener('click', () => { ouvrirDialogue(dlgA11y); boutonA11y.setAttribute('aria-expanded', 'true'); });
dlgA11y?.addEventListener('close', () => boutonA11y?.setAttribute('aria-expanded', 'false'));
document.querySelectorAll<HTMLButtonElement>('[data-ferme-dialogue]').forEach((b) =>
  b.addEventListener('click', () => (b.closest('dialog') as HTMLDialogElement)?.close()),
);
for (const d of [dlgRecherche, dlgA11y, dlgFavoris]) {
  d?.addEventListener('click', (e) => { if (e.target === d) d.close(); });
}
document.addEventListener('keydown', (e) => {
  const t = e.target as HTMLElement;
  if (e.key === '/' && !t.closest('input, textarea, select, [contenteditable]')) {
    e.preventDefault();
    const champEntete = document.querySelector<HTMLInputElement>('[data-entete-recherche] input');
    const heroChamp = document.querySelector<HTMLInputElement>('[data-hero-recherche] input');
    const visible = (el: HTMLElement | null) => el && el.offsetParent !== null;
    if (visible(heroChamp) && !document.querySelector('.recherche-hero-depassee')) heroChamp!.focus();
    else if (visible(champEntete)) champEntete!.focus();
    else ouvrirDialogue(dlgRecherche, 'input[type=search]');
  }
});

/* ---------- Panneau d'accessibilité ---------- */
const PALIERS = [0.8, 0.9, 1, 1.125, 1.25, 1.5, 1.75, 2]; // de 80 % à 200 %
const sortieTaille = document.querySelector<HTMLOutputElement>('[data-taille-valeur]');
function appliquerTaille(v: number) {
  racine.style.setProperty('--echelle-texte', String(v));
  racine.toggleAttribute('data-grand-texte', v >= 1.5);
  if (sortieTaille) sortieTaille.textContent = `${Math.round(v * 100)} %`;
}
appliquerTaille(Number(lirePrefs().taille ?? 1));
document.querySelectorAll<HTMLButtonElement>('[data-taille]').forEach((b) =>
  b.addEventListener('click', () => {
    const actuel = Number(lirePrefs().taille ?? 1);
    let i = PALIERS.findIndex((x) => x >= actuel - 0.001);
    if (i < 0) i = PALIERS.indexOf(1);
    i = Math.min(PALIERS.length - 1, Math.max(0, i + Number(b.dataset.taille)));
    appliquerTaille(PALIERS[i]);
    majPref('taille', PALIERS[i] === 1 ? undefined : String(PALIERS[i]));
  }),
);

const interrupteurs = Array.from(document.querySelectorAll<HTMLButtonElement>('[role=switch][data-pref]'));
function synchroInterrupteurs() {
  for (const s of interrupteurs) s.setAttribute('aria-checked', String(racine.getAttribute(`data-${s.dataset.pref}`) === s.dataset.valeur));
}
for (const s of interrupteurs) {
  s.addEventListener('click', () => {
    const cle = s.dataset.pref as keyof Prefs;
    const actif = racine.getAttribute(`data-${cle}`) === s.dataset.valeur;
    if (actif) racine.removeAttribute(`data-${cle}`); else racine.setAttribute(`data-${cle}`, s.dataset.valeur!);
    majPref(cle, actif ? undefined : s.dataset.valeur);
    synchroInterrupteurs();
    majOutilsVisuels();
  });
}
synchroInterrupteurs();

/* Choix des appareils (un, plusieurs ou tous) : voir appareils.ts */
initialiserChoixAppareils();

document.querySelector('[data-a11y-reinit]')?.addEventListener('click', () => {
  const garder = lirePrefs();
  ecrirePrefs(garder.theme ? { theme: garder.theme } : {});
  for (const k of ['contraste', 'dyslexie', 'curseur', 'animations', 'simple', 'regle', 'loupe']) racine.removeAttribute(`data-${k}`);
  appliquerTaille(1);
  synchroInterrupteurs();
  majOutilsVisuels();
});

/* Règle de lecture et loupe */
const regle = document.querySelector<HTMLElement>('.regle-lecture');
const loupe = document.querySelector<HTMLElement>('.loupe-bulle');
function majOutilsVisuels() {
  if (regle) regle.hidden = racine.getAttribute('data-regle') !== 'oui';
  if (loupe && racine.getAttribute('data-loupe') !== 'oui') loupe.hidden = true;
}
majOutilsVisuels();
document.addEventListener('pointermove', (e) => {
  if (regle && !regle.hidden) regle.style.top = `${e.clientY - regle.offsetHeight / 2}px`;
}, { passive: true });
document.addEventListener('focusin', (e) => {
  if (regle && !regle.hidden) {
    const r = (e.target as HTMLElement).getBoundingClientRect();
    regle.style.top = `${r.top + r.height / 2 - regle.offsetHeight / 2}px`;
  }
});
document.addEventListener('pointerover', (e) => {
  if (!loupe || racine.getAttribute('data-loupe') !== 'oui') return;
  const el = (e.target as HTMLElement).closest('p, li, h1, h2, h3, td, th, a, button, label, dt, dd, figcaption');
  const texte = el?.textContent?.trim().replace(/\s+/g, ' ');
  if (texte && !el!.closest('.loupe-bulle')) { loupe.textContent = texte.slice(0, 220); loupe.hidden = false; }
  else loupe.hidden = true;
});

/* ---------- Lecture à voix haute (synthèse vocale du navigateur, hors ligne si possible) ---------- */
const synth: SpeechSynthesis | undefined = 'speechSynthesis' in window ? window.speechSynthesis : undefined;
const choixVoix = document.querySelector<HTMLSelectElement>('[data-voix-choix]');
const curseurVitesse = document.querySelector<HTMLInputElement>('[data-voix-vitesse]');
const sortieVitesse = document.querySelector<HTMLOutputElement>('[data-vitesse-valeur]');
if (!synth) {
  document.querySelector<HTMLElement>('[data-voix-indispo]')?.removeAttribute('hidden');
  document.querySelector<HTMLElement>('[data-voix-controles]')?.setAttribute('hidden', '');
  document.querySelectorAll<HTMLElement>('[data-lire-cible]').forEach((b) => (b.hidden = true));
}
function voixFrancaises() { return synth ? synth.getVoices().filter((v) => v.lang.toLowerCase().startsWith('fr')) : []; }
function remplirVoix() {
  if (!choixVoix) return;
  const pref = lirePrefs().voix;
  const voix = voixFrancaises();
  choixVoix.innerHTML = '<option value="">Voix française par défaut</option>' +
    voix.map((v) => `<option value="${v.name}"${v.name === pref ? ' selected' : ''}>${v.name}</option>`).join('');
}
if (synth) { remplirVoix(); synth.addEventListener?.('voiceschanged', remplirVoix); }
choixVoix?.addEventListener('change', () => majPref('voix', choixVoix.value));
if (curseurVitesse) {
  curseurVitesse.value = lirePrefs().vitesse ?? '1';
  if (sortieVitesse) sortieVitesse.textContent = curseurVitesse.value;
  curseurVitesse.addEventListener('input', () => {
    if (sortieVitesse) sortieVitesse.textContent = curseurVitesse.value;
    majPref('vitesse', curseurVitesse.value);
  });
}
function texteLisible(el: Element): string {
  const clone = el.cloneNode(true) as HTMLElement;
  clone.querySelectorAll('.ne-pas-lire, script, style, [aria-hidden=true], nav, button, .visually-hidden, [hidden]').forEach((n) => n.remove());
  return (clone.textContent ?? '').replace(/\s+/g, ' ').trim();
}
export function lire(texte: string) {
  if (!synth || !texte) return;
  synth.cancel();
  const p = lirePrefs();
  // Découpe en phrases : certains navigateurs coupent les textes longs.
  const morceaux = texte.match(/[^.!?:]+[.!?:]?/g) ?? [texte];
  const voix = voixFrancaises().find((v) => v.name === p.voix) ?? voixFrancaises()[0];
  for (const m of morceaux) {
    const u = new SpeechSynthesisUtterance(m.trim());
    u.lang = 'fr-FR';
    if (voix) u.voice = voix;
    u.rate = Number(p.vitesse ?? 1);
    synth.speak(u);
  }
}
document.querySelector('[data-lire-page]')?.addEventListener('click', () => {
  const main = document.getElementById('contenu');
  if (main) lire(texteLisible(main));
});
document.querySelector('[data-lire-stop]')?.addEventListener('click', () => synth?.cancel());
document.querySelectorAll<HTMLButtonElement>('[data-lire-cible]').forEach((b) =>
  b.addEventListener('click', () => {
    const cible = document.getElementById(b.dataset.lireCible!);
    if (!cible) return;
    if (synth?.speaking && b.getAttribute('aria-pressed') === 'true') { synth.cancel(); b.setAttribute('aria-pressed', 'false'); return; }
    document.querySelectorAll('[data-lire-cible]').forEach((x) => x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', 'true');
    lire(texteLisible(cible));
  }),
);
window.addEventListener('pagehide', () => synth?.cancel());

/* ---------- Recherche, favoris, liens externes, cartes, infobulles ---------- */
initialiserRecherche();
initialiserFavoris();
marquerLiensExternes();
initialiserCartes();
initialiserInfobulles();

/* ---------- Site installable et lisible hors connexion ---------- */
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/sw.js`).catch(() => {});
  });
}
