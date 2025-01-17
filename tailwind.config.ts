import type { Config } from "tailwindcss";

import { PluginCreator } from "tailwindcss/types/config";

const utilsPlugin: PluginCreator = ({ addUtilities }) =>
  addUtilities({
    ".scrollbar-hide": {
      "-ms-overflow-style": "none" /* IE and Edge */,
      "scrollbar-width": "none" /* Firefox */,
      "&::-webkit-scrollbar": {
        display: "none" /* Safari and Chrome */,
      },
    },
  });

const config: Config = {
  safelist: ["text-grayscale-500", "text-blue-600", "text-warning-100"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        changeColor: {
          "0%": {
            backgroundColor: "#18254C",
          },
          "50%": {
            backgroundColor: "#C0C8D9",
          },
          "100%": {
            backgroundColor: "#C0C8D9",
          },
        },
        whiteChangeColor: {
          "0%": {
            backgroundColor: "#FFFFFF",
          },
          "50%": {
            backgroundColor: "#FFFFFF59",
          },
          "100%": {
            backgroundColor: "#FFFFFF59",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        navy: {
          50: "#e6e9ef",
          100: "#c0c8d9",
          200: "#98a5bf",
          300: "#7282a5",
          400: "#546894",
          500: "#364f84",
          600: "#30487c",
          700: "#283e70",
          800: "#213564",
          900: "#18254c",
        },
        blue: {
          50: "#e1f5fd",
          100: "#b2e6fa",
          200: "#80d5f7",
          300: "#4cc5f4",
          400: "#1cb8f3",
          500: "#00acf2",
          600: "#009ee3",
          700: "#008bd0",
          800: "#0079bc",
          900: "#005a9b",
        },
        grayscale: {
          0: "#ffffff",
          100: "#f5f5f5",
          200: "#e9e9e9",
          300: "#c5c5c5",
          400: "#9f9f9f",
          500: "#7D7D7D",
          600: "#575757",
          700: "#454545",
          800: "#282828",
          900: "#121212",
        },
        background: {
          100: "#f1f3f8",
        },
        warning: {
          100: "#ff294f",
        },
        success: {
          100: "#1fce65",
        },
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      //스크롤바 숨기기
      scrollbar: ["hidden"],
    },
  },
  plugins: [utilsPlugin],
};
export default config;
