import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Droplet, Sun, Wind } from 'lucide-react';

const EcoTamagotchi = () => {
  const [streak, setStreak] = useState(12);
  const [points, setPoints] = useState(450);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-green-800 dark:text-green-300 flex items-center gap-2">
          <Leaf className="w-8 h-8" />
          Eco-Tamagotchi
        </h1>
        <div className="flex gap-4">
          <div className="bg-white dark:bg-gray-700 px-4 py-2 rounded-full shadow flex items-center gap-2">
            <Award className="text-yellow-500 w-5 h-5" />
            <span className="font-bold text-gray-700 dark:text-gray-200">{streak} Day Streak</span>
          </div>
          <div className="bg-white dark:bg-gray-700 px-4 py-2 rounded-full shadow flex items-center gap-2">
            <Leaf className="text-green-500 w-5 h-5" />
            <span className="font-bold text-gray-700 dark:text-gray-200">{points} Eco Points</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center relative w-full max-w-lg">
        {/* Virtual Pet (A glowing tree) */}
        <motion.div 
          animate={{ y: [0, -15, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-64 h-64 bg-green-400 rounded-full blur-2xl absolute opacity-30"
        />
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20 text-[12rem]"
        >
          🌳
        </motion.div>

        {/* Status panel */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full border border-green-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">Your Environment is Thriving!</h2>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-xl flex flex-col items-center hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
              <Droplet className="text-blue-500 w-8 h-8 mb-2" />
              <span className="text-sm font-medium dark:text-gray-300">Hydration</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">100%</span>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-gray-700 rounded-xl flex flex-col items-center hover:bg-yellow-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
              <Sun className="text-yellow-500 w-8 h-8 mb-2" />
              <span className="text-sm font-medium dark:text-gray-300">Energy</span>
              <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">95%</span>
            </div>
            <div className="p-4 bg-teal-50 dark:bg-gray-700 rounded-xl flex flex-col items-center hover:bg-teal-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
              <Wind className="text-teal-500 w-8 h-8 mb-2" />
              <span className="text-sm font-medium dark:text-gray-300">Air Quality</span>
              <span className="text-lg font-bold text-teal-600 dark:text-teal-400">Great</span>
            </div>
          </div>

          <button onClick={() => setPoints(points + 10)} className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg flex items-center justify-center gap-2">
            <Droplet className="w-5 h-5" />
            Water Plant (+10 points)
          </button>
        </div>
      </div>
    </div>
  );
};

export default EcoTamagotchi;
