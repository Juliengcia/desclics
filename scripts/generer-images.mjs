/** Génère les icônes PWA et l'image de partage (Open Graph) à partir du logo. À relancer si le logo change. */
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><path d="M18 14l20 12-9 2 5 10-4 2-5-10-7 6z" fill="none" stroke="#fff" stroke-width="3.4" stroke-linejoin="round"/><path d="M10 8l4 4M6 18h5M18 4v5" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/></svg>`;
const navigateur = await chromium.launch();
const page = await navigateur.newPage();
for (const t of [192, 512]) {
  await page.setViewportSize({ width: t, height: t });
  await page.setContent(`<body style="margin:0;background:#2440C8;display:grid;place-items:center;height:100vh"><div style="width:62%">${logo}</div></body>`);
  await page.screenshot({ path: `public/icone-${t}.png` });
}
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(`<body style="margin:0;height:100vh;background:#F5F2EA;font-family:Inter,system-ui,sans-serif;position:relative;overflow:hidden">
  <div style="position:absolute;width:640px;height:420px;border-radius:50%;background:#6FA8E8;filter:blur(60px);opacity:.6;top:-80px;right:-60px"></div>
  <div style="position:absolute;width:420px;height:300px;border-radius:50%;background:#7DC48A;filter:blur(60px);opacity:.55;top:260px;right:220px"></div>
  <div style="position:absolute;width:360px;height:240px;border-radius:50%;background:#F29A5B;filter:blur(60px);opacity:.55;bottom:-60px;right:0"></div>
  <div style="position:absolute;left:80px;top:90px;display:flex;align-items:center;gap:20px">
    <div style="width:72px;height:72px;background:#2440C8;border-radius:18px;display:grid;place-items:center"><div style="width:48px">${logo}</div></div>
    <span style="font-size:52px;font-weight:700;letter-spacing:-2px;color:#16181D">Desclics</span></div>
  <div style="position:absolute;left:80px;top:250px;font-size:76px;font-weight:600;letter-spacing:-3px;line-height:1.05;color:#16181D;max-width:820px">Le numérique, expliqué clairement.</div>
  <div style="position:absolute;left:80px;bottom:80px;font-size:30px;color:#4A4F5A">Gratuit · sans compte · sans publicité</div></body>`);
await page.screenshot({ path: 'public/og-image.png' });
await navigateur.close();
console.log('Icônes et image de partage générées dans public/.');
