import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface RiskWarningProps {
  message: string;
}

const RiskWarning: React.FC<RiskWarningProps> = ({ message }) => {
  return (
    <div className="mt-2 flex items-start gap-2 text-yellow-700 bg-yellow-50 p-3 rounded-lg animate-fade-in">
      <AlertTriangle className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default RiskWarning;