/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light Mode
        bgPrimary: '#FFDCF3',    
        bgSecondary: '#FFB2F5',  
        textPrimary: '#0D2D31',
        accent: '#4F348D',      

        // Dark Mode (GÜNCELLENDİ)
        darkBgPrimary: '#1A0B2E',    // Çok koyu mor arka plan
        darkBgSecondary: '#2D1B4E',  // Kartlar için biraz daha açık mor
        darkTextPrimary: '#FFE6F7',  // Okunabilir Açık Pembe Yazı
        darkAccent: '#D6BCFA',       // Dark mode'da parlayan mor
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-50% - 1rem))' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}