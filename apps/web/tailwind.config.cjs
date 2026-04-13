/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}', './src/app.html'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#D4A017',
          accent: '#F2C94C',
          bg: '#F7F7F5',
          text: '#0D0D0D',
          highlight: '#8C6A11',
          surface: '#FFFFFF',
          'surface-alt': '#F1EEE8',
          border: '#D7C08A',
        },
      },
    },
  },
  plugins: [],
};
