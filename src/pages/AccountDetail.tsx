import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { TradingAccount } from '../types/profile';
import { TradingAccountProvider } from '../context/TradingAccountContext';
import AccountOverview from '../components/account-detail/AccountOverview';
import RiskInsights from '../components/account-detail/RiskInsights';
import PerformanceTracking from '../components/account-detail/PerformanceTracking';
import RiskTools from '../components/account-detail/RiskTools';
import RiskOfRuin from '../components/account-detail/RiskOfRuin';
import RiskAnalysis from '../components/account-detail/risk-analysis/RiskAnalysis';
import BalanceReminder from '../components/shared/BalanceReminder';
import { useBalanceReminder } from '../hooks/useBalanceReminder';

interface AccountDetailProps {
  account: TradingAccount;
  onBack: () => void;
  onUpdate: (updatedAccount: TradingAccount) => void;
}

const AccountDetail: React.FC<AccountDetailProps> = ({ account, onBack, onUpdate }) => {
  const { isOpen, closeReminder } = useBalanceReminder();

  return (
    <TradingAccountProvider initialAccount={account}>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Accounts
          </button>

          <div className="grid gap-6 md:grid-cols-2">
            <AccountOverview onUpdate={onUpdate} />
            <RiskAnalysis />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <RiskInsights />
            <RiskOfRuin />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <PerformanceTracking />
            <RiskTools />
          </div>
        </div>
      </div>

      <BalanceReminder isOpen={isOpen} onClose={closeReminder} />
    </TradingAccountProvider>
  );
};

export default AccountDetail;