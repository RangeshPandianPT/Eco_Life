import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EcoPetWidget = () => {
  const [streakDays, setStreakDays] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
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
  }, []);

  // Determine Pet Stage based on total points
  const getPetStage = () => {
    if (totalPoints < 50) return { icon: '🌱', label: 'Seedling', message: 'Ready to grow!' };
    if (totalPoints < 150) return { icon: '🌿', label: 'Young Sprout', message: 'Looking greener!' };
    if (totalPoints < 300) return { icon: '🪴', label: 'Potted Plant', message: 'Thriving!' };
    return { icon: '🌳', label: 'Mighty Tree', message: 'Absolutely blooming!' };
  };

  // Determine Pet Health based on streak
  const getPetHealth = () => {
    if (streakDays === 0) return { color: 'text-warning', bg: 'bg-warning/10', text: 'Needs attention 💧' };
    if (streakDays < 3) return { color: 'text-primary', bg: 'bg-primary/10', text: 'Doing well ☀️' };
    return { color: 'text-success', bg: 'bg-success/10', text: 'Super happy! ✨' };
  };

  const stage = getPetStage();
  const health = getPetHealth();

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-organic mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-foreground flex items-center gap-2">
          <span>🌍</span> Your Eco Pet
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${health.bg} ${health.color}`}>
          {health.text}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center py-6">
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="text-7xl mb-4 drop-shadow-md"
        >
          {stage.icon}
        </motion.div>
        
        <h4 className="text-xl font-bold text-foreground">{stage.label}</h4>
        <p className="text-sm text-muted-foreground mt-1">{stage.message}</p>
        
        <div className="w-full mt-6 space-y-3">
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Growth Progress</span>
              <span>{Math.min(totalPoints % 150, 150)} / 150 XP</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(((totalPoints % 150) / 150) * 100, 100)}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-success"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoPetWidget;
