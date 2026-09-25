import Image from "next/image";
import builder from "@/public/images/problem-builder.jpg";
import sketch from "@/public/images/problem-sketch.jpg";

/** "Need a motor bracket by tomorrow?" Illustration, handwritten hook, sketch. */
export function Problem() {
  return (
    <section
      aria-label="The problem"
      className="grid border-t border-white/5 bg-ink md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:min-h-[338px] lg:grid-cols-[minmax(0,1.5fr)_minmax(340px,1fr)_minmax(0,0.95fr)]"
    >
      <div className="relative aspect-[715/334] md:aspect-auto md:min-h-[300px]">
        <Image
          src={builder}
          alt="A frustrated maker resting his chin on his hand while sketching a part in a busy workshop"
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 45vw, (min-width: 768px) 57vw, 100vw"
          className="object-cover object-[30%_center]"
        />
        <div className="absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-ink to-transparent md:block" />
      </div>

      <div className="flex flex-col justify-center px-5 py-12 md:px-10 lg:px-6">
        <h2 className="-rotate-[7deg] -skew-x-[12deg] font-hand text-[clamp(3rem,4.7vw,4.45rem)] leading-[0.9] font-medium tracking-[-0.02em] text-white">
          Need a motor
          <br />
          <span className="pl-3">bracket by</span>
          <br />
          <span className="pl-16">tomorrow?</span>
        </h2>
        <p className="mt-8 text-[17px] leading-[1.5] text-[#d9dde1] md:text-[18.5px]">
          Design changes. Supplier delays.
          <br />
          Time lost. Again.
        </p>
      </div>

      <div className="relative hidden lg:block">
        <Image
          src={sketch}
          alt="A hand-drawn sketch of an L-shaped motor bracket pinned to the wall"
          fill
          sizes="30vw"
          className="object-cover object-left"
        />
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent" />
      </div>
    </section>
  );
}
