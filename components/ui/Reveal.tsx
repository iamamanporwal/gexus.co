import { cn } from '@/lib/utils'

/**
 * Server components. They only stamp the data attributes that
 * `RevealObserver` looks for, so the reveal costs zero client JS per element.
 */

export function Reveal({
  children,
  className,
  delay,
  y,
  as: Comp = 'div',
}: {
  children: React.ReactNode
  className?: string
  /** milliseconds */
  delay?: number
  /** starting offset in px */
  y?: number
  as?: 'div' | 'section' | 'li' | 'header' | 'figure'
}) {
  return (
    <Comp
      data-reveal=""
      className={cn(className)}
      style={
        {
          ...(delay ? { '--reveal-delay': `${delay}ms` } : null),
          ...(y !== undefined ? { '--reveal-y': `${y}px` } : null),
        } as React.CSSProperties
      }
    >
      {children}
    </Comp>
  )
}

/** Staggers its direct children. Nothing extra needed on the children. */
export function RevealGroup({
  children,
  className,
  as: Comp = 'div',
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'ul' | 'ol'
}) {
  return (
    <Comp data-reveal-group="" className={cn(className)}>
      {children}
    </Comp>
  )
}
