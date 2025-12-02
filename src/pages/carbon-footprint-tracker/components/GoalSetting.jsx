import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const GoalSetting = ({ currentGoal, onGoalUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [goalData, setGoalData] = useState({
    daily: currentGoal?.daily || 10,
    weekly: currentGoal?.weekly || 70,
    monthly: currentGoal?.monthly || 300,
    target: currentGoal?.target || 'moderate'
  });

  const targetOptions = [
    { 
      value: 'aggressive', 
      label: 'Aggressive (5 kg/day)', 
      description: 'Minimal carbon footprint lifestyle'
    },
    { 
      value: 'moderate', 
      label: 'Moderate (10 kg/day)', 
      description: 'Balanced sustainable living'
    },
    { 
      value: 'gradual', 
      label: 'Gradual (15 kg/day)', 
      description: 'Steady progress towards sustainability'
    },
    { 
      value: 'custom', 
      label: 'Custom Goals', 
      description: 'Set your own targets'
    }
  ];

  const presetGoals = {
    aggressive: { daily: 5, weekly: 35, monthly: 150 },
    moderate: { daily: 10, weekly: 70, monthly: 300 },
    gradual: { daily: 15, weekly: 105, monthly: 450 }
  };

  const handleTargetChange = (target) => {
    if (target !== 'custom' && presetGoals?.[target]) {
      setGoalData({
        ...goalData,
        target,
        ...presetGoals?.[target]
      });
    } else {
      setGoalData({
        ...goalData,
        target
      });
    }
  };

  const handleSave = () => {
    onGoalUpdate(goalData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setGoalData({
      daily: currentGoal?.daily || 10,
      weekly: currentGoal?.weekly || 70,
      monthly: currentGoal?.monthly || 300,
      target: currentGoal?.target || 'moderate'
    });
    setIsEditing(false);
  };

  const getTargetInfo = (target) => {
    const info = {
      aggressive: {
        icon: 'Zap',
        color: 'text-success',
        bgColor: 'bg-success/10',
        tips: ['Use sustainable commuting options', 'Eat plant-based meals', 'Reduce household consumption']
      },
      moderate: {
        icon: 'Target',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        tips: ['Choose lower-carbon travel when possible', 'Reduce meat consumption', 'Adopt efficient appliances']
      },
      gradual: {
        icon: 'TrendingUp',
        color: 'text-accent',
        bgColor: 'bg-accent/10',
        tips: ['Gradual lifestyle changes', 'Occasional eco-friendly choices', 'Awareness building']
      },
      custom: {
        icon: 'Settings',
        color: 'text-secondary',
        bgColor: 'bg-secondary/10',
        tips: ['Personalized targets', 'Flexible approach', 'Self-defined milestones']
      }
    };
    return info?.[target] || info?.moderate;
  };

  const targetInfo = getTargetInfo(goalData?.target);

  return (
    <div className="bg-card rounded-lg border border-border shadow-organic">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${targetInfo?.bgColor}`}>
              <Icon name={targetInfo?.icon} size={20} className={targetInfo?.color} />
            </div>
            <div>
              <h3 className="text-lg font-heading font-bold text-card-foreground">
                Carbon Goals
              </h3>
              <p className="text-sm text-muted-foreground">
                {isEditing ? 'Customize your targets' : 'Track your progress towards sustainability'}
              </p>
            </div>
          </div>
          
          {!isEditing && (
            <Button 
              variant="outline" 
              size="sm" 
              iconName="Edit" 
              iconPosition="left"
              onClick={() => setIsEditing(true)}
            >
              Edit Goals
            </Button>
          )}
        </div>
      </div>
      <div className="p-6">
        {isEditing ? (
          <div className="space-y-6">
            {/* Target Selection */}
            <div>
              <Select
                label="Goal Target"
                description="Choose a preset or create custom goals"
                options={targetOptions}
                value={goalData?.target}
                onChange={handleTargetChange}
              />
            </div>

            {/* Custom Goal Inputs */}
            {goalData?.target === 'custom' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="Daily Goal (kg CO₂)"
                  type="number"
                  value={goalData?.daily}
                  onChange={(e) => setGoalData(prev => ({ ...prev, daily: parseFloat(e?.target?.value) }))}
                  min="1"
                  step="0.5"
                />
                <Input
                  label="Weekly Goal (kg CO₂)"
                  type="number"
                  value={goalData?.weekly}
                  onChange={(e) => setGoalData(prev => ({ ...prev, weekly: parseFloat(e?.target?.value) }))}
                  min="7"
                  step="1"
                />
                <Input
                  label="Monthly Goal (kg CO₂)"
                  type="number"
                  value={goalData?.monthly}
                  onChange={(e) => setGoalData(prev => ({ ...prev, monthly: parseFloat(e?.target?.value) }))}
                  min="30"
                  step="5"
                />
              </div>
            )}

            {/* Goal Preview */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-card-foreground mb-3">Goal Summary</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{goalData?.daily}</div>
                  <div className="text-sm text-muted-foreground">kg/day</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{goalData?.weekly}</div>
                  <div className="text-sm text-muted-foreground">kg/week</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{goalData?.monthly}</div>
                  <div className="text-sm text-muted-foreground">kg/month</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button variant="default" onClick={handleSave} iconName="Check" iconPosition="left">
                Save Goals
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Current Goals Display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">
                  {goalData?.daily}
                </div>
                <div className="text-sm text-muted-foreground mb-2">kg CO₂/day</div>
                <div className="text-xs text-card-foreground font-medium">Daily Target</div>
              </div>
              
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">
                  {goalData?.weekly}
                </div>
                <div className="text-sm text-muted-foreground mb-2">kg CO₂/week</div>
                <div className="text-xs text-card-foreground font-medium">Weekly Target</div>
              </div>
              
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">
                  {goalData?.monthly}
                </div>
                <div className="text-sm text-muted-foreground mb-2">kg CO₂/month</div>
                <div className="text-xs text-card-foreground font-medium">Monthly Target</div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Lightbulb" size={16} className="text-accent" />
                <h4 className="font-medium text-card-foreground">
                  Tips for {targetOptions?.find(opt => opt?.value === goalData?.target)?.label}
                </h4>
              </div>
              <ul className="space-y-1">
                {targetInfo?.tips?.map((tip, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                    <Icon name="CheckCircle" size={12} className="text-success" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Progress Indicator */}
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-card-foreground">This Month's Progress</span>
                <span className="text-sm text-muted-foreground">65% of goal</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full transition-all duration-500" style={{ width: '65%' }} />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>195 kg CO₂</span>
                <span>{goalData?.monthly} kg CO₂ goal</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalSetting;