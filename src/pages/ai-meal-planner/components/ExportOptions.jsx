import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportOptions = ({ onExport, isExporting }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    shoppingList: true,
    recipeCards: true,
    mealPrepSchedule: false,
    nutritionSummary: true,
    costBreakdown: true,
    sourcingRecommendations: false
  });

  const [exportFormat, setExportFormat] = useState('pdf');
  const [isExpanded, setIsExpanded] = useState(false);

  const exportOptions = [
    {
      key: 'shoppingList',
      label: 'Shopping List',
      description: 'Organized grocery list with quantities',
      icon: 'ShoppingCart'
    },
    {
      key: 'recipeCards',
      label: 'Recipe Cards',
      description: 'Detailed cooking instructions for each meal',
      icon: 'BookOpen'
    },
    {
      key: 'mealPrepSchedule',
      label: 'Meal Prep Schedule',
      description: 'Weekly preparation timeline and tips',
      icon: 'Calendar'
    },
    {
      key: 'nutritionSummary',
      label: 'Nutrition Summary',
      description: 'Weekly nutritional breakdown and goals',
      icon: 'BarChart3'
    },
    {
      key: 'costBreakdown',
      label: 'Cost Breakdown',
      description: 'Detailed expense analysis by category',
      icon: 'DollarSign'
    },
    {
      key: 'sourcingRecommendations',
      label: 'Sourcing Recommendations',
      description: 'Local stores and sustainable suppliers',
      icon: 'MapPin'
    }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document', icon: 'FileText' },
    { value: 'csv', label: 'CSV Spreadsheet', icon: 'Table' },
    { value: 'email', label: 'Email Summary', icon: 'Mail' }
  ];

  const handleOptionChange = (key, checked) => {
    setSelectedOptions(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleExport = () => {
    const selectedItems = Object.entries(selectedOptions)?.filter(([key, value]) => value)?.map(([key]) => key);
    
    onExport({
      format: exportFormat,
      options: selectedItems
    });
  };

  const getSelectedCount = () => {
    return Object.values(selectedOptions)?.filter(Boolean)?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Download" size={20} className="text-primary" />
          <h3 className="font-semibold text-card-foreground">Export Meal Plan</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden"
        />
      </div>
      {/* Content */}
      <div className={`p-4 space-y-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* Format Selection */}
        <div>
          <h4 className="font-medium text-card-foreground mb-3">Export Format</h4>
          <div className="grid grid-cols-1 gap-2">
            {formatOptions?.map((format) => (
              <label
                key={format?.value}
                className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-organic ${
                  exportFormat === format?.value
                    ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
                }`}
              >
                <input
                  type="radio"
                  name="exportFormat"
                  value={format?.value}
                  checked={exportFormat === format?.value}
                  onChange={(e) => setExportFormat(e?.target?.value)}
                  className="sr-only"
                />
                <Icon 
                  name={format?.icon} 
                  size={16} 
                  className={exportFormat === format?.value ? 'text-primary' : 'text-muted-foreground'} 
                />
                <span className={`font-medium ${
                  exportFormat === format?.value ? 'text-primary' : 'text-card-foreground'
                }`}>
                  {format?.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-card-foreground">Include in Export</h4>
            <span className="text-sm text-muted-foreground">
              {getSelectedCount()} of {exportOptions?.length} selected
            </span>
          </div>
          
          <div className="space-y-3">
            {exportOptions?.map((option) => (
              <div key={option?.key} className="flex items-start space-x-3 p-3 bg-background border border-border rounded-lg">
                <Checkbox
                  checked={selectedOptions?.[option?.key]}
                  onChange={(e) => handleOptionChange(option?.key, e?.target?.checked)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Icon name={option?.icon} size={16} className="text-primary" />
                    <span className="font-medium text-card-foreground">{option?.label}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{option?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const allSelected = Object.values(selectedOptions)?.every(Boolean);
              const newState = {};
              exportOptions?.forEach(option => {
                newState[option.key] = !allSelected;
              });
              setSelectedOptions(newState);
            }}
          >
            {Object.values(selectedOptions)?.every(Boolean) ? 'Deselect All' : 'Select All'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedOptions({
              shoppingList: true,
              recipeCards: false,
              mealPrepSchedule: false,
              nutritionSummary: false,
              costBreakdown: true,
              sourcingRecommendations: false
            })}
          >
            Essential Only
          </Button>
        </div>

        {/* Export Button */}
        <div className="pt-4 border-t border-border">
          <Button
            variant="default"
            size="lg"
            fullWidth
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
            onClick={handleExport}
            disabled={getSelectedCount() === 0}
          >
            {isExporting ? 'Generating Export...' : `Export ${getSelectedCount()} Items`}
          </Button>
          
          {exportFormat === 'email' && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Export will be sent to your registered email address
            </p>
          )}
        </div>

        {/* Preview Info */}
        <div className="bg-muted/30 border border-border rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-card-foreground">Export Preview</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your {exportFormat?.toUpperCase()} will include {getSelectedCount()} sections with complete meal planning data, 
                recipes, and shopping recommendations optimized for sustainability and cost.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;