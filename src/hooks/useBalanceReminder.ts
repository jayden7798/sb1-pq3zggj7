import { useState, useEffect } from 'react';

export const useBalanceReminder = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show reminder after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    // Auto-hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsOpen(false);
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const closeReminder = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    closeReminder
  };
};