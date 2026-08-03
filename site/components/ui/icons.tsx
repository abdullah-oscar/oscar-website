/** Lightweight inline SVG icon set. All strokes use currentColor. */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Icons = {
  shield: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 3 5 6v5c0 4.2 2.8 7.6 7 9 4.2-1.4 7-4.8 7-9V6l-7-3Z" />
      <path d="m9.2 11.8 1.9 1.9 3.7-3.7" />
    </svg>
  ),
  trend: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M3 17.5 9 11l3.5 3.5L21 6" />
      <path d="M15.5 6H21v5.5" />
    </svg>
  ),
  people: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.2A3.2 3.2 0 0 1 16 11.5" />
      <path d="M17.5 14.4A5.5 5.5 0 0 1 20.5 20" />
    </svg>
  ),
  chat: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M4 5.5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3.5V16.5H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </svg>
  ),
  box: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 3 20 7v10l-8 4-8-4V7l8-4Z" />
      <path d="M4 7l8 4 8-4M12 11v10" />
    </svg>
  ),
  report: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M6 3h8l5 5v13a0 0 0 0 1 0 0H6a0 0 0 0 1 0 0V3Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13v4M12 11v6M15 14v3" />
    </svg>
  ),
  franchise: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M4 10.5 5.5 6h13L20 10.5" />
      <path d="M4 10.5c0 1.4 1.1 2.5 2.5 2.5S9 11.9 9 10.5c0 1.4 1.1 2.5 2.5 2.5S14 11.9 14 10.5c0 1.4 1.1 2.5 2.5 2.5S19 11.9 19 10.5" />
      <path d="M5 13v7h14v-7" />
      <path d="M10 20v-4h4v4" />
    </svg>
  ),
  retail: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  ),
  hospitality: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M3 20h18" />
      <path d="M5 20v-7a4 4 0 0 1 4-4h2v11" />
      <path d="M11 9h4a4 4 0 0 1 4 4v7" />
      <path d="M8 12.5h.01" />
    </svg>
  ),
  health: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 20.5s-7-4.3-7-9.5A4 4 0 0 1 12 8a4 4 0 0 1 7 3c0 5.2-7 9.5-7 9.5Z" />
      <path d="M9.5 11.5h1.5V10h2v1.5H14v2h-1.5V15h-2v-1.5H9.5v-2Z" />
    </svg>
  ),
  bolt: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M13 2 4.5 13H11l-1 9 8.5-11H12l1-9Z" />
    </svg>
  ),
  arrow: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  clock: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  ),
  check: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M5 12.5 10 17l9-10" />
    </svg>
  ),
  external: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4.5" />
    </svg>
  ),
  mail: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  ),
  download: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 3.5v11" />
      <path d="m8 10.5 4 4 4-4" />
      <path d="M4.5 18.5v1a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-1" />
    </svg>
  ),
  plus: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  play: (p: IconProps) => (
    <svg {...base} {...p} fill="currentColor" stroke="none">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  ),
  pause: (p: IconProps) => (
    <svg {...base} {...p} fill="currentColor" stroke="none">
      <path d="M7.5 5h3.2v14H7.5V5ZM13.3 5h3.2v14h-3.2V5Z" />
    </svg>
  ),
  grid: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
    </svg>
  ),
  spark: (p: IconProps) => (
    <svg {...base} {...p}>
      <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </svg>
  ),
  radar: (p: IconProps) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 12 19 5" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" />
    </svg>
  ),
  lock: (p: IconProps) => (
    <svg {...base} {...p}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  ),
  linkedin: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor" {...p}>
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.4 8.4h3.06V21H3.4V8.4Zm5.1 0h2.93v1.72h.04c.41-.77 1.4-1.58 2.88-1.58 3.08 0 3.65 2 3.65 4.66V21h-3.06v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H8.5V8.4Z" />
    </svg>
  ),
};

export type IconKey = keyof typeof Icons;

export function Icon({ name, ...props }: { name: IconKey } & IconProps) {
  const C = Icons[name];
  return <C {...props} />;
}
