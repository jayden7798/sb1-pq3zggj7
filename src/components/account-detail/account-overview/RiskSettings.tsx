import React from 'react';
import { Shield } from 'lucide-react';
import RiskPerTradeEditor from '../RiskPerTradeEditor';
import type { TradingAccount } from '../../../types/profile';

interface RiskSettingsProps {
  account: TradingAccount;
}

const RiskSettings: React.FC<RiskSettingsProps> = ({ account }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <Shield className="w-4 h-4 text-blue-500" />
        Risk Parameters
      </h3>
      
      <div className="space-y-4">
        <RiskPerTradeEditor />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Max Daily Loss</span>
            <p className="font-medium mt-1">{account.riskSettings.maxDailyDrawdown}%</p>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Max Total Loss</span>
            <p className="font-medium mt-1">{account.riskSettings.maxTotalDrawdown}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskSettings;