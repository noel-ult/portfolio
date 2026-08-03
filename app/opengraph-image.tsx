import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Noel Biju — Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#09090B",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(59, 130, 246, 0.18), transparent 45%), radial-gradient(circle at 85% 80%, rgba(37, 99, 235, 0.12), transparent 45%)",
          padding: "80px",
          fontFamily: "sans-serif",
          color: "#FFFFFF",
        }}
      >
        {/* Top Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 18px",
            borderRadius: "9999px",
            backgroundColor: "rgba(39, 39, 42, 0.8)",
            border: "1px solid rgba(63, 63, 70, 0.8)",
            fontSize: "20px",
            fontWeight: 500,
            color: "#3B82F6",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#22C55E",
            }}
          />
          <span>Portfolio & Engineering Work</span>
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "80px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            NOEL BIJU
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 500,
              color: "#A1A1AA",
              letterSpacing: "-0.01em",
            }}
          >
            Software Engineer
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #27272A",
            paddingTop: "32px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: "#3B82F6",
              letterSpacing: "0.02em",
            }}
          >
            noelbiju.in
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#71717A",
            }}
          >
            AI • Full Stack • Cloud • Security
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
