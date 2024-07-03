const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        arfagreen: "#0E9F6E",
        arfagray: "#FAFAFA",
        arfablack: "#111827",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), flowbite.plugin()],
};
