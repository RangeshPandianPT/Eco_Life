import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import NotificationToast from '../../components/ui/NotificationToast';
import ActivityInputPanel from './components/ActivityInputPanel';
import VisualizationPanel from './components/VisualizationPanel';
import QuickAddButtons from './components/QuickAddButtons';
import ActivityHistory from './components/ActivityHistory';
import GoalSetting from './components/GoalSetting';
import Icon from '../../components/AppIcon';

const CarbonFootprintTracker = () => {
  const [activities, setActivities] = useState([]);
  const [activeTab, setActiveTab] = useState('food');
  const [currentGoal, setCurrentGoal] = useState({
    daily: 10,
    weekly: 70,
    monthly: 300,
    target: 'moderate'
  });

  // Mock initial activities for demonstration
  useEffect(() => {
    const mockActivities = [
      {
        type: 'travel',
        data: { mode: 'car', distance: '25', frequency: '2' },
        co2Impact: '10.5',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        type: 'food',
        data: { meal: 'lunch', portion: 'medium', type: 'vegetarian' },
        co2Impact: '1.8',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
      },
      {
        type: 'travel',
        data: { mode: 'bus', distance: '15', frequency: '1' },
        co2Impact: '1.2',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        type: 'food',
        data: { meal: 'dinner', portion: 'large', type: 'meat' },
        co2Impact: '5.2',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      }
    ];
    setActivities(mockActivities);
  }, []);

  const handleActivityAdd = (activity) => {
    setActivities(prev => [activity, ...prev]);
    
    // Show success notification
    console.log('Activity added:', activity);
  };

  const handleQuickAdd = (activity) => {
    setActivities(prev => [activity, ...prev]);
    
    // Show success notification
    console.log('Quick activity added:', activity);
  };

  const handleDeleteActivity = (index) => {
    setActivities(prev => prev?.filter((_, i) => i !== index));
  };

  const handleGoalUpdate = (newGoal) => {
    setCurrentGoal(newGoal);
    console.log('Goals updated:', newGoal);
  };

  return (
    <>
      <Helmet>
  <title>Carbon Footprint Tracker - EcoLife</title>
        <meta name="description" content="Track your daily carbon footprint with activity logging and analytics. Monitor travel and food consumption to achieve your sustainability goals." />
        <meta name="keywords" content="carbon footprint, sustainability tracking, environmental impact, eco-friendly living, carbon emissions" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon name="TreePine" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Carbon Footprint Tracker
                </h1>
                <p className="text-muted-foreground">
                  Monitor your environmental impact and work towards sustainability goals
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-success" />
                  <span className="text-sm font-medium text-card-foreground">Today</span>
                </div>
                <div className="mt-1">
                  <span className="text-2xl font-bold text-success">
                    {activities?.filter(a => new Date(a.timestamp)?.toDateString() === new Date()?.toDateString())?.reduce((sum, a) => sum + parseFloat(a?.co2Impact), 0)?.toFixed(1)
                    }
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">kg CO₂</span>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="CalendarDays" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-card-foreground">This Week</span>
                </div>
                <div className="mt-1">
                  <span className="text-2xl font-bold text-primary">
                    {activities?.reduce((sum, a) => sum + parseFloat(a?.co2Impact), 0)?.toFixed(1)
                    }
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">kg CO₂</span>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-card-foreground">Goal Progress</span>
                </div>
                <div className="mt-1">
                  <span className="text-2xl font-bold text-accent">
                    {Math.min(
                      (activities?.filter(a => new Date(a.timestamp)?.toDateString() === new Date()?.toDateString())?.reduce((sum, a) => sum + parseFloat(a?.co2Impact), 0) / currentGoal?.daily * 100
                      ), 100
                    )?.toFixed(0)}%
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">of daily goal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Input and Quick Actions */}
            <div className="lg:col-span-1 space-y-6">
              <ActivityInputPanel 
                onActivityAdd={handleActivityAdd}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              
              <QuickAddButtons onQuickAdd={handleQuickAdd} />
              
              <GoalSetting 
                currentGoal={currentGoal}
                onGoalUpdate={handleGoalUpdate}
              />
            </div>

            {/* Right Column - Visualization and History */}
            <div className="lg:col-span-2 space-y-6">
              <VisualizationPanel 
                activities={activities}
                dailyGoal={currentGoal?.daily}
              />
              
              <ActivityHistory 
                activities={activities}
                onDeleteActivity={handleDeleteActivity}
              />
            </div>
          </div>

          {/* Community Comparison Section */}
          <div className="mt-8 bg-card rounded-lg border border-border shadow-organic p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-heading font-bold text-card-foreground">
                  Community Comparison
                </h3>
                <p className="text-sm text-muted-foreground">
                  See how your carbon footprint compares to other EcoLife users
                </p>
              </div>
              <Icon name="Users" size={20} className="text-primary" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-1">15%</div>
                <div className="text-sm text-muted-foreground">Better than average</div>
                <div className="text-xs text-success mt-1">Keep up the great work!</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">8.2 kg</div>
                <div className="text-sm text-muted-foreground">Community average</div>
                <div className="text-xs text-muted-foreground mt-1">Daily CO₂ emissions</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">#127</div>
                <div className="text-sm text-muted-foreground">Your ranking</div>
                <div className="text-xs text-accent mt-1">Out of 2,450 users</div>
              </div>
            </div>
          </div>
        </main>

        <QuickActionButton />
        <NotificationToast />
      </div>
    </>
  );
};

export default CarbonFootprintTracker;