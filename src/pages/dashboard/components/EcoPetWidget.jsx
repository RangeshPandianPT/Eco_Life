import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EcoPetWidget = () => {
  const [streakDays, setStreakDays] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedData = localStorage.getItem('eco-tools-missions');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setStreakDays(parsed.streakDays || 0);
          setTotalPoints(parsed.totalMissionPoints || 0);
        } catch (e) {
          console.error("Failed to parse eco-tools-missions", e);
        }
      }
    };
    
    // Initial fetch
    handleStorageChange();
    
    // Listen for cross-component updates
    window.addEventListener('eco-tools-missions-updated', handleStorageChange);
    return () => window.removeEventListener('eco-tools-missions-updated', handleStorageChange);
  }, []);

  const getPetEnvironment = () => {
    if (streakDays === 0) return { 
        bg: 'bg-gradient-to-b from-gray-500 to-gray-700', 
        sky: 'bg-gray-400', 
        sun: 'opacity-20 scale-75 blur-sm',
        weather: 'Smoggy' 
    };
    if (streakDays < 3) return { 
        bg: 'bg-gradient-to-b from-blue-300 to-emerald-200', 
        sky: 'bg-blue-300', 
        sun: 'opacity-80 scale-90',
        weather: 'Clear' 
    };
    return { 
        bg: 'bg-gradient-to-b from-cyan-300 to-green-400', 
        sky: 'bg-cyan-300', 
        sun: 'opacity-100 scale-100',
        weather: 'Vibrant' 
    };
  };

  const getPetStage = () => {
    if (totalPoints < 50) return { icon: '🌱', label: 'Seedling', msg: 'Water me with missions!' };
    if (totalPoints < 150) return { icon: '🌿', label: 'Young Sprout', msg: 'Growing strong!' };
    if (totalPoints < 300) return { icon: '🪴', label: 'Potted Plant', msg: 'So healthy!' };
    return { icon: '🌳', label: 'Mighty Tree', msg: 'Absolutely blooming!' };
  };

  const env = getPetEnvironment();
  const stage = getPetStage();

  return (
    <div className="bg-card border border-border rounded-xl p-0 overflow-hidden shadow-organic mb-8 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between z-10 bg-card/80 backdrop-blur-sm border-b border-border">
        <h3 className="font-heading font-bold text-foreground flex items-center gap-2">
          <span>🌍</span> Eco-Tamagotchi
        </h3>
        <div className="flex gap-2">
          <span className={`text-xs px-2 py-1 rounded-full font-bold ${streakDays > 0 ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
            {streakDays} Day Streak
          </span>
        </div>
      </div>

      {/* World View */}
      <div className={`relative h-48 w-full ${env.bg} overflow-hidden flex items-end justify-center transition-colors duration-1000`}>
        {/* Sun */}
        <motion.div 
          className={`absolute top-4 right-6 w-12 h-12 bg-yellow-300 rounded-full shadow-[0_0_20px_rgba(253,224,71,0.8)] transition-all duration-1000 ${env.sun}`}
          animate={streakDays > 0 ? { y: [0, -5, 0], scale: [1, 1.05, 1] } : {}}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
        
        {/* Clouds */}
        {streakDays > 0 && (
          <motion.div 
            className="absolute top-8 left-10 w-16 h-6 bg-white/60 rounded-full blur-[1px]"
            animate={{ x: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          />
        )}
        {streakDays === 0 && (
          <motion.div 
            className="absolute top-6 left-1/4 w-32 h-10 bg-gray-800/40 rounded-full blur-md"
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          />
        )}

        {/* Pet Character */}
        <motion.div
          className="relative z-10 text-7xl drop-shadow-lg mb-2"
          animate={{ 
             y: streakDays === 0 ? [0, 2, 0] : [0, -8, 0],
             rotate: streakDays === 0 ? [0, 2, -2, 0] : [0, -2, 2, 0] 
          }}
          transition={{ repeat: Infinity, duration: streakDays === 0 ? 4 : 2, ease: 'easeInOut' }}
        >
          {stage.icon}
          {streakDays === 0 && (
            <motion.div 
              className="absolute -top-2 -right-2 text-2xl"
              animate={{ y: [0, 5], opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              💧
            </motion.div>
          )}
        </motion.div>
        
        {/* Ground */}
        <div className="absolute bottom-0 w-[150%] left-[-25%] h-12 bg-black/10 backdrop-blur-[2px] rounded-t-[50%]" />
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-card">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h4 className="text-lg font-bold text-foreground">{stage.label}</h4>
            <p className="text-xs text-muted-foreground">{stage.msg}</p>
          </div>
          <div className="text-xs font-medium text-right px-2 py-1 bg-muted rounded-md text-muted-foreground">
            Environment: <span className="font-bold text-foreground">{env.weather}</span>
          </div>
        </div>
        
        {/* XP Bar */}
        <div className="w-full">
          <div className="flex justify-between text-[10px] text-muted-foreground mb-1 uppercase font-bold tracking-wider">
            <span>Growth Progress</span>
            <span>{totalPoints % 150} / 150 XP</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(((totalPoints % 150) / 150) * 100, 100)}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-success to-emerald-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoPetWidget;
