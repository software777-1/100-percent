import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        SchoolSky: "#C3EBFA",
        SchoolSkyLight: "#EDF9FD",
        SchoolPurple: "#CFCEFF",
        SchoolPurpleLight: "#F1F0FF",
        SchoolYellow: "#FAE27C",
        SchoolYellowLight: "#FEFCE8",
        customDark: "#202020",
        customPurple: "#BB86FC",
        customDarkPurple: "#3700b3",
        customGray: "#6B7280",
        customLightDark: "#4A4A4A",
        customGreen: "#03dac6",
        customLightGray: "#D3D3D3",
        customWhite: "#ffffff",
        customPink: "#E0BBE4",
        customMint: "#A7FFEB",
      },
    },
  },
  plugins: [],
};
export default config;
