import React from 'react';
import { useTradingAccount } from '../../../../context/TradingAccountContext';
import { useRiskZones } from '../../../../hooks/useRiskZones';
import ThermometerScale from './ThermometerScale';
import ThermometerNeedle from './ThermometerNeedle';
import ThermometerTooltip from './ThermometerTooltip';
import { calculateThermometerPosition } from '../../../../utils/thermostat';

const RiskThermostat: React.FC = () => {
  const { account } = useTradingAccount();
  const { thresholds } = useRiskZones();
  
  if (!account) return null;

  const profitLoss = account.currentBalance - account.initialBalance;
  const profitLossPercentage = (profitLoss / account.initialBalance) * 100;
  const position = calculateThermometerPosition(profitLossPercentage, thresholds);

  return (
    <div className="relative h-64 p-4">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-12 h-48 bg-gray-100 rounded-full overflow-hidden">
          <ThermometerScale thresholds={thresholds} />
          <ThermometerNeedle position={position} />
        </div>
      </div>
      
      <ThermometerTooltip
        profitLoss={profitLoss}
        profitLossPercentage={profitLossPercentage}
        currency={account.currency}
      />
    </div>
  );
};

export default RiskThermostat;