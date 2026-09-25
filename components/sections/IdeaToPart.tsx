import Image from "next/image";
import art from "@/public/images/idea-to-part.jpg";

/** Full-bleed comic panel with the brush-lettered promise over its light middle. */
export function IdeaToPart() {
  return (
    <section
      aria-label="Idea to part"
      className="relative isolate flex h-[clamp(300px,26vw,382px)] items-center justify-center overflow-hidden border-t border-white/5 bg-[#e9eef3]"
    >
      <Image
        src={art}
        alt="A GEXUS builder watching a finished robot rover drive toward him"
        fill
        placeholder="blur"
        sizes="100vw"
        className="-z-10 object-cover object-[42%_center] md:object-[45%_center]"
      />
      <div className="relative">
        <h2 className="-rotate-[12deg] -skew-x-[18deg] font-brush text-[clamp(3rem,6vw,5.6rem)] leading-[0.88] text-[#0b0b0c] [text-shadow:0_0_18px_rgba(255,255,255,0.9),0_0_36px_rgba(255,255,255,0.6)]">
          Idea
          <br />
          <span className="pl-[0.4em]">to part</span>
          <br />
          in minutes.
        </h2>
        <svg
          viewBox="0 0 220 62"
          className="absolute -bottom-[18%] left-[10%] h-auto w-[60%]"
          aria-hidden="true"
        >
          <path d="M2 57 C 70 40, 140 20, 214 0 C 150 24, 80 44, 6 60 Z" fill="#141414" />
        </svg>
      </div>
    </section>
  );
}
