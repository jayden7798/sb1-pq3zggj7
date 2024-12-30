import React from 'react';
import { AlertTriangle, TrendingDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PainPoint: React.FC = () => {
  return (
    <div className="bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-white">
                Don't Be Part of the Statistics
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <p>68% of traders lose money due to poor risk management</p>
              </div>
              <p className="text-gray-400">
                Take control of your trading journey with professional risk management tools and protect your capital.
              </p>
            </div>

            <Link
              to="/profile"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Managing Risk
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Risk Analysis', value: 'Real-time' },
              { label: 'Position Sizing', value: 'Automated' },
              { label: 'Performance Tracking', value: 'Detailed' },
              { label: 'Risk Protection', value: 'Advanced' },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-800 p-4 rounded-lg">
                <div className="text-xl font-bold text-blue-500">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainPoint;