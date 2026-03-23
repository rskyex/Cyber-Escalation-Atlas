import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Deep ink palette — strategic, high-trust
        ink: {
          DEFAULT: "#0A0F1C",
          50: "#E8EAF0",
          100: "#C4C8D6",
          200: "#8E95AE",
          300: "#5E6785",
          400: "#353D5C",
          500: "#1A2038",
          600: "#141929",
          700: "#0F1222",
          800: "#0A0F1C",
          900: "#060914",
          950: "#030510",
        },
        // Muted steel for secondary text
        steel: {
          DEFAULT: "#8493AF",
          100: "#D4DAE5",
          200: "#B8C1D4",
          300: "#9CAAC2",
          400: "#8493AF",
          500: "#6B7C9B",
          600: "#556480",
          700: "#404D64",
          800: "#2C3648",
        },
        // Restrained teal accent — authority + intelligence
        atlas: {
          DEFAULT: "#2DD4A8",
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#2DD4A8",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
        // Warm amber for warnings/destructive
        signal: {
          DEFAULT: "#F59E0B",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
        },
        // Crimson for critical/destructive operations
        threat: {
          DEFAULT: "#EF4444",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
        },
        // Surface colors for layered depth
        surface: {
          DEFAULT: "#111827",
          raised: "#1F2937",
          overlay: "#1A2332",
        },
      },
      fontFamily: {
        display: [
          "Georgia",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display": ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "heading": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "subheading": ["1.25rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body": ["0.9375rem", { lineHeight: "1.7" }],
        "caption": ["0.8125rem", { lineHeight: "1.5" }],
        "micro": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.05em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
      },
      maxWidth: {
        "content": "72rem",
        "prose": "42rem",
        "narrow": "36rem",
      },
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        "glow-sm": "0 0 20px -5px rgba(45, 212, 168, 0.15)",
        "glow": "0 0 40px -10px rgba(45, 212, 168, 0.2)",
        "glow-lg": "0 0 60px -15px rgba(45, 212, 168, 0.25)",
        "depth": "0 1px 3px rgba(0,0,0,0.3), 0 8px 24px -8px rgba(0,0,0,0.4)",
        "depth-lg": "0 2px 8px rgba(0,0,0,0.3), 0 16px 48px -12px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-up": "fadeUp 0.6s ease-out",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
