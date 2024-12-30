import React from 'react';
import { useTradingAccount } from '../../context/TradingAccountContext';
import { useRiskZones } from '../../hooks/useRiskZones';

interface RiskSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

const RiskSlider: React.FC<RiskSliderProps> = ({
  value,
  onChange,
  min,
  max,
  step
}) => {
  const { account } = useTradingAccount();
  const { thresholds, getCurrentZone } = useRiskZones();

  if (!account) return null;

  const currentZone = getCurrentZone();
  const profitLoss = account.currentBalance - account.initialBalance;
  const profitLossPercentage = (profitLoss / account.initialBalance) * 100;

  // Calculate zone positions as percentages of the slider width
  const totalRange = max - min;
  const getPositionPercentage = (value: number) => ((value - min) / totalRange) * 100;

  // Calculate initial balance position
  const initialBalancePosition = 50; // Center position

  // Calculate zone widths
  const redZoneWidth = getPositionPercentage(thresholds.riskLevels.red);
  const orangeZoneWidth = getPositionPercentage(thresholds.riskLevels.orange) - redZoneWidth;
  const greenZoneWidth = 100 - getPositionPercentage(thresholds.riskLevels.orange);

  const getRiskLevel = (risk: number) => {
    if (risk <= thresholds.riskLevels.red) return { label: 'Conservative', color: 'text-blue-600' };
    if (risk <= thresholds.riskLevels.orange) return { label: 'Moderate', color: 'text-orange-600' };
    return { label: 'Extremely Aggressive', color: 'text-red-600' };
  };

  const riskLevel = getRiskLevel(value);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>{min}%</span>
        <span>{max}%</span>
      </div>
      
      <div className="relative h-6">
        {/* Zone backgrounds */}
        <div className="absolute inset-x-0 top-2 h-2 flex rounded-lg overflow-hidden">
          <div className="h-full bg-red-200" style={{ width: `${redZoneWidth}%` }} />
          <div className="h-full bg-orange-200" style={{ width: `${orangeZoneWidth}%` }} />
          <div className="h-full bg-green-200" style={{ width: `${greenZoneWidth}%` }} />
        </div>

        {/* Initial Balance Marker */}
        <div 
          className="absolute h-6 w-0.5 bg-gray-800 top-0 z-20"
          style={{ left: `${initialBalancePosition}%` }}
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-xs font-medium bg-gray-800 text-white px-1.5 py-0.5 rounded">
              Initial Balance
            </span>
          </div>
        </div>

        {/* Slider input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute top-2 w-full h-2 bg-transparent appearance-none cursor-pointer z-10"
        />

        {/* Current zone marker */}
        {currentZone && (
          <div 
            className="absolute h-4 w-0.5 bg-blue-600 top-1 z-20"
            style={{ 
              left: `${getPositionPercentage(currentZone.suggestedRisk)}%` 
            }}
            title={`Suggested: ${currentZone.suggestedRisk}%`}
          />
        )}
      </div>

      {/* Value display */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${riskLevel.color}`}>
            {value}%
          </span>
          <span className="text-xs text-gray-500">
            ({riskLevel.label})
          </span>
        </div>
        {currentZone && value !== currentZone.suggestedRisk && (
          <span className="text-sm text-blue-600">
            Suggested: {currentZone.suggestedRisk}%
          </span>
        )}
      </div>
    </div>
  );
};

export default RiskSlider;