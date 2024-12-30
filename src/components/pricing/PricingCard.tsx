import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  highlighted?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  description,
  features,
  highlighted = false,
}) => {
  return (
    <div
      className={`rounded-2xl p-8 ${
        highlighted
          ? 'bg-blue-600 text-white ring-4 ring-blue-600 ring-offset-2'
          : 'bg-white text-gray-900'
      }`}
    >
      <h3 className="text-2xl font-bold">{name}</h3>
      <p className={`mt-4 text-sm ${highlighted ? 'text-blue-100' : 'text-gray-500'}`}>
        {description}
      </p>
      <p className="mt-6">
        <span className="text-4xl font-bold">{price}</span>
        <span className={highlighted ? 'text-blue-100' : 'text-gray-500'}>
          /month
        </span>
      </p>
      
      <ul className="mt-8 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <Check className={`w-5 h-5 ${
              highlighted 
                ? 'text-blue-200' 
                : feature.included ? 'text-blue-600' : 'text-gray-300'
            }`} />
            <span className={feature.included ? '' : 'line-through opacity-50'}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      <Link
        to="/profile"
        className={`mt-8 block w-full rounded-lg px-4 py-3 text-center font-medium ${
          highlighted
            ? 'bg-white text-blue-600 hover:bg-blue-50'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        Get Started
      </Link>
    </div>
  );
};

export default PricingCard;