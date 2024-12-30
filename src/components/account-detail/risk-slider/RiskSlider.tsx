import React, { useMemo } from 'react';
import { useRiskZones } from '../../../hooks/useRiskZones';
import RiskSliderTrack from './RiskSliderTrack';
import RiskSliderNeedle from './RiskSliderNeedle';

interface RiskSliderProps {
  currentBalance: number;
  initialBalance: number;
}

const RiskSlider: React.FC<RiskSliderProps> = ({
  currentBalance,
  initialBalance,
}) => {
  const { thresholds, getZoneInfo } = useRiskZones();
  
  const { position, zoneInfo } = useMemo(() => {
    const profitLoss = currentBalance - initialBalance;
    const profitLossPercentage = (profitLoss / initialBalance) * 100;
    
    // Convert percentage to slider position (0-100)
    const rawPosition = ((profitLossPercentage - thresholds.maxDrawdown) * 100) / 
      (Math.abs(thresholds.maxDrawdown) + thresholds.greenZone);
    
    return {
      position: Math.max(0, Math.min(100, rawPosition)),
      zoneInfo: getZoneInfo(currentBalance, initialBalance)
    };
  }, [currentBalance, initialBalance, thresholds, getZoneInfo]);

  // Calculate zone widths as percentages of the total slider width
  const zoneWidths = {
    red: ((thresholds.orangeZone - thresholds.maxDrawdown) / 
      (Math.abs(thresholds.maxDrawdown) + thresholds.greenZone)) * 100,
    orange: ((thresholds.greenZone - thresholds.orangeZone) / 
      (Math.abs(thresholds.maxDrawdown) + thresholds.greenZone)) * 100,
    green: (thresholds.greenZone / 
      (Math.abs(thresholds.maxDrawdown) + thresholds.greenZone)) * 100,
  };

  return (
    <div className="relative w-full h-12 px-2">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4">
        <RiskSliderTrack
          redWidth={zoneWidths.red}
          orangeWidth={zoneWidths.orange}
          greenWidth={zoneWidths.green}
        />
        <RiskSliderNeedle
          position={position}
          zone={zoneInfo.zone}
        />
      </div>
      
      <div className="absolute -bottom-8 left-0 right-0 text-center">
        <span className={`text-sm font-medium ${zoneInfo.color.replace('bg-', 'text-')}`}>
          {zoneInfo.label}
        </span>
        <p className="text-xs text-gray-500 mt-1">{zoneInfo.message}</p>
      </div>
    </div>
  );
};

export default RiskSlider;