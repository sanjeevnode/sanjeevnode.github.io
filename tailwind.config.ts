import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#000000",
          dark: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-raleway)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
