import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VisualizationPanel = ({ activities, dailyGoal = 10 }) => {
  const [viewMode, setViewMode] = useState('daily');
  const [chartType, setChartType] = useState('bar');

  // Calculate daily emissions
  const calculateDailyEmissions = () => {
    const today = new Date()?.toDateString();
    const todayActivities = activities?.filter(activity => 
      new Date(activity.timestamp)?.toDateString() === today
    );
    
    return todayActivities?.reduce((total, activity) => 
      total + parseFloat(activity?.co2Impact), 0
    )?.toFixed(2);
  };

  // Generate chart data based on view mode
  const generateChartData = () => {
    if (viewMode === 'daily') {
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date?.setDate(date?.getDate() - (6 - i));
        return date;
      });

      return last7Days?.map(date => {
        const dayActivities = activities?.filter(activity => 
          new Date(activity.timestamp)?.toDateString() === date?.toDateString()
        );
        
        const totalCO2 = dayActivities?.reduce((sum, activity) => 
          sum + parseFloat(activity?.co2Impact), 0
        );

        return {
          date: date?.toLocaleDateString('en-US', { weekday: 'short' }),
          co2: parseFloat(totalCO2?.toFixed(2)),
          goal: dailyGoal
        };
      });
    } else if (viewMode === 'weekly') {
      const last4Weeks = Array.from({ length: 4 }, (_, i) => {
        const startDate = new Date();
        startDate?.setDate(startDate?.getDate() - (startDate?.getDay() + (3 - i) * 7));
        const endDate = new Date(startDate);
        endDate?.setDate(endDate?.getDate() + 6);
        
        const weekActivities = activities?.filter(activity => {
          const activityDate = new Date(activity.timestamp);
          return activityDate >= startDate && activityDate <= endDate;
        });
        
        const totalCO2 = weekActivities?.reduce((sum, activity) => 
          sum + parseFloat(activity?.co2Impact), 0
        );

        return {
          date: `Week ${4 - i}`,
          co2: parseFloat(totalCO2?.toFixed(2)),
          goal: dailyGoal * 7
        };
      });
      
      return last4Weeks;
    } else {
      const last6Months = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date?.setMonth(date?.getMonth() - (5 - i));
        
        const monthActivities = activities?.filter(activity => {
          const activityDate = new Date(activity.timestamp);
          return activityDate?.getMonth() === date?.getMonth() && 
                 activityDate?.getFullYear() === date?.getFullYear();
        });
        
        const totalCO2 = monthActivities?.reduce((sum, activity) => 
          sum + parseFloat(activity?.co2Impact), 0
        );

        return {
          date: date?.toLocaleDateString('en-US', { month: 'short' }),
          co2: parseFloat(totalCO2?.toFixed(2)),
          goal: dailyGoal * 30
        };
      });
      
      return last6Months;
    }
  };

  // Generate category breakdown data
  const generateCategoryData = () => {
    const categories = { travel: 0, food: 0 };
    
    activities?.forEach(activity => {
      if (activity?.type && categories?.hasOwnProperty(activity?.type)) {
        categories[activity.type] += parseFloat(activity?.co2Impact);
      }
    });

    return Object.entries(categories)?.map(([category, value]) => ({
      name: category?.charAt(0)?.toUpperCase() + category?.slice(1),
      value: parseFloat(value?.toFixed(2)),
      color: category === 'travel' ? '#2D5A27' : '#8B4513'
    }));
  };

  const chartData = generateChartData();
  const categoryData = generateCategoryData();
  const dailyEmissions = calculateDailyEmissions();
  const progressPercentage = Math.min((dailyEmissions / dailyGoal) * 100, 100);

  const viewModes = [
    { id: 'daily', label: 'Daily', icon: 'Calendar' },
    { id: 'weekly', label: 'Weekly', icon: 'CalendarDays' },
    { id: 'monthly', label: 'Monthly', icon: 'CalendarRange' }
  ];

  const chartTypes = [
    { id: 'bar', label: 'Bar Chart', icon: 'BarChart3' },
    { id: 'line', label: 'Line Chart', icon: 'TrendingUp' },
    { id: 'pie', label: 'Category Breakdown', icon: 'PieChart' }
  ];

  const renderChart = () => {
    if (chartType === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {categoryData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} kg CO₂`, 'Emissions']} />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip 
              formatter={(value, name) => [
                `${value} kg CO₂`, 
                name === 'co2' ? 'Actual' : 'Goal'
              ]}
              labelStyle={{ color: 'var(--color-foreground)' }}
              contentStyle={{ 
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="co2" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="goal" 
              stroke="var(--color-muted-foreground)" 
              strokeDasharray="5 5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis 
            dataKey="date" 
            stroke="var(--color-muted-foreground)"
            fontSize={12}
          />
          <YAxis 
            stroke="var(--color-muted-foreground)"
            fontSize={12}
          />
          <Tooltip 
            formatter={(value, name) => [
              `${value} kg CO₂`, 
              name === 'co2' ? 'Actual' : 'Goal'
            ]}
            labelStyle={{ color: 'var(--color-foreground)' }}
            contentStyle={{ 
              backgroundColor: 'var(--color-popover)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px'
            }}
          />
          <Bar dataKey="co2" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="goal" fill="var(--color-muted)" radius={[4, 4, 0, 0]} opacity={0.5} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="space-y-6">
      {/* Daily Progress Card */}
      <div className="bg-card rounded-lg border border-border shadow-organic p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-heading font-bold text-card-foreground">
              Today's Carbon Footprint
            </h3>
            <p className="text-sm text-muted-foreground">
              Daily goal: {dailyGoal} kg CO₂
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {dailyEmissions} kg
            </div>
            <div className="text-sm text-muted-foreground">
              CO₂ emissions
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className={`font-medium ${
              progressPercentage <= 100 ? 'text-success' : 'text-warning'
            }`}>
              {progressPercentage?.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                progressPercentage <= 100 ? 'bg-success' : 'bg-warning'
              }`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          {progressPercentage > 100 && (
            <p className="text-xs text-warning flex items-center space-x-1">
              <Icon name="AlertTriangle" size={12} />
              <span>You've exceeded your daily goal</span>
            </p>
          )}
        </div>
      </div>
      {/* Visualization Controls */}
      <div className="bg-card rounded-lg border border-border shadow-organic">
        <div className="p-6 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h3 className="text-lg font-heading font-bold text-card-foreground">
              Emissions Analytics
            </h3>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              {/* View Mode Selector */}
              <div className="flex rounded-lg border border-border overflow-hidden">
                {viewModes?.map((mode) => (
                  <button
                    key={mode?.id}
                    onClick={() => setViewMode(mode?.id)}
                    className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-organic ${
                      viewMode === mode?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={mode?.icon} size={14} />
                    <span>{mode?.label}</span>
                  </button>
                ))}
              </div>

              {/* Chart Type Selector */}
              <div className="flex rounded-lg border border-border overflow-hidden">
                {chartTypes?.map((type) => (
                  <button
                    key={type?.id}
                    onClick={() => setChartType(type?.id)}
                    className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-organic ${
                      chartType === type?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={type?.icon} size={14} />
                    <span className="hidden sm:inline">{type?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="p-6">
          {renderChart()}
        </div>

        {/* Category Legend for Pie Chart */}
        {chartType === 'pie' && (
          <div className="px-6 pb-6">
            <div className="flex flex-wrap gap-4 justify-center">
              {categoryData?.map((category, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category?.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {category?.name}: {category?.value} kg CO₂
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export Button */}
        <div className="px-6 pb-6 border-t border-border pt-4">
          <Button variant="outline" iconName="Download" iconPosition="left" size="sm">
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisualizationPanel;