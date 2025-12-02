import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MealDetailModal = ({ meal, isOpen, onClose, onAddToGroceryList, onReplaceInPlan }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [servings, setServings] = useState(meal?.servings || 2);

  if (!isOpen || !meal) return null;

  const mockMealDetails = {
    ...meal,
    servings: 2,
    totalTime: "25 min",
    activeTime: "15 min",
    difficulty: "Easy",
    cuisine: "Mediterranean",
    dietaryTags: ["Vegetarian", "Gluten-Free", "High-Protein"],
    nutritionPer100g: {
      calories: 210,
      protein: 12,
      carbs: 28,
      fat: 6,
      fiber: 8,
      sugar: 4,
      sodium: 320
    },
    ingredients: [
      { name: "Quinoa", amount: "1 cup", co2: 0.1, cost: 2.50, local: true },
      { name: "Cherry Tomatoes", amount: "200g", co2: 0.05, cost: 1.80, local: true },
      { name: "Cucumber", amount: "1 medium", co2: 0.02, cost: 0.90, local: true },
      { name: "Red Onion", amount: "1/2 medium", co2: 0.01, cost: 0.40, local: true },
      { name: "Feta Cheese", amount: "100g", co2: 0.08, cost: 3.20, local: false },
      { name: "Olive Oil", amount: "2 tbsp", co2: 0.03, cost: 0.60, local: false },
      { name: "Lemon Juice", amount: "2 tbsp", co2: 0.01, cost: 0.30, local: true },
      { name: "Fresh Herbs", amount: "1/4 cup", co2: 0.005, cost: 1.20, local: true }
    ],
    instructions: [
      "Rinse quinoa thoroughly and cook according to package directions (about 15 minutes).",
      "While quinoa cooks, dice tomatoes, cucumber, and red onion into small pieces.",
      "Prepare dressing by whisking olive oil, lemon juice, salt, and pepper.",
      "Once quinoa is cooked and cooled slightly, combine with diced vegetables.",
      "Add crumbled feta cheese and fresh herbs to the mixture.",
      "Pour dressing over the salad and toss gently to combine.",
      "Let sit for 5 minutes to allow flavors to meld before serving.",
      "Garnish with additional herbs and serve at room temperature."
    ],
    tips: [
      "Cook quinoa in vegetable broth for extra flavor",
      "Let quinoa cool completely before mixing to prevent wilting",
      "This salad tastes even better the next day",
      "Add avocado just before serving to prevent browning"
    ],
    substitutions: [
      { original: "Quinoa", alternatives: ["Brown rice", "Bulgur wheat", "Couscous"] },
      { original: "Feta cheese", alternatives: ["Goat cheese", "Mozzarella", "Nutritional yeast (vegan)"] },
      { original: "Cherry tomatoes", alternatives: ["Regular tomatoes", "Sun-dried tomatoes", "Roasted peppers"] }
    ]
  };

  const details = mockMealDetails;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'ingredients', label: 'Ingredients', icon: 'ShoppingCart' },
    { id: 'instructions', label: 'Instructions', icon: 'BookOpen' },
    { id: 'nutrition', label: 'Nutrition', icon: 'BarChart3' }
  ];

  const adjustServings = (newServings) => {
    setServings(Math.max(1, Math.min(8, newServings)));
  };

  const getAdjustedAmount = (originalAmount, originalServings = 2) => {
    const multiplier = servings / originalServings;
    // Simple parsing for demonstration - in real app, would need more sophisticated parsing
    const match = originalAmount?.match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
    if (match) {
      const [, amount, unit] = match;
      const adjustedAmount = (parseFloat(amount) * multiplier)?.toFixed(1);
      return `${adjustedAmount} ${unit}`;
    }
    return originalAmount;
  };

  const getTotalCost = () => {
    const multiplier = servings / 2;
    return details?.ingredients?.reduce((total, ingredient) => total + (ingredient?.cost * multiplier), 0);
  };

  const getTotalCO2 = () => {
    const multiplier = servings / 2;
    return details?.ingredients?.reduce((total, ingredient) => total + (ingredient?.co2 * multiplier), 0);
  };

  const getCO2Color = (co2Score) => {
    if (co2Score <= 0.3) return 'text-success';
    if (co2Score <= 0.6) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-organic-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden">
              <Image
                src={details?.image}
                alt={details?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">{details?.name}</h2>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{details?.totalTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{servings} servings</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Leaf" size={14} className={getCO2Color(getTotalCO2())} />
                  <span className={`text-sm ${getCO2Color(getTotalCO2())}`}>{getTotalCO2()?.toFixed(2)}kg CO₂</span>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-organic ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <p className="text-muted-foreground leading-relaxed">{details?.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-background border border-border rounded-lg">
                  <Icon name="Clock" size={24} className="text-primary mx-auto mb-2" />
                  <div className="font-medium text-card-foreground">{details?.totalTime}</div>
                  <div className="text-sm text-muted-foreground">Total Time</div>
                </div>
                <div className="text-center p-4 bg-background border border-border rounded-lg">
                  <Icon name="ChefHat" size={24} className="text-primary mx-auto mb-2" />
                  <div className="font-medium text-card-foreground">{details?.difficulty}</div>
                  <div className="text-sm text-muted-foreground">Difficulty</div>
                </div>
                <div className="text-center p-4 bg-background border border-border rounded-lg">
                  <Icon name="DollarSign" size={24} className="text-primary mx-auto mb-2" />
                  <div className="font-medium text-card-foreground">${getTotalCost()?.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">Est. Cost</div>
                </div>
                <div className="text-center p-4 bg-background border border-border rounded-lg">
                  <Icon name="Leaf" size={24} className="text-success mx-auto mb-2" />
                  <div className="font-medium text-card-foreground">{getTotalCO2()?.toFixed(2)}kg</div>
                  <div className="text-sm text-muted-foreground">CO₂ Impact</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-card-foreground mb-2">Dietary Information</h4>
                <div className="flex flex-wrap gap-2">
                  {details?.dietaryTags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-success/10 text-success text-sm rounded-full border border-success/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-card-foreground">Ingredients</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Servings:</span>
                  <Button
                    variant="outline"
                    size="xs"
                    iconName="Minus"
                    onClick={() => adjustServings(servings - 1)}
                    disabled={servings <= 1}
                  />
                  <span className="w-8 text-center font-medium">{servings}</span>
                  <Button
                    variant="outline"
                    size="xs"
                    iconName="Plus"
                    onClick={() => adjustServings(servings + 1)}
                    disabled={servings >= 8}
                  />
                </div>
              </div>

              <div className="space-y-2">
                {details?.ingredients?.map((ingredient, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-card-foreground">{ingredient?.name}</span>
                        {ingredient?.local && (
                          <Icon name="MapPin" size={14} className="text-success" title="Local source available" />
                        )}
                      </div>
                      <span className="text-muted-foreground">-</span>
                      <span className="text-muted-foreground">{getAdjustedAmount(ingredient?.amount)}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <span className="text-muted-foreground">${(ingredient?.cost * servings / 2)?.toFixed(2)}</span>
                      <span className={getCO2Color(ingredient?.co2 * servings / 2)}>
                        {(ingredient?.co2 * servings / 2)?.toFixed(3)}kg
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-muted/30 border border-border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-card-foreground">Total Cost:</span>
                  <span className="font-semibold text-card-foreground">${getTotalCost()?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="font-medium text-card-foreground">Total CO₂:</span>
                  <span className={`font-semibold ${getCO2Color(getTotalCO2())}`}>{getTotalCO2()?.toFixed(2)}kg</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-card-foreground mb-4">Cooking Instructions</h4>
                <div className="space-y-4">
                  {details?.instructions?.map((step, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-muted-foreground leading-relaxed pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-card-foreground mb-3">Pro Tips</h4>
                <div className="space-y-2">
                  {details?.tips?.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon name="Lightbulb" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-card-foreground mb-3">Ingredient Substitutions</h4>
                <div className="space-y-3">
                  {details?.substitutions?.map((sub, index) => (
                    <div key={index} className="p-3 bg-background border border-border rounded-lg">
                      <div className="font-medium text-card-foreground mb-1">{sub?.original}</div>
                      <div className="text-sm text-muted-foreground">
                        Can substitute with: {sub?.alternatives?.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-card-foreground mb-4">Nutrition Facts (per serving)</h4>
                <div className="bg-background border border-border rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Calories</span>
                        <span className="font-medium text-card-foreground">{details?.nutritionPer100g?.calories}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Protein</span>
                        <span className="font-medium text-card-foreground">{details?.nutritionPer100g?.protein}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Carbohydrates</span>
                        <span className="font-medium text-card-foreground">{details?.nutritionPer100g?.carbs}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fat</span>
                        <span className="font-medium text-card-foreground">{details?.nutritionPer100g?.fat}g</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fiber</span>
                        <span className="font-medium text-card-foreground">{details?.nutritionPer100g?.fiber}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sugar</span>
                        <span className="font-medium text-card-foreground">{details?.nutritionPer100g?.sugar}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sodium</span>
                        <span className="font-medium text-card-foreground">{details?.nutritionPer100g?.sodium}mg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-card-foreground mb-3">Health Benefits</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <Icon name="Heart" size={16} className="text-error mt-0.5" />
                    <p className="text-sm text-muted-foreground">High in plant-based protein and fiber for heart health</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="Zap" size={16} className="text-warning mt-0.5" />
                    <p className="text-sm text-muted-foreground">Complex carbohydrates provide sustained energy</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="Shield" size={16} className="text-success mt-0.5" />
                    <p className="text-sm text-muted-foreground">Rich in antioxidants from fresh vegetables</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Star" size={16} className="text-warning" />
            <span>4.8/5 rating • 124 reviews</span>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              iconName="ShoppingCart"
              iconPosition="left"
              onClick={() => onAddToGroceryList(details)}
            >
              Add to Grocery List
            </Button>
            <Button
              variant="default"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={() => onReplaceInPlan(details)}
            >
              Use This Recipe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetailModal;