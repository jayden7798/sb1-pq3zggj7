import React from 'react';
import type { RiskDistributionData } from '../../../types/risk';

interface RiskDistributionProps {
  distribution: RiskDistributionData;
}

const RiskDistribution: React.FC<RiskDistributionProps> = ({ distribution }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Risk Distribution</h3>
      <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full flex">
          <div 
            className="bg-green-500" 
            style={{ width: `${distribution.lowRisk}%` }} 
            title={`Low Risk: ${distribution.lowRisk}%`}
          />
          <div 
            className="bg-yellow-500" 
            style={{ width: `${distribution.moderateRisk}%` }}
            title={`Moderate Risk: ${distribution.moderateRisk}%`}
          />
          <div 
            className="bg-red-500" 
            style={{ width: `${distribution.highRisk}%` }}
            title={`High Risk: ${distribution.highRisk}%`}
          />
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span>Low Risk ({distribution.lowRisk}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <span>Moderate ({distribution.moderateRisk}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span>High Risk ({distribution.highRisk}%)</span>
        </div>
      </div>
    </div>
  );
};

export default RiskDistribution;