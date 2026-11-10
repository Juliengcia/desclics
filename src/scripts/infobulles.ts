/* ==========================================================================
   Infobulles sur tout élément cliquable, au survol (après un court délai) et au focus clavier.
   WCAG 1.4.13 : l'infobulle reste visible tant qu'on la survole, se ferme avec Échap,
   et ne cache pas l'élément. Elle complète le nom accessible (aria-describedby) seulement
   si elle apporte une information en plus ; sinon elle est masquée aux lecteurs d'écran.
   Texte : data-infobulle si présent, sinon déduit (lien externe, ancre, page du site, bouton).
   ========================================================================== */

const CIBLES = 'a[href], button, summary, [role="tab"], [role="switch"], label:has(input), input[type="checkbox"], input[type="radio"], select, .carte-cliquable';

function texteVisible(el: Element) { return (el.textContent ?? '').replace(/\s+/g, ' ').trim(); }

function texteInfobulle(el: HTMLElement): string {
  if (el.dataset.infobulle) return el.dataset.infobulle;
  if (el.matches('.carte-cliquable')) {
    const t = el.querySelector('[data-carte-lien]');
    return t ? `Ouvrir « ${texteVisible(t)} »` : '';
  }
  if (el instanceof HTMLAnchorElement) {
    const url = new URL(el.href, location.href);
    const nom = el.getAttribute('aria-label') || texteVisible(el);
    if (url.origin !== location.origin) return `Site externe : ${url.hostname.replace(/^www\./, '')}. S’ouvre dans un nouvel onglet.`;
    if (url.pathname === location.pathname && url.hash) return `Aller plus bas dans la page : ${nom}`;
    if (url.protocol === 'mailto:') return 'Écrire un e-mail';
    return nom ? `Ouvrir la page : ${nom}` : 'Ouvrir la page';
  }
  if (el.matches('summary')) return (el.parentElement as HTMLDetailsElement)?.open ? 'Replier' : 'Déplier';
  const nom = el.getAttribute('aria-label') || texteVisible(el);
  return nom;
}

export function initialiserInfobulles() {
  const bulle = document.getElementById('infobulle');
  if (!bulle) return; // sur écran tactile, pas de survol : l'infobulle s'affiche au focus clavier.
  let cible: HTMLElement | null = null;
  let minuteur = 0;
  let survolBulle = false;

  function placer() {
    if (!cible || !bulle) return;
    const r = cible.getBoundingClientRect();
    const b = bulle.getBoundingClientRect();
    let top = r.bottom + 8;
    if (top + b.height > window.innerHeight - 8) top = r.top - b.height - 8;
    let left = r.left + r.width / 2 - b.width / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - b.width - 8));
    bulle.style.top = `${Math.max(8, top)}px`;
    bulle.style.left = `${left}px`;
  }
  function montrer(el: HTMLElement) {
    const texte = texteInfobulle(el);
    if (!texte || el.closest('[data-sans-infobulle]')) return;
    cible = el;
    bulle!.textContent = texte;
    bulle!.hidden = false;
    // Lu par les lecteurs d'écran seulement s'il ajoute quelque chose au nom de l'élément.
    const nom = (el.getAttribute('aria-label') || texteVisible(el)).toLowerCase();
    if (!nom.includes(texte.toLowerCase())) {
      const d = (el.getAttribute('aria-describedby') ?? '').split(' ').filter((x) => x && x !== 'infobulle');
      el.setAttribute('aria-describedby', [...d, 'infobulle'].join(' '));
    }
    else bulle!.setAttribute('aria-hidden', 'true');
    placer();
  }
  function cacher() {
    clearTimeout(minuteur);
    if (!cible) return;
    const d = (cible.getAttribute('aria-describedby') ?? '').split(' ').filter((x) => x && x !== 'infobulle').join(' ');
    if (d) cible.setAttribute('aria-describedby', d); else cible.removeAttribute('aria-describedby');
    cible = null;
    bulle!.hidden = true;
    bulle!.removeAttribute('aria-hidden');
  }

  document.addEventListener('pointerover', (e) => {
    if ((e as PointerEvent).pointerType === 'touch') return;
    if (bulle.contains(e.target as Node)) { survolBulle = true; return; }
    const el = (e.target as HTMLElement).closest<HTMLElement>(CIBLES);
    if (!el || el === cible) return;
    clearTimeout(minuteur);
    minuteur = window.setTimeout(() => { cacher(); montrer(el); }, 450);
  });
  document.addEventListener('pointerout', (e) => {
    if (bulle.contains(e.target as Node)) { survolBulle = false; }
    const vers = (e as PointerEvent).relatedTarget as Node | null;
    if (vers && (bulle.contains(vers) || cible?.contains(vers))) return;
    clearTimeout(minuteur);
    setTimeout(() => { if (!survolBulle && cible && document.activeElement !== cible) cacher(); }, 120);
  });
  document.addEventListener('focusin', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>(CIBLES);
    cacher();
    if (el && el.matches(':focus-visible')) montrer(el);
  });
  document.addEventListener('focusout', () => cacher());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !bulle.hidden) cacher(); }, true);
  window.addEventListener('scroll', () => cacher(), { passive: true });
  document.addEventListener('click', () => cacher());

  // Les infobulles natives (title) feraient doublon : on les déplace.
  document.querySelectorAll<HTMLElement>('[title]').forEach((el) => {
    if (el.matches(CIBLES) && !el.dataset.infobulle) { el.dataset.infobulle = el.title; el.removeAttribute('title'); }
  });
}
