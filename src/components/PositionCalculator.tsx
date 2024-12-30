import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent } from 'lucide-react';
import CalculatorInput from './CalculatorInput';
import ResultsDisplay from './ResultsDisplay';
import RiskWarning from './shared/RiskWarning';
import { calculatePositions } from '../utils/calculator';
import { useRiskValidation } from '../hooks/useRiskValidation';
import type { CalculatorInputs } from '../utils/types';

const PositionCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    accountSize: 10000,
    riskPercent: 1,
    entryPrice: 1.0800,
    stopLossPips: 12,
  });
  
  const { validateRisk, warning } = useRiskValidation();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = parseFloat(value) || 0;
    
    setInputs(prev => ({
      ...prev,
      [name]: newValue,
    }));

    if (name === 'riskPercent' && newValue > 2.9) {
      validateRisk(newValue);
    }
  };

  const results = calculatePositions(inputs);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <Calculator className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">Position Size Calculator</h1>
      </div>

      <div className="grid gap-6 mb-8">
        <CalculatorInput
          label="Account Size"
          name="accountSize"
          value={inputs.accountSize}
          onChange={handleInputChange}
          icon={DollarSign}
        />
        <div>
          <CalculatorInput
            label="Risk Percentage"
            name="riskPercent"
            value={inputs.riskPercent}
            onChange={handleInputChange}
            icon={Percent}
            step="0.1"
          />
          {inputs.riskPercent > 2.9 && (
            <RiskWarning message="Warning: Risk levels above 2.9% are considered extremely aggressive and can lead to significant account drawdowns. Most professional traders keep risk between 0.5% to 2% per trade." />
          )}
        </div>
        <CalculatorInput
          label="Entry Price"
          name="entryPrice"
          value={inputs.entryPrice}
          onChange={handleInputChange}
          step="0.0001"
        />
        <CalculatorInput
          label="Stop Loss (Pips)"
          name="stopLossPips"
          value={inputs.stopLossPips}
          onChange={handleInputChange}
          step="1"
        />
      </div>

      <ResultsDisplay results={results} />
    </div>
  );
};

export default PositionCalculator;