import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0b1120 0%, #111827 100%)",
          color: "#e5e7eb",
          padding: 48,
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "inline-flex",
              padding: "6px 12px",
              borderRadius: 9999,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              fontSize: 20,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Analyse indépendante
          </div>
          <h1 style={{ fontSize: 64, lineHeight: 1.1, margin: 0, color: "#fff" }}>
            E-billets Loro.ch : Anomalies statistiques détectées
          </h1>
          <p style={{ fontSize: 28, color: "#cbd5e1", margin: 0 }}>
            Trois tests (p &lt; 0.01) • Baisse de 30% après un gain • RTP 66.14%
          </p>
        </div>
        <div style={{ fontSize: 20, color: "#94a3b8" }}>
          loro.vercel.app
        </div>
      </div>
    ),
    size
  );
}


