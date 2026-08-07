import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { AiPanel } from '@/components/ui/AiPanel'
import { HeroArt } from '@/components/HeroArt'
import { hero } from '@/lib/site'

const HERO_ART_ALT =
  'A generatively designed drone arm bracket in polished metal, its load paths resolved into a woven lattice between two mounting eyes.'

const TAG_POSITIONS = [
  'left-[32%] top-[0%]',
  'left-[1%] top-[16%]',
  'right-[7%] top-[62%]',
  'right-[26%] bottom-[0%]',
]

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-[104px] lg:pt-[132px]"
      aria-labelledby="hero-title"
    >
      <div
        aria-hidden
        className="blueprint-grid pointer-events-none absolute inset-x-0 top-0 h-[820px] opacity-[0.55] [mask-image:radial-gradient(70%_58%_at_58%_38%,#000_0%,transparent_100%)]"
      />

      <div className="shell relative">
        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
          {/* Copy */}
          <div className="relative z-20 lg:col-span-4 lg:pt-14 xl:pt-20">
            <div className="lift-in">
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </div>

            <h1
              id="hero-title"
              className="chrome lift-in mt-5 text-[44px] font-medium leading-[1.02] tracking-tightest [--lift-delay:110ms] sm:text-[56px] lg:text-[54px] xl:text-[62px] 2xl:text-[66px]"
            >
              {hero.title[0]}
              <br />
              {hero.title[1]}
              <br />
              {hero.title[2]}
            </h1>

            <p className="lift-in mt-7 max-w-[38ch] text-body text-muted [--lift-delay:220ms] lg:max-w-[32ch]">
              {hero.body}
            </p>

            <div className="lift-in mt-9 [--lift-delay:330ms]">
              <Button size="md" href="#access">
                {hero.cta}
              </Button>
            </div>

            <div className="lift-in mt-14 hidden [--lift-delay:440ms] lg:mt-12 lg:block">
              <a href="#vision" className="group inline-flex flex-col gap-2">
                <span className="text-[9.5px] font-medium uppercase tracking-label text-muted/80">
                  {hero.scroll}
                </span>
                <ChevronDown
                  aria-hidden
                  strokeWidth={1.4}
                  className="float-slow h-4 w-4 text-muted/70 transition-colors group-hover:text-ink"
                />
              </a>
            </div>
          </div>

          {/* Render and floating engineering tags */}
          {/* The render is wide and shallow (roughly 2.5:1), so the box is
              sized to that rather than to a square. */}
          <div className="relative z-10 -mx-4 h-[200px] sm:mx-0 sm:h-[270px] lg:col-span-8 lg:-ml-[8%] lg:h-[380px] lg:w-[70%] xl:h-[410px] xl:w-[72%]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-[6%] bottom-[20%] h-24 [background:radial-gradient(50%_50%_at_48%_50%,rgba(17,17,17,0.13),transparent_72%)]"
            />

            <HeroArt alt={HERO_ART_ALT} />

            <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
              {hero.tags.map((tag, i) => (
                <div
                  key={tag.label}
                  className={`lift-in absolute ${TAG_POSITIONS[i]}`}
                  style={{ '--lift-delay': `${1250 + i * 150}ms` } as React.CSSProperties}
                >
                  <div className="float-slower rounded-[11px] border border-line bg-white/85 px-3 py-2 text-center shadow-soft backdrop-blur-md">
                    <span className="block text-[10px] font-medium leading-[1.35] text-ink">
                      {tag.label}
                    </span>
                    <span className="block text-[10px] leading-[1.35] text-muted">{tag.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: the tags collapse into a scrollable strip */}
          <ul className="no-scrollbar -mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {hero.tags.map((tag) => (
              <li
                key={tag.label}
                className="shrink-0 rounded-[11px] border border-line bg-white px-3 py-2 text-center shadow-soft"
              >
                <span className="block text-[10px] font-medium leading-[1.35] text-ink">
                  {tag.label}
                </span>
                <span className="block text-[10px] leading-[1.35] text-muted">{tag.value}</span>
              </li>
            ))}
          </ul>

          <AiPanel className="lift-in z-30 mx-auto w-full max-w-[360px] [--lift-delay:1050ms] lg:absolute lg:right-0 lg:top-4 lg:mx-0 lg:w-[300px] xl:w-[326px]" />
        </div>
      </div>
    </section>
  )
}
