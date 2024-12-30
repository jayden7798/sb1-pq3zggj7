import React from 'react';
import { Wallet } from 'lucide-react';
import { useTradingAccount } from '../../context/TradingAccountContext';
import { useAccountMetrics } from '../../hooks/useAccountMetrics';
import BalanceDisplay from './BalanceDisplay';

interface AccountOverviewProps {
  onUpdate: (updatedAccount: any) => void;
}

const AccountOverview: React.FC<AccountOverviewProps> = ({ onUpdate }) => {
  const { account, updateBalance } = useTradingAccount();
  const metrics = useAccountMetrics(account!);

  if (!account) return null;

  const handleBalanceUpdate = (newBalance: number) => {
    updateBalance(newBalance);
    onUpdate({
      ...account,
      currentBalance: newBalance,
      updatedAt: new Date().toISOString()
    });
  };

  const profitLoss = account.currentBalance - account.initialBalance;
  const profitLossPercentage = (profitLoss / account.initialBalance) * 100;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Account Overview</h2>
        </div>
        {account.type === 'prop' && (
          <span className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded">
            {account.propDetails?.firmName} - {account.propDetails?.phase}
          </span>
        )}
      </div>

      <div className="grid gap-6">
        {/* Account Balances */}
        <div className="grid gap-4">
          <BalanceDisplay
            label="Initial Balance"
            value={account.initialBalance}
            currency={account.currency}
          />
          <BalanceDisplay
            label="Current Balance"
            value={account.currentBalance}
            currency={account.currency}
            isEditable
            onUpdate={handleBalanceUpdate}
          />
        </div>

        {/* Performance Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Profit/Loss</span>
            <p className={`text-lg font-semibold mt-1 ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {account.currency} {Math.abs(profitLoss).toLocaleString()}
            </p>
            <p className={`text-sm ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {profitLossPercentage >= 0 ? '+' : ''}{profitLossPercentage.toFixed(2)}%
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Risk per Trade</span>
            <p className="text-lg font-semibold mt-1">
              {account.riskSettings.defaultRiskPerTrade}%
            </p>
            <p className="text-sm text-gray-500">
              {account.currency} {((account.currentBalance * account.riskSettings.defaultRiskPerTrade) / 100).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Risk Limits */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Daily Loss Limit</span>
            <p className="text-lg font-semibold mt-1">
              {account.riskSettings.maxDailyDrawdown}%
            </p>
            <p className="text-sm text-gray-500">
              {account.currency} {((account.currentBalance * account.riskSettings.maxDailyDrawdown) / 100).toLocaleString()}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Total Loss Limit</span>
            <p className="text-lg font-semibold mt-1">
              {account.riskSettings.maxTotalDrawdown}%
            </p>
            <p className="text-sm text-gray-500">
              {account.currency} {((account.currentBalance * account.riskSettings.maxTotalDrawdown) / 100).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;