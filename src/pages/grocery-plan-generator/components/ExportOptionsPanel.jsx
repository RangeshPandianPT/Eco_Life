import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportOptionsPanel = ({ groceryPlan, onExport }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    organization: 'category',
    includeNutrition: true,
    includeCO2: true,
    includePrices: true,
    includeStoreInfo: true,
    includeCoupons: true,
    includeSeasonality: false,
    storeLayout: 'mixed'
  });

  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'csv', label: 'CSV Spreadsheet' },
    { value: 'json', label: 'JSON Data' },
    { value: 'txt', label: 'Plain Text List' }
  ];

  const organizationOptions = [
    { value: 'category', label: 'By Category' },
    { value: 'store', label: 'By Store' },
    { value: 'aisle', label: 'By Store Aisle' },
    { value: 'alphabetical', label: 'Alphabetical' }
  ];

  const storeLayoutOptions = [
    { value: 'mixed', label: 'Mixed Sources (Optimized)' },
    { value: 'single', label: 'Single Store Focus' },
    { value: 'local', label: 'Local Sources Priority' },
    { value: 'budget', label: 'Budget Stores Priority' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Mock export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const exportData = {
        config: exportConfig,
        plan: groceryPlan,
        timestamp: new Date()?.toISOString(),
        filename: `grocery-plan-${new Date()?.getFullYear()}-${String(new Date()?.getMonth() + 1)?.padStart(2, '0')}`
      };

      onExport?.(exportData);
      
      // Mock file download
      console.log('Exporting grocery plan:', exportData);
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleConfigChange = (field, value) => {
    setExportConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getFormatIcon = (format) => {
    const icons = {
      pdf: 'FileText',
      csv: 'Table',
      json: 'Code',
      txt: 'FileText'
    };
    return icons?.[format] || 'File';
  };

  const getEstimatedSize = () => {
    if (!groceryPlan) return '0 KB';
    
    const baseSize = Object.values(groceryPlan?.categories || {})?.reduce((sum, items) => sum + items?.length, 0) * 0.5;
    const formatMultiplier = {
      pdf: 2.5,
      csv: 1.0,
      json: 1.8,
      txt: 0.8
    };
    
    const size = baseSize * (formatMultiplier?.[exportConfig?.format] || 1);
    return size > 1000 ? `${(size / 1000)?.toFixed(1)} MB` : `${Math.round(size)} KB`;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Download" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-card-foreground">Export Options</h2>
            <p className="text-sm text-muted-foreground">
              Generate and download your grocery plan in various formats
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Format Selection */}
        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-card-foreground">Export Format</h3>
          
          <Select
            options={formatOptions}
            value={exportConfig?.format}
            onChange={(value) => handleConfigChange('format', value)}
            placeholder="Select format"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {formatOptions?.map((format) => (
              <button
                key={format?.value}
                onClick={() => handleConfigChange('format', format?.value)}
                className={`p-3 rounded-lg border transition-organic-fast ${
                  exportConfig?.format === format?.value
                    ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={getFormatIcon(format?.value)} size={20} className="mx-auto mb-2" />
                <p className="text-sm font-medium">{format?.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Organization Options */}
        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-card-foreground">List Organization</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Sort By"
              options={organizationOptions}
              value={exportConfig?.organization}
              onChange={(value) => handleConfigChange('organization', value)}
            />

            <Select
              label="Store Layout"
              options={storeLayoutOptions}
              value={exportConfig?.storeLayout}
              onChange={(value) => handleConfigChange('storeLayout', value)}
            />
          </div>
        </div>

        {/* Include Options */}
        <div className="space-y-4">
          <h3 className="font-heading font-semibold text-card-foreground">Include in Export</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Checkbox
                label="Nutritional Information"
                description="Include calories, protein, and other nutrients"
                checked={exportConfig?.includeNutrition}
                onChange={(e) => handleConfigChange('includeNutrition', e?.target?.checked)}
              />
              
              <Checkbox
                label="Carbon Footprint Data"
                description="Include CO₂ impact for each item"
                checked={exportConfig?.includeCO2}
                onChange={(e) => handleConfigChange('includeCO2', e?.target?.checked)}
              />
              
              <Checkbox
                label="Price Information"
                description="Include estimated costs and totals"
                checked={exportConfig?.includePrices}
                onChange={(e) => handleConfigChange('includePrices', e?.target?.checked)}
              />
            </div>

            <div className="space-y-3">
              <Checkbox
                label="Store Information"
                description="Include store names and locations"
                checked={exportConfig?.includeStoreInfo}
                onChange={(e) => handleConfigChange('includeStoreInfo', e?.target?.checked)}
              />
              
              <Checkbox
                label="Available Coupons"
                description="Include applicable discounts and deals"
                checked={exportConfig?.includeCoupons}
                onChange={(e) => handleConfigChange('includeCoupons', e?.target?.checked)}
              />
              
              <Checkbox
                label="Seasonal Availability"
                description="Include seasonal notes and alternatives"
                checked={exportConfig?.includeSeasonality}
                onChange={(e) => handleConfigChange('includeSeasonality', e?.target?.checked)}
              />
            </div>
          </div>
        </div>

        {/* Preview Information */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium text-card-foreground mb-3">Export Preview</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Format:</p>
              <p className="font-medium text-card-foreground uppercase">{exportConfig?.format}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Organization:</p>
              <p className="font-medium text-card-foreground">
                {organizationOptions?.find(opt => opt?.value === exportConfig?.organization)?.label}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Estimated Size:</p>
              <p className="font-medium text-card-foreground">{getEstimatedSize()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Items:</p>
              <p className="font-medium text-card-foreground">
                {groceryPlan ? Object.values(groceryPlan?.categories || {})?.reduce((sum, items) => sum + items?.length, 0) : 0}
              </p>
            </div>
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="default"
            size="lg"
            fullWidth
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
            onClick={handleExport}
            disabled={!groceryPlan}
          >
            {isExporting ? 'Generating Export...' : 'Export Grocery Plan'}
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            iconName="Eye"
            iconPosition="left"
            disabled={!groceryPlan}
          >
            Preview
          </Button>
        </div>

        {!groceryPlan && (
          <div className="text-center p-4 bg-warning/10 rounded-lg">
            <Icon name="AlertTriangle" size={20} color="var(--color-warning)" className="mx-auto mb-2" />
            <p className="text-sm text-warning">
              Generate a grocery plan first to enable export options
            </p>
          </div>
        )}

        {/* Quick Export Buttons */}
        {groceryPlan && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="FileText"
              iconPosition="left"
              onClick={() => {
                setExportConfig(prev => ({ ...prev, format: 'pdf' }));
                handleExport();
              }}
            >
              Quick PDF
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Table"
              iconPosition="left"
              onClick={() => {
                setExportConfig(prev => ({ ...prev, format: 'csv' }));
                handleExport();
              }}
            >
              Quick CSV
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Share"
              iconPosition="left"
            >
              Share Link
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Printer"
              iconPosition="left"
            >
              Print
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportOptionsPanel;