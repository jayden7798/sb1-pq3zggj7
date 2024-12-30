import React from 'react';
import { Settings, AlertTriangle } from 'lucide-react';
import { useTradingAccount } from '../../context/TradingAccountContext';
import { useAccountMetrics } from '../../hooks/useAccountMetrics';

const RiskTools: React.FC = () => {
  const { account } = useTradingAccount();
  const metrics = useAccountMetrics(account!);

  if (!account) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-500" />
          Risk Management Tools
        </h2>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            <h3 className="font-medium">Risk Analysis</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Maximum Safe Loss</span>
              <span className="font-medium">{account.currency} {metrics.risk.maxDailyLoss.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Risk per Trade</span>
              <span className="font-medium">{account.currency} {metrics.risk.riskAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Consecutive Loss Limit</span>
              <span className="font-medium">{metrics.risk.maxConsecutiveLosses} trades</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium mb-3">Alert Settings</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-blue-500" />
              <span className="ml-2 text-gray-700">
                Notify when nearing drawdown limit
              </span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded text-blue-500" />
              <span className="ml-2 text-gray-700">
                Alert on consecutive losses
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskTools;