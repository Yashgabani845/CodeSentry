import React from 'react';
import { ArrowRight, Code, GitPullRequest } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecentTestsList = ({ tests }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="divide-y divide-gray-100">
      {tests.length === 0 ? (
        <div className="py-4 text-center text-gray-500">No tests created yet</div>
      ) : (
        tests.map((test) => (
          <div key={test.id} className="py-3 flex items-center justify-between">
            <div className="flex items-center">
              {test.testType === 'CODING' ? (
                <div className="p-2 bg-green-100 rounded-md mr-3">
                  <Code className="w-5 h-5 text-green-600" />
                </div>
              ) : (
                <div className="p-2 bg-purple-100 rounded-md mr-3">
                  <GitPullRequest className="w-5 h-5 text-purple-600" />
                </div>
              )}
              <div>
                <h3 className="font-medium text-gray-800">{test.testName}</h3>
                <p className="text-sm text-gray-500">
                  Created {formatDate(test.createdAt)} by {test.createdBy}
                </p>
              </div>
            </div>
            <Link 
              to={`/admin/tests/${test.id}`}
              className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentTestsList;