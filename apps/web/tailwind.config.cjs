/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}', './src/app.html'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#D4A017',
          accent: '#23B5D3',
          bg: '#F6F7F2',
          text: '#101114',
          highlight: '#1D3A34',
          surface: '#FFFFFF',
          'surface-alt': '#ECEFE7',
          border: '#C9D0C2',
        },
      },
    },
  },
  plugins: [],
};
