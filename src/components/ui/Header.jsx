import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Track Impact', path: '/carbon-footprint-tracker', icon: 'TreePine' },
    { label: 'Discover Products', path: '/product-details', icon: 'Search' },
    { label: 'Plan Meals', path: '/ai-meal-planner', icon: 'ChefHat' },
  ];

  const moreItems = [
    { label: 'Grocery Generator', path: '/grocery-plan-generator', icon: 'ShoppingCart' },
  ];

  const userProfile = {
    name: 'Alex Green',
    email: 'alex@ecolife.com',
    avatar: '/assets/images/avatar.jpg',
    co2Saved: '2.4 kg',
    level: 'Eco Warrior'
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event?.target?.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex h-16 items-center px-4 lg:px-6">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 mr-8">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Leaf" size={20} color="white" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">EcoLife</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 flex-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-organic ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            ))}

            {/* More Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreHorizontal"
                iconPosition="left"
                className="text-foreground"
              >
                More
              </Button>
            </div>
          </nav>

          {/* Desktop Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Quick Stats */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full">
              <Icon name="Leaf" size={14} color="var(--color-success)" />
              <span className="text-sm font-medium text-success">{userProfile?.co2Saved} saved today</span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative profile-dropdown">
              <button
                onClick={handleProfileToggle}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-muted transition-organic-fast"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {userProfile?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <Icon name="ChevronDown" size={16} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-organic-lg animate-slide-in-from-top">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium text-primary-foreground">
                          {userProfile?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-popover-foreground">{userProfile?.name}</p>
                        <p className="text-sm text-muted-foreground">{userProfile?.email}</p>
                        <p className="text-xs text-success font-medium">{userProfile?.level}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-organic-fast">
                      <Icon name="User" size={16} />
                      <span>Profile Settings</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-organic-fast">
                      <Icon name="Settings" size={16} />
                      <span>Preferences</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-organic-fast">
                      <Icon name="HelpCircle" size={16} />
                      <span>Help & Support</span>
                    </button>
                    <div className="border-t border-border my-2"></div>
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-organic-fast">
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-organic-fast"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background animate-slide-in-from-top">
            <div className="p-4 space-y-2">
              {[...navigationItems, ...moreItems]?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-organic ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </Link>
              ))}
              
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex items-center space-x-3 px-4 py-2">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {userProfile?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{userProfile?.name}</p>
                    <p className="text-sm text-muted-foreground">{userProfile?.email}</p>
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-organic-fast">
                    <Icon name="User" size={18} />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-organic-fast">
                    <Icon name="LogOut" size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Progress Indicator Bar */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="px-4 lg:px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={16} color="var(--color-success)" />
                <span className="text-sm font-medium text-foreground">Daily Goal</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-success rounded-full transition-all duration-500"></div>
                </div>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Icon name="Leaf" size={14} color="var(--color-success)" />
                <span className="text-success font-medium">2.4kg CO₂ saved</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Award" size={14} color="var(--color-accent)" />
                <span className="text-accent font-medium">Level 12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;