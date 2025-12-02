import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import RegisterForm from './components/RegisterForm';
import TrustSignals from '../login/components/TrustSignals';
import EcoStats from '../login/components/EcoStats';

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
  <title>Register - EcoLife | Join the Sustainable Living Community</title>
  <meta name="description" content="Create your EcoLife account and start your journey towards sustainable living. Track your carbon footprint, discover eco-friendly products, and access personalized recommendations." />
  <meta name="keywords" content="register, sign up, EcoLife, sustainable living, carbon footprint tracking, eco-friendly" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left Side - Register Form */}
          <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-md">
              <RegisterForm />
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
    </>
  );
};

export default Register;