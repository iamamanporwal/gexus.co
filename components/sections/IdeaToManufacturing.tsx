import { ChevronRight } from 'lucide-react'
import { SectionIndex, SectionTitle } from '@/components/ui/SectionHeading'
import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { TextLink } from '@/components/ui/TextLink'
import { process } from '@/lib/site'

export function IdeaToManufacturing() {
  return (
    <section id="impact" className="shell scroll-mt-24 pt-16 lg:pt-24" aria-labelledby="s04-title">
      <div className="panel overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="px-6 pb-6 pt-8 sm:px-9 lg:col-span-4 lg:py-14 lg:pl-10 lg:pr-8">
            <Reveal>
              <SectionIndex index={process.index} />
              <SectionTitle as="h2" id="s04-title" className="mt-8 lg:mt-12">
                {process.title[0]}
                <br />
                {process.title[1]}
              </SectionTitle>
              <p className="mt-7 hidden max-w-[34ch] text-body text-muted lg:block">
                {process.body}
              </p>
              <div className="mt-7 lg:mt-9">
                <TextLink href="#access">{process.link}</TextLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8 lg:py-14 lg:pr-2">
            <RevealGroup
              as="ol"
              className="no-scrollbar snap-row flex items-start gap-1.5 overflow-x-auto px-6 pb-8 sm:px-9 lg:px-0"
            >
              {process.steps.map((step, i) => (
                <li key={step.label} className="flex shrink-0 items-start">
                  <figure className="group w-[132px] shrink-0 sm:w-[150px] lg:w-[118px] xl:w-[132px]">
                    <div className="overflow-hidden rounded-[12px] border border-line bg-card shadow-soft transition-shadow duration-500 group-hover:shadow-lift">
                      <div className="aspect-[3/2.6] w-full overflow-hidden">
                        <img
                          src={step.src}
                          alt={step.alt}
                          width={300}
                          height={200}
                          loading="lazy"
                          decoding="async"
                          className={`h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06] ${
                            step.label === 'Manufacture' ? '' : 'p-2'
                          }`}
                        />
                      </div>
                    </div>
                    <figcaption className="mt-3 text-center text-[10.5px] text-muted">
                      {step.label}
                    </figcaption>
                  </figure>

                  {i < process.steps.length - 1 && (
                    <ChevronRight
                      aria-hidden
                      strokeWidth={1.4}
                      className="mt-[62px] h-3.5 w-3.5 shrink-0 text-muted/45 lg:mt-[52px]"
                    />
                  )}
                </li>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  )
}
