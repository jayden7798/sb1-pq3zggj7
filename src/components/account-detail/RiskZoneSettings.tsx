import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { useRiskZones } from '../../hooks/useRiskZones';
import type { ZoneThresholds } from '../../types/risk';

const RiskZoneSettings: React.FC = () => {
  const { thresholds, updateThresholds } = useRiskZones();
  const [isEditing, setIsEditing] = useState(false);
  const [localThresholds, setLocalThresholds] = useState<ZoneThresholds>(thresholds);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateThresholds(localThresholds);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <Settings className="w-4 h-4" />
        Customize Risk Zones
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium">Customize Risk Zones</h4>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Red Zone Threshold (%)
          </label>
          <input
            type="number"
            value={localThresholds.redZone}
            onChange={(e) => setLocalThresholds(prev => ({
              ...prev,
              redZone: Number(e.target.value)
            }))}
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            Drawdown percentage to enter red zone
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Green Zone Threshold (%)
          </label>
          <input
            type="number"
            value={localThresholds.greenZone}
            onChange={(e) => setLocalThresholds(prev => ({
              ...prev,
              greenZone: Number(e.target.value)
            }))}
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            Profit percentage to enter green zone
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Red Zone Risk (%)
            </label>
            <input
              type="number"
              value={localThresholds.riskLevels.red}
              onChange={(e) => setLocalThresholds(prev => ({
                ...prev,
                riskLevels: {
                  ...prev.riskLevels,
                  red: Number(e.target.value)
                }
              }))}
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Orange Zone Risk (%)
            </label>
            <input
              type="number"
              value={localThresholds.riskLevels.orange}
              onChange={(e) => setLocalThresholds(prev => ({
                ...prev,
                riskLevels: {
                  ...prev.riskLevels,
                  orange: Number(e.target.value)
                }
              }))}
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Green Zone Risk (%)
            </label>
            <input
              type="number"
              value={localThresholds.riskLevels.green}
              onChange={(e) => setLocalThresholds(prev => ({
                ...prev,
                riskLevels: {
                  ...prev.riskLevels,
                  green: Number(e.target.value)
                }
              }))}
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            setLocalThresholds(thresholds);
            setIsEditing(false);
          }}
          className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default RiskZoneSettings;