import React from 'react';

interface RiskSliderNeedleProps {
  position: number;
  zone: string;
}

const RiskSliderNeedle: React.FC<RiskSliderNeedleProps> = ({ position, zone }) => {
  const getZoneColor = () => {
    switch (zone) {
      case 'red': return 'bg-rose-400 shadow-rose-100';
      case 'orange': return 'bg-orange-400 shadow-orange-100';
      case 'green': return 'bg-emerald-500 shadow-emerald-200';
      default: return 'bg-gray-400 shadow-gray-100';
    }
  };

  return (
    <div 
      className={`absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full 
        ${getZoneColor()} shadow-lg transition-all duration-300 cursor-pointer
        hover:scale-110 hover:shadow-xl z-10`}
      style={{ left: `${position}%`, top: '50%' }}
    />
  );
};

export default RiskSliderNeedle;