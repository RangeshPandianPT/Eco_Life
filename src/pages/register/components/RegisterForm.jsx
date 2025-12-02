import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dietaryRestrictions: '',
    householdSize: '',
    sustainabilityGoals: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const dietaryOptions = [
    { value: '', label: 'Select dietary preference' },
    { value: 'omnivore', label: 'Omnivore' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'pescatarian', label: 'Pescatarian' },
    { value: 'keto', label: 'Keto' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'other', label: 'Other' }
  ];

  const householdOptions = [
    { value: '', label: 'Select household size' },
    { value: '1', label: '1 person' },
    { value: '2', label: '2 people' },
    { value: '3', label: '3 people' },
    { value: '4', label: '4 people' },
    { value: '5+', label: '5+ people' }
  ];

  const sustainabilityOptions = [
    { value: '', label: 'Select your main goal' },
    { value: 'reduce-carbon', label: 'Reduce carbon footprint' },
    { value: 'zero-waste', label: 'Achieve zero waste' },
    { value: 'sustainable-eating', label: 'Sustainable eating' },
  // Renewable energy preference retained as a user preference label but not linked to a feature
    { value: 'eco-products', label: 'Use eco-friendly products' },
    { value: 'overall-impact', label: 'Overall environmental impact' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData?.confirmPassword?.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }

    if (!formData?.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors)?.length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData?.email);
      localStorage.setItem('userName', formData?.fullName);
      localStorage.setItem('registrationTime', new Date()?.toISOString());
      localStorage.setItem('userPreferences', JSON.stringify({
        dietaryRestrictions: formData?.dietaryRestrictions,
        householdSize: formData?.householdSize,
        sustainabilityGoals: formData?.sustainabilityGoals
      }));
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      setErrors({ 
        general: 'Registration failed. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    // Mock social registration
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', `demo@${provider}.com`);
    localStorage.setItem('userName', `Demo User`);
    localStorage.setItem('registrationTime', new Date()?.toISOString());
    navigate('/dashboard');
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let score = 0;
    if (password?.length >= 8) score++;
    if (/[a-z]/?.test(password)) score++;
    if (/[A-Z]/?.test(password)) score++;
    if (/\d/?.test(password)) score++;
    if (/[^a-zA-Z\d]/?.test(password)) score++;
    
    const strengthMap = {
      0: { label: 'Very Weak', color: 'text-destructive' },
      1: { label: 'Weak', color: 'text-destructive' },
      2: { label: 'Fair', color: 'text-warning' },
      3: { label: 'Good', color: 'text-primary' },
      4: { label: 'Strong', color: 'text-success' },
      5: { label: 'Very Strong', color: 'text-success' }
    };
    
    return { strength: score, ...strengthMap?.[score] };
  };

  const passwordStrength = getPasswordStrength(formData?.password);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Icon name="Leaf" size={20} color="white" />
          </div>
          <span className="text-2xl font-heading font-bold text-foreground">EcoLife</span>
        </div>
        <h1 className="text-3xl font-heading font-bold text-foreground">Create Account</h1>
        <p className="text-muted-foreground">Join the sustainable living community</p>
      </div>

      {/* Register Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors?.general && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-destructive" />
              <span className="text-sm text-destructive">{errors?.general}</span>
            </div>
          </div>
        )}

        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
          
          <Input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData?.fullName}
            onChange={handleInputChange}
            error={errors?.fullName}
            disabled={isLoading}
            leftIcon="User"
            required
          />

          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            disabled={isLoading}
            leftIcon="Mail"
            required
          />

          <div className="space-y-2">
            <Input
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              disabled={isLoading}
              leftIcon="Lock"
              required
            />
            {formData?.password && (
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength?.strength <= 1 ? 'bg-destructive' :
                      passwordStrength?.strength <= 2 ? 'bg-warning' :
                      passwordStrength?.strength <= 3 ? 'bg-primary' : 'bg-success'
                    }`}
                    style={{ width: `${(passwordStrength?.strength / 5) * 100}%` }}
                  />
                </div>
                <span className={`text-xs ${passwordStrength?.color}`}>
                  {passwordStrength?.label}
                </span>
              </div>
            )}
          </div>

          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            error={errors?.confirmPassword}
            disabled={isLoading}
            leftIcon="Lock"
            required
          />
        </div>

        {/* Profile Setup */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Profile Setup</h3>
          
          <Select
            name="dietaryRestrictions"
            value={formData?.dietaryRestrictions}
            onChange={handleInputChange}
            options={dietaryOptions}
            disabled={isLoading}
          />

          <Select
            name="householdSize"
            value={formData?.householdSize}
            onChange={handleInputChange}
            options={householdOptions}
            disabled={isLoading}
          />

          <Select
            name="sustainabilityGoals"
            value={formData?.sustainabilityGoals}
            onChange={handleInputChange}
            options={sustainabilityOptions}
            disabled={isLoading}
          />
        </div>

        {/* Terms and Privacy */}
        <div className="space-y-3">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData?.agreeToTerms}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-4 h-4 text-primary bg-background border-border rounded mt-0.5 focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-muted-foreground">
              I agree to the{' '}
              <button type="button" className="text-primary hover:underline">
                Terms of Service
              </button>
            </span>
          </label>
          {errors?.agreeToTerms && (
            <p className="text-xs text-destructive ml-7">{errors?.agreeToTerms}</p>
          )}

          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="agreeToPrivacy"
              checked={formData?.agreeToPrivacy}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-4 h-4 text-primary bg-background border-border rounded mt-0.5 focus:ring-primary focus:ring-2"
            />
            <span className="text-sm text-muted-foreground">
              I agree to the{' '}
              <button type="button" className="text-primary hover:underline">
                Privacy Policy
              </button>
            </span>
          </label>
          {errors?.agreeToPrivacy && (
            <p className="text-xs text-destructive ml-7">{errors?.agreeToPrivacy}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          leftIcon={isLoading ? "Loader2" : "UserPlus"}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Or sign up with</span>
        </div>
      </div>

      {/* Social Registration */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => handleSocialRegister('google')}
          disabled={isLoading}
          leftIcon="Mail"
          className="w-full"
        >
          Google
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSocialRegister('facebook')}
          disabled={isLoading}
          leftIcon="Facebook"
          className="w-full"
        >
          Facebook
        </Button>
      </div>

      {/* Login Link */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-primary hover:underline focus:outline-none focus:underline font-medium"
            disabled={isLoading}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;