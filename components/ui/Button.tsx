import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const sizes: Record<Size, string> = {
  sm: 'h-9 pl-4 pr-3 text-[12px] gap-2.5',
  md: 'h-11 pl-5 pr-4 text-[13px] gap-3',
  lg: 'h-[52px] pl-7 pr-5 text-[14px] gap-4',
}

const variants: Record<Variant, string> = {
  // The inset white ring plus the top highlight give the black pill a faint
  // machined edge rather than reading as flat fill.
  primary:
    'bg-ink text-white shadow-soft ring-1 ring-inset ring-white/[0.14] hover:shadow-lift before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent',
  ghost:
    'bg-surface text-ink border border-line hover:border-ink/25 hover:shadow-soft',
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  href = '#access',
  withArrow = true,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  size?: Size
  withArrow?: boolean
}) {
  return (
    <a
      href={href}
      className={cn(
        'group relative isolate inline-flex select-none items-center justify-center overflow-hidden rounded-btn font-medium tracking-[-0.01em]',
        'transition-[transform,box-shadow,border-color] duration-500 ease-out will-change-transform',
        'hover:scale-[1.025] active:scale-[0.98]',
        sizes[size],
        variants[variant],
        className,
      )}
      {...props}
    >
      <span className="whitespace-nowrap">{children}</span>
      {withArrow && (
        <ArrowRight
          aria-hidden
          strokeWidth={1.75}
          className={cn(
            'shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-1',
            variant === 'primary' ? 'text-white/90' : 'text-ink/70',
            size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5',
          )}
        />
      )}
    </a>
  )
}
