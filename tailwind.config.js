const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? "build" : "watch";

module.exports = {
  prefix: "",
  mode: "jit",
  purge: {
    content: ["./src/**/*.{html,ts,css,scss,sass,less,styl}"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    styled: true,
    themes: [
      {
        light: {
          primary: "#f28c18",
          "primary-focus": "#ca710c",
          "primary-content": "#131616",
          secondary: "#6d3a9c",
          "secondary-focus": "#532c77",
          "secondary-content": "#ffffff",
          accent: "#51a800",
          "accent-focus": "#397500",
          "accent-content": "#ffffff",
          neutral: "#333c4d",
          "neutral-focus": "#1f242e",
          "neutral-content": "#f9fafb",
          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#f2f2f2",
          "base-content": "#333c4d",
          info: "#66c6ff",
          success: "#87d039",
          warning: "#e2d562",
          error: "#ff6f6f",
        },
        dark: {
          primary: "#f28c18",
          "primary-focus": "#ca710c",
          "primary-content": "#131616",
          secondary: "#6d3a9c",
          "secondary-focus": "#532c77",
          "secondary-content": "#ffffff",
          accent: "#51a800",
          "accent-focus": "#397500",
          "accent-content": "#ffffff",
          neutral: "#1b1d1d",
          "neutral-focus": "#131616",
          "neutral-content": "#ffffff",
          "base-100": "#212121",
          "base-200": "#1b1d1d",
          "base-300": "#131616",
          "base-content": "#ffffff",
          info: "#66c6ff",
          success: "#87d039",
          warning: "#e2d562",
          error: "#ff6f6f",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
