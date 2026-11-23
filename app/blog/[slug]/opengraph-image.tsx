import { ImageResponse } from "next/og";
import { formatPostDate } from "../../lib/date";
import { getPostData } from "../../lib/posts";
import { siteConfig } from "../../lib/site";

export const alt = "Yash Bhalchandra — writing";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type ImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const post = getPostData(slug);

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
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
          {formatPostDate(post.date)} · Writing
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "980px",
        }}
      >
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#1e293b",
            letterSpacing: "-0.02em",
          }}
        >
          {post.title}
        </div>
        <div style={{ fontSize: 30, lineHeight: 1.4, color: "#475569" }}>
          {post.description}
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
        <span style={{ fontSize: 22, fontWeight: 600, color: "#334155" }}>
          {new URL(siteConfig.url).host}
        </span>
        <span style={{ fontSize: 22, color: "#64748b" }}>
          {siteConfig.name}
        </span>
      </div>
    </div>,
    { ...size },
  );
}
