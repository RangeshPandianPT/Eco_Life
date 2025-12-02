import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityHistory = ({ activities, onDeleteActivity }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filterOptions = [
    { value: 'all', label: 'All Activities', icon: 'List' },
    { value: 'travel', label: 'Travel', icon: 'Car' },
    { value: 'food', label: 'Food', icon: 'ChefHat' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Impact' },
    { value: 'lowest', label: 'Lowest Impact' }
  ];

  const getFilteredAndSortedActivities = () => {
    let filtered = activities;
    
    if (filter !== 'all') {
      filtered = activities?.filter(activity => activity?.type === filter);
    }

    return filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.timestamp) - new Date(b.timestamp);
        case 'highest':
          return parseFloat(b?.co2Impact) - parseFloat(a?.co2Impact);
        case 'lowest':
          return parseFloat(a?.co2Impact) - parseFloat(b?.co2Impact);
        default: // newest
          return new Date(b.timestamp) - new Date(a.timestamp);
      }
    });
  };

  const getActivityIcon = (type) => {
    const icons = {
      travel: 'Car',
      food: 'ChefHat',
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      travel: 'text-primary',
      food: 'text-secondary',
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const formatActivityDetails = (activity) => {
    const { type, data } = activity;
    
    switch (type) {
      case 'travel':
        return `${data?.distance} miles by ${data?.mode?.replace('-', ' ')} (${data?.frequency}x)`;
      case 'food':
        return `${data?.portion} ${data?.type} ${data?.meal}`;
      default:
        return 'Activity details';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const filteredActivities = getFilteredAndSortedActivities();
  const totalEmissions = filteredActivities?.reduce((sum, activity) => 
    sum + parseFloat(activity?.co2Impact), 0
  )?.toFixed(2);

  return (
    <div className="bg-card rounded-lg border border-border shadow-organic">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-heading font-bold text-card-foreground">
              Activity History
            </h3>
            <p className="text-sm text-muted-foreground">
              {filteredActivities?.length} activities • {totalEmissions} kg CO₂ total
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            {/* Filter Buttons */}
            <div className="flex rounded-lg border border-border overflow-hidden">
              {filterOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => setFilter(option?.value)}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-organic ${
                    filter === option?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={option?.icon} size={14} />
                  <span className="hidden sm:inline">{option?.label}</span>
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {sortOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {filteredActivities?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-card-foreground mb-2">
              No Activities Found
            </h4>
            <p className="text-muted-foreground">
              {filter === 'all' ?'Start logging your daily activities to track your carbon footprint.'
                : `No ${filter} activities logged yet.`
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredActivities?.map((activity, index) => (
              <div key={`${activity?.timestamp}-${index}`} className="p-4 hover:bg-muted/30 transition-organic">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-2 rounded-lg bg-muted/50 ${getActivityColor(activity?.type)}`}>
                      <Icon name={getActivityIcon(activity?.type)} size={16} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-card-foreground capitalize">
                          {activity?.type}
                        </h4>
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                          {activity?.co2Impact} kg CO₂
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-1">
                        {formatActivityDetails(activity)}
                      </p>
                      
                      <p className="text-xs text-muted-foreground">
                        {formatTimestamp(activity?.timestamp)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteActivity(index)}
                    className="p-1 text-muted-foreground hover:text-destructive transition-organic-fast"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {filteredActivities?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Showing {filteredActivities?.length} of {activities?.length} activities
            </span>
            <Button variant="ghost" size="sm" iconName="RotateCcw" iconPosition="left">
              Clear All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityHistory;