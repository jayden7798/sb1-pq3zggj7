import React from 'react';

interface ThermometerNeedleProps {
  position: number; // 0-100
}

const ThermometerNeedle: React.FC<ThermometerNeedleProps> = ({ position }) => {
  return (
    <div 
      className="absolute left-0 w-full h-1 bg-white shadow-lg transition-all duration-500 ease-out"
      style={{ 
        bottom: `${position}%`,
        transform: 'translateY(50%)'
      }}
    >
      <div className="absolute right-0 w-4 h-4 -mt-1.5 bg-white rounded-full shadow-lg" />
    </div>
  );
};

export default ThermometerNeedle;