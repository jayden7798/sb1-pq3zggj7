import { useState } from 'react';

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const useAccountValidation = () => {
  const [error, setError] = useState<string>();

  const validateAccountTypeChange = (nickname: string): boolean => {
    return true; // Always allow type change
  };

  const validateBalance = (initial: number, current: number): ValidationResult => {
    if (initial <= 0) {
      setError('Initial balance must be greater than 0');
      return { isValid: false, error: 'Initial balance must be greater than 0' };
    }
    
    if (current <= 0) {
      setError('Current balance must be greater than 0');
      return { isValid: false, error: 'Current balance must be greater than 0' };
    }

    setError(undefined);
    return { isValid: true };
  };

  return {
    validateAccountTypeChange,
    validateBalance,
    error
  };
};