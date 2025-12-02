import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MealSuggestions = ({ suggestions, onDragStart, onSelectSuggestion, isVisible }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Meals', icon: 'Utensils' },
    { id: 'breakfast', label: 'Breakfast', icon: 'Coffee' },
    { id: 'lunch', label: 'Lunch', icon: 'Sandwich' },
    { id: 'dinner', label: 'Dinner', icon: 'ChefHat' },
    { id: 'quick', label: 'Quick (<20min)', icon: 'Clock' },
    { id: 'low-carbon', label: 'Low Carbon', icon: 'Leaf' }
  ];

  const mockSuggestions = [
    {
      id: 1,
      name: "Mediterranean Quinoa Bowl",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
      category: "lunch",
      prepTime: "15 min",
      co2Score: 0.3,
      calories: 420,
      difficulty: "Easy",
      tags: ["vegetarian", "gluten-free", "high-protein"],
      ingredients: 8,
      rating: 4.8,
      description: "Fresh quinoa bowl with roasted vegetables, feta, and tahini dressing"
    },
    {
      id: 2,
      name: "Overnight Chia Pudding",
      image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=300&h=200&fit=crop",
      category: "breakfast",
      prepTime: "5 min",
      co2Score: 0.2,
      calories: 280,
      difficulty: "Easy",
      tags: ["vegan", "make-ahead", "high-fiber"],
      ingredients: 6,
      rating: 4.6,
      description: "Creamy chia pudding with almond milk, berries, and maple syrup"
    },
    {
      id: 3,
      name: "Lentil Curry with Rice",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop",
      category: "dinner",
      prepTime: "35 min",
      co2Score: 0.4,
      calories: 380,
      difficulty: "Medium",
      tags: ["vegan", "high-protein", "one-pot"],
      ingredients: 12,
      rating: 4.9,
      description: "Hearty red lentil curry with aromatic spices and basmati rice"
    },
    {
      id: 4,
      name: "Avocado Toast Deluxe",
      image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300&h=200&fit=crop",
      category: "breakfast",
      prepTime: "8 min",
      co2Score: 0.5,
      calories: 320,
      difficulty: "Easy",
      tags: ["vegetarian", "quick", "healthy-fats"],
      ingredients: 7,
      rating: 4.4,
      description: "Sourdough toast topped with smashed avocado, cherry tomatoes, and hemp seeds"
    },
    {
      id: 5,
      name: "Thai Green Curry Vegetables",
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300&h=200&fit=crop",
      category: "dinner",
      prepTime: "25 min",
      co2Score: 0.6,
      calories: 340,
      difficulty: "Medium",
      tags: ["vegan", "spicy", "coconut"],
      ingredients: 14,
      rating: 4.7,
      description: "Fragrant green curry with seasonal vegetables and jasmine rice"
    },
    {
      id: 6,
      name: "Chickpea Salad Wrap",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
      category: "lunch",
      prepTime: "12 min",
      co2Score: 0.3,
      calories: 390,
      difficulty: "Easy",
      tags: ["vegan", "portable", "high-fiber"],
      ingredients: 9,
      rating: 4.5,
      description: "Protein-packed chickpea salad with herbs in a whole wheat wrap"
    }
  ];

  const filteredSuggestions = mockSuggestions?.filter(meal => {
    const matchesCategory = activeCategory === 'all' || 
      meal?.category === activeCategory ||
      (activeCategory === 'quick' && parseInt(meal?.prepTime) < 20) ||
      (activeCategory === 'low-carbon' && meal?.co2Score <= 0.4);
    
    const matchesSearch = meal?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      meal?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const getCO2Color = (co2Score) => {
    if (co2Score <= 0.3) return 'text-success';
    if (co2Score <= 0.6) return 'text-warning';
    return 'text-error';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-success';
      case 'medium': return 'text-warning';
      case 'hard': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={20} className="text-primary" />
            <h3 className="font-semibold text-card-foreground">AI Meal Suggestions</h3>
          </div>
          <span className="text-sm text-muted-foreground">{filteredSuggestions?.length} meals</span>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search meals or ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-organic ${
                activeCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={category?.icon} size={12} />
              <span>{category?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Suggestions List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredSuggestions?.map((meal) => (
          <div
            key={meal?.id}
            draggable
            onDragStart={(e) => onDragStart(e, meal)}
            title={meal?.name}
            className="bg-background border border-border rounded-lg p-3 hover:shadow-organic-lg transition-transform transform-gpu hover:-translate-y-0.5 hover:scale-[1.01] cursor-move group"
          >
            <div className="flex space-x-3">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                <Image
                  src={meal?.image}
                  alt={meal?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-start justify-start p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-muted/80 text-muted-foreground text-xs px-2 py-1 rounded">{meal?.prepTime} • {meal?.co2Score}kg</span>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h4 className="font-medium text-card-foreground text-sm leading-tight">{meal?.name}</h4>
                  <div className="flex items-center space-x-1 ml-2">
                    <Icon name="Star" size={12} className="text-warning fill-current" />
                    <span className="text-xs text-muted-foreground">{meal?.rating}</span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{meal?.description}</p>
                
                <div className="flex items-center space-x-3 mt-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{meal?.prepTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Leaf" size={12} className={getCO2Color(meal?.co2Score)} />
                    <span className={`text-xs ${getCO2Color(meal?.co2Score)}`}>{meal?.co2Score}kg</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Flame" size={12} className="text-accent" />
                    <span className="text-xs text-muted-foreground">{meal?.calories}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-wrap gap-1">
                    {meal?.tags?.slice(0, 2)?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Plus"
                    onClick={() => onSelectSuggestion(meal)}
                    className="opacity-0 group-hover:opacity-100 transition-organic"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredSuggestions?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No meals found matching your criteria</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="mt-2"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealSuggestions;