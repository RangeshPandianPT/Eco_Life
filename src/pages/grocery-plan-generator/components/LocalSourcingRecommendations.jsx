import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocalSourcingRecommendations = ({ recommendations }) => {
  const [selectedSource, setSelectedSource] = useState(null);

  const mockRecommendations = [
    {
      id: 1,
      name: "Green Valley Farmers Market",
      type: "Farmers Market",
      distance: 2.3,
      rating: 4.8,
      availability: "Sat-Sun 8AM-4PM",
      specialties: ["Organic Produce", "Local Honey", "Fresh Herbs"],
      co2Savings: 1.2,
      priceRange: "$$",
      address: "123 Market Street, Downtown",
      phone: "(555) 123-4567",
      website: "greenvalleymarket.com",
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Community Food Co-op",
      type: "Cooperative",
      distance: 1.8,
      rating: 4.6,
      availability: "Daily 7AM-10PM",
      specialties: ["Bulk Grains", "Organic Dairy", "Local Meat"],
      co2Savings: 0.8,
      priceRange: "$",
      address: "456 Oak Avenue, Midtown",
      phone: "(555) 234-5678",
      website: "communitycoop.org",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Sustainable Harvest Store",
      type: "Specialty Store",
      distance: 3.1,
      rating: 4.9,
      availability: "Mon-Sat 9AM-8PM",
      specialties: ["Zero Waste", "Plant-Based", "Eco Packaging"],
      co2Savings: 2.1,
      priceRange: "$$$",
      address: "789 Elm Street, Westside",
      phone: "(555) 345-6789",
      website: "sustainableharvest.com",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Urban Farm Direct",
      type: "Farm Stand",
      distance: 4.2,
      rating: 4.7,
      availability: "Wed-Sun 10AM-6PM",
      specialties: ["Hydroponic Greens", "Microgreens", "Seasonal Fruits"],
      co2Savings: 1.5,
      priceRange: "$$",
      address: "321 Farm Road, Northside",
      phone: "(555) 456-7890",
      website: "urbanfarmdirect.com",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=200&fit=crop"
    }
  ];

  const sources = recommendations || mockRecommendations;

  const getPriceColor = (range) => {
    const colors = {
      '$': 'text-success',
      '$$': 'text-warning',
      '$$$': 'text-error'
    };
    return colors?.[range] || 'text-muted-foreground';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'Farmers Market': 'Store',
      'Cooperative': 'Users',
      'Specialty Store': 'ShoppingBag',
      'Farm Stand': 'Sprout'
    };
    return icons?.[type] || 'MapPin';
  };

  const handleGetDirections = (source) => {
    // Mock implementation - would integrate with maps
    console.log(`Getting directions to ${source?.name}`);
  };

  const handleCallStore = (phone) => {
    window.open(`tel:${phone}`);
  };

  const handleVisitWebsite = (website) => {
    window.open(`https://${website}`, '_blank');
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="MapPin" size={20} color="var(--color-success)" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-card-foreground">Local Sourcing</h2>
            <p className="text-sm text-muted-foreground">
              Nearby sustainable retailers and farmers markets
            </p>
          </div>
        </div>
      </div>
      {/* Sources List */}
      <div className="divide-y divide-border">
        {sources?.map((source) => (
          <div key={source?.id} className="p-6 hover:bg-muted/30 transition-organic-fast">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
              {/* Source Image */}
              <div className="w-full lg:w-32 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={source?.image}
                  alt={source?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>

              {/* Source Info */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-heading font-semibold text-card-foreground">
                        {source?.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Icon name={getTypeIcon(source?.type)} size={14} color="var(--color-primary)" />
                        <span className="text-sm text-primary">{source?.type}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{source?.address}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} color="var(--color-warning)" />
                      <span className="text-sm font-medium text-card-foreground">{source?.rating}</span>
                    </div>
                    <p className={`text-sm font-medium ${getPriceColor(source?.priceRange)}`}>
                      {source?.priceRange}
                    </p>
                  </div>
                </div>

                {/* Distance and Availability */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{source?.distance} miles away</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{source?.availability}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Leaf" size={14} color="var(--color-success)" />
                    <span className="text-success">{source?.co2Savings}kg CO₂ saved</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2">
                  {source?.specialties?.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Navigation"
                    iconPosition="left"
                    onClick={() => handleGetDirections(source)}
                  >
                    Directions
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Phone"
                    iconPosition="left"
                    onClick={() => handleCallStore(source?.phone)}
                  >
                    Call
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="left"
                    onClick={() => handleVisitWebsite(source?.website)}
                  >
                    Website
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Map Integration */}
      <div className="p-6 border-t border-border">
        <div className="bg-muted rounded-lg overflow-hidden" style={{ height: '300px' }}>
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Local Sources Map"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=40.7128,-74.0060&z=12&output=embed"
            className="border-0"
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Interactive map showing all recommended local sources
        </p>
      </div>
    </div>
  );
};

export default LocalSourcingRecommendations;