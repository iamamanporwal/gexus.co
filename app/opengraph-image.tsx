import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: AI-assisted CAD. 3D CAD in 3 clicks.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card reuses the hero product shot, so links posted anywhere look like
 * the page they open. Rendered once at build time. The background is pure
 * black, not the page ink, to match the render so its edges never show.
 */
export default async function OpengraphImage() {
  const hero = await readFile(join(process.cwd(), "public/images/hero-mobile.jpg"));
  const heroSrc = `data:image/jpeg;base64,${hero.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#000000" }}>
        <img
          src={heroSrc}
          alt=""
          width={720}
          height={400}
          style={{ position: "absolute", right: 0, top: 150, width: 720, height: 400 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(90deg, #000000 0%, #000000 42%, rgba(0,0,0,0) 56%), linear-gradient(180deg, #000000 0%, #000000 24%, rgba(0,0,0,0) 34%, rgba(0,0,0,0) 76%, #000000 88%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", padding: "72px 64px", justifyContent: "space-between", height: "100%" }}>
          <div style={{ display: "flex", fontSize: 34, letterSpacing: 4, color: "#ffffff", fontWeight: 700 }}>
            GE<span style={{ color: "#4a94fb" }}>X</span>US
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, letterSpacing: 3, color: "#4d9ae0", marginBottom: 18 }}>
              AI-ASSISTED CAD FOR REAL BUILDERS
            </div>
            <div style={{ fontSize: 92, fontWeight: 800, color: "#ffffff", lineHeight: 0.95, letterSpacing: -2 }}>3D CAD IN</div>
            <div style={{ fontSize: 100, fontWeight: 800, color: "#4595fd", lineHeight: 0.95, letterSpacing: -2 }}>3 CLICKS.</div>
            <div style={{ fontSize: 26, color: "#d6dbde", marginTop: 24, maxWidth: 480, lineHeight: 1.35 }}>
              Text, sketch or image to manufacturing-ready 3D models.
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#888d91" }}>gexus.co</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
