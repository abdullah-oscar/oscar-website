/**
 * Content for /about — the origin story and the team.
 *
 * DO NOT SHIP AS-IS. Every entry flagged `sample: true` renders a visible
 * "Placeholder" chip on the page: bios, roles, and several story details
 * are stand-ins awaiting the real thing. Replace the content and drop the
 * flag; the chip disappears on its own. Search TODO(barry) for the exact
 * facts that still need confirming.
 */

import { stats } from "@/lib/site";

export type Milestone = {
  year: string;
  title: string;
  body: string;
};

/* TODO(barry): confirm the timeline years and the founding details
   (the founder's and builder's names, and how they want the family
   story told). */
export const story: Milestone[] = [
  {
    year: "2019",
    title: "A franchisee drowning in reports",
    body: "A Dunkin' franchisee was pulling numbers from a dozen disconnected systems — POS, payroll, back office — and still couldn't see what the business actually needed from him each morning.",
  },
  {
    year: "2021",
    title: "Built inside the business",
    body: "His wife built what became Oscar: one system that read all of it, learned what normal looked like, and got it right inside his own locations first — not a demo, a daily tool.",
  },
  {
    year: "2022",
    title: "The locations flourished",
    body: "With the leaks visible and the morning routine automated, the business ran measurably better. Other operators noticed, and operators tell operators.",
  },
  {
    year: "Today",
    title: `${stats.locations.toLocaleString("en-US")} locations, ${stats.brands} brands`,
    body: "Backed by investors and run by the same operator instincts it was born from. Built by restaurant operators, for restaurant operators.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  /** Filename stem under /public/team (e.g. "abdullah-khan"); initials render until the photo lands. */
  photo?: string;
  /** Placeholder bio/role — renders a visible chip until replaced. */
  sample?: boolean;
};

/* TODO(barry): real roles, bios, and headshots for everyone below — plus
   whichever engineers should be featured. Keep bios to 2–3 sentences:
   operating credibility first, titles second. */
export const team: TeamMember[] = [
  {
    name: "Abdullah Khan",
    role: "Role — to confirm",
    bio: "Placeholder — two or three sentences on operating background, what they own at Oscar, and why operators trust them with it.",
    initials: "AK",
    photo: "abdullah-khan",
    sample: true,
  },
  {
    name: "Adam — last name",
    role: "Role — to confirm",
    bio: "Placeholder — two or three sentences on operating background, what they own at Oscar, and why operators trust them with it.",
    initials: "AD",
    photo: "adam",
    sample: true,
  },
  {
    name: "Barry — last name",
    role: "Role — to confirm",
    bio: "Placeholder — two or three sentences on operating background, what they own at Oscar, and why operators trust them with it.",
    initials: "BA",
    photo: "barry",
    sample: true,
  },
  {
    name: "Engineering lead — name",
    role: "Engineering",
    bio: "Placeholder — the engineering story: who builds Oscar, and the systems background that makes the messy-data problem tractable.",
    initials: "EN",
    sample: true,
  },
];
