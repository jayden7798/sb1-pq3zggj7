import React, { useState } from 'react';
import { Skull, AlertTriangle, Info } from 'lucide-react';
import { useTradingAccount } from '../../context/TradingAccountContext';
import { calculateRiskOfRuin, getRiskOfRuinSeverity } from '../../utils/riskOfRuin';

const RiskOfRuin: React.FC = () => {
  const { account } = useTradingAccount();
  const [winRate, setWinRate] = useState(55);
  const [riskRewardRatio, setRiskRewardRatio] = useState(2);

  if (!account) return null;

  const riskOfRuin = calculateRiskOfRuin({
    winRate,
    riskRewardRatio,
    riskPerTrade: account.riskSettings.defaultRiskPerTrade,
    consecutiveLosses: Math.floor(account.riskSettings.maxTotalDrawdown / account.riskSettings.defaultRiskPerTrade)
  });

  const severity = getRiskOfRuinSeverity(riskOfRuin);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Skull className="w-5 h-5 text-red-500" />
          Risk of Ruin Analysis
        </h2>
        <div className="relative group">
          <Info className="w-5 h-5 text-gray-400 cursor-help" />
          <div className="absolute right-0 w-64 p-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            Risk of ruin is the probability of losing your entire trading capital based on your risk settings and win rate.
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Win Rate (%)
            </label>
            <input
              type="number"
              value={winRate}
              onChange={(e) => setWinRate(Math.max(1, Math.min(99, Number(e.target.value))))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="1"
              max="99"
              step="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Risk/Reward Ratio (1:X)
            </label>
            <input
              type="number"
              value={riskRewardRatio}
              onChange={(e) => setRiskRewardRatio(Math.max(0.1, Number(e.target.value)))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0.1"
              step="0.1"
            />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700">Probability of Ruin</span>
            <span className={`font-semibold ${severity.color}`}>
              {riskOfRuin.toFixed(2)}%
            </span>
          </div>
          <div className="flex items-start gap-2 mt-2 text-sm">
            <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${severity.color}`} />
            <p className="text-gray-600">{severity.description}</p>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <p>Based on:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Risk per trade: {account.riskSettings.defaultRiskPerTrade}%</li>
            <li>Maximum drawdown: {account.riskSettings.maxTotalDrawdown}%</li>
            <li>Consecutive losses until ruin: {Math.floor(account.riskSettings.maxTotalDrawdown / account.riskSettings.defaultRiskPerTrade)}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RiskOfRuin;