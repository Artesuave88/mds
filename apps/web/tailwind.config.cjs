/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}", "./src/app.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#D4A017",
          accent: "#F2C94C",
          bg: "#F5F5F5",
          text: "#111111",
          highlight: "#B8860B",
          surface: "#FFFFFF",
          "surface-alt": "#EEEEEE",
          border: "#D0D0D0",
        },
      },
    },
  },
  plugins: [],
};
