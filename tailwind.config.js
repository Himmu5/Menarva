/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary : '#8F5843'
      },
      fontFamily : {
        "Inter" : ['Inter', "sans-serif"]
      },
      maxWidth : {
        "3xl" : "45rem"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

