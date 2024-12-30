import React, { useState, useRef } from 'react';
import { Users, Plus } from 'lucide-react';
import AccountForm from '../components/profile/AccountForm';
import AccountListItem from '../components/profile/AccountListItem';
import AccountDetail from './AccountDetail';
import CalculatorToggle from '../components/calculator/CalculatorToggle';
import CalculatorModal from '../components/calculator/CalculatorModal';
import WelcomePopup from '../components/shared/WelcomePopup';
import { useWelcomePopup } from '../hooks/useWelcomePopup';
import type { TradingAccount } from '../types/profile';

const Profile: React.FC = () => {
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<TradingAccount | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [showAccountForm, setShowAccountForm] = useState(false);
  const accountsListRef = useRef<HTMLDivElement>(null);
  const { isOpen: isWelcomeOpen, closePopup: closeWelcome } = useWelcomePopup();

  const handleAccountSubmit = (accountData: Omit<TradingAccount, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAccount: TradingAccount = {
      ...accountData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setAccounts(prev => [...prev, newAccount]);
    setShowAccountForm(false);

    // Scroll to accounts list with smooth animation
    setTimeout(() => {
      accountsListRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const handleAccountUpdate = (updatedAccount: TradingAccount) => {
    setAccounts(prev => prev.map(acc => 
      acc.id === updatedAccount.id ? updatedAccount : acc
    ));
    setSelectedAccount(updatedAccount);
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(acc => acc.id !== id));
  };

  if (selectedAccount) {
    return (
      <>
        <AccountDetail
          account={selectedAccount}
          onBack={() => setSelectedAccount(null)}
          onUpdate={handleAccountUpdate}
        />
        <CalculatorToggle onClick={() => setIsCalculatorOpen(true)} />
        <CalculatorModal 
          isOpen={isCalculatorOpen} 
          onClose={() => setIsCalculatorOpen(false)} 
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <WelcomePopup isOpen={isWelcomeOpen} onClose={closeWelcome} />
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="flex items-center justify-center gap-3 text-3xl font-bold text-gray-900">
            <Users className="w-8 h-8 text-blue-500" />
            Trader Profile
          </h1>
          <p className="mt-2 text-gray-600">Manage your trading accounts and risk settings</p>
        </div>

        {showAccountForm ? (
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <AccountForm 
              onSubmit={handleAccountSubmit}
            />
          </div>
        ) : (
          <button
            onClick={() => setShowAccountForm(true)}
            className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
          >
            <Plus className="w-5 h-5" />
            Add Trading Account
          </button>
        )}

        {accounts.length > 0 && (
          <div ref={accountsListRef} className="mt-8 space-y-4">
            {accounts.map(account => (
              <AccountListItem
                key={account.id}
                account={account}
                onSelect={setSelectedAccount}
                onDelete={handleDeleteAccount}
              />
            ))}
          </div>
        )}
      </div>

      <CalculatorToggle onClick={() => setIsCalculatorOpen(true)} />
      <CalculatorModal 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />
    </div>
  );
};

export default Profile;