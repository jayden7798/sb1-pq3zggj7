import React from 'react';

const TachometerDial: React.FC = () => {
  return (
    <div className="absolute inset-0">
      <svg
        viewBox="0 0 200 100"
        className="w-full h-full"
      >
        {/* Tick marks */}
        <g className="text-[6px] fill-gray-400">
          {[-40, -30, -20, -10, 0, 10].map((value) => {
            const angle = (value / 60) * Math.PI;
            const x = 100 + 80 * Math.cos(angle);
            const y = 90 - 80 * Math.sin(angle);
            return (
              <text
                key={value}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {value}%
              </text>
            );
          })}
        </g>

        {/* Red Zone (-50% to -2.1%) */}
        <path
          d="M 20 90 A 80 80 0 0 1 100 10"
          fill="none"
          stroke="url(#redGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          className="filter drop-shadow-sm"
        />
        
        {/* Orange Zone (-2% to +2%) */}
        <path
          d="M 100 10 A 80 80 0 0 1 140 20"
          fill="none"
          stroke="url(#orangeGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          className="filter drop-shadow-sm"
        />
        
        {/* Green Zone (+2% and above) */}
        <path
          d="M 140 20 A 80 80 0 0 1 180 90"
          fill="none"
          stroke="url(#greenGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          className="filter drop-shadow-sm"
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f87171" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default TachometerDial;