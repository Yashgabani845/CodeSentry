import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader, AlertCircle, FileText, CheckCircle } from 'lucide-react';

const TestDetails = () => {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
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
                {test.testType === 'aptitude' ? 'Aptitude Test' : 'Coding Test'}
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
            <div className="flex items-center md:col-span-2">
              <FileText className="w-5 h-5 mr-2 text-gray-500" />
              <span className="font-medium">Total Questions:</span>
              <span className="ml-2">{questions.length}</span>
            </div>
          </div>
        </div>

        {/* Questions Section */}
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
      </div>
    </div>
  );
};

export default TestDetails;