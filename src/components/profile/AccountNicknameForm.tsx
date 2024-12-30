import React from 'react';
import { User } from 'lucide-react';
import type { TradingAccount } from '../../types/profile';

interface AccountNicknameFormProps {
  formData: Partial<TradingAccount>;
  onChange: (data: any) => void;
  onNext: () => void;
}

const AccountNicknameForm: React.FC<AccountNicknameFormProps> = ({
  formData,
  onChange,
  onNext,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <User className="w-6 h-6 text-blue-500" />
        Account Details
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Account Nickname
        </label>
        <input
          type="text"
          value={formData.nickname}
          onChange={(e) => onChange({ ...formData, nickname: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="My Trading Account"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={!formData.nickname}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AccountNicknameForm;