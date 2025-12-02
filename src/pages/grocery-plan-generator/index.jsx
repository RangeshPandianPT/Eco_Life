import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import NotificationToast from '../../components/ui/NotificationToast';
import PlanConfigurationPanel from './components/PlanConfigurationPanel';
import GroceryListDisplay from './components/GroceryListDisplay';
import LocalSourcingRecommendations from './components/LocalSourcingRecommendations';
import CostOptimizationAnalysis from './components/CostOptimizationAnalysis';
import NutritionalAnalysisResults from './components/NutritionalAnalysisResults';
import ExportOptionsPanel from './components/ExportOptionsPanel';
import Icon from '../../components/AppIcon';


const GroceryPlanGenerator = () => {
  const [activeTab, setActiveTab] = useState('configure');
  const [groceryPlan, setGroceryPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  // Mock grocery plan data
  const mockGroceryPlan = {
    id: 'plan-2024-09',
    generatedAt: new Date()?.toISOString(),
    totalCost: 420.50,
    totalCO2: 18.4,
    categories: {
      produce: [
        {
          name: "Organic Bananas",
          quantity: 2,
          unit: "lbs",
          totalCost: 3.98,
          co2Impact: 0.8,
          localSource: false,
          selected: true
        },
        {
          name: "Local Spinach",
          quantity: 1,
          unit: "bunch",
          totalCost: 2.50,
          co2Impact: 0.2,
          localSource: true,
          selected: true
        },
        {
          name: "Organic Carrots",
          quantity: 2,
          unit: "lbs",
          totalCost: 4.50,
          co2Impact: 0.6,
          localSource: false,
          selected: true
        },
        {
          name: "Local Tomatoes",
          quantity: 3,
          unit: "lbs",
          totalCost: 8.25,
          co2Impact: 1.2,
          localSource: true,
          selected: true
        }
      ],
      proteins: [
        {
          name: "Organic Chicken Breast",
          quantity: 2,
          unit: "lbs",
          totalCost: 18.50,
          co2Impact: 4.2,
          localSource: false,
          selected: true
        },
        {
          name: "Wild-Caught Salmon",
          quantity: 1.5,
          unit: "lbs",
          totalCost: 24.75,
          co2Impact: 2.8,
          localSource: false,
          selected: true
        },
        {
          name: "Organic Tofu",
          quantity: 2,
          unit: "blocks",
          totalCost: 6.50,
          co2Impact: 0.9,
          localSource: false,
          selected: true
        },
        {
          name: "Local Eggs",
          quantity: 2,
          unit: "dozen",
          totalCost: 8.00,
          co2Impact: 1.4,
          localSource: true,
          selected: true
        }
      ],
      pantry: [
        {
          name: "Organic Brown Rice",
          quantity: 5,
          unit: "lbs",
          totalCost: 12.50,
          co2Impact: 1.8,
          localSource: false,
          selected: true
        },
        {
          name: "Quinoa",
          quantity: 2,
          unit: "lbs",
          totalCost: 15.00,
          co2Impact: 1.2,
          localSource: false,
          selected: true
        },
        {
          name: "Olive Oil",
          quantity: 1,
          unit: "bottle",
          totalCost: 8.99,
          co2Impact: 0.5,
          localSource: false,
          selected: true
        }
      ],
      dairy: [
        {
          name: "Organic Milk",
          quantity: 1,
          unit: "gallon",
          totalCost: 5.50,
          co2Impact: 2.1,
          localSource: false,
          selected: true
        },
        {
          name: "Greek Yogurt",
          quantity: 4,
          unit: "cups",
          totalCost: 6.00,
          co2Impact: 1.2,
          localSource: false,
          selected: true
        }
      ]
    }
  };

  const handleGeneratePlan = async (config) => {
    setIsGenerating(true);
    
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate plan based on config
      setGroceryPlan(mockGroceryPlan);
      setActiveTab('results');
      
      // Mock analysis data
      setAnalysisData({
        comparison: [
          { store: 'Walmart', cost: 380, co2: 15.2, savings: 0 },
          { store: 'Whole Foods', cost: 520, co2: 8.4, savings: 6.8 },
          { store: 'Local Co-op', cost: 450, co2: 6.2, savings: 9.0 },
          { store: 'Mixed Sources', cost: 420, co2: 5.8, savings: 9.4 }
        ]
      });
      
    } catch (error) {
      console.error('Failed to generate plan:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleItemToggle = (category, index, selected) => {
    setGroceryPlan(prev => ({
      ...prev,
      categories: {
        ...prev?.categories,
        [category]: prev?.categories?.[category]?.map((item, i) => 
          i === index ? { ...item, selected } : item
        )
      }
    }));
  };

  const handleExport = (exportData) => {
    console.log('Exporting plan:', exportData);
    // Mock export success notification
  };

  const tabs = [
    { id: 'configure', label: 'Configure', icon: 'Settings' },
    { id: 'results', label: 'Grocery List', icon: 'ShoppingCart' },
    { id: 'sourcing', label: 'Local Sources', icon: 'MapPin' },
    { id: 'analysis', label: 'Cost Analysis', icon: 'TrendingUp' },
    { id: 'nutrition', label: 'Nutrition', icon: 'Activity' },
    { id: 'export', label: 'Export', icon: 'Download' }
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case 'configure':
        return (
          <PlanConfigurationPanel 
            onGeneratePlan={handleGeneratePlan}
            isGenerating={isGenerating}
          />
        );
      case 'results':
        return (
          <GroceryListDisplay 
            groceryPlan={groceryPlan}
            onItemToggle={handleItemToggle}
          />
        );
      case 'sourcing':
        return <LocalSourcingRecommendations recommendations={groceryPlan?.categories || {}} />;
      case 'analysis':
        return <CostOptimizationAnalysis analysisData={analysisData} />;
      case 'nutrition':
        return <NutritionalAnalysisResults nutritionData={groceryPlan || null} />;
      case 'export':
        return (
          <ExportOptionsPanel 
            groceryPlan={groceryPlan}
            onExport={handleExport}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
  <title>Grocery Plan Generator - EcoLife</title>
        <meta name="description" content="Generate optimized monthly grocery plans balancing cost, nutrition, and environmental impact with AI-powered recommendations." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Icon name="ShoppingCart" size={24} color="var(--color-secondary)" />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Grocery Plan Generator
                </h1>
                <p className="text-muted-foreground">
                  Create optimized monthly shopping plans balancing cost, nutrition, and sustainability
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            {groceryPlan && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-card border border-border rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary">
                    ${groceryPlan?.totalCost?.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">Monthly Budget</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">
                    {groceryPlan?.totalCO2?.toFixed(1)}kg
                  </p>
                  <p className="text-sm text-muted-foreground">CO₂ Impact</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    {Object.values(groceryPlan?.categories)?.reduce((sum, items) => sum + items?.length, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">
                    {Object.values(groceryPlan?.categories)?.reduce((sum, items) => 
                      sum + items?.filter(item => item?.localSource)?.length, 0
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">Local Items</p>
                </div>
              </div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  disabled={tab?.id !== 'configure' && !groceryPlan}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-organic-fast ${
                    activeTab === tab?.id
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span className="hidden sm:inline">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {getTabContent()}
          </div>

          {/* Loading Overlay */}
          {isGenerating && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="bg-card border border-border rounded-lg p-8 max-w-md mx-4 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Sparkles" size={32} color="var(--color-primary)" className="animate-pulse" />
                </div>
                <h3 className="text-xl font-heading font-bold text-card-foreground mb-2">
                  Generating Your Plan
                </h3>
                <p className="text-muted-foreground mb-4">
                  AI is optimizing your grocery list based on your preferences...
                </p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          )}
        </main>

        <QuickActionButton />
        <NotificationToast />
      </div>
    </>
  );
};

export default GroceryPlanGenerator;