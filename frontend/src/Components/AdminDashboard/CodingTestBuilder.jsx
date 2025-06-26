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

  const createEmptyQuestion = () => ({
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

  const [codingQuestions, setCodingQuestions] = useState([createEmptyQuestion()]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

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
    
    setCodingQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[activeQuestionIndex] = {
        ...updatedQuestions[activeQuestionIndex],
        [name]: value
      };
      return updatedQuestions;
    });
  };

  const handleAddQuestion = () => {
    setCodingQuestions(prevQuestions => [...prevQuestions, createEmptyQuestion()]);
    setActiveQuestionIndex(codingQuestions.length);
  };

  const handleRemoveQuestion = (indexToRemove) => {
    if (codingQuestions.length === 1) {
      setError('At least one question is required');
      return;
    }

    setCodingQuestions(prevQuestions => 
      prevQuestions.filter((_, index) => index !== indexToRemove)
    );

    // Adjust active index if needed
    if (activeQuestionIndex >= indexToRemove && activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };

  const validateQuestions = () => {
    for (let i = 0; i < codingQuestions.length; i++) {
      const question = codingQuestions[i];
      
      if (!question.title.trim()) {
        setError(`Question ${i + 1}: Title is required`);
        setActiveQuestionIndex(i);
        return false;
      }

      if (!question.description.trim()) {
        setError(`Question ${i + 1}: Description is required`);
        setActiveQuestionIndex(i);
        return false;
      }

      if (question.examples.some(ex => !ex.input.trim() || !ex.output.trim())) {
        setError(`Question ${i + 1}: All examples must have both input and output`);
        setActiveQuestionIndex(i);
        return false;
      }

      if (question.testCases.some(tc => !tc.input.trim() || !tc.output.trim())) {
        setError(`Question ${i + 1}: All test cases must have both input and output`);
        setActiveQuestionIndex(i);
        return false;
      }

      if (question.constraints.some(c => !c.trim())) {
        setError(`Question ${i + 1}: Constraints cannot be empty`);
        setActiveQuestionIndex(i);
        return false;
      }
    }

    return true;
  };

  const handleSave = async () => {
    // Validate all questions
    if (!validateQuestions()) {
      return;
    }

    setError('');
    setSaving(true);

    try {
      // Save all questions
      const savedQuestionIds = [];
      for (const question of codingQuestions) {
        const savedQuestion = await createCodingTest(question);
        savedQuestionIds.push(savedQuestion.id);
      }
      
      // Update the parent test with all coding test IDs
      await fetch(`http://localhost:8080/api/tests/${id}/update-questions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionIds: savedQuestionIds }),
      });

      setSuccess(`Successfully saved ${codingQuestions.length} coding question${codingQuestions.length > 1 ? 's' : ''}!`);
      
      // Navigate back to tests list after successful save
      setTimeout(() => {
        navigate('/admin/tests');
      }, 1500);
    } catch (err) {
      console.error('Error saving coding tests:', err);
      setError('Failed to save coding tests. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const activeQuestion = codingQuestions[activeQuestionIndex];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 mt-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create Coding Questions</h1>
          <p className="text-gray-500">Add coding questions to your test</p>
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
                Save Questions
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

      {/* Question navigation tabs */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="px-4 py-3 flex items-center space-x-1 overflow-x-auto">
            {codingQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setActiveQuestionIndex(index)}
                className={`px-4 py-2 rounded-t-lg flex items-center ${
                  activeQuestionIndex === index 
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500 font-medium' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>Question {index + 1}</span>
                {codingQuestions.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveQuestion(index);
                    }}
                    className="ml-2 p-1 rounded-full hover:bg-red-100 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </button>
            ))}
            <button
              onClick={handleAddQuestion}
              className="px-3 py-2 rounded-md flex items-center text-blue-600 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Question
            </button>
          </div>
        </div>

        {/* Main form */}
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
                value={activeQuestion.title}
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
                value={activeQuestion.description}
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
                value={activeQuestion.marks}
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
                  {activeQuestion.examples.length}
                </span>
              </div>
              <button className="p-1 text-gray-500">
                {expandedSections.examples ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            
            {expandedSections.examples && (
              <ExampleSection
                examples={activeQuestion.examples}
                onChange={(examples) => {
                  setCodingQuestions(prevQuestions => {
                    const updatedQuestions = [...prevQuestions];
                    updatedQuestions[activeQuestionIndex] = {
                      ...updatedQuestions[activeQuestionIndex],
                      examples
                    };
                    return updatedQuestions;
                  });
                }}
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
                  {activeQuestion.testCases.length}
                </span>
              </div>
              <button className="p-1 text-gray-500">
                {expandedSections.testCases ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            
            {expandedSections.testCases && (
              <TestCaseSection
                testCases={activeQuestion.testCases}
                onChange={(testCases) => {
                  setCodingQuestions(prevQuestions => {
                    const updatedQuestions = [...prevQuestions];
                    updatedQuestions[activeQuestionIndex] = {
                      ...updatedQuestions[activeQuestionIndex],
                      testCases
                    };
                    return updatedQuestions;
                  });
                }}
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
                  {activeQuestion.constraints.length}
                </span>
              </div>
              <button className="p-1 text-gray-500">
                {expandedSections.constraints ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
            
            {expandedSections.constraints && (
              <ConstraintsSection
                constraints={activeQuestion.constraints}
                onChange={(constraints) => {
                  setCodingQuestions(prevQuestions => {
                    const updatedQuestions = [...prevQuestions];
                    updatedQuestions[activeQuestionIndex] = {
                      ...updatedQuestions[activeQuestionIndex],
                      constraints
                    };
                    return updatedQuestions;
                  });
                }}
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
                  value={activeQuestion.solution}
                  onChange={(code) => {
                    setCodingQuestions(prevQuestions => {
                      const updatedQuestions = [...prevQuestions];
                      updatedQuestions[activeQuestionIndex] = {
                        ...updatedQuestions[activeQuestionIndex],
                        solution: code
                      };
                      return updatedQuestions;
                    });
                  }}
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