/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        // Custom font sizes for accessibility
        'text-small': {
          html: { fontSize: '14px' },
        },
        'text-medium': {
          html: { fontSize: '16px' },
        },
        'text-large': {
          html: { fontSize: '18px' },
        },
      },
      spacing: {
        // Safe area insets for mobile devices
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
  },
  plugins: [],
}