import React from 'react';
import { useRiskZones } from '../../../hooks/useRiskZones';

interface RiskLabelsProps {
  min: number;
  max: number;
}

const RiskLabels: React.FC<RiskLabelsProps> = ({ min, max }) => {
  const { thresholds } = useRiskZones();

  return (
    <div className="flex justify-between text-xs text-gray-500">
      <div>Conservative ({min}%)</div>
      <div>Moderate ({thresholds.riskLevels.orange}%)</div>
      <div>Aggressive ({max}%)</div>
    </div>
  );
};

export default RiskLabels;