// scripts/gen-screenshots.mjs — draftpilot (85)
// Usage: node scripts/gen-screenshots.mjs
// Requires: npm install playwright sharp && npx playwright install chromium
// Output: public/marketing/screenshots/<device>/<tag>.png

import { chromium } from 'playwright';
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const APP = {
  baseUrl: process.env.SCREENSHOT_BASE_URL || 'https://draftpilot.dev',
};

const PAGES = [
  { path: '/',          tag: '01-home' },
  { path: '/pricing',   tag: '02-pricing' },
  { path: '/about',     tag: '03-about' },
  { path: '/help',      tag: '04-features' },
];

const DEVICES = [
  { name: 'iphone-6.7', width: 1290, height: 2796, dpr: 3 },
  { name: 'iphone-5.5', width: 1242, height: 2208, dpr: 3 },
  { name: 'pixel-1080', width: 1080, height: 1920, dpr: 2 },
];

const browser = await chromium.launch({ headless: true });

for (const device of DEVICES) {
  const vpW = Math.round(device.width / device.dpr);
  const vpH = Math.round(device.height / device.dpr);
  const ctx = await browser.newContext({
    viewport: { width: vpW, height: vpH },
    deviceScaleFactor: device.dpr,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });
  const page = await ctx.newPage();

  for (const p of PAGES) {
    const outDir = path.join(ROOT, 'public', 'marketing', 'screenshots', device.name);
    await fs.mkdir(outDir, { recursive: true });
    const outPath = path.join(outDir, `${p.tag}.png`);

    try {
      await page.goto(APP.baseUrl + p.path, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1500);
      const raw = await page.screenshot({ fullPage: false });
      const buf = await sharp(raw)
        .resize(device.width, device.height, { fit: 'cover', position: 'top' })
        .png()
        .toBuffer();
      await fs.writeFile(outPath, buf);
      console.log(`[OK] ${device.name}/${p.tag}`);
    } catch (e) {
      console.error(`[ERR] ${device.name}/${p.path}: ${e.message}`);
    }
  }
  await ctx.close();
}

await browser.close();
console.log(`Done: ${DEVICES.length * PAGES.length} shots`);
