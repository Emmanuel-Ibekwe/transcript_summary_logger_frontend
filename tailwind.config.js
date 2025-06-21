/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ Required to scan your React files
  ],
  theme: {
    extend: {
      fontFamily: {
        robotoSlab: ['"Roboto Slab"', "serif"],
        worksans: ["Work Sans", "sans-serif"],
      },
      colors: {
        "custom-brown": "#8b6d5c",
      },
    },
  },
  plugins: [],
};
