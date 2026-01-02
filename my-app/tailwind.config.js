/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ... your content paths
  ],
  theme: {
    extend: {
      animation: {
        // Runs the animation for 50 seconds, linear speed, infinite loop
        marquee: 'marquee 50s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}