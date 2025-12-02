import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActionsPanel = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'scan-product',
      title: 'Scan Product',
      description: 'Check eco-friendliness instantly',
      icon: 'QrCode',
      color: 'bg-primary text-primary-foreground',
      hoverColor: 'hover:bg-primary/90',
      route: '/product-details',
      stats: '127 scans this month'
    },
    {
      id: 'log-activity',
      title: 'Log Activity',
      description: 'Track your carbon footprint',
      icon: 'Plus',
      color: 'bg-success text-success-foreground',
      hoverColor: 'hover:bg-success/90',
      route: '/carbon-footprint-tracker',
      stats: '15 activities logged today'
    },
    {
      id: 'view-meal-plan',
      title: 'View Meal Plan',
      description: 'Your sustainable meal schedule',
      icon: 'ChefHat',
      color: 'bg-accent text-accent-foreground',
      hoverColor: 'hover:bg-accent/90',
      route: '/ai-meal-planner',
      stats: 'Next meal: Quinoa Bowl'
    },
    {
      id: 'browse-marketplace',
      title: 'Browse Products',
      description: 'Discover eco-friendly alternatives',
      icon: 'Search',
      color: 'bg-secondary text-secondary-foreground',
      hoverColor: 'hover:bg-secondary/90',
      route: '/product-details',
      stats: '2,847 eco products available'
    }
  ];

  const handleActionClick = (route) => {
    navigate(route);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-organic">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-card-foreground">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">Jump to your most-used features</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action?.route)}
            className={`${action?.color} ${action?.hoverColor} p-4 rounded-lg transition-organic group relative overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-2 -right-2 w-16 h-16 rounded-full bg-white/20"></div>
              <div className="absolute -bottom-2 -left-2 w-12 h-12 rounded-full bg-white/10"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon name={action?.icon} size={20} />
                </div>
                <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="text-left">
                <h3 className="font-semibold text-sm mb-1">{action?.title}</h3>
                <p className="text-xs opacity-90 mb-2 leading-relaxed">{action?.description}</p>
                <div className="text-xs opacity-75 font-medium">{action?.stats}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Additional Quick Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-heading font-bold text-primary">47</div>
            <div className="text-xs text-muted-foreground">Products Scanned</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading font-bold text-success">12</div>
            <div className="text-xs text-muted-foreground">Activities Logged</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading font-bold text-accent">5</div>
            <div className="text-xs text-muted-foreground">Meal Plans Created</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading font-bold text-secondary">23</div>
            <div className="text-xs text-muted-foreground">Eco Products Saved</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;