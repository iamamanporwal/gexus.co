'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Wordmark } from '@/components/ui/Wordmark'
import { Button } from '@/components/ui/Button'
import { navLinks, hero } from '@/lib/site'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[64px] transition-[background-color,backdrop-filter,border-color] duration-700 lg:h-[80px] ${
          scrolled
            ? 'border-b border-line/80 bg-page/70 backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="shell flex h-full items-center justify-between" aria-label="Primary">
          <a href="#top" aria-label="Gexus home" className="shrink-0">
            <Wordmark />
          </a>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[13px] tracking-[-0.005em] text-ink/75 transition-colors duration-500 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button size="sm" href="#access">
              {hero.cta}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
          >
            {open ? <X strokeWidth={1.6} className="h-5 w-5" /> : <Menu strokeWidth={1.6} className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      <div
        id="mobile-nav"
        hidden={!open}
        className={`fixed inset-0 z-40 bg-page/95 backdrop-blur-2xl transition-opacity duration-500 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ul className="flex h-full flex-col justify-center gap-2 px-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-5 text-[30px] font-medium tracking-tightest text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-8">
            <Button size="lg" href="#access" onClick={() => setOpen(false)} className="w-full">
              {hero.cta}
            </Button>
          </li>
        </ul>
      </div>
    </>
  )
}
