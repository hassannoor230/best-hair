/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#151310",
        secondary: "#29231D",
        accent: "#C8A66A",
        burgundy: "#8B2635",
        background: "#F7F4EF",
        surface: "#FFFFFF",
        text: "#27221C",
        muted: "#736A60",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
