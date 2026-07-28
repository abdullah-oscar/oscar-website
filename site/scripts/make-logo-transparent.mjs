/**
 * Generates a transparent, tagline-free version of the brand lockup.
 *
 *   in:  public/logos/oscar-main-logo.png   (1667×943, RGB, opaque white bg)
 *   out: public/logos/oscar-logo.png        (1464×560, RGBA)
 *
 * Why this exists
 * ---------------
 * The source ships with an opaque white background and the
 * "One Platform. Total Insight. Immediate Action." tagline baked in.
 * <Logo /> used to crop the tagline off and hide the white with
 * `mix-blend-multiply`. That worked only while the page behind the nav was
 * flat white: the nav is `position: fixed`, which ALWAYS creates a stacking
 * context, so the blend is confined to the nav's own (transparent) subtree
 * and never reaches the page background. The moment the hero gained a
 * gradient, the logo showed up in a white box.
 *
 * So the white is removed from the asset itself, once, here.
 *
 * How the matte is removed
 * ------------------------
 * The artwork is dark-on-white, so alpha is derived from each pixel's
 * minimum channel: measured against the real file, the background sits at
 * min ≥ 250 and the lightest genuine artwork (the ostrich's pale blue legs)
 * is around min 200. A ramp between LO and HI therefore keeps every real
 * pixel fully opaque while dissolving the background.
 *
 * Edge pixels are antialiased *against white*, so simply lowering their
 * alpha would leave a pale fringe on dark backgrounds. Each partial pixel is
 * un-blended back to its true colour first — the standard "unmultiply matte"
 * operation, inverting  C = a·F + (1−a)·255  to recover F.
 *
 * Run:  node scripts/make-logo-transparent.mjs
 */

import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(here, "../public/logos/oscar-main-logo.png");
const OUT = path.join(here, "../public/logos/oscar-logo.png");

// Lockup bounds within the source, as fractions. Everything below the box is
// tagline; everything around it is padding. Measured from the artwork.
const CROP = { x: 0.063, y: 0.145, w: 0.878, h: 0.594 };

// Alpha ramp on the minimum channel. At or below LO = fully opaque artwork;
// at or above HI = background. Between the two is antialiasing.
const LO = 236;
const HI = 252;

const clamp255 = (n) => (n < 0 ? 0 : n > 255 ? 255 : Math.round(n));

const src = sharp(SRC);
const meta = await src.metadata();

const box = {
  left: Math.round(CROP.x * meta.width),
  top: Math.round(CROP.y * meta.height),
  width: Math.round(CROP.w * meta.width),
  height: Math.round(CROP.h * meta.height),
};

const { data, info } = await src
  .extract(box)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

let cleared = 0;
let feathered = 0;

for (let i = 0; i < data.length; i += info.channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const min = r < g ? (r < b ? r : b) : g < b ? g : b;

  if (min >= HI) {
    data[i + 3] = 0; // background
    cleared++;
    continue;
  }
  if (min <= LO) continue; // solid artwork, leave as-is

  // Partially covered edge pixel: recover the true colour, then set alpha.
  const a = (HI - min) / (HI - LO);
  const bg = (1 - a) * 255;
  data[i] = clamp255((r - bg) / a);
  data[i + 1] = clamp255((g - bg) / a);
  data[i + 2] = clamp255((b - bg) / a);
  data[i + 3] = clamp255(a * 255);
  feathered++;
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: info.channels },
})
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(`✓ ${path.relative(process.cwd(), OUT)}  ${info.width}×${info.height}`);
console.log(`  ${cleared.toLocaleString()} px cleared, ${feathered.toLocaleString()} px feathered`);
console.log(`  Logo.tsx expects these exact dimensions — update it if the crop changes.`);
