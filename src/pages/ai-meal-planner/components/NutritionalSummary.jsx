import React from 'react';
import Icon from '../../../components/AppIcon';

const NutritionalSummary = ({ weeklyData, goals }) => {
  const mockWeeklyData = {
    calories: { current: 14280, target: 14700 },
    protein: { current: 520, target: 560 },
    carbs: { current: 1680, target: 1750 },
    fat: { current: 420, target: 490 },
    fiber: { current: 280, target: 350 },
    co2Total: { current: 12.4, target: 15.0 },
    cost: { current: 142.50, target: 150.00 },
    localSourcing: { current: 78, target: 70 }
  };

  const data = weeklyData || mockWeeklyData;
  const targetGoals = goals || {};

  const getProgressColor = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90 && percentage <= 110) return 'text-success';
    if (percentage >= 80 && percentage <= 120) return 'text-warning';
    return 'text-error';
  };

  const getProgressBarColor = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90 && percentage <= 110) return 'bg-success';
    if (percentage >= 80 && percentage <= 120) return 'bg-warning';
    return 'bg-error';
  };

  const calculatePercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatNumber = (num) => {
    return num?.toLocaleString('en-US', { maximumFractionDigits: 1 });
  };

  const nutritionItems = [
    {
      key: 'calories',
      label: 'Calories',
      icon: 'Flame',
      unit: 'kcal',
      data: data?.calories
    },
    {
      key: 'protein',
      label: 'Protein',
      icon: 'Beef',
      unit: 'g',
      data: data?.protein
    },
    {
      key: 'carbs',
      label: 'Carbohydrates',
      icon: 'Wheat',
      unit: 'g',
      data: data?.carbs
    },
    {
      key: 'fat',
      label: 'Fat',
      icon: 'Droplet',
      unit: 'g',
      data: data?.fat
    },
    {
      key: 'fiber',
      label: 'Fiber',
      icon: 'Apple',
      unit: 'g',
      data: data?.fiber
    }
  ];

  const sustainabilityItems = [
    {
      key: 'co2Total',
      label: 'Carbon Footprint',
      icon: 'Leaf',
      unit: 'kg CO₂',
      data: data?.co2Total,
      inverse: true // Lower is better
    },
    {
      key: 'cost',
      label: 'Weekly Cost',
      icon: 'DollarSign',
      unit: '$',
      data: data?.cost,
      inverse: true // Lower is better
    },
    {
      key: 'localSourcing',
      label: 'Local Sourcing',
      icon: 'MapPin',
      unit: '%',
      data: data?.localSourcing
    }
  ];

  const NutritionCard = ({ item }) => {
    const percentage = calculatePercentage(item?.data?.current, item?.data?.target);
    const progressColor = getProgressColor(item?.data?.current, item?.data?.target);
    const progressBarColor = getProgressBarColor(item?.data?.current, item?.data?.target);

    return (
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name={item?.icon} size={16} className="text-primary" />
            <span className="font-medium text-foreground text-sm">{item?.label}</span>
          </div>
          <span className={`text-sm font-medium ${progressColor}`}>
            {formatNumber(item?.data?.current)}{item?.unit}
          </span>
        </div>
        <div className="space-y-2">
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className={`h-full ${progressBarColor} transition-all duration-500 ease-out`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>Target: {formatNumber(item?.data?.target)}{item?.unit}</span>
          </div>
        </div>
      </div>
    );
  };

  const SustainabilityCard = ({ item }) => {
    const percentage = item?.inverse 
      ? calculatePercentage(item?.data?.target, item?.data?.current) // Inverse for "lower is better"
      : calculatePercentage(item?.data?.current, item?.data?.target);
    
    const progressColor = item?.inverse
      ? (item?.data?.current <= item?.data?.target ? 'text-success' : 'text-error')
      : getProgressColor(item?.data?.current, item?.data?.target);
    
    const progressBarColor = item?.inverse
      ? (item?.data?.current <= item?.data?.target ? 'bg-success' : 'bg-error')
      : getProgressBarColor(item?.data?.current, item?.data?.target);

    return (
      <div className="bg-background border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name={item?.icon} size={16} className="text-primary" />
            <span className="font-medium text-foreground text-sm">{item?.label}</span>
          </div>
          <span className={`text-sm font-medium ${progressColor}`}>
            {item?.unit === '$' ? '$' : ''}{formatNumber(item?.data?.current)}{item?.unit !== '$' ? item?.unit : ''}
          </span>
        </div>
        <div className="space-y-2">
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className={`h-full ${progressBarColor} transition-all duration-500 ease-out`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{item?.inverse ? 'Lower is better' : '0'}</span>
            <span>
              {item?.inverse ? 'Goal: ' : 'Target: '}
              {item?.unit === '$' ? '$' : ''}{formatNumber(item?.data?.target)}{item?.unit !== '$' ? item?.unit : ''}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="font-semibold text-card-foreground">Weekly Nutritional Summary</h3>
        </div>
      </div>
      <div className="p-4 space-y-6">
        {/* Nutrition Section */}
        <div>
          <h4 className="font-medium text-card-foreground mb-3 flex items-center space-x-2">
            <Icon name="Activity" size={16} className="text-success" />
            <span>Nutrition Goals</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
            {nutritionItems?.map((item) => (
              <NutritionCard key={item?.key} item={item} />
            ))}
          </div>
        </div>

        {/* Sustainability Section */}
        <div>
          <h4 className="font-medium text-card-foreground mb-3 flex items-center space-x-2">
            <Icon name="Leaf" size={16} className="text-success" />
            <span>Sustainability Goals</span>
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {sustainabilityItems?.map((item) => (
              <SustainabilityCard key={item?.key} item={item} />
            ))}
          </div>
        </div>

        {/* Overall Score */}
        <div className="bg-gradient-to-r from-success/10 to-primary/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} className="text-success" />
              <div>
                <h4 className="font-semibold text-foreground">Overall Health Score</h4>
                <p className="text-sm text-muted-foreground">Based on nutrition & sustainability</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-success">87</div>
              <div className="text-sm text-muted-foreground">out of 100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionalSummary;