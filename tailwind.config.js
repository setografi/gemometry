/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Light Mode
        light: {
          // Main background colors
          background: {
            primary: "#FFFFFF", // Main background
            secondary: "#F8F9FA", // Secondary background
            tertiary: "#F3F4F6", // Tertiary background
          },
          // Text colors
          text: {
            primary: "#1A1A1A", // Main text
            secondary: "#4A4A4A", // Secondary text
            tertiary: "#717171", // Tertiary/disabled text
          },
          // Border & Divider
          border: {
            light: "#E5E7EB",
            medium: "#D1D5DB",
          },
        },

        // Primary Colors - Dark Mode
        dark: {
          // Main background colors
          background: {
            primary: "#121212", // Main background
            secondary: "#1E1E1E", // Secondary background
            tertiary: "#2D2D2D", // Tertiary background
          },
          // Text colors
          text: {
            primary: "#FFFFFF", // Main text
            secondary: "#E0E0E0", // Secondary text
            tertiary: "#A0A0A0", // Tertiary/disabled text
          },
          // Border & Divider
          border: {
            light: "#404040",
            medium: "#525252",
          },
        },

        // Accent Colors (Original with adjustments for better contrast)
        accent: {
          // Magenta (keeping original primary as requested)
          magenta: {
            600: "#F06292", // Original primary - unchanged
            500: "#D95780", // Adjusted for better contrast
            400: "#C44E71", // Adjusted for better contrast
          },
          // Cyan (adjusted for better contrast and accessibility)
          cyan: {
            600: "#00B8D4", // Adjusted primary
            500: "#0099B3", // Adjusted for better contrast
            400: "#007A8F", // Adjusted for better contrast
          },
          // Yellow (adjusted for better contrast and accessibility)
          yellow: {
            600: "#FFD600", // Adjusted for better visibility
            500: "#FFC400", // Adjusted for better contrast
            400: "#FFB300", // Adjusted for better contrast
          },
        },
      },
    },
  },
  plugins: [],
};
