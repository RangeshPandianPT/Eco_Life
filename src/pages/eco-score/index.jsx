import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';

const EcoScore = () => {
  const [overallScore, setOverallScore] = useState(78);
  const [categoryScores, setCategoryScores] = useState({
    energy: { score: 85, trend: +5, weight: 25 },
    transportation: { score: 72, trend: +8, weight: 20 },
    waste: { score: 90, trend: -2, weight: 20 },
    water: { score: 68, trend: +12, weight: 15 },
    consumption: { score: 75, trend: +3, weight: 20 }
  });

  const [selectedCategory, setSelectedCategory] = useState('energy');
  const [scoreHistory, setScoreHistory] = useState([
    { month: 'Aug', score: 65 },
    { month: 'Sep', score: 69 },
    { month: 'Oct', score: 73 },
    { month: 'Nov', score: 76 },
    { month: 'Dec', score: 78 }
  ]);

  const [recommendations, setRecommendations] = useState({
    energy: [
      { 
        title: "Switch to LED Lighting",
        impact: "+8 points",
        difficulty: "Easy",
        description: "Replace remaining incandescent bulbs with LED alternatives",
        co2Reduction: "180 kg/year",
        costSaving: "$45/year"
      },
      {
        title: "Install Smart Thermostat", 
        impact: "+12 points",
        difficulty: "Medium",
        description: "Optimize heating and cooling with intelligent temperature control",
        co2Reduction: "420 kg/year",
        costSaving: "$120/year"
      }
    ],
    transportation: [
      {
        title: "Bike to Work 2x/week",
        impact: "+15 points", 
        difficulty: "Medium",
        description: "Replace car trips with cycling for nearby destinations",
        co2Reduction: "650 kg/year",
        costSaving: "$800/year"
      },
      {
        title: "Use Public Transit",
        impact: "+10 points",
        difficulty: "Easy", 
        description: "Take bus/train instead of driving for longer trips",
        co2Reduction: "890 kg/year",
        costSaving: "$1200/year"
      }
    ],
    waste: [
      {
        title: "Start Composting",
        impact: "+8 points",
        difficulty: "Easy",
        description: "Divert organic waste from landfills to create nutrient-rich soil",
        co2Reduction: "230 kg/year",
        costSaving: "$60/year"
      }
    ],
    water: [
      {
        title: "Install Low-Flow Fixtures",
        impact: "+12 points",
        difficulty: "Medium", 
        description: "Reduce water usage with efficient faucets and showerheads",
        co2Reduction: "150 kg/year",
        costSaving: "$180/year"
      }
    ],
    consumption: [
      {
        title: "Buy Second-Hand First",
        impact: "+10 points",
        difficulty: "Easy",
        description: "Check thrift stores and online marketplaces before buying new",
        co2Reduction: "320 kg/year", 
        costSaving: "$500/year"
      }
    ]
  });

  const [achievements, setAchievements] = useState([
    { name: "Eco Beginner", icon: "🌱", unlocked: true, description: "First score calculation" },
    { name: "Energy Saver", icon: "⚡", unlocked: true, description: "Energy score above 80" },
    { name: "Waste Warrior", icon: "♻️", unlocked: true, description: "Waste score above 85" },
    { name: "Green Commuter", icon: "🚴‍♀️", unlocked: false, description: "Transportation score above 80" },
    { name: "Water Guardian", icon: "💧", unlocked: false, description: "Water score above 80" },
    { name: "Eco Master", icon: "🏆", unlocked: false, description: "Overall score above 90" }
  ]);

  const [factors, setFactors] = useState({
    energy: {
      renewableEnergy: 70,
      energyEfficiency: 85,
      homeInsulation: 90,
      smartDevices: 65
    },
    transportation: {
      publicTransport: 60,
      walkingCycling: 80,
      carEfficiency: 75,
      airTravel: 45
    },
    waste: {
      recyclingRate: 95,
      compostingRate: 85,
      wasteReduction: 90,
      reusability: 90
    },
    water: {
      consumption: 70,
      efficiency: 65,
      greyWaterUse: 50,
      rainwaterHarvesting: 30
    },
    consumption: {
      sustainablePurchasing: 80,
      localSourcing: 70,
      minimalism: 75,
      organicFood: 85
    }
  });

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Exceptional';
    if (score >= 80) return 'Excellent'; 
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  const getTrendIcon = (trend) => {
    if (trend > 5) return '🚀';
    if (trend > 0) return '📈';
    if (trend < -5) return '📉';
    return '➡️';
  };

  const categoryDetails = {
    energy: {
      name: 'Energy Usage',
      icon: '⚡',
      color: 'bg-yellow-500',
      description: 'Your energy consumption and renewable usage patterns'
    },
    transportation: {
      name: 'Transportation',
      icon: '🚗',
      color: 'bg-blue-500', 
      description: 'Carbon footprint from your daily commute and travel'
    },
    waste: {
      name: 'Waste Management',
      icon: '♻️',
      color: 'bg-green-500',
      description: 'How effectively you reduce, reuse, and recycle'
    },
    water: {
      name: 'Water Usage',
      icon: '💧',
      color: 'bg-cyan-500',
      description: 'Water consumption and conservation practices'
    },
    consumption: {
      name: 'Consumption',
      icon: '🛒',
      color: 'bg-purple-500',
      description: 'Sustainable purchasing and consumption habits'
    }
  };

  const calculateProjectedImpact = () => {
    const currentRecommendations = recommendations[selectedCategory] || [];
    const totalImpact = currentRecommendations.reduce((sum, rec) => {
      return sum + parseInt(rec.impact.replace('+', '').replace(' points', ''));
    }, 0);
    
    return {
      scoreIncrease: totalImpact,
      newScore: Math.min(100, categoryScores[selectedCategory]?.score + totalImpact),
      co2Reduction: currentRecommendations.reduce((sum, rec) => 
        sum + parseInt(rec.co2Reduction.replace(' kg/year', '')), 0),
      costSaving: currentRecommendations.reduce((sum, rec) => 
        sum + parseInt(rec.costSaving.replace('$', '').replace('/year', '')), 0)
    };
  };

  return (
    <>
      <Helmet>
        <title>Eco Score Calculator - EcoLife | Measure Your Environmental Impact</title>
        <meta name="description" content="Calculate your comprehensive eco-score across energy, transportation, waste, water, and consumption categories. Get personalized recommendations to improve your environmental impact." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Header />
        
        <main className="container mx-auto px-4 lg:px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              📊 Eco Score Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Measure and improve your environmental impact
            </p>
          </div>

          {/* Overall Score Dashboard */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="stroke-gray-200"
                    strokeWidth="3"
                    fill="transparent"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="stroke-green-500"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="transparent"
                    strokeDasharray={`${overallScore}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">{overallScore}</div>
                    <div className="text-sm text-gray-600">Overall</div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
                  {getScoreLabel(overallScore)}
                </div>
                <div className="text-gray-600">Your current eco performance</div>
              </div>
            </div>

            {/* Score Trend */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {scoreHistory.map((point, index) => (
                <div key={point.month} className="text-center">
                  <div className="text-sm text-gray-600 mb-1">{point.month}</div>
                  <div className="h-20 flex items-end justify-center">
                    <div 
                      className="bg-green-500 rounded-t w-8 transition-all duration-500"
                      style={{ height: `${point.score}%` }}
                    ></div>
                  </div>
                  <div className="text-sm font-medium text-gray-800 mt-1">{point.score}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category Scores */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
                <div className="space-y-3">
                  {Object.entries(categoryScores).map(([category, data]) => (
                    <motion.button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full p-4 rounded-lg border-2 transition-all ${
                        selectedCategory === category 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{categoryDetails[category].icon}</span>
                          <div className="text-left">
                            <div className="font-medium text-gray-800">
                              {categoryDetails[category].name}
                            </div>
                            <div className="text-xs text-gray-500">
                              Weight: {data.weight}%
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(data.score)}`}>
                            {data.score}
                          </div>
                          <div className="flex items-center text-xs">
                            <span>{getTrendIcon(data.trend)}</span>
                            <span className={data.trend > 0 ? 'text-green-600' : 'text-red-600'}>
                              {data.trend > 0 ? '+' : ''}{data.trend}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Details */}
            <div className="lg:col-span-3 space-y-6">
              {/* Category Overview */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">{categoryDetails[selectedCategory].icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {categoryDetails[selectedCategory].name}
                    </h2>
                    <p className="text-gray-600">{categoryDetails[selectedCategory].description}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className={`text-3xl font-bold ${getScoreColor(categoryScores[selectedCategory]?.score)}`}>
                      {categoryScores[selectedCategory]?.score}
                    </div>
                    <div className="text-sm text-gray-600">{getScoreLabel(categoryScores[selectedCategory]?.score)}</div>
                  </div>
                </div>

                {/* Factor Breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(factors[selectedCategory] || {}).map(([factor, score]) => (
                    <div key={factor} className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-800">{score}</div>
                      <div className="text-xs text-gray-600 capitalize">
                        {factor.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                        <div 
                          className="bg-green-500 h-1 rounded-full transition-all duration-500"
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  💡 Personalized Recommendations
                </h3>
                <div className="space-y-4">
                  {(recommendations[selectedCategory] || []).map((rec, index) => (
                    <motion.div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{rec.title}</h4>
                        <div className="flex space-x-2">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            {rec.impact}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            rec.difficulty === 'Easy' ? 'bg-blue-100 text-blue-700' :
                            rec.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {rec.difficulty}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-green-600">
                          🌱 CO₂ Reduction: {rec.co2Reduction}
                        </div>
                        <div className="text-blue-600">
                          💰 Cost Saving: {rec.costSaving}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Projected Impact */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-3">🚀 Projected Impact</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        +{calculateProjectedImpact().scoreIncrease}
                      </div>
                      <div className="text-gray-600">Score Increase</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {calculateProjectedImpact().newScore}
                      </div>
                      <div className="text-gray-600">New Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">
                        {calculateProjectedImpact().co2Reduction} kg
                      </div>
                      <div className="text-gray-600">CO₂ Saved/Year</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">
                        ${calculateProjectedImpact().costSaving}
                      </div>
                      <div className="text-gray-600">Cost Savings/Year</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">🏆 Achievements</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.name}
                      className={`p-4 rounded-lg border-2 text-center ${
                        achievement.unlocked 
                          ? 'border-yellow-300 bg-yellow-50' 
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                      whileHover={{ scale: achievement.unlocked ? 1.05 : 1 }}
                    >
                      <div className="text-2xl mb-2">{achievement.icon}</div>
                      <div className="font-medium text-gray-800">{achievement.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{achievement.description}</div>
                      {achievement.unlocked && (
                        <div className="text-xs text-yellow-600 mt-2 font-medium">✓ Unlocked</div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EcoScore;