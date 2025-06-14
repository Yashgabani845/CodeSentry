import React, { useState } from 'react';
import { CheckCircle, XCircle, LayoutGrid, Table } from 'lucide-react';
const TestCaseResult = ({ result, idx, isDarkMode }) => {
  const [viewMode, setViewMode] = useState('grid');

  const getStatusColors = (passed) => {
    if (passed) {
      return {
        bg: isDarkMode ? 'bg-green-900/40' : 'bg-green-100',
        text: isDarkMode ? 'text-green-300' : 'text-green-700',
        border: isDarkMode ? 'border-green-800' : 'border-green-200',
        badgeBg: isDarkMode ? 'bg-green-800/60' : 'bg-green-200',
        badgeText: isDarkMode ? 'text-green-200' : 'text-green-800',
        icon: isDarkMode ? 'text-green-400' : 'text-green-600'
      };
    } else {
      return {
        bg: isDarkMode ? 'bg-red-900/40' : 'bg-red-100',
        text: isDarkMode ? 'text-red-300' : 'text-red-700',
        border: isDarkMode ? 'border-red-800' : 'border-red-200',
        badgeBg: isDarkMode ? 'bg-red-800/60' : 'bg-red-200',
        badgeText: isDarkMode ? 'text-red-200' : 'text-red-800',
        icon: isDarkMode ? 'text-red-400' : 'text-red-600'
      };
    }
  };

  const colors = getStatusColors(result.passed);
  const panelBg = isDarkMode ? 'bg-gray-850' : 'bg-gray-50';
  const codeBg = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  const labelColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';

  // 👇 Safely extract test case values
  const input = result.testCase?.input || result.input || '';
  const expectedOutput = result.testCase?.output || result.expectedOutput || '';
  const actualOutput = result.output || result.actualOutput || '';

  return (
    <div className={`border rounded-lg overflow-hidden mb-4 shadow-sm ${borderColor} ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`px-3 py-2 font-medium flex justify-between items-center ${colors.bg} ${colors.text}`}>
        <div className="flex items-center space-x-2">
          {result.passed ? 
            <CheckCircle size={16} className={`${colors.icon}`} /> : 
            <XCircle size={16} className={`${colors.icon}`} />}
          <span className="text-sm font-semibold">Test Case {idx + 1}</span>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.badgeBg} ${colors.badgeText}`}>
          {result.passed ? 'Passed' : 'Failed'}
        </span>
      </div>

      <div className={`${panelBg} grid grid-cols-3 gap-2 p-3`}>
        <div>
          <span className={`font-medium text-xs ${labelColor} block mb-1`}>Input:</span>
          <div className={`${codeBg} p-2 rounded-md ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono text-xs overflow-auto max-h-20`}>
            {input}
          </div>
        </div>

        <div>
          <span className={`font-medium text-xs ${labelColor} block mb-1`}>Expected Output:</span>
          <div className={`${codeBg} p-2 rounded-md ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-mono text-xs overflow-auto max-h-20`}>
            {expectedOutput}
          </div>
        </div>

        <div>
          <span className={`font-medium text-xs ${labelColor} block mb-1`}>Your Output:</span>
          <div className={`p-2 rounded-md font-mono text-xs overflow-auto max-h-20 ${colors.bg} ${colors.text} border ${colors.border}`}>
            {actualOutput}
          </div>
        </div>
      </div>
    </div>
  );
};




export default TestCaseResult;