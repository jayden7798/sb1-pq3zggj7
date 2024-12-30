import React, { useState } from 'react';
import { Percent } from 'lucide-react';
import { useTradingAccount } from '../../context/TradingAccountContext';

const RiskPerTradeEditor: React.FC = () => {
  const { account, updateRiskSettings } = useTradingAccount();
  const [isEditing, setIsEditing] = useState(false);
  const [riskValue, setRiskValue] = useState(account?.riskSettings.defaultRiskPerTrade || 1);

  if (!account) return null;

  const handleSubmit = () => {
    updateRiskSettings({
      ...account.riskSettings,
      defaultRiskPerTrade: riskValue
    });
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg group">
        <span className="text-gray-600">Risk per Trade</span>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{riskValue}%</span>
          <button
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-600"
          >
            Edit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <Percent className="w-4 h-4 text-gray-500" />
        <div className="flex-1">
          <input
            type="number"
            value={riskValue}
            onChange={(e) => setRiskValue(Math.max(0.1, Math.min(100, Number(e.target.value))))}
            step="0.1"
            min="0.1"
            max="100"
            className="w-full px-2 py-1 rounded border focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={() => {
              setRiskValue(account.riskSettings.defaultRiskPerTrade);
              setIsEditing(false);
            }}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskPerTradeEditor;