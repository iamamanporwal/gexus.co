import { SectionIndex, SectionTitle } from '@/components/ui/SectionHeading'
import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { ConceptRail } from '@/components/ConceptRail'
import { conversation, think } from '@/lib/site'

export function ThinkDescribeBuild() {
  return (
    <section id="vision" className="shell scroll-mt-24 pt-16 lg:pt-24" aria-labelledby="s02-title">
      <div className="panel overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="px-6 pb-8 pt-8 sm:px-9 lg:col-span-4 lg:border-r lg:border-line lg:px-10 lg:py-14">
            <Reveal>
              <SectionIndex index={think.index} />
              <SectionTitle as="h2" id="s02-title" className="mt-8 lg:mt-14">
                {think.title[0]}
                <br />
                {think.title[1]}
                <br />
                {think.title[2]}
              </SectionTitle>
              <p className="mt-7 max-w-[26ch] text-body text-muted lg:mt-10">{think.body}</p>
              <p className="mt-4 max-w-[32ch] text-[13px] leading-[1.7] text-muted/80">
                {think.lede}
              </p>
            </Reveal>
          </div>

          <div className="relative px-6 pb-8 sm:px-9 lg:col-span-8 lg:py-14 lg:pl-12 lg:pr-0">
            <RevealGroup className="space-y-2.5">
              <div className="max-w-[440px] rounded-[13px] rounded-tl-[6px] border border-line bg-card px-4 py-3">
                <p className="text-[11.5px] leading-[1.6] text-ink/85">{conversation.prompt}</p>
              </div>
              <div className="max-w-[300px] rounded-[13px] rounded-tl-[6px] bg-ink/[0.045] px-4 py-3">
                <p className="text-[11.5px] leading-[1.6] text-muted">{conversation.reply}</p>
              </div>
            </RevealGroup>

            <ConceptRail concepts={think.concepts} />
          </div>
        </div>
      </div>
    </section>
  )
}
