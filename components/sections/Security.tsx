import Image from "next/image";
import { Icon } from "@/components/icons";
import builder from "@/public/images/security-builder.jpg";
import part from "@/public/images/security-part.jpg";

const promises = [
  { label: "End-to-end encryption", Icon: Icon.lock },
  { label: "Your data stays yours", Icon: Icon.key },
  { label: "Private workspaces", Icon: Icon.folder },
  { label: "Enterprise ready", Icon: Icon.building },
];

export function Security() {
  return (
    <section
      id="security"
      aria-label="Security"
      className="grid items-center overflow-hidden border-t border-white/5 bg-ink md:grid-cols-2 xl:min-h-[384px] xl:grid-cols-[minmax(0,1fr)_minmax(340px,1.05fr)_minmax(0,0.95fr)_minmax(240px,0.6fr)]"
    >
      <div className="relative hidden h-full min-h-[384px] xl:block">
        <Image
          src={builder}
          alt="Close-up of a determined young engineer glancing over his shoulder"
          fill
          placeholder="blur"
          sizes="30vw"
          className="object-cover object-left"
        />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink to-transparent" />
      </div>

      <div className="px-5 pt-16 md:px-10 md:pb-14 xl:px-6 xl:py-16">
        <h2 className="origin-left -rotate-[9deg] -skew-x-[8deg] font-hand text-[clamp(2.6rem,3.9vw,3.6rem)] leading-[0.92] font-semibold text-white uppercase">
          Your designs
          <br />
          are IP.
          <br />
          Keep them safe.
        </h2>
        <p className="mt-9 max-w-sm text-[17px] leading-[1.6] text-[#d7dbe0] md:text-[18.8px]">
          Your ideas, your advantage. GEXUS is built with privacy, security and
          your IP in mind.
        </p>
      </div>

      <div className="relative mx-5 aspect-[432/315] md:mx-0 md:mr-10 xl:mr-0">
        <Image
          src={part}
          alt="A translucent blueprint render of a motor bracket protected by a padlock icon"
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 28vw, (min-width: 768px) 50vw, 100vw"
          className="object-contain"
        />
      </div>

      <ul className="grid grid-cols-2 gap-x-6 gap-y-5 px-5 pt-6 pb-14 md:col-span-2 md:grid-cols-4 md:px-10 xl:col-span-1 xl:grid-cols-1 xl:gap-0 xl:py-10 xl:pr-14 xl:pl-0">
        {promises.map(({ label, Icon: PromiseIcon }) => (
          <li
            key={label}
            className="flex items-center gap-4 xl:border-b xl:border-white/10 xl:py-4 xl:last:border-b-0"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-panel">
              <PromiseIcon />
            </span>
            <span className="text-[15.2px] text-[#c3c9ce]">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
