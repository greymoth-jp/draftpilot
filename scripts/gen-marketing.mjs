// scripts/gen-marketing.mjs — draftpilot (85)
// Usage: node scripts/gen-marketing.mjs
// Requires: npm install sharp
// Generates: public/marketing/feature-graphic-1024x500.png
//            public/marketing/og-1200x630.png

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'marketing');
await fs.mkdir(OUT, { recursive: true });

// draftpilot palette: pilot deep #0d1117 / gold #d4a853 / dusk #6e7eaa
const BG   = '#0d1117';
const GOLD = '#d4a853';
const DUSK = '#6e7eaa';
const TEXT = '#ffffff';
const MUTE = '#8b949e';

// ─── Feature graphic 1024×500 ───────────────────────────────────────────────
// Concept: abstract feather/pen morphing into X bird silhouette, minimal
const fg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="500" viewBox="0 0 1024 500">
  <defs>
    <radialGradient id="glow" cx="33%" cy="50%" r="38%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1024" height="500" fill="${BG}"/>
  <ellipse cx="320" cy="250" rx="230" ry="200" fill="url(#glow)"/>
  <!-- Abstract feather/pen nib -->
  <path d="M 315 135 L 378 210 Q 398 255 378 305 L 315 368 L 268 305 Q 240 255 268 210 Z"
        fill="${GOLD}" opacity="0.88"/>
  <!-- Nib slit -->
  <line x1="315" y1="155" x2="315" y2="348" stroke="${BG}" stroke-width="3" stroke-linecap="round"/>
  <!-- Dusk base dash -->
  <line x1="268" y1="330" x2="362" y2="330" stroke="${DUSK}" stroke-width="4" stroke-linecap="round" opacity="0.85"/>
  <!-- App name -->
  <text x="548" y="222" font-family="Georgia, 'Lora', serif" font-size="52" font-weight="700" fill="${TEXT}" letter-spacing="-0.5">draftpilot</text>
  <text x="550" y="274" font-family="system-ui, sans-serif" font-size="20" font-weight="400" fill="${GOLD}">X を、静かに使う。</text>
  <text x="550" y="318" font-family="system-ui, sans-serif" font-size="16" font-weight="400" fill="${MUTE}">Claude Haiku が下書きを操縦。タイムラインを開かずに投稿。</text>
</svg>`;

await fs.writeFile(path.join(OUT, 'feature-graphic-1024x500.png'),
  await sharp(Buffer.from(fg)).resize(1024, 500).png().toBuffer());
console.log('[OK] feature-graphic-1024x500.png');

// ─── OG image 1200×630 ──────────────────────────────────────────────────────
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g2" cx="28%" cy="50%" r="38%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.17"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${BG}"/>
  <ellipse cx="355" cy="315" rx="260" ry="225" fill="url(#g2)"/>
  <path d="M 350 168 L 428 260 Q 452 315 428 370 L 350 455 L 286 370 Q 258 315 286 260 Z"
        fill="${GOLD}" opacity="0.86"/>
  <line x1="350" y1="192" x2="350" y2="430" stroke="${BG}" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="286" y1="410" x2="414" y2="410" stroke="${DUSK}" stroke-width="5" stroke-linecap="round" opacity="0.85"/>
  <text x="630" y="290" font-family="Georgia, 'Lora', serif" font-size="62" font-weight="700" fill="${TEXT}" letter-spacing="-1">draftpilot</text>
  <text x="632" y="354" font-family="system-ui, sans-serif" font-size="26" font-weight="400" fill="${GOLD}">X を、静かに使う。</text>
  <text x="632" y="400" font-family="system-ui, sans-serif" font-size="18" font-weight="400" fill="${MUTE}">draftpilot.dev</text>
</svg>`;

await fs.writeFile(path.join(OUT, 'og-1200x630.png'),
  await sharp(Buffer.from(og)).resize(1200, 630).png().toBuffer());
console.log('[OK] og-1200x630.png');

console.log('Done → public/marketing/');
