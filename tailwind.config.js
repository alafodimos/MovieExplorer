/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'custom-green-100' : '#A7BBA0',
        'custom-green-150' : '#82AF6E',
        'custom-green-200' : '#283C23',
        'custom-green-300' : '#1E2319',
        'custom-green-400' : '#0F0F0A'
      }
    }
  },
  plugins: []
};