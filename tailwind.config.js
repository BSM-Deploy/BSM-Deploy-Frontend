/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#61CDFE",
        darkGray: "#282828",
        lightGray: "#858585",
        textLightGray: "#E8EAED",
        textDartGray: "#A8AAAD",
        grayHover: "#535455",
      },
    },
  },
  plugins: [],
};
