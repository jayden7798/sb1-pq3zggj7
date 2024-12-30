import React from 'react';
import { useRiskZones } from '../../../hooks/useRiskZones';
import { useTradingAccount } from '../../../context/TradingAccountContext';

const RiskTrack: React.FC = () => {
  const { thresholds } = useRiskZones();
  const { account } = useTradingAccount();
  
  if (!account) return null;

  const profitLoss = account.currentBalance - account.initialBalance;
  const profitLossPercentage = (profitLoss / account.initialBalance) * 100;
  
  // Calculate relative positions based on thresholds
  const maxRisk = 3; // Maximum risk percentage
  const getZoneWidth = (value: number) => (value / maxRisk) * 100;
  
  // Calculate zone widths
  const redZoneWidth = getZoneWidth(thresholds.riskLevels.red);
  const orangeZoneWidth = getZoneWidth(thresholds.riskLevels.orange - thresholds.riskLevels.red);
  const greenZoneWidth = getZoneWidth(thresholds.riskLevels.green - thresholds.riskLevels.orange);
  const extremeZoneWidth = 100 - (redZoneWidth + orangeZoneWidth + greenZoneWidth);

  // Determine active zone based on P&L
  const isRedZone = profitLossPercentage <= thresholds.redZone;
  const isGreenZone = profitLossPercentage >= thresholds.greenZone;

  return (
    <div className="absolute inset-x-0 top-2 h-2 flex rounded-lg overflow-hidden">
      <div 
        className={`h-full transition-all duration-300 ${
          isRedZone ? 'bg-red-300' : 'bg-blue-200'
        }`}
        style={{ width: `${redZoneWidth}%` }}
      />
      <div 
        className="h-full bg-yellow-200 transition-all duration-300"
        style={{ width: `${orangeZoneWidth}%` }}
      />
      <div 
        className={`h-full transition-all duration-300 ${
          isGreenZone ? 'bg-green-300' : 'bg-green-200'
        }`}
        style={{ width: `${greenZoneWidth}%` }}
      />
      <div 
        className="h-full bg-red-200 transition-all duration-300"
        style={{ width: `${extremeZoneWidth}%` }}
      />
    </div>
  );
};

export default RiskTrack;