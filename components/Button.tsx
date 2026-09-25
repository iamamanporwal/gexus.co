import type { ReactNode } from "react";
import { ArrowRight } from "@/components/icons";

type Variant = "primary" | "light" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-brand-strong text-[#08111e] hover:bg-[#6aa9fc] shadow-[0_8px_30px_-8px_rgba(79,153,251,0.55)]",
  light:
    "bg-[#f4f6f8] text-[#0c0f14] hover:bg-white shadow-[0_2px_10px_rgba(0,0,0,0.35)]",
  ghost: "bg-[rgba(4,7,11,0.82)] text-[#e6e8ea] hover:bg-white/10",
};

/**
 * Every call to action on the page is an outbound link to the app, so this is
 * an anchor, never a <button>.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-colors duration-200 ${styles[variant]} ${className}`}
    >
      {children}
      {arrow && <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />}
    </a>
  );
}
