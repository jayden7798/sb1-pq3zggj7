import React, { useEffect, useRef } from 'react';
import { useTradingAccount } from '../../../../context/TradingAccountContext';
import { useRiskZones } from '../../../../hooks/useRiskZones';
import TachometerDial from './TachometerDial';
import TachometerNeedle from './TachometerNeedle';
import TachometerLabels from './TachometerLabels';
import TachometerInsights from './TachometerInsights';
import TachometerSettings from './TachometerSettings';
import { calculateNeedleRotation } from '../../../../utils/tachometer';

const RiskTachometer: React.FC = () => {
  const { account } = useTradingAccount();
  const { thresholds, getZoneInfo } = useRiskZones();
  const needleRef = useRef<HTMLDivElement>(null);

  if (!account) return null;

  const profitLoss = account.currentBalance - account.initialBalance;
  const profitLossPercentage = (profitLoss / account.initialBalance) * 100;
  const rotation = calculateNeedleRotation(profitLossPercentage);
  const zoneInfo = getZoneInfo(account.currentBalance, account.initialBalance);

  useEffect(() => {
    if (needleRef.current) {
      needleRef.current.style.transform = `rotate(${rotation}deg)`;
    }
  }, [rotation, account.currentBalance]);

  return (
    <div className="relative bg-white rounded-lg p-6 shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Risk Tachometer</h3>
        <TachometerSettings />
      </div>

      <div className="aspect-[2/1] relative">
        <TachometerDial />
        <TachometerNeedle ref={needleRef} rotation={rotation} />
        <TachometerLabels thresholds={thresholds} />
      </div>

      <TachometerInsights
        profitLoss={profitLoss}
        profitLossPercentage={profitLossPercentage}
        currency={account.currency}
        zoneInfo={zoneInfo}
      />
    </div>
  );
};

export default RiskTachometer;