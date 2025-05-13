import React, { useState } from 'react';
import { BookOpen, Home, PlusCircle, Settings, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Homepage/Navbar'; // Assuming Navbar component exists
import Footer from '../Homepage/Footer'; // Assuming Footer component exists

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: Home },
    { name: 'Tests', path: '/admin/tests', icon: BookOpen },
    { name: 'Create Test', path: '/admin/tests/create', icon: PlusCircle },
    { name: 'Candidates', path: '/admin/candidates', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <div 
          className={`bg-white border-r border-gray-200 transition-all duration-300 ${
            isSidebarOpen ? 'w-64' : 'w-20'
          } fixed h-full shadow-sm z-10`}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className={`font-semibold text-xl text-blue-700 ${!isSidebarOpen && 'hidden'}`}>
              Admin Panel
            </div>
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="w-5 h-5 text-gray-500"
              >
                {isSidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                )}
              </svg>
            </button>
          </div>
          
          <nav className="mt-6">
            <ul>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.name} className="mb-2 px-4">
                    <Link 
                      to={item.path}
                      className={`flex items-center py-3 px-3 rounded-lg transition-colors duration-200 ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>{item.name}</span>
                      {isActive && isSidebarOpen && (
                        <span className="ml-auto w-1.5 h-6 rounded-full bg-blue-700"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        
        {/* Main content */}
        <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
          <main className="p-6">{children}</main>
        </div>
      </div>
      
      <div className={`${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;