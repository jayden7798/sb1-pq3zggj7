import React from 'react';
import type { CalculationResults } from '../utils/types';

interface ResultsDisplayProps {
  results: CalculationResults;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Results</h2>
      <div className="grid gap-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Risk Amount:</span>
          <span className="font-medium text-gray-800">${results.riskAmount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Stop Loss Price:</span>
          <span className="font-medium text-gray-800">{results.stopLossPrice}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Pips at Risk:</span>
          <span className="font-medium text-gray-800">{results.pipsAtRisk}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Pip Value:</span>
          <span className="font-medium text-gray-800">${results.pipValue}/pip</span>
        </div>
        <div className="border-t pt-4 mt-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Position Sizes</h3>
          <div className="grid gap-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Standard Lots (1.00):</span>
              <span className="font-medium text-gray-800">{results.standardLots}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Mini Lots (0.10):</span>
              <span className="font-medium text-gray-800">{results.miniLots}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Micro Lots (0.01):</span>
              <span className="font-medium text-gray-800">{results.microLots}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Units:</span>
              <span className="font-medium text-gray-800">{results.units}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;