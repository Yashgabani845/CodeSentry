import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const TestCaseSection = ({ testCases, onChange }) => {
  const addTestCase = () => {
    onChange([...testCases, { input: '', output: '' }]);
  };

  const removeTestCase = (index) => {
    if (testCases.length <= 1) {
      return; // Keep at least one test case
    }
    const newTestCases = [...testCases];
    newTestCases.splice(index, 1);
    onChange(newTestCases);
  };

  const updateTestCase = (index, field, value) => {
    const newTestCases = [...testCases];
    newTestCases[index] = { ...newTestCases[index], [field]: value };
    onChange(newTestCases);
  };

  return (
    <div className="p-4 space-y-4">
      <p className="text-sm text-gray-600">
        Test cases are used to evaluate the user's solution. Add input/output pairs that will be used to test the code.
      </p>
      
      <div className="space-y-4">
        {testCases.map((testCase, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-700">Test Case {index + 1}</h3>
              <button
                onClick={() => removeTestCase(index)}
                className="p-1 rounded-full text-red-500 hover:bg-red-50"
                title="Remove Test Case"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`test-input-${index}`} className="block text-xs font-medium text-gray-600 mb-1">
                  Input
                </label>
                <textarea
                  id={`test-input-${index}`}
                  value={testCase.input}
                  onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                  rows="3"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  placeholder="Test case input"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor={`test-output-${index}`} className="block text-xs font-medium text-gray-600 mb-1">
                  Output
                </label>
                <textarea
                  id={`test-output-${index}`}
                  value={testCase.output}
                  onChange={(e) => updateTestCase(index, 'output', e.target.value)}
                  rows="3"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  placeholder="Expected output"
                ></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button
        type="button"
        onClick={addTestCase}
        className="flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add Test Case
      </button>
    </div>
  );
};

export default TestCaseSection;