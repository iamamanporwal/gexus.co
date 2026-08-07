import { SectionIndex, SectionTitle } from '@/components/ui/SectionHeading'
import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { TextLink } from '@/components/ui/TextLink'
import { ParticleWave } from '@/components/visuals/ParticleWave'
import {
  ContinuousLearningIcon,
  DesignReasoningIcon,
  EngineeringIntelligenceIcon,
  ManufacturingAwareIcon,
} from '@/components/visuals/FeatureIcons'
import { technology } from '@/lib/site'

const ICONS = [
  EngineeringIntelligenceIcon,
  DesignReasoningIcon,
  ManufacturingAwareIcon,
  ContinuousLearningIcon,
]

export function AiThatUnderstands() {
  return (
    <section id="technology" className="scroll-mt-24 pt-16 lg:pt-24" aria-labelledby="s03-title">
      <div className="shell">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 lg:py-16">
            <Reveal>
              <SectionIndex index={technology.index} />
              <SectionTitle as="h2" id="s03-title" className="mt-8 lg:mt-12">
                {technology.title[0]}
                <br className="hidden lg:block" /> {technology.title[1]}
                <br className="hidden lg:block" /> {technology.title[2]}
              </SectionTitle>
              <p className="mt-7 max-w-[36ch] text-body text-muted lg:mt-9">{technology.body}</p>
              <div className="mt-8 lg:mt-10">
                <TextLink href="#impact">{technology.link}</TextLink>
              </div>
            </Reveal>
          </div>

          <Reveal className="h-[180px] w-full sm:h-[240px] lg:col-span-8 lg:h-[400px]" y={0}>
            <ParticleWave />
          </Reveal>
        </div>
      </div>

      <div className="shell mt-10 lg:mt-14">
        <RevealGroup as="ul" className="panel grid grid-cols-2 lg:grid-cols-4">
          {technology.features.map((feature, i) => {
            const Icon = ICONS[i]
            return (
              <li
                key={feature.title.join(' ')}
                className={[
                  'group px-5 py-7 transition-transform duration-500 ease-out hover:-translate-y-1 lg:px-8 lg:py-9',
                  i % 2 === 1 ? 'border-l border-line' : '',
                  i > 1 ? 'border-t border-line lg:border-t-0' : '',
                  i >= 2 ? 'lg:border-l lg:border-line' : '',
                ].join(' ')}
              >
                <Icon className="h-[22px] w-[22px] text-ink/80 transition-colors duration-500 group-hover:text-ink" />
                <h3 className="mt-5 text-[13px] font-medium leading-[1.4] tracking-[-0.01em] text-ink">
                  <span className="hidden lg:inline">
                    {feature.title[0]}
                    <br />
                    {feature.title[1]}
                  </span>
                  <span className="lg:hidden">{feature.title.join(' ')}</span>
                </h3>
                <p className="mt-3 max-w-[26ch] text-[12px] leading-[1.62] text-muted">
                  {feature.body}
                </p>
              </li>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
