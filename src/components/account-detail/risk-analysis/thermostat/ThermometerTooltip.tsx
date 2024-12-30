import React from 'react';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface ThermometerTooltipProps {
  profitLoss: number;
  profitLossPercentage: number;
  currency: string;
}

const ThermometerTooltip: React.FC<ThermometerTooltipProps> = ({
  profitLoss,
  profitLossPercentage,
  currency
}) => {
  const getMessage = () => {
    if (profitLossPercentage <= -10) {
      return {
        icon: AlertTriangle,
        color: 'text-red-500',
        message: 'Caution! You\'re in significant drawdown. Consider reducing position sizes.'
      };
    }
    if (profitLossPercentage < 0) {
      return {
        icon: TrendingDown,
        color: 'text-orange-500',
        message: 'Minor drawdown detected. Monitor positions closely.'
      };
    }
    return {
      icon: TrendingUp,
      color: 'text-green-500',
      message: 'Account in profit. Maintain disciplined risk management.'
    };
  };

  const { icon: Icon, color, message } = getMessage();

  return (
    <div className="absolute bottom-0 left-20 right-4">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex items-start gap-3">
          <Icon className={`w-5 h-5 ${color} flex-shrink-0 mt-0.5`} />
          <div>
            <p className="font-medium">
              {profitLoss >= 0 ? 'Profit' : 'Drawdown'}: {' '}
              <span className={profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                {currency} {Math.abs(profitLoss).toLocaleString()} ({Math.abs(profitLossPercentage).toFixed(2)}%)
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-1">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThermometerTooltip;