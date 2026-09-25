import { Logo } from "@/components/Logo";
import { links, nav, site, social } from "@/lib/site";

/** Not in the design; added so the page ends with navigation and legal lines. */
export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-ink">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-6 gap-y-10 px-5 py-12 sm:grid-cols-3 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-10 md:py-14 lg:px-14">
        <div className="col-span-2 sm:col-span-3 md:col-span-1">
          <Logo className="text-[22px]" />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted">
            AI-assisted CAD for real builders. Text, sketch or image to
            manufacturing-ready 3D models, in your browser.
          </p>
        </div>

        <FooterColumn title="Product" items={nav.map((n) => ({ name: n.name, href: n.href }))} />
        <FooterColumn
          title="Get started"
          items={[
            { name: "Try Gexus free", href: links.app },
            { name: "Sign in", href: links.signIn },
          ]}
        />
        <FooterColumn title="Company" items={social.map((s) => ({ name: s.name, href: s.href }))} external />
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-6 text-[13px] text-muted md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>AI CAD · Text to CAD · Sketch to CAD · Image to 3D</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
  external = false,
}: {
  title: string;
  items: { name: string; href: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <h2 className="text-[13px] font-semibold tracking-[0.12em] text-white uppercase">{title}</h2>
      <ul className="mt-3 space-y-1">
        {items.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-block py-1.5 text-[15px] text-soft transition-colors hover:text-white"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
