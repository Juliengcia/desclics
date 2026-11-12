# Visuels du site

Chaque visuel, sa date, son état. À revoir tous les trois mois : refaire ceux dont l'interface a changé.

| Visuel | Module | Nature | Réalisé | État |
|---|---|---|---|---|
| Clavier AZERTY, touches spéciales numérotées (`src/components/schemas/SchemaClavier.astro`) | ordinateur/clavier-raccourcis | Schéma SVG | 2026-11 | À jour |
| Icônes PWA et image de partage (`public/`, `scripts/generer-images.mjs`) | tout le site | Image générée | 2026-11 | À jour |
| Ordinateur fixe et portable, éléments numérotés (`SchemaOrdinateur.astro`) | ordinateur/materiel | Schéma SVG | 2026-11 | À jour |
| Arborescence de dossiers et fichiers (`SchemaDossiers.astro`) | ordinateur/fichiers-dossiers | Schéma SVG | 2026-11 | À jour |
| Prises vues de face (`SchemaPrises.astro`) | ordinateur/connectiques | Schéma SVG | 2026-11 | À jour |
| Frise des connectiques (`<Frise>`) | ordinateur/connectiques | Frise | 2026-11 | À jour |
| Simulateur de faux messages (`SimulateurArnaques.tsx`), messages fictifs | securite/arnaques | Atelier | 2026-11 | À revoir tous les 6 mois (nouvelles arnaques) |
| Illustrations animées de l'accueil : recherche, étapes, fiche, faux SMS (`accueil/Illustration.astro`) | accueil | Illustration CSS | 2026-11 | À jour (le faux SMS est fictif) |
| Fiches Bristol en PDF A5 (`fiches/a5`, `generer-fiches-pdf.mjs`) | tous les modules | PDF généré au build | à chaque build | Toujours à jour |
