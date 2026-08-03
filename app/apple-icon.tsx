import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 88,
          background: "#09090B",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#3B82F6",
          borderRadius: "36px",
          border: "2px solid #27272A",
          fontWeight: 800,
          fontFamily: "sans-serif",
          letterSpacing: "-0.05em",
        }}
      >
        NB
      </div>
    ),
    {
      ...size,
    }
  );
}
