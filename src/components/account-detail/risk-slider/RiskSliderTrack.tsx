import React from 'react';

interface RiskSliderTrackProps {
  redWidth: number;
  orangeWidth: number;
  greenWidth: number;
}

const RiskSliderTrack: React.FC<RiskSliderTrackProps> = ({
  redWidth,
  orangeWidth,
  greenWidth,
}) => {
  return (
    <div className="absolute inset-x-0 h-2 rounded-full overflow-hidden">
      {/* Red zone with softer gradient */}
      <div 
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-rose-200 to-orange-100 transition-all duration-300"
        style={{ width: `${redWidth}%` }} 
      />
      
      {/* Orange/transition zone */}
      <div 
        className="absolute inset-y-0 bg-gradient-to-r from-orange-100 to-green-100 transition-all duration-300"
        style={{ left: `${redWidth}%`, width: `${orangeWidth}%` }} 
      />
      
      {/* Green zone with vibrant gradient */}
      <div 
        className="absolute inset-y-0 bg-gradient-to-r from-green-300 to-emerald-500 transition-all duration-300"
        style={{ left: `${redWidth + orangeWidth}%`, width: `${greenWidth}%` }} 
      />
    </div>
  );
};

export default RiskSliderTrack;