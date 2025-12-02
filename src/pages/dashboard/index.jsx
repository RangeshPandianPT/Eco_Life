import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import NotificationToast from '../../components/ui/NotificationToast';
import CarbonFootprintCard from './components/CarbonFootprintCard';
import QuickActionsPanel from './components/QuickActionsPanel';
import AIRecommendationsCarousel from './components/AIRecommendationsCarousel';
import RecentActivityFeed from './components/RecentActivityFeed';
import NavigationTiles from './components/NavigationTiles';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScannedImage = async (e) => {
      const file = e?.detail?.file;
      if (!file) return;
      // Simulate recognition and navigate to product-details with mock data
      // In real flow, upload file and receive recognized product id/data
      const recognized = {
        id: 1,
        name: 'Scanned Product (from camera)'
      };
      navigate('/product-details', { state: { recognized } });
    };

    window.addEventListener('product-scan-image', handleScannedImage);
    return () => window.removeEventListener('product-scan-image', handleScannedImage);
  }, [navigate]);

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
  <title>Dashboard - EcoLife | Your Sustainable Living Hub</title>
  <meta name="description" content="Track your environmental impact, discover eco-friendly products, and access sustainable living tools on your EcoLife dashboard." />
        <meta name="keywords" content="carbon footprint, sustainable living, eco-friendly products, AI meal planner, environmental impact" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 lg:px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  {getGreeting()}, Alex! 🌱
                </h1>
                <p className="text-muted-foreground">
                  {formatDate(currentTime)} • Ready to make a positive impact today?
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-full">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-success">All systems active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Left Column - Main Content */}
            <div className="xl:col-span-3 space-y-8">
              {/* Carbon Footprint Card */}
              <CarbonFootprintCard />

              {/* Quick Actions Panel */}
              <QuickActionsPanel />

              {/* AI Recommendations */}
              <AIRecommendationsCarousel />

              {/* Navigation Tiles */}
              <NavigationTiles />

              {/* Recent Activity Feed */}
              <RecentActivityFeed />
            </div>

            {/* Right Column - Sidebar */}
            <div className="xl:col-span-1">
            </div>
          </div>

          {/* Mobile Optimization Notice */}
          <div className="mt-8 p-4 bg-primary/5 border border-primary/10 rounded-lg xl:hidden">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs text-primary-foreground">!</span>
              </div>
              <span className="text-sm font-medium text-primary">Mobile Tip</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Swipe left/right on recommendation cards and use the floating action button for quick access to features.
            </p>
          </div>
        </main>

        {/* Floating Components */}
        <QuickActionButton />
        <NotificationToast />
      </div>
    </>
  );
};

export default Dashboard;