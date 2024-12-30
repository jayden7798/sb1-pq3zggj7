import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import RiskMetricsDisplay from './RiskMetricsDisplay';
import ConsecutiveLossInput from './ConsecutiveLossInput';
import { useTradingAccount } from '../../context/TradingAccountContext';
import { useAccountMetrics } from '../../hooks/useAccountMetrics';

const RiskInsights: React.FC = () => {
  const { account } = useTradingAccount();
  const metrics = useAccountMetrics(account!);
  const [customThreshold, setCustomThreshold] = useState<number>();

  if (!account) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-yellow-500" />
        Risk Insights
      </h2>

      <div className="space-y-6">
        <ConsecutiveLossInput
          defaultValue={metrics.risk.maxConsecutiveLosses}
          maxValue={metrics.risk.maxConsecutiveLosses}
          onUpdate={setCustomThreshold}
        />

        <RiskMetricsDisplay metrics={metrics.risk} currency={account.currency} />
      </div>
    </div>
  );
};

export default RiskInsights;