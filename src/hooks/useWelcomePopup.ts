import { useState, useEffect } from 'react';

export const useWelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setIsOpen(true);
      localStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    closePopup
  };
};