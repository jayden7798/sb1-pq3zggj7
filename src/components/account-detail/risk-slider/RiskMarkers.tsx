import React from 'react';
import { useTradingAccount } from '../../../context/TradingAccountContext';
import { useRiskZones } from '../../../hooks/useRiskZones';

interface RiskMarkersProps {
  value: number;
  suggested?: number;
}

const RiskMarkers: React.FC<RiskMarkersProps> = ({ value, suggested }) => {
  const { account } = useTradingAccount();
  const { thresholds } = useRiskZones();
  
  if (!account) return null;

  const maxRisk = 3; // Maximum risk percentage
  const getPosition = (val: number) => `${(val / maxRisk) * 100}%`;

  // Calculate initial balance marker position (50% by default)
  const initialBalancePosition = '50%';

  return (
    <>
      {/* Initial Balance Marker */}
      <div 
        className="absolute h-8 w-0.5 bg-gray-800 top-0 z-20"
        style={{ left: initialBalancePosition }}
      >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-xs font-medium bg-gray-800 text-white px-1.5 py-0.5 rounded">
            Initial Balance
          </span>
        </div>
      </div>

      {/* Zone Threshold Markers */}
      {Object.entries(thresholds.riskLevels).map(([zone, level]) => (
        <div
          key={zone}
          className="absolute h-4 w-0.5 bg-gray-400 top-1 z-10"
          style={{ left: getPosition(level) }}
        >
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-xs text-gray-500">
              {level}%
            </span>
          </div>
        </div>
      ))}

      {/* Suggested Risk Marker */}
      {suggested && suggested !== value && (
        <div 
          className="absolute h-4 w-0.5 bg-blue-600 top-1 z-20"
          style={{ left: getPosition(suggested) }}
        >
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-xs font-medium text-blue-600">
              Suggested: {suggested}%
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default RiskMarkers;