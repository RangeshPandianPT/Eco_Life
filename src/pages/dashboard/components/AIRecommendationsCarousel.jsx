import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AIRecommendationsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const recommendations = [
    {
      id: 1,
      type: 'product',
      title: 'Organic Quinoa Bowl Mix',
      description: 'Perfect alternative to your usual rice dishes',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
      carbonSaving: '0.8kg CO₂',
      price: '$12.99',
      rating: 4.8,
      reason: 'Based on your recent quinoa searches',
      category: 'Food',
      impact: 'High',
      availability: 'In Stock'
    },
    {
      id: 2,
      type: 'product',
      title: 'Bamboo Fiber Lunch Box',
      description: 'Sustainable replacement for plastic containers',
      image: 'https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?w=400&h=300&fit=crop',
      carbonSaving: '2.1kg CO₂',
      price: '$24.99',
      rating: 4.9,
      reason: 'Matches your zero-waste goals',
      category: 'Kitchen',
      impact: 'Very High',
      availability: 'Limited Stock'
    },
    {
      id: 3,
      type: 'meal',
      title: 'Mediterranean Chickpea Salad',
      description: 'Low-carbon protein-rich meal for tomorrow',
      image: 'https://images.pixabay.com/photo/2017/05/11/19/44/fresh-fruits-2305192_1280.jpg?w=400&h=300&fit=crop',
      carbonSaving: '1.2kg CO₂',
      price: 'Recipe',
      rating: 4.7,
      reason: 'Fits your dietary preferences',
      category: 'Meal Plan',
      impact: 'Medium',
      availability: 'Ready to Cook'
    },
    {
      id: 4,
      type: 'product',
      title: 'Reusable Produce Bags Set',
      description: 'Eliminate single-use plastic bags',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
      carbonSaving: '3.5kg CO₂',
      price: '$18.99',
      rating: 4.6,
      reason: 'Popular among eco-warriors',
      category: 'Shopping',
      impact: 'Very High',
      availability: 'In Stock'
    },
    {
      id: 5,
      type: 'activity',
      title: 'Bike to Work Challenge',
  description: 'Join 500+ users reducing emissions through lifestyle changes',
      image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?w=400&h=300&fit=crop',
      carbonSaving: '5.2kg CO₂',
      price: 'Free',
      rating: 4.9,
      reason: 'Based on your commute pattern',
  category: 'Mobility',
      impact: 'Extreme',
      availability: 'Join Now'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % recommendations?.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + recommendations?.length) % recommendations?.length);
  };

  const getImpactColor = (impact) => {
    const colors = {
      'Low': 'text-muted-foreground bg-muted/30',
      'Medium': 'text-accent bg-accent/10',
      'High': 'text-success bg-success/10',
      'Very High': 'text-primary bg-primary/10',
      'Extreme': 'text-destructive bg-destructive/10'
    };
    return colors?.[impact] || colors?.Medium;
  };

  const handleViewProduct = (recommendation) => {
    if (recommendation?.type === 'meal') {
      navigate('/ai-meal-planner');
    } else if (recommendation?.type === 'activity') {
      navigate('/carbon-footprint-tracker');
    } else {
      navigate('/product-details');
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-organic">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-card-foreground">AI Recommendations</h2>
          <p className="text-sm text-muted-foreground">Personalized eco-friendly suggestions for you</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevSlide}
            className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-organic-fast"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          <button
            onClick={nextSlide}
            className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-organic-fast"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {recommendations?.map((item) => (
            <div key={item?.id} className="w-full flex-shrink-0">
              <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Image */}
                  <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={item?.image}
                      alt={item?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-heading font-semibold text-card-foreground">{item?.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(item?.impact)}`}>
                            {item?.impact}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{item?.description}</p>
                        <p className="text-xs text-primary font-medium">{item?.reason}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Icon name="Leaf" size={14} color="var(--color-success)" />
                          <span className="text-sm font-medium text-success">{item?.carbonSaving}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={14} color="var(--color-accent)" />
                          <span className="text-sm text-muted-foreground">{item?.rating}</span>
                        </div>
                        <span className="text-sm font-medium text-card-foreground">{item?.price}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{item?.category}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-success font-medium">{item?.availability}</span>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Heart"
                          iconPosition="left"
                        >
                          Save
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleViewProduct(item)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-4">
        {recommendations?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-organic-fast ${
              index === currentIndex ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AIRecommendationsCarousel;