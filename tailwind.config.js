/** @type {import('tailwindcss').Config} */
module.exports = {
  // mode: "jit",
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1240px",
    },
    extend: {
      keyframes: {
        clickAnimation: {
          "0%": { transform: "scale(1.0)" },
          "50%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1.0)" },
        },
        down: {
          from: { transform: "translateY(-30px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        up: {
          from: { transform: "translateY(0)", opacity: "1" },
          to: { transform: "translateY(-30px)", opacity: "0" },
        },
      },
      animation: {
        clickAnimation: "clickAnimation 0.3s ease-in-out",
        down: "down .15s ease-in-out",
        up: "up .15s ease-in-out",
      },

      colors: {
        leeBlack: "#1a1a1a",
        blue: "#61CDFE",
        accentBlue: "#1188BB",
        red: "#E88676",
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
        lightBlock: "#EDEDED",
        deepGrayButton: "#383838",
        sidebarLightText: "#606164",
        itemGray: "#303030",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "4xl": "0 0 5px rgba(0,0,0,.2) inset",
        in: "0 0 0 0.2rem #61CDFE inset",
        inWhite: "0 0 0 0.2rem #ffffff inset",
        inBlack: "0 0 0 0.2rem #000000 inset",
        main: ".1rem .1rem .5rem rgba(0,0,0,.15)",
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
