import type { ReactNode } from "react";

/** Page gutter shared by every section. */
export const container = "mx-auto w-full max-w-[1400px] px-5 md:px-10 lg:px-14";

/**
 * The design's recurring layout: a condensed uppercase title and a short lede
 * in a left column, with the section's content to the right.
 */
export function SplitSection({
  id,
  label,
  title,
  lede,
  children,
  className = "",
  asideClassName = "",
}: {
  id?: string;
  label: string;
  title: ReactNode;
  lede: ReactNode;
  children: ReactNode;
  className?: string;
  asideClassName?: string;
}) {
  return (
    <section id={id} aria-label={label} className={`border-t border-white/5 bg-ink py-14 md:py-16 lg:py-20 ${className}`}>
      {/*
        The title column only splits off at xl. Below that it would eat a third
        of a tablet or small laptop and crush the content next to it, so the
        title stacks on top and the content gets the full width.
      */}
      <div className={`${container} grid gap-8 md:gap-10 xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-14 2xl:grid-cols-[330px_minmax(0,1fr)]`}>
        <div className={`md:flex md:items-end md:justify-between md:gap-10 xl:block ${asideClassName}`}>
          <h2 className="section-title">
            <span className="squeeze">{title}</span>
          </h2>
          <p className="section-lede mt-4 max-w-sm md:mt-0 md:pb-1 xl:mt-5 xl:pb-0">{lede}</p>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
