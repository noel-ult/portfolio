import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 15,
          background: "#09090B",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#3B82F6",
          borderRadius: "8px",
          border: "1px solid #27272A",
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
