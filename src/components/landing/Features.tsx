import React from 'react';
import { Shield, BarChart2, Calculator, Skull, Target, Clock } from 'lucide-react';

const features = [
  {
    name: 'Risk Management',
    description: 'Set and monitor risk parameters with real-time drawdown tracking',
    icon: Shield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'Position Calculator',
    description: 'Calculate optimal position sizes based on your risk tolerance',
    icon: Calculator,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    name: 'Risk Analysis',
    description: 'Advanced probability analysis to protect your trading capital',
    icon: Target,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    name: 'Performance Metrics',
    description: 'Track your trading performance with detailed analytics',
    icon: BarChart2,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
  {
    name: 'Risk of Ruin',
    description: 'Calculate and monitor your probability of account depletion',
    icon: Skull,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  {
    name: 'Real-time Updates',
    description: 'Stay informed with live updates on your trading metrics',
    icon: Clock,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
];

const Features: React.FC = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Professional Trading Tools
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to manage your trading risk effectively
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-2 rounded-lg ${feature.bgColor}`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.name}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;