import { ImageResponse } from "next/og";
import { caseCount } from "@/lib/datasetStats";

export const runtime = "edge";

export const alt =
  "Cyber Escalation Atlas. A research reference for understanding cyber operations, escalation dynamics, and governance frameworks.";

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
          padding: "64px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(45,212,168,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,168,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Radial glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(45,212,168,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Radial glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(45,212,168,0.05) 0%, transparent 70%)",
          }}
        />

        {/* Top row: accent bar + coordinate */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              width: 48,
              height: 2,
              backgroundColor: "#2DD4A8",
              borderRadius: 1,
            }}
          />
          <div
            style={{
              fontSize: 12,
              color: "#556480",
              letterSpacing: "0.12em",
              fontFamily: "monospace",
            }}
          >
            51.5074° N · 0.1278° W
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Logo mark + title */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                backgroundColor: "rgba(45,212,168,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(45,212,168,0.15)",
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 14 14"
                fill="none"
              >
                <circle
                  cx="7"
                  cy="7"
                  r="5.5"
                  stroke="#2DD4A8"
                  strokeWidth="1"
                />
                <line
                  x1="7"
                  y1="1"
                  x2="7"
                  y2="13"
                  stroke="#2DD4A8"
                  strokeWidth="0.5"
                  opacity="0.5"
                />
                <line
                  x1="1"
                  y1="7"
                  x2="13"
                  y2="7"
                  stroke="#2DD4A8"
                  strokeWidth="0.5"
                  opacity="0.5"
                />
              </svg>
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#2DD4A8",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
              }}
            >
              CEA
            </div>
          </div>

          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              fontFamily: "Georgia, serif",
            }}
          >
            Cyber Escalation
            <br />
            <span style={{ color: "#2DD4A8" }}>Atlas</span>
            <span
              style={{
                fontSize: 20,
                color: "#556480",
                fontFamily: "sans-serif",
                verticalAlign: "super",
                marginLeft: 4,
              }}
            >
              TM
            </span>
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 400,
              color: "#8493AF",
              lineHeight: 1.6,
              maxWidth: 650,
            }}
          >
            Strategic behavior, governance, and infrastructure entanglement: a
            research reference for cyber conflict analysis.
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
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                fontSize: 12,
                color: "#556480",
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
              }}
            >
              By Risa Koyanagi
            </div>
            <div
              style={{
                width: 1,
                height: 12,
                backgroundColor: "#2A3350",
              }}
            />
            <div
              style={{
                fontSize: 12,
                color: "#556480",
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
              }}
            >
              A Faultline Project
            </div>
          </div>

          {/* Stats badges */}
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { value: String(caseCount), label: "Cases" },
              { value: "4", label: "Lenses" },
              { value: "8", label: "Actors" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  borderRadius: 6,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    color: "#556480",
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.06em",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
