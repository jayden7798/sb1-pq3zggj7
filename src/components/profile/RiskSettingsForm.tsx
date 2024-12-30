import React from 'react';
import { AlertTriangle } from 'lucide-react';
import type { RiskSettings } from '../../types/profile';

interface RiskSettingsFormProps {
  settings: RiskSettings;
  onChange: (settings: RiskSettings) => void;
  onBack: () => void;
  onNext: () => void;
  isLastStep?: boolean;
}

const RiskSettingsForm: React.FC<RiskSettingsFormProps> = ({
  settings,
  onChange,
  onBack,
  onNext,
  isLastStep = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...settings,
      [name]: parseFloat(value) || 0,
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-yellow-500" />
        Risk Management Settings
      </h3>
      
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Default Risk Per Trade (%)
          </label>
          <input
            type="number"
            name="defaultRiskPerTrade"
            value={settings.defaultRiskPerTrade}
            onChange={handleChange}
            step="0.1"
            min="0.1"
            max="100"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Maximum Daily Drawdown (%)
          </label>
          <input
            type="number"
            name="maxDailyDrawdown"
            value={settings.maxDailyDrawdown}
            onChange={handleChange}
            step="0.1"
            min="0.1"
            max="100"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Maximum Total Drawdown (%)
          </label>
          <input
            type="number"
            name="maxTotalDrawdown"
            value={settings.maxTotalDrawdown}
            onChange={handleChange}
            step="0.1"
            min="0.1"
            max="100"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minimum Stop Loss (Pips)
          </label>
          <input
            type="number"
            name="minStopLossPips"
            value={settings.minStopLossPips}
            onChange={handleChange}
            step="1"
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
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
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {isLastStep ? 'Create Account' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default RiskSettingsForm;