import React, { useState } from 'react';
import { PencilLine, Check, X } from 'lucide-react';

interface BalanceEditorProps {
  currentBalance: number;
  currency: string;
  onBalanceUpdate: (newBalance: number) => void;
}

const BalanceEditor: React.FC<BalanceEditorProps> = ({ currentBalance, currency, onBalanceUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBalance, setNewBalance] = useState(currentBalance);

  const handleSubmit = () => {
    onBalanceUpdate(newBalance);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewBalance(currentBalance);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-semibold">{currency} {currentBalance.toLocaleString()}</span>
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Edit balance"
        >
          <PencilLine className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={newBalance}
        onChange={(e) => setNewBalance(Math.max(0, parseFloat(e.target.value) || 0))}
        className="w-32 px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        autoFocus
      />
      <button
        onClick={handleSubmit}
        className="text-green-500 hover:text-green-600"
        aria-label="Save balance"
      >
        <Check className="w-4 h-4" />
      </button>
      <button
        onClick={handleCancel}
        className="text-red-500 hover:text-red-600"
        aria-label="Cancel editing"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default BalanceEditor;