/* Desclics — service worker : lecture hors connexion.
   Stratégie : réseau d'abord pour les pages (contenu à jour), cache sinon.
   Les fichiers statiques (CSS, JS, polices, images) : cache d'abord. */
const VERSION = 'desclics-v1';
const BASE = new URL('./', self.location).pathname;
const ESSENTIELS = [BASE, `${BASE}glossaire/`, `${BASE}plan-du-site/`, `${BASE}manifest.webmanifest`, `${BASE}favicon.svg`];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ESSENTIELS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((cles) => Promise.all(cles.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((rep) => { const copie = rep.clone(); caches.open(VERSION).then((c) => c.put(req, copie)); return rep; })
        .catch(() => caches.match(req).then((r) => r || caches.match(BASE)))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then((r) => r || fetch(req).then((rep) => {
      if (rep.ok) { const copie = rep.clone(); caches.open(VERSION).then((c) => c.put(req, copie)); }
      return rep;
    }))
  );
});
