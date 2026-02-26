/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}", "./src/app.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1E3A8A",
          accent: "#6D28D9",
          bg: "#0A0F1A",
          text: "#E2E8F0",
          highlight: "#84CC16",
          surface: "#121A2B",
          "surface-alt": "#1A2540",
          border: "#2B385A"
        }
      }
    }
  },
  plugins: []
};
