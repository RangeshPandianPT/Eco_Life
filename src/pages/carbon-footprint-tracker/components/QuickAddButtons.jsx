import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickAddButtons = ({ onQuickAdd }) => {
  const quickActions = [
    {
      id: 'commute-car',
      label: 'Daily Commute (Car)',
      icon: 'Car',
      type: 'travel',
      data: { mode: 'car', distance: '25', frequency: '2' },
      co2Impact: '10.5',
      color: 'primary'
    },
    {
      id: 'lunch-meat',
      label: 'Meat Lunch',
      icon: 'ChefHat',
      type: 'food',
      data: { meal: 'lunch', portion: 'medium', type: 'meat' },
      co2Impact: '3.75',
      color: 'secondary'
    },
    {
      id: 'vegan-meal',
      label: 'Vegan Dinner',
      icon: 'Leaf',
      type: 'food',
      data: { meal: 'dinner', portion: 'medium', type: 'vegan' },
      co2Impact: '1.2',
      color: 'success'
    },
    {
      id: 'flight-short',
      label: 'Short Flight',
      icon: 'Plane',
      type: 'travel',
      data: { mode: 'flight', distance: '300', frequency: '1' },
      co2Impact: '75.0',
      color: 'warning'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary',
      secondary: 'border-secondary/20 bg-secondary/5 hover:bg-secondary/10 text-secondary',
      accent: 'border-accent/20 bg-accent/5 hover:bg-accent/10 text-accent',
      success: 'border-success/20 bg-success/5 hover:bg-success/10 text-success',
      warning: 'border-warning/20 bg-warning/5 hover:bg-warning/10 text-warning'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const handleQuickAdd = (action) => {
    onQuickAdd({
      type: action?.type,
      data: action?.data,
      co2Impact: action?.co2Impact,
      timestamp: new Date()
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-organic">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-bold text-card-foreground">
              Quick Add Activities
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Log common activities with preset values
            </p>
          </div>
          <Icon name="Zap" size={20} className="text-accent" />
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={() => handleQuickAdd(action)}
              className={`p-4 rounded-lg border-2 transition-organic text-left ${getColorClasses(action?.color)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${action?.color === 'success' ? 'bg-success/10' : action?.color === 'warning' ? 'bg-warning/10' : 'bg-current/10'}`}>
                  <Icon name={action?.icon} size={20} className="text-current" />
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-current">
                    {action?.co2Impact}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    kg CO₂
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-card-foreground text-sm mb-1">
                  {action?.label}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {action?.type === 'travel' && `${action?.data?.distance} miles, ${action?.data?.frequency}x`}
                  {action?.type === 'food' && `${action?.data?.portion} ${action?.data?.type} ${action?.data?.meal}`}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-sm">
              <p className="text-card-foreground font-medium mb-1">
                Customize Your Quick Actions
              </p>
              <p className="text-muted-foreground">
                These preset activities are based on average values. You can customize them in your profile settings to match your specific habits and preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAddButtons;