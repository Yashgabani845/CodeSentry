import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertCircle, Check, Plus, Save, Trash2, X } from 'lucide-react';

const CodingTestBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [testDetails, setTestDetails] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        // In a real app, you would fetch the test details
        // const response = await fetch(`http://localhost:8080/api/tests/${id}`);
        // const data = await response.json();
        // setTestDetails(data);
        
        // For demo purposes
        setTestDetails({
          id: id || 'demo-id',
          testName: 'JavaScript Coding Assessment',
          testType: 'CODING',
          description: 'This test evaluates a candidate\'s JavaScript programming skills.',
          duration: 90,
          totalMarks: 100,
          passingMarks: 60,
          createdBy: 'admin',
          createdAt: new Date().toISOString()
        });
        
        // Placeholder problem
        setProblems([
          createEmptyProblem(),
        ]);
      } catch (error) {
        console.error('Error fetching test data:', error);
        setError('Failed to load test details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTestData();
  }, [id]);

  const createEmptyProblem = () => ({
    id: `temp-${Date.now()}`,
    title: '',
    description: '',
    difficulty: 'MEDIUM',
    marks: 25,
    timeLimit: 30,
    memoryLimit: 256,
    testCases: [
      { input: '', expectedOutput: '', isHidden: false }
    ],
    sampleCode: {
      javascript: '// Your JavaScript solution here\n\nfunction solve(input) {\n  // Write your code here\n  \n  return result;\n}'
    }
  });

  const addProblem = () => {
    setProblems([...problems, createEmptyProblem()]);
  };

  const removeProblem = (index) => {
    if (problems.length <= 1) {
      setError('Test must have at least one problem');
      return;
    }
    
    const newProblems = [...problems];
    newProblems.splice(index, 1);
    setProblems(newProblems);
  };

  const updateProblem = (index, updatedProblem) => {
    const newProblems = [...problems];
    newProblems[index] = updatedProblem;
    setProblems(newProblems);
  };

  const handleSaveTest = async () => {
    // Validate all problems
    const invalidProblems = problems.filter(p => !p.title.trim() || !p.description.trim());
    
    if (invalidProblems.length > 0) {
      setError('Please fill in all required fields for each problem');
      return;
    }
    
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      // In a real app, you would save the problems to the backend
      // For demo purposes, we'll just simulate a successful save
      setTimeout(() => {
        setSuccess('All problems saved successfully!');
        setSaving(false);
      }, 1500);
    } catch (error) {
      console.error('Error saving problems:', error);
      setError('Failed to save problems. Please try again.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{testDetails.testName}</h1>
          <p className="text-gray-500">Build your coding test by adding problems</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/admin/tests')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSaveTest}
            disabled={saving}
            className={`px-6 py-2 bg-blue-600 text-white rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              saving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Test
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Test metadata */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="text-sm text-green-700 font-medium">Duration:</span>
            <span className="ml-2 text-green-900">{testDetails.duration} minutes</span>
          </div>
          <div>
            <span className="text-sm text-green-700 font-medium">Total Marks:</span>
            <span className="ml-2 text-green-900">{testDetails.totalMarks}</span>
          </div>
          <div>
            <span className="text-sm text-green-700 font-medium">Passing Marks:</span>
            <span className="ml-2 text-green-900">{testDetails.passingMarks}</span>
          </div>
        </div>
      </div>
      
      {/* Error and success messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>{error}</div>
          <button 
            className="ml-auto flex-shrink-0"
            onClick={() => setError('')}
          >
            <X className="w-5 h-5 text-red-500" />
          </button>
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-start">
          <Check className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>{success}</div>
          <button 
            className="ml-auto flex-shrink-0"
            onClick={() => setSuccess('')}
          >
            <X className="w-5 h-5 text-green-500" />
          </button>
        </div>
      )}
      
      {/* Problems */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Problems ({problems.length})</h2>
          <div className="text-sm text-gray-500">
            Total marks: {problems.reduce((sum, p) => sum + (parseInt(p.marks) || 0), 0)}
          </div>
        </div>
        
        {problems.map((problem, index) => (
          <div key={problem.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <div className="font-medium">Problem {index + 1}</div>
              <button 
                onClick={() => removeProblem(index)}
                className="p-1 rounded-full text-red-500 hover:bg-red-50"
                title="Remove Problem"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`title-${problem.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Problem Title *
                  </label>
                  <input
                    type="text"
                    id={`title-${problem.id}`}
                    value={problem.title}
                    onChange={(e) => updateProblem(index, { ...problem, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter problem title"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor={`difficulty-${problem.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    id={`difficulty-${problem.id}`}
                    value={problem.difficulty}
                    onChange={(e) => updateProblem(index, { ...problem, difficulty: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor={`description-${problem.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Problem Description *
                </label>
                <textarea
                  id={`description-${problem.id}`}
                  value={problem.description}
                  onChange={(e) => updateProblem(index, { ...problem, description: e.target.value })}
                  rows="4"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the problem in detail"
                  required
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor={`marks-${problem.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Marks *
                  </label>
                  <input
                    type="number"
                    id={`marks-${problem.id}`}
                    value={problem.marks}
                    onChange={(e) => updateProblem(index, { ...problem, marks: parseInt(e.target.value) || 0 })}
                    min="1"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor={`timeLimit-${problem.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Time Limit (seconds)
                  </label>
                  <input
                    type="number"
                    id={`timeLimit-${problem.id}`}
                    value={problem.timeLimit}
                    onChange={(e) => updateProblem(index, { ...problem, timeLimit: parseInt(e.target.value) || 0 })}
                    min="1"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor={`memoryLimit-${problem.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Memory Limit (MB)
                  </label>
                  <input
                    type="number"
                    id={`memoryLimit-${problem.id}`}
                    value={problem.memoryLimit}
                    onChange={(e) => updateProblem(index, { ...problem, memoryLimit: parseInt(e.target.value) || 0 })}
                    min="1"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Test Cases</h3>
                <div className="space-y-3 border border-gray-200 rounded-lg p-3">
                  {problem.testCases.map((testCase, tcIndex) => (
                    <div key={tcIndex} className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-3 border-b border-gray-100">
                      <div>
                        <label htmlFor={`input-${problem.id}-${tcIndex}`} className="block text-xs font-medium text-gray-600 mb-1">
                          Input
                        </label>
                        <textarea
                          id={`input-${problem.id}-${tcIndex}`}
                          value={testCase.input}
                          onChange={(e) => {
                            const newTestCases = [...problem.testCases];
                            newTestCases[tcIndex] = { ...testCase, input: e.target.value };
                            updateProblem(index, { ...problem, testCases: newTestCases });
                          }}
                          rows="2"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                          placeholder="Test case input"
                        ></textarea>
                      </div>
                      
                      <div>
                        <label htmlFor={`output-${problem.id}-${tcIndex}`} className="block text-xs font-medium text-gray-600 mb-1">
                          Expected Output
                        </label>
                        <textarea
                          id={`output-${problem.id}-${tcIndex}`}
                          value={testCase.expectedOutput}
                          onChange={(e) => {
                            const newTestCases = [...problem.testCases];
                            newTestCases[tcIndex] = { ...testCase, expectedOutput: e.target.value };
                            updateProblem(index, { ...problem, testCases: newTestCases });
                          }}
                          rows="2"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                          placeholder="Expected output"
                        ></textarea>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => {
                      const newTestCases = [...problem.testCases, { input: '', expectedOutput: '', isHidden: false }];
                      updateProblem(index, { ...problem, testCases: newTestCases });
                    }}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Test Case
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex justify-center">
          <button
            onClick={addProblem}
            className="flex items-center px-4 py-2 border border-blue-300 rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Problem
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodingTestBuilder;