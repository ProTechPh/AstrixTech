import { ImageResponse } from "next/og";

import { site } from "@/config/site";
import { ogLogoDataUri } from "@/components/brand/og-logo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #080D1D 0%, #10182B 60%, #0A1B3F 100%)",
          position: "relative",
        }}
      >
        {/* Orbital "A" mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 48,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- satori JSX, next/image is not available inside ImageResponse */}
          <img
            src={ogLogoDataUri}
            width={84}
            height={84}
            alt="AstrixTech mark"
          />
          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: "#F8FAFC",
              letterSpacing: "-1px",
              display: "flex",
            }}
          >
            Astrix
            <span style={{ color: "#54B7FF" }}>Tech</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#F8FAFC",
            letterSpacing: "-2px",
            lineHeight: 1.15,
            maxWidth: 960,
          }}
        >
          Building the Future Through Technology.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 28,
            color: "#94A3B8",
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    size
  );
}
