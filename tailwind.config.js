const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: 'class', 
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        trout: {
          DEFAULT: '#505468',
          50: '#F9FAFB',
          100: '#e8e9ed',
          200: '#c0c2ce',
          300: '#979caf',
          400: '#6f7590',
          500: '#505468',
          600: '#434656',
          700: '#353845',
          800: '#282a32',
          900: '#1b1c23'
        }
      },
      transitionProperty: {
        width: 'width'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-textshadow')]
};
