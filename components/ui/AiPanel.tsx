import { ArrowRight, Menu, X } from 'lucide-react'
import { conversation, think } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * The floating glass assistant panel anchored to the right of the hero.
 * Static markup: the entrance is a CSS `lift-in` on each row.
 */
export function AiPanel({ className }: { className?: string }) {
  return (
    <aside
      aria-label="Preview of a Gexus conversation"
      className={cn(
        'flex flex-col overflow-hidden rounded-[22px] border border-line/90 bg-white/70 shadow-glass backdrop-blur-2xl backdrop-saturate-150',
        className,
      )}
    >
      <header className="flex items-center justify-between border-b border-line/70 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-semibold tracking-[-0.01em] text-ink">Gexus AI</span>
          <span className="rounded-[5px] bg-ink/[0.06] px-1.5 py-[3px] text-[8px] font-semibold uppercase tracking-[0.12em] text-muted">
            Beta
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-muted/70" aria-hidden>
          <Menu strokeWidth={1.5} className="h-3.5 w-3.5" />
          <X strokeWidth={1.5} className="h-3.5 w-3.5" />
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-2.5 px-4 py-4">
        <div className="lift-in flex justify-end [--lift-delay:1250ms]">
          <p className="max-w-[86%] rounded-[14px] rounded-tr-[6px] bg-ink/[0.055] px-3.5 py-2.5 text-[11px] leading-[1.62] text-ink/85">
            {conversation.prompt}
          </p>
        </div>

        <div className="lift-in flex justify-start [--lift-delay:1600ms]">
          <p className="max-w-[80%] rounded-[14px] rounded-tl-[6px] bg-ink/[0.035] px-3.5 py-2.5 text-[11px] leading-[1.62] text-muted">
            {conversation.reply}
          </p>
        </div>

        <figure className="lift-in mt-1 overflow-hidden rounded-[14px] border border-line bg-white [--lift-delay:1950ms]">
          <img
            src={think.concepts[2].src}
            alt={think.concepts[2].alt}
            width={300}
            height={200}
            loading="eager"
            decoding="async"
            className="aspect-[3/2] w-full px-3 py-2"
          />
        </figure>
      </div>

      <footer className="border-t border-line/70 px-3 py-2.5">
        <div className="flex items-center justify-between gap-3 rounded-[12px] bg-ink/[0.03] px-3 py-2">
          <span className="truncate text-[10.5px] text-muted/80">{conversation.placeholder}</span>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-white">
            <ArrowRight aria-hidden strokeWidth={2} className="h-2.5 w-2.5" />
          </span>
        </div>
      </footer>
    </aside>
  )
}
