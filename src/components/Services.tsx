import {
  CodeBracketSquareIcon,
  ServerIcon,
  WindowIcon,
  CommandLineIcon,
  CpuChipIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";
import React from "react";


const Services = () => {
  const services = [
    {
      icon: <WindowIcon className="w-[4rem] h-[4rem]" />,
      title: "Frontend Development",
      description: "Desarrollo de interfaces modernas y responsivas con React, Next.js y Tailwind CSS. Creación de experiencias de usuario atractivas y adaptables a todos los dispositivos.",
      color: "bg-gradient-to-br from-blue-500/20 to-blue-600/20 dark:from-blue-700/20 dark:to-blue-800/20",
      borderColor: "border-blue-500/20 dark:border-blue-700/20",
      delay: 0
    },
    {
      icon: <ServerIcon className="w-[4rem] h-[4rem]" />,
      title: "Backend Development",
      description: "Desarrollo de servidores robustos con Node.js, Express y Spring Boot. Implementación de bases de datos SQL y NoSQL para soluciones escalables.",
      color: "bg-gradient-to-br from-green-500/20 to-green-600/20 dark:from-green-700/20 dark:to-green-800/20",
      borderColor: "border-green-500/20 dark:border-green-700/20",
      delay: 200
    },
    {
      icon: <CodeBracketSquareIcon className="w-[4rem] h-[4rem]" />,
      title: "Full Stack Development",
      description: "Desarrollo completo de aplicaciones web, integrando frontend y backend. Soluciones end-to-end con arquitecturas modernas y mejores prácticas.",
      color: "bg-gradient-to-br from-purple-500/20 to-purple-600/20 dark:from-purple-700/20 dark:to-purple-800/20",
      borderColor: "border-purple-500/20 dark:border-purple-700/20",
      delay: 400
    },
    {
      icon: <CpuChipIcon className="w-[4rem] h-[4rem]" />,
      title: "APIs & Integrations",
      description: "Creación de APIs RESTful e integración con servicios externos. Desarrollo de microservicios y documentación completa con Swagger.",
      color: "bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 dark:from-yellow-700/20 dark:to-yellow-800/20",
      borderColor: "border-yellow-500/20 dark:border-yellow-700/20",
      delay: 200
    },
    {
      icon: <CommandLineIcon className="w-[4rem] h-[4rem]" />,
      title: "Development & Testing",
      description: "Implementación de pruebas automatizadas y procesos de CI/CD. Aseguramiento de calidad mediante testing unitario y de integración.",
      color: "bg-gradient-to-br from-red-500/20 to-red-600/20 dark:from-red-700/20 dark:to-red-800/20",
      borderColor: "border-red-500/20 dark:border-red-700/20",
      delay: 400
    },
    {
      icon: <ShieldCheckIcon className="w-[4rem] h-[4rem]" />,
      title: "Secure Development",
      description: "Desarrollo seguro con estándares ISO 27001. Implementación de prácticas de seguridad y auditoría en el ciclo de desarrollo.",
      color: "bg-gradient-to-br from-orange-500/20 to-orange-600/20 dark:from-orange-700/20 dark:to-orange-800/20",
      borderColor: "border-orange-500/20 dark:border-orange-700/20",
      delay: 600
    }
  ];

  return (
    <div className="bg-background pt-[4rem] md:pt-[8rem] pb-[5rem] transition-colors duration-300">
      <h2 className="heading">
        Mis <span className="text-primary">Servicios</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[80%] mx-auto items-stretch gap-8 mt-[4rem]">
        {services.map((service, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={service.delay}
            className="group h-full"
          >
            <div className={`
              h-full relative overflow-hidden rounded-xl
              border backdrop-blur-sm
              ${service.color} ${service.borderColor}
              p-8 text-center
              hover:scale-105 transform transition-all duration-300
              hover:shadow-xl hover:shadow-primary/20
              flex flex-col justify-between min-h-[320px]
            `}>
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mx-auto text-primary mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  {service.icon}
                </div>
                
                <h1 className="text-[20px] md:text-[24px] text-foreground font-bold mb-4">
                  {service.title}
                </h1>
                
                <p className="text-[15px] text-foreground/70 font-normal leading-relaxed flex-grow">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
