import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { DescribeIcon, ExportIcon, RefineIcon, StepArrow } from "@/components/icons";
import { links } from "@/lib/site";
import hero from "@/public/images/hero.jpg";
import { container } from "./layout";

const steps = [
  { label: "Describe", Icon: DescribeIcon },
  { label: "Refine", Icon: RefineIcon },
  { label: "Export", Icon: ExportIcon },
];

export function Hero() {
  const demo = links.demo;

  return (
    <section
      id="top"
      aria-label="Hero"
      className="relative isolate flex flex-col overflow-hidden bg-ink pt-24 lg:min-h-[min(900px,100svh)] lg:flex-row lg:items-center lg:pt-16"
    >
      {/*
        Mobile: the illustration sits below the copy. Desktop: it fills the
        section and the copy sits over the dark left side, as in the design.
      */}
      <div className="relative order-last mt-12 aspect-[4/3] w-full sm:aspect-[16/9] lg:absolute lg:inset-0 lg:-z-10 lg:mt-0 lg:aspect-auto">
        <Image
          src={hero}
          alt="A builder in a GEXUS jacket in his workshop, with the GEXUS CAD app open on a laptop and phone showing a 3D motor bracket"
          fill
          preload
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[78%_center] lg:object-right"
        />
        {/* Hides the baked-in ghost copy on the left of the source artwork. */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#02060a_0%,#02060a_30%,rgba(2,6,10,0.85)_40%,rgba(2,6,10,0)_58%)] lg:block" />
        {/* Below desktop the whole artwork shows; fade its left edge, where the source has blurred placeholder avatars. */}
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-ink to-transparent lg:hidden" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className={`${container} relative`}>
        <p className="text-[15px] font-medium tracking-[0.08em] text-eyebrow uppercase md:text-[20px]">
          AI-assisted CAD for real builders
        </p>

        <h1 className="mt-3 font-display text-[clamp(4rem,9.2vw,7.6rem)] leading-[0.86] font-extrabold tracking-[-0.012em] text-white uppercase">
          3D CAD in
          <br />
          <span className="text-[1.1em] text-[#4595fd]">3 clicks.</span>
        </h1>

        <p className="mt-6 max-w-[34rem] text-[17px] leading-[1.45] text-body md:text-[19.75px]">
          Turn your ideas, sketches or images into manufacturing-ready 3D
          models, in your browser.
        </p>

        <ol className="mt-9 flex items-start gap-3 sm:gap-6" aria-label="Three steps">
          {steps.map(({ label, Icon }, i) => (
            <li key={label} className="flex items-start gap-3 sm:gap-6">
              <div className="flex w-[76px] flex-col items-center gap-3">
                <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[10px] border-[1.5px] border-line bg-[rgba(6,9,13,0.9)] sm:h-[76px] sm:w-[76px]">
                  <Icon className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
                <span className="text-[15px] font-semibold text-[#f0f2f4] sm:text-[17px]">{label}</span>
              </div>
              {i < steps.length - 1 && <StepArrow className="mt-[25px] shrink-0 sm:mt-[31px]" />}
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
          <ButtonLink href={links.app} className="h-[60px] px-9 text-[18.5px]">
            Try GEXUS Free
          </ButtonLink>
          <a
            href={demo ?? "#how-it-works"}
            {...(demo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-[15.5px] font-semibold text-[#f2f4f6] underline underline-offset-4 hover:text-white"
          >
            {demo ? "Watch 1 min demo" : "See how it works"}
            <span className="ml-1.5 inline-block text-brand no-underline" aria-hidden="true">
              &gt;
            </span>
          </a>
        </div>

        <p className="mt-10 text-[14px] text-muted md:text-[15px]">
          500+ CAD designs <span aria-hidden="true">&nbsp;•&nbsp;</span> 100+ makers{" "}
          <span aria-hidden="true">&nbsp;•&nbsp;</span> Early access
        </p>
      </div>
    </section>
  );
}
