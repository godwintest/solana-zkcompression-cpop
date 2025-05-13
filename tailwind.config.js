/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#9945FF',
        'secondary': '#14F195',
        'accent': '#85FFC4',
        'background': '#0D1117',
        'foreground': '#FFFFFF',
      },
    },
  },
  plugins: [],
}
