import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { useRiskZones } from '../../../../hooks/useRiskZones';

const TachometerSettings: React.FC = () => {
  const { thresholds, updateThresholds } = useRiskZones();
  const [isOpen, setIsOpen] = useState(false);
  const [localThresholds, setLocalThresholds] = useState(thresholds);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateThresholds(localThresholds);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        title="Customize Risk Zones"
      >
        <Settings className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="absolute top-0 right-0 w-72 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="font-medium text-gray-900">Customize Risk Zones</h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              High Risk Zone (Red)
            </label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-500">From</label>
                <input
                  type="number"
                  value={-50}
                  disabled
                  className="mt-1 block w-full px-2 py-1 text-sm border rounded bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500">To</label>
                <input
                  type="number"
                  value={localThresholds.redZone}
                  onChange={(e) => setLocalThresholds(prev => ({
                    ...prev,
                    redZone: Number(e.target.value)
                  }))}
                  step="0.1"
                  className="mt-1 block w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Break-even Zone (Orange)
            </label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-500">From</label>
                <input
                  type="number"
                  value={localThresholds.redZone}
                  disabled
                  className="mt-1 block w-full px-2 py-1 text-sm border rounded bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500">To</label>
                <input
                  type="number"
                  value={localThresholds.greenZone}
                  onChange={(e) => setLocalThresholds(prev => ({
                    ...prev,
                    greenZone: Number(e.target.value)
                  }))}
                  step="0.1"
                  className="mt-1 block w-full px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profit Zone (Green)
            </label>
            <div className="mt-1">
              <label className="block text-xs text-gray-500">From</label>
              <input
                type="number"
                value={localThresholds.greenZone}
                disabled
                className="mt-1 block w-full px-2 py-1 text-sm border rounded bg-gray-50"
              />
              <p className="mt-1 text-xs text-gray-500">
                Green zone extends to +10% and above
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => {
              setLocalThresholds(thresholds);
              setIsOpen(false);
            }}
            className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default TachometerSettings;