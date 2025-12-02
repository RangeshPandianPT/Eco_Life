import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import NotificationToast from '../../components/ui/NotificationToast';

// Import components
import WeeklyCalendar from './components/WeeklyCalendar';
import PlanningPanel from './components/PlanningPanel';
import MealSuggestions from './components/MealSuggestions';
import NutritionalSummary from './components/NutritionalSummary';
import ExportOptions from './components/ExportOptions';
import MealDetailModal from './components/MealDetailModal';

const AIMealPlanner = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showMealModal, setShowMealModal] = useState(false);
  const [weeklyPlans, setWeeklyPlans] = useState([]);

  // Mock weekly meal plan data
  const mockWeeklyData = [
    {
      day: "Mon",
      date: "Sep 16",
      meals: {
        breakfast: {
          id: 1,
          name: "Overnight Chia Pudding",
          image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=300&h=200&fit=crop",
          prepTime: "5 min",
          co2Score: 0.2,
          calories: 280
        },
        lunch: {
          id: 2,
          name: "Mediterranean Quinoa Bowl",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
          prepTime: "15 min",
          co2Score: 0.3,
          calories: 420
        },
        dinner: {
          id: 3,
          name: "Lentil Curry with Rice",
          image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop",
          prepTime: "35 min",
          co2Score: 0.4,
          calories: 380
        }
      }
    },
    {
      day: "Tue",
      date: "Sep 17",
      meals: {
        breakfast: {
          id: 4,
          name: "Avocado Toast Deluxe",
          image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300&h=200&fit=crop",
          prepTime: "8 min",
          co2Score: 0.5,
          calories: 320
        },
        lunch: {
          id: 5,
          name: "Chickpea Salad Wrap",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
          prepTime: "12 min",
          co2Score: 0.3,
          calories: 390
        },
        dinner: {
          id: 6,
          name: "Thai Green Curry Vegetables",
          image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300&h=200&fit=crop",
          prepTime: "25 min",
          co2Score: 0.6,
          calories: 340
        }
      }
    },
    {
      day: "Wed",
      date: "Sep 18",
      meals: {
        breakfast: {
          id: 7,
          name: "Green Smoothie Bowl",
          image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=300&h=200&fit=crop",
          prepTime: "10 min",
          co2Score: 0.2,
          calories: 250
        },
        lunch: {
          id: 8,
          name: "Roasted Vegetable Salad",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
          prepTime: "20 min",
          co2Score: 0.4,
          calories: 350
        },
        dinner: {
          id: 9,
          name: "Mushroom Risotto",
          image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop",
          prepTime: "40 min",
          co2Score: 0.5,
          calories: 420
        }
      }
    },
    {
      day: "Thu",
      date: "Sep 19",
      meals: {
        breakfast: {
          id: 10,
          name: "Oatmeal with Berries",
          image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300&h=200&fit=crop",
          prepTime: "7 min",
          co2Score: 0.1,
          calories: 290
        },
        lunch: {
          id: 11,
          name: "Buddha Bowl",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
          prepTime: "18 min",
          co2Score: 0.3,
          calories: 380
        },
        dinner: {
          id: 12,
          name: "Stuffed Bell Peppers",
          image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300&h=200&fit=crop",
          prepTime: "45 min",
          co2Score: 0.4,
          calories: 360
        }
      }
    },
    {
      day: "Fri",
      date: "Sep 20",
      meals: {
        breakfast: {
          id: 13,
          name: "Yogurt Parfait",
          image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=300&h=200&fit=crop",
          prepTime: "5 min",
          co2Score: 0.3,
          calories: 260
        },
        lunch: {
          id: 14,
          name: "Veggie Burger Bowl",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
          prepTime: "15 min",
          co2Score: 0.4,
          calories: 410
        },
        dinner: {
          id: 15,
          name: "Pasta Primavera",
          image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop",
          prepTime: "30 min",
          co2Score: 0.5,
          calories: 390
        }
      }
    },
    {
      day: "Sat",
      date: "Sep 21",
      meals: {
        breakfast: {
          id: 16,
          name: "Weekend Pancakes",
          image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300&h=200&fit=crop",
          prepTime: "20 min",
          co2Score: 0.4,
          calories: 350
        },
        lunch: {
          id: 17,
          name: "Grilled Vegetable Sandwich",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
          prepTime: "15 min",
          co2Score: 0.3,
          calories: 320
        },
        dinner: {
          id: 18,
          name: "Eggplant Parmesan",
          image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300&h=200&fit=crop",
          prepTime: "50 min",
          co2Score: 0.6,
          calories: 450
        }
      }
    },
    {
      day: "Sun",
      date: "Sep 22",
      meals: {
        breakfast: {
          id: 19,
          name: "French Toast",
          image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=300&h=200&fit=crop",
          prepTime: "15 min",
          co2Score: 0.4,
          calories: 380
        },
        lunch: {
          id: 20,
          name: "Soup & Salad Combo",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
          prepTime: "25 min",
          co2Score: 0.2,
          calories: 300
        },
        dinner: {
          id: 21,
          name: "Vegetable Stir Fry",
          image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop",
          prepTime: "20 min",
          co2Score: 0.3,
          calories: 340
        }
      }
    }
  ];

  useEffect(() => {
    // Initialize with mock data
    setWeeklyPlans([mockWeeklyData]);
  }, []);

  const handleGeneratePlan = async (preferences) => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      console.log('Generating meal plan with preferences:', preferences);
      // In real app, would call AI service here
      setIsGenerating(false);
    }, 3000);
  };

  const handleMealSelect = (meal) => {
    setSelectedMeal(meal);
    setShowMealModal(true);
  };

  const handleMealReplace = (dayIndex, mealType) => {
    console.log(`Replacing ${mealType} for day ${dayIndex}`);
    setShowSuggestions(true);
  };

  const handleAddToGroceryList = (meal) => {
    console.log('Adding meal to grocery list:', meal?.name);
    // In real app, would add ingredients to grocery list
  };

  const handleDragStart = (e, meal) => {
    e?.dataTransfer?.setData('text/plain', JSON.stringify(meal));
  };

  const handleSelectSuggestion = (meal) => {
    console.log('Selected meal suggestion:', meal?.name);
    // In real app, would add to meal plan
  };

  const handleExport = async (exportOptions) => {
    setIsExporting(true);
    
    // Simulate export generation
    setTimeout(() => {
      console.log('Exporting meal plan:', exportOptions);
      setIsExporting(false);
    }, 2000);
  };

  const handleReplaceInPlan = (meal) => {
    console.log('Replacing meal in plan:', meal?.name);
    setShowMealModal(false);
  };

  const navigateWeek = (direction) => {
    if (direction === 'prev' && currentWeek > 0) {
      setCurrentWeek(currentWeek - 1);
    } else if (direction === 'next') {
      setCurrentWeek(currentWeek + 1);
    }
  };

  const currentWeekData = weeklyPlans?.[currentWeek] || mockWeeklyData;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-organic">
                <Icon name="ArrowLeft" size={20} />
              </Link>
              <h1 className="text-2xl font-bold text-foreground">AI Meal Planner</h1>
            </div>
            <p className="text-muted-foreground">
              Generate personalized weekly meal plans optimized for cost, nutrition, and environmental impact
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <Button
              variant="outline"
              iconName="Calendar"
              iconPosition="left"
              onClick={() => setShowSuggestions(!showSuggestions)}
            >
              {showSuggestions ? 'Hide' : 'Show'} Suggestions
            </Button>
            <Link to="/grocery-plan-generator">
              <Button
                variant="default"
                iconName="ShoppingCart"
                iconPosition="left"
              >
                Generate Grocery List
              </Button>
            </Link>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-6 p-4 bg-card border border-border rounded-lg">
          <Button
            variant="ghost"
            iconName="ChevronLeft"
            iconPosition="left"
            onClick={() => navigateWeek('prev')}
            disabled={currentWeek === 0}
          >
            Previous Week
          </Button>
          
          <div className="text-center">
            <h2 className="font-semibold text-card-foreground">
              Week of September 16 - 22, 2024
            </h2>
            <p className="text-sm text-muted-foreground">
              Sustainable meal planning for a healthier planet
            </p>
          </div>
          
          <Button
            variant="ghost"
            iconName="ChevronRight"
            iconPosition="right"
            onClick={() => navigateWeek('next')}
          >
            Next Week
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Sidebar - Planning Panel */}
          <div className="xl:col-span-1 space-y-6">
            <PlanningPanel
              onGeneratePlan={handleGeneratePlan}
              isGenerating={isGenerating}
              currentPreferences={{
                budget: 150,
                dietaryRestrictions: ['vegetarian'],
                localSourcing: 70,
                carbonGoal: 5.0,
                servings: 2,
                mealComplexity: 'medium'
              }}
            />
            
            <ExportOptions
              onExport={handleExport}
              isExporting={isExporting}
            />
          </div>

          {/* Center - Weekly Calendar */}
          <div className={`${showSuggestions ? 'xl:col-span-2' : 'xl:col-span-3'} space-y-6`}>
            <WeeklyCalendar
              weekData={currentWeekData}
              onMealSelect={handleMealSelect}
              onMealReplace={handleMealReplace}
              onAddToGroceryList={handleAddToGroceryList}
            />
          </div>

          {/* Right Sidebar - Suggestions & Summary */}
          {showSuggestions && (
            <div className="xl:col-span-1 space-y-6">
              <MealSuggestions
                suggestions={[]}
                onDragStart={handleDragStart}
                onSelectSuggestion={handleSelectSuggestion}
                isVisible={showSuggestions}
              />
            </div>
          )}
        </div>

        {/* Bottom Section - Nutritional Summary */}
        <div className="mt-6">
          <NutritionalSummary
            weeklyData={{
              calories: { current: 14280, target: 14700 },
              protein: { current: 520, target: 560 },
              carbs: { current: 1680, target: 1750 },
              fat: { current: 420, target: 490 },
              fiber: { current: 280, target: 350 },
              co2Total: { current: 12.4, target: 15.0 },
              cost: { current: 142.50, target: 150.00 },
              localSourcing: { current: 78, target: 70 }
            }}
            goals={{}}
          />
        </div>

        {/* Loading Overlay */}
        {isGenerating && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center">
            <div className="bg-card border border-border rounded-lg p-8 text-center max-w-md mx-4">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-card-foreground mb-2">Generating Your Meal Plan</h3>
              <p className="text-muted-foreground text-sm">
                Our AI is analyzing your preferences and creating the perfect sustainable meal plan...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Meal Detail Modal */}
      <MealDetailModal
        meal={selectedMeal}
        isOpen={showMealModal}
        onClose={() => setShowMealModal(false)}
        onAddToGroceryList={handleAddToGroceryList}
        onReplaceInPlan={handleReplaceInPlan}
      />

      <QuickActionButton />
      <NotificationToast />
    </div>
  );
};

export default AIMealPlanner;