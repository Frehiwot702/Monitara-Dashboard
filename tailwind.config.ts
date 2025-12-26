import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],

  theme: {
    extend: {
        fontFamily: {
            bartle: ["BBH Bartle", "sans-serif"],
            gamefont: ["Press Start 2P", "system-ui"]
        },
        colors: {
            lightGray: "#E8E8E8",
            darkGray: "#BFBFBF",
            mediumGray: '#4D4D4D',
            darkRed: "#8C1C13",
            lightRed: '#FF0000',
            blue: "#0A122A",
            yellow: "#FFE600",
            green: '#6F7B57',
            gray: '#F2F0E4'
        },
    },
  },
  plugins: [],
};

export default config;
