import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';

const WasteTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [wasteData, setWasteData] = useState({
    daily: {
      plastic: 0.15, // kg
      organic: 0.8,
      paper: 0.25,
      glass: 0.1,
      metal: 0.05,
      electronic: 0,
      other: 0.3
    },
    weekly: {
      total: 12.5,
      recycled: 8.2,
      composted: 3.1,
      landfill: 1.2
    },
    monthly: {
      total: 52.3,
      reduction: 18.5, // percentage reduction from last month
      goal: 40.0 // monthly goal in kg
    }
  });

  const [wasteEntries, setWasteEntries] = useState([
    {
      id: 1,
      date: '2025-12-02',
      type: 'plastic',
      amount: 0.15,
      description: 'Food packaging from lunch',
      category: 'Food Container',
      recyclable: false,
      timestamp: '14:30'
    },
    {
      id: 2,
      date: '2025-12-02',
      type: 'organic',
      amount: 0.8,
      description: 'Vegetable scraps from meal prep',
      category: 'Food Waste',
      recyclable: false,
      compostable: true,
      timestamp: '18:45'
    },
    {
      id: 3,
      date: '2025-12-01',
      type: 'paper',
      amount: 0.25,
      description: 'Amazon delivery box',
      category: 'Packaging',
      recyclable: true,
      timestamp: '16:20'
    }
  ]);

  const [newWasteEntry, setNewWasteEntry] = useState({
    type: 'plastic',
    amount: '',
    description: '',
    category: '',
    recyclable: false,
    compostable: false
  });

  const [showAddEntry, setShowAddEntry] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');

  const wasteTypes = [
    { id: 'plastic', name: 'Plastic', color: 'bg-red-500', icon: '🥤' },
    { id: 'organic', name: 'Organic', color: 'bg-green-500', icon: '🍎' },
    { id: 'paper', name: 'Paper', color: 'bg-blue-500', icon: '📄' },
    { id: 'glass', name: 'Glass', color: 'bg-emerald-500', icon: '🍾' },
    { id: 'metal', name: 'Metal', color: 'bg-gray-500', icon: '🥫' },
    { id: 'electronic', name: 'E-Waste', color: 'bg-purple-500', icon: '📱' },
    { id: 'other', name: 'Other', color: 'bg-orange-500', icon: '🗑️' }
  ];

  const categories = {
    plastic: ['Food Container', 'Beverage Bottle', 'Shopping Bag', 'Packaging', 'Other'],
    organic: ['Food Waste', 'Garden Waste', 'Food Scraps', 'Other'],
    paper: ['Newspaper', 'Magazines', 'Packaging', 'Office Paper', 'Other'],
    glass: ['Bottles', 'Jars', 'Other'],
    metal: ['Cans', 'Foil', 'Other'],
    electronic: ['Phone', 'Computer', 'Batteries', 'Other'],
    other: ['Textiles', 'Furniture', 'Miscellaneous']
  };

  const handleAddWasteEntry = () => {
    if (newWasteEntry.amount && newWasteEntry.description) {
      const entry = {
        id: wasteEntries.length + 1,
        date: selectedDate.toISOString().split('T')[0],
        ...newWasteEntry,
        amount: parseFloat(newWasteEntry.amount),
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      
      setWasteEntries([entry, ...wasteEntries]);
      
      // Update daily data
      setWasteData(prev => ({
        ...prev,
        daily: {
          ...prev.daily,
          [newWasteEntry.type]: prev.daily[newWasteEntry.type] + parseFloat(newWasteEntry.amount)
        }
      }));

      // Reset form
      setNewWasteEntry({
        type: 'plastic',
        amount: '',
        description: '',
        category: '',
        recyclable: false,
        compostable: false
      });
      setShowAddEntry(false);
    }
  };

  const getTotalDailyWaste = () => {
    return Object.values(wasteData.daily).reduce((sum, val) => sum + val, 0);
  };

  const getWasteTypeIcon = (type) => {
    return wasteTypes.find(w => w.id === type)?.icon || '🗑️';
  };

  const getRecyclingRate = () => {
    const total = wasteData.weekly.total;
    const diverted = wasteData.weekly.recycled + wasteData.weekly.composted;
    return ((diverted / total) * 100).toFixed(1);
  };

  const getWasteTrend = () => {
    // Simulate trend calculation
    return -18.5; // 18.5% reduction
  };

  const generateWasteInsights = () => {
    const insights = [];
    
    if (wasteData.daily.plastic > 0.2) {
      insights.push({
        type: 'warning',
        message: 'High plastic waste today. Consider bringing reusable containers.',
        icon: '⚠️'
      });
    }
    
    if (wasteData.daily.organic > 1.0) {
      insights.push({
        type: 'tip',
        message: 'Lots of food waste! Start composting to turn it into garden gold.',
        icon: '💡'
      });
    }
    
    if (getRecyclingRate() > 80) {
      insights.push({
        type: 'success',
        message: 'Excellent recycling rate! You\'re keeping waste out of landfills.',
        icon: '🎉'
      });
    }

    return insights;
  };

  return (
    <>
      <Helmet>
        <title>Waste Tracker - EcoLife | Monitor Your Environmental Impact</title>
        <meta name="description" content="Track and reduce your daily waste with detailed analytics, recycling insights, and personalized recommendations for a zero-waste lifestyle." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Header />
        
        <main className="container mx-auto px-4 lg:px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              ♻️ Waste Tracker
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Track, analyze, and reduce your environmental footprint
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div 
              className="bg-white rounded-xl p-4 shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-green-600">
                {getTotalDailyWaste().toFixed(1)} kg
              </div>
              <div className="text-sm text-gray-600">Today's Waste</div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-4 shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-blue-600">
                {getRecyclingRate()}%
              </div>
              <div className="text-sm text-gray-600">Recycling Rate</div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-4 shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-purple-600">
                {wasteData.monthly.reduction}%
              </div>
              <div className="text-sm text-gray-600">Monthly Reduction</div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-4 shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-orange-600">
                {(wasteData.monthly.goal - wasteData.monthly.total).toFixed(1)} kg
              </div>
              <div className="text-sm text-gray-600">To Goal</div>
            </motion.div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-white p-1 rounded-xl mb-8 shadow-md">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'daily', label: 'Daily Tracking', icon: '📅' },
              { id: 'analytics', label: 'Analytics', icon: '📈' },
              { id: 'goals', label: 'Goals', icon: '🎯' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedView(tab.id)}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all ${
                  selectedView === tab.id
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {selectedView === 'overview' && (
                <>
                  {/* Today's Waste Breakdown */}
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Waste Breakdown</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {wasteTypes.map((type) => (
                        <div key={type.id} className="text-center">
                          <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center text-white text-xl mx-auto mb-2`}>
                            {type.icon}
                          </div>
                          <div className="font-medium text-gray-800">{type.name}</div>
                          <div className="text-sm text-gray-600">{wasteData.daily[type.id].toFixed(2)} kg</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Add Waste */}
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-800">Quick Add Waste</h2>
                      <button
                        onClick={() => setShowAddEntry(!showAddEntry)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        + Add Entry
                      </button>
                    </div>

                    {showAddEntry && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Waste Type</label>
                            <select
                              value={newWasteEntry.type}
                              onChange={(e) => setNewWasteEntry({...newWasteEntry, type: e.target.value, category: ''})}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                              {wasteTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.icon} {type.name}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Amount (kg)</label>
                            <input
                              type="number"
                              step="0.01"
                              value={newWasteEntry.amount}
                              onChange={(e) => setNewWasteEntry({...newWasteEntry, amount: e.target.value})}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="0.25"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                              value={newWasteEntry.category}
                              onChange={(e) => setNewWasteEntry({...newWasteEntry, category: e.target.value})}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                              <option value="">Select category...</option>
                              {categories[newWasteEntry.type]?.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <input
                              type="text"
                              value={newWasteEntry.description}
                              onChange={(e) => setNewWasteEntry({...newWasteEntry, description: e.target.value})}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="Brief description..."
                            />
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={newWasteEntry.recyclable}
                              onChange={(e) => setNewWasteEntry({...newWasteEntry, recyclable: e.target.checked})}
                              className="mr-2"
                            />
                            Recyclable ♻️
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={newWasteEntry.compostable}
                              onChange={(e) => setNewWasteEntry({...newWasteEntry, compostable: e.target.checked})}
                              className="mr-2"
                            />
                            Compostable 🌱
                          </label>
                        </div>

                        <div className="flex space-x-3">
                          <button
                            onClick={handleAddWasteEntry}
                            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                          >
                            Add Entry
                          </button>
                          <button
                            onClick={() => setShowAddEntry(false)}
                            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Recent Entries */}
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Entries</h2>
                    <div className="space-y-4">
                      {wasteEntries.slice(0, 5).map((entry) => (
                        <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{getWasteTypeIcon(entry.type)}</span>
                            <div>
                              <div className="font-medium text-gray-800">
                                {entry.amount} kg - {entry.description}
                              </div>
                              <div className="text-sm text-gray-600">
                                {entry.category} • {entry.timestamp}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {entry.recyclable && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">♻️ Recyclable</span>}
                            {entry.compostable && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">🌱 Compostable</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {selectedView === 'analytics' && (
                <>
                  {/* Weekly Overview */}
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Waste Distribution</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Total Waste</span>
                        <span className="font-medium">{wasteData.weekly.total} kg</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-green-500 h-4 rounded-l-full" style={{width: `${(wasteData.weekly.recycled/wasteData.weekly.total)*100}%`}}></div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-green-600">{wasteData.weekly.recycled} kg</div>
                          <div className="text-gray-600">Recycled</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-orange-600">{wasteData.weekly.composted} kg</div>
                          <div className="text-gray-600">Composted</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-red-600">{wasteData.weekly.landfill} kg</div>
                          <div className="text-gray-600">Landfill</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trend Analysis */}
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Waste Trends</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">
                          {getWasteTrend() > 0 ? '+' : ''}{getWasteTrend()}%
                        </div>
                        <div className="text-gray-600">vs Last Month</div>
                        <div className="text-sm text-green-600 mt-2">
                          {getWasteTrend() < 0 ? '📉 Great reduction!' : '📈 Room for improvement'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{getRecyclingRate()}%</div>
                        <div className="text-gray-600">Diversion Rate</div>
                        <div className="text-sm text-blue-600 mt-2">
                          {parseFloat(getRecyclingRate()) > 75 ? '🎯 Excellent!' : '💪 Keep improving'}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Insights & Tips */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">💡 Smart Insights</h3>
                <div className="space-y-3">
                  {generateWasteInsights().map((insight, index) => (
                    <div key={index} className={`p-3 rounded-lg ${
                      insight.type === 'warning' ? 'bg-red-50 text-red-800' :
                      insight.type === 'success' ? 'bg-green-50 text-green-800' :
                      'bg-blue-50 text-blue-800'
                    }`}>
                      <div className="flex items-center space-x-2">
                        <span>{insight.icon}</span>
                        <span className="text-sm">{insight.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Goal */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">🎯 Monthly Goal</h3>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {wasteData.monthly.total}/{wasteData.monthly.goal} kg
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div 
                      className="bg-purple-500 h-3 rounded-full transition-all duration-500" 
                      style={{width: `${Math.min((wasteData.monthly.total/wasteData.monthly.goal)*100, 100)}%`}}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {wasteData.monthly.total < wasteData.monthly.goal ? 
                      `${(wasteData.monthly.goal - wasteData.monthly.total).toFixed(1)} kg remaining` :
                      'Goal exceeded! Time to set a new challenge.'
                    }
                  </div>
                </div>
              </div>

              {/* Waste Reduction Tips */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">🌱 Reduction Tips</h3>
                <div className="space-y-3">
                  {[
                    "Bring reusable bags when shopping",
                    "Choose products with minimal packaging", 
                    "Start a compost bin for organic waste",
                    "Repair items instead of discarding them",
                    "Buy in bulk to reduce packaging waste"
                  ].map((tip, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <span className="text-green-600">•</span>
                      <span className="text-sm text-green-800">{tip}</span>
                    </div>
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

export default WasteTracker;