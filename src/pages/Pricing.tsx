import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  'Position Size Calculator',
  'Advanced Risk Management',
  'Multiple Trading Accounts',
  'Performance Analytics',
  'Advanced Risk Insights',
  'Priority Support',
];

const Pricing: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Professional Trading Tools
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to manage your trading risk effectively
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold">Pro Plan</h3>
              <p className="mt-2 text-gray-600">Full access to all features</p>
            </div>
            <div className="text-right">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">or $90/year</p>
            </div>
          </div>

          <ul className="mt-8 space-y-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-blue-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-4">
            <Link
              to="/profile"
              className="block w-full rounded-lg px-4 py-3 text-center font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
            <p className="text-center text-sm text-gray-500">
              7-day free trial, no credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;