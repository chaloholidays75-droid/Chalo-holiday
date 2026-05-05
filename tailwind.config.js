/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#D32F2F",
          "red-light": "#EF5350",
          "red-dark": "#B71C1C",
          gold: "#C9A84C",
          "gold-light": "#E8C96E",
          grey: "#455A64",
          "grey-light": "#78909C",
          "grey-dark": "#263238",
          cream: "#FDF8F0",
        },
      },
      fontFamily: {
        heading: ['"Montserrat"', "sans-serif"],
        body: ['"Poppins"', "sans-serif"],
      },
    },
  },
  plugins: [],
};