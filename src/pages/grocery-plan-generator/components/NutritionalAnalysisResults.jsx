import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NutritionalAnalysisResults = ({ nutritionData }) => {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const mockWeeklyNutrition = [
    { week: 'Week 1', calories: 2150, protein: 85, carbs: 280, fat: 75, fiber: 32, sugar: 45 },
    { week: 'Week 2', calories: 2200, protein: 90, carbs: 290, fat: 78, fiber: 35, sugar: 42 },
    { week: 'Week 3', calories: 2180, protein: 88, carbs: 285, fat: 76, fiber: 33, sugar: 44 },
    { week: 'Week 4', calories: 2220, protein: 92, carbs: 295, fat: 80, fiber: 36, sugar: 41 }
  ];

  const mockNutrientGoals = [
    { nutrient: 'Protein', current: 88, target: 85, unit: 'g', status: 'good' },
    { nutrient: 'Fiber', current: 34, target: 30, unit: 'g', status: 'excellent' },
    { nutrient: 'Vitamin C', current: 120, target: 90, unit: 'mg', status: 'excellent' },
    { nutrient: 'Iron', current: 14, target: 18, unit: 'mg', status: 'low' },
    { nutrient: 'Calcium', current: 950, target: 1000, unit: 'mg', status: 'good' },
    { nutrient: 'Omega-3', current: 1.2, target: 1.6, unit: 'g', status: 'low' }
  ];

  const mockRadarData = [
    { nutrient: 'Protein', current: 85, target: 100 },
    { nutrient: 'Vitamins', current: 92, target: 100 },
    { nutrient: 'Minerals', current: 78, target: 100 },
    { nutrient: 'Fiber', current: 95, target: 100 },
    { nutrient: 'Healthy Fats', current: 82, target: 100 },
    { nutrient: 'Antioxidants', current: 88, target: 100 }
  ];

  const weeklyData = nutritionData?.weekly || mockWeeklyNutrition;
  const nutrientGoals = nutritionData?.goals || mockNutrientGoals;
  const radarData = nutritionData?.radar || mockRadarData;

  const getStatusColor = (status) => {
    const colors = {
      excellent: 'text-success',
      good: 'text-primary',
      low: 'text-warning',
      deficient: 'text-error'
    };
    return colors?.[status] || 'text-muted-foreground';
  };

  const getStatusBadge = (status) => {
    const badges = {
      excellent: 'bg-success/10 text-success',
      good: 'bg-primary/10 text-primary',
      low: 'bg-warning/10 text-warning',
      deficient: 'bg-error/10 text-error'
    };
    return badges?.[status] || 'bg-muted text-muted-foreground';
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-organic-lg">
          <p className="font-medium text-popover-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} style={{ color: entry?.color }}>
              {entry?.dataKey}: {entry?.value}
              {entry?.dataKey === 'calories' ? ' kcal' : 'g'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-card-foreground">Nutritional Analysis</h2>
              <p className="text-sm text-muted-foreground">
                Monthly nutrition breakdown and goal tracking
              </p>
            </div>
          </div>
          
          <Button variant="outline" size="sm" iconName="Download">
            Export Report
          </Button>
        </div>
      </div>
      <div className="p-6 space-y-8">
        {/* Weekly Nutrition Trends */}
        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-card-foreground">Weekly Nutrition Trends</h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="week" 
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                  axisLine={{ stroke: 'var(--color-border)' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="protein" 
                  stroke="var(--color-accent)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="fiber" 
                  stroke="var(--color-success)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Calories (kcal)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-muted-foreground">Protein (g)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-muted-foreground">Fiber (g)</span>
            </div>
          </div>
        </div>

        {/* Nutrient Goals Progress */}
        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-card-foreground">Nutrient Goals Progress</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nutrientGoals?.map((goal, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-card-foreground">{goal?.nutrient}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(goal?.status)}`}>
                    {goal?.status}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current:</span>
                    <span className={`font-medium ${getStatusColor(goal?.status)}`}>
                      {goal?.current}{goal?.unit}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Target:</span>
                    <span className="font-medium text-card-foreground">
                      {goal?.target}{goal?.unit}
                    </span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        goal?.status === 'excellent' ? 'bg-success' :
                        goal?.status === 'good' ? 'bg-primary' :
                        goal?.status === 'low' ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${getProgressPercentage(goal?.current, goal?.target)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nutritional Balance Radar */}
        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-card-foreground">Nutritional Balance Overview</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis 
                    tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: 'var(--color-muted-foreground)' }}
                  />
                  <Radar
                    name="Target"
                    dataKey="target"
                    stroke="var(--color-muted)"
                    fill="var(--color-muted)"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Current"
                    dataKey="current"
                    stroke="var(--color-primary)"
                    fill="var(--color-primary)"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-success/10 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="TrendingUp" size={16} color="var(--color-success)" />
                  <h4 className="font-medium text-success">Strengths</h4>
                </div>
                <ul className="text-sm text-success space-y-1">
                  <li>• Excellent fiber intake from whole grains</li>
                  <li>• Strong vitamin profile from diverse produce</li>
                  <li>• Good protein balance from plant sources</li>
                </ul>
              </div>

              <div className="p-4 bg-warning/10 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="AlertTriangle" size={16} color="var(--color-warning)" />
                  <h4 className="font-medium text-warning">Areas for Improvement</h4>
                </div>
                <ul className="text-sm text-warning space-y-1">
                  <li>• Consider iron-rich foods like spinach</li>
                  <li>• Add omega-3 sources like walnuts</li>
                  <li>• Include more calcium-rich alternatives</li>
                </ul>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Lightbulb" size={16} color="var(--color-primary)" />
                  <h4 className="font-medium text-primary">AI Recommendations</h4>
                </div>
                <ul className="text-sm text-primary space-y-1">
                  <li>• Add chia seeds to smoothies for omega-3</li>
                  <li>• Include fortified plant milk for calcium</li>
                  <li>• Try lentils for iron and protein boost</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">2,188</p>
            <p className="text-sm text-muted-foreground">Avg Daily Calories</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">89g</p>
            <p className="text-sm text-muted-foreground">Avg Daily Protein</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">34g</p>
            <p className="text-sm text-muted-foreground">Avg Daily Fiber</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">92%</p>
            <p className="text-sm text-muted-foreground">Goal Achievement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionalAnalysisResults;