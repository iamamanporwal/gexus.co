import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/sections/Hero'
import { ThinkDescribeBuild } from '@/components/sections/ThinkDescribeBuild'
import { AiThatUnderstands } from '@/components/sections/AiThatUnderstands'
import { IdeaToManufacturing } from '@/components/sections/IdeaToManufacturing'
import { BuiltForEngineers } from '@/components/sections/BuiltForEngineers'
import { FinalCta } from '@/components/sections/FinalCta'
import { Partners } from '@/components/sections/Partners'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <ThinkDescribeBuild />
        <AiThatUnderstands />
        <IdeaToManufacturing />
        <BuiltForEngineers />
        <FinalCta />
        <Partners />
      </main>
      <Footer />
    </>
  )
}
