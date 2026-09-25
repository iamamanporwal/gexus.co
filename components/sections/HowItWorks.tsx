import Image from "next/image";
import { Icon } from "@/components/icons";
import render from "@/public/images/refine-render.jpg";
import { SplitSection } from "./layout";

/*
 * The design drew the export list with three icon rows under four labels
 * (STEP, STL, GLB, Other formats). Each format now gets its own row.
 */
const formats = [
  { name: "STEP", ext: ".step" },
  { name: "STL", ext: ".stl" },
  { name: "GLB", ext: ".glb" },
];

const card = "rounded-xl border border-white/10 bg-[#0a0e13] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";

export function HowItWorks() {
  return (
    <SplitSection
      id="how-it-works"
      label="How it works"
      title={
        <>
          How
          <br />
          it works.
        </>
      }
      lede="From a simple idea to a manufacturing-ready 3D model in just 3 steps."
    >
      <ol className="grid gap-10 md:grid-cols-3 md:gap-0">
        <Step n={1} title="Describe" body="Type, sketch or upload an image.">
          <div className={`${card} p-3`}>
            <p className="min-h-[124px] rounded-lg border border-white/5 bg-white/[0.03] p-4 text-[15.5px] leading-[1.6] text-[#e3e6e9]">
              Create an aluminum bracket for a servo motor with 35mm spacing and
              3mm thickness.
              <span className="caret" aria-hidden="true" />
            </p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Input types">
              {[
                { label: "Text", I: Icon.type },
                { label: "Sketch", I: Icon.pen },
                { label: "Image", I: Icon.image },
              ].map(({ label, I }) => (
                <li
                  key={label}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-panel px-2.5 py-1.5 text-[13px] text-soft"
                >
                  <I className="h-4 w-4" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Step>

        <Step n={2} title="Refine" body="Iterate with AI. Adjust dimensions, materials, and details.">
          <div className={`${card} relative aspect-[318/224] overflow-hidden`}>
            <Image
              src={render}
              alt="A machined aluminum motor bracket with dimension callouts"
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 25vw, 100vw"
              className="object-cover"
            />
          </div>
        </Step>

        <Step n={3} title="Export" body="Download in industry standard formats.">
          <div className={`${card} p-4`}>
            <p className="text-[16px] font-semibold text-[#f0f2f4]">Export your model</p>
            <ul className="mt-3 divide-y divide-white/[0.07]">
              {formats.map((f, i) => (
                <li key={f.name} className="flex items-center gap-3 py-2.5">
                  <Icon.file className="h-5 w-5 text-soft" />
                  <span className="text-[15px] font-medium text-[#e8eaec]">{f.name}</span>
                  <span className="text-[15px] text-[#6c7178]">{f.ext}</span>
                  <span
                    className={`ml-auto flex h-8 w-8 items-center justify-center rounded-md ${
                      i === 0 ? "bg-brand text-[#06101d]" : "border border-white/10 text-brand"
                    }`}
                  >
                    <Icon.download className="h-4 w-4" />
                  </span>
                </li>
              ))}
              <li className="flex items-center gap-3 py-2.5">
                <Icon.file className="h-5 w-5 text-soft" />
                <span className="text-[15px] font-medium text-[#e8eaec]">Other formats</span>
                <Icon.chevronRight className="ml-auto h-4 w-4 text-[#6c7178]" />
              </li>
            </ul>
          </div>
        </Step>
      </ol>
    </SplitSection>
  );
}

function Step({
  n,
  title,
  body,
  children,
}: {
  n: number;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex flex-col md:border-l md:border-white/10 md:px-6 md:first:border-l-0 md:first:pl-0 md:last:pr-0 lg:px-8">
      <div className="flex gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4c98fc] text-[20px] font-bold text-[#06101d]">
          {n}
        </span>
        <div className="pt-1">
          <h3 className="text-[20px] leading-none font-semibold text-white">{title}</h3>
          <p className="mt-2.5 text-[15.5px] leading-[1.45] text-[#969b9f]">{body}</p>
        </div>
      </div>
      <div className="mt-6 md:mt-8">{children}</div>
    </li>
  );
}
