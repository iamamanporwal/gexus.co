import { Icon } from "@/components/icons";
import { SplitSection } from "./layout";

/*
 * The design gave each title a small chevron, implying a link to a detail page.
 * None of those pages exist yet, so the chevrons are gone rather than dead.
 */
const features = [
  { title: "AI-Assisted Design", body: "Text, sketch or image to 3D.", I: Icon.sparkle },
  { title: "Browser-Based", body: "No installation. Works on any device.", I: Icon.monitor },
  { title: "Phone Ready", body: "Design on the go.", I: Icon.phone },
  { title: "Collaboration", body: "Work with your team.", I: Icon.users },
  { title: "Manufacturing-Ready", body: "Export in standard formats.", I: Icon.cog },
  { title: "Private & Secure", body: "Your IP, your control.", I: Icon.shield },
];

export function Features() {
  return (
    <SplitSection
      id="features"
      label="Features"
      title={
        <>
          Built for
          <br />
          real builders.
        </>
      }
      lede="Everything you need to go from idea to manufacturing, in one place."
    >
      <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-14">
        {features.map(({ title, body, I }) => (
          <li key={title} className="flex gap-4 sm:flex-col sm:gap-4">
            <I className="h-9 w-9 shrink-0" />
            <div>
              <h3 className="text-[18.6px] leading-tight font-semibold text-[#f2f4f6]">{title}</h3>
              <p className="mt-2 text-[16px] leading-snug text-[#868c92]">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </SplitSection>
  );
}
