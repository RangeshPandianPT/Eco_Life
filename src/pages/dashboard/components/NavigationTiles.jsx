import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const NavigationTiles = () => {
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: 'meal-planner',
      title: 'AI Meal Planner',
      description: 'Smart meal planning with sustainability focus',
      icon: 'ChefHat',
      route: '/ai-meal-planner',
      color: 'bg-gradient-to-br from-accent to-accent/80',
      stats: '5 active plans',
      usage: 'Used 3 times this week',
      features: ['Weekly Planning', 'Carbon Tracking', 'Recipe Suggestions']
    },
    {
      id: 'grocery-lists',
      title: 'Grocery Generator',
      description: 'Optimized shopping lists for eco-friendly choices',
      icon: 'ShoppingCart',
      route: '/grocery-plan-generator',
      color: 'bg-gradient-to-br from-success to-success/80',
      stats: '2 lists ready',
      usage: 'Last used yesterday',
      features: ['Cost Optimization', 'Local Sourcing', 'Nutrition Balance']
    },
    {
      id: 'eco-challenges',
      title: 'Eco Challenges',
      description: 'Level up your sustainability game with fun challenges',
      icon: 'Trophy',
      route: '/eco-challenges',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      stats: 'Level 12',
      usage: '3 active challenges',
      features: ['XP System', 'Leaderboards', 'Weekly Goals']
    },
    {
      id: 'community',
      title: 'Community Hub',
      description: 'Connect with eco-warriors and share tips',
      icon: 'Users',
      route: '/community-hub',
      color: 'bg-gradient-to-br from-secondary to-secondary/80',
      stats: '1.2k members',
      usage: '23 new posts today',
      features: ['Recipe Sharing', 'Eco Tips', 'Group Challenges']
    },
    {
      id: 'waste-tracker',
      title: 'Waste Tracker',
      description: 'Monitor and reduce your daily waste footprint',
      icon: 'Recycle',
      route: '/waste-tracker',
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      stats: '1.2kg today',
      usage: '85% recycling rate',
      features: ['Daily Tracking', 'Analytics', 'Reduction Tips']
    },
    {
      id: 'eco-score',
      title: 'Eco Score',
      description: 'Calculate your comprehensive environmental impact',
      icon: 'BarChart',
      route: '/eco-score',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      stats: 'Score: 78/100',
      usage: '+5 points this week',
      features: ['Category Analysis', 'Recommendations', 'Progress Tracking']
    },
    {
      id: 'transportation',
      title: 'Transport Tracker',
      description: 'Track and optimize your daily commute impact',
      icon: 'Car',
      route: '/transportation-tracker',
      color: 'bg-gradient-to-br from-orange-500 to-red-500',
      stats: '4.2kg CO₂ today',
      usage: '44% eco transport',
      features: ['Route Planning', 'Emissions Calc', 'Alternatives']
    },
    {
      id: 'carbon-tracker',
      title: 'Carbon Tracker',
      description: 'Monitor and reduce your environmental impact',
      icon: 'TreePine',
      route: '/carbon-footprint-tracker',
      color: 'bg-gradient-to-br from-primary to-primary/80',
      stats: '68.2kg saved',
      usage: 'Updated 2 hours ago',
      features: ['Daily Tracking', 'Impact Analysis', 'Goal Setting']
    }
  ];

  const handleTileClick = (route) => {
    navigate(route);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-organic">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-card-foreground">Quick Navigation</h2>
          <p className="text-sm text-muted-foreground">Access your favorite features instantly</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">All systems active</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {navigationItems?.map((item) => (
          <button
            key={item?.id}
            onClick={() => handleTileClick(item?.route)}
            className={`${item?.color} text-white p-6 rounded-xl transition-organic hover:scale-105 group relative overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10"></div>
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon name={item?.icon} size={24} />
                </div>
                <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Content */}
              <div className="text-left">
                <h3 className="font-heading font-bold text-lg mb-2">{item?.title}</h3>
                <p className="text-sm opacity-90 mb-4 leading-relaxed">{item?.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium opacity-95">{item?.stats}</span>
                  <span className="text-xs opacity-75">{item?.usage}</span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {item?.features?.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-white/20 rounded-full opacity-90"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Usage Statistics */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-heading font-bold text-accent">15</div>
            <div className="text-xs text-muted-foreground">Meal Plans Created</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading font-bold text-success">8</div>
            <div className="text-xs text-muted-foreground">Grocery Lists</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading font-bold text-secondary">42</div>
            <div className="text-xs text-muted-foreground">Community Posts</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading font-bold text-primary">127</div>
            <div className="text-xs text-muted-foreground">Carbon Entries</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationTiles;