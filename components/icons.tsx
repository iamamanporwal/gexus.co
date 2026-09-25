/**
 * Inline SVG icons. The design baked these into its background JPGs; drawing
 * them as SVG keeps them sharp at any size and costs no requests.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const BRAND = "#4a94fb";

export function ArrowRight(props: IconProps) {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M1 6h11M7.5 1.5 12 6l-4.5 4.5" />
    </svg>
  );
}

export function StepArrow(props: IconProps) {
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="#3d5f8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M1 7h19M14 1l6 6-6 6" />
    </svg>
  );
}

export function DescribeIcon(props: IconProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" strokeWidth="2.6" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M6 8h28v19H17l-7 6v-6H6z" stroke="#ffffff" />
      <path d="M27 27h7V14" stroke={BRAND} />
    </svg>
  );
}

export function RefineIcon(props: IconProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" strokeWidth="2.6" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M20 4 34 11v17l-14 8-14-8V11z" stroke={BRAND} />
      <path d="M6 11l14 8 14-8M20 19v17" stroke="#ffffff" />
      <path d="M26 22v8l4-2" stroke={BRAND} />
    </svg>
  );
}

export function ExportIcon(props: IconProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M20 4v18M13 15l7 7 7-7" stroke="#ffffff" />
      <path d="M6 24v10h28V24" stroke={BRAND} />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="#3b8ae6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M1.5 6.5 5 10l7.5-8.5" />
    </svg>
  );
}

/* 24px line icons in the style of the design's feature and security rows. */
function Line({ children, ...props }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export const Icon = {
  sparkle: (p: IconProps) => (
    <Line {...p}>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#ffffff" />
      <path d="M12 7.5 13.4 10.6 16.5 12 13.4 13.4 12 16.5 10.6 13.4 7.5 12 10.6 10.6z" stroke={BRAND} />
    </Line>
  ),
  monitor: (p: IconProps) => (
    <Line {...p}>
      <rect x="3" y="4" width="18" height="12" rx="2" stroke={BRAND} />
      <path d="M3 7.5h18" stroke={BRAND} />
      <path d="M9 20h6M12 16v4" stroke="#ffffff" />
    </Line>
  ),
  phone: (p: IconProps) => (
    <Line {...p}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.2" stroke="#ffffff" />
      <path d="M10 18.5h4" stroke={BRAND} />
    </Line>
  ),
  users: (p: IconProps) => (
    <Line {...p}>
      <circle cx="9" cy="8" r="3.2" stroke={BRAND} />
      <path d="M3 19.5c.6-3.3 3-5 6-5s5.4 1.7 6 5" stroke={BRAND} />
      <circle cx="16.5" cy="9" r="2.5" stroke="#ffffff" />
      <path d="M17 14.3c2.2.4 3.6 2 4 4.2" stroke="#ffffff" />
    </Line>
  ),
  cog: (p: IconProps) => (
    <Line {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" stroke={BRAND} />
      <path d="M12 7.5 15.9 9.75v4.5L12 16.5l-3.9-2.25v-4.5z" stroke="#ffffff" />
    </Line>
  ),
  shield: (p: IconProps) => (
    <Line {...p}>
      <path d="M12 3 19.5 6v5.5c0 4.4-3.1 8-7.5 9.5-4.4-1.5-7.5-5.1-7.5-9.5V6z" stroke={BRAND} />
      <path d="M9 11.5l2.2 2.2L15.5 9.5" stroke="#ffffff" />
    </Line>
  ),
  lock: (p: IconProps) => (
    <Line {...p}>
      <rect x="5" y="10.5" width="14" height="10" rx="2" stroke={BRAND} />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="#ffffff" />
    </Line>
  ),
  key: (p: IconProps) => (
    <Line {...p}>
      <circle cx="8" cy="15" r="4" stroke={BRAND} />
      <path d="M11 12l8.5-8.5M16.5 6.5l2 2M14.5 8.5l1.5 1.5" stroke="#ffffff" />
    </Line>
  ),
  folder: (p: IconProps) => (
    <Line {...p}>
      <path d="M3.5 6.5a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" stroke={BRAND} />
      <path d="M12 11.5v4M10 13.5h4" stroke="#ffffff" />
    </Line>
  ),
  building: (p: IconProps) => (
    <Line {...p}>
      <path d="M4.5 20.5v-15l7.5-2.5v17.5M12 8.5l7.5 2.5v9.5" stroke={BRAND} />
      <path d="M3 20.5h18M8 8.5v.01M8 12v.01M8 15.5v.01M15.5 13.5v.01M15.5 17v.01" stroke="#ffffff" />
    </Line>
  ),
  type: (p: IconProps) => (
    <Line {...p}>
      <path d="M5 7V5h14v2M12 5v14M9.5 19h5" />
    </Line>
  ),
  pen: (p: IconProps) => (
    <Line {...p}>
      <path d="M4 20l1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5z" />
      <path d="M13.5 7l3 3" />
    </Line>
  ),
  image: (p: IconProps) => (
    <Line {...p}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="M20.5 16l-5-5-8.5 8.5" />
    </Line>
  ),
  download: (p: IconProps) => (
    <Line {...p}>
      <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14" />
    </Line>
  ),
  file: (p: IconProps) => (
    <Line {...p}>
      <path d="M6 3.5h8l4.5 4.5v12.5H6z" />
      <path d="M14 3.5V8h4.5" />
    </Line>
  ),
  chevronRight: (p: IconProps) => (
    <Line {...p}>
      <path d="M9.5 6l6 6-6 6" />
    </Line>
  ),
  menu: (p: IconProps) => (
    <Line {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Line>
  ),
};
