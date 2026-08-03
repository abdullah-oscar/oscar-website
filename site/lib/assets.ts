import fs from "node:fs";
import path from "node:path";

/**
 * Filesystem-backed asset discovery, run at build time in Server Components.
 *
 * Why: dropping a new customer logo into /public/customers should be all it
 * takes to get it on the site — no code edit, no hardcoded filename list to
 * drift out of sync. Same for the compliance badge.
 */

const IMAGE_RE = /\.(png|jpe?g|svg|avif|webp)$/i;

function listImages(folder: string): string[] {
  const dir = path.join(process.cwd(), "public", folder);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_RE.test(f) && !f.startsWith("."))
      .sort((a, b) => a.localeCompare(b));
  } catch {
    // Folder absent (or empty) — callers fall back gracefully.
    return [];
  }
}

/** Turn "burger-king.svg" / "jimmy_johns.png" into "Burger King". */
export function prettyName(filename: string): string {
  return filename
    .replace(IMAGE_RE, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export type Asset = { src: string; name: string };

export function customerLogos(): Asset[] {
  return listImages("customers").map((f) => ({
    src: `/customers/${f}`,
    name: prettyName(f),
  }));
}

export function complianceBadges(): Asset[] {
  return listImages("compliance").map((f) => ({
    src: `/compliance/${f}`,
    name: prettyName(f),
  }));
}

/** Provider logos for the integrations strip. The folder doesn't exist
 *  yet — callers fall back to wordmarks until logo files are dropped in. */
export function integrationLogos(): Asset[] {
  return listImages("integrations").map((f) => ({
    src: `/integrations/${f}`,
    name: prettyName(f),
  }));
}

/** Team headshots for /about. Name files after the person ("abdullah-khan.jpg")
 *  and match them from lib/about.ts; absent files fall back to initials. */
export function teamPhotos(): Asset[] {
  return listImages("team").map((f) => ({
    src: `/team/${f}`,
    name: prettyName(f),
  }));
}
