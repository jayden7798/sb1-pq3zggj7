import React from 'react';
import Hero from '../components/landing/Hero';
import PainPoint from '../components/landing/PainPoint';
import Features from '../components/landing/Features';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <PainPoint />
      <Features />
    </div>
  );
};

export default Landing;