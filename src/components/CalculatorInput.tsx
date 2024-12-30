import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CalculatorInputProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
  step?: string;
}

const CalculatorInput: React.FC<CalculatorInputProps> = ({
  label,
  name,
  value,
  onChange,
  icon: Icon,
  step = "1",
}) => {
  return (
    <div className="grid gap-4">
      <label className="flex items-center gap-2 text-gray-700 font-medium">
        {Icon && <Icon className="w-5 h-5" />}
        {label}
      </label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        step={step}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
}

export default CalculatorInput;