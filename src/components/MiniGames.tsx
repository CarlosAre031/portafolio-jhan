import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dices, Coins, Calculator, Gamepad2, 
  Sparkles, Trophy, Crown, Flame,
  ArrowLeft, X
} from 'lucide-react';

type GameState = {
  coinResult: string;
  coinFlipping: boolean;
  numberOne: string;
  numberTwo: string;
  numberResult: string;
  diceOne: number;
  diceTwo: number;
  diceRolling: boolean;
  diceSum: number;
};

const EnhancedMiniGames = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    coinResult: '',
    coinFlipping: false,
    numberOne: '',
    numberTwo: '',
    numberResult: '',
    diceOne: 1,
    diceTwo: 1,
    diceRolling: false,
    diceSum: 2,
  });

  // Efecto de sonido
  const playSound = (type: 'win' | 'click' | 'flip') => {
    const sounds = {
      win: new Audio('/sounds/win.mp3'),
      click: new Audio('/sounds/click.mp3'),
      flip: new Audio('/sounds/flip.mp3')
    };
    sounds[type].play().catch(() => {});
  };

  // Efecto de confeti
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  // Animación de moneda
  const flipCoin = () => {
    if (gameState.coinFlipping) return;
    
    playSound('flip');
    setGameState(prev => ({ ...prev, coinFlipping: true, coinResult: '' }));
    
    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'Cara' : 'Cruz';
      setGameState(prev => ({ 
        ...prev, 
        coinResult: result,
        coinFlipping: false 
      }));
      
      setScore(prev => prev + 10);
      setCombo(prev => prev + 1);
      if (combo > 2) setShowConfetti(true);
      playSound('win');
    }, 1500);
  };

  // Animación de dados
  const rollDice = () => {
    if (gameState.diceRolling) return;

    playSound('click');
    setGameState(prev => ({ ...prev, diceRolling: true }));

    let rolls = 0;
    const maxRolls = 10;
    const rollInterval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        diceOne: Math.floor(Math.random() * 6) + 1,
        diceTwo: Math.floor(Math.random() * 6) + 1,
      }));

      rolls++;
      if (rolls >= maxRolls) {
        clearInterval(rollInterval);
        const finalDice1 = Math.floor(Math.random() * 6) + 1;
        const finalDice2 = Math.floor(Math.random() * 6) + 1;
        
        setGameState(prev => ({
          ...prev,
          diceOne: finalDice1,
          diceTwo: finalDice2,
          diceSum: finalDice1 + finalDice2,
          diceRolling: false
        }));

        setScore(prev => prev + (finalDice1 + finalDice2));
        setCombo(prev => prev + 1);
        if (finalDice1 + finalDice2 > 10) setShowConfetti(true);
        playSound('win');
      }
    }, 100);
  };

  // Comparador de números con animación
  const compareNumbers = () => {
    if (!gameState.numberOne || !gameState.numberTwo) return;
    
    playSound('click');
    const num1 = parseInt(gameState.numberOne);
    const num2 = parseInt(gameState.numberTwo);
    
    setGameState(prev => ({ ...prev, numberResult: 'Calculando...' }));
    
    setTimeout(() => {
      let result = '';
      if (num1 > num2) {
        result = '¡Jugador 1 es el ganador! 🏆';
        setScore(prev => prev + num1);
      } else if (num2 > num1) {
        result = '¡Jugador 2 es el ganador! 🏆';
        setScore(prev => prev + num2);
      } else {
        result = '¡Empate! 🤝';
      }
      
      setGameState(prev => ({ ...prev, numberResult: result }));
      setCombo(prev => prev + 1);
      playSound('win');
    }, 1000);
  };

  // Componente de la moneda
  const Coin = ({ flipping, result }: { flipping: boolean; result: string }) => (
    <motion.div
      animate={flipping ? {
        rotateY: [0, 360, 720, 1080, 1440],
        scale: [1, 1.2, 1, 1.2, 1]
      } : {}}
      transition={{ duration: 1.5 }}
      className="w-32 h-32 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600
        flex items-center justify-center text-white text-2xl font-bold shadow-lg
        cursor-pointer hover:shadow-xl transition-shadow"
    >
      {!flipping && result ? result : '?'}
    </motion.div>
  );

  // Componente del dado
  const Dice = ({ value, rolling }: { value: number; rolling: boolean }) => {
    const dots = Array(value).fill(0);
    
    return (
      <motion.div
        animate={rolling ? {
          rotate: [0, 360, 720],
          scale: [1, 1.2, 1]
        } : {}}
        transition={{ duration: 0.5 }}
        className="w-20 h-20 bg-white rounded-xl shadow-lg flex flex-wrap p-4
          justify-center items-center gap-1"
      >
        {dots.map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 bg-primary rounded-full"
          />
        ))}
      </motion.div>
    );
  };

  // Efecto de confeti
  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array(50).fill(0).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            rotate: 0
          }}
          animate={{
            y: window.innerHeight + 20,
            rotate: 360,
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 0.5,
            repeat: Infinity
          }}
          className="absolute w-2 h-2 bg-primary rounded-full"
          style={{
            backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][
              Math.floor(Math.random() * 5)
            ]
          }}
        />
      ))}
    </div>
  );

  const games = [
    {
      id: 'coin',
      name: 'Cara o Cruz',
      icon: Coins,
      description: 'Prueba tu suerte con el lanzamiento de moneda',
      color: 'from-yellow-500 to-amber-600'
    },
    {
      id: 'numbers',
      name: 'Batalla Numérica',
      icon: Calculator,
      description: 'Compite por el número más alto',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'dice',
      name: 'Dados Mágicos',
      icon: Dices,
      description: 'Lanza los dados y suma puntos',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <>
      {showConfetti && <Confetti />}
      
      {/* Botón flotante con efectos */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(true);
          playSound('click');
        }}
        className="fixed bottom-8 right-8 z-50 bg-primary text-white p-4 rounded-full
          shadow-lg hover:shadow-xl hover:bg-complementary transition-all duration-300
          flex items-center space-x-2"
      >
        <Gamepad2 className="w-6 h-6" />
        <span className="hidden md:inline">¡Jugar!</span>
      </motion.button>

      {/* Modal con efectos */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setIsOpen(false);
                setSelectedGame(null);
              }}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-background rounded-xl shadow-xl w-full max-w-lg
                overflow-hidden border border-primary/20"
            >
              {/* Header con efectos */}
              <div className="relative p-6 border-b border-foreground/10
                bg-gradient-to-r from-primary/10 to-complementary/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r
                  from-primary to-complementary" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {selectedGame ? (
                      <button
                        onClick={() => setSelectedGame(null)}
                        className="p-2 hover:bg-foreground/10 rounded-full
                          transition-colors"
                      >
                        <ArrowLeft className="w-6 h-6 text-primary" />
                      </button>
                    ) : (
                      <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                    )}
                    <h3 className="text-xl font-bold text-foreground">
                      {selectedGame ? 
                        games.find(g => g.id === selectedGame)?.name : 
                        'Arcade de Mini Juegos'}
                    </h3>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <span className="text-lg font-bold text-foreground">
                        {score}
                      </span>
                    </div>
                    {combo > 1 && (
                      <div className="flex items-center space-x-1">
                        <Flame className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-bold text-foreground">
                          x{combo}
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setSelectedGame(null);
                      }}
                      className="p-2 hover:bg-foreground/10 rounded-full
                        transition-colors"
                    >
                      <X className="w-6 h-6 text-foreground/60" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Contenido del juego */}
              <div className="p-6 space-y-6">
                {!selectedGame ? (
                  <div className="grid gap-4">
                    {games.map((game) => (
                      <motion.button
                        key={game.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedGame(game.id);
                          playSound('click');
                        }}
                        className="w-full p-4 rounded-xl bg-gradient-to-r
                          from-primary/10 to-complementary/10
                          border border-foreground/10 group
                          hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-full bg-gradient-to-br ${game.color}
                            text-white transform transition-transform group-hover:scale-110
                            group-hover:rotate-12`}>
                            <game.icon className="w-6 h-6" />
                          </div>
                          <div className="text-left">
                            <h4 className="text-lg font-bold text-foreground">
                              {game.name}
                            </h4>
                            <p className="text-sm text-foreground/60">
                              {game.description}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-8">
                    {selectedGame === 'coin' && (
                      <div className="text-center space-y-6">
                        <div className="flex justify-center">
                          <Coin
                            flipping={gameState.coinFlipping}
                            result={gameState.coinResult}
                          />
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={flipCoin}
                          disabled={gameState.coinFlipping}
                          className="px-8 py-3 bg-primary text-white rounded-lg
                            hover:bg-complementary transition-colors duration-300
                            disabled:opacity-50 disabled:cursor-not-allowed
                            shadow-lg hover:shadow-xl"
                        >
                          {gameState.coinFlipping ? 'Lanzando...' : 'Lanzar Moneda'}
                        </motion.button>
                      </div>
                    )}
                    
                    {/* Juego de números */}
                    {selectedGame === 'numbers' && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <Crown className="w-5 h-5 text-yellow-500" />
                              <label className="text-sm font-bold text-foreground">
                                Jugador 1
                              </label>
                            </div>
                            <input
                              type="number"
                              value={gameState.numberOne}
                              onChange={(e) => setGameState(prev => ({
                                ...prev,
                                numberOne: e.target.value
                              }))}
                              className="w-full px-4 py-3 rounded-lg border 
                                border-foreground/10 bg-background-secondary 
                                text-foreground text-center text-2xl font-bold
                                focus:ring-2 focus:ring-primary focus:border-transparent
                                outline-none transition-all duration-300
                                placeholder-foreground/30"
                              placeholder="0"
                            />
                          </motion.div>

                          <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <Crown className="w-5 h-5 text-yellow-500" />
                              <label className="text-sm font-bold text-foreground">
                                Jugador 2
                              </label>
                            </div>
                            <input
                              type="number"
                              value={gameState.numberTwo}
                              onChange={(e) => setGameState(prev => ({
                                ...prev,
                                numberTwo: e.target.value
                              }))}
                              className="w-full px-4 py-3 rounded-lg border 
                                border-foreground/10 bg-background-secondary 
                                text-foreground text-center text-2xl font-bold
                                focus:ring-2 focus:ring-primary focus:border-transparent
                                outline-none transition-all duration-300
                                placeholder-foreground/30"
                              placeholder="0"
                            />
                          </motion.div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={compareNumbers}
                          disabled={!gameState.numberOne || !gameState.numberTwo}
                          className="w-full px-6 py-3 bg-primary text-white rounded-lg
                            hover:bg-complementary transition-colors duration-300
                            disabled:opacity-50 disabled:cursor-not-allowed
                            shadow-lg hover:shadow-xl flex items-center justify-center
                            space-x-2"
                        >
                          <Calculator className="w-5 h-5" />
                          <span>Comparar Números</span>
                        </motion.button>

                        <AnimatePresence mode="wait">
                          {gameState.numberResult && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-center"
                            >
                              <div className="inline-block px-6 py-3 rounded-lg
                                bg-gradient-to-r from-primary/20 to-complementary/20
                                text-foreground text-xl font-bold"
                              >
                                {gameState.numberResult}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Juego de dados */}
                    {selectedGame === 'dice' && (
                      <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-8 justify-items-center">
                          <motion.div
                            initial={{ rotate: -180, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            className="relative"
                          >
                            <Dice
                              value={gameState.diceOne}
                              rolling={gameState.diceRolling}
                            />
                            {!gameState.diceRolling && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2 w-6 h-6
                                  bg-primary text-white rounded-full
                                  flex items-center justify-center
                                  text-sm font-bold"
                              >
                                {gameState.diceOne}
                              </motion.div>
                            )}
                          </motion.div>

                          <motion.div
                            initial={{ rotate: 180, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            className="relative"
                          >
                            <Dice
                              value={gameState.diceTwo}
                              rolling={gameState.diceRolling}
                            />
                            {!gameState.diceRolling && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2 w-6 h-6
                                  bg-primary text-white rounded-full
                                  flex items-center justify-center
                                  text-sm font-bold"
                              >
                                {gameState.diceTwo}
                              </motion.div>
                            )}
                          </motion.div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={rollDice}
                          disabled={gameState.diceRolling}
                          className="w-full px-6 py-3 bg-primary text-white rounded-lg
                            hover:bg-complementary transition-colors duration-300
                            disabled:opacity-50 disabled:cursor-not-allowed
                            shadow-lg hover:shadow-xl flex items-center justify-center
                            space-x-2"
                        >
                          <Dices className="w-5 h-5" />
                          <span>{gameState.diceRolling ? 'Lanzando...' : 'Lanzar Dados'}</span>
                        </motion.button>

                        <AnimatePresence>
                          {!gameState.diceRolling && gameState.diceSum > 2 && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="text-center space-y-2"
                            >
                              <p className="text-lg text-foreground/70">Suma total</p>
                              <div className="inline-block px-6 py-3 rounded-lg
                                bg-gradient-to-r from-primary/20 to-complementary/20"
                              >
                                <span className="text-3xl font-bold text-foreground">
                                  {gameState.diceSum}
                                </span>
                              </div>
                              {gameState.diceSum === 12 && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="text-lg font-bold text-yellow-500
                                    flex items-center justify-center space-x-2"
                                >
                                  <Trophy className="w-5 h-5" />
                                  <span>¡Puntuación Perfecta!</span>
                                </motion.div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedMiniGames;