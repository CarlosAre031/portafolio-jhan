import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  duration?: number; // Duración en milisegundos
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ duration = 3000 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    // Manejar la desaparición de la pantalla de carga
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    // Progreso animado
    const progressInterval = setInterval(() => {
      if (!isPaused) {
        setProgress(prev => {
          const nextProgress = prev + 1;
          if (nextProgress >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return nextProgress;
        });
      }
    }, duration / 100); // Distribuir el progreso uniformemente durante la duración

    // Cleanup
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration, isPaused]);

  // Variantes de animación para framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        when: "afterChildren"
      }
    }
  };

  const spinnerVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  const circleVariants = {
    animate: {
      scale: [0.5, 1, 0.5],
      transition: {
        duration: 1.8,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background dark:bg-background"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
        >
          {/* Spinner Container */}
          <motion.div
            className="relative w-40 h-40"
            variants={spinnerVariants}
          >
            {/* Círculos animados */}
            {[...Array(2)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute top-0 left-0 w-full h-full border-4 border-primary 
                         dark:border-primary rounded-full opacity-75"
                variants={circleVariants}
                animate="animate"
                custom={index}
                style={{
                  animationDelay: `${index * 0.7}s`
                }}
              />
            ))}

            {/* Logo central rotatorio */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       w-20 h-20 bg-primary dark:bg-primary rounded-full shadow-lg
                       flex items-center justify-center text-white font-bold text-xl"
              animate={{
                rotate: 360,
                transition: {
                  duration: 1.5,
                  ease: "linear",
                  repeat: Infinity
                }
              }}
            >
              JC
            </motion.div>
          </motion.div>

          {/* Barra de progreso */}
          <div className="mt-8 w-3/4 max-w-md h-2 bg-gray-300 dark:bg-gray-700 
                       rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-primary dark:bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
            />
          </div>

          {/* Texto de carga */}
          <motion.p
            className="mt-4 text-foreground/70 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Cargando... {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;