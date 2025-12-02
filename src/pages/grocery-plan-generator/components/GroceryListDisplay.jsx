import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GroceryListDisplay = ({ groceryPlan, onItemToggle }) => {
  const [expandedCategories, setExpandedCategories] = useState({
    produce: true,
    proteins: true,
    pantry: true,
    dairy: false,
    frozen: false,
    snacks: false
  });

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev?.[category]
    }));
  };

  const getCategoryIcon = (category) => {
    const icons = {
      produce: 'Apple',
      proteins: 'Fish',
      pantry: 'Package',
      dairy: 'Milk',
      frozen: 'Snowflake',
      snacks: 'Cookie'
    };
    return icons?.[category] || 'Package';
  };

  const getCategoryColor = (category) => {
    const colors = {
      produce: 'text-success',
      proteins: 'text-accent',
      pantry: 'text-primary',
      dairy: 'text-secondary',
      frozen: 'text-blue-500',
      snacks: 'text-orange-500'
    };
    return colors?.[category] || 'text-primary';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const getCO2Color = (impact) => {
    if (impact <= 1) return 'text-success';
    if (impact <= 3) return 'text-warning';
    return 'text-error';
  };

  const getCO2Badge = (impact) => {
    if (impact <= 1) return 'bg-success/10 text-success';
    if (impact <= 3) return 'bg-warning/10 text-warning';
    return 'bg-error/10 text-error';
  };

  if (!groceryPlan) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="ShoppingCart" size={32} color="var(--color-muted-foreground)" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-card-foreground mb-2">
          No Grocery Plan Generated
        </h3>
        <p className="text-muted-foreground">
          Configure your preferences and generate a plan to see your optimized grocery list
        </p>
      </div>
    );
  }

  const totalItems = Object.values(groceryPlan?.categories)?.reduce((sum, items) => sum + items?.length, 0);
  const totalCost = Object.values(groceryPlan?.categories)?.reduce((sum, items) => 
    sum + items?.reduce((itemSum, item) => itemSum + item?.totalCost, 0), 0
  );
  const totalCO2 = Object.values(groceryPlan?.categories)?.reduce((sum, items) => 
    sum + items?.reduce((itemSum, item) => itemSum + item?.co2Impact, 0), 0
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="ShoppingCart" size={20} color="var(--color-success)" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-card-foreground">Monthly Grocery Plan</h2>
              <p className="text-sm text-muted-foreground">
                {totalItems} items • {formatPrice(totalCost)} • {totalCO2?.toFixed(1)}kg CO₂
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
            <Button variant="ghost" size="sm" iconName="MoreVertical" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-2xl font-bold text-card-foreground">{totalItems}</p>
            <p className="text-xs text-muted-foreground">Total Items</p>
          </div>
          <div className="text-center p-3 bg-accent/10 rounded-lg">
            <p className="text-2xl font-bold text-accent">{formatPrice(totalCost)}</p>
            <p className="text-xs text-muted-foreground">Est. Cost</p>
          </div>
          <div className="text-center p-3 bg-success/10 rounded-lg">
            <p className="text-2xl font-bold text-success">{totalCO2?.toFixed(1)}kg</p>
            <p className="text-xs text-muted-foreground">CO₂ Impact</p>
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="max-h-96 overflow-y-auto">
        {Object.entries(groceryPlan?.categories)?.map(([category, items]) => (
          <div key={category} className="border-b border-border last:border-b-0">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category)}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-organic-fast"
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getCategoryIcon(category)} 
                  size={20} 
                  className={getCategoryColor(category)} 
                />
                <div className="text-left">
                  <h3 className="font-medium text-card-foreground capitalize">
                    {category} ({items?.length})
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formatPrice(items?.reduce((sum, item) => sum + item?.totalCost, 0))}
                  </p>
                </div>
              </div>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`transition-transform ${expandedCategories?.[category] ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Category Items */}
            {expandedCategories?.[category] && (
              <div className="px-4 pb-4 space-y-2">
                {items?.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-organic-fast"
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <Checkbox
                        checked={item?.selected || false}
                        onChange={(e) => onItemToggle?.(category, index, e?.target?.checked)}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-card-foreground">{item?.name}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-muted-foreground">
                            {item?.quantity} {item?.unit}
                          </span>
                          <span className="text-sm font-medium text-accent">
                            {formatPrice(item?.totalCost)}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getCO2Badge(item?.co2Impact)}`}>
                            {item?.co2Impact?.toFixed(1)}kg CO₂
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {item?.localSource && (
                      <div className="flex items-center space-x-1 ml-2">
                        <Icon name="MapPin" size={14} color="var(--color-success)" />
                        <span className="text-xs text-success">Local</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Mock Checkbox component for this file
const Checkbox = ({ checked, onChange }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={onChange}
    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
  />
);

export default GroceryListDisplay;