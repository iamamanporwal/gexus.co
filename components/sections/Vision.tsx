import Image from "next/image";
import art from "@/public/images/vision.jpg";
import { container } from "./layout";

export function Vision() {
  return (
    <section
      aria-label="Our vision"
      className="relative isolate flex min-h-[380px] items-center overflow-hidden border-t border-white/5 bg-ink py-14 lg:min-h-[300px]"
    >
      <Image
        src={art}
        alt="A GEXUS builder looking out over an industrial city skyline at sunset"
        fill
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-[72%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,10,0.92)_0%,rgba(2,6,10,0.75)_40%,rgba(2,6,10,0.1)_70%)]" />

      <div className={`${container} flex items-center justify-between gap-10`}>
        <div>
          <h2 className="font-display text-[clamp(2.6rem,4.2vw,3.6rem)] leading-[0.83] font-bold tracking-[0.005em] text-white uppercase">
            <span className="squeeze">
              <span className="text-[#a9adb3]">Anyone can</span> start
              <br />a manufacturing
              <br />
              business.
            </span>
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-[1.45] text-[#dcdfe2] md:text-[19.2px]">
            Connected workshops. Empowered makers. A more innovative world.
          </p>
        </div>

        <p
          aria-hidden="true"
          className="hidden shrink-0 -rotate-[14deg] -skew-x-[8deg] font-hand text-[28px] leading-[1.15] font-bold text-white uppercase [text-shadow:0_2px_12px_rgba(0,0,0,0.6)] md:block"
        >
          More
          <br />
          builders
          <br />a brighter
          <br />
          tomorrow.
        </p>
      </div>
    </section>
  );
}
