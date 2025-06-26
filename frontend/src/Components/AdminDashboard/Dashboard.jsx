import React, { useState, useEffect } from 'react';
import { BookOpen, Code, GitPullRequest, Users } from 'lucide-react';
import StatCard from './StatCard';
import RecentTestList from './RecentTestList';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTests: 0,
    aptitudeTests: 0,
    codingTests: 0,
    candidates: 0,
    recentTests: []
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tests/all');
        const tests = await response.json();
        
        // Calculate stats from the fetched data
        const aptitudeCount = tests.filter(test => test.testType === 'APTITUDE').length;
        const codingCount = tests.filter(test => test.testType === 'CODING').length;
        
        setStats({
          totalTests: tests.length,
          aptitudeTests: aptitudeCount,
          codingTests: codingCount,
          candidates: 120, // Placeholder value, replace with actual API call
          recentTests: tests.slice(0, 5) // Get 5 most recent tests
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Set fallback data for demonstration
        setStats({
          totalTests: 24,
          aptitudeTests: 16,
          codingTests: 8,
          candidates: 120,
          recentTests: [
            { id: '1', testName: 'JavaScript Fundamentals', testType: 'CODING', createdBy: 'admin', createdAt: '2025-05-09T10:30:00' },
            { id: '2', testName: 'Logical Reasoning', testType: 'APTITUDE', createdBy: 'admin', createdAt: '2025-05-08T14:20:00' },
            { id: '3', testName: 'React Frontend Test', testType: 'CODING', createdBy: 'admin', createdAt: '2025-05-07T09:15:00' },
            { id: '4', testName: 'Quantitative Aptitude', testType: 'APTITUDE', createdBy: 'admin', createdAt: '2025-05-06T16:45:00' },
            { id: '5', testName: 'Data Structures', testType: 'CODING', createdBy: 'admin', createdAt: '2025-05-05T11:30:00' }
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 h-32 animate-pulse">
              <div className="w-12 h-12 rounded-md bg-gray-200 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Tests" 
            value={stats.totalTests} 
            icon={BookOpen} 
            color="bg-blue-500" 
          />
          <StatCard 
            title="Aptitude Tests" 
            value={stats.aptitudeTests} 
            icon={GitPullRequest} 
            color="bg-purple-500" 
          />
          <StatCard 
            title="Coding Tests" 
            value={stats.codingTests} 
            icon={Code} 
            color="bg-green-500" 
          />
          <StatCard 
            title="Candidates" 
            value={stats.candidates} 
            icon={Users} 
            color="bg-amber-500" 
          />
        </div>
      )}
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Tests</h2>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center justify-between py-3 border-b border-gray-100">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-8 w-24 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <RecentTestList tests={stats.recentTests} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;