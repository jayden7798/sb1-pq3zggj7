import React, { useEffect } from 'react';
import { AlertTriangle, TrendingUp, MinusCircle } from 'lucide-react';
import { useTradingAccount } from '../../context/TradingAccountContext';
import { useAccountMetrics } from '../../hooks/useAccountMetrics';
import { useRiskZones } from '../../hooks/useRiskZones';
import RiskSlider from './RiskSlider';
import RiskZoneSettings from './RiskZoneSettings';

const RiskZones: React.FC = () => {
  const { account, updateRiskSettings } = useTradingAccount();
  const { thresholds } = useRiskZones();
  const metrics = useAccountMetrics(account!);

  // Automatically adjust risk when zone changes
  useEffect(() => {
    if (account && metrics.zone.suggestedRisk !== account.riskSettings.defaultRiskPerTrade) {
      updateRiskSettings({
        ...account.riskSettings,
        defaultRiskPerTrade: metrics.zone.suggestedRisk
      });
    }
  }, [metrics.zone.name]);

  if (!account) return null;

  const profitLoss = account.currentBalance - account.initialBalance;
  const profitLossPercentage = (profitLoss / account.initialBalance) * 100;

  const handleRiskUpdate = (newRisk: number) => {
    updateRiskSettings({
      ...account.riskSettings,
      defaultRiskPerTrade: newRisk
    });
  };

  return (
    <div className={`p-6 rounded-lg border ${metrics.zone.color}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">RiskSlider</h3>
        </div>
        <RiskZoneSettings />
      </div>

      <p className="text-gray-600 mb-4">{metrics.zone.description}</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Risk per Trade
          </label>
          <RiskSlider
            value={account.riskSettings.defaultRiskPerTrade}
            onChange={handleRiskUpdate}
            min={0.1}
            max={thresholds.riskLevels.green * 1.5}
            step={0.1}
            suggested={metrics.zone.suggestedRisk}
          />
        </div>

        <div className="text-sm text-gray-500">
          Current P/L: {' '}
          <span className={profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
            {account.currency} {Math.abs(profitLoss).toLocaleString()} ({profitLossPercentage.toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default RiskZones;