import React from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const CarbonFootprintCard = () => {
  const carbonData = {
    today: { saved: 2.4, target: 3.0, percentage: 80 },
    week: { saved: 15.8, target: 21.0, percentage: 75 },
    month: { saved: 68.2, target: 90.0, percentage: 76 }
  };

  const trendData = [
    { day: 'Mon', saved: 1.8 },
    { day: 'Tue', saved: 2.1 },
    { day: 'Wed', saved: 2.6 },
    { day: 'Thu', saved: 1.9 },
    { day: 'Fri', saved: 2.4 },
    { day: 'Sat', saved: 3.1 },
    { day: 'Sun', saved: 2.4 }
  ];

  const impactBreakdown = [
    { category: 'Mobility', saved: 1.2, icon: 'Car', color: 'text-primary' },
    { category: 'Food Choices', saved: 0.8, icon: 'Apple', color: 'text-success' },
    { category: 'Household', saved: 0.4, icon: 'Home', color: 'text-accent' }
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-organic">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="TreePine" size={20} color="var(--color-success)" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-card-foreground">Carbon Impact</h2>
            <p className="text-sm text-muted-foreground">Your environmental footprint today</p>
          </div>
        </div>
        <button className="p-2 hover:bg-muted rounded-lg transition-organic-fast">
          <Icon name="MoreHorizontal" size={20} color="var(--color-muted-foreground)" />
        </button>
      </div>
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-success/5 rounded-lg border border-success/10">
          <div className="text-2xl font-heading font-bold text-success mb-1">
            {carbonData?.today?.saved}kg
          </div>
          <div className="text-sm text-muted-foreground mb-2">CO₂ Saved Today</div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-all duration-500"
              style={{ width: `${carbonData?.today?.percentage}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {carbonData?.today?.percentage}% of daily goal
          </div>
        </div>

        <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10">
          <div className="text-2xl font-heading font-bold text-primary mb-1">
            {carbonData?.week?.saved}kg
          </div>
          <div className="text-sm text-muted-foreground mb-2">This Week</div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${carbonData?.week?.percentage}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {carbonData?.week?.percentage}% of weekly goal
          </div>
        </div>

        <div className="text-center p-4 bg-accent/5 rounded-lg border border-accent/10">
          <div className="text-2xl font-heading font-bold text-accent mb-1">
            {carbonData?.month?.saved}kg
          </div>
          <div className="text-sm text-muted-foreground mb-2">This Month</div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-500"
              style={{ width: `${carbonData?.month?.percentage}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {carbonData?.month?.percentage}% of monthly goal
          </div>
        </div>
      </div>
      {/* Trend Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-heading font-semibold text-card-foreground mb-3">Weekly Trend</h3>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value) => [`${value}kg CO₂`, 'Saved']}
              />
              <Line 
                type="monotone" 
                dataKey="saved" 
                stroke="var(--color-success)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: 'var(--color-success)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Impact Breakdown */}
      <div>
        <h3 className="text-lg font-heading font-semibold text-card-foreground mb-3">Today's Impact Breakdown</h3>
        <div className="space-y-3">
          {impactBreakdown?.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg bg-background flex items-center justify-center ${item?.color}`}>
                  <Icon name={item?.icon} size={16} />
                </div>
                <span className="font-medium text-card-foreground">{item?.category}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-success">{item?.saved}kg CO₂</div>
                <div className="text-xs text-muted-foreground">saved</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintCard;