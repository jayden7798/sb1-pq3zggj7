import React from 'react';
import type { ZoneThresholds } from '../../../../types/risk';

interface TachometerLabelsProps {
  thresholds: ZoneThresholds;
}

const TachometerLabels: React.FC<TachometerLabelsProps> = ({ thresholds }) => {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 200 100" className="w-full h-full">
        {/* Zone Labels with connecting lines */}
        <g>
          {/* Risk Zone Label */}
          <line 
            x1="40" 
            y1="85" 
            x2="60" 
            y2="90" 
            className="stroke-gray-300 stroke-[0.5]"
            strokeDasharray="2 2"
          />
          <g className="text-[8px]">
            <text x="40" y="83" className="fill-red-600 font-semibold">
              Risk Zone
            </text>
            <text x="40" y="90" className="fill-gray-500 text-[6px]">
              Below {thresholds.redZone}%
            </text>
          </g>

          {/* Break-even Zone Label */}
          <line 
            x1="100" 
            y1="40" 
            x2="100" 
            y2="50" 
            className="stroke-gray-300 stroke-[0.5]"
            strokeDasharray="2 2"
          />
          <g className="text-[8px]">
            <text x="100" y="38" className="fill-orange-600 font-semibold" textAnchor="middle">
              Break-even Zone
            </text>
          </g>

          {/* Profit Zone Label */}
          <line 
            x1="160" 
            y1="85" 
            x2="140" 
            y2="90" 
            className="stroke-gray-300 stroke-[0.5]"
            strokeDasharray="2 2"
          />
          <g className="text-[8px]">
            <text x="160" y="83" className="fill-green-600 font-semibold" textAnchor="end">
              Profit Zone
            </text>
            <text x="160" y="90" className="fill-gray-500 text-[6px]" textAnchor="end">
              Above {thresholds.greenZone}%
            </text>
          </g>
        </g>

        {/* Tick marks and values */}
        <g className="text-[7px] fill-gray-500 font-medium">
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
      </svg>
    </div>
  );
};

export default TachometerLabels;