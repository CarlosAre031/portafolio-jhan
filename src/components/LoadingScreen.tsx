import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2, Binary, Database, Cpu } from 'lucide-react';

interface LoadingScreenProps {
  duration?: number;
  appVersion?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  duration = 3000,
  appVersion = "v1.0.0" 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [systemMessages, setSystemMessages] = useState<string[]>([]);

  const phases = [
    "Inicializando sistema...",
    "Cargando módulos...",
    "Verificando dependencias...",
    "Optimizando recursos...",
    "Configurando entorno..."
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), duration);
    let currentPhase = 0;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1;
        if (next % 20 === 0 && currentPhase < phases.length - 1) {
          currentPhase++;
          setLoadingPhase(currentPhase);
          setSystemMessages(messages => [
            ...messages, 
            `[${new Date().toLocaleTimeString()}] ${phases[currentPhase]}`
          ].slice(-4));
        }
        return next >= 100 ? 100 : next;
      });
    }, duration / 100);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background-secondary"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="w-full max-w-3xl mx-4 md:mx-8 p-4 md:p-8">
            {/* Header */}
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-8 space-y-2 sm:space-y-0"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-2">
                <Terminal className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                <span className="text-primary font-mono text-sm md:text-base">DEV_ENVIRONMENT</span>
              </div>
              <div className="text-foreground/60 font-mono text-xs md:text-sm">
                {appVersion} | {new Date().toISOString()}
              </div>
            </motion.div>

            {/* Main Loading Area */}
            <div className="space-y-4 md:space-y-6">
              {/* Progress Indicators */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
                variants={itemVariants}
              >
                {/* CPU Usage */}
                <div className="border border-foreground/10 rounded-lg p-3 md:p-4 bg-background/80">
                  <div className="flex items-center space-x-2 mb-2">
                    <Cpu className="w-4 h-4 text-primary" />
                    <span className="text-foreground/75 text-xs md:text-sm font-mono">CPU_LOAD</span>
                  </div>
                  <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Memory Usage */}
                <div className="border border-foreground/10 rounded-lg p-3 md:p-4 bg-background/80">
                  <div className="flex items-center space-x-2 mb-2">
                    <Database className="w-4 h-4 text-complementary" />
                    <span className="text-foreground/75 text-xs md:text-sm font-mono">MEMORY_ALLOCATION</span>
                  </div>
                  <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-complementary"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress * 0.8}%` }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* System Messages */}
              <motion.div 
                className="border border-foreground/10 rounded-lg p-3 md:p-4 bg-background/80 font-mono"
                variants={itemVariants}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Code2 className="w-4 h-4 text-secondary" />
                  <span className="text-foreground/75 text-xs md:text-sm">SYSTEM_LOG</span>
                </div>
                <div className="space-y-1 md:space-y-2">
                  {systemMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-secondary"
                    >
                      {msg}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Binary Animation */}
              <motion.div 
                className="flex justify-center py-2"
                variants={itemVariants}
              >
                <div className="flex items-center space-x-2">
                  <Binary className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  <div className="flex space-x-1">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="text-xs font-mono"
                        animate={{
                          opacity: [0.2, 1, 0.2],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.1
                        }}
                      >
                        {Math.round(Math.random())}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Progress Bar */}
              <motion.div variants={itemVariants}>
                <div className="h-1 bg-foreground/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary via-complementary to-secondary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-2 flex flex-col sm:flex-row justify-between text-xs text-foreground/60 font-mono">
                  <span>PROGRESS: {progress}%</span>
                  <span className="mt-1 sm:mt-0">{phases[loadingPhase]}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;