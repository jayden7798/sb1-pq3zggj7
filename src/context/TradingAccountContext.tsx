import React, { createContext, useContext, useState } from 'react';
import type { TradingAccount } from '../types/profile';

interface TradingAccountContextType {
  account: TradingAccount | null;
  updateBalance: (newBalance: number) => void;
  updateRiskSettings: (settings: TradingAccount['riskSettings']) => void;
}

const TradingAccountContext = createContext<TradingAccountContextType | null>(null);

export const TradingAccountProvider: React.FC<{
  children: React.ReactNode;
  initialAccount: TradingAccount;
}> = ({ children, initialAccount }) => {
  const [account, setAccount] = useState<TradingAccount>(initialAccount);

  const updateBalance = (newBalance: number) => {
    setAccount(prev => ({
      ...prev,
      currentBalance: newBalance,
      updatedAt: new Date().toISOString()
    }));
  };

  const updateRiskSettings = (settings: TradingAccount['riskSettings']) => {
    setAccount(prev => ({
      ...prev,
      riskSettings: settings,
      updatedAt: new Date().toISOString()
    }));
  };

  return (
    <TradingAccountContext.Provider value={{ account, updateBalance, updateRiskSettings }}>
      {children}
    </TradingAccountContext.Provider>
  );
};

export const useTradingAccount = () => {
  const context = useContext(TradingAccountContext);
  if (!context) {
    throw new Error('useTradingAccount must be used within a TradingAccountProvider');
  }
  return context;
};