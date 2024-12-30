import React, { useState } from 'react';
import { useBalanceValidation } from '../../hooks/useBalanceValidation';
import { AnimateValue } from '../shared/AnimateValue';

interface BalanceDisplayProps {
  label: string;
  value: number;
  currency: string;
  isEditable?: boolean;
  onUpdate?: (value: number) => void;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
  label,
  value,
  currency,
  isEditable = false,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const { validateBalance, error } = useBalanceValidation();

  const handleSubmit = () => {
    const { isValid } = validateBalance(tempValue);
    if (isValid && onUpdate) {
      onUpdate(tempValue);
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg group">
        <span className="text-gray-600">{label}</span>
        <div className="flex items-center gap-2">
          <AnimateValue
            value={value}
            currency={currency}
            className="font-semibold"
          />
          {isEditable && (
            <button
              onClick={() => setIsEditing(true)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="text-gray-600">{label}</span>
        <div className="flex-1">
          <input
            type="number"
            value={tempValue}
            onChange={(e) => setTempValue(Number(e.target.value))}
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
              setTempValue(value);
              setIsEditing(false);
            }}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default BalanceDisplay;