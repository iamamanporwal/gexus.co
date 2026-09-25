import Image, { type StaticImageData } from "next/image";
import bracket from "@/public/images/make-bracket.jpg";
import enclosure from "@/public/images/make-enclosure.jpg";
import chassis from "@/public/images/make-chassis.jpg";
import robot from "@/public/images/make-robot.jpg";
import { SplitSection } from "./layout";

const items: { title: string; body: string; image: StaticImageData; alt: string }[] = [
  { title: "Brackets", body: "Mounts & Fixings", image: bracket, alt: "An L-shaped aluminum mounting bracket" },
  { title: "Enclosures", body: "Electronics & Control", image: enclosure, alt: "A rectangular electronics enclosure" },
  { title: "Chassis", body: "Robots & Machinery", image: chassis, alt: "A machined robot chassis frame" },
  { title: "Complete Robots", body: "From parts to products", image: robot, alt: "A four-wheeled robot rover assembled from custom parts" },
];

export function UseCases() {
  return (
    <SplitSection
      id="use-cases"
      label="What you make"
      title={
        <>
          What
          <br />
          you make.
        </>
      }
      lede="From individual parts to complete machines."
    >
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {items.map((item) => (
          <li
            key={item.title}
            className="group overflow-hidden rounded-xl border border-white/10 bg-[#07090c] transition-colors hover:border-brand/50"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 20vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="px-4 pt-2 pb-5">
              <h3 className="text-[17px] leading-tight font-bold text-white md:text-[20.5px]">{item.title}</h3>
              <p className="mt-1.5 text-[14px] text-soft md:text-[16px]">{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </SplitSection>
  );
}
