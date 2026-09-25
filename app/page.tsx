import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StructuredData } from "@/components/StructuredData";
import { Comparison } from "@/components/sections/Comparison";
import { Features } from "@/components/sections/Features";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { IdeaToPart } from "@/components/sections/IdeaToPart";
import { OldWay } from "@/components/sections/OldWay";
import { Problem } from "@/components/sections/Problem";
import { Security } from "@/components/sections/Security";
import { UseCases } from "@/components/sections/UseCases";
import { Vision } from "@/components/sections/Vision";

/** Fully static: rendered once at build time, no client JavaScript of its own. */
export default function Home() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main>
        <Hero />
        <Problem />
        <OldWay />
        <Security />
        <IdeaToPart />
        <HowItWorks />
        <UseCases />
        <Features />
        <Comparison />
        <Vision />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
