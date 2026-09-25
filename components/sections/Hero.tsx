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

/**
 * The side-by-side desktop hero needs width and a landscape screen. A portrait
 * iPad Pro is 1024px wide but would leave the art floating in a tall void, so
 * it keeps the stacked layout. Mirrors the `desk` variant in globals.css.
 */
const DESK_MEDIA = "(min-width: 1024px) and (min-aspect-ratio: 11/10)";

const heroAlt =
  "The GEXUS AI CAD app on a laptop and phone, designing a parametric FPV drone chassis with adjustable dimensions and one-click STL export";

export function Hero() {
  const demo = links.demo;

  // The LCP image: loaded eagerly at high priority, one <picture> for both crops.
  const common = { alt: heroAlt, loading: "eager", fetchPriority: "high" } as const;
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: hero, sizes: "min(78vw, 1500px)" });
  const { props: mobileImg } = getImageProps({ ...common, src: heroMobile, sizes: "100vw" });

  return (
    // Always at least one full screen, so the next section never peeks in as a
    // strip. Top padding clears the fixed 4rem header plus a margin; on
    // desktop both margins and every size below scale with the viewport
    // height, so the whole hero fits short laptop screens as well as tall
    // monitors.
    <section
      id="top"
      aria-label="Hero"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink pt-[calc(4rem+2rem)] desk:flex-row desk:items-center desk:pt-[calc(4rem+clamp(1rem,4svh,3.5rem))] desk:pb-[clamp(1rem,4svh,3.5rem)]"
    >
      {/*
        Art-directed: portrait screens get a tight crop of the laptop and phone
        under the copy, pushed to the bottom of the screen; landscape desktops
        get the product shot (its empty left side trimmed) at up to 72vw, 78vw
        from xl,
        bleeding slightly off the right edge, sized by width and height so the
        laptop screen always clears the text (past 2000px it stays near the
        text instead of the far edge). The mask feathers
        its edges into the page, since the render's black is not quite the
        page's ink.
      */}
      <div className="hero-art relative order-last mt-auto aspect-[1404/779] w-full desk:absolute desk:top-[calc(50%+2rem)] desk:right-[calc(max(0px,(100vw-2000px)/2)-2vw)] desk:-z-10 desk:mt-0 desk:aspect-[1564/809] desk:w-[min(72vw,1500px,calc((100svh-4rem)*1.5))] desk:xl:w-[min(78vw,1500px,calc((100svh-4rem)*1.5))] desk:-translate-y-1/2">
        <picture>
          <source media={DESK_MEDIA} srcSet={desktopSrcSet} sizes="min(78vw, 1500px)" />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
          <img {...mobileImg} className="absolute inset-0 h-full w-full object-cover" />
        </picture>
      </div>

      <div className={`${container} relative mb-10 desk:mb-0`}>
        <p className="text-[13px] font-medium tracking-[0.06em] text-eyebrow uppercase sm:text-[15px] sm:tracking-[0.08em] md:text-[20px] desk:text-[clamp(13px,1.8svh,20px)]">
          AI-assisted CAD for real builders
        </p>

        <h1 className="mt-3 font-display text-[clamp(4rem,9.2vw,7.6rem)] leading-[0.86] font-extrabold tracking-[-0.012em] text-white uppercase desk:mt-[clamp(0.375rem,1svh,0.75rem)] desk:text-[clamp(3.25rem,min(7vw,11svh),8rem)]">
          3D CAD in
          <br />
          <span className="text-[1.1em] text-[#4595fd]">3 clicks.</span>
        </h1>

        <p className="mt-6 max-w-[34rem] text-[17px] leading-[1.45] text-body md:text-[19.75px] desk:mt-[clamp(0.75rem,2.4svh,1.5rem)] desk:max-w-[24rem] desk:text-[clamp(15px,2svh,21px)] xl:max-w-[27rem] 2xl:max-w-[30rem]">
          Turn your ideas, sketches or images into manufacturing-ready 3D
          models, in your browser.
        </p>

        <ol className="mt-8 flex items-start gap-2 sm:mt-9 sm:gap-6 desk:mt-[clamp(1rem,3.4svh,2.25rem)]" aria-label="Three steps">
          {steps.map(({ label, Icon }, i) => (
            <li key={label} className="flex items-start gap-2 sm:gap-6">
              <div className="flex w-[76px] flex-col items-center gap-3 desk:w-[max(68px,var(--step))] desk:gap-[clamp(0.375rem,1.1svh,0.75rem)]">
                <div className="flex size-16 items-center justify-center rounded-[10px] border-[1.5px] border-line bg-[rgba(6,9,13,0.9)] sm:size-[76px] desk:size-[var(--step)]">
                  <Icon className="size-8 sm:size-10 desk:size-[calc(var(--step)*0.53)]" />
                </div>
                <span className="text-[15px] font-semibold text-[#f0f2f4] sm:text-[17px] desk:text-[clamp(13px,1.7svh,18px)]">{label}</span>
              </div>
              {i < steps.length - 1 && (
                <StepArrow className="mt-[25px] shrink-0 sm:mt-[31px] desk:mt-[calc(var(--step)/2_-_7px)]" />
              )}
            </li>
          ))}
        </ol>

        <div className="mt-9 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-7 desk:mt-[clamp(1rem,3.8svh,2.5rem)]">
          <ButtonLink href={links.app} className="h-14 px-9 text-[17px] sm:h-[60px] sm:text-[18.5px] desk:h-[clamp(46px,6svh,64px)] desk:px-[clamp(1.75rem,2.8svh,2.5rem)] desk:text-[clamp(15px,1.9svh,19px)]">
            Try GEXUS Free
          </ButtonLink>
          <a
            href={demo ?? "#how-it-works"}
            {...(demo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="self-center py-2 text-[15.5px] font-semibold desk:text-[clamp(14px,1.8svh,17px)] text-[#f2f4f6] underline underline-offset-4 hover:text-white sm:self-auto"
          >
            {demo ? "Watch 1 min demo" : "See how it works"}
            <span className="ml-1.5 inline-block text-brand no-underline" aria-hidden="true">
              &gt;
            </span>
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-2 text-[13px] text-muted sm:mt-10 sm:justify-start sm:gap-x-3 sm:gap-y-1 sm:text-[14px] md:text-[15px] desk:mt-[clamp(0.875rem,3.4svh,2.25rem)] desk:text-[clamp(12px,1.6svh,16px)]">
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
