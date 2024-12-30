import React, { useEffect, useState } from 'react';
import { DollarSign, X } from 'lucide-react';

interface BalanceReminderProps {
  isOpen: boolean;
  onClose: () => void;
}

const BalanceReminder: React.FC<BalanceReminderProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white rounded-lg shadow-lg p-4 animate-fade-in">
      <button
        onClick={onClose}
        className="absolute right-2 top-2 text-gray-400 hover:text-gray-500"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <DollarSign className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Update Your Balance</h3>
          <p className="text-sm text-gray-600 mt-1">
            Remember to keep your account balance up to date for accurate risk management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BalanceReminder;