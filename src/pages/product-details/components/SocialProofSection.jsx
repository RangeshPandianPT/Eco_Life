import React from 'react';
import Icon from '../../../components/AppIcon';

const SocialProofSection = ({ product }) => {
  const communityStats = {
    totalUsers: 12847,
    monthlyPurchases: 3421,
    co2SavedCommunity: 8.7,
    topReviewers: [
      {
        name: "Sarah Chen",
        avatar: "SC",
        level: "Eco Champion",
        purchases: 47,
        co2Saved: 12.3
      },
      {
        name: "Mike Rodriguez",
        avatar: "MR",
        level: "Green Warrior",
        purchases: 32,
        co2Saved: 8.9
      },
      {
        name: "Emma Thompson",
        avatar: "ET",
        level: "Sustainability Expert",
        purchases: 28,
        co2Saved: 7.2
      }
    ]
  };

  const usageStats = [
    {
      icon: 'Users',
      label: 'Active Users',
      value: communityStats?.totalUsers?.toLocaleString(),
      description: 'people choose this product'
    },
    {
      icon: 'ShoppingCart',
      label: 'Monthly Sales',
      value: communityStats?.monthlyPurchases?.toLocaleString(),
      description: 'units sold this month'
    },
    {
      icon: 'TreePine',
      label: 'Community Impact',
      value: `${communityStats?.co2SavedCommunity}t`,
      description: 'CO₂ saved collectively'
    }
  ];

  const testimonials = [
    {
      author: "Jennifer Walsh",
      role: "Nutritionist",
      avatar: "JW",
      rating: 5,
      text: `This product has become a staple in my meal planning recommendations. The nutritional profile is excellent and the environmental impact is significantly lower than conventional alternatives.`,
      verified: true,
      helpful: 23
    },
    {
      author: "David Kim",
      role: "Environmental Scientist",
      avatar: "DK",
      rating: 5,
      text: `I've analyzed the LCA data and this product truly delivers on its sustainability promises. The carbon footprint reduction is substantial and measurable.`,
      verified: true,
      helpful: 18
    },
    {
      author: "Maria Santos",
      role: "Home Chef",
      avatar: "MS",
      rating: 4,
      text: `Great quality and taste! My family loves it and I feel good knowing we're making an environmentally responsible choice. Will definitely repurchase.`,
      verified: false,
      helpful: 12
    }
  ];

  const achievements = [
    {
      icon: 'Award',
      title: 'Top Rated Product',
      description: 'Highest rated in sustainable grains category',
      color: 'text-warning'
    },
    {
      icon: 'TrendingUp',
      title: 'Fastest Growing',
      description: '300% increase in purchases this quarter',
      color: 'text-success'
    },
    {
      icon: 'Heart',
      title: 'Community Favorite',
      description: '94% would recommend to friends',
      color: 'text-accent'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Community Stats */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Community Impact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {usageStats?.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="flex justify-center mb-2">
                <Icon name={stat?.icon} size={24} color="var(--color-primary)" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
              <div className="text-sm font-medium text-foreground">{stat?.label}</div>
              <div className="text-xs text-muted-foreground">{stat?.description}</div>
            </div>
          ))}
        </div>

        {/* Top Community Members */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Top Community Contributors</h4>
          <div className="space-y-3">
            {communityStats?.topReviewers?.map((reviewer, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {reviewer?.avatar}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{reviewer?.name}</span>
                    <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">
                      {reviewer?.level}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{reviewer?.purchases} purchases</span>
                    <span>{reviewer?.co2Saved}kg CO₂ saved</span>
                  </div>
                </div>
                <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Product Achievements */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Product Achievements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements?.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-muted/20 rounded-lg">
              <Icon name={achievement?.icon} size={20} className={achievement?.color} />
              <div>
                <h4 className="font-medium text-foreground mb-1">{achievement?.title}</h4>
                <p className="text-sm text-muted-foreground">{achievement?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Expert Testimonials */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Expert & Community Reviews</h3>
        
        <div className="space-y-4">
          {testimonials?.map((testimonial, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {testimonial?.avatar}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-foreground">{testimonial?.author}</span>
                    <span className="text-sm text-muted-foreground">• {testimonial?.role}</span>
                    {testimonial?.verified && (
                      <div className="flex items-center space-x-1">
                        <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                        <span className="text-xs text-success">Verified</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        color={i < testimonial?.rating ? "var(--color-warning)" : "var(--color-muted)"}
                      />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {testimonial?.text}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-organic-fast">
                      <Icon name="ThumbsUp" size={14} />
                      <span>Helpful ({testimonial?.helpful})</span>
                    </button>
                    <button className="text-sm text-muted-foreground hover:text-foreground transition-organic-fast">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-primary hover:text-primary/80 font-medium transition-organic-fast">
            View All Reviews →
          </button>
        </div>
      </div>
      {/* Social Sharing */}
      <div className="bg-gradient-to-r from-primary/10 to-success/10 border border-primary/20 rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">Share Your Impact</h3>
          <p className="text-muted-foreground mb-4">
            Let your friends know about your sustainable choice and inspire others to make eco-friendly decisions.
          </p>
          
          <div className="flex justify-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-organic">
              <Icon name="Share2" size={16} />
              <span>Share Achievement</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-organic">
              <Icon name="TreePine" size={16} />
              <span>Track Impact</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofSection;