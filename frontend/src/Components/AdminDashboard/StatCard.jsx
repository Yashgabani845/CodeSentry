import React from 'react';

const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 transition-all duration-300 hover:shadow-md">
      <div className="flex items-start">
        <div className={`p-3 rounded-md ${color} bg-opacity-10 mr-4`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
        </div>
      </div>
      <div className="mt-4">
        <div className={`h-1 w-full bg-gray-100 rounded-full overflow-hidden`}>
          <div 
            className={`h-full ${color} rounded-full`} 
            style={{ width: `${Math.min(100, value * 5)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;