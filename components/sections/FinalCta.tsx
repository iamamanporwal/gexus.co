import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { links } from "@/lib/site";
import art from "@/public/images/cta.jpg";
import { container } from "./layout";

export function FinalCta() {
  return (
    <section
      id="get-started"
      aria-label="Get started"
      className="relative isolate overflow-hidden border-t border-white/5 bg-ink py-14 md:py-16 lg:py-20"
    >
      <Image src={art} alt="" fill placeholder="blur" sizes="100vw" className="-z-20 object-cover" />
      {/* The art's metal parts sit on its left edge, right under the copy on laptops. */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,10,0.85)_0%,rgba(2,6,10,0.55)_35%,rgba(2,6,10,0)_60%)]" />

      <div className={`${container} flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-10`}>
        <div>
          <h2 className="section-title">
            <span className="squeeze">
              Your next part
              <br />
              is <span className="text-brand">3 clicks</span> away.
            </span>
          </h2>
          <p className="section-lede mt-4 max-w-md md:mt-5">
            Join hundreds of engineers, makers and small manufacturers already
            building with GEXUS.
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-stretch gap-3 sm:items-start md:items-center">
          <ButtonLink href={links.app} className="h-14 px-9 text-[17px] sm:h-[60px] sm:text-[18.5px]">
            Try GEXUS Free
          </ButtonLink>
          <p className="text-center text-[15px] text-[#8c949e]">No credit card required.</p>
        </div>
      </div>
    </section>
  );
}
