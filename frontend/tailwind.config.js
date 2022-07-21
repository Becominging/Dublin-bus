/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
