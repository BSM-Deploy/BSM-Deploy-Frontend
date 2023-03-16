/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: "jit",
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#61CDFE",
        accentBlue: "#1188BB",
        darkGray: "#282828",
        lightGray: "#858585",
        lightBack: "#FAFAFA",
        lightBackground: "#F3F3F3",
        lighterGray: "#CDCDCD",
        text: "#202124",
        textLightGray: "#E8EAED",
        textDarkGray: "#A8AAAD",
        lightHover: "#BEBEBE",
        darkHover: "#535455",
        lightHover: "#C2C2C2",
        modalBackground: "#242528",
        modalBlack: "#303134",
        sidebarLightText: "#606164",
        itemGray: "#303030",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      transitionDuration: {
        250: "250ms",
      },
      width: {
        100: "25rem",
      },
    },
  },
  plugins: [],
};
