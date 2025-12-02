import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';

const TransportationTracker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('today');
  
  const [transportData, setTransportData] = useState({
    today: {
      totalDistance: 25.3,
      totalEmissions: 4.2, // kg CO2
      totalCost: 12.50,
      trips: [
        {
          id: 1,
          type: 'car',
          from: 'Home',
          to: 'Office', 
          distance: 12.5,
          emissions: 3.8,
          cost: 8.50,
          time: '08:30',
          duration: 25,
          notes: 'Heavy traffic'
        },
        {
          id: 2,
          type: 'walk',
          from: 'Office',
          to: 'Lunch',
          distance: 1.2,
          emissions: 0,
          cost: 0,
          time: '12:15',
          duration: 15,
          notes: 'Beautiful weather'
        },
        {
          id: 3,
          type: 'bus',
          from: 'Lunch',
          to: 'Home',
          distance: 11.6,
          emissions: 0.4,
          cost: 4.00,
          time: '17:45',
          duration: 35,
          notes: 'Used transit app'
        }
      ]
    },
    weekly: {
      totalDistance: 156.8,
      totalEmissions: 23.4,
      totalCost: 89.30,
      byMode: {
        car: { distance: 78.5, emissions: 18.2, cost: 65.30, percentage: 50 },
        bus: { distance: 45.3, emissions: 3.8, cost: 20.00, percentage: 29 },
        bike: { distance: 23.0, emissions: 0, cost: 0, percentage: 15 },
        walk: { distance: 10.0, emissions: 0, cost: 0, percentage: 6 },
        train: { distance: 0, emissions: 0, cost: 0, percentage: 0 }
      }
    },
    goals: {
      weeklyEmissions: 20.0, // target kg CO2
      weeklyDistance: 150.0,
      ecoModePercentage: 60, // percentage of trips using eco-friendly transport
      currentEcoPercentage: 44
    }
  });

  const [newTrip, setNewTrip] = useState({
    type: 'car',
    from: '',
    to: '',
    distance: '',
    notes: '',
    time: new Date().toTimeString().slice(0, 5)
  });

  const [showAddTrip, setShowAddTrip] = useState(false);
  const [alternativeRoutes, setAlternativeRoutes] = useState([]);
  const [showAlternatives, setShowAlternatives] = useState(false);

  const transportModes = {
    car: { 
      name: 'Car', 
      icon: '🚗', 
      color: 'bg-red-500', 
      emissions: 0.304, // kg CO2 per km
      cost: 0.68, // $ per km
      eco: false
    },
    bus: { 
      name: 'Bus', 
      icon: '🚌', 
      color: 'bg-blue-500', 
      emissions: 0.034,
      cost: 0.15,
      eco: true
    },
    train: { 
      name: 'Train', 
      icon: '🚊', 
      color: 'bg-purple-500', 
      emissions: 0.028,
      cost: 0.12,
      eco: true
    },
    bike: { 
      name: 'Bike', 
      icon: '🚴‍♀️', 
      color: 'bg-green-500', 
      emissions: 0,
      cost: 0,
      eco: true
    },
    walk: { 
      name: 'Walk', 
      icon: '🚶‍♀️', 
      color: 'bg-emerald-500', 
      emissions: 0,
      cost: 0,
      eco: true
    },
    carpool: { 
      name: 'Carpool', 
      icon: '🚗👥', 
      color: 'bg-orange-500', 
      emissions: 0.152,
      cost: 0.34,
      eco: true
    },
    scooter: { 
      name: 'E-Scooter', 
      icon: '🛴', 
      color: 'bg-pink-500', 
      emissions: 0.05,
      cost: 0.25,
      eco: true
    }
  };

  const handleAddTrip = () => {
    if (newTrip.from && newTrip.to && newTrip.distance) {
      const distance = parseFloat(newTrip.distance);
      const mode = transportModes[newTrip.type];
      
      const trip = {
        id: transportData.today.trips.length + 1,
        ...newTrip,
        distance,
        emissions: distance * mode.emissions,
        cost: distance * mode.cost,
        duration: Math.round(distance * (mode.name === 'Walk' ? 12 : mode.name === 'Bike' ? 4 : 3))
      };

      setTransportData(prev => ({
        ...prev,
        today: {
          ...prev.today,
          trips: [trip, ...prev.today.trips],
          totalDistance: prev.today.totalDistance + distance,
          totalEmissions: prev.today.totalEmissions + trip.emissions,
          totalCost: prev.today.totalCost + trip.cost
        }
      }));

      setNewTrip({
        type: 'car',
        from: '',
        to: '',
        distance: '',
        notes: '',
        time: new Date().toTimeString().slice(0, 5)
      });
      setShowAddTrip(false);
    }
  };

  const generateAlternatives = (trip) => {
    const alternatives = Object.entries(transportModes)
      .filter(([mode]) => mode !== trip.type)
      .map(([mode, details]) => ({
        mode,
        name: details.name,
        icon: details.icon,
        emissions: trip.distance * details.emissions,
        cost: trip.distance * details.cost,
        emissionsSaved: trip.emissions - (trip.distance * details.emissions),
        costSaved: trip.cost - (trip.distance * details.cost),
        duration: Math.round(trip.distance * (details.name === 'Walk' ? 12 : details.name === 'Bike' ? 4 : 3))
      }))
      .filter(alt => alt.emissionsSaved > 0)
      .sort((a, b) => b.emissionsSaved - a.emissionsSaved);

    setAlternativeRoutes(alternatives);
    setShowAlternatives(true);
  };

  const getEcoModePercentage = () => {
    const totalTrips = transportData.today.trips.length;
    const ecoTrips = transportData.today.trips.filter(trip => 
      transportModes[trip.type].eco
    ).length;
    
    return totalTrips > 0 ? Math.round((ecoTrips / totalTrips) * 100) : 0;
  };

  const getWeeklyProgress = () => {
    const current = transportData.weekly.totalEmissions;
    const target = transportData.goals.weeklyEmissions;
    return Math.min(100, (current / target) * 100);
  };

  const getTotalSavingsFromEco = () => {
    const ecoTrips = transportData.today.trips.filter(trip => 
      transportModes[trip.type].eco && trip.type !== 'car'
    );
    
    return ecoTrips.reduce((total, trip) => {
      const carEmissions = trip.distance * transportModes.car.emissions;
      const carCost = trip.distance * transportModes.car.cost;
      return {
        emissions: total.emissions + (carEmissions - trip.emissions),
        cost: total.cost + (carCost - trip.cost)
      };
    }, { emissions: 0, cost: 0 });
  };

  return (
    <>
      <Helmet>
        <title>Transportation Tracker - EcoLife | Monitor Your Carbon Footprint</title>
        <meta name="description" content="Track your daily transportation choices, calculate carbon emissions, and discover eco-friendly alternatives to reduce your environmental impact." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Header />
        
        <main className="container mx-auto px-4 lg:px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🚗 Transportation Tracker
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Monitor your journey's environmental impact
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div 
              className="bg-white rounded-xl p-4 shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-blue-600">
                {transportData.today.totalDistance.toFixed(1)} km
              </div>
              <div className="text-sm text-gray-600">Today's Distance</div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-4 shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-red-600">
                {transportData.today.totalEmissions.toFixed(1)} kg
              </div>
              <div className="text-sm text-gray-600">CO₂ Emissions</div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-4 shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-green-600">
                {getEcoModePercentage()}%
              </div>
              <div className="text-sm text-gray-600">Eco Transport</div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-4 shadow-lg text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-purple-600">
                ${transportData.today.totalCost.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Today's Cost</div>
            </motion.div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-white p-1 rounded-xl mb-8 shadow-md">
            {[
              { id: 'today', label: "Today's Trips", icon: '📅' },
              { id: 'weekly', label: 'Weekly Overview', icon: '📊' },
              { id: 'alternatives', label: 'Route Planner', icon: '🗺️' },
              { id: 'goals', label: 'Goals & Targets', icon: '🎯' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {activeTab === 'today' && (
                <>
                  {/* Add Trip Section */}
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-gray-800">Today's Trips</h2>
                      <button
                        onClick={() => setShowAddTrip(!showAddTrip)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        + Add Trip
                      </button>
                    </div>

                    {showAddTrip && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Transport Mode</label>
                            <select
                              value={newTrip.type}
                              onChange={(e) => setNewTrip({...newTrip, type: e.target.value})}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            >
                              {Object.entries(transportModes).map(([mode, details]) => (
                                <option key={mode} value={mode}>
                                  {details.icon} {details.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                            <input
                              type="text"
                              value={newTrip.from}
                              onChange={(e) => setNewTrip({...newTrip, from: e.target.value})}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                              placeholder="Starting location"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                            <input
                              type="text"
                              value={newTrip.to}
                              onChange={(e) => setNewTrip({...newTrip, to: e.target.value})}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                              placeholder="Destination"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Distance (km)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={newTrip.distance}
                              onChange={(e) => setNewTrip({...newTrip, distance: e.target.value})}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                              placeholder="12.5"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <input
                              type="time"
                              value={newTrip.time}
                              onChange={(e) => setNewTrip({...newTrip, time: e.target.value})}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                            <input
                              type="text"
                              value={newTrip.notes}
                              onChange={(e) => setNewTrip({...newTrip, notes: e.target.value})}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                              placeholder="Optional notes"
                            />
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          <button
                            onClick={handleAddTrip}
                            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                          >
                            Add Trip
                          </button>
                          <button
                            onClick={() => setShowAddTrip(false)}
                            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Trip List */}
                    <div className="space-y-4">
                      {transportData.today.trips.map((trip, index) => (
                        <motion.div
                          key={trip.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-full ${transportModes[trip.type].color} flex items-center justify-center text-white`}>
                              {transportModes[trip.type].icon}
                            </div>
                            <div>
                              <div className="font-medium text-gray-800">
                                {trip.from} → {trip.to}
                              </div>
                              <div className="text-sm text-gray-600">
                                {trip.time} • {trip.distance} km • {trip.duration} min
                              </div>
                              {trip.notes && (
                                <div className="text-xs text-gray-500 italic">{trip.notes}</div>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-right space-y-1">
                            <div className="flex space-x-4 text-sm">
                              <span className="text-red-600">
                                {trip.emissions.toFixed(2)} kg CO₂
                              </span>
                              <span className="text-blue-600">
                                ${trip.cost.toFixed(2)}
                              </span>
                            </div>
                            <button
                              onClick={() => generateAlternatives(trip)}
                              className="text-xs text-green-600 hover:text-green-800 transition-colors"
                            >
                              See alternatives →
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'weekly' && (
                <>
                  {/* Weekly Overview */}
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Weekly Transportation Breakdown</h2>
                    
                    <div className="space-y-4">
                      {Object.entries(transportData.weekly.byMode).map(([mode, data]) => (
                        <div key={mode} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-full ${transportModes[mode].color} flex items-center justify-center text-white`}>
                              {transportModes[mode].icon}
                            </div>
                            <div>
                              <div className="font-medium text-gray-800">{transportModes[mode].name}</div>
                              <div className="text-sm text-gray-600">{data.distance} km • {data.percentage}%</div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-red-600 font-medium">{data.emissions.toFixed(1)} kg CO₂</div>
                            <div className="text-blue-600 text-sm">${data.cost.toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Weekly Totals */}
                    <div className="mt-6 grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{transportData.weekly.totalDistance} km</div>
                        <div className="text-sm text-blue-800">Total Distance</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{transportData.weekly.totalEmissions} kg</div>
                        <div className="text-sm text-red-800">Total Emissions</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">${transportData.weekly.totalCost}</div>
                        <div className="text-sm text-green-800">Total Cost</div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'goals' && (
                <>
                  {/* Goals & Progress */}
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Your Goals & Progress</h2>
                    
                    <div className="space-y-6">
                      {/* Weekly Emissions Goal */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-800">Weekly Emissions Target</span>
                          <span className="text-sm text-gray-600">
                            {transportData.weekly.totalEmissions.toFixed(1)} / {transportData.goals.weeklyEmissions} kg CO₂
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 ${
                              getWeeklyProgress() <= 100 ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(getWeeklyProgress(), 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {getWeeklyProgress() <= 100 
                            ? `${(transportData.goals.weeklyEmissions - transportData.weekly.totalEmissions).toFixed(1)} kg remaining` 
                            : `${(transportData.weekly.totalEmissions - transportData.goals.weeklyEmissions).toFixed(1)} kg over target`
                          }
                        </div>
                      </div>

                      {/* Eco Mode Goal */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-800">Eco-Friendly Transport Target</span>
                          <span className="text-sm text-gray-600">
                            {transportData.goals.currentEcoPercentage}% / {transportData.goals.ecoModePercentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(transportData.goals.currentEcoPercentage / transportData.goals.ecoModePercentage) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Achievement Prediction */}
                    <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                      <h3 className="font-bold text-gray-800 mb-3">🎯 Goal Achievement Forecast</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-green-700">Emissions Goal</div>
                          <div className="text-gray-600">
                            {getWeeklyProgress() <= 100 ? '✅ On track!' : '⚠️ Needs adjustment'}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-blue-700">Eco Transport Goal</div>
                          <div className="text-gray-600">
                            {transportData.goals.currentEcoPercentage >= transportData.goals.ecoModePercentage 
                              ? '✅ Target achieved!' 
                              : '📈 Keep improving!'
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Alternative Routes Modal */}
              {showAlternatives && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">🌱 Eco-Friendly Alternatives</h3>
                    <button
                      onClick={() => setShowAlternatives(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {alternativeRoutes.map((alt, index) => (
                      <motion.div
                        key={alt.mode}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl">{alt.icon}</span>
                          <div>
                            <div className="font-medium text-gray-800">{alt.name}</div>
                            <div className="text-sm text-gray-600">~{alt.duration} minutes</div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-green-600 font-medium">
                            -{alt.emissionsSaved.toFixed(2)} kg CO₂
                          </div>
                          <div className="text-blue-600 text-sm">
                            ${alt.costSaved > 0 ? '-' : '+'}${Math.abs(alt.costSaved).toFixed(2)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Today's Impact */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">🌍 Today's Impact</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">CO₂ Emissions</span>
                    <span className="font-medium text-red-600">
                      {transportData.today.totalEmissions.toFixed(1)} kg
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Eco Trips</span>
                    <span className="font-medium text-green-600">
                      {getEcoModePercentage()}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Money Saved</span>
                    <span className="font-medium text-blue-600">
                      ${getTotalSavingsFromEco().cost.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">💡 Smart Tips</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-800">🚴‍♀️ Bike More</div>
                    <div className="text-sm text-green-600">
                      Cycling 5km saves 1.5kg CO₂ vs driving
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-800">🚌 Public Transit</div>
                    <div className="text-sm text-blue-600">
                      Use apps for real-time schedules
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-medium text-purple-800">🚗👥 Carpool</div>
                    <div className="text-sm text-purple-600">
                      Share rides to cut emissions by 50%
                    </div>
                  </div>
                </div>
              </div>

              {/* Transportation Modes */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4">🚗 Mode Comparison</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(transportModes).slice(0, 5).map(([mode, details]) => (
                    <div key={mode} className="flex items-center justify-between py-1">
                      <div className="flex items-center space-x-2">
                        <span>{details.icon}</span>
                        <span className="text-gray-700">{details.name}</span>
                      </div>
                      <span className="text-gray-600">
                        {details.emissions.toFixed(3)} kg/km
                      </span>
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

export default TransportationTracker;