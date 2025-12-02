import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import { Checkbox } from '../../../components/ui/Checkbox';

const PlanConfigurationPanel = ({ onGeneratePlan, isGenerating }) => {
  const [config, setConfig] = useState({
    budget: 400,
    householdSize: 2,
    dietaryRestrictions: [],
    localSourcing: true,
    sustainabilityPriority: 70,
    costPriority: 50,
    nutritionPriority: 80
  });

  const dietaryOptions = [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten-Free' },
    { value: 'dairy-free', label: 'Dairy-Free' },
    { value: 'keto', label: 'Keto' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'low-sodium', label: 'Low Sodium' }
  ];

  const handleSliderChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: parseInt(value)
    }));
  };

  const handleDietaryChange = (restriction, checked) => {
    setConfig(prev => ({
      ...prev,
      dietaryRestrictions: checked 
        ? [...prev?.dietaryRestrictions, restriction]
        : prev?.dietaryRestrictions?.filter(r => r !== restriction)
    }));
  };

  const handleGenerate = () => {
    onGeneratePlan(config);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Settings" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold text-card-foreground">Plan Configuration</h2>
          <p className="text-sm text-muted-foreground">Set your monthly grocery planning parameters</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Budget Settings */}
        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-card-foreground">Budget & Household</h3>
          
          <Input
            label="Monthly Budget"
            type="number"
            value={config?.budget}
            onChange={(e) => setConfig(prev => ({ ...prev, budget: parseInt(e?.target?.value) || 0 }))}
            placeholder="Enter budget in USD"
            description={`$${config?.budget} per month`}
          />

          <Input
            label="Household Size"
            type="number"
            value={config?.householdSize}
            onChange={(e) => setConfig(prev => ({ ...prev, householdSize: parseInt(e?.target?.value) || 1 }))}
            placeholder="Number of people"
            description={`Planning for ${config?.householdSize} ${config?.householdSize === 1 ? 'person' : 'people'}`}
          />
        </div>

        {/* Dietary Restrictions */}
        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-card-foreground">Dietary Preferences</h3>
          
          <div className="space-y-3">
            {dietaryOptions?.map(option => (
              <Checkbox
                key={option?.value}
                label={option?.label}
                checked={config?.dietaryRestrictions?.includes(option?.value)}
                onChange={(e) => handleDietaryChange(option?.value, e?.target?.checked)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Sourcing Preferences */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-card-foreground">Sourcing Preferences</h3>
        
        <Checkbox
          label="Prioritize Local Sourcing"
          description="Prefer local farmers markets, co-ops, and nearby sustainable retailers"
          checked={config?.localSourcing}
          onChange={(e) => setConfig(prev => ({ ...prev, localSourcing: e?.target?.checked }))}
        />
      </div>
      {/* AI Optimization Sliders */}
      <div className="space-y-6">
        <h3 className="font-heading font-semibold text-card-foreground">AI Optimization Priorities</h3>
        
        <div className="space-y-6">
          {/* Sustainability Priority */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-card-foreground">Environmental Impact</label>
              <span className="text-sm text-success font-medium">{config?.sustainabilityPriority}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={config?.sustainabilityPriority}
              onChange={(e) => handleSliderChange('sustainabilityPriority', e?.target?.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider-success"
            />
            <p className="text-xs text-muted-foreground">Higher values prioritize low-carbon, sustainable products</p>
          </div>

          {/* Cost Priority */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-card-foreground">Cost Optimization</label>
              <span className="text-sm text-accent font-medium">{config?.costPriority}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={config?.costPriority}
              onChange={(e) => handleSliderChange('costPriority', e?.target?.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider-accent"
            />
            <p className="text-xs text-muted-foreground">Higher values prioritize budget-friendly options</p>
          </div>

          {/* Nutrition Priority */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-card-foreground">Nutritional Value</label>
              <span className="text-sm text-primary font-medium">{config?.nutritionPriority}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={config?.nutritionPriority}
              onChange={(e) => handleSliderChange('nutritionPriority', e?.target?.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider-primary"
            />
            <p className="text-xs text-muted-foreground">Higher values prioritize nutrient-dense foods</p>
          </div>
        </div>
      </div>
      {/* Generate Button */}
      <div className="pt-4 border-t border-border">
        <Button
          variant="default"
          size="lg"
          fullWidth
          loading={isGenerating}
          iconName="Sparkles"
          iconPosition="left"
          onClick={handleGenerate}
        >
          {isGenerating ? 'Generating Your Plan...' : 'Generate Monthly Plan'}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center mt-2">
          AI will optimize your grocery plan based on your preferences
        </p>
      </div>
      <style jsx>{`
        .slider-success::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-success);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .slider-accent::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-accent);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .slider-primary::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .slider-success::-webkit-slider-track {
          background: linear-gradient(to right, var(--color-muted) 0%, var(--color-success) 100%);
          height: 8px;
          border-radius: 4px;
        }
        
        .slider-accent::-webkit-slider-track {
          background: linear-gradient(to right, var(--color-muted) 0%, var(--color-accent) 100%);
          height: 8px;
          border-radius: 4px;
        }
        
        .slider-primary::-webkit-slider-track {
          background: linear-gradient(to right, var(--color-muted) 0%, var(--color-primary) 100%);
          height: 8px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default PlanConfigurationPanel;