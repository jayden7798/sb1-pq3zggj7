import React from 'react';
import { Building2, User } from 'lucide-react';
import type { AccountType } from '../../types/profile';

interface AccountTypeSelectorProps {
  value: AccountType;
  onChange: (type: AccountType) => void;
  onNext: () => void;
}

const AccountTypeSelector: React.FC<AccountTypeSelectorProps> = ({ value, onChange, onNext }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Select Account Type</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onChange('personal')}
          className={`flex items-center gap-2 p-4 rounded-lg border-2 ${
            value === 'personal' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="font-medium">Personal Account</span>
        </button>
        
        <button
          type="button"
          onClick={() => onChange('prop')}
          className={`flex items-center gap-2 p-4 rounded-lg border-2 ${
            value === 'prop' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Building2 className="w-5 h-5" />
          <span className="font-medium">Prop Account</span>
        </button>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AccountTypeSelector;