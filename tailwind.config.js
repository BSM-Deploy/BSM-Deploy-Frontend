/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
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
        textDarkGray: "#A8AAAD",
        grayHover: "#535455",
        modalBackground: "#242528",
        modalBlack: "#303134",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      transitionDuration: {
        250: "250ms",
      },
    },
  },
  plugins: [],
};
