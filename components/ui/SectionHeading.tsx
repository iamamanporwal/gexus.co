import { cn } from '@/lib/utils'

/** The small "02 /" index marker that opens each numbered section. */
export function SectionIndex({ index, className }: { index: string; className?: string }) {
  return (
    <span
      className={cn('block text-[11px] tracking-[0.06em] text-muted/80', className)}
      aria-hidden
    >
      {index} /
    </span>
  )
}

/** Uppercase micro label, as in "AI Native CAD Platform". */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'block text-[11px] font-medium uppercase tracking-label text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}

/**
 * Section headings carry the chrome treatment. The ramp sits in the dark half
 * of the scale, so contrast holds on white at these sizes.
 */
export function SectionTitle({
  children,
  className,
  as: Comp = 'h2',
  plain = false,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3'
  /** Skip the metallic fill, for headings on dark surfaces. */
  plain?: boolean
}) {
  return (
    <Comp
      {...props}
      className={cn(
        'font-medium leading-[1.06] tracking-tightest',
        'text-[30px] sm:text-[38px] lg:text-[38px] xl:text-[43px]',
        plain ? 'text-ink' : 'chrome',
        className,
      )}
    >
      {children}
    </Comp>
  )
}

export function SectionBody({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn('max-w-[38ch] text-body text-muted', className)}>{children}</p>
  )
}
