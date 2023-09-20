/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        'navGray': '#f9f9f9',
        'primary': '#00817a'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        }
      },
      animation: {
        'wiggle': 'wiggle 0.2s ease-in-out 1s'
      }
    },
  },
  plugins: [],
}

