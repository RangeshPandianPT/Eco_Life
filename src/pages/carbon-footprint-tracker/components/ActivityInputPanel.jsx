import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ActivityInputPanel = ({ onActivityAdd, activeTab, setActiveTab }) => {
  const [foodData, setFoodData] = useState({
    meal: '',
    portion: '',
    type: ''
  });


  const mealTypes = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' }
  ];

  const portionSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'extra-large', label: 'Extra Large' }
  ];

  const dietaryTypes = [
    { value: 'meat', label: 'Meat-based' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'pescatarian', label: 'Pescatarian' }
  ];


  const tabs = [
    { id: 'food', label: 'Food', icon: 'ChefHat' }
  ];

  const handleFoodSubmit = (e) => {
    e?.preventDefault();
    if (foodData?.meal && foodData?.portion && foodData?.type) {
      const co2Impact = calculateFoodCO2(foodData);
      onActivityAdd({
        type: 'food',
        data: foodData,
        co2Impact,
        timestamp: new Date()
      });
      setFoodData({ meal: '', portion: '', type: '' });
    }
  };


  const calculateFoodCO2 = (data) => {
    const portionMultipliers = { small: 0.7, medium: 1, large: 1.3, 'extra-large': 1.6 };
    const typeMultipliers = { meat: 2.5, vegetarian: 1.2, vegan: 0.8, pescatarian: 1.8 };
    const baseCO2 = 1.5; // kg CO2 per meal
    return (baseCO2 * portionMultipliers?.[data?.portion] * typeMultipliers?.[data?.type])?.toFixed(2);
  };


  const renderFoodForm = () => (
    <form onSubmit={handleFoodSubmit} className="space-y-4">
      <Select
        label="Meal Type"
        options={mealTypes}
        value={foodData?.meal}
        onChange={(value) => setFoodData(prev => ({ ...prev, meal: value }))}
        placeholder="Select meal type"
        required
      />
      
      <Select
        label="Portion Size"
        options={portionSizes}
        value={foodData?.portion}
        onChange={(value) => setFoodData(prev => ({ ...prev, portion: value }))}
        placeholder="Select portion size"
        required
      />
      
      <Select
        label="Dietary Type"
        options={dietaryTypes}
        value={foodData?.type}
        onChange={(value) => setFoodData(prev => ({ ...prev, type: value }))}
        placeholder="Select dietary preference"
        required
      />
      
      <div className="flex space-x-2">
        <Button type="submit" variant="default" iconName="Plus" iconPosition="left" className="flex-1">
          Log Food Activity
        </Button>
        <Button type="button" variant="outline" iconName="QrCode" size="icon">
          <span className="sr-only">Scan Barcode</span>
        </Button>
      </div>
    </form>
  );

  return (
    <div className="bg-card rounded-lg border border-border shadow-organic">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-heading font-bold text-card-foreground mb-2">
          Log Daily Activities
        </h2>
        <p className="text-sm text-muted-foreground">
          Track your carbon footprint by logging travel and food consumption
        </p>
      </div>
      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-organic ${
              activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Form Content */}
      <div className="p-6">
        {activeTab === 'food' && renderFoodForm()}
      </div>
    </div>
  );
};

export default ActivityInputPanel;