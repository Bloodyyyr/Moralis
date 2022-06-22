/* eslint @typescript-eslint/no-var-requires: "off" */
// const { fontFamily } = require('tailwindcss/defaultTheme')
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content:  ["index.html","./src/**/*.{html,js,jsx,tsx}"],
  theme: {

    extend: {

        colors: {
          tealmv: '#1d9dbb',
          orangemv: '#e45d20',
          brown: {
            50: '#fdf8f6',
            100: '#f2e8e5',
            200: '#eaddd7',
            300: '#e0cec7',
            400: '#d2bab0',
            500: '#bfa094',
            600: '#a18072',
            700: '#977669',
            800: '#846358',
            900: '#43302b',
          },
        },
  
      

      fontFamily: {
        'sans-serif': ['Kanit',  ...defaultTheme.fontFamily.sans,],
        // 'ui-sans-serif': [ "Kanit",  ...defaultTheme.fontFamily.sans,],
        'sans': [ "Kanit",  ...defaultTheme.fontFamily.sans,],
        // Kanit : ["Kanit",  ...defaultTheme.fontFamily.sans,]
      },
    
  
    },
  },
  plugins: [
    require('tailwind-scrollbar'),

    function ({ addUtilities }) {
      addUtilities({
        '.overflow-initial': { overflow: 'initial' },
        '.overflow-inherit': { overflow: 'inherit' },
        '.flex-no-grow': {flexGrow: '0'},
        '.flex-no-shrink': {flexShrink: '0'},
      })
    }
  ],
}
