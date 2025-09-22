/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 25s linear infinite', // Marquee animation
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' }, // Start from right
          '100%': { transform: 'translateX(-100%)' }, // Move to left
        },
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: '#0A9799',
        secondary: '#087879',
        light: '#F8F9FA',
        dark: '#343A40',
      },
    },
  },
  plugins: [],
}

