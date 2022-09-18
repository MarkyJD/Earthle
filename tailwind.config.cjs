/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Alfa Slab One'", 'cursive'],
        hand: ["'Kalam'", 'cursive'],
        customSans: ["'Source Sans Pro'", 'sans-serif'],
        customSerif: ["'Merriweather'", 'serif'],
      },
    },
  },
  plugins: [],
};
