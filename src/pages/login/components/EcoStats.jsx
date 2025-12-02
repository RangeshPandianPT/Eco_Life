import React from 'react';
import Icon from '../../../components/AppIcon';

const EcoStats = () => {
  const communityStats = [
    {
      icon: 'Users',
      value: '50K+',
      label: 'Eco Warriors',
      color: 'text-primary'
    },
    {
      icon: 'TreePine',
      value: '2.3M kg',
      label: 'CO₂ Saved',
      color: 'text-success'
    },
    {
      icon: 'Leaf',
      value: '1.8M',
      label: 'Sustainable Choices',
      color: 'text-accent'
    },
    {
      icon: 'Award',
      value: '95%',
      label: 'User Satisfaction',
      color: 'text-secondary'
    }
  ];

  const recentAchievements = [
    "Sarah M. saved 12kg CO₂ this month",
    "Community reached 2M sustainable choices",
    "New partnership with 500+ eco brands",
    "AI meal planner improved 40% efficiency"
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-primary/5 to-success/5 border border-primary/10 rounded-lg p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mx-auto mb-3">
            <Icon name="TrendingUp" size={24} color="var(--color-success)" />
          </div>
          <h3 className="font-bold text-lg text-foreground mb-2">Join Our Impact</h3>
          <p className="text-sm text-muted-foreground">
            Be part of a growing community making a difference
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {communityStats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`${stat?.color} mb-1`}>
                <Icon name={stat?.icon} size={20} />
              </div>
              <div className="font-bold text-lg text-foreground">{stat?.value}</div>
              <div className="text-xs text-muted-foreground">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Achievements */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-foreground mb-3 flex items-center">
            <Icon name="Sparkles" size={16} className="mr-2 text-accent" />
            Recent Community Wins
          </h4>
          {recentAchievements?.slice(0, 2)?.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-xs text-muted-foreground leading-relaxed">{achievement}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-center space-x-2 text-primary">
            <Icon name="ArrowRight" size={16} />
            <span className="text-sm font-medium">Start your eco journey today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoStats;