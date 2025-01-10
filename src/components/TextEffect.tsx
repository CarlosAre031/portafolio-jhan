import { TypeAnimation } from 'react-type-animation';

const TextEffect = () => {
  return (
    <TypeAnimation
      sequence={[
        'Desarrollador',
        3000,
        'Ciberseguridad',
        3000,
        'Programador',
        3000,
        'Auditor ISO 27001',
        3000
      ]}
      speed={10}
      className="text-[2rem] md:text-[3rem] text-primary hover:text-complementary font-bold uppercase transition-colors duration-300"
      repeat={Infinity}
    />
  );
};

export default TextEffect;