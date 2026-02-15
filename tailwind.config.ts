import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "#1B5E20",
        "accent-light": "#2E7D32",
        "accent-dark": "#0D3B0F",
        muted: "#6B7280",
        border: "#E5E7EB",
      },
      fontFamily: {
        arabic: ["var(--font-amiri-quran)", "Amiri Quran", "serif"],
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        "arabic-sm": ["20px", { lineHeight: "1.8" }],
        "arabic-base": ["24px", { lineHeight: "1.8" }],
        "arabic-lg": ["28px", { lineHeight: "1.8" }],
        "arabic-xl": ["32px", { lineHeight: "1.8" }],
        "arabic-2xl": ["36px", { lineHeight: "1.8" }],
      },
      spacing: {
        nav: "25vh",
      },
      minHeight: {
        "touch-target": "56px",
      },
    },
  },
  plugins: [],
};
export default config;
