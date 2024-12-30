import React from 'react';
import { Target } from 'lucide-react';
import RiskMetrics from './RiskMetrics';
import RiskDistribution from './RiskDistribution';
import RiskTrends from './RiskTrends';
import RiskTachometer from './tachometer/RiskTachometer';
import { useTradingAccount } from '../../../context/TradingAccountContext';
import { useRiskAnalytics } from '../../../hooks/useRiskAnalytics';

const RiskAnalysis: React.FC = () => {
  const { account } = useTradingAccount();
  const analytics = useRiskAnalytics(account!);

  if (!account) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="w-6 h-6 text-green-500" />
          <h2 className="text-xl font-semibold">Risk Analysis</h2>
        </div>
      </div>

      <div className="space-y-8">
        <RiskTachometer />
        <RiskMetrics metrics={analytics.metrics} currency={account.currency} />
        <RiskDistribution distribution={analytics.distribution} />
        <RiskTrends trends={analytics.trends} />
      </div>
    </div>
  );
};

export default RiskAnalysis;