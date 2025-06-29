import React, { useEffect } from 'react';

const DisableKeysWrapper = ({ children }) => {
  useEffect(() => {
    function handler(e) {
      // Disable Ctrl+C, Ctrl+V
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C' || e.key === 'v' || e.key === 'V')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      // Disable Alt+Tab
      if (e.altKey && (e.key === 'Tab' || e.key === 'tab')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      // (Optional) Prevent right-click/context menu
      if (e.type === 'contextmenu') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
    window.addEventListener('keydown', handler, true);
    window.addEventListener('contextmenu', handler, true);
    return () => {
      window.removeEventListener('keydown', handler, true);
      window.removeEventListener('contextmenu', handler, true);
    };
  }, []);

  return <>{children}</>;
};

export default DisableKeysWrapper;