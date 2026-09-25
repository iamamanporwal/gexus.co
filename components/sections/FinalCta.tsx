import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { links } from "@/lib/site";
import art from "@/public/images/cta.jpg";
import { container } from "./layout";

export function FinalCta() {
  return (
    <section
      aria-label="Get started"
      className="relative isolate overflow-hidden border-t border-white/5 bg-ink py-16 md:py-20"
    >
      <Image src={art} alt="" fill placeholder="blur" sizes="100vw" className="-z-10 object-cover" />
      <div
        className={`${container} flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:px-[max(3.5rem,calc((100%-1080px)/2))]`}
      >
        <div>
          <h2 className="text-[clamp(2.1rem,3.4vw,2.8rem)] leading-[1.1] font-bold tracking-[-0.01em] text-white">
            Your next part
            <br />
            is 3 clicks away.
          </h2>
          <p className="mt-4 max-w-xl text-[17px] leading-[1.5] text-[#d3d7db] md:text-[19.5px]">
            Join hundreds of engineers, makers and small manufacturers already
            building with GEXUS.
          </p>
        </div>
        <div className="flex w-full max-w-[312px] shrink-0 flex-col gap-3">
          <ButtonLink href={links.app} className="h-[64px] w-full text-[20px] font-bold md:h-[70px]">
            Try GEXUS Free
          </ButtonLink>
          <p className="text-center text-[16px] text-[#8c949e]">No credit card required.</p>
        </div>
      </div>
    </section>
  );
}
