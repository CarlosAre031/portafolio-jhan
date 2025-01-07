/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DevicePhoneMobileIcon,
  EnvelopeOpenIcon,
  MapIcon,
} from "@heroicons/react/20/solid";
import { useState, useRef, useEffect } from "react";
import { Github, Linkedin, MessageSquare, Shield, Scale, X } from "lucide-react";
import emailjs from '@emailjs/browser';

// Definición de tipos
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  Icon: React.ElementType;
}

interface SocialLink {
  icon: React.ElementType;
  link: string;
  name: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  interest: string;
}

// Componente Modal Base
const Modal = ({ isOpen, onClose, title, Icon, children }: ModalProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[90%] max-w-2xl bg-background p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary">
            <Icon className="h-6 w-6" />
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-foreground/70 hover:text-primary transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="h-[60vh] overflow-y-auto pr-4">
          <div className="text-foreground/80 space-y-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: 'freelance'
  });

  const socialLinks: SocialLink[] = [
    { icon: Github, link: "https://github.com/CarlosAre031", name: "Github" },
    { icon: Linkedin, link: "https://www.linkedin.com/in/jhan-arevalo", name: "LinkedIn" },
    { icon: MessageSquare, link: "https://wa.me/573176988239", name: "WhatsApp" },
  ];

  // Inicializar EmailJS
  useEffect(() => {
    emailjs.init("hI73f2vDyNVAf61uv"); // Reemplaza con tu public key de EmailJS
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const templateParams = {
        to_name: "Jhan Carlos", // El nombre de quien recibirá el email
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        interest: formData.interest,
      };
      console.log('Sending email with params:', templateParams); 
      await emailjs.send(
        "service_qiw9qqq", // Reemplaza con tu Service ID
        "template_rqxpsql", // Reemplaza con tu Template ID
        templateParams
      );

      setSubmitStatus({
        success: true,
        message: "¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto."
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        interest: 'freelance'
      });

      setTimeout(() => {
        setIsContactOpen(false);
        setSubmitStatus(null);
      }, 3000);

    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full py-16 relative overflow-hidden bg-background">
      {/* Círculos decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 rounded-full bg-primary/10 -top-32 -left-32 animate-pulse" />
        <div className="absolute w-96 h-96 rounded-full bg-complementary/10 -bottom-48 -right-48 animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Sección de la marca */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Jhan Carlos Arevalo
            </h2>
            <p className="mb-6 text-foreground/75">
              Transformando ideas en experiencias digitales únicas y memorables.
            </p>
            {/* Redes sociales */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-all duration-300 hover:scale-110 text-primary hover:text-complementary"
                  onMouseEnter={() => setHoveredIcon(social.name)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  <social.icon 
                    size={24} 
                    className={`transform transition-all duration-300 ${
                      hoveredIcon === social.name ? 'scale-110' : 'scale-100'
                    }`} 
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Información de contacto */}
          <div className="space-y-8">
            <div className="group">
              <div className="flex items-center space-x-3 p-4 rounded-lg transition-all duration-300 hover:bg-background-secondary">
                <MapIcon className="w-6 h-6 text-primary group-hover:animate-bounce" />
                <div>
                  <h3 className="font-semibold mb-1 text-foreground">Ubicación</h3>
                  <p className="text-sm text-foreground/75">Bogota, Colombia</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center space-x-3 p-4 rounded-lg transition-all duration-300 hover:bg-background-secondary">
                <DevicePhoneMobileIcon className="w-6 h-6 text-primary group-hover:animate-bounce" />
                <div>
                  <h3 className="font-semibold mb-1 text-foreground">Teléfono</h3>
                  <p className="text-sm text-foreground/75">+57 317-698-8239</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center space-x-3 p-4 rounded-lg transition-all duration-300 hover:bg-background-secondary">
                <EnvelopeOpenIcon className="w-6 h-6 text-primary group-hover:animate-bounce" />
                <div>
                  <h3 className="font-semibold mb-1 text-foreground">Email</h3>
                  <p className="text-sm text-foreground/75">carlos101973@hotmail.es</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-foreground">¿Trabajamos Juntos?</h3>
            <div className="p-6 rounded-lg bg-background-secondary hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <MessageSquare className="w-8 h-8 text-primary animate-bounce" />
                <div>
                  <h4 className="font-semibold text-foreground">¡Iniciemos un Proyecto!</h4>
                  <p className="text-sm text-foreground/75">
                    Cuéntame tu idea y hagámosla realidad
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="w-full py-3 px-4 rounded-lg bg-primary hover:bg-complementary 
                          text-background font-medium transform hover:scale-105 
                          transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Contactar Ahora</span>
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer inferior */}
        <div className="border-t border-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0 text-foreground/75">
              © {new Date().getFullYear()} Jhan Carlos Arévalo | Todos los derechos reservados
            </p>
            <div className="flex space-x-6">
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="text-sm text-foreground/75 hover:text-primary transition-colors duration-300 flex items-center gap-2"
              >
                <Shield size={16} />
                Política de privacidad
              </button>
              <button
                onClick={() => setIsTermsOpen(true)}
                className="text-sm text-foreground/75 hover:text-primary transition-colors duration-300 flex items-center gap-2"
              >
                <Scale size={16} />
                Términos y condiciones
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Contacto */}
      <Modal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        title="Conectemos"
        Icon={MessageSquare}
      >
        <div className="space-y-6">
          {submitStatus && (
            <div className={`p-4 rounded-lg ${
              submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {submitStatus.message}
            </div>
          )}

          <div className="bg-background-secondary p-4 rounded-lg mb-6">
            <p className="text-primary font-medium mb-2">¡Hola! 👋</p>
            <p className="text-foreground/80">
              Me emociona la posibilidad de colaborar en tu próximo proyecto. 
              Cuéntame un poco más sobre lo que tienes en mente.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Nombre Completo
                </label>
                <input
                  required
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full px-4 py-2 rounded-lg bg-background-secondary 
                           border border-primary/20 focus:border-primary 
                           transition-colors duration-300
                           text-foreground placeholder-foreground/50"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Correo Electrónico
                </label>
                <input
                  required
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="w-full px-4 py-2 rounded-lg bg-background-secondary 
                           border border-primary/20 focus:border-primary 
                           transition-colors duration-300
                           text-foreground placeholder-foreground/50"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Teléfono
              </label>
              <input
                required
                type="tel"
                placeholder="+57 300 123 4567"
                className="w-full px-4 py-2 rounded-lg bg-background-secondary 
                         border border-primary/20 focus:border-primary 
                         transition-colors duration-300
                         text-foreground placeholder-foreground/50"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Tipo de Proyecto
              </label>
              <select
                required
                className="w-full px-4 py-2 rounded-lg bg-background-secondary 
                         border border-primary/20 focus:border-primary 
                         transition-colors duration-300
                         text-foreground"
                value={formData.interest}
                onChange={(e) => setFormData({...formData, interest: e.target.value})}
              >
                <option value="freelance">Proyecto Freelance</option>
                <option value="fulltime">Trabajo Tiempo Completo</option>
                <option value="consultation">Consultoría</option>
                <option value="collaboration">Colaboración</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Cuéntame sobre tu proyecto
              </label>
              <textarea
                required
                placeholder="Describe brevemente tu idea o proyecto..."
                className="w-full px-4 py-2 rounded-lg bg-background-secondary 
                         border border-primary/20 focus:border-primary 
                         transition-colors duration-300
                         text-foreground placeholder-foreground/50
                         min-h-[100px] resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

        

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsContactOpen(false)}
                className="px-6 py-2 rounded-lg border border-primary/20 
                         hover:bg-background-secondary transition-colors duration-300
                         text-foreground/80 hover:text-foreground"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-primary hover:bg-complementary 
                         transition-colors duration-300 text-white font-medium
                         flex items-center gap-2"
              >
                <span>Enviar Mensaje</span>
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-background-secondary rounded-lg">
            <p className="text-sm text-foreground/70 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Tus datos están seguros y nunca serán compartidos con terceros.
            </p>
          </div>
        </div>
      </Modal>

      {/* Modal de Términos y Condiciones */}
      <Modal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="Términos y Condiciones"
        Icon={Scale}
      >
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg text-primary">1. Propósito del Portafolio</h3>
            <p className="mt-2">Este portafolio profesional está destinado exclusivamente para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Presentación de trabajos y proyectos profesionales</li>
              <li>Búsqueda de oportunidades laborales</li>
              <li>Servicios freelance y consultoría</li>
              <li>Networking profesional</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-primary">2. Propiedad Intelectual</h3>
            <p className="mt-2">Todo el contenido mostrado es propiedad intelectual de Jhan Carlos Arévalo.</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-primary">3. Servicios Freelance</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Presupuestos personalizados según requerimientos</li>
              <li>Términos de pago acordados por escrito</li>
              <li>Confidencialidad garantizada</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Modal de Política de Privacidad */}
      <Modal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        title="Política de Privacidad"
        Icon={Shield}
      >
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg text-primary">1. Recopilación de Información</h3>
            <p className="mt-2">Solo recopilamos datos de contacto proporcionados voluntariamente.</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-primary">2. Uso de la Información</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Comunicación profesional</li>
              <li>Respuesta a consultas</li>
              <li>Oportunidades laborales</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-primary">3. Protección de Datos</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>No se comparte información con terceros</li>
              <li>Almacenamiento seguro de datos</li>
              <li>Control sobre tus datos personales</li>
            </ul>
          </div>
        </div>
      </Modal>
    </footer>
  );
};

export default Footer;