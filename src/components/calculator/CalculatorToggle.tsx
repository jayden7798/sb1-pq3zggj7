import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

interface CalculatorToggleProps {
  onClick: () => void;
}

const CalculatorToggle: React.FC<CalculatorToggleProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 flex items-center">
      {isHovered && (
        <div className="mr-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-fade-in">
          Position Size Calculator
          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
            <div className="border-8 border-transparent border-l-blue-600"></div>
          </div>
        </div>
      )}
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:rotate-12 relative"
        aria-label="Open Position Calculator"
      >
        <Calculator className="w-6 h-6 group-hover:animate-pulse" />
        <div className="absolute -inset-1 bg-blue-400 rounded-full animate-ping opacity-75"></div>
      </button>
    </div>
  );
};

export default CalculatorToggle;