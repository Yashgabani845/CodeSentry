import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader, AlertCircle, FileText, CheckCircle, Code, ArrowRight, Info, List } from 'lucide-react';

const TestDetails = () => {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [codingTest, setCodingTest] = useState(null);
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
          await fetchCodingTestDetails(testData);
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

  const fetchCodingTestDetails = async (testData) => {
    if (!testData.questionIds || !Array.isArray(testData.questionIds) || testData.questionIds.length === 0) {
      throw new Error('No coding test questions found in test data');
    }

    // For coding tests, we'll fetch the first question ID as it represents the coding test
    const codingTestId = testData.questionIds[0];
    const codingTestResponse = await fetch(`http://localhost:8080/api/coding-tests/${codingTestId}`);
    
    if (!codingTestResponse.ok) {
      const errorText = await codingTestResponse.text();
      console.error(`Coding Test API Error Response:`, errorText);
      throw new Error(`Failed to fetch coding test details: ${errorText}`);
    }

    const codingTestData = await codingTestResponse.json();
    console.log('Coding Test Data:', codingTestData);
    setCodingTest(codingTestData);
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
          </div>
        </div>

        {/* Render based on test type */}
        {test.testType.toLowerCase() === 'aptitude' ? (
          <AptitudeTestContent questions={questions} />
        ) : (
          <CodingTestContent codingTest={codingTest} />
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

const CodingTestContent = ({ codingTest }) => {
  const [activeExampleIndex, setActiveExampleIndex] = useState(0);
  
  if (!codingTest) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
        No coding test data found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Problem Description */}
      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
        <div className="flex items-center mb-4">
          <Code className="w-6 h-6 text-purple-600 mr-2" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Problem Description</h2>
        </div>
        <div className="prose max-w-none text-gray-700 whitespace-pre-line">
          {codingTest.description}
        </div>
      </div>

      {/* Marks */}
      <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Info className="w-5 h-5 text-blue-600 mr-2" />
          <span className="font-medium text-gray-700">Marks:</span>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {codingTest.marks} {codingTest.marks === 1 ? 'mark' : 'marks'}
        </span>
      </div>

      {/* Examples */}
      {codingTest.examples && codingTest.examples.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Examples</h2>
          </div>
          
          {/* Example Navigation */}
          {codingTest.examples.length > 1 && (
            <div className="flex mb-4 border-b border-gray-200">
              {codingTest.examples.map((example, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
                    activeExampleIndex === index
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  onClick={() => setActiveExampleIndex(index)}
                >
                  Example {index + 1}
                </button>
              ))}
            </div>
          )}
          
          {/* Active Example */}
          <div className="bg-gray-50 rounded-md p-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Input:</h3>
              <pre className="bg-gray-100 p-3 rounded border text-gray-800 overflow-x-auto">
                {codingTest.examples[activeExampleIndex]?.input || 'No input provided'}
              </pre>
            </div>
            <div className="flex items-center justify-center my-2 text-gray-400">
              <ArrowRight className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">Output:</h3>
              <pre className="bg-gray-100 p-3 rounded border text-gray-800 overflow-x-auto">
                {codingTest.examples[activeExampleIndex]?.output || 'No output provided'}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Constraints */}
      {codingTest.constraints && codingTest.constraints.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-600">
          <div className="flex items-center mb-4">
            <List className="w-6 h-6 text-yellow-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Constraints</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {codingTest.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestDetails;