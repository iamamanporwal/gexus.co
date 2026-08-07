import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { partners } from '@/lib/site'
import { PartnerMark } from '@/components/visuals/PartnerLogos'

export function Partners() {
  return (
    <section className="shell pt-5 lg:pt-6" aria-labelledby="partners-title">
      <div className="panel px-6 py-9 sm:px-9 lg:px-10 lg:py-11">
        <Reveal>
          <h2 id="partners-title" className="text-center text-[12px] leading-[1.6] text-muted">
            {partners.heading}
          </h2>
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-8 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:mt-10 lg:flex lg:justify-between lg:gap-0"
        >
          {partners.logos.map((name) => (
            <li key={name} className="lg:px-4">
              <PartnerMark name={name} />
            </li>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
