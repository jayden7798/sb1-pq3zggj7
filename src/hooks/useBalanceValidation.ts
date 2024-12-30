import { useState, useCallback } from 'react';

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const useBalanceValidation = () => {
  const [error, setError] = useState<string | undefined>();

  const validateBalance = useCallback((balance: number): ValidationResult => {
    if (balance <= 0) {
      const error = 'Balance must be greater than 0';
      setError(error);
      return { isValid: false, error };
    }
    setError(undefined);
    return { isValid: true };
  }, []);

  return { validateBalance, error };
};