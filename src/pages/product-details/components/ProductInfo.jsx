import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product }) => {
  const certifications = product?.certifications || [];
  
  const getCarbonScoreColor = (score) => {
    if (score >= 8) return 'text-success';
    if (score >= 6) return 'text-warning';
    return 'text-error';
  };

  const getCarbonScoreBg = (score) => {
    if (score >= 8) return 'bg-success/10';
    if (score >= 6) return 'bg-warning/10';
    return 'bg-error/10';
  };

  return (
    <div className="space-y-6">
      {/* Product Title and Price */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          {product?.name}
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-3xl font-bold text-primary">
            ${product?.price}
          </span>
          {product?.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              ${product?.originalPrice}
            </span>
          )}
          {product?.discount && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-sm font-medium">
              {product?.discount}% OFF
            </span>
          )}
        </div>
      </div>
      {/* Carbon Footprint Score */}
      <div className={`p-4 rounded-lg ${getCarbonScoreBg(product?.carbonScore)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Leaf" size={20} color="var(--color-success)" />
            <span className="font-medium text-foreground">Carbon Footprint Score</span>
          </div>
          <div className={`text-2xl font-bold ${getCarbonScoreColor(product?.carbonScore)}`}>
            {product?.carbonScore}/10
          </div>
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <div className="flex-1 bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                product?.carbonScore >= 8 ? 'bg-success' :
                product?.carbonScore >= 6 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${product?.carbonScore * 10}%` }}
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {product?.carbonImpact} CO₂
          </span>
        </div>
      </div>
      {/* Certifications */}
      {certifications?.length > 0 && (
        <div>
          <h3 className="font-medium text-foreground mb-3">Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {certifications?.map((cert, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-success/10 text-success px-3 py-1 rounded-full text-sm"
              >
                <Icon name="Award" size={14} />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Product Description */}
      <div>
        <h3 className="font-medium text-foreground mb-2">Description</h3>
        <p className="text-muted-foreground leading-relaxed">
          {product?.description}
        </p>
      </div>
      {/* Key Features */}
      {product?.features && (
        <div>
          <h3 className="font-medium text-foreground mb-3">Key Features</h3>
          <ul className="space-y-2">
            {product?.features?.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="Check" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          iconName="ShoppingCart"
          iconPosition="left"
        >
          Add to Cart
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            iconName="Heart"
            iconPosition="left"
          >
            Save
          </Button>
          <Button
            variant="outline"
            iconName="Share"
            iconPosition="left"
          >
            Share
          </Button>
        </div>

        <Button
          variant="secondary"
          fullWidth
          iconName="Plus"
          iconPosition="left"
        >
          Add to Meal Plan
        </Button>
      </div>
      {/* Availability Status */}
      <div className="flex items-center space-x-2 p-3 bg-success/10 rounded-lg">
        <Icon name="CheckCircle" size={16} color="var(--color-success)" />
        <span className="text-success font-medium">In Stock</span>
        <span className="text-muted-foreground">• Ships within 2-3 days</span>
      </div>
    </div>
  );
};

export default ProductInfo;