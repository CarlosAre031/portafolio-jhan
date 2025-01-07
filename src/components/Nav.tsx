import { Bars3Icon } from '@heroicons/react/20/solid';
import React from 'react';

interface Props {
    openNav: () => void;
}

const Nav = ({openNav}: Props) => {
  const scrollToSection = (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        if (sectionId === 'hero') {
          const offsetTop = element.offsetTop;
      window.scrollTo({
          top: offsetTop - 96,
          behavior: 'smooth'
      });    
      } else{
          const offsetTop = element.offsetTop;
          window.scrollTo({
              top: offsetTop +550, // 96px = 12vh (altura del nav) * 8 (basado en tailwind default)
              behavior: 'smooth'
          });
        }
      }
  };
    return (
        <div className="w-[100%] fixed z-[10000] top-0 h-[12vh] bg-background shadow-md transition-colors duration-300">
            <div className="flex items-center justify-between w-[90%] mx-auto h-[100%]">
                <h1 className="flex-[0.6] cursor-pointer text-lg lg:text-xl text-foreground font-bold">
                    JHANARE
                    <span className="text-primary hover:text-complementary transition-colors duration-300">DEV</span>
                </h1>
                
                {/* Links de navegación */}
                <div onClick={() => scrollToSection('hero')} className="nav-link text-sm lg:text-base">INICIO</div>
                <div onClick={() => scrollToSection('about')} className="nav-link text-sm lg:text-base">SOBRE MÍ</div>
                <div onClick={() => scrollToSection('services')} className="nav-link text-sm lg:text-base">SERVICIOS</div>
                <div onClick={() => scrollToSection('skills')} className="nav-link text-sm lg:text-base">CERTIFICACIONES</div>
                <div onClick={() => scrollToSection('projects')} className="nav-link text-sm lg:text-base">PROYECTOS</div>
                <div onClick={() => scrollToSection('footer')} className="nav-link text-sm lg:text-base">CONTACTO</div>
                
                {/* Botón menú móvil */}
                <div onClick={openNav}>
                    <Bars3Icon className="w-[2rem] md:hidden h-[2rem] cursor-pointer text-primary hover:text-complementary transition-colors duration-300" />
                </div>
            </div>
        </div>
    );
};

export default Nav;