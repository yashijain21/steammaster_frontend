/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'lato': ['Lato', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        "primary": "#FF3811",
        'dark6': '#E8E8E8',
        'dark2': '#444444',
        'dark3': '#737373'
      },
    },
  },
  plugins: [require("daisyui")],
}

