'use client'

import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * Collapsible footer column for small screens. The links stay in the DOM at
 * all times so crawlers see the full navigation regardless of open state; the
 * collapse is a CSS grid row transition rather than a measured height.
 */
export function FooterAccordion({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-[12.5px] font-medium text-white">{title}</span>
        <ChevronDown
          aria-hidden
          strokeWidth={1.5}
          className={`h-4 w-4 text-white/60 transition-transform duration-500 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        id={id}
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <ul className="overflow-hidden">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                tabIndex={open ? undefined : -1}
                className="block py-2.5 text-[12.5px] text-white/55 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="h-2" aria-hidden />
        </ul>
      </div>
    </div>
  )
}
