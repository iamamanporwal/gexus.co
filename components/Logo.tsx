/** The GEXUS wordmark: Michroma, with the X cut by a diagonal brand stripe. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-logo inline-block leading-none tracking-[1px] text-white [-webkit-text-stroke:1.2px_#ffffff] ${className}`}
    >
      GE<span className="logo-x">X</span>US
    </span>
  );
}
