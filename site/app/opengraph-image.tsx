import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social share card, generated at build time.
// Light + brand blue, matching the site.
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
          padding: "72px",
          background: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: "#35b8ff",
          }}
        />

        {/* logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              fontSize: 38,
              fontWeight: 800,
              letterSpacing: -1.5,
              color: "#0a1f35",
            }}
          >
            Oscar AI
          </div>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#35b8ff",
            }}
          />
        </div>

        {/* headline — each line a single text node (satori-safe) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: -2.5,
              color: "#0a1f35",
            }}
          >
            Stop managing data.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: -2.5,
              color: "#0099d6",
            }}
          >
            Start commanding your business.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 28,
              color: "#4a6375",
              maxWidth: 940,
              lineHeight: 1.4,
            }}
          >
            The AI analyst that watches every location 24/7 — catching revenue
            leaks, labor risks, and compliance issues before they cost you.
          </div>
        </div>

        {/* stats */}
        <div style={{ display: "flex", gap: 56 }}>
          {[
            ["95%", "Less manual reporting"],
            ["24/7", "Every location watched"],
            ["Days", "To go live"],
          ].map(([v, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 38, fontWeight: 800, color: "#0a1f35" }}>
                {v}
              </div>
              <div style={{ fontSize: 21, color: "#7a95a8" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
