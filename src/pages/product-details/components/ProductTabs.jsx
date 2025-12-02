import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('nutrition');

  const tabs = [
    { id: 'nutrition', label: 'Nutrition Facts', icon: 'Apple' },
    { id: 'ingredients', label: 'Ingredients', icon: 'List' },
    { id: 'environmental', label: 'Environmental Impact', icon: 'TreePine' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' }
  ];

  const renderNutritionFacts = () => (
    <div className="space-y-4">
      <div className="bg-white border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Nutrition Facts</h4>
        <div className="space-y-2">
          {product?.nutrition?.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-1 border-b border-border last:border-b-0">
              <span className="text-muted-foreground">{item?.name}</span>
              <span className="font-medium text-foreground">{item?.value}</span>
            </div>
          ))}
        </div>
      </div>
      
      {product?.servingInfo && (
        <div className="bg-muted/50 p-3 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Serving Size:</strong> {product?.servingInfo?.size} | 
            <strong> Servings per container:</strong> {product?.servingInfo?.perContainer}
          </p>
        </div>
      )}
    </div>
  );

  const renderIngredients = () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-foreground mb-3">Ingredients List</h4>
        <p className="text-muted-foreground leading-relaxed">
          {product?.ingredients}
        </p>
      </div>
      
      {product?.allergens && (
        <div className="bg-warning/10 border border-warning/20 p-3 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5" />
            <div>
              <h5 className="font-medium text-warning mb-1">Allergen Information</h5>
              <p className="text-sm text-muted-foreground">{product?.allergens}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderEnvironmentalImpact = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {product?.environmentalMetrics?.map((metric, index) => (
          <div key={index} className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name={metric?.icon} size={16} color="var(--color-primary)" />
              <h5 className="font-medium text-foreground">{metric?.name}</h5>
            </div>
            <p className="text-2xl font-bold text-primary mb-1">{metric?.value}</p>
            <p className="text-sm text-muted-foreground">{metric?.description}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-success/10 p-4 rounded-lg">
        <h5 className="font-medium text-success mb-2">Environmental Benefits</h5>
        <ul className="space-y-1">
          {product?.environmentalBenefits?.map((benefit, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Icon name="Check" size={14} color="var(--color-success)" className="mt-0.5" />
              <span className="text-sm text-muted-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="space-y-4">
      {/* Rating Summary */}
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">{product?.rating}</div>
            <div className="flex items-center justify-center space-x-1 mb-1">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={16}
                  color={i < Math.floor(product?.rating) ? "var(--color-warning)" : "var(--color-muted)"}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">{product?.reviewCount} reviews</div>
          </div>
          
          <div className="flex-1">
            {[5, 4, 3, 2, 1]?.map((stars) => (
              <div key={stars} className="flex items-center space-x-2 mb-1">
                <span className="text-sm text-muted-foreground w-8">{stars}★</span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-warning h-2 rounded-full"
                    style={{ width: `${(product?.ratingDistribution?.[stars] || 0)}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {product?.ratingDistribution?.[stars] || 0}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-3">
        {product?.reviews?.map((review, index) => (
          <div key={index} className="bg-white border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {review?.author?.split(' ')?.map(n => n?.[0])?.join('')}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-foreground">{review?.author}</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={12}
                        color={i < review?.rating ? "var(--color-warning)" : "var(--color-muted)"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{review?.date}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{review?.comment}</p>
                {review?.helpful && (
                  <div className="mt-2 flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-organic-fast">
                      <Icon name="ThumbsUp" size={14} />
                      <span>Helpful ({review?.helpful})</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'nutrition':
        return renderNutritionFacts();
      case 'ingredients':
        return renderIngredients();
      case 'environmental':
        return renderEnvironmentalImpact();
      case 'reviews':
        return renderReviews();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-organic whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;