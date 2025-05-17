import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertCircle, Check, Plus, Save, Trash2, X, ChevronDown, ChevronUp, Code } from 'lucide-react';
import ExampleSection from './ExampleSection';
import TestCaseSection from './TestCaseSection';
import ConstraintsSection from './ConstraintsSection';
import CodeEditor from './CodeEditor';
import { createCodingTest } from '../../Services/CodingTestService';

const CodingTestBuilder = () => {
  const { id } = useParams(); // This is the parent test ID
  const navigate = useNavigate();

  const [codingTest, setCodingTest] = useState({
    title: '',
    description: '',
    examples: [{ input: '', output: '' }],
    testCases: [{ input: '', output: '' }],
    constraints: [''],
    marks: 25,
    solution: '// Your JavaScript solution here\n\nfunction solve(input) {\n  // Write your code here\n  \n  return result;\n}',
    createdBy: 'admin',
    testId: id // Store the parent test ID
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    examples: true,
    testCases: true,
    constraints: true,
    solution: true
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCodingTest({
      ...codingTest,
      [name]: value
    });
  };

  const handleSave = async () => {
    // Validate
    if (!codingTest.title.trim()) {
      setError('Title is required');
      return;
    }

    if (!codingTest.description.trim()) {
      setError('Description is required');
      return;
    }

    if (codingTest.examples.some(ex => !ex.input.trim() || !ex.output.trim())) {
      setError('All examples must have both input and output');
      return;
    }

    if (codingTest.testCases.some(tc => !tc.input.trim() || !tc.output.trim())) {
      setError('All test cases must have both input and output');
      return;
    }

    if (codingTest.constraints.some(c => !c.trim())) {
      setError('Constraints cannot be empty');
      return;
    }

    setError('');
    setSaving(true);

    try {
      const savedTest = await createCodingTest(codingTest);
      setSuccess('Coding test created successfully!');
      
      // Update the parent test with the coding test ID
      await fetch(`http://localhost:8080/api/tests/${id}/update-questions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionIds: [savedTest.id] }),
      });

      // Navigate back to tests list after successful save
      setTimeout(() => {
        navigate('/admin/tests');
      }, 1500);
    } catch (err) {
      console.error('Error saving coding test:', err);
      setError('Failed to save coding test. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 mt-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create Coding Question</h1>
          <p className="text-gray-500">Add a new coding question to your test</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/admin/tests')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-6 py-2 bg-blue-600 text-white rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              saving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {saving ? (
              <>
                <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Question
              </>
            )}
          </button>
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
      
      {/* Main form */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Basic details */}
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={codingTest.title}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter question title"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={codingTest.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe the coding problem in detail"
                required
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="marks" className="block text-sm font-medium text-gray-700 mb-1">
                Marks *
              </label>
              <input
                type="number"
                id="marks"
                name="marks"
                value={codingTest.marks}
                onChange={handleInputChange}
                min="1"
                className="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          
          {/* Examples section */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('examples')}
            >
              <div className="font-medium flex items-center">
                <span className="mr-2">Examples</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  {codingTest.examples.length}
                </span>
              </div>
              <button className="p-1 text-gray-500">
                {expandedSections.examples ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            
            {expandedSections.examples && (
              <ExampleSection
                examples={codingTest.examples}
                onChange={(examples) => setCodingTest({ ...codingTest, examples })}
              />
            )}
          </div>
          
          {/* Test Cases section */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('testCases')}
            >
              <div className="font-medium flex items-center">
                <span className="mr-2">Test Cases</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  {codingTest.testCases.length}
                </span>
              </div>
              <button className="p-1 text-gray-500">
                {expandedSections.testCases ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            
            {expandedSections.testCases && (
              <TestCaseSection
                testCases={codingTest.testCases}
                onChange={(testCases) => setCodingTest({ ...codingTest, testCases })}
              />
            )}
          </div>
          
          {/* Constraints section */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('constraints')}
            >
              <div className="font-medium flex items-center">
                <span className="mr-2">Constraints</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  {codingTest.constraints.length}
                </span>
              </div>
              <button className="p-1 text-gray-500">
                {expandedSections.constraints ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            
            {expandedSections.constraints && (
              <ConstraintsSection
                constraints={codingTest.constraints}
                onChange={(constraints) => setCodingTest({ ...codingTest, constraints })}
              />
            )}
          </div>
          
          {/* Solution section */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('solution')}
            >
              <div className="font-medium flex items-center">
                <Code className="w-4 h-4 mr-1" />
                <span>Solution Code</span>
              </div>
              <button className="p-1 text-gray-500">
                {expandedSections.solution ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            
            {expandedSections.solution && (
              <div className="p-4">
                <CodeEditor
                  value={codingTest.solution}
                  onChange={(code) => setCodingTest({ ...codingTest, solution: code })}
                  language="javascript"
                  height="250px"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Provide a model solution for this coding problem.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingTestBuilder;