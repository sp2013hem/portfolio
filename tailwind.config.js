const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? "build" : "watch";

module.exports = {
  prefix: "",
  important: true,
  mode: "jit",
  purge: {
    content: ["./src/**/*.{html,ts,css,scss,sass,less,styl}"],
  },
  darkMode: "media", ///or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Kumbh Sans", "sans-serif"],
        serif: ["ui-serif", "Georgia"],
        mono: ["ui-monospace", "SFMono-Regular"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
