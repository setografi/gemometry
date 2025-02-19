/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {},
      keyframes: {
        twinkle: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.3",
          },
        },
      },
      animation: {
        twinkle: "twinkle 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
