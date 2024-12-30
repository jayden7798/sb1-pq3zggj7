import React from 'react';
import { Trash2, Building2 } from 'lucide-react';
import type { TradingAccount } from '../../types/profile';

interface AccountListItemProps {
  account: TradingAccount;
  onSelect: (account: TradingAccount) => void;
  onDelete: (id: string) => void;
}

const AccountListItem: React.FC<AccountListItemProps> = ({ account, onSelect, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this account?')) {
      onDelete(account.id);
    }
  };

  const formatPhase = (phase: string) => {
    switch (phase) {
      case 'evaluation1': return 'Phase 1';
      case 'evaluation2': return 'Phase 2';
      case 'funded': return 'Funded';
      default: return phase;
    }
  };

  return (
    <div
      className="p-4 border rounded-lg hover:border-blue-500 transition-colors cursor-pointer group"
      onClick={() => onSelect(account)}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="font-medium text-lg">{account.nickname}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {account.type === 'prop' ? (
              <>
                <Building2 className="w-4 h-4" />
                <span>{account.propDetails?.firmName}</span>
                <span className="text-blue-500 font-medium">
                  {formatPhase(account.propDetails?.phase || '')}
                </span>
              </>
            ) : (
              <span>{account.type.charAt(0).toUpperCase() + account.type.slice(1)} Account</span>
            )}
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="text-right">
            <p className="font-medium">{account.currency} {account.currentBalance.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Initial: {account.currency} {account.initialBalance.toLocaleString()}</p>
          </div>
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            title="Delete account"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountListItem;