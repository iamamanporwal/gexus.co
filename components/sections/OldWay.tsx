import Image, { type StaticImageData } from "next/image";
import requirement from "@/public/images/oldway-requirement.jpg";
import cadExpert from "@/public/images/oldway-cad-expert.jpg";
import software from "@/public/images/oldway-software.jpg";
import shop from "@/public/images/oldway-shop.jpg";
import { SplitSection } from "./layout";

const steps: { title: string; image: StaticImageData; alt: string }[] = [
  { title: "Requirement", image: requirement, alt: "A spiral notebook covered in rough part sketches" },
  { title: "CAD Expert", image: cadExpert, alt: "A CAD specialist modelling a bracket on a desktop monitor" },
  { title: "Complex Software", image: software, alt: "A dense legacy CAD interface full of toolbars around a bracket model" },
  { title: "Send to Shop", image: shop, alt: "A machinist working in a crowded fabrication shop" },
];

export function OldWay() {
  return (
    <SplitSection
      label="The old way"
      title={
        <>
          The old way
          <br />
          is slow.
        </>
      }
      lede={
        <>
          Multiple tools. Multiple people.
          <br />
          Days of back and forth.
        </>
      }
    >
      <ol className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {steps.map((step, i) => (
          <li key={step.title} className="overflow-hidden rounded-[10px] border border-white/15 bg-panel">
            <div className="relative aspect-[250/198]">
              <Image
                src={step.image}
                alt={step.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 20vw, 50vw"
                className="object-cover"
              />
            </div>
            <p className="flex items-baseline gap-2.5 px-4 py-4 font-hand text-[22px] leading-none text-[#f0f0f0] md:text-[26px]">
              <span className="font-medium text-[#e8e8e8]">{i + 1}</span>
              <span className="-skew-x-[10deg] font-bold">{step.title}</span>
            </p>
          </li>
        ))}
      </ol>
    </SplitSection>
  );
}
