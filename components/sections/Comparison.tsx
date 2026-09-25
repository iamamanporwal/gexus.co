import Image, { type StaticImageData } from "next/image";
import { Check } from "@/components/icons";
import { Logo } from "@/components/Logo";
import legacy from "@/public/images/compare-legacy.jpg";
import gexus from "@/public/images/compare-gexus.jpg";
import { SplitSection } from "./layout";

const legacyPoints = [
  "Requires installation",
  "Steep learning curve",
  "Complex interface",
  "Expensive licenses",
  "Desktop only",
];

const gexusPoints = [
  "Works in your browser",
  "Easy to learn",
  "Simple, modern interface",
  "Affordable",
  "Any device (laptop, tablet, phone)",
];

export function Comparison() {
  return (
    <SplitSection
      id="compare"
      label="Legacy CAD vs GEXUS"
      title={
        <>
          Legacy CAD
          <br />
          vs <span className="text-[#54a0f8]">GEXUS</span>.
        </>
      }
      lede={
        <>
          Same power.
          <br />
          Without the pain.
        </>
      }
    >
      <div className="grid gap-4 2xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
        <Panel
          image={legacy}
          alt="An overwhelmed engineer gripping his head in frustration"
          heading={<span className="text-[15.5px] font-semibold text-[#f0f2f4]">Traditional CAD</span>}
          border="border-white/15"
          grayscale
        >
          {legacyPoints.map((p) => (
            <li key={p} className="flex items-center gap-2.5 text-[15.2px] text-[#a3a9ae]">
              <span className="h-[13px] w-[13px] shrink-0 rounded-full border-[1.6px] border-[#8b9198]" aria-hidden="true" />
              {p}
            </li>
          ))}
        </Panel>

        <Panel
          image={gexus}
          alt="A confident maker at his GEXUS laptop with a speech bubble reading Just 3 clicks"
          heading={<Logo className="text-[20px]" />}
          border="border-brand/70"
        >
          {gexusPoints.map((p) => (
            <li key={p} className="flex items-center gap-2.5 text-[15px] text-[#c9ced3]">
              <Check className="shrink-0" />
              {p}
            </li>
          ))}
        </Panel>
      </div>
    </SplitSection>
  );
}

function Panel({
  image,
  alt,
  heading,
  border,
  grayscale = false,
  children,
}: {
  image: StaticImageData;
  alt: string;
  heading: React.ReactNode;
  border: string;
  grayscale?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative isolate flex flex-col overflow-hidden rounded-xl border bg-panel sm:min-h-[240px] sm:justify-center ${border}`}>
      <div className="relative aspect-[2/1] sm:absolute sm:inset-y-0 sm:right-0 sm:-z-10 sm:aspect-auto sm:w-[62%]">
        <Image
          src={image}
          alt={alt}
          fill
          placeholder="blur"
          sizes="(min-width: 1536px) 25vw, (min-width: 640px) 40vw, 100vw"
          className={`object-cover object-right ${grayscale ? "grayscale" : ""}`}
        />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-panel via-panel/40 to-transparent sm:block" />
      </div>
      <div className="p-5 sm:max-w-[58%] sm:p-6">
        <h3>{heading}</h3>
        <ul className="mt-4 space-y-3">{children}</ul>
      </div>
    </div>
  );
}
