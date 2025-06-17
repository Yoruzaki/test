/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'arabic': ['Noto Sans Arabic', 'Arial', 'sans-serif'],
      },
      spacing: {
        'rtl': 'var(--rtl-spacing)',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.rtl\\:space-x-reverse > :not([hidden]) ~ :not([hidden])': {
          '--tw-space-x-reverse': '1',
        },
        '.rtl\\:flex-row-reverse': {
          'flex-direction': 'row-reverse',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
};