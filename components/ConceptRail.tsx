'use client'

import { useCallback, useRef } from 'react'
import { ArrowRight } from 'lucide-react'

type Concept = { src: string; name: string; spec: string; alt: string }

/**
 * Horizontal rail of generated concepts. Client only for the advance button;
 * the cards themselves are plain markup and native scroll snapping.
 */
export function ConceptRail({ concepts }: { concepts: Concept[] }) {
  const track = useRef<HTMLUListElement>(null)

  const next = useCallback(() => {
    const el = track.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const step = card ? card.offsetWidth + 16 : 260
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8
    el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + step, behavior: 'smooth' })
  }, [])

  return (
    <div className="relative mt-7 lg:mt-10">
      <ul
        ref={track}
        data-reveal-group=""
        className="no-scrollbar snap-row flex gap-4 overflow-x-auto pb-1 lg:pr-24"
      >
        {concepts.map((c) => (
          <li
            key={c.name}
            className="group w-[62%] shrink-0 rounded-[16px] border border-line bg-white p-3 shadow-soft transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-lift sm:w-[46%] lg:w-[31%]"
          >
            <img
              src={c.src}
              alt={c.alt}
              width={300}
              height={200}
              loading="lazy"
              decoding="async"
              className="aspect-[3/2] w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="mt-2 px-1 pb-0.5">
              <p className="text-[11px] font-medium text-ink">{c.name}</p>
              <p className="text-[10.5px] text-muted">{c.spec}</p>
            </div>
          </li>
        ))}
      </ul>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-28 bg-gradient-to-l from-white via-white/85 to-transparent lg:block"
      />
      <button
        type="button"
        onClick={next}
        aria-label="Show the next generated concept"
        className="absolute right-4 top-[42%] hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-white shadow-soft transition-transform duration-500 ease-out hover:scale-110 active:scale-95 lg:flex"
      >
        <ArrowRight aria-hidden strokeWidth={1.8} className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
