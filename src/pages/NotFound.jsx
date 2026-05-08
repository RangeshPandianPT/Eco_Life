import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Basic event logging hook for product insights
    console.warn(`[Analytics] 404 Route Hit: ${location.pathname}`);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <h1 className="text-9xl font-bold text-primary opacity-20">404</h1>
          </div>
        </div>

        <h2 className="text-2xl font-medium text-onBackground mb-2">Page Not Found</h2>
        <p className="text-onBackground/70 mb-8">
          The page you're looking for doesn't exist. Let's get you back!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
          <Button
            variant="outline"
            icon={<Icon name="ArrowLeft" />}
            iconPosition="left"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>

          <Button
            variant="primary"
            icon={<Icon name="LayoutDashboard" />}
            iconPosition="left"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </Button>

          <Button
            variant="primary"
            icon={<Icon name="Leaf" />}
            iconPosition="left"
            onClick={() => navigate('/eco-tools')}
          >
            Go to Eco Tools
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
