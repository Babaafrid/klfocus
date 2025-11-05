/**** TailwindCSS Config ****/
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
    './public/**/*.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0b132b', // deep navy
        accent: '#00e5ff',
        accent2: '#7c3aed',
        card: 'rgba(255,255,255,0.06)'
      },
      boxShadow: {
        glow: '0 0 40px rgba(0, 229, 255, 0.2)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at 20% 20%, rgba(124,58,237,.3), transparent 40%), radial-gradient(circle at 80% 0%, rgba(0,229,255,.25), transparent 40%)',
        'gradient-hero': 'linear-gradient(135deg, #0b132b 0%, #1c2541 50%, #3a506b 100%)'
      }
    }
  },
  plugins: []
};
