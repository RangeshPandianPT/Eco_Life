import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import NotificationToast from '../../components/ui/NotificationToast';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import CarbonComparisonPanel from './components/CarbonComparisonPanel';
import AIRecommendations from './components/AIRecommendations';
import SocialProofSection from './components/SocialProofSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');

  // Mock product data
  const mockProduct = {
    id: 1,
    name: "Organic Ancient Grain Mix",
    price: 12.99,
    originalPrice: 15.99,
    discount: 19,
    description: `A premium blend of organic ancient grains including quinoa, amaranth, and millet. Sustainably sourced from certified organic farms with minimal environmental impact. Rich in protein, fiber, and essential nutrients while supporting regenerative agriculture practices.`,
    images: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&h=600&fit=crop"
    ],
    carbonScore: 8.7,
    carbonImpact: "2.1 kg",
    carbonFootprint: 2.1,
    conventionalFootprint: 4.8,
    industryAverage: 3.9,
    certifications: ["USDA Organic", "Fair Trade", "Non-GMO", "Carbon Neutral"],
    features: [
      "100% Organic ancient grains",
      "High in protein and fiber",
      "Gluten-free certified",
      "Sustainably sourced",
      "Minimal processing",
      "Biodegradable packaging"
    ],
    nutrition: [
      { name: "Calories", value: "170 per serving" },
      { name: "Protein", value: "6g" },
      { name: "Fiber", value: "4g" },
      { name: "Iron", value: "15% DV" },
      { name: "Magnesium", value: "20% DV" },
      { name: "Phosphorus", value: "18% DV" }
    ],
    servingInfo: {
      size: "1/4 cup (45g)",
      perContainer: "About 8"
    },
    ingredients: "Organic quinoa, organic amaranth, organic millet, organic chia seeds, organic flaxseeds. Contains no artificial preservatives, colors, or flavors.",
    allergens: "May contain traces of tree nuts and soy. Processed in a facility that also processes wheat.",
    environmentalMetrics: [
      {
        name: "Water Usage",
        value: "45L",
        description: "60% less than conventional",
        icon: "Droplets"
      },
      {
        name: "Land Use",
        value: "0.3m²",
        description: "Efficient farming practices",
        icon: "MapPin"
      },
      {
        name: "Household Energy",
        value: "12 kWh",
        description: "Renewable energy powered",
        icon: "Zap"
      },
      {
        name: "Packaging",
        value: "85%",
        description: "Recyclable materials",
        icon: "Package"
      }
    ],
    environmentalBenefits: [
      "Supports regenerative agriculture",
      "Reduces soil erosion",
      "Promotes biodiversity",
      "Lower water consumption",
      "Carbon sequestration in soil",
      "Minimal chemical inputs"
    ],
    rating: 4.7,
    reviewCount: 324,
    ratingDistribution: {
      5: 68,
      4: 22,
      3: 7,
      2: 2,
      1: 1
    },
    reviews: [
      {
        author: "Sarah Mitchell",
        rating: 5,
        date: "2 weeks ago",
        comment: "Excellent quality and taste! I love knowing that I\'m making an environmentally responsible choice. The grains cook perfectly and have great texture.",
        helpful: 15
      },
      {
        author: "David Chen",
        rating: 5,
        date: "1 month ago",
        comment: "As a nutritionist, I recommend this to all my clients. The nutritional profile is outstanding and the sustainability credentials are impressive.",
        helpful: 12
      },
      {
        author: "Emma Rodriguez",
        rating: 4,
        date: "3 weeks ago",
        comment: "Great product overall. The packaging could be improved but the quality of the grains is top-notch. Will definitely repurchase.",
        helpful: 8
      }
    ]
  };

  useEffect(() => {
    // Simulate loading product data
    const loadProduct = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProduct(mockProduct);
      setLoading(false);
    };

    loadProduct();

    // If a recognized product was passed via navigation state (from scan), populate immediately
    const recognized = location?.state?.recognized;
    if (recognized) {
      // In real implementation you'd fetch product by id; use mockProduct for now
      setProduct(mockProduct);
      setLoading(false);
    }
    // Listen for scanned image events and navigate/populate product details
    const handleScannedImage = async (e) => {
      const file = e?.detail?.file;
      if (!file) return;
      setLoading(true);
      try {
        // Simulate upload and recognition delay
        await new Promise(res => setTimeout(res, 1000));
        // In a real implementation, you'd upload the file and get a matched product id
        // For now we use mockProduct as the recognized product
        setProduct(mockProduct);
        // Ensure the UI reflects the new product
        setActiveSection('overview');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener('product-scan-image', handleScannedImage);

    return () => {
      window.removeEventListener('product-scan-image', handleScannedImage);
    };
  }, [id]);

  const sections = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'comparison', label: 'Environmental Impact', icon: 'BarChart3' },
    { id: 'recommendations', label: 'Recommendations', icon: 'Brain' },
    { id: 'community', label: 'Community', icon: 'Users' }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <Icon name="AlertCircle" size={48} color="var(--color-error)" />
            <h2 className="text-xl font-semibold text-foreground">Product Not Found</h2>
            <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
            <Button
              variant="default"
              onClick={() => navigate('/dashboard')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NotificationToast />
      {/* Breadcrumb Navigation */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-muted-foreground hover:text-foreground transition-organic-fast"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={14} color="var(--color-muted-foreground)" />
            <button
              onClick={() => navigate('/product-details')}
              className="text-muted-foreground hover:text-foreground transition-organic-fast"
            >
              Products
            </button>
            <Icon name="ChevronRight" size={14} color="var(--color-muted-foreground)" />
            <span className="text-foreground font-medium truncate">{product?.name}</span>
          </nav>
        </div>
      </div>
      {/* Sticky Section Navigation */}
      <div className="sticky top-32 z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <nav className="flex space-x-8 overflow-x-auto py-3">
            {sections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => scrollToSection(section?.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-organic whitespace-nowrap ${
                  activeSection === section?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }`}
              >
                <Icon name={section?.icon} size={16} />
                <span>{section?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {/* Product Overview Section */}
        <section id="overview" className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Product Images */}
            <div>
              <ProductImageGallery product={product} />
            </div>

            {/* Product Information */}
            <div>
              <ProductInfo product={product} />
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-8">
            <ProductTabs product={product} />
          </div>
        </section>

        {/* Environmental Impact Section */}
        <section id="comparison" className="mb-12">
          <CarbonComparisonPanel product={product} />
        </section>

        {/* AI Recommendations Section */}
        <section id="recommendations" className="mb-12">
          <AIRecommendations currentProduct={product} />
        </section>

        {/* Community Section */}
        <section id="community" className="mb-12">
          <SocialProofSection product={product} />
        </section>

        {/* Bottom Action Bar */}
        <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border p-4 mt-12">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-primary">${product?.price}</div>
              <div className="flex items-center space-x-1">
                <Icon name="Leaf" size={16} color="var(--color-success)" />
                <span className="text-success font-medium">{product?.carbonScore}/10</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Heart"
                iconPosition="left"
              >
                Save
              </Button>
              <Button
                variant="default"
                size="lg"
                iconName="ShoppingCart"
                iconPosition="left"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
      <QuickActionButton />
    </div>
  );
};

export default ProductDetails;