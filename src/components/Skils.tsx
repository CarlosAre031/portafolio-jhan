/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import SkillsItem from './SkilsItem';
import SkillsLanguage from './SkilsLanguage';
import { Code, Database, Shield, Brain, Globe } from 'lucide-react';

// Función de ayuda para ordenar por fecha
const sortByDate = (a: any, b: any) => {
  const parseDate = (date: string) => {
    if (!date) return new Date(0);
    if (date.includes('/')) {
      // Formato dd/mm/yy
      const [day, month, year] = date.split('/');
      return new Date(2000 + parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    // Formato "yyyy" o "yyyy - yyyy"
    return new Date(date.split(' ')[0]);
  };

  const dateA = parseDate(a.date || a.year);
  const dateB = parseDate(b.date || b.year);
  return dateB.getTime() - dateA.getTime();
};

const skillsData = {
  education: [
    {
      title: "Tecnólogo en Análisis y Desarrollo de Software",
      year: "2022 - 2024",
      description: "Formación especializada en desarrollo de software con énfasis en seguridad informática y mejores prácticas de programación. Competencias en desarrollo seguro y gestión de vulnerabilidades.",
      institution: "SENA - Servicio Nacional de Aprendizaje",
      location: "Bogota, Colombia",
      badge: "Finalizado"
    }
  ],

  courses: {
    development: [
      {
        title: "Java Web: crea aplicaciones utilizando Spring Boot",
        year: "2024",
        date: "16/7/24",
        description: "Desarrollo avanzado de APIs REST y aplicaciones web con Spring Boot 3. Implementación de buenas prácticas y patrones de diseño.",
        institution: "Alura Latam",
        badge: "Certificado por Alura",
        certificationLink: "https://app.aluracursos.com/user/carlos101973/degree-java-web-spring-boot-15781/certificate"
      },
      {
        title: "Java y Spring Boot",
        year: "2024",
        date: "16/7/24",
        description: "Desarrollo de APIs seguras y escalables con Spring Boot. Implementación de autenticación y documentación con Swagger.",
        institution: "Alura Latam",
        badge: "Certificado por Alura",
        certificationLink: "https://app.aluracursos.com/user/carlos101973/degree-java-web-spring-boot-15781/certificate"
      },
      {
        title: "Java Orientado a Objetos",
        year: "2024",
        date: "12/6/24",
        description: "Manejo avanzado de JPA/Hibernate y Spring Data. Optimización de consultas y manejo de transacciones.",
        institution: "Alura Latam",
        badge: "Certificado por Alura",
        certificationLink: "https://app.aluracursos.com/user/carlos101973/degree-javaoo-grupo6-one-15713/certificate"
      },
      {
        title: "Programador en C#",
        year: "2024",
        date: "21/5/24",
        description: "Este curso de Programador en C# te capacitará para desarrollar, mantener y optimizar aplicaciones de software en el lenguaje C#, uno de los más utilizados en la industria. Aprenderás a implementar soluciones utilizando programación orientada a objetos y a trabajar con bases de datos para construir aplicaciones robustas y eficientes.",
        institution: "Capacitate para el empleo",
        badge: "Certificado por Capacitate para el empleo",
      },
      {
        title: "Java Orientado a Objetos",
        year: "2024",
        date: "12/6/24",
        description: "Manejo avanzado de JPA/Hibernate y Spring Data. Optimización de consultas y manejo de transacciones.",
        institution: "Alura Latam",
        badge: "Certificado por Alura",
        certificationLink: "https://app.aluracursos.com/user/carlos101973/degree-javaoo-grupo6-one-15713/certificate"
      }
    ],
    database: [
      {
        title: "Consultas SQL Avanzadas con MySQL",
        year: "2024",
        date: "15/10/24",
        description: "Optimización de consultas complejas y administración avanzada de bases de datos MySQL.",
        institution: "Alura Latam",
        badge: "Certificado por Alura",
        certificationLink: "https://app.aluracursos.com/certificate/d3010275-6df8-49b5-92ad-4498c254e955?lang"
      },
      {
        title: "SQL con MySQL: Manipulación y Consulta",
        year: "2024",
        date: "13/8/24",
        description: "Fundamentos de SQL y gestión eficiente de datos relacionales. Diseño de bases de datos y normalización.",
        institution: "Alura Latam",
        badge: "Certificado por Alura",
        certificationLink: "https://app.aluracursos.com/user/carlos101973/course/introduccion-sql-mysql-manipule-consulte-datos/certificate"
      }
    ],
    security: [
      {
        title: "CCNA: Introduction to Cybersecurity",
        year: "2023",
        date: "06/10/23",
        description: "Fundamentos de ciberseguridad, análisis de amenazas y aplicación de controles de seguridad.",
        institution: "Cisco Networking Academy",
        badge: "Certificado por Cisco",
        certificationLink: "https://www.credly.com/badges/128d6560-faf2-402a-99c3-aab7e09c6f83/linked_in_profile"
      },
      {
        title: "Cybersecurity Essentials",
        year: "2023",
        date: "29/12/23",
        description: "Configuración de firewalls, sistemas de detección de intrusiones y gestión de vulnerabilidades.",
        institution: "Cisco Networking Academy",
        badge: "Certificado por Cisco",
        certificationLink: "https://www.credly.com/badges/44baff31-c9d6-4d21-ae11-16d5ba8ff969/linked_in_profile"
      },
      {
        title: "Diagnosticar la seguridad de la información de acuerdo con métodos de análisis y normativa técnica",
        year: "2023",
        date: "14/11/23",
        description: "El diagnóstico de la seguridad de la información según métodos de análisis y normativa técnica es un proceso integral que permite evaluar y fortalecer la protección de los activos de información de una organización.",
        institution: "Sena",
        badge: "Certificado por el Sena",
      },
      {
        title: "BOOTCAMP Y HACKATHON EN CIBERSEGURIDAD",
        year: "2023",
        date: "13/12/23",
        description: "El Bootcamp de Ciberseguridad del SENA está diseñado para brindar una formación intensiva y práctica en temas esenciales de la ciberseguridad.",
        institution: "Sena",
        badge: "certificado por el Sena",
      },
      {
        title: "TECNICAS DE DIAGNOSTICO EN CIBERSEGURIDAD",
        year: "2023",
        date: "14/12/23",
        description: "Las principales técnicas de diagnóstico en ciberseguridad permiten evaluar y fortalecer la protección de sistemas y datos en una organización.",
        institution: "Sena",
        badge: "Certificado por el Sena",
      }
    ],
    ai: [
      {
        title: "ChatGPT: Optimización de Resultados",
        year: "2024",
        date: "15/10/24",
        description: "Técnicas avanzadas de prompt engineering y optimización de resultados con modelos de lenguaje.",
        institution: "Alura Latam",
        badge: "Certificado por Alura"
      }
    ]
  },

  skills: {
    languages: {
      programming: [
        { name: "JavaScript/TypeScript", level: "w-[85%]" },
        { name: "NoteJs", level: "w-[80%]" },
        { name: "Java/Spring Boot", level: "w-[60%]" },
        { name: "c#", level: "w-[40%]" }
      ],
      foreign: [
        { name: "Inglés (B1 Actualmente Estudiando)", level: "w-[45%]" }
      ]
    },
    technical: [
      { name: "React/Next.js", level: "w-[85%]" },
      { name: "MySQL/PostgreSQL", level: "w-[80%]" },
    ]
  }
};

const Skills = () => {
  // Ordenar los datos
  const sortedData = {
    education: [...skillsData.education].sort(sortByDate),
    courses: {
      development: [...skillsData.courses.development].sort(sortByDate),
      database: [...skillsData.courses.database].sort(sortByDate),
      security: [...skillsData.courses.security].sort(sortByDate),
      ai: [...skillsData.courses.ai].sort(sortByDate)
    }
  };

  const CourseSection = ({ 
    title, 
    icon: Icon, 
    courses, 
    className = "" 
  }: { 
    title: string; 
    icon: any; 
    courses: any[]; 
    className?: string;
  }) => (
    <div className={className}>
      <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2 sticky top-0 bg-background z-10 py-2">
        <Icon className="w-6 h-6 text-primary" />
        {title}
      </h3>
      <div className={`space-y-6 ${courses.length > 3 ? 'max-h-[800px] overflow-y-auto pr-4 custom-scrollbar' : ''}`}>
        {courses.map((course, index) => (
          <SkillsItem key={index} {...course} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="py-16 bg-background transition-colors duration-300">
      {/* Sección de Educación Formal */}
      <div className="container mx-auto px-4 mb-16">
      <h2 className="heading mb-12">
        Mis <span className="text-primary">Habilidades</span>
      </h2>
        <h3 className="text-4xl font-bold text-center text-foreground mb-12">
          Formación Profesional
        </h3>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {sortedData.education.map((item, index) => (
            <SkillsItem key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Sección de Habilidades Técnicas */}
      <div className="container mx-auto px-4 mb-16 bg-background-secondary py-12 rounded-xl">
        <h3 className="text-3xl font-bold text-center text-foreground mb-12">
          Habilidades Técnicas
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Lenguajes de Programación */}
          <div className="p-6 bg-background rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Code className="w-6 h-6 text-primary" />
              Lenguajes de Programación
            </h3>
            <SkillsLanguage
              skill1={skillsData.skills.languages.programming[0].name}
              skill2={skillsData.skills.languages.programming[1].name}
              skill3={skillsData.skills.languages.programming[2].name}
              level1={skillsData.skills.languages.programming[0].level}
              level2={skillsData.skills.languages.programming[1].level}
              level3={skillsData.skills.languages.programming[2].level}
            />
          </div>

          {/* Tecnologías */}
          <div className="p-6 bg-background rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Database className="w-6 h-6 text-primary" />
              Tecnologías
            </h3>
            <SkillsLanguage
              skill1={skillsData.skills.technical[0].name}
              skill2={skillsData.skills.technical[1].name}
              skill3="DevOps/Cloud"
              level1={skillsData.skills.technical[0].level}
              level2={skillsData.skills.technical[1].level}
              level3="w-[60%]"
            />
          </div>

          {/* Idiomas */}
          <div className="p-6 bg-background rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary" />
              Idiomas
            </h3>
            <SkillsLanguage
              skill1={skillsData.skills.languages.foreign[0].name}
              skill2="Comunicación Efectiva"
              skill3="Documentación Técnica"
              level1={skillsData.skills.languages.foreign[0].level}
              level2="w-[85%]"
              level3="w-[75%]"
            />
          </div>
        </div>
      </div>

      {/* Sección de Cursos y Certificaciones */}
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-bold text-center text-foreground mb-12">
          Cursos y Certificaciones
        </h3>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <CourseSection
            title="Desarrollo"
            icon={Code}
            courses={sortedData.courses.development}
          />

          <CourseSection
            title="Bases de Datos"
            icon={Database}
            courses={sortedData.courses.database}
          />

          <CourseSection
            title="Ciberseguridad"
            icon={Shield}
            courses={sortedData.courses.security}
          />

          <CourseSection
            title="Inteligencia Artificial"
            icon={Brain}
            courses={sortedData.courses.ai}
          />
        </div>
      </div>
    </div>
  );
};

export default Skills;