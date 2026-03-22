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
        navy: {
          DEFAULT: "#1B2A4A",
          50: "#E8EBF0",
          100: "#D1D7E1",
          200: "#A3AFC3",
          300: "#7587A5",
          400: "#485F87",
          500: "#1B2A4A",
          600: "#16223C",
          700: "#111A2E",
          800: "#0C1220",
          900: "#070A12",
        },
        slate: {
          DEFAULT: "#475569",
        },
        offwhite: "#F1F5F9",
        teal: {
          DEFAULT: "#0D7377",
          50: "#E6F5F5",
          100: "#CCEAEB",
          200: "#99D5D7",
          300: "#66C0C3",
          400: "#33ABAF",
          500: "#0D7377",
          600: "#0A5C5F",
          700: "#084547",
          800: "#052E2F",
          900: "#031717",
        },
        amber: {
          DEFAULT: "#D97706",
          50: "#FEF6E6",
          100: "#FDEDCC",
          200: "#FBDB99",
          300: "#F9C966",
          400: "#F7B733",
          500: "#D97706",
          600: "#AE5F05",
          700: "#824704",
          800: "#573003",
          900: "#2B1801",
        },
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
