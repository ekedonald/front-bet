/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#003743',
        bgDark: {
          400: '#14191f',
          500: '#394047',
          600: '#262932',
          700: '#20252B',
          800: '#1C2127',
          900: '#001633',
          'card': '#263b56',
        },
      },
      fontFamily: {
        body: ['Kanit'],
      },
    },
  },
  plugins: [require("daisyui")],
}

