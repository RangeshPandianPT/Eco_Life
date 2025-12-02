import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: '256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      text: 'Secure authentication'
    },
    {
      icon: 'Eye',
      text: 'Privacy protected'
    }
  ];

  const certifications = [
    {
      name: 'ISO 27001',
      description: 'Information Security Management'
    },
    {
      name: 'GDPR Compliant',
      description: 'Data Protection Regulation'
    },
    {
      name: 'Carbon Neutral',
      description: 'Certified Green Hosting'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      {/* Security Features */}
      <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 text-muted-foreground">
            <Icon name={feature?.icon} size={16} color="var(--color-success)" />
            <span className="text-sm font-medium">{feature?.text}</span>
          </div>
        ))}
      </div>
      {/* Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {certifications?.map((cert, index) => (
          <div key={index} className="bg-muted/50 rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="CheckCircle" size={16} color="white" />
            </div>
            <h3 className="font-medium text-sm text-foreground mb-1">{cert?.name}</h3>
            <p className="text-xs text-muted-foreground">{cert?.description}</p>
          </div>
        ))}
      </div>
      {/* Legal Links */}
      <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
        <button className="hover:text-foreground transition-organic-fast">
          Privacy Policy
        </button>
        <span className="text-border">•</span>
        <button className="hover:text-foreground transition-organic-fast">
          Terms of Service
        </button>
        <span className="text-border">•</span>
        <button className="hover:text-foreground transition-organic-fast">
          Cookie Policy
        </button>
        <span className="text-border">•</span>
        <button className="hover:text-foreground transition-organic-fast">
          Support
        </button>
      </div>
      {/* Copyright */}
      <div className="text-center mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground">
          © {new Date()?.getFullYear()} EcoLife. All rights reserved. 
          <span className="ml-2">🌱 Powered by sustainable technology</span>
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;