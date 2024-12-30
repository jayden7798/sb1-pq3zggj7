import React, { useEffect, useState } from 'react';

interface AnimateValueProps {
  value: number;
  currency: string;
  className?: string;
}

export const AnimateValue: React.FC<AnimateValueProps> = ({
  value,
  currency,
  className = ''
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <span className={`${className} ${isAnimating ? 'animate-pulse text-blue-600' : ''}`}>
      {currency} {value.toLocaleString()}
    </span>
  );
};