/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#B3B3B3",
          200: "#8C8C8C",
          300: "#737373",
          400: "#595959",
          500: "#404040",
          600: "#2E2E2E",
          700: "#1F1F1F",
          800: "#191919",
          900: "#121212", // Warna dasar
        },
        accent: {
          blue: "#4D4DFF",
          bluetwo: "#5C5CB6",
        },
        neutral: {
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        pixelifysans: ["Pixelify Sans", "serif"],
      },
    },
  },
  plugins: [],
};
