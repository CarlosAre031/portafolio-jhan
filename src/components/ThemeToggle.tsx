import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

// Script que se ejecutará antes de que se renderice la aplicación
const themeScript = `
  (function() {
    function getTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    const theme = getTheme();
    document.documentElement.classList.toggle('dark', theme === 'dark');
  })();
`;

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        // Inicialización del estado basada en localStorage o preferencias del sistema
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Agregar script al head del documento
        const scriptElement = document.createElement('script');
        scriptElement.innerHTML = themeScript;
        document.head.appendChild(scriptElement);
        
        setIsVisible(true);
        
        return () => {
            document.head.removeChild(scriptElement);
        };
    }, []);

    const toggleTheme = () => {
        const newTheme = !darkMode;
        setDarkMode(newTheme);
        
        if (newTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <div
            className={`fixed top-32 z-[10001] transition-transform duration-700 ease-in-out ${
                isVisible ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ right: '0' }}
        >
            <button
                onClick={toggleTheme}
                className="bg-background-secondary rounded-l-full p-1.5 shadow-lg hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Cambiar tema"
            >
                <div className="relative w-10 h-5 md:w-12 md:h-6 rounded-full bg-primary">
                    <div
                        className={`absolute top-0.5 w-4 h-4 md:w-5 md:h-5 rounded-full bg-background transform transition-transform duration-300 ${
                            darkMode ? 'translate-x-5 md:translate-x-6' : 'translate-x-0.5'
                        }`}
                    />
                    <SunIcon 
                        className={`absolute w-3 h-3 md:w-4 md:h-4 text-yellow-400 top-1 left-1 transition-opacity duration-300 ${
                            darkMode ? 'opacity-0' : 'opacity-100'
                        }`}
                    />
                    <MoonIcon 
                        className={`absolute w-3 h-3 md:w-4 md:h-4 text-yellow-400 top-1 right-1.5 transition-opacity duration-300 ${
                            darkMode ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                </div>
            </button>
        </div>
    );
};

export default ThemeToggle;