import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PlanningPanel = ({ onGeneratePlan, isGenerating, currentPreferences }) => {
  const [preferences, setPreferences] = useState({
    budget: currentPreferences?.budget || 150,
    dietaryRestrictions: currentPreferences?.dietaryRestrictions || [],
    localSourcing: currentPreferences?.localSourcing || 70,
    carbonGoal: currentPreferences?.carbonGoal || 5.0,
    servings: currentPreferences?.servings || 2,
    mealComplexity: currentPreferences?.mealComplexity || 'medium',
    cuisinePreferences: currentPreferences?.cuisinePreferences || []
  });

  const [isCollapsed, setIsCollapsed] = useState(false);

  const dietaryOptions = [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten-Free' },
    { value: 'dairy-free', label: 'Dairy-Free' },
    { value: 'keto', label: 'Keto' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'low-carb', label: 'Low Carb' },
    { value: 'mediterranean', label: 'Mediterranean' }
  ];

  const complexityOptions = [
    { value: 'simple', label: 'Simple (15-20 min)' },
    { value: 'medium', label: 'Medium (20-40 min)' },
    { value: 'complex', label: 'Complex (40+ min)' }
  ];

  const cuisineOptions = [
    { value: 'italian', label: 'Italian' },
    { value: 'asian', label: 'Asian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'indian', label: 'Indian' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'american', label: 'American' },
    { value: 'french', label: 'French' },
    { value: 'thai', label: 'Thai' }
  ];

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleGeneratePlan = () => {
    onGeneratePlan(preferences);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={20} className="text-primary" />
          <h3 className="font-semibold text-card-foreground">Meal Planning Preferences</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName={isCollapsed ? "ChevronDown" : "ChevronUp"}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="md:hidden"
        />
      </div>
      {/* Content */}
      <div className={`p-4 space-y-6 ${isCollapsed ? 'hidden md:block' : ''}`}>
        {/* Budget & Servings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Weekly Budget"
            type="number"
            value={preferences?.budget}
            onChange={(e) => handlePreferenceChange('budget', Number(e?.target?.value))}
            placeholder="150"
            description="USD per week"
          />
          <Input
            label="Servings per Meal"
            type="number"
            value={preferences?.servings}
            onChange={(e) => handlePreferenceChange('servings', Number(e?.target?.value))}
            placeholder="2"
            min="1"
            max="8"
          />
        </div>

        {/* Dietary Restrictions */}
        <div>
          <Select
            label="Dietary Restrictions"
            description="Select all that apply"
            multiple
            searchable
            clearable
            options={dietaryOptions}
            value={preferences?.dietaryRestrictions}
            onChange={(value) => handlePreferenceChange('dietaryRestrictions', value)}
            placeholder="Choose dietary restrictions..."
          />
        </div>

        {/* Meal Complexity */}
        <div>
          <Select
            label="Meal Complexity"
            description="Preferred cooking time and difficulty"
            options={complexityOptions}
            value={preferences?.mealComplexity}
            onChange={(value) => handlePreferenceChange('mealComplexity', value)}
          />
        </div>

        {/* Cuisine Preferences */}
        <div>
          <Select
            label="Cuisine Preferences"
            description="Select preferred cuisines (optional)"
            multiple
            searchable
            clearable
            options={cuisineOptions}
            value={preferences?.cuisinePreferences}
            onChange={(value) => handlePreferenceChange('cuisinePreferences', value)}
            placeholder="Any cuisine..."
          />
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Local Sourcing Priority: {preferences?.localSourcing}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={preferences?.localSourcing}
              onChange={(e) => handlePreferenceChange('localSourcing', Number(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Any Source</span>
              <span>Local Only</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Weekly Carbon Goal: {preferences?.carbonGoal}kg CO₂
            </label>
            <input
              type="range"
              min="2"
              max="15"
              step="0.5"
              value={preferences?.carbonGoal}
              onChange={(e) => handlePreferenceChange('carbonGoal', Number(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Low Impact</span>
              <span>Flexible</span>
            </div>
          </div>
        </div>

        {/* AI Optimization Options */}
        <div className="space-y-3">
          <h4 className="font-medium text-card-foreground">AI Optimization</h4>
          <div className="space-y-2">
            <Checkbox
              label="Prioritize seasonal ingredients"
              checked={preferences?.seasonal || false}
              onChange={(e) => handlePreferenceChange('seasonal', e?.target?.checked)}
            />
            <Checkbox
              label="Include meal prep suggestions"
              checked={preferences?.mealPrep || false}
              onChange={(e) => handlePreferenceChange('mealPrep', e?.target?.checked)}
            />
            <Checkbox
              label="Optimize for leftover usage"
              checked={preferences?.leftovers || false}
              onChange={(e) => handlePreferenceChange('leftovers', e?.target?.checked)}
            />
            <Checkbox
              label="Include nutritional balance scoring"
              checked={preferences?.nutritionScore || true}
              onChange={(e) => handlePreferenceChange('nutritionScore', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Generate Button */}
        <Button
          variant="default"
          size="lg"
          fullWidth
          loading={isGenerating}
          iconName="Sparkles"
          iconPosition="left"
          onClick={handleGeneratePlan}
          className="mt-6"
        >
          {isGenerating ? 'Generating Plan...' : 'Generate AI Meal Plan'}
        </Button>
      </div>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid var(--color-background);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid var(--color-background);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default PlanningPanel;