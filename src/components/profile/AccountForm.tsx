import React, { useState } from 'react';
import type { TradingAccount } from '../../types/profile';
import AccountTypeSelector from './AccountTypeSelector';
import AccountBalanceForm from './AccountBalanceForm';
import RiskSettingsForm from './RiskSettingsForm';
import PropAccountForm from './PropAccountForm';
import { useAccountValidation } from '../../hooks/useAccountValidation';

interface AccountFormProps {
  account?: TradingAccount;
  onSubmit: (account: Omit<TradingAccount, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const DEFAULT_RISK_SETTINGS = {
  defaultRiskPerTrade: 1,
  maxDailyDrawdown: 5,
  maxTotalDrawdown: 10,
  minStopLossPips: 10,
};

const DEFAULT_PROP_DETAILS = {
  firmName: 'FTMO',
  phase: 'evaluation1',
  profitTarget: 10,
  maxDailyLoss: 5,
  maxTotalLoss: 10,
  minTradingDays: 10,
  maxTradingDays: 30,
};

const AccountForm: React.FC<AccountFormProps> = ({ account, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nickname: account?.nickname || '',
    type: account?.type || 'personal',
    initialBalance: account?.initialBalance || 100000,
    currentBalance: account?.currentBalance || 100000,
    currency: account?.currency || 'USD',
    riskSettings: account?.riskSettings || DEFAULT_RISK_SETTINGS,
    propDetails: account?.propDetails || DEFAULT_PROP_DETAILS,
  });

  const { validateBalance } = useAccountValidation();

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const validation = validateBalance(formData.initialBalance, formData.currentBalance);
    if (!validation.isValid) return;

    onSubmit({
      ...formData,
      propDetails: formData.type === 'prop' ? formData.propDetails : undefined,
    });
  };

  const handleNext = () => {
    if (step === 3 && formData.type === 'personal') {
      // If we're on risk settings and it's a personal account, submit
      handleSubmit();
    } else if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {step === 1 && (
        <AccountTypeSelector
          value={formData.type}
          onChange={(type) => setFormData({ ...formData, type })}
          onNext={handleNext}
        />
      )}

      {step === 2 && (
        <AccountBalanceForm
          formData={formData}
          onChange={setFormData}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}

      {step === 3 && (
        <RiskSettingsForm
          settings={formData.riskSettings}
          onChange={(riskSettings) => setFormData({ ...formData, riskSettings })}
          onBack={handleBack}
          onNext={handleNext}
          isLastStep={formData.type === 'personal'}
        />
      )}

      {step === 4 && formData.type === 'prop' && (
        <PropAccountForm
          details={formData.propDetails}
          onChange={(propDetails) => setFormData({ ...formData, propDetails })}
          onBack={handleBack}
          onSubmit={handleSubmit}
        />
      )}
    </form>
  );
};

export default AccountForm;