import React from "react";
import Particle from "./Particle";
import TextEffect from "./TextEffect";
import Image from "next/image";
import { ArrowDownTrayIcon } from "@heroicons/react/20/solid";
import { Linkedin, Github } from "lucide-react";
import Link from "next/link";

const Hero = () => {
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
    <div className="relative min-h-screen md:h-[98vh]">
      <div className="absolute inset-0 mt-[10vh]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat block dark:hidden"
          style={{
            backgroundImage: "url('/imagenes/bannerClaro.jpg')",
          }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden dark:block"
          style={{
            backgroundImage: "url('/imagenes/banner.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />
      </div>

      <Particle />

      <div className="relative z-20 w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[3rem] h-full min-h-[calc(100vh-10vh)] items-center pt-24 sm:pt-28 md:pt-20 lg:py-0">
        <div className="text-center lg:text-left">
          <div className="space-y-2 sm:space-y-4">
            <h1 className="text-2xl sm:text-[35px] md:text-[45px] text-foreground font-bold leading-tight sm:leading-normal">
              ¡HOLA, SOY{" "}
              <span className="text-primary hover:text-complementary transition-colors duration-300">
                JHAN!
              </span>
            </h1>
            <TextEffect />
          </div>

          <p className="mt-6 text-base sm:text-[17px] text-foreground/70 max-w-2xl mx-auto lg:mx-0">
            Desarrollador de Software especializado en Ciberseguridad y Auditor ISO 27001. Me dedico a crear soluciones seguras combinando desarrollo y seguridad informática, con un enfoque en la implementación de sistemas robustos y resilientes. Cuento con múltiples certificaciones en ambas áreas, lo que me permite abordar proyectos desde una perspectiva integral de seguridad y eficiencia, garantizando la protección de datos y el cumplimiento de normativas internacionales.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
            <button 
              onClick={handleDownloadCV}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 
                       text-base sm:text-lg font-bold uppercase 
                       bg-primary text-white rounded-md
                       hover:bg-complementary hover:scale-105
                       transition-all duration-300
                       flex items-center justify-center space-x-2"
            >
              <span>Hoja de Vida</span>
              <ArrowDownTrayIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <Link 
                href="https://www.linkedin.com/in/jhan-arevalo" 
                target="_blank"
                className="group transform transition-transform hover:scale-110"
              >
                <Linkedin className="w-8 h-8 sm:w-10 sm:h-10 text-[#0A66C2] group-hover:text-complementary transition-colors duration-300" />
              </Link>

              <Link 
                href="https://github.com/CarlosAre031" 
                target="_blank"
                className="group transform transition-transform hover:scale-110"
              >
                <Github className="w-8 h-8 sm:w-10 sm:h-10 text-[#171515] dark:text-white group-hover:text-complementary transition-colors duration-300" />
              </Link>

              <Link 
                href="https://wa.me/573178859061" 
                target="_blank"
                className="group bg-[#25D366] hover:bg-complementary rounded-full p-2 transform transition-all duration-300 hover:scale-110"
              >
                <svg 
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center">
          <div className="relative w-[300px] sm:w-[400px] aspect-square bg-primary rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/20">
            <Image
              src="/imagenes/foto1.jpg"
              alt="Jhan Arevalo - Desarrollador de Software"
              fill
              className="object-cover rounded-full hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;