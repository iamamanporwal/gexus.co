import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Underlined "Explore Technology →" style inline link used across sections. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      className={cn(
        'group inline-flex items-center gap-2.5 text-[13px] font-medium tracking-[-0.01em] text-ink',
        className,
      )}
    >
      <span className="border-b border-ink/30 pb-0.5 transition-colors duration-500 group-hover:border-ink">
        {children}
      </span>
      <ArrowRight
        aria-hidden
        strokeWidth={1.75}
        className="h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover:translate-x-1"
      />
    </a>
  )
}
