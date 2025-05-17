import React from 'react';

const CodeEditor = ({ value, onChange, language = 'javascript', height = '200px' }) => {
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden" style={{ height }}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full p-3 font-mono text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        style={{ resize: 'none' }}
        spellCheck="false"
      />
    </div>
  );
};

export default CodeEditor;