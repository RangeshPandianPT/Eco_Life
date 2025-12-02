import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentActivityFeed = () => {
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'scan',
      title: 'Scanned Organic Quinoa',
      description: 'Found a great eco-friendly alternative with 40% less carbon footprint',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      impact: '0.8kg CO₂ saved',
      icon: 'QrCode',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop',
      category: 'Product Scan'
    },
    {
      id: 2,
      type: 'activity',
      title: 'Logged Bike Commute',
      description: 'Cycled 8.5km to work instead of driving',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      impact: '2.1kg CO08 saved',
      icon: 'Bike',
      color: 'text-success',
      bgColor: 'bg-success/10',
      category: 'Mobility'
    },
    {
      id: 3,
      type: 'meal',
      title: 'Added Mediterranean Bowl',
      description: 'Planned a plant-based meal for tomorrow lunch',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      impact: '1.2kg CO₂ saved',
      icon: 'ChefHat',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=100&h=100&fit=crop',
      category: 'Meal Planning'
    },
    {
      id: 4,
      type: 'community',
      title: 'Shared Recipe',
      description: 'Posted "Zero-Waste Smoothie Bowl" to community',
      timestamp: new Date(Date.now() - 21600000), // 6 hours ago
      impact: '12 likes, 3 saves',
      icon: 'Share2',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      category: 'Community'
    },
    {
      id: 5,
      type: 'achievement',
      title: 'Earned Carbon Crusher Badge',
      description: 'Reached 50kg CO₂ saved this month milestone',
      timestamp: new Date(Date.now() - 28800000), // 8 hours ago
      impact: '+150 points',
      icon: 'Award',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      category: 'Achievement'
    },
    {
      id: 6,
      type: 'scan',
      title: 'Scanned Bamboo Toothbrush',
      description: 'Compared with plastic alternatives',
      timestamp: new Date(Date.now() - 43200000), // 12 hours ago
      impact: '0.3kg CO₂ saved',
      icon: 'QrCode',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      image: 'https://images.pixabay.com/photo/2020/05/24/05/44/toothbrush-5212696_1280.jpg?w=100&h=100&fit=crop',
      category: 'Product Scan'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Activities', count: activities?.length },
    { value: 'scan', label: 'Scans', count: activities?.filter(a => a?.type === 'scan')?.length },
    { value: 'activity', label: 'Activities', count: activities?.filter(a => a?.type === 'activity')?.length },
    { value: 'meal', label: 'Meals', count: activities?.filter(a => a?.type === 'meal')?.length },
    { value: 'community', label: 'Community', count: activities?.filter(a => a?.type === 'community')?.length }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.type === filter);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-organic">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-card-foreground">Recent Activity</h2>
          <p className="text-sm text-muted-foreground">Your eco-friendly actions and achievements</p>
        </div>
        <Button variant="ghost" size="sm" iconName="History" iconPosition="left">
          View All
        </Button>
      </div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => setFilter(option?.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-organic ${
              filter === option?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {option?.label}
            <span className="ml-1 text-xs opacity-75">({option?.count})</span>
          </button>
        ))}
      </div>
      {/* Activity Feed */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-organic">
            {/* Icon or Image */}
            <div className="flex-shrink-0">
              {activity?.image ? (
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={activity?.image}
                    alt={activity?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`w-12 h-12 rounded-lg ${activity?.bgColor} flex items-center justify-center`}>
                  <Icon name={activity?.icon} size={20} className={activity?.color} />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-medium text-card-foreground">{activity?.title}</h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {formatTimeAgo(activity?.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                {activity?.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xs px-2 py-1 bg-background rounded-full text-muted-foreground">
                    {activity?.category}
                  </span>
                  <span className={`text-sm font-medium ${
                    activity?.impact?.includes('CO₂') ? 'text-success' : 
                    activity?.impact?.includes('points') ? 'text-accent' : 'text-primary'
                  }`}>
                    {activity?.impact}
                  </span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button className="p-1 hover:bg-muted rounded transition-organic-fast">
                    <Icon name="Heart" size={14} color="var(--color-muted-foreground)" />
                  </button>
                  <button className="p-1 hover:bg-muted rounded transition-organic-fast">
                    <Icon name="Share2" size={14} color="var(--color-muted-foreground)" />
                  </button>
                  <button className="p-1 hover:bg-muted rounded transition-organic-fast">
                    <Icon name="MoreHorizontal" size={14} color="var(--color-muted-foreground)" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Activity Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-heading font-bold text-primary">47</div>
            <div className="text-xs text-muted-foreground">Products Scanned</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading font-bold text-success">23</div>
            <div className="text-xs text-muted-foreground">Activities Logged</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading font-bold text-accent">12</div>
            <div className="text-xs text-muted-foreground">Meals Planned</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading font-bold text-secondary">8</div>
            <div className="text-xs text-muted-foreground">Community Posts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityFeed;