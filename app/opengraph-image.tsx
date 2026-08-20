import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * The share card for every link to the site.
 *
 * Generated rather than authored, so it needs no image asset and can never
 * drift from `lib/site.ts`. It is deliberately typographic: once a real
 * wordmark exists, drop it in beside the name here.
 *
 * Satori renders this, not a browser, so the CSS subset is narrow: flexbox
 * only, no grid, and every element with more than one child needs an explicit
 * display.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0E11",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 12, height: 12, background: "#4FB3CC" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#8A97A3",
            }}
          >
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 108,
              fontWeight: 700,
              letterSpacing: -3,
              color: "#F2F5F7",
              lineHeight: 1.05,
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              color: "#B4C0CB",
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            Industrial design, visualization, prototyping and hardware UX — in
            your browser.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 3, background: "#4FB3CC" }} />
          <div style={{ fontSize: 26, color: "#8A97A3" }}>gexus.co</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
