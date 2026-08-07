/**
 * Partner wordmarks. These are neutral geometric marks set in Inter, standing
 * in for the real trademarks rather than reproducing them. Swap in the
 * licensed SVGs before launch, or drop any partner you cannot name.
 */

const markClass = 'h-[18px] w-[18px] shrink-0'
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const MARKS: Record<string, React.ReactNode> = {
  Aeva: (
    <svg viewBox="0 0 24 24" className={markClass} aria-hidden {...stroke}>
      <path d="M12 4 4 20h4.2L12 11.6 15.8 20H20Z" />
    </svg>
  ),
  'Field AI': (
    <svg viewBox="0 0 24 24" className={markClass} aria-hidden {...stroke}>
      <path d="M12 3.4 20 6.2v6.1c0 4.4-3.2 7.6-8 8.9-4.8-1.3-8-4.5-8-8.9V6.2Z" />
      <path d="M12 8.4v6.6" strokeOpacity="0.5" />
    </svg>
  ),
  Anduril: (
    <svg viewBox="0 0 24 24" className={markClass} aria-hidden {...stroke}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 3.6c3.2 3 3.2 13.8 0 16.8 -3.2-3 -3.2-13.8 0-16.8Z" />
      <path d="M3.6 12h16.8" strokeOpacity="0.5" />
    </svg>
  ),
}

/** Names without a mark are set as a wordmark on their own, wider tracked. */
const WIDE = new Set(['Aeva', 'Telo', 'Machina'])

export function PartnerMark({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-2.5 text-ink/70 opacity-80 transition-opacity duration-500 hover:opacity-100">
      {MARKS[name]}
      <span
        className={`text-[13px] font-medium uppercase leading-none sm:text-[15px] ${
          WIDE.has(name) ? 'tracking-[0.3em]' : 'tracking-[0.2em]'
        }`}
      >
        {name}
      </span>
    </span>
  )
}
