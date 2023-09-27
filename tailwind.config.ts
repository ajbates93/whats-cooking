module.exports = {
  darkMode: 'class',
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Onest', 'sans-serif']
      },
      colors: {
        'navGray': '#f9f9f9',
        'primary': '#00817a',
        'primary-dark': '#ff650f',
        'darky': '#171716'
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

