/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        complementary: 'var(--complementary)',
        secondary: 'var(--secondary)',
        background: 'var(--background)',
        'background-secondary': 'var(--background-secondary)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        primary: ["Montserrat"],
        secondary: ["Geist"],
        mono: ["Geist Mono"],
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Esto habilita el modo oscuro basado en las preferencias del sistema
}