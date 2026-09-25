import { getImageProps } from "next/image";
import { ButtonLink } from "@/components/Button";
import { DescribeIcon, ExportIcon, RefineIcon, StepArrow } from "@/components/icons";
import { links } from "@/lib/site";
import hero from "@/public/images/hero.jpg";
import heroMobile from "@/public/images/hero-mobile.jpg";
import { container } from "./layout";

const steps = [
  { label: "Describe", Icon: DescribeIcon },
  { label: "Refine", Icon: RefineIcon },
  { label: "Export", Icon: ExportIcon },
];

const heroAlt =
  "The GEXUS AI CAD app on a laptop and phone, designing a parametric FPV drone chassis with adjustable dimensions and one-click STL export";

export function Hero() {
  const demo = links.demo;

  // The LCP image: loaded eagerly at high priority, one <picture> for both crops.
  const common = { alt: heroAlt, loading: "eager", fetchPriority: "high" } as const;
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: hero, sizes: "min(84vw, 1600px)" });
  const { props: mobileImg } = getImageProps({ ...common, src: heroMobile, sizes: "100vw" });

  return (
    <section
      id="top"
      aria-label="Hero"
      className="relative isolate flex flex-col overflow-hidden bg-ink pt-24 lg:min-h-[min(820px,100svh)] lg:flex-row lg:items-center lg:pt-16"
    >
      {/*
        Art-directed: phones and tablets get a tight crop of the laptop and
        phone below the copy; from lg the full product shot sits to the right
        of the headline, sized so the laptop screen always clears the text.
        The mask feathers its edges into the page, since the render's black
        is not quite the page's ink.
      */}
      <div className="hero-art relative order-last mt-10 aspect-[1402/779] w-full lg:absolute lg:top-1/2 lg:right-0 lg:-z-10 lg:mt-0 lg:aspect-[1942/809] lg:w-[84vw] lg:max-w-[1600px] lg:-translate-y-1/2">
        <picture>
          <source media="(min-width: 1024px)" srcSet={desktopSrcSet} sizes="min(84vw, 1600px)" />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
          <img {...mobileImg} className="absolute inset-0 h-full w-full object-cover" />
        </picture>
      </div>

      <div className={`${container} relative`}>
        <p className="text-[13px] font-medium tracking-[0.06em] text-eyebrow uppercase sm:text-[15px] sm:tracking-[0.08em] md:text-[20px]">
          AI-assisted CAD for real builders
        </p>

        <h1 className="mt-3 font-display text-[clamp(4rem,9.2vw,7.6rem)] leading-[0.86] font-extrabold tracking-[-0.012em] text-white uppercase">
          3D CAD in
          <br />
          <span className="text-[1.1em] text-[#4595fd]">3 clicks.</span>
        </h1>

        <p className="mt-6 max-w-[34rem] text-[17px] lg:max-w-[26rem] xl:max-w-[30rem] 2xl:max-w-[34rem] leading-[1.45] text-body md:text-[19.75px]">
          Turn your ideas, sketches or images into manufacturing-ready 3D
          models, in your browser.
        </p>

        <ol className="mt-8 flex items-start gap-2 sm:mt-9 sm:gap-6" aria-label="Three steps">
          {steps.map(({ label, Icon }, i) => (
            <li key={label} className="flex items-start gap-2 sm:gap-6">
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

        <div className="mt-9 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-7">
          <ButtonLink href={links.app} className="h-14 px-9 text-[17px] sm:h-[60px] sm:text-[18.5px]">
            Try GEXUS Free
          </ButtonLink>
          <a
            href={demo ?? "#how-it-works"}
            {...(demo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="self-center py-2 text-[15.5px] font-semibold text-[#f2f4f6] underline underline-offset-4 hover:text-white sm:self-auto"
          >
            {demo ? "Watch 1 min demo" : "See how it works"}
            <span className="ml-1.5 inline-block text-brand no-underline" aria-hidden="true">
              &gt;
            </span>
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-2 text-[13px] sm:gap-x-3 sm:gap-y-1 sm:text-[14px] text-muted sm:mt-10 sm:justify-start md:text-[15px]">
          {["500+ CAD designs", "100+ makers", "Early access"].map((stat, i) => (
            <li
              key={stat}
              className="flex items-center gap-3 rounded-full border border-white/10 px-3 py-1 whitespace-nowrap sm:rounded-none sm:border-0 sm:p-0"
            >
              {i > 0 && (
                <span aria-hidden="true" className="hidden sm:inline">
                  •
                </span>
              )}
              {stat}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
