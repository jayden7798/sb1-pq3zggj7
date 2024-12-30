import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface ConsecutiveLossInputProps {
  defaultValue: number;
  maxValue: number;
  onUpdate: (value: number) => void;
}

const ConsecutiveLossInput: React.FC<ConsecutiveLossInputProps> = ({
  defaultValue,
  maxValue,
  onUpdate,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    setShowWarning(newValue > maxValue);
    onUpdate(newValue);
  };

  return (
    <div className="p-4 bg-blue-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">Consecutive Loss Threshold</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            max="100"
            value={value}
            onChange={(e) => handleChange(parseInt(e.target.value) || 1)}
            className="w-20 px-2 py-1 rounded border focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">trades</span>
        </div>
      </div>
      
      {showWarning && (
        <div className="mt-2 flex items-start gap-2 text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>
            This threshold exceeds your maximum safe limit of {maxValue} trades 
            based on your current risk settings. Consider adjusting your risk 
            per trade or maximum drawdown settings.
          </p>
        </div>
      )}
    </div>
  );
};

export default ConsecutiveLossInput;