import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader, AlertCircle, FileText, CheckCircle, Code, ArrowRight, Info, List, ChevronDown, ChevronUp } from 'lucide-react';

const TestDetails = () => {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [codingQuestions, setCodingQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch test details with error response logging
        const testResponse = await fetch(`http://localhost:8080/api/tests/${id}`);
        console.log('Test Response:', testResponse);
        
        if (!testResponse.ok) {
          const errorText = await testResponse.text();
          console.error('Test API Error Response:', errorText);
          throw new Error(`Failed to fetch test details: ${errorText}`);
        }

        const testData = await testResponse.json();
        console.log('Test Data:', testData);
        setTest(testData);

        // Convert test type to lowercase for case-insensitive comparison
        const testType = testData.testType.toLowerCase();

        // Handle different test types
        if (testType === 'aptitude') {
          await fetchAptitudeQuestions(testData);
        } else if (testType === 'coding') {
          await fetchCodingTestQuestions(testData);
        } else {
          throw new Error(`Unknown test type: ${testData.testType}`);
        }
      } catch (err) {
        console.error('Detailed error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTestDetails();
    }
  }, [id]);

  const fetchAptitudeQuestions = async (testData) => {
    if (!testData.questionIds || !Array.isArray(testData.questionIds)) {
      throw new Error('Invalid question IDs received from server');
    }

    // Fetch questions for the test with error response logging
    const questionPromises = testData.questionIds.map(async (questionId) => {
      const questionResponse = await fetch(`http://localhost:8080/api/aptitude-questions/${questionId}`);
      
      if (!questionResponse.ok) {
        const errorText = await questionResponse.text();
        console.error(`Question API Error Response for ID ${questionId}:`, errorText);
        throw new Error(`Failed to fetch question ${questionId}: ${errorText}`);
      }

      return questionResponse.json();
    });

    const questionData = await Promise.all(questionPromises);
    console.log('Questions Data:', questionData);
    setQuestions(questionData);
  };

  const fetchCodingTestQuestions = async (testData) => {
    if (!testData.questionIds || !Array.isArray(testData.questionIds) || testData.questionIds.length === 0) {
      throw new Error('No coding test questions found in test data');
    }

    // Fetch all coding questions
    const codingTestPromises = testData.questionIds.map(async (questionId) => {
      const codingTestResponse = await fetch(`http://localhost:8080/api/coding-tests/${questionId}`);
      
      if (!codingTestResponse.ok) {
        const errorText = await codingTestResponse.text();
        console.error(`Coding Test API Error Response for ID ${questionId}:`, errorText);
        throw new Error(`Failed to fetch coding test details for question ${questionId}: ${errorText}`);
      }

      return codingTestResponse.json();
    });

    const codingTestData = await Promise.all(codingTestPromises);
    console.log('Coding Test Questions Data:', codingTestData);
    setCodingQuestions(codingTestData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-lg text-gray-700">Loading test details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <AlertCircle className="w-12 h-12 text-red-600 mb-4" />
        <p className="text-lg text-gray-700 mb-2">Error loading test details</p>
        <p className="text-md text-red-500">{error}</p>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <AlertCircle className="w-12 h-12 text-yellow-600 mb-4" />
        <p className="text-lg text-gray-700">Test not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Test Header Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-600 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{test.testName}</h1>
            <div className="mt-2 md:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {test.testType.toLowerCase() === 'aptitude' ? 'Aptitude Test' : 'Coding Test'}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <div className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-medium">Created by:</span>
              <span className="ml-2">{test.createdBy}</span>
            </div>
            <div className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-medium">Created at:</span>
              <span className="ml-2">
                {test.createdAt ? new Date(test.createdAt).toLocaleString() : 'N/A'}
              </span>
            </div>
            {test.testType.toLowerCase() === 'aptitude' && (
              <div className="flex items-center md:col-span-2">
                <FileText className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-medium">Total Questions:</span>
                <span className="ml-2">{questions.length}</span>
              </div>
            )}
            {test.testType.toLowerCase() === 'coding' && (
              <div className="flex items-center md:col-span-2">
                <FileText className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-medium">Total Coding Questions:</span>
                <span className="ml-2">{codingQuestions.length}</span>
              </div>
            )}
          </div>
        </div>

        {/* Render based on test type */}
        {test.testType.toLowerCase() === 'aptitude' ? (
          <AptitudeTestContent questions={questions} />
        ) : (
          <CodingTestContent codingQuestions={codingQuestions} />
        )}
      </div>
    </div>
  );
};

const AptitudeTestContent = ({ questions }) => {
  return (
    <>
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Questions</h2>
      
      {questions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
          No questions found for this test.
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div 
              key={question.id} 
              className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-indigo-500 transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Question {index + 1}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {question.marks} {question.marks === 1 ? 'mark' : 'marks'}
                </span>
              </div>
              
              <p className="text-gray-700 mb-4 whitespace-pre-line">{question.questionText}</p>
              
              {/* Options */}
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-600">Options:</p>
                <ul className="mt-2 space-y-2">
                  {question.options.map((option, optIndex) => {
                    const isCorrect = option === question.correctAnswer;
                    return (
                      <li 
                        key={optIndex} 
                        className={`flex items-center p-3 rounded-md ${
                          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <span className="w-6 h-6 flex items-center justify-center rounded-full border mr-3 text-sm">
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span className={`flex-1 ${isCorrect ? 'font-medium text-green-700' : 'text-gray-700'}`}>
                          {option}
                        </span>
                        {isCorrect && (
                          <CheckCircle className="w-5 h-5 text-green-600 ml-2" />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const CodingTestContent = ({ codingQuestions }) => {
  // State to track expanded/collapsed state for each question
  const [expandedQuestions, setExpandedQuestions] = useState({});
  // State to track active example for each question
  const [activeExampleIndices, setActiveExampleIndices] = useState({});
  
  useEffect(() => {
    // Initialize with all questions expanded and first example active for each
    const initialExpandedState = {};
    const initialActiveExamples = {};
    
    codingQuestions.forEach((_, index) => {
      initialExpandedState[index] = true;
      initialActiveExamples[index] = 0;
    });
    
    setExpandedQuestions(initialExpandedState);
    setActiveExampleIndices(initialActiveExamples);
  }, [codingQuestions]);
  
  const toggleQuestionExpanded = (index) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  const setActiveExampleForQuestion = (questionIndex, exampleIndex) => {
    setActiveExampleIndices(prev => ({
      ...prev,
      [questionIndex]: exampleIndex
    }));
  };
  
  if (codingQuestions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
        No coding questions found for this test.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Coding Questions</h2>
      
      {codingQuestions.map((codingQuestion, questionIndex) => (
        <div 
          key={codingQuestion.id || questionIndex} 
          className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
        >
          {/* Question Header - Always visible */}
          <div 
            className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center cursor-pointer"
            onClick={() => toggleQuestionExpanded(questionIndex)}
          >
            <div className="flex items-center">
              <Code className="w-5 h-5 text-purple-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">
                Question {questionIndex + 1}: {codingQuestion.title}
              </h3>
            </div>
            <div className="flex items-center">
              <span className="mr-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {codingQuestion.marks} {codingQuestion.marks === 1 ? 'mark' : 'marks'}
              </span>
              {expandedQuestions[questionIndex] ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
          </div>
          
          {/* Question Details - Expandable */}
          {expandedQuestions[questionIndex] && (
            <div className="p-6 space-y-6">
              {/* Problem Description */}
              <div className="border-l-4 border-purple-600 pl-4">
                <h4 className="text-md font-medium text-gray-800 mb-2">Problem Description</h4>
                <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                  {codingQuestion.description}
                </div>
              </div>
              
              {/* Examples */}
              {codingQuestion.examples && codingQuestion.examples.length > 0 && (
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="text-md font-medium text-gray-800 mb-2">Examples</h4>
                  
                  {/* Example Navigation */}
                  {codingQuestion.examples.length > 1 && (
                    <div className="flex mb-4 border-b border-gray-200">
                      {codingQuestion.examples.map((_, exampleIndex) => (
                        <button
                          key={exampleIndex}
                          className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
                            activeExampleIndices[questionIndex] === exampleIndex
                              ? 'text-blue-600 border-b-2 border-blue-600'
                              : 'text-gray-600 hover:text-blue-600'
                          }`}
                          onClick={() => setActiveExampleForQuestion(questionIndex, exampleIndex)}
                        >
                          Example {exampleIndex + 1}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* Active Example */}
                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-600 mb-2">Input:</h5>
                      <pre className="bg-gray-100 p-3 rounded border text-gray-800 overflow-x-auto">
                        {codingQuestion.examples[activeExampleIndices[questionIndex] || 0]?.input || 'No input provided'}
                      </pre>
                    </div>
                    <div className="flex items-center justify-center my-2 text-gray-400">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 mb-2">Output:</h5>
                      <pre className="bg-gray-100 p-3 rounded border text-gray-800 overflow-x-auto">
                        {codingQuestion.examples[activeExampleIndices[questionIndex] || 0]?.output || 'No output provided'}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* Constraints */}
              {codingQuestion.constraints && codingQuestion.constraints.length > 0 && (
                <div className="border-l-4 border-yellow-600 pl-4">
                  <h4 className="text-md font-medium text-gray-800 mb-2">Constraints</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {codingQuestion.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TestDetails;