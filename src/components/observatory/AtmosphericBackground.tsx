"use client";

import { useMemo } from "react";

interface Props {
  density?: "low" | "medium" | "high";
  variant?: "default" | "command" | "uncertainty" | "cascade";
}

export function AtmosphericBackground({ density = "medium", variant = "default" }: Props) {
  const particleCount = density === "high" ? 60 : density === "medium" ? 36 : 20;

  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }).map((_, i) => {
        const seed = i * 17.31 + 7;
        const x = (Math.sin(seed) * 50 + 50) % 100;
        const y = (Math.cos(seed * 1.3) * 50 + 50) % 100;
        const size = 0.6 + ((seed * 3) % 1.4);
        const delay = (seed * 0.7) % 12;
        const duration = 8 + ((seed * 1.7) % 14);
        const opacity = 0.18 + ((seed * 0.4) % 0.4);
        return { x, y, size, delay, duration, opacity };
      }),
    [particleCount],
  );

  const accentClass =
    variant === "command"
      ? "from-atlas-400/[0.10] via-atlas-500/[0.04] to-transparent"
      : variant === "uncertainty"
        ? "from-violet/[0.08] via-amber/[0.04] to-transparent"
        : variant === "cascade"
          ? "from-plasma/[0.08] via-amber/[0.04] to-transparent"
          : "from-atlas/[0.08] via-atlas/[0.03] to-transparent";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Drift gradient base */}
      <div className="absolute inset-0 drift-bg" />

      {/* Volumetric glow */}
      <div className="absolute inset-0 vol-backdrop-deep" />

      {/* Rotating ambient compass */}
      <div className="absolute top-[-30%] right-[-20%] w-[900px] h-[900px] rounded-full ambient-compass opacity-50 blur-3xl" />
      <div className="absolute bottom-[-30%] left-[-20%] w-[700px] h-[700px] rounded-full ambient-compass opacity-30 blur-3xl" style={{ animationDirection: "reverse", animationDuration: "90s" }} />

      {/* Grid layer */}
      <div className="absolute inset-0 obs-grid opacity-40" />

      {/* Soft radial accent */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-gradient-radial ${accentClass} blur-2xl`} />

      {/* Particles */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <radialGradient id="atm-particle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(45, 212, 168, 0.9)" />
            <stop offset="55%" stopColor="rgba(45, 212, 168, 0.18)" />
            <stop offset="100%" stopColor="rgba(45, 212, 168, 0)" />
          </radialGradient>
          <radialGradient id="atm-particle-amber" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(230, 165, 92, 0.85)" />
            <stop offset="55%" stopColor="rgba(230, 165, 92, 0.18)" />
            <stop offset="100%" stopColor="rgba(230, 165, 92, 0)" />
          </radialGradient>
        </defs>
        {particles.map((p, i) => {
          const fill = i % 5 === 0 ? "url(#atm-particle-amber)" : "url(#atm-particle)";
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={p.size * 0.18}
              fill={fill}
              opacity={p.opacity}
              style={{
                animation: `softpulse ${p.duration}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          );
        })}
      </svg>

      {/* Top + bottom edge fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-900/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-900/60 to-transparent" />
    </div>
  );
}
