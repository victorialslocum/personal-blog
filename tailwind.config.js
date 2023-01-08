module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {colors: {
      'main': '#68A13F',
      'main-light': '#aadb85',
      'accent': '#ff49db',
    },},
  },
  plugins: [require('@tailwindcss/typography')],
};
