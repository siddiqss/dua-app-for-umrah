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
        background: "var(--bg)",
        foreground: "var(--text)",
        accent: "var(--accent)",
        "accent-light": "var(--ring)",
        "accent-dark": "var(--accent-2)",
        muted: "var(--muted)",
        border: "var(--border)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
      },
      fontFamily: {
        arabic: ["var(--font-amiri-quran)", "Amiri Quran", "serif"],
        sans: [
          "Avenir Next",
          "Avenir",
          "Trebuchet MS",
          "Segoe UI",
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
