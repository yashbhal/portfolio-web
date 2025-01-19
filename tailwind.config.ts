import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui"],
        heading: ["var(--font-montserrat)", "system-ui"],
        display: ["var(--font-space-grotesk)", "system-ui"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#334155", // Softer slate for primary actions
          "primary-content": "#ffffff",
          "base-100": "#fafaf9", // Warm off-white background
          "base-200": "#f5f5f4", // Slightly darker warm gray
          "base-300": "#e7e5e4", // Even darker warm gray
          "base-content": "#334155", // Slate for text (easier on eyes)
        },
      },
    ],
  },
};

export default config;
