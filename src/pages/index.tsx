import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Componentes principales
import Nav from '@/components/Nav';
import MobileNav from '@/components/MobileNav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Skills from '@/components/Skils';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import ThemeToggle from '@/components/ThemeToggle';
import MiniGames from '@/components/MiniGames';
import Certifications from '@/components/Blog';


// Cargar Particle de forma dinámica para evitar problemas de SSR
const Particle = dynamic(() => import('@/components/Particle'), {
  ssr: false,
  loading: () => <div className="h-screen bg-background" />
});

const HomePage = () => {
  // Estados
  const [isLoading, setIsLoading] = useState(true);
  const [nav, setNav] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Función para abrir/cerrar el nav móvil
  const openNav = () => setNav(true);
  const closeNav = () => setNav(false);

  // Inicializar AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
      offset: 120,
      delay: 0,
      duration: 1000,
      easing: 'ease',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });

    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    setMounted(true);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // No renderizar nada hasta que el componente esté montado (evita problemas de hidratación)
  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Pantalla de carga */}
      {isLoading && <LoadingScreen />}

      <MiniGames />

      {/* Contenido principal */}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Navigation */}
        <MobileNav nav={nav} closeNav={closeNav} />
        <Nav openNav={openNav} />

        {/* Hero Section con Particles */}
        <section id="hero" className="relative">
          <Particle />
          <Hero />
        </section>

        {/* Main Content */}
        <main className="relative z-30">
          {/* About Section */}
          <section id="about" className="scroll-mt-20">
            <About />
          </section>

          {/* Services Section */}
          <section id="services" className="scroll-mt-20">
            <Services />
          </section>

          <section id="projects" className="scroll-mt-20">
            <Projects />
          </section>


          {/* Skills Section */}
          <section id="skills" className="scroll-mt-20">
            <Skills />
          </section>
          
          {/* Skills Section */}
          <section id="blog" className="scroll-mt-20">
            <Certifications />
          </section>



          {/* Footer Section */}
          <section id="footer">
            <Footer />
          </section>
        </main>
      </div>

      {/* Overlay para cuando el nav móvil está abierto */}
      {nav && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeNav}
        />
      )}
    </div>
  );
};

// Configuración de exportación para páginas de Next.js
export default HomePage;

// Configuración opcional de getStaticProps si necesitas datos estáticos
export const getStaticProps = async () => {
  return {
    props: {}, // Serán pasadas al componente como props
    revalidate: 60 * 60, // Opcional: Revalidar cada hora
  };
};