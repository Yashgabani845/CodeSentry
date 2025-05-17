import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2, Search, Filter, Code, GitPullRequest } from 'lucide-react';

const TestsList = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tests/all');
        if (!response.ok) {
          throw new Error('Failed to fetch tests');
        }
        const data = await response.json();
        setTests(data);
      } catch (error) {
        console.error('Error fetching tests:', error);
        // Fallback data for demonstration
        setTests([
          { id: '1', testName: 'JavaScript Fundamentals', testType: 'CODING', createdBy: 'admin', createdAt: '2025-05-09T10:30:00' },
          { id: '2', testName: 'Logical Reasoning', testType: 'APTITUDE', createdBy: 'admin', createdAt: '2025-05-08T14:20:00' },
          { id: '3', testName: 'React Frontend Test', testType: 'CODING', createdBy: 'admin', createdAt: '2025-05-07T09:15:00' },
          { id: '4', testName: 'Quantitative Aptitude', testType: 'APTITUDE', createdBy: 'admin', createdAt: '2025-05-06T16:45:00' },
          { id: '5', testName: 'Data Structures', testType: 'CODING', createdBy: 'admin', createdAt: '2025-05-05T11:30:00' },
          { id: '6', testName: 'Verbal Reasoning', testType: 'APTITUDE', createdBy: 'admin', createdAt: '2025-05-04T13:10:00' },
          { id: '7', testName: 'Python Backend Test', testType: 'CODING', createdBy: 'admin', createdAt: '2025-05-03T15:25:00' },
          { id: '8', testName: 'SQL Database Test', testType: 'CODING', createdBy: 'admin', createdAt: '2025-05-02T08:40:00' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDelete = async (id) => {
    // In a real application, you would make an API call to delete the test
    if (window.confirm('Are you sure you want to delete this test?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/tests/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Failed to delete test');
        }
        
        // For demonstration, we'll just filter the test out
        setTests(tests.filter(test => test.id !== id));
      } catch (error) {
        console.error('Error deleting test:', error);
      }
    }
  };

  const filteredTests = tests
    .filter(test => {
      if (filter === 'ALL') return true;
      return test.testType === filter;
    })
    .filter(test => 
      test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Tests</h1>
        <Link 
          to="/admin/tests/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
        >
          <span className="mr-2">Create New Test</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <select 
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="ALL">All Types</option>
              <option value="APTITUDE">Aptitude Tests</option>
              <option value="CODING">Coding Tests</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-b border-gray-100 py-4">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/5"></div>
              </div>
            ))}
          </div>
        ) : filteredTests.length === 0 ? (
          <div className="text-center py-8">
            <div className="bg-gray-100 p-4 inline-block rounded-full mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No tests found</h3>
            <p className="text-gray-500">
              {searchTerm 
                ? `No tests matching "${searchTerm}"` 
                : 'No tests available for the selected filter'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Test Name
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created On
                  </th>
                  <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTests.map((test) => (
                  <tr key={test.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{test.testName}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {test.testType === 'CODING' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Code className="w-3 h-3 mr-1" />
                          Coding
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          <GitPullRequest className="w-3 h-3 mr-1" />
                          {test.testType}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{test.createdBy}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(test.createdAt)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                          <Link 
                            to={`/admin/tests/${test.id}`}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 transition-colors duration-200"
                            title="View Test"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                        <Link 
                          to={`/admin/tests/${test.id}/edit`}
                          className="text-amber-600 hover:text-amber-900 p-1 rounded-full hover:bg-amber-50 transition-colors duration-200"
                          title="Edit Test"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(test.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
                          title="Delete Test"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestsList;