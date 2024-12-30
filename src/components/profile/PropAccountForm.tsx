import React from 'react';
import { Building2 } from 'lucide-react';
import type { PropAccountDetails } from '../../types/profile';

interface PropAccountFormProps {
  details: PropAccountDetails;
  onChange: (details: PropAccountDetails) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const PROP_FIRMS = [
  'FTMO',
  'MyForexFunds',
  'The 5%ers',
  'True Forex Funds',
  'Other'
];

const PropAccountForm: React.FC<PropAccountFormProps> = ({
  details,
  onChange,
  onBack,
  onSubmit
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...details,
      [name]: name.includes('max') || name.includes('min') || name.includes('profit')
        ? parseFloat(value)
        : value,
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Building2 className="w-5 h-5 text-blue-500" />
        Prop Firm Details
      </h3>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prop Firm
          </label>
          <select
            name="firmName"
            value={details.firmName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {PROP_FIRMS.map(firm => (
              <option key={firm} value={firm}>{firm}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Challenge Phase
          </label>
          <select
            name="phase"
            value={details.phase}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="evaluation1">Evaluation Phase 1</option>
            <option value="evaluation2">Evaluation Phase 2</option>
            <option value="funded">Funded</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profit Target (%)
            </label>
            <input
              type="number"
              name="profitTarget"
              value={details.profitTarget}
              onChange={handleChange}
              step="0.1"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Maximum Daily Loss (%)
            </label>
            <input
              type="number"
              name="maxDailyLoss"
              value={details.maxDailyLoss}
              onChange={handleChange}
              step="0.1"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Maximum Total Loss (%)
          </label>
          <input
            type="number"
            name="maxTotalLoss"
            value={details.maxTotalLoss}
            onChange={handleChange}
            step="0.1"
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Minimum Trading Days
            </label>
            <input
              type="number"
              name="minTradingDays"
              value={details.minTradingDays}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Maximum Trading Days
            </label>
            <input
              type="number"
              name="maxTradingDays"
              value={details.maxTradingDays}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
        >
          Continue to Overview
        </button>
      </div>
    </div>
  );
};

export default PropAccountForm;