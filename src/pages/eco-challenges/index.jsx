import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import { motion } from 'framer-motion';

const EcoChallenges = () => {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({
    level: 12,
    xp: 2340,
    xpToNext: 660,
    streak: 7,
    totalChallenges: 45,
    completedChallenges: 32
  });

  const [activeChallenges, setActiveChallenges] = useState([
    {
      id: 1,
      title: "Zero Waste Week",
      description: "Reduce your waste to less than 1kg for 7 days",
      difficulty: "Hard",
      xpReward: 500,
      progress: 4,
      total: 7,
      category: "Waste",
      icon: "♻️",
      timeLeft: "3 days left",
      participants: 1247
    },
    {
      id: 2,
      title: "Plastic-Free Shopping",
      description: "Complete 5 shopping trips without single-use plastics",
      difficulty: "Medium",
      xpReward: 300,
      progress: 2,
      total: 5,
      category: "Shopping",
      icon: "🛍️",
      timeLeft: "5 days left",
      participants: 856
    },
    {
      id: 3,
      title: "Green Commute Master",
      description: "Use eco-friendly transport for 10 consecutive days",
      difficulty: "Easy",
      xpReward: 200,
      progress: 7,
      total: 10,
      category: "Transport",
      icon: "🚴‍♀️",
      timeLeft: "2 weeks left",
      participants: 2103
    }
  ]);

  const [availableChallenges, setAvailableChallenges] = useState([
    {
      id: 4,
      title: "Energy Saver Pro",
      description: "Reduce home energy consumption by 20%",
      difficulty: "Medium",
      xpReward: 350,
      duration: "2 weeks",
      category: "Energy",
      icon: "⚡",
      participants: 934
    },
    {
      id: 5,
      title: "Local Food Champion",
      description: "Eat only locally sourced food for 10 days",
      difficulty: "Hard",
      xpReward: 450,
      duration: "10 days",
      category: "Food",
      icon: "🥬",
      participants: 567
    },
    {
      id: 6,
      title: "Water Warrior",
      description: "Reduce water usage by 30% for one month",
      difficulty: "Medium",
      xpReward: 400,
      duration: "1 month",
      category: "Water",
      icon: "💧",
      participants: 712
    }
  ]);

  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: "EcoWarrior_2025", level: 28, xp: 15420, avatar: "🌱" },
    { rank: 2, name: "GreenGuru", level: 26, xp: 14890, avatar: "🌿" },
    { rank: 3, name: "PlantBased_Pro", level: 25, xp: 14230, avatar: "🌳" },
    { rank: 4, name: "Alex (You)", level: 12, xp: 2340, avatar: "🌟" },
    { rank: 5, name: "SustainableSam", level: 11, xp: 2100, avatar: "♻️" }
  ]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const joinChallenge = (challengeId) => {
    const challenge = availableChallenges.find(c => c.id === challengeId);
    if (challenge) {
      setActiveChallenges([...activeChallenges, {
        ...challenge,
        progress: 0,
        total: parseInt(challenge.duration.split(' ')[0]) || 7,
        timeLeft: challenge.duration
      }]);
      setAvailableChallenges(availableChallenges.filter(c => c.id !== challengeId));
    }
  };

  const completeChallenge = (challengeId) => {
    setActiveChallenges(activeChallenges.filter(c => c.id !== challengeId));
    setUserStats(prev => ({
      ...prev,
      xp: prev.xp + 500,
      completedChallenges: prev.completedChallenges + 1
    }));
  };

  return (
    <>
      <Helmet>
        <title>Eco Challenges - EcoLife | Gamify Your Sustainable Journey</title>
        <meta name="description" content="Take on eco-friendly challenges, earn XP, level up, and compete with the community for a more sustainable lifestyle." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Header />
        
        <main className="container mx-auto px-4 lg:px-6 py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🏆 Eco Challenges
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Level up your sustainability game!
            </p>
          </div>

          {/* User Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">Level {userStats.level}</div>
                <div className="text-sm text-gray-500">Current Level</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${(userStats.xp / (userStats.xp + userStats.xpToNext)) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {userStats.xp} / {userStats.xp + userStats.xpToNext} XP
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-6 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">{userStats.streak}</div>
                <div className="text-sm text-gray-500">Day Streak 🔥</div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-6 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">{userStats.completedChallenges}</div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-6 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">#{leaderboard.find(l => l.name.includes('You'))?.rank}</div>
                <div className="text-sm text-gray-500">Global Rank</div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Challenges */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 Your Active Challenges</h2>
              {activeChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  className="bg-white rounded-xl p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{challenge.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{challenge.title}</h3>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-block px-2 py-1 rounded-full text-xs text-white ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">+{challenge.xpReward} XP</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{challenge.progress}/{challenge.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      👥 {challenge.participants} participants • {challenge.timeLeft}
                    </div>
                    {challenge.progress === challenge.total ? (
                      <button
                        onClick={() => completeChallenge(challenge.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Claim Reward 🎉
                      </button>
                    ) : (
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        Continue
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Available Challenges */}
              <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">🌟 Available Challenges</h2>
              {availableChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  className="bg-white rounded-xl p-6 shadow-lg border-2 border-dashed border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{challenge.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{challenge.title}</h3>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-block px-2 py-1 rounded-full text-xs text-white ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">+{challenge.xpReward} XP</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      👥 {challenge.participants} participants • {challenge.duration}
                    </div>
                    <button
                      onClick={() => joinChallenge(challenge.id)}
                      className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Join Challenge
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Leaderboard */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">🏆 Leaderboard</h2>
                <div className="space-y-3">
                  {leaderboard.map((user, index) => (
                    <div 
                      key={user.rank}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        user.name.includes('You') ? 'bg-yellow-100 border-2 border-yellow-300' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          user.rank === 1 ? 'bg-yellow-400 text-white' :
                          user.rank === 2 ? 'bg-gray-400 text-white' :
                          user.rank === 3 ? 'bg-orange-400 text-white' :
                          'bg-gray-200'
                        }`}>
                          #{user.rank}
                        </div>
                        <span className="text-lg">{user.avatar}</span>
                        <div>
                          <div className="font-medium text-gray-800">{user.name}</div>
                          <div className="text-xs text-gray-500">Level {user.level}</div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-600">
                        {user.xp.toLocaleString()} XP
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievement Showcase */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">🎖️ Recent Achievements</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <span className="text-2xl">🌱</span>
                    <div>
                      <div className="font-medium text-green-800">First Steps</div>
                      <div className="text-xs text-green-600">Complete your first challenge</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <span className="text-2xl">🔥</span>
                    <div>
                      <div className="font-medium text-blue-800">Week Warrior</div>
                      <div className="text-xs text-blue-600">7-day activity streak</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <span className="text-2xl">⭐</span>
                    <div>
                      <div className="font-medium text-purple-800">Level Up!</div>
                      <div className="text-xs text-purple-600">Reached level 12</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EcoChallenges;