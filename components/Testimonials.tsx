'use client'

import { useState } from 'react'

type Quote = { quote: string; name: string; org: string }

/**
 * Quote carousel. All four quotes stay in the DOM so every one of them is
 * crawlable; only opacity and the aria state change between slides.
 */
export function Testimonials({ quotes }: { quotes: Quote[] }) {
  const [active, setActive] = useState(0)

  return (
    <figure className="-mt-12 rounded-[18px] border border-white/70 bg-white/75 p-5 shadow-glass backdrop-blur-2xl backdrop-saturate-150 lg:mt-0 lg:w-[268px] lg:p-6 xl:w-[290px]">
      <span aria-hidden className="block text-[22px] leading-none text-muted/45">
        &ldquo;
      </span>

      <div className="relative mt-2">
        {quotes.map((q, i) => (
          <div
            key={q.name}
            aria-hidden={i !== active}
            className={
              i === active
                ? 'relative transition-opacity duration-500'
                : 'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500'
            }
          >
            <blockquote className="text-[12.5px] leading-[1.68] text-ink/90">{q.quote}</blockquote>
            <figcaption className="mt-4 text-[10.5px] leading-[1.6] text-muted">
              {q.name}
              <br />
              {q.org}
            </figcaption>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end gap-2">
        {quotes.map((q, i) => (
          <button
            key={q.name}
            type="button"
            aria-label={`Show the quote from the ${q.name}`}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? 'w-4 bg-ink' : 'w-1.5 bg-ink/20 hover:bg-ink/40'
            }`}
          />
        ))}
      </div>
    </figure>
  )
}
