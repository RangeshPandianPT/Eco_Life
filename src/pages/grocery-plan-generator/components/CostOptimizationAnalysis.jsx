import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CostOptimizationAnalysis = ({ analysisData }) => {
  const [activeTab, setActiveTab] = useState('comparison');

  const mockComparisonData = [
    { store: 'Walmart', cost: 380, co2: 15.2, savings: 0 },
    { store: 'Whole Foods', cost: 520, co2: 8.4, savings: 6.8 },
    { store: 'Local Co-op', cost: 450, co2: 6.2, savings: 9.0 },
    { store: 'Farmers Market', cost: 480, co2: 4.1, savings: 11.1 },
    { store: 'Mixed Sources', cost: 420, co2: 5.8, savings: 9.4 }
  ];

  const mockBudgetBreakdown = [
    { category: 'Produce', amount: 120, percentage: 28.6, color: '#059669' },
    { category: 'Proteins', amount: 140, percentage: 33.3, color: '#FF6B35' },
    { category: 'Pantry', amount: 80, percentage: 19.0, color: '#2D5A27' },
    { category: 'Dairy', amount: 45, percentage: 10.7, color: '#8B4513' },
    { category: 'Frozen', amount: 25, percentage: 6.0, color: '#3B82F6' },
    { category: 'Snacks', amount: 10, percentage: 2.4, color: '#F59E0B' }
  ];

  const mockSavingsOpportunities = [
    {
      item: 'Organic Bananas',
      currentCost: 4.50,
      alternativeCost: 2.80,
      savings: 1.70,
      co2Impact: 0.2,
      source: 'Local Farm Stand'
    },
    {
      item: 'Grass-fed Beef',
      currentCost: 28.00,
      alternativeCost: 24.50,
      savings: 3.50,
      co2Impact: -1.2,
      source: 'Community Co-op'
    },
    {
      item: 'Almond Milk',
      currentCost: 5.99,
      alternativeCost: 4.25,
      savings: 1.74,
      co2Impact: 0.1,
      source: 'Bulk Purchase'
    },
    {
      item: 'Quinoa',
      currentCost: 8.50,
      alternativeCost: 6.20,
      savings: 2.30,
      co2Impact: 0.3,
      source: 'Wholesale Club'
    }
  ];

  const comparisonData = analysisData?.comparison || mockComparisonData;
  const budgetBreakdown = analysisData?.budgetBreakdown || mockBudgetBreakdown;
  const savingsOpportunities = analysisData?.savingsOpportunities || mockSavingsOpportunities;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-organic-lg">
          <p className="font-medium text-popover-foreground">{label}</p>
          <p className="text-accent">Cost: {formatPrice(payload?.[0]?.value)}</p>
          <p className="text-success">CO₂: {payload?.[1]?.value}kg</p>
        </div>
      );
    }
    return null;
  };

  const tabs = [
    { id: 'comparison', label: 'Store Comparison', icon: 'BarChart3' },
    { id: 'breakdown', label: 'Budget Breakdown', icon: 'PieChart' },
    { id: 'opportunities', label: 'Savings', icon: 'TrendingDown' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-card-foreground">Cost Optimization</h2>
            <p className="text-sm text-muted-foreground">
              Compare prices and find the best deals while maintaining sustainability
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mt-4 bg-muted p-1 rounded-lg">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-organic-fast ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'comparison' && (
          <div className="space-y-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="store" 
                    tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                    axisLine={{ stroke: 'var(--color-border)' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                    axisLine={{ stroke: 'var(--color-border)' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="cost" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {comparisonData?.map((store, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-card-foreground">{store?.store}</h4>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Cost:</span>
                      <span className="font-medium text-accent">{formatPrice(store?.cost)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">CO₂:</span>
                      <span className="font-medium text-success">{store?.co2}kg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Savings:</span>
                      <span className="font-medium text-success">{store?.savings}kg CO₂</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'breakdown' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="amount"
                    >
                      {budgetBreakdown?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [formatPrice(value), 'Amount']}
                      labelFormatter={(label) => `Category: ${label}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {budgetBreakdown?.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category?.color }}
                      />
                      <span className="font-medium text-card-foreground">{category?.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-card-foreground">{formatPrice(category?.amount)}</p>
                      <p className="text-sm text-muted-foreground">{category?.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'opportunities' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-card-foreground">
                Potential Savings: {formatPrice(savingsOpportunities?.reduce((sum, opp) => sum + opp?.savings, 0))}
              </h3>
              <Button variant="outline" size="sm" iconName="Download">
                Export Report
              </Button>
            </div>

            <div className="space-y-3">
              {savingsOpportunities?.map((opportunity, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-organic-fast">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-card-foreground">{opportunity?.item}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Switch to: {opportunity?.source}
                      </p>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(opportunity?.currentCost)}
                        </span>
                        <span className="text-sm font-medium text-success">
                          {formatPrice(opportunity?.alternativeCost)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-success font-medium">
                          Save {formatPrice(opportunity?.savings)}
                        </span>
                        <span className={`${opportunity?.co2Impact > 0 ? 'text-success' : 'text-warning'}`}>
                          {opportunity?.co2Impact > 0 ? '+' : ''}{opportunity?.co2Impact}kg CO₂
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CostOptimizationAnalysis;