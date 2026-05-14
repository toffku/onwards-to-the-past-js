'use strict';
// Generates 256x256 tileable PNG backgrounds for every era.
// Run once before starting the dev server: npm run gen-backgrounds
// Output: assets/backgrounds/bg_<era>.png

const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

const W = 256, H = 256;
const OUT = path.join(__dirname, '..', 'assets', 'backgrounds');
fs.mkdirSync(OUT, { recursive: true });

function px(buf, x, y, r, g, b) {
  const i = (y * W + x) << 2;
  buf[i] = r; buf[i + 1] = g; buf[i + 2] = b; buf[i + 3] = 255;
}

// Deterministic per-coordinate hash → 0..1
function h(x, y, s) {
  const v = Math.sin(x * 127.1 + y * 311.7 + s * 74.3) * 43758.5453;
  return v - Math.floor(v);
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, Math.round(v))); }

function save(name, fn) {
  const png = new PNG({ width: W, height: H });
  fn(png.data);
  fs.writeFileSync(path.join(OUT, name), PNG.sync.write(png));
  console.log('  generated  ' + name);
}

// ── ASYLUM — cracked institutional tile floor ─────────────────────────────────
// 32x32 tiles with 2px grout. ~12 % of tiles carry a dark dried-blood stain.
save('bg_asylum.png', buf => {
  const T = 32, G = 2;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const lx = x % T, ly = y % T;
      const tx = (x - lx) / T, ty = (y - ly) / T;
      const pn = (h(x, y, 5) - 0.5) * 7;
      if (lx < G || ly < G) {
        px(buf, x, y, 0x12, 0x12, 0x1c);
        continue;
      }
      const tn = h(tx, ty, 0);
      if (tn > 0.88) {
        // Dried stain — dark brownish-red blob centred in the tile
        const cx = lx - T / 2, cy = ly - T / 2;
        const d = Math.sqrt(cx * cx + cy * cy) / (T * 0.32);
        const s = Math.max(0, 1 - d);
        const base = 0x1e + Math.round(pn);
        px(buf, x, y,
          clamp(base + s * 28, 0x10, 0x46),
          clamp(base - s * 10, 0x08, 0x26),
          clamp(base + 8 - s * 14, 0x08, 0x30));
      } else {
        const v = 0x1e + Math.round((tn * 0.3 - 0.1) * 14 + pn);
        const r = clamp(v, 0x12, 0x2c);
        px(buf, x, y, r, r, clamp(r + 9, 0x1c, 0x38));
      }
    }
  }
});

// ── EGYPT — sandstone block floor ────────────────────────────────────────────
// 64x64 blocks with 3px joins. Top-left bevel simulates chiselled stone.
// ~25 % of blocks have a small carved-dot mark.
save('bg_egypt.png', buf => {
  const T = 64, G = 3;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const lx = x % T, ly = y % T;
      const tx = (x - lx) / T, ty = (y - ly) / T;
      const pn = (h(x, y, 6) - 0.5) * 6;
      if (lx < G || ly < G) {
        px(buf, x, y, 0x26, 0x1e, 0x0e);
        continue;
      }
      const tn = h(tx, ty, 1);
      const bevel = (lx < G + 4 || ly < G + 4) ? 14 : 0;
      // Small carved dot at block centre on some blocks
      const cx = lx - T / 2, cy = ly - T / 2;
      const isDot = tn > 0.75 && Math.abs(cx) < 4 && Math.abs(cy) < 4;
      const f = isDot ? 0.72 : 1.0;
      const v = 0x38 + Math.round((tn * 0.4 - 0.2) * 12 + pn + bevel);
      px(buf, x, y,
        clamp(v * f, 0x28, 0x56),
        clamp(v * 0.78 * f, 0x1e, 0x42),
        clamp(v * 0.48 * f, 0x0e, 0x26));
    }
  }
});

// ── JURASSIC — jungle earth patches ──────────────────────────────────────────
// 32x32 earth tiles with 1px cracks. Dense shadow patches on ~28 % of tiles.
save('bg_jurassic.png', buf => {
  const T = 32, G = 1;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const lx = x % T, ly = y % T;
      const tx = (x - lx) / T, ty = (y - ly) / T;
      const pn = (h(x, y, 7) - 0.5) * 6;
      if (lx < G || ly < G) {
        px(buf, x, y, 0x06, 0x0e, 0x06);
        continue;
      }
      const tn = h(tx, ty, 2);
      const dark = tn > 0.72; // dense overhead canopy casts shadow
      const base = dark ? 0x09 : 0x0f;
      const gv = Math.round(base + (tn * 0.4 - 0.2) * 10 + pn);
      px(buf, x, y,
        clamp(gv * 0.52, 0x04, 0x18),
        clamp(gv, 0x08, 0x30),
        clamp(gv * 0.52, 0x04, 0x18));
    }
  }
});

// ── MEDIEVAL — running-bond flagstone ────────────────────────────────────────
// 64x32 bricks offset by half a brick each row. Dark slate-blue mortar.
save('bg_medieval.png', buf => {
  const BW = 64, BH = 32, G = 2;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const row = Math.floor(y / BH);
      const off = (row & 1) * (BW >> 1);
      const lx = ((x + off) % BW + BW) % BW;
      const ly = y % BH;
      const bx = Math.floor((x + off) / BW);
      const pn = (h(x, y, 8) - 0.5) * 5;
      if (lx < G || ly < G) {
        px(buf, x, y, 0x0c, 0x0c, 0x14);
        continue;
      }
      const tn = h(bx, row, 3);
      const v = 0x16 + Math.round((tn * 0.4 - 0.2) * 10 + pn);
      const r = clamp(v, 0x0e, 0x26);
      px(buf, x, y, r, r, clamp(r + 10, 0x18, 0x34));
    }
  }
});

// ── WILD WEST — saloon wooden plank floor ────────────────────────────────────
// Full-width planks 32px tall with 2px gaps. Grain streaks add depth.
save('bg_wildwest.png', buf => {
  const PH = 32, G = 2;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const ly = y % PH;
      const row = Math.floor(y / PH);
      const pn = (h(x, y, 4) - 0.5) * 5;
      if (ly < G) {
        px(buf, x, y, 0x14, 0x10, 0x06);
        continue;
      }
      const rn = h(0, row, 3);
      // Subtle vertical grain streak every ~10 px
      const streak = h(x, 0, row + 10) > 0.90 ? 6 : 0;
      const v = 0x2e + Math.round((rn * 0.4 - 0.2) * 12 + pn + streak);
      px(buf, x, y,
        clamp(v, 0x20, 0x48),
        clamp(v * 0.64, 0x14, 0x2e),
        clamp(v * 0.34, 0x08, 0x18));
    }
  }
});

// ── WWII — concrete bunker tile floor ────────────────────────────────────────
// 64x64 tiles with 3px joins. Diagonal hairline cracks on ~15 % of tiles.
save('bg_wwii.png', buf => {
  const T = 64, G = 3;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const lx = x % T, ly = y % T;
      const tx = (x - lx) / T, ty = (y - ly) / T;
      const pn = (h(x, y, 10) - 0.5) * 5;
      if (lx < G || ly < G) {
        px(buf, x, y, 0x0a, 0x0a, 0x0a);
        continue;
      }
      const tn = h(tx, ty, 4);
      // Diagonal crack on affected tiles: lx === ly + 6 traces a 45-degree line
      const hasCrack = tn > 0.85 && (lx === ly + 6 || lx === ly + 7);
      if (hasCrack) {
        px(buf, x, y, 0x08, 0x08, 0x08);
        continue;
      }
      const v = 0x1a + Math.round((tn * 0.3 - 0.15) * 8 + pn);
      const c = clamp(v, 0x10, 0x28);
      px(buf, x, y, c, c, c);
    }
  }
});

console.log('\nAll 6 backgrounds written to assets/backgrounds/');
