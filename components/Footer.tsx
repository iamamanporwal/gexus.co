import { Linkedin, Youtube } from 'lucide-react'
import { Wordmark } from '@/components/ui/Wordmark'
import { FooterAccordion } from '@/components/FooterAccordion'
import { footer } from '@/lib/site'

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.53 3h3.02l-6.6 7.54L21.75 21h-5.9l-4.62-6.04L5.94 21H2.92l7.06-8.07L2.5 3h6.05l4.18 5.52L17.53 3Zm-1.06 16.17h1.67L7.6 4.74H5.81l10.66 14.43Z" />
    </svg>
  )
}

const socials = [
  { label: 'Gexus on LinkedIn', href: '#', Icon: Linkedin },
  { label: 'Gexus on X', href: '#', Icon: XIcon },
  { label: 'Gexus on YouTube', href: '#', Icon: Youtube },
]

export function Footer() {
  return (
    <footer className="shell pb-5 pt-5 lg:pb-6 lg:pt-6">
      <div className="rounded-card bg-ink900 px-6 pb-6 pt-9 sm:px-9 lg:px-10 lg:pb-8 lg:pt-12">
        <div className="grid grid-cols-1 gap-9 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Wordmark tone="light" />
            <p className="mt-6 text-[12.5px] leading-[1.7] text-white/55">
              {footer.tagline[0]}
              <br />
              {footer.tagline[1]}
            </p>
            <ul className="mt-7 flex items-center gap-4">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors duration-500 hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="h-[15px] w-[15px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop: three link columns */}
          <div className="hidden lg:col-span-8 lg:grid lg:grid-cols-3 lg:gap-8">
            {footer.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-[12.5px] font-medium text-white">{col.title}</h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-[12.5px] text-white/55 transition-colors duration-500 hover:text-white"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Mobile: the same links, collapsed */}
          <div className="lg:hidden">
            <div className="border-t border-white/10">
              {footer.columns.map((col) => (
                <FooterAccordion key={col.title} title={col.title} links={col.links} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between lg:mt-12">
          <p className="text-[11px] text-white/40">{footer.copyright}</p>
          <ul className="flex items-center gap-6">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-[11px] text-white/40 transition-colors duration-500 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
