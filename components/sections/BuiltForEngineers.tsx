import { SectionIndex, SectionTitle } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { TextLink } from '@/components/ui/TextLink'
import { Testimonials } from '@/components/Testimonials'
import { impact } from '@/lib/site'

export function BuiltForEngineers() {
  return (
    <section id="company" className="shell scroll-mt-24 pt-16 lg:pt-24" aria-labelledby="s05-title">
      <div className="panel overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="px-6 pb-8 pt-8 sm:px-9 lg:col-span-4 lg:py-16 lg:pl-10 lg:pr-8">
            <Reveal>
              <SectionIndex index={impact.index} />
              <SectionTitle as="h2" id="s05-title" className="mt-8 lg:mt-12">
                {impact.title[0]}
                <br />
                {impact.title[1]}
                <br className="hidden lg:block" /> {impact.title[2]}
              </SectionTitle>
              <p className="mt-7 max-w-[34ch] text-body text-muted lg:mt-9">{impact.body}</p>
              <div className="mt-7 lg:mt-9">
                <TextLink href="#access">{impact.link}</TextLink>
              </div>
            </Reveal>
          </div>

          <div className="relative lg:col-span-8">
            <img
              src={impact.image.src}
              alt={impact.image.alt}
              width={1200}
              height={700}
              loading="lazy"
              decoding="async"
              className="h-[260px] w-full object-cover sm:h-[340px] lg:h-full lg:min-h-[420px]"
            />

            <div className="px-6 pb-8 sm:px-9 lg:absolute lg:inset-y-0 lg:right-8 lg:flex lg:items-center lg:px-0 lg:pb-0">
              <Testimonials quotes={impact.quotes} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
