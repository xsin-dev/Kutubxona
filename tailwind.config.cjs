/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", 
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}", 
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
    },
  },
  plugins: [
    require("tw-animate-css"), // animatsiya pluginini qo‘shish
  ],
};
