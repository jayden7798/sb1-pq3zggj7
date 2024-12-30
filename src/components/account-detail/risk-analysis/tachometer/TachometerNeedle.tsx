import React, { forwardRef } from 'react';

interface TachometerNeedleProps {
  rotation: number;
}

const TachometerNeedle = forwardRef<HTMLDivElement, TachometerNeedleProps>(
  ({ rotation }, ref) => {
    return (
      <div 
        ref={ref}
        className="absolute left-1/2 bottom-0 origin-bottom transition-transform duration-1000 ease-out"
        style={{ 
          transform: `rotate(${rotation}deg)`,
          transformOrigin: 'bottom center'
        }}
      >
        <div className="relative -translate-x-1/2">
          {/* Needle shadow */}
          <div className="absolute h-[80px] w-0.5 bg-black/10 blur-[1px] translate-x-[1px]" />
          
          {/* Needle */}
          <div className="h-[80px] w-0.5 bg-gray-900 rounded-t-full" />
          
          {/* Base outer ring */}
          <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-gray-200 rounded-full shadow-sm" />
          
          {/* Base inner circle */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-900 rounded-full shadow-inner" />
          
          {/* Glow effect */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full opacity-20 animate-pulse" />
        </div>
      </div>
    );
  }
);

TachometerNeedle.displayName = 'TachometerNeedle';

export default TachometerNeedle;