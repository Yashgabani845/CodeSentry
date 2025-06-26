import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Save, Edit, Trash2, AlertCircle, Code, X, Check, ChevronDown, ChevronUp } from 'lucide-react';

const EditCodingTest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [test, setTest] = useState(null);
  const [testProblems, setTestProblems] = useState([]);
  const [allProblems, setAllProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingProblems, setIsAddingProblems] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [selectedNewProblems, setSelectedNewProblems] = useState([]);
  const [editingProblem, setEditingProblem] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    examples: true,
    testCases: true,
    constraints: true,
    solution: true
  });

  // Fetch test data and problems
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch test details
        const testResponse = await fetch(`http://localhost:8080/api/tests/${id}`);
        if (!testResponse.ok) throw new Error('Failed to fetch test data');
        const testData = await testResponse.json();
        setTest(testData);
        
        // Fetch all coding problems
        const problemsResponse = await fetch('http://localhost:8080/api/coding-tests');
        if (!problemsResponse.ok) throw new Error('Failed to fetch coding problems');
        const problemsData = await problemsResponse.json();
        setAllProblems(problemsData);
        
        // Filter problems that are part of this test
        if (testData.questionIds && testData.questionIds.length > 0) {
          const testProblemsData = problemsData.filter(p => 
            testData.questionIds.includes(p.id)
          );
          setTestProblems(testProblemsData);
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

  // Calculate total marks
  const calculateTotalMarks = () => {
    return testProblems.reduce((total, p) => total + p.marks, 0);
  };

  // Handle removing a problem from the test
  const handleRemoveProblem = (problemId) => {
    setTestProblems(testProblems.filter(p => p.id !== problemId));
  };

  // Filter available problems that aren't already in the test
  const getAvailableProblems = () => {
    const testProblemIds = testProblems.map(p => p.id);
    return allProblems.filter(p => !testProblemIds.includes(p.id))
      .filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  // Toggle selection of a new problem to add
  const toggleSelectNewProblem = (problemId) => {
    if (selectedNewProblems.includes(problemId)) {
      setSelectedNewProblems(selectedNewProblems.filter(id => id !== problemId));
    } else {
      setSelectedNewProblems([...selectedNewProblems, problemId]);
    }
  };

  // Add selected problems to the test
  const addSelectedProblems = () => {
    const problemsToAdd = allProblems.filter(p => selectedNewProblems.includes(p.id));
    setTestProblems([...testProblems, ...problemsToAdd]);
    console.log("TestProblems: " + testProblems.map(p => p.id));
    setSelectedNewProblems([]);
    setIsAddingProblems(false);
  };

  // Handle editing a problem
  const handleEditProblem = (problem) => {
    setEditingProblem({...problem});
  };

  // Handle input change for editing problem
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProblem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle updating problem
  const handleUpdateProblem = async () => {
    if (!editingProblem.title.trim() || !editingProblem.description.trim()) {
      setError('Title and description are required');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:8080/api/coding-tests/${editingProblem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProblem),
      });

      if (!response.ok) throw new Error('Failed to update problem');

      const updatedProblem = await response.json();
      
      // Update the local state
      setTestProblems(testProblems.map(p => 
        p.id === updatedProblem.id ? updatedProblem : p
      ));

      setEditingProblem(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating problem:', error);
      setError('Failed to update problem. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Save changes to the database
  const saveChanges = async () => {
    setIsSubmitting(true);
    setSaveSuccess(false);
    setError('');
    
    try {
      const questionIds = testProblems.map(p => p.id);
      
      // Update the test problems
      const response = await fetch(`http://localhost:8080/api/tests/${id}/update-questions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionIds }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update test problems');
      }
      
      // Update test with new total marks
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
      console.error('Error saving problems:', error);
      setError('Failed to save changes. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle creating a new coding problem
  const handleCreateNewProblem = () => {
    navigate(`/admin/coding-test/${id}`, { 
      state: { returnTo: `/admin/coding-test/edit/${id}` } 
    });
  };

  // Handle examples update
  const handleExamplesChange = (examples) => {
    setEditingProblem(prev => ({
      ...prev,
      examples
    }));
  };

  // Handle test cases update
  const handleTestCasesChange = (testCases) => {
    setEditingProblem(prev => ({
      ...prev,
      testCases
    }));
  };

  // Handle constraints update
  const handleConstraintsChange = (constraints) => {
    setEditingProblem(prev => ({
      ...prev,
      constraints
    }));
  };

  // Handle adding an example
  const handleAddExample = () => {
    if (!editingProblem) return;
    setEditingProblem({
      ...editingProblem,
      examples: [...editingProblem.examples, { input: '', output: '' }]
    });
  };

  // Handle updating an example
  const handleUpdateExample = (index, field, value) => {
    const updatedExamples = [...editingProblem.examples];
    updatedExamples[index] = { 
      ...updatedExamples[index], 
      [field]: value 
    };
    setEditingProblem({
      ...editingProblem,
      examples: updatedExamples
    });
  };

  // Handle removing an example
  const handleRemoveExample = (index) => {
    if (editingProblem.examples.length <= 1) {
      setError('At least one example is required');
      return;
    }
    const updatedExamples = editingProblem.examples.filter((_, i) => i !== index);
    setEditingProblem({
      ...editingProblem,
      examples: updatedExamples
    });
  };

  // Handle adding a test case
  const handleAddTestCase = () => {
    if (!editingProblem) return;
    setEditingProblem({
      ...editingProblem,
      testCases: [...editingProblem.testCases, { input: '', output: '' }]
    });
  };

  // Handle updating a test case
  const handleUpdateTestCase = (index, field, value) => {
    const updatedTestCases = [...editingProblem.testCases];
    updatedTestCases[index] = { 
      ...updatedTestCases[index], 
      [field]: value 
    };
    setEditingProblem({
      ...editingProblem,
      testCases: updatedTestCases
    });
  };

  // Handle removing a test case
  const handleRemoveTestCase = (index) => {
    if (editingProblem.testCases.length <= 1) {
      setError('At least one test case is required');
      return;
    }
    const updatedTestCases = editingProblem.testCases.filter((_, i) => i !== index);
    setEditingProblem({
      ...editingProblem,
      testCases: updatedTestCases
    });
  };

  // Handle adding a constraint
  const handleAddConstraint = () => {
    if (!editingProblem) return;
    setEditingProblem({
      ...editingProblem,
      constraints: [...editingProblem.constraints, '']
    });
  };

  // Handle updating a constraint
  const handleUpdateConstraint = (index, value) => {
    const updatedConstraints = [...editingProblem.constraints];
    updatedConstraints[index] = value;
    setEditingProblem({
      ...editingProblem,
      constraints: updatedConstraints
    });
  };

  // Handle removing a constraint
  const handleRemoveConstraint = (index) => {
    if (editingProblem.constraints.length <= 1) {
      setError('At least one constraint is required');
      return;
    }
    const updatedConstraints = editingProblem.constraints.filter((_, i) => i !== index);
    setEditingProblem({
      ...editingProblem,
      constraints: updatedConstraints
    });
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
          <h1 className="text-2xl font-bold text-gray-800">Edit Coding Test: {test.testName}</h1>
          <p className="text-gray-600">Manage coding problems for this test</p>
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
            <h2 className="text-lg font-semibold text-gray-800">Test Problems ({testProblems.length})</h2>
            <p className="text-sm text-gray-600">
              Total marks: {calculateTotalMarks()} 
              {test.totalMarks && <span> (Required: {test.totalMarks})</span>}
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleCreateNewProblem}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <Code className="h-4 w-4 mr-2" />
              Create New Problem
            </button>
            
            {/* {!isAddingProblems && (
              <button
                onClick={() => setIsAddingProblems(true)}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Problems
              </button>
            )} */}
            
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
        
        {/* Problems table */}
        {testProblems.length > 0 ? (
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Problem</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Marks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {testProblems.map((problem) => (
                  <tr key={problem.id} className={editingProblem?.id === problem.id ? 'bg-blue-50' : ''}>
                    <td className="px-6 py-4">
                      {editingProblem?.id === problem.id ? (
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                              Title
                            </label>
                            <input
                              type="text"
                              id="title"
                              name="title"
                              value={editingProblem.title}
                              onChange={handleEditInputChange}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter question title"
                            />
                          </div>
                          <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              value={editingProblem.description}
                              onChange={handleEditInputChange}
                              rows="3"
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Describe the coding problem"
                            ></textarea>
                          </div>
                          
                          {/* Examples section */}
                          <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div 
                              className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center cursor-pointer"
                              onClick={() => toggleSection('examples')}
                            >
                              <div className="text-sm font-medium flex items-center">
                                <span className="mr-2">Examples</span>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                  {editingProblem.examples.length}
                                </span>
                              </div>
                              <button className="p-1 text-gray-500">
                                {expandedSections.examples ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                            </div>
                            
                            {expandedSections.examples && (
                              <div className="p-4 space-y-3">
                                {editingProblem.examples.map((example, index) => (
                                  <div key={index} className="space-y-2 pb-3 border-b border-gray-100">
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm font-medium">Example {index + 1}</span>
                                      <button
                                        onClick={() => handleRemoveExample(index)}
                                        className="text-red-600 hover:text-red-800 p-1"
                                        title="Remove example"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </div>
                                    <div>
                                      <label className="block text-xs text-gray-600 mb-1">Input</label>
                                      <textarea
                                        value={example.input}
                                        onChange={(e) => handleUpdateExample(index, 'input', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="2"
                                      ></textarea>
                                    </div>
                                    <div>
                                      <label className="block text-xs text-gray-600 mb-1">Output</label>
                                      <textarea
                                        value={example.output}
                                        onChange={(e) => handleUpdateExample(index, 'output', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="2"
                                      ></textarea>
                                    </div>
                                  </div>
                                ))}
                                <button
                                  onClick={handleAddExample}
                                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add Example
                                </button>
                              </div>
                            )}
                          </div>
                          
                          {/* Test Cases section */}
                          <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div 
                              className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center cursor-pointer"
                              onClick={() => toggleSection('testCases')}
                            >
                              <div className="text-sm font-medium flex items-center">
                                <span className="mr-2">Test Cases</span>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                  {editingProblem.testCases.length}
                                </span>
                              </div>
                              <button className="p-1 text-gray-500">
                                {expandedSections.testCases ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                            </div>
                            
                            {expandedSections.testCases && (
                              <div className="p-4 space-y-3">
                                {editingProblem.testCases.map((testCase, index) => (
                                  <div key={index} className="space-y-2 pb-3 border-b border-gray-100">
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm font-medium">Test Case {index + 1}</span>
                                      <button
                                        onClick={() => handleRemoveTestCase(index)}
                                        className="text-red-600 hover:text-red-800 p-1"
                                        title="Remove test case"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </div>
                                    <div>
                                      <label className="block text-xs text-gray-600 mb-1">Input</label>
                                      <textarea
                                        value={testCase.input}
                                        onChange={(e) => handleUpdateTestCase(index, 'input', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="2"
                                      ></textarea>
                                    </div>
                                    <div>
                                      <label className="block text-xs text-gray-600 mb-1">Output</label>
                                      <textarea
                                        value={testCase.output}
                                        onChange={(e) => handleUpdateTestCase(index, 'output', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="2"
                                      ></textarea>
                                    </div>
                                  </div>
                                ))}
                                <button
                                  onClick={handleAddTestCase}
                                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add Test Case
                                </button>
                              </div>
                            )}
                          </div>
                          
                          {/* Constraints section */}
                          <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div 
                              className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center cursor-pointer"
                              onClick={() => toggleSection('constraints')}
                            >
                              <div className="text-sm font-medium flex items-center">
                                <span className="mr-2">Constraints</span>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                  {editingProblem.constraints.length}
                                </span>
                              </div>
                              <button className="p-1 text-gray-500">
                                {expandedSections.constraints ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                            </div>
                            
                            {expandedSections.constraints && (
                              <div className="p-4 space-y-3">
                                {editingProblem.constraints.map((constraint, index) => (
                                  <div key={index} className="flex items-center space-x-2">
                                    <input
                                      type="text"
                                      value={constraint}
                                      onChange={(e) => handleUpdateConstraint(index, e.target.value)}
                                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      placeholder="Add constraint"
                                    />
                                    <button
                                      onClick={() => handleRemoveConstraint(index)}
                                      className="text-red-600 hover:text-red-800 p-1"
                                      title="Remove constraint"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                ))}
                                <button
                                  onClick={handleAddConstraint}
                                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add Constraint
                                </button>
                              </div>
                            )}
                          </div>
                          
                          {/* Solution section */}
                          <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div 
                              className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center cursor-pointer"
                              onClick={() => toggleSection('solution')}
                            >
                              <div className="text-sm font-medium flex items-center">
                                <Code className="h-4 w-4 mr-1" />
                                <span>Solution</span>
                              </div>
                              <button className="p-1 text-gray-500">
                                {expandedSections.solution ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                            </div>
                            
                            {expandedSections.solution && (
                              <div className="p-4">
                                <textarea
                                  name="solution"
                                  value={editingProblem.solution}
                                  onChange={handleEditInputChange}
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  rows="6"
                                ></textarea>
                                <p className="mt-2 text-xs text-gray-500">
                                  Provide a model solution for this coding problem.
                                </p>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex justify-end space-x-3 pt-3">
                            <button
                              onClick={() => setEditingProblem(null)}
                              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleUpdateProblem}
                              disabled={isSubmitting}
                              className={`px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                              }`}
                            >
                              {isSubmitting ? (
                                <>
                                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                                  Saving...
                                </>
                              ) : (
                                'Save Problem'
                              )}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="text-sm font-medium text-gray-900">{problem.title}</div>
                          <div className="text-xs text-gray-500 mt-1 truncate max-w-md">
                            {problem.description.length > 100 
                              ? `${problem.description.substring(0, 100)}...` 
                              : problem.description}
                          </div>
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {editingProblem?.id === problem.id ? (
                        <input
                          type="number"
                          name="marks"
                          value={editingProblem.marks}
                          onChange={handleEditInputChange}
                          min="1"
                          className="w-20 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        problem.marks
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-3">
                        {editingProblem?.id !== problem.id && (
                          <>
                            <button
                              onClick={() => handleEditProblem(problem)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Edit problem"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleRemoveProblem(problem.id)}
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
            <p className="text-gray-500">No problems added to this test yet.</p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={() => setIsAddingProblems(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Existing Problems
              </button>
              <button
                onClick={handleCreateNewProblem}
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <Code className="h-4 w-4 mr-2" />
                Create New Problem
              </button>
            </div>
          </div>
        )}
        
        {/* Add problems modal */}
        {isAddingProblems && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Add Problems to Test</h3>
                <button
                  onClick={() => {
                    setIsAddingProblems(false);
                    setSelectedNewProblems([]);
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
                  placeholder="Search problems..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="overflow-y-auto flex-grow">
                {getAvailableProblems().length > 0 ? (
                  <div className="border border-gray-200 rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Select</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Problem</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Marks</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {getAvailableProblems().map((problem) => (
                          <tr 
                            key={problem.id} 
                            className={selectedNewProblems.includes(problem.id) ? 'bg-blue-50' : ''}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedNewProblems.includes(problem.id)}
                                onChange={() => toggleSelectNewProblem(problem.id)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900">{problem.title}</div>
                              <div className="text-xs text-gray-500 mt-1 truncate max-w-md">
                                {problem.description.length > 100 
                                  ? `${problem.description.substring(0, 100)}...` 
                                  : problem.description}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{problem.marks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-md">
                    <p className="text-gray-500">No matching problems found.</p>
                    <button
                      onClick={handleCreateNewProblem}
                      className="mt-4 inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Create New Problem
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setIsAddingProblems(false);
                    setSelectedNewProblems([]);
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={addSelectedProblems}
                  disabled={selectedNewProblems.length === 0}
                  className={`px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    selectedNewProblems.length === 0 ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                  }`}
                >
                  Add {selectedNewProblems.length} {selectedNewProblems.length === 1 ? 'Problem' : 'Problems'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditCodingTest;