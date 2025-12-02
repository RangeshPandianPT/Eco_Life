import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CarbonComparisonPanel = ({ product }) => {
  const comparisonData = [
    {
      name: 'This Product',
      co2: product?.carbonFootprint || 2.1,
      color: 'var(--color-success)'
    },
    {
      name: 'Conventional Alternative',
      co2: product?.conventionalFootprint || 4.8,
      color: 'var(--color-error)'
    },
    {
      name: 'Industry Average',
      co2: product?.industryAverage || 3.9,
      color: 'var(--color-warning)'
    }
  ];

  const savings = {
    co2: ((product?.conventionalFootprint || 4.8) - (product?.carbonFootprint || 2.1))?.toFixed(1),
    percentage: (((product?.conventionalFootprint || 4.8) - (product?.carbonFootprint || 2.1)) / (product?.conventionalFootprint || 4.8) * 100)?.toFixed(0)
  };

  const impactMetrics = [
    {
      icon: 'TreePine',
      label: 'Trees Saved',
      value: '0.3',
      unit: 'trees/year',
      color: 'text-success'
    },
    {
      icon: 'Droplets',
      label: 'Water Saved',
      value: '45',
      unit: 'liters',
      color: 'text-primary'
    },
    {
      icon: 'Zap',
      label: 'Household Saved',
      value: '12',
      unit: 'kWh',
      color: 'text-warning'
    }
  ];

  return (
    <div className="bg-white border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Icon name="BarChart3" size={20} color="var(--color-primary)" />
        <h3 className="text-lg font-semibold text-foreground">Environmental Impact Comparison</h3>
      </div>
      {/* CO₂ Savings Highlight */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-success mb-1">CO₂ Emissions Saved</h4>
            <p className="text-sm text-muted-foreground">Compared to conventional alternatives</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-success">{savings?.co2} kg</div>
            <div className="text-sm text-success">{savings?.percentage}% reduction</div>
          </div>
        </div>
      </div>
      {/* Comparison Chart */}
      <div>
        <h4 className="font-medium text-foreground mb-3">CO₂ Emissions Comparison (kg CO₂e)</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                axisLine={{ stroke: 'var(--color-border)' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                axisLine={{ stroke: 'var(--color-border)' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar 
                dataKey="co2" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Impact Metrics */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Additional Environmental Benefits</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {impactMetrics?.map((metric, index) => (
            <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex justify-center mb-2">
                <Icon name={metric?.icon} size={24} color={`var(--color-${metric?.color?.replace('text-', '')})`} />
              </div>
              <div className={`text-lg font-bold ${metric?.color}`}>{metric?.value}</div>
              <div className="text-xs text-muted-foreground">{metric?.unit}</div>
              <div className="text-sm text-foreground mt-1">{metric?.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Methodology Note */}
      <div className="bg-muted/30 p-3 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} color="var(--color-muted-foreground)" className="mt-0.5" />
          <div>
            <h5 className="text-sm font-medium text-foreground mb-1">Calculation Methodology</h5>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Environmental impact calculations are based on Life Cycle Assessment (LCA) data including production, 
              transportation, packaging, and disposal phases. Data sourced from certified environmental databases 
              and third-party verification agencies.
            </p>
          </div>
        </div>
      </div>
      {/* Call to Action */}
      <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Leaf" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-primary">Make a positive impact today</span>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-organic-fast">
          Learn More →
        </button>
      </div>
    </div>
  );
};

export default CarbonComparisonPanel;