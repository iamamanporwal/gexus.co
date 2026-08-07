import { SectionIndex, SectionTitle } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { GEmblem } from '@/components/visuals/GEmblem'
import { finalCta } from '@/lib/site'

export function FinalCta() {
  return (
    <section id="access" className="shell scroll-mt-24 pt-16 lg:pt-24" aria-labelledby="s06-title">
      <div className="panel overflow-hidden bg-gradient-to-b from-white to-[#F6F6F7]">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="px-6 pb-4 pt-8 sm:px-9 lg:col-span-5 lg:py-20 lg:pl-10">
            <Reveal>
              <SectionIndex index={finalCta.index} />
              <SectionTitle as="h2" id="s06-title" className="mt-8 lg:mt-12">
                {finalCta.title[0]}
                <br />
                {finalCta.title[1]}
              </SectionTitle>
              <p className="mt-7 max-w-[36ch] text-body text-muted lg:mt-9">{finalCta.body}</p>
              <div className="mt-9 lg:mt-11">
                <Button size="md" href="#access">
                  {finalCta.cta}
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="relative lg:col-span-7">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 [background:radial-gradient(45%_45%_at_50%_46%,rgba(17,17,17,0.05),transparent_70%)]"
            />
            <Reveal className="mx-auto h-[280px] w-full max-w-[420px] px-6 pb-10 sm:h-[340px] lg:h-[440px] lg:pb-0 lg:pt-6">
              <div className="float-slow h-full w-full">
                <GEmblem />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
