import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { links, nav } from "@/lib/site";

/**
 * Fixed header. The mobile menu is a <details> element, so the whole page
 * ships without client-side JavaScript.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-10 px-5 md:px-10 lg:px-14">
        <a href="#top" aria-label="Gexus home" className="shrink-0">
          <Logo className="text-[22px] md:text-[24px]" />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[15px] font-medium text-[#c3c6c9] transition-colors hover:text-white"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-3 sm:flex">
          <ButtonLink href={links.signIn} variant="ghost" arrow={false} className="h-9 px-5 text-[15px] font-medium">
            Sign in
          </ButtonLink>
          <ButtonLink href={links.app} variant="light" className="h-10 px-5 text-[14.5px]">
            Get started free
          </ButtonLink>
        </div>

        <details className="menu relative ml-auto sm:ml-0 lg:hidden">
          <summary
            aria-label="Open menu"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-line text-white"
          >
            <Icon.menu />
          </summary>
          <div className="absolute right-0 mt-3 w-64 rounded-xl border border-line bg-panel p-3 shadow-2xl">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-[#c3c6c9] hover:bg-white/5 hover:text-white"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-2 grid gap-2 border-t border-line pt-3 sm:hidden">
              <ButtonLink href={links.signIn} variant="ghost" arrow={false} className="h-10 border border-line text-[15px]">
                Sign in
              </ButtonLink>
              <ButtonLink href={links.app} variant="light" className="h-10 text-[14.5px]">
                Get started free
              </ButtonLink>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
