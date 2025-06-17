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
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [
    function({ addUtilities, addComponents }) {
      const newUtilities = {
        '.rtl\\:space-x-reverse > :not([hidden]) ~ :not([hidden])': {
          '--tw-space-x-reverse': '1',
        },
        '.rtl\\:flex-row-reverse': {
          'flex-direction': 'row-reverse',
        },
        '.rtl\\:text-right': {
          'text-align': 'right',
        },
        '.rtl\\:text-left': {
          'text-align': 'left',
        },
      }
      
      const newComponents = {
        '.sidebar-responsive': {
          '@media (max-width: 1024px)': {
            'transform': 'translateX(-100%)',
            '&.open': {
              'transform': 'translateX(0)',
            },
          },
          '[dir="rtl"] &': {
            '@media (max-width: 1024px)': {
              'transform': 'translateX(100%)',
              '&.open': {
                'transform': 'translateX(0)',
              },
            },
          },
        },
      }
      
      addUtilities(newUtilities, ['responsive', 'hover'])
      addComponents(newComponents)
    }
  ],
};