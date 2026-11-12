/**
 * Cleans up public/globe.png for use on a dark hero section.
 *
 * The source image has a semi-transparent MAGENTA background baked in
 * (RGB ~ (220,0,207) at alpha ~75-111), which shows up as a pink tint
 * when composited over the dark page.
 *
 * This script:
 *  1. zeroes out magenta-ish background pixels (keyed by hue + existing alpha)
 *  2. keeps globe / blue glow / stars untouched
 *  3. lightly smooths the alpha channel to avoid fringing
 *  4. trims empty borders
 *  5. writes public/hero-globe.png (the file the hero section references)
 *
 * Run: node scripts/fix-globe.cjs
 */
const sharp = require("sharp");
const path = require("path");

const SRC = path.join(__dirname, "..", "public", "globe.png");
const OUT = path.join(__dirname, "..", "public", "hero-globe.png");

(async () => {
  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // magenta-ness = min(r, b) - g. Background is ~(220,0,207) -> ~205.
  // Blue glow (85,85,255) -> 0. Globe black -> 0. Navy stars -> ~0.
  const LO = 30; // below this: keep pixel as-is
  const HI = 70; // above this: fully background

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const score = Math.min(r, b) - g;

    if (score >= HI) {
      data[i + 3] = 0;
    } else if (score > LO) {
      const t = (score - LO) / (HI - LO);
      data[i + 3] = Math.round(data[i + 3] * (1 - t * t * (3 - 2 * t)));
    }
  }

  // ── separate alpha, smooth it slightly to kill fringes, re-attach ──
  // (manual separable box blur — sharp's .blur() expands 1-channel raw to 3)
  const alphaBuf = new Float32Array(width * height);
  for (let p = 0; p < width * height; p++) {
    alphaBuf[p] = data[p * channels + 3];
  }

  const boxBlur = (src, r, passes) => {
    let cur = src;
    for (let pass = 0; pass < passes; pass++) {
      const tmp = new Float32Array(cur.length);
      // horizontal
      for (let y = 0; y < height; y++) {
        let sum = 0;
        const row = y * width;
        for (let x = -r; x <= r; x++) sum += cur[row + Math.min(width - 1, Math.max(0, x))];
        for (let x = 0; x < width; x++) {
          tmp[row + x] = sum / (2 * r + 1);
          const out = cur[row + Math.min(width - 1, Math.max(0, x - r))];
          const inn = cur[row + Math.min(width - 1, Math.max(0, x + r + 1))];
          sum += inn - out;
        }
      }
      // vertical
      const dst = new Float32Array(cur.length);
      for (let x = 0; x < width; x++) {
        let sum = 0;
        for (let y = -r; y <= r; y++) sum += tmp[Math.min(height - 1, Math.max(0, y)) * width + x];
        for (let y = 0; y < height; y++) {
          dst[y * width + x] = sum / (2 * r + 1);
          const out = tmp[Math.min(height - 1, Math.max(0, y - r)) * width + x];
          const inn = tmp[Math.min(height - 1, Math.max(0, y + r + 1)) * width + x];
          sum += inn - out;
        }
      }
      cur = dst;
    }
    return cur;
  };

  const smoothAlpha = boxBlur(alphaBuf, 2, 2);

  for (let p = 0; p < width * height; p++) {
    data[p * channels + 3] = Math.round(smoothAlpha[p]);
  }

  // ── bounding box of visible content ──
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * channels + 3] > 10) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) throw new Error("Everything keyed out — thresholds wrong");

  const pad = 8;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width - 1, maxX + pad);
  maxY = Math.min(height - 1, maxY + pad);

  await sharp(data, { raw: { width, height, channels } })
    .extract({
      left: minX,
      top: minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1,
    })
    .png({ compressionLevel: 9 })
    .toFile(OUT);

  console.log(
    `Saved ${OUT} (${maxX - minX + 1}x${maxY - minY + 1}, from ${width}x${height})`
  );
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
