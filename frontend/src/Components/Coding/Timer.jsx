import React, { useState,useEffect } from 'react';
import {   Timer as TimerIcon } from 'lucide-react';

// Improved Timer Component
const Timer = ({ isDarkMode  }) => {
  const [time, setTime] = useState(1800); // 30 minutes in seconds
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className={`flex items-center justify-center space-x-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
                    ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} 
                    px-4 py-2 rounded-lg shadow-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <TimerIcon size={22} className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
      <span className="text-xl font-mono font-semibold tracking-wider">{formatTime(time)}</span>
    </div>
  );
};
 export default Timer;