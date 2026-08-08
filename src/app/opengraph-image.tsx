import { ImageResponse } from "next/og";

export const alt = "Stiamond — AI, Software & Cloud Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #06479a 0%, #041e4a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                background: "#f42010",
                transform: "rotate(45deg)",
              }}
            />
          </div>
          <span style={{ color: "white", fontSize: 32, fontWeight: 700 }}>Stiamond</span>
        </div>
        <h1 style={{ color: "white", fontSize: 56, fontWeight: 700, textAlign: "center", maxWidth: 800, lineHeight: 1.2 }}>
          AI, Software & Cloud Engineering
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 24, marginTop: 24 }}>
          Building the next generation of intelligent software
        </p>
      </div>
    ),
    size
  );
}
