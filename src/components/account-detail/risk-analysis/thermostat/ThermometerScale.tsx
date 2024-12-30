import React from 'react';
import type { ZoneThresholds } from '../../../../types/risk';

interface ThermometerScaleProps {
  thresholds: ZoneThresholds;
}

const ThermometerScale: React.FC<ThermometerScaleProps> = ({ thresholds }) => {
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Green Zone */}
      <div 
        className="bg-gradient-to-b from-green-400 to-green-500"
        style={{ flex: thresholds.greenZone }}
      />
      
      {/* Orange Zone */}
      <div 
        className="bg-gradient-to-b from-orange-400 to-orange-500"
        style={{ flex: thresholds.orangeZone - thresholds.redZone }}
      />
      
      {/* Red Zone */}
      <div 
        className="bg-gradient-to-b from-red-400 to-red-500"
        style={{ flex: Math.abs(thresholds.redZone) }}
      />
    </div>
  );
};

export default ThermometerScale;