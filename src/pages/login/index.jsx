import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import EcoStats from './components/EcoStats';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>

        {/* Right Side - Eco Stats & Branding */}
        <div className="flex-1 bg-gradient-to-br from-primary/5 via-success/5 to-accent/5 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <EcoStats />
          </div>
        </div>
      </div>

      {/* Trust Signals Footer */}
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-6">
          <TrustSignals />
        </div>
      </div>
    </div>
  );
};

export default Login;