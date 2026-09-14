/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0D1116",
          900: "#11151A",
          800: "#1B2128",
          700: "#2A323B",
          500: "#5B6672",
        },
        stone: {
          50: "#F3F1E9",
          100: "#ECE9DF",
          200: "#DCD7C7",
          300: "#C7C1AD",
        },
        brass: {
          400: "#C9A24E",
          500: "#A9832E",
          600: "#8C6C24",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};
