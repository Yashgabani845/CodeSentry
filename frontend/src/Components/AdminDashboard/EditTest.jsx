import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, Code } from 'lucide-react';

const EditTest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    testName: '',
    testType: 'APTITUDE',
    description: '',
    duration: 60,
    totalMarks: 100,
    passingMarks: 40,
    createdBy: 'admin',
    questionIds: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch existing test data
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/tests/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch test data');
        }
        
        const testData = await response.json();
        
        setFormData({
          testName: testData.testName || '',
          testType: testData.testType || 'APTITUDE',
          description: testData.description || '',
          duration: calculateDuration(testData.startTime, testData.endTime) || 60,
          totalMarks: testData.totalMarks || 100,
          passingMarks: Math.floor(testData.totalMarks * 0.4) || 40, // Default to 40% if not specified
          createdBy: testData.createdBy || 'admin',
          questionIds: testData.questionIds || []
        });
      } catch (error) {
        console.error('Error fetching test data:', error);
        setError('Failed to load test. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTestData();
  }, [id]);

  // Helper function to calculate duration from start and end times
  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return 60;
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    // Calculate difference in minutes
    return Math.round((end - start) / (1000 * 60));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Calculate start and end times based on duration
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + formData.duration * 60000);
    
    const updateData = {
      ...formData,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString()
    };
    
    try {
      // Update the test details
      const response = await fetch(`http://localhost:8080/api/tests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update test');
      }
      
      const updatedTest = await response.json();
      
      // Redirect to appropriate editor based on test type
      if (formData.testType === 'APTITUDE') {
        navigate(`/admin/aptitude-test/edit/${id}`);
      } else {
        navigate(`/admin/coding-test/edit/${id}`);
      }
    } catch (error) {
      console.error('Error updating test:', error);
      setError('Failed to update test. Please try again later.');
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Edit Test</h1>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="testName" className="block text-sm font-medium text-gray-700 mb-1">
                Test Name *
              </label>
              <input 
                type="text"
                id="testName"
                name="testName"
                value={formData.testName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter test name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Type *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label 
                  className={`cursor-pointer flex flex-col items-center border rounded-lg p-4 ${
                    formData.testType === 'APTITUDE' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input 
                    type="radio"
                    name="testType"
                    value="APTITUDE"
                    checked={formData.testType === 'APTITUDE'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <BookOpen className={`w-6 h-6 mb-2 ${formData.testType === 'APTITUDE' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span>Aptitude Test</span>
                </label>
                
                <label 
                  className={`cursor-pointer flex flex-col items-center border rounded-lg p-4 ${
                    formData.testType === 'CODING' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input 
                    type="radio"
                    name="testType"
                    value="CODING"
                    checked={formData.testType === 'CODING'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <Code className={`w-6 h-6 mb-2 ${formData.testType === 'CODING' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span>Coding Test</span>
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea 
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe the purpose and content of this test"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes) *
              </label>
              <input 
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                min="1"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="totalMarks" className="block text-sm font-medium text-gray-700 mb-1">
                Total Marks *
              </label>
              <input 
                type="number"
                id="totalMarks"
                name="totalMarks"
                value={formData.totalMarks}
                onChange={handleChange}
                required
                min="1"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="passingMarks" className="block text-sm font-medium text-gray-700 mb-1">
                Passing Marks *
              </label>
              <input 
                type="number"
                id="passingMarks"
                name="passingMarks"
                value={formData.passingMarks}
                onChange={handleChange}
                required
                min="1"
                max={formData.totalMarks}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {formData.testType === 'APTITUDE' && (
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Aptitude Questions</h3>
              <p className="text-sm text-blue-700">
                You have {formData.questionIds?.length || 0} questions added to this test.
                You can edit the questions after saving the basic test details.
              </p>
            </div>
          )}
          
          {formData.testType === 'CODING' && (
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Coding Problems</h3>
              <p className="text-sm text-blue-700">
                You have {formData.questionIds?.length || 0} coding problems added to this test.
                You can edit the problems after saving the basic test details.
              </p>
            </div>
          )}
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/tests')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating Test...
                </span>
              ) : (
                'Update Test'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTest;