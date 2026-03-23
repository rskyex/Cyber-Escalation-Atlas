import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Cyber Escalation Atlas™ — A policy-grade interactive reference for understanding cyber operations, escalation dynamics, and governance frameworks.";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0F1C",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(45,212,168,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,168,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Top accent bar */}
        <div style={{ display: "flex", width: "100%" }}>
          <div
            style={{
              width: 48,
              height: 2,
              backgroundColor: "#2DD4A8",
              borderRadius: 1,
            }}
          />
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              fontFamily: "Georgia, serif",
            }}
          >
            Cyber Escalation Atlas™
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: "#8493AF",
              lineHeight: 1.6,
              maxWidth: 700,
            }}
          >
            Strategic behavior, governance, and infrastructure entanglement
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: "#556480",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            By Risa Koyanagi
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#2DD4A8",
              }}
            />
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#F59E0B",
              }}
            />
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: "#556480",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
