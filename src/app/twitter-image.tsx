import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Cyber Escalation Atlas™ — A policy-grade interactive reference for understanding cyber operations, escalation dynamics, and governance frameworks.";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#1B2A4A",
          padding: "72px 80px",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          <div
            style={{
              width: 64,
              height: 4,
              backgroundColor: "#0D7377",
              borderRadius: 2,
            }}
          />
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#F1F5F9",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            Cyber Escalation Atlas™
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: "#94A3B8",
              lineHeight: 1.5,
              maxWidth: 800,
            }}
          >
            Strategic behavior, governance, and infrastructure entanglement
          </div>
        </div>

        {/* Bottom row: attribution + decorative element */}
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
              fontSize: 16,
              color: "#64748B",
              letterSpacing: "0.04em",
            }}
          >
            By Risa Koyanagi
          </div>
          <div
            style={{
              display: "flex",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#0D7377",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#D97706",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#475569",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
