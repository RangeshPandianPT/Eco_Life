import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';


const QuickActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contextActions, setContextActions] = useState([]);
  const location = useLocation();

  const allActions = [
    {
      id: 'scan-product',
      label: 'Scan Product',
      icon: 'QrCode',
      color: 'primary',
      contexts: ['/product-details', '/dashboard']
    },
    {
      id: 'log-activity',
      label: 'Log Activity',
      icon: 'Plus',
      color: 'success',
      contexts: ['/carbon-footprint-tracker', '/dashboard']
    },
    {
      id: 'add-meal',
      label: 'Add Meal',
      icon: 'ChefHat',
      color: 'accent',
      contexts: ['/ai-meal-planner', '/dashboard']
    },
    {
      id: 'quick-recipe',
      label: 'Quick Recipe',
      icon: 'BookOpen',
      color: 'secondary',
      contexts: ['/ai-meal-planner', '/grocery-plan-generator']
    },
    {
      id: 'track-carbon',
      label: 'Track Carbon',
      icon: 'TreePine',
      color: 'success',
      contexts: ['/dashboard']
    }
  ];

  useEffect(() => {
    const getContextualActions = () => {
      const currentPath = location?.pathname;
      const relevantActions = allActions?.filter(action => 
        action?.contexts?.includes(currentPath)
      )?.slice(0, 3); // Limit to 3 most relevant actions

      setContextActions(relevantActions);
    };

    getContextualActions();
  }, [location?.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event?.target?.closest('.quick-action-fab')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Create a hidden file input to trigger camera on mobile devices (capture='environment')
  const fileInputRef = React.useRef(null);

  const handleActionClick = (actionId) => {
    setIsOpen(false);

    switch (actionId) {
      case 'scan-product':
        // Trigger hidden file input with camera capture where supported
        if (fileInputRef?.current) {
          fileInputRef.current.value = null;
          fileInputRef.current.click();
        } else {
          console.log('Camera input not available');
        }
        break;
      case 'log-activity':
        console.log('Opening activity logger...');
        break;
      case 'add-meal':
        console.log('Opening meal planner...');
        break;
      case 'quick-recipe':
        console.log('Opening recipe suggestions...');
        break;
      case 'track-carbon':
        console.log('Opening carbon tracker...');
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
      success: 'bg-success hover:bg-success/90 text-success-foreground',
      accent: 'bg-accent hover:bg-accent/90 text-accent-foreground',
      secondary: 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 quick-action-fab">
      {/* Hidden file input to open camera on supported devices */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e?.target?.files?.[0];
          if (file) {
            // For now just log — later this can be wired to product recognition flow
            console.log('Captured file ready for scan:', file?.name);
            // dispatch a custom event that product discovery listeners can pick up
            const event = new CustomEvent('product-scan-image', { detail: { file } });
            window.dispatchEvent(event);
          }
        }}
      />
      {/* Action Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-slide-in-from-bottom">
          {contextActions?.map((action, index) => (
            <div
              key={action?.id}
              className="flex items-center space-x-3 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="bg-popover text-popover-foreground px-3 py-1 rounded-lg text-sm font-medium shadow-organic whitespace-nowrap">
                {action?.label}
              </span>
              <button
                onClick={() => handleActionClick(action?.id)}
                className={`w-12 h-12 rounded-full shadow-organic-lg transition-organic ${getColorClasses(action?.color)}`}
              >
                <Icon name={action?.icon} size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-5 bottom-24 z-50 w-14 h-14 rounded-full shadow-organic-lg transition-organic ${
          isOpen 
            ? 'bg-muted text-muted-foreground rotate-45' 
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }`}
      >
        <Icon name={isOpen ? "X" : "Plus"} size={24} />
      </button>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default QuickActionButton;