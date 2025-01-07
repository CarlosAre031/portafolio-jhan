import { TypeAnimation } from 'react-type-animation';

const TextEffect = () => {
  return (
    <TypeAnimation
      sequence={[
        'Desarrollador',
        1500,
        'Ciberseguridad',
        1500,
        'Programador',
        1500,
        'Auditor ISO 27001',
        1500
      ]}
      speed={50}
      className="text-[2rem] md:text-[3rem] text-primary hover:text-complementary font-bold uppercase transition-colors duration-300"
      repeat={Infinity}
    />
  );
};

export default TextEffect;