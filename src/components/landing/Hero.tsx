import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, TrendingUp } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-gray-900 font-mono">Trade Smarter with</span>{' '}
            <span className="text-blue-600 font-mono">Confidence</span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
            Professional risk management tools to protect your capital and maximize your trading potential
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/profile"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              View Pricing
            </Link>
          </div>

          <div className="mt-12 flex justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>Advanced Risk Protection</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Real-time Performance Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;