import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Save, Edit, Trash2, AlertCircle, X, Check } from 'lucide-react';

const EditAptitudeTest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [test, setTest] = useState(null);
  const [testQuestions, setTestQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingQuestions, setIsAddingQuestions] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [selectedNewQuestions, setSelectedNewQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const testResponse = await fetch(`http://localhost:8080/api/tests/${id}`);
        if (!testResponse.ok) throw new Error('Failed to fetch test data');
        const testData = await testResponse.json();
        setTest(testData);
        
        const questionsResponse = await fetch('http://localhost:8080/api/aptitude-questions/all');
        if (!questionsResponse.ok) throw new Error('Failed to fetch aptitude questions');
        const questionsData = await questionsResponse.json();
        setAllQuestions(questionsData);
        
        if (testData.questionIds && testData.questionIds.length > 0) {
          const testQuestionsData = questionsData.filter(q => 
            testData.questionIds.includes(q.id)
          );
          setTestQuestions(testQuestionsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const calculateTotalMarks = () => {
    return testQuestions.reduce((total, q) => total + q.marks, 0);
  };

  const handleRemoveQuestion = (questionId) => {
    setTestQuestions(testQuestions.filter(q => q.id !== questionId));
  };

  const getAvailableQuestions = () => {
    const testQuestionIds = testQuestions.map(q => q.id);
    return allQuestions.filter(q => !testQuestionIds.includes(q.id))
      .filter(q => 
        q.questionText.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  const toggleSelectNewQuestion = (questionId) => {
    if (selectedNewQuestions.includes(questionId)) {
      setSelectedNewQuestions(selectedNewQuestions.filter(id => id !== questionId));
    } else {
      setSelectedNewQuestions([...selectedNewQuestions, questionId]);
    }
  };

  const addSelectedQuestions = () => {
    const questionsToAdd = allQuestions.filter(q => selectedNewQuestions.includes(q.id));
    setTestQuestions([...testQuestions, ...questionsToAdd]);
    setSelectedNewQuestions([]);
    setIsAddingQuestions(false);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion({...question});
  };

  const handleUpdateQuestion = async (updatedQuestion) => {
    try {
      const response = await fetch(`http://localhost:8080/api/aptitude-questions/${updatedQuestion.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuestion),
      });

      if (!response.ok) throw new Error('Failed to update question');

      const updatedQuestionData = await response.json();
      setTestQuestions(testQuestions.map(q => 
        q.id === updatedQuestionData.id ? updatedQuestionData : q
      ));
      setEditingQuestion(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      setError('Failed to update question. Please try again.');
    }
  };

  const saveChanges = async () => {
    setIsSubmitting(true);
    setSaveSuccess(false);
    setError('');
    
    try {
      const questionIds = testQuestions.map(q => q.id);
      
      const response = await fetch(`http://localhost:8080/api/tests/${id}/update-questions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionIds }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update test questions');
      }
      
      const totalMarks = calculateTotalMarks();
      await fetch(`http://localhost:8080/api/tests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...test,
          totalMarks: totalMarks
        }),
      });
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving questions:', error);
      setError('Failed to save changes. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-700">Loading test data...</span>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        Test not found or failed to load
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Edit Aptitude Test: {test.testName}</h1>
          <p className="text-gray-600">Manage questions for this test</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate('/admin/tests')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tests
          </button>
          <button
            onClick={() => navigate(`/admin/tests/${id}/edit`)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Edit className="h-4 w-4 mr-2 inline-block" />
            Edit Basic Details
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
          <button 
            className="ml-auto"
            onClick={() => setError('')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      
      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-start">
          <Check className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>Changes saved successfully!</span>
          <button 
            className="ml-auto"
            onClick={() => setSaveSuccess(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Test Questions ({testQuestions.length})</h2>
            <p className="text-sm text-gray-600">
              Total marks: {calculateTotalMarks()} 
              {test.totalMarks && <span> (Required: {test.totalMarks})</span>}
            </p>
          </div>
          
          <div className="flex space-x-3">
            {!isAddingQuestions && (
              <button
                onClick={() => setIsAddingQuestions(true)}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Questions
              </button>
            )}
            
            <button
              onClick={saveChanges}
              disabled={isSubmitting}
              className={`inline-flex items-center px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
        
        {testQuestions.length > 0 ? (
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Marks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {testQuestions.map((question) => (
                  <tr key={question.id}>
                    <td className="px-6 py-4">
                      {editingQuestion?.id === question.id ? (
                        <div className="space-y-3">
                          <textarea
                            value={editingQuestion.questionText}
                            onChange={(e) => setEditingQuestion({
                              ...editingQuestion,
                              questionText: e.target.value
                            })}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                          />
                          <div className="space-y-2">
                            {editingQuestion.options.map((option, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...editingQuestion.options];
                                    newOptions[idx] = e.target.value;
                                    setEditingQuestion({
                                      ...editingQuestion,
                                      options: newOptions
                                    });
                                  }}
                                  className="flex-1 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                  type="radio"
                                  checked={editingQuestion.correctAnswer === option}
                                  onChange={() => setEditingQuestion({
                                    ...editingQuestion,
                                    correctAnswer: option
                                  })}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setEditingQuestion(null)}
                              className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleUpdateQuestion(editingQuestion)}
                              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="text-sm text-gray-900">{question.questionText}</div>
                          <div className="mt-1 text-xs text-gray-500">
                            {question.options.map((option, index) => (
                              <span key={index} className={`inline-block mr-4 ${question.correctAnswer === option ? 'text-green-600 font-medium' : ''}`}>
                                {String.fromCharCode(65 + index)}. {option}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {editingQuestion?.id === question.id ? (
                        <input
                          type="number"
                          value={editingQuestion.marks}
                          onChange={(e) => setEditingQuestion({
                            ...editingQuestion,
                            marks: parseInt(e.target.value)
                          })}
                          className="w-20 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="1"
                        />
                      ) : (
                        question.marks
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        {editingQuestion?.id !== question.id && (
                          <>
                            <button
                              onClick={() => handleEditQuestion(question)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Edit question"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleRemoveQuestion(question.id)}
                              className="text-red-600 hover:text-red-800"
                              title="Remove from test"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-gray-500">No questions added to this test yet.</p>
            <button
              onClick={() => setIsAddingQuestions(true)}
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Questions
            </button>
          </div>
        )}
        
        {isAddingQuestions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Add Questions to Test</h3>
                <button
                  onClick={() => {
                    setIsAddingQuestions(false);
                    setSelectedNewQuestions([]);
                    setSearchTerm('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search questions..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="overflow-y-auto flex-grow">
                {getAvailableQuestions().length > 0 ? (
                  <div className="border border-gray-200 rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Select</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Marks</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {getAvailableQuestions().map((question) => (
                          <tr 
                            key={question.id} 
                            className={selectedNewQuestions.includes(question.id) ? 'bg-blue-50' : ''}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedNewQuestions.includes(question.id)}
                                onChange={() => toggleSelectNewQuestion(question.id)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">{question.questionText}</div>
                              <div className="mt-1 text-xs text-gray-500">
                                {question.options.map((option, index) => (
                                  <span key={index} className={`inline-block mr-4 ${question.correctAnswer === option ? 'text-green-600 font-medium' : ''}`}>
                                    {String.fromCharCode(65 + index)}. {option}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{question.marks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-md">
                    <p className="text-gray-500">No matching questions found.</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setIsAddingQuestions(false);
                    setSelectedNewQuestions([]);
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={addSelectedQuestions}
                  disabled={selectedNewQuestions.length === 0}
                  className={`px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    selectedNewQuestions.length === 0 ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                  }`}
                >
                  Add {selectedNewQuestions.length} {selectedNewQuestions.length === 1 ? 'Question' : 'Questions'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditAptitudeTest;
