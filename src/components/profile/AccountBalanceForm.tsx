import React from 'react';
import { DollarSign } from 'lucide-react';
import type { TradingAccount } from '../../types/profile';

interface AccountBalanceFormProps {
  formData: Partial<TradingAccount>;
  onChange: (data: any) => void;
  onBack: () => void;
  onNext: () => void;
}

const AccountBalanceForm: React.FC<AccountBalanceFormProps> = ({
  formData,
  onChange,
  onBack,
  onNext,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <DollarSign className="w-6 h-6 text-blue-500" />
        Account Balance
      </h2>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Initial Balance
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              value={formData.initialBalance}
              onChange={(e) => onChange({ ...formData, initialBalance: parseFloat(e.target.value) || 0 })}
              className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
              step="1000"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Balance
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              value={formData.currentBalance}
              onChange={(e) => onChange({ ...formData, currentBalance: parseFloat(e.target.value) || 0 })}
              className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
              step="1000"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!formData.initialBalance || !formData.currentBalance}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AccountBalanceForm;