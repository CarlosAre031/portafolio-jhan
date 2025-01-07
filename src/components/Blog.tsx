import { Trophy, Award } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialId: string;
  link: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    id: 1,
    title: "ISO/IEC 27001 Auditor Interno",
    issuer: "ES-CIBER",
    date: "Diciembre 2024",
    image: "/imagenes/iso.png",
    credentialId: "2667e781-7969-4161-bde1-b353042b12b5",
    link: "https://www.google.com/url?sa=D&q=https://virtuallab.altertechnology.com/csv/2667e781-7969-4161-bde1-b353042b12b5&ust=1730410680000000&usg=AOvVaw0KD2_TBsQagdBOcO2CsqT_&hl=es&source=gmail"
  },
  {
    id: 2,
    title: "Oracle Cloud Infrastructure & Generative AI",
    issuer: "Oracle",
    date: "Julio 2024",
    image: "/imagenes/oracle.png",
    credentialId: "OCI-AI-2024",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=0C18091BB04FD0EED3A451E0756CB3F4D16A55A549406AE1637521AC649B5407"
  },
  {
    id: 3,
    title: "Programa ONE - Oracle Next Education",
    issuer: "Oracle + Alura Latam",
    date: "julio 2024",
    image: "/imagenes/next.png",
    credentialId: "133f52be-15b7-4295-b7f4-003d0e99",
    link: "https://app.aluracursos.com/user/carlos101973/program/16/certificate"
  }
];

const Certifications = () => {
  return (
    <div className="pt-[4rem] md:pt-[8rem] pb-[4rem] bg-background">
      <h1 className="heading">
        CERTIFICACIONES
        <span className="text-primary"> INTERNACIONALES</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-[4rem] gap-[2rem] w-[80%] mx-auto">
        {CERTIFICATIONS.map((cert) => (
          <div key={cert.id} className="group flex flex-col h-full">
            {/* Contenedor principal con altura fija */}
            <div className="flex flex-col h-full">
              {/* Contenedor de imagen con proporción fija */}
              <div className="relative w-full pt-[75%]"> {/* Proporción 4:3 */}
                <div className="absolute inset-0">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-contain bg-white rounded-t-lg p-4"
                  />
                </div>
              </div>

              {/* Contenido de la certificación */}
              <div className="w-[90%] text-center mx-auto bg-background-secondary relative p-6 mt-[-1rem] 
                shadow-lg flex-1 flex flex-col rounded-lg">
                {/* Badge con la fecha */}
                <div className="w-fit px-6 py-2 bg-primary relative mt-[-2rem] text-white 
                  font-semibold text-sm mx-auto rounded-full">
                  {cert.date}
                </div>

                {/* Detalles de la certificación */}
                <div className="flex flex-col items-center mt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <p className="text-foreground text-sm">{cert.issuer}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-primary" />
                    <p className="text-foreground text-sm truncate max-w-[200px]" 
                      title={cert.credentialId}>
                      ID: {cert.credentialId.substring(0, 15)}...
                    </p>
                  </div>
                </div>

                {/* Título de la certificación */}
                <h3 className="mt-4 text-foreground text-lg font-semibold min-h-[3rem] 
                  flex items-center justify-center">
                  {cert.title}
                </h3>

                {/* Botón de verificación */}
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-full 
                    hover:bg-primary/90 transition-colors duration-300"
                >
                  Verificar Credencial
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;