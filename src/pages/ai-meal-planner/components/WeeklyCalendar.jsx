import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WeeklyCalendar = ({ weekData, onMealSelect, onMealReplace, onAddToGroceryList }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mealTypes = ['breakfast', 'lunch', 'dinner'];
  const mealIcons = {
    breakfast: 'Coffee',
    lunch: 'Sandwich',
    dinner: 'ChefHat'
  };

  const getCO2Color = (co2Score) => {
    if (co2Score <= 0.5) return 'text-success';
    if (co2Score <= 1.0) return 'text-warning';
    return 'text-error';
  };

  // Compact MealCard used inside calendar cells: small thumbnail centered with minimal metadata
  const MealCard = ({ meal, dayIndex, mealType }) => (
    <div className="w-full h-full flex items-center justify-center">
      {meal ? (
        <div className="w-20 h-20 rounded-lg overflow-hidden shadow-sm">
          <Image
            src={meal?.image}
            alt={meal?.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-20 h-20 rounded-lg bg-muted/40 border border-border flex items-center justify-center">
          <Icon name="Plus" size={20} className="text-muted-foreground" />
        </div>
      )}
    </div>
  );

  if (isMobileView) {
    return (
      <div className="bg-background">
        {/* Mobile Day Navigation */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronLeft"
            onClick={() => setSelectedDay(Math.max(0, selectedDay - 1))}
            disabled={selectedDay === 0}
          />
          <div className="text-center">
            <h3 className="font-semibold text-foreground">{weekData?.[selectedDay]?.day}</h3>
            <p className="text-sm text-muted-foreground">{weekData?.[selectedDay]?.date}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            onClick={() => setSelectedDay(Math.min(6, selectedDay + 1))}
            disabled={selectedDay === 6}
          />
        </div>
        {/* Mobile Meals */}
        <div className="p-4 space-y-4">
          {mealTypes?.map((mealType) => (
            <div key={mealType} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name={mealIcons?.[mealType]} size={16} className="text-primary" />
                <h4 className="font-medium text-foreground capitalize">{mealType}</h4>
              </div>
              <MealCard
                meal={weekData?.[selectedDay]?.meals?.[mealType]}
                dayIndex={selectedDay}
                mealType={mealType}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-lg border border-border">
      {/* Desktop Calendar Header */}
      <div className="grid grid-cols-8 border-b border-border">
        <div className="p-4 border-r border-border">
          <span className="text-sm font-medium text-muted-foreground">Meals</span>
        </div>
        {weekData?.map((day, index) => (
          <div key={index} className="p-4 text-center border-r border-border last:border-r-0">
            <div className="font-medium text-foreground">{day?.day}</div>
            <div className="text-sm text-muted-foreground">{day?.date}</div>
          </div>
        ))}
      </div>
      {/* Desktop Calendar Body */}
      {mealTypes?.map((mealType) => (
        <div key={mealType} className="grid grid-cols-8 border-b border-border last:border-b-0">
          <div className="p-4 border-r border-border bg-muted/30">
            <div className="flex items-center space-x-2">
              <Icon name={mealIcons?.[mealType]} size={16} className="text-primary" />
              <span className="font-medium text-foreground capitalize">{mealType}</span>
            </div>
          </div>
          {weekData?.map((day, dayIndex) => (
            <div key={dayIndex} className="p-3 border-r border-border last:border-r-0 flex items-center justify-center">
              <MealCard
                meal={day?.meals?.[mealType]}
                dayIndex={dayIndex}
                mealType={mealType}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WeeklyCalendar;