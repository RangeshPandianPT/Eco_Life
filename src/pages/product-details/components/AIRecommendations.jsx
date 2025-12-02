import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIRecommendations = ({ currentProduct }) => {
  const [activeSection, setActiveSection] = useState('similar');

  const similarProducts = [
    {
      id: 2,
      name: "Organic Quinoa Blend",
      price: 8.99,
      originalPrice: 10.99,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
      carbonScore: 8.5,
      carbonFootprint: 1.8,
      rating: 4.6,
      match: 92
    },
    {
      id: 3,
      name: "Sustainable Brown Rice",
      price: 6.49,
      image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=300&h=300&fit=crop",
      carbonScore: 9.2,
      carbonFootprint: 1.2,
      rating: 4.8,
      match: 88
    },
    {
      id: 4,
      name: "Eco-Friendly Pasta",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=300&h=300&fit=crop",
      carbonScore: 7.8,
      carbonFootprint: 2.3,
      rating: 4.4,
      match: 85
    }
  ];

  const complementaryProducts = [
    {
      id: 5,
      name: "Organic Olive Oil",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop",
      carbonScore: 8.8,
      reason: "Perfect for cooking with organic grains"
    },
    {
      id: 6,
      name: "Fresh Herbs Bundle",
      price: 5.99,
      image: "https://images.unsplash.com/photo-1462536943532-57a629f6cc60?w=300&h=300&fit=crop",
      carbonScore: 9.5,
      reason: "Enhances flavor naturally"
    },
    {
      id: 7,
      name: "Sustainable Sea Salt",
      price: 3.99,
      image: "https://images.unsplash.com/photo-1472162314594-a27637f1bf1f?w=300&h=300&fit=crop",
      carbonScore: 8.2,
      reason: "Essential seasoning for healthy meals"
    }
  ];

  const sections = [
    { id: 'similar', label: 'Similar Products', icon: 'Search' },
    { id: 'complementary', label: 'Goes Well With', icon: 'Plus' }
  ];

  const getCarbonScoreColor = (score) => {
    if (score >= 8) return 'text-success';
    if (score >= 6) return 'text-warning';
    return 'text-error';
  };

  const renderSimilarProducts = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Sparkles" size={16} color="var(--color-primary)" />
        <span className="text-sm text-muted-foreground">
          AI-powered recommendations based on your preferences and sustainability goals
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {similarProducts?.map((product) => (
          <div key={product?.id} className="bg-white border border-border rounded-lg p-4 hover:shadow-organic-lg transition-organic">
            <div className="relative mb-3">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                {product?.match}% match
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-foreground line-clamp-2">{product?.name}</h4>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-primary">${product?.price}</span>
                  {product?.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product?.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} color="var(--color-warning)" />
                  <span className="text-sm text-muted-foreground">{product?.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Icon name="Leaf" size={14} color="var(--color-success)" />
                  <span className={`text-sm font-medium ${getCarbonScoreColor(product?.carbonScore)}`}>
                    {product?.carbonScore}/10
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {product?.carbonFootprint}kg CO₂
                </span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Plus"
                iconPosition="left"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderComplementaryProducts = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="ChefHat" size={16} color="var(--color-accent)" />
        <span className="text-sm text-muted-foreground">
          Complete your sustainable meal with these perfectly paired products
        </span>
      </div>
      
      <div className="space-y-3">
        {complementaryProducts?.map((product) => (
          <div key={product?.id} className="bg-white border border-border rounded-lg p-4 hover:shadow-organic transition-organic">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-1">{product?.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{product?.reason}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-primary">${product?.price}</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Leaf" size={12} color="var(--color-success)" />
                      <span className={`text-xs font-medium ${getCarbonScoreColor(product?.carbonScore)}`}>
                        {product?.carbonScore}/10
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Package" size={16} color="var(--color-accent)" />
          <span className="font-medium text-accent">Bundle Deal Available</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Save 15% when you buy all complementary products together with {currentProduct?.name}
        </p>
        <Button
          variant="default"
          size="sm"
          iconName="ShoppingCart"
          iconPosition="left"
        >
          Add Bundle to Cart
        </Button>
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Icon name="Brain" size={20} color="var(--color-primary)" />
        <h3 className="text-lg font-semibold text-foreground">AI Recommendations</h3>
      </div>
      {/* Section Navigation */}
      <div className="flex space-x-1 bg-muted rounded-lg p-1">
        {sections?.map((section) => (
          <button
            key={section?.id}
            onClick={() => setActiveSection(section?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-organic flex-1 justify-center ${
              activeSection === section?.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={section?.icon} size={16} />
            <span>{section?.label}</span>
          </button>
        ))}
      </div>
      {/* Section Content */}
      <div>
        {activeSection === 'similar' && renderSimilarProducts()}
        {activeSection === 'complementary' && renderComplementaryProducts()}
      </div>
      {/* View More Link */}
      <div className="text-center pt-4 border-t border-border">
        <Link
          to="/product-details"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium transition-organic-fast"
        >
          <span>Explore More Sustainable Products</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
    </div>
  );
};

export default AIRecommendations;