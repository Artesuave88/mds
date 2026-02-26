/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}", "./src/app.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1E3A8A",
          accent: "#6D28D9",
          bg: "#F7FAFF",
          text: "#0F172A",
          highlight: "#84CC16",
          surface: "#FFFFFF",
          "surface-alt": "#EEF2FF",
          border: "#D6DEEF"
        }
      }
    }
  },
  plugins: []
};
