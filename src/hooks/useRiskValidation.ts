import { useState, useCallback } from 'react';

export interface RiskValidationResult {
  isValid: boolean;
  warning?: string;
}

export const useRiskValidation = (threshold = 2.9) => {
  const [warning, setWarning] = useState<string>();

  const validateRisk = useCallback((riskPercent: number): RiskValidationResult => {
    if (riskPercent > threshold) {
      const warning = 'Warning: Risk levels above 2.9% are considered extremely aggressive and can lead to significant account drawdowns. Most professional traders keep risk between 0.5% to 2% per trade.';
      setWarning(warning);
      return { isValid: true, warning };
    }
    setWarning(undefined);
    return { isValid: true };
  }, [threshold]);

  return { validateRisk, warning };
};