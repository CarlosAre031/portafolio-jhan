import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React from "react";

const About = () => {
  const handleDownloadCV = () => {
    const cvUrl = '/docs/cv-jhan-arevalo.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.setAttribute('download', 'CV-Jhan-Arevalo.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-background pb-[3rem] pt-[4rem] md:pt-[8rem] transition-colors duration-300">
      <h2 className="heading mb-8">
        Sobre <span className="text-primary">Mí</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 w-[90%] sm:w-[80%] mx-auto gap-[3rem] items-center">
        <div>
          <h4 className="text-[25px] md:text-[35px] lg:text-[45px] md:leading-[3rem] leading-[2rem] capitalize mb-[3rem] font-bold text-foreground">
            Desarrollo y Seguridad
          </h4>
          <div className="mb-[3rem] flex items-center md:space-x-10">
            <span className="w-[100px] hidden md:block h-[5px] bg-primary/30 rounded-sm"></span>
            <p className="text-base sm:text-[19px] text-foreground/70 w-full md:w-[80%]">
              Como tecnólogo en desarrollo de software, me especializo en la intersección crítica entre el desarrollo de aplicaciones y la ciberseguridad. Con una sólida experiencia como Auditor Certificado en ISO 27001, estoy capacitado para diseñar soluciones de software que integran principios de seguridad desde las etapas iniciales del desarrollo, asegurando una arquitectura que cumple con los más altos estándares de protección de la información.
            </p>
          </div>
          <button 
            onClick={handleDownloadCV}
            className="w-full sm:w-auto px-6 sm:px-8 hover:bg-complementary 
                     transition-all duration-300 py-3 sm:py-4 
                     text-base sm:text-lg font-bold uppercase 
                     bg-primary text-white flex items-center 
                     justify-center space-x-2 rounded-md
                     hover:scale-105"
          >
            <span>HOJA DE VIDA</span>
            <ArrowDownTrayIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>
        <div 
          data-aos="fade-left"
          className="lg:w-[400px] mx-auto md:mx-0 mt-[2rem] lg:mt-0 lg:h-[500px] w-[300px] h-[300px] relative"
        >
          <Image
            src="/imagenes/foto2.jpg"
            alt="Jhan Arevalo - Desarrollador de Software y Ciberseguridad"
            layout="fill"
            objectFit="contain"
            className="relative z-[11] w-[100%] h-[100%] object-contain rounded-lg"
          />
          <div className="absolute w-[85%] h-[100%] z-[10] bg-primary top-[-1.5rem] right-[-1.5rem] rounded-lg"></div>
        </div>

        {/* Sección de Especialidades */}
        <div className="col-span-1 md:col-span-2 mt-8">
          <h3 className="text-[20px] font-bold text-primary mb-6">
            ESPECIALIDADES
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-background-secondary p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <h4 className="text-foreground font-bold mb-2">Desarrollo Seguro</h4>
              <p className="text-foreground/70">
                Desarrollo de aplicaciones con enfoque en seguridad desde el diseño,
                siguiendo las mejores prácticas y estándares de la industria.
              </p>
            </div>
            <div className="bg-background-secondary p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <h4 className="text-foreground font-bold mb-2">Auditoría ISO 27001</h4>
              <p className="text-foreground/70">
                Certificado como Auditor Interno ISO/IEC27001:2022, con experiencia
                en evaluación y mejora de sistemas de gestión de seguridad.
              </p>
            </div>
            <div className="bg-background-secondary p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <h4 className="text-foreground font-bold mb-2">Ciberseguridad</h4>
              <p className="text-foreground/70">
                Especializado en pruebas de penetración, análisis de vulnerabilidades
                y prácticas de hacking ético para fortalecer la seguridad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;