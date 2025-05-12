import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertCircle, Check, ChevronDown, ChevronUp, Plus, Save, Trash2, X } from 'lucide-react';
import AptitudeQuestionCard from './AptitudeQuestionCard';

const AptitudeTestBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [testDetails, setTestDetails] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/tests/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch test details');
        }
        const data = await response.json();
        setTestDetails(data);
        
        // Fetch existing questions for this test if any
        const questionsResponse = await fetch(`http://localhost:8080/api/aptitude-questions/all`);
        if (questionsResponse.ok) {
          const existingQuestions = await questionsResponse.json();
          const testQuestions = existingQuestions.filter(q => q.testId === id);
          setQuestions(testQuestions.length > 0 ? testQuestions : [createEmptyQuestion()]);
        } else {
          setQuestions([createEmptyQuestion()]);
        }
      } catch (error) {
        console.error('Error fetching test data:', error);
        setError('Failed to load test details. Please try again later.');
        setQuestions([createEmptyQuestion()]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTestData();
  }, [id]);

  const createEmptyQuestion = () => ({
    id: `temp-${Date.now()}`,
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    marks: 5,
    explanation: '',
    testId: id
  });

  const addQuestion = () => {
    setQuestions([...questions, createEmptyQuestion()]);
  };

  const removeQuestion = (index) => {
    if (questions.length <= 1) {
      setError('Test must have at least one question');
      return;
    }
    
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const moveQuestionUp = (index) => {
    if (index === 0) return;
    const newQuestions = [...questions];
    [newQuestions[index], newQuestions[index - 1]] = [newQuestions[index - 1], newQuestions[index]];
    setQuestions(newQuestions);
  };

  const moveQuestionDown = (index) => {
    if (index === questions.length - 1) return;
    const newQuestions = [...questions];
    [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]];
    setQuestions(newQuestions);
  };

  const updateQuestion = (index, updatedQuestion) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  };

  const validateQuestions = () => {
    const errors = [];
    
    questions.forEach((q, index) => {
      if (!q.questionText.trim()) {
        errors.push(`Question ${index + 1}: Question text is required`);
      }
      if (q.options.some(opt => !opt.trim())) {
        errors.push(`Question ${index + 1}: All options must be filled`);
      }
      if (q.marks <= 0) {
        errors.push(`Question ${index + 1}: Marks must be greater than 0`);
      }
    });
    
    return errors;
  };

  const updateTestWithQuestionIds = async (questionIds) => {
  try {
    const response = await fetch(`http://localhost:8080/api/tests/${id}/update-questions`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questionIds }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update test with question IDs: ${await response.text()}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating test with question IDs:', error);
    throw error;
  }
};

  const handleSaveTest = async () => {
    const validationErrors = validateQuestions();
    if (validationErrors.length > 0) {
      setError(validationErrors.join('\n'));
      return;
    }
    
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      const savedQuestions = [];
      
      for (const question of questions) {
        const response = await fetch('http://localhost:8080/api/aptitude-questions/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...question,
            testId: id
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to save question: ${await response.text()}`);
        }
        
        const savedQuestion = await response.json();
        savedQuestions.push(savedQuestion);
      }
      // Update the test with question IDs
      const questionIds = savedQuestions.map(q => q.id);
      await updateTestWithQuestionIds(questionIds);
      setQuestions(savedQuestions);
      setSuccess('All questions saved successfully!');
      
      // Navigate back to tests list after successful save
      setTimeout(() => {
        navigate('/admin/tests');
      }, 2000);
    } catch (error) {
      console.error('Error saving questions:', error);
      setError('Failed to save questions. Please try again.');
    } finally {
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
    <div className="space-y-6 mt-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{testDetails?.testName || 'New Aptitude Test'}</h1>
          <p className="text-gray-500">Build your aptitude test by adding questions</p>
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
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
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
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="text-sm text-blue-700 font-medium">Duration:</span>
            <span className="ml-2 text-blue-900">{testDetails?.duration || 0} minutes</span>
          </div>
          <div>
            <span className="text-sm text-blue-700 font-medium">Total Marks:</span>
            <span className="ml-2 text-blue-900">{testDetails?.totalMarks || 0}</span>
          </div>
          <div>
            <span className="text-sm text-blue-700 font-medium">Passing Marks:</span>
            <span className="ml-2 text-blue-900">{testDetails?.passingMarks || 0}</span>
          </div>
        </div>
      </div>
      
      {/* Error and success messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
          <div className="whitespace-pre-line">{error}</div>
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
      
      {/* Questions */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Questions ({questions.length})</h2>
          <div className="text-sm text-gray-500">
            Total marks: {questions.reduce((sum, q) => sum + (parseInt(q.marks) || 0), 0)}
          </div>
        </div>
        
        {questions.map((question, index) => (
          <div key={question.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <div className="font-medium">Question {index + 1}</div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => moveQuestionUp(index)}
                  disabled={index === 0}
                  className={`p-1 rounded-full ${
                    index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-200'
                  }`}
                  title="Move Up"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => moveQuestionDown(index)}
                  disabled={index === questions.length - 1}
                  className={`p-1 rounded-full ${
                    index === questions.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-200'
                  }`}
                  title="Move Down"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => removeQuestion(index)}
                  className="p-1 rounded-full text-red-500 hover:bg-red-50"
                  title="Remove Question"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <AptitudeQuestionCard 
              question={question}
              onChange={(updatedQuestion) => updateQuestion(index, updatedQuestion)}
            />
          </div>
        ))}
        
        <div className="flex justify-center">
          <button
            onClick={addQuestion}
            className="flex items-center px-4 py-2 border border-blue-300 rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default AptitudeTestBuilder;