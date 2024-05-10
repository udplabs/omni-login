/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // these are points carried over from ULP
        'ulp-mobile': { 'raw': '(max-width: 500px)' },
        'ulp-wide-mobile': { 'raw': '(max-width: 600px)' },
      }
    },
  },
  plugins: [],
}

