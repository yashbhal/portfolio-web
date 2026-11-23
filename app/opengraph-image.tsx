import { ImageResponse } from "next/og";
import { siteConfig } from "./lib/site";

export const alt = "Yash Bhalchandra | Forward Deployed Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 84px",
        backgroundColor: "#fafaf9",
        color: "#334155",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "9999px",
            backgroundColor: "#0ea5e9",
          }}
        />
        <span
          style={{
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#64748b",
          }}
        >
          Currently · Forward Deployed @ Ancera
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "960px",
        }}
      >
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.08,
            color: "#1e293b",
            letterSpacing: "-0.02em",
          }}
        >
          Yash Bhalchandra
        </div>
        <div
          style={{
            fontSize: 32,
            lineHeight: 1.4,
            color: "#475569",
          }}
        >
          Working on hard problems and building things that spark excitement for
          the people who use them.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "28px",
          borderTop: "1.5px solid rgba(51, 65, 85, 0.12)",
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "#334155",
          }}
        >
          {new URL(siteConfig.url).host}
        </span>
        <div style={{ display: "flex", gap: "8px" }}>
          {[1, 0.3, 0.3, 0.3, 0.3, 0.3].map((opacity, i) => (
            <div
              key={i}
              style={{
                width: "44px",
                height: "6px",
                borderRadius: "9999px",
                backgroundColor: opacity === 1 ? "#0ea5e9" : "#cbd5e1",
              }}
            />
          ))}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
