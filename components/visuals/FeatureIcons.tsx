/**
 * Hand-drawn line marks for the four capability cards. Thin, geometric and
 * monochrome — deliberately quieter than an off-the-shelf icon set.
 */

type IconProps = { className?: string }

const base = {
  viewBox: '0 0 32 32',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.15,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function EngineeringIntelligenceIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="10" cy="11" r="4.2" />
      <circle cx="22" cy="9" r="3" />
      <circle cx="21" cy="21" r="4.6" />
      <circle cx="10.5" cy="22" r="2.4" />
      <path d="M13.6 13.4 17.2 18M13.2 9.7 19 9.2M11.6 14.9 10.8 19.6M12.8 21.6 16.5 21.2" />
    </svg>
  )
}

export function DesignReasoningIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M16 3.6 27 9.8v12.4L16 28.4 5 22.2V9.8Z" />
      <circle cx="16" cy="16" r="4.4" />
      <path d="M16 11.6V7.2M16 24.8v-4.4M11.6 16H7.2M24.8 16h-4.4" />
    </svg>
  )
}

export function ManufacturingAwareIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M16 4.2 21 9h-3.4v6.2h-3.2V9H11Z" />
      <path d="M6.4 18.4 16 23.2l9.6-4.8" />
      <path d="M6.4 24 16 28.8 25.6 24" />
      <circle cx="16" cy="15.6" r="1.6" />
    </svg>
  )
}

export function ContinuousLearningIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="16" cy="16" r="2.6" />
      <circle cx="7.4" cy="7.4" r="2.4" />
      <circle cx="24.6" cy="7.4" r="2.4" />
      <circle cx="7.4" cy="24.6" r="2.4" />
      <circle cx="24.6" cy="24.6" r="2.4" />
      <path d="M9.2 9.2 14 14M22.8 9.2 18 14M9.2 22.8 14 18M22.8 22.8 18 18" />
      <path d="M7.4 9.8v12.8M24.6 9.8v12.8M9.8 7.4h12.4M9.8 24.6h12.4" strokeOpacity="0.35" />
    </svg>
  )
}
