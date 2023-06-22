/** @type {import('tailwindcss').Config} */

export default {
  content: [
    //
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

      },
      animation: {
        overlayShow: "overlayShow 550ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 550ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },

  // eslint-disable-next-line no-undef
  plugins: [require("tailwindcss-animate"), require("shadcn-fe-tw")],
};

