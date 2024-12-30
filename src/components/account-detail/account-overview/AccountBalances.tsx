import React from 'react';
import { DollarSign } from 'lucide-react';
import BalanceDisplay from '../BalanceDisplay';
import type { TradingAccount } from '../../../types/profile';

interface AccountBalancesProps {
  account: TradingAccount;
  onBalanceUpdate: (newBalance: number) => void;
}

const AccountBalances: React.FC<AccountBalancesProps> = ({ account, onBalanceUpdate }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-blue-500" />
        Account Balances
      </h3>
      
      <div className="space-y-3">
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
          onUpdate={onBalanceUpdate}
        />
      </div>
    </div>
  );
};

export default AccountBalances;