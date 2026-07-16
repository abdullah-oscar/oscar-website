/**
 * Vectorize the mascot: PNG -> true colour SVG.
 *
 * Why: the shipped mascot is a 360x360 AVIF. Oscar's eyes are ~14px in a 1440
 * render (~1% of the frame), so at hero size they're ~5px — far too small for
 * pupil-tracking to register. Vector art can be cropped tight to his head at
 * any size without going soft, which is what makes the effect land.
 *
 * Prereq — make the reference raster (macOS built-in, already done once):
 *   sips -s format png -z 1440 1440 public/logos/oscar-mascot.avif \
 *     --out public/logos/oscar-mascot@4x.png
 *
 * Run:
 *   npm i -D @neplex/vectorizer
 *   node scripts/vectorize-mascot.mjs
 *
 * Output: public/logos/oscar-mascot.svg
 */

import fs from "node:fs/promises";
import path from "node:path";
import {
  vectorize,
  ColorMode,
  Hierarchical,
  PathSimplifyMode,
} from "@neplex/vectorizer";

const LOGOS = path.join(process.cwd(), "public", "logos");
const PNG_IN = path.join(LOGOS, "oscar-mascot@4x.png");
const SVG_OUT = path.join(LOGOS, "oscar-mascot.svg");

const rel = (p) => path.relative(process.cwd(), p);

async function main() {
  let png;
  try {
    png = await fs.readFile(PNG_IN);
  } catch {
    console.error(`✗ Missing ${rel(PNG_IN)}\n\n  Create it first with:\n` +
      `  sips -s format png -z 1440 1440 public/logos/oscar-mascot.avif ` +
      `--out public/logos/oscar-mascot@4x.png\n`);
    process.exit(1);
  }

  console.log(`→ vectorizing ${rel(PNG_IN)} (a few seconds)…`);

  const svg = await vectorize(png, {
    colorMode: ColorMode.Color,
    colorPrecision: 7, // keep the flat brand colours crisply separated
    filterSpeckle: 4, // drop stray specks from the upscale
    spliceThreshold: 45,
    cornerThreshold: 60,
    hierarchical: Hierarchical.Stacked,
    mode: PathSimplifyMode.Spline, // smooth curves, not polygons
    layerDifference: 6,
    lengthThreshold: 4,
    maxIterations: 4,
    pathPrecision: 4,
  });

  await fs.writeFile(SVG_OUT, svg);
  console.log(
    `✓ wrote ${rel(SVG_OUT)} (${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB)`
  );
}

main().catch((err) => {
  console.error("\n✗ Failed:", err.message);
  process.exit(1);
});
