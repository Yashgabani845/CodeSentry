import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Send, LogOut, Maximize2, Minimize2, List, Settings, ChevronDown, X, Sun, Moon, CheckCircle, XCircle, AlertTriangle, Power } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withFaceVerification } from './FaceDetection';
import MonacoEditorWrapper from './MonaccoWrapper';
import TestCaseResult from './TestcaseResults';
import Timer from './Timer';
import { useParams } from 'react-router-dom';


const API_BASE_URL = process.env.REACT_APP_PROD_API_BASE_URL;
const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "typescript", label: "TypeScript" }
];


const defaultCode = {
  javascript: "// Write your JavaScript code here\n\n",
  python: "# Write your Python code here\n\n",
  java: "// Write your Java code here\n\nclass Solution {\n    public static void main(String[] args) {\n        \n    }\n}",
  cpp: "// Write your C++ code here\n\n#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}",
  typescript: "// Write your TypeScript code here\n\n"
};

const CodingEnvironment = () => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("problem");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isProblemListOpen, setIsProblemListOpen] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [theme, setTheme] = useState("vs-dark");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const leftPanelRef = useRef(null);
  const monacoRef = useRef(null);
  const rightPanelRef = useRef(null);
  const resultsPanelRef = useRef(null);
  const editorContainerRef = useRef(null);
  const resizeLeftRef = useRef(null);
  const resizeRightRef = useRef(null);
  const { testId } = useParams();

  // Handle editor value change
  const handleEditorChange = (value) => {
    setCode(value);
  };

  // Fetch problems on component mount
  useEffect(() => {
    const fetchTestAndQuestions = async () => {
      setIsLoading(true);
      try {
        console.log("⏳ Fetching test...");
        const testResponse = await fetch(`${API_BASE_URL}/api/tests/${testId}`);

        if (!testResponse.ok) {
          throw new Error(`HTTP error! Status: ${testResponse.status}`);
        }

        const test = await testResponse.json();
        console.log("✅ Test fetched:", test);

        if (test &&( test.testType === "CODING" || test.testType === "coding") && Array.isArray(test.questionIds)) {
          const questionPromises = test.questionIds.map(id =>
            fetch(`${API_BASE_URL}/api/coding-tests/${id}`)
              .then(res => {
                if (!res.ok) {
                  throw new Error(`HTTP error! Status: ${res.status} for question ID: ${id}`);
                }
                return res.json();
              })
          );

          const questions = await Promise.all(questionPromises);
          console.log("✅ Questions fetched:", questions);

          const numberedQuestions = questions.map((q, index) => ({
            ...q,
            number: index + 1,
            startingCode: defaultCode, // This is correct as each question uses the entire defaultCode object
          }));

          console.log("📦 Setting problems:", numberedQuestions);
          setProblems(numberedQuestions);
        } else {
          throw new Error("Invalid test data structure");
        }
      } catch (err) {
        console.error("❌ Error in useEffect:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestAndQuestions();
  }, []);

  // Debug logging for component state
  useEffect(() => {
    console.log("✅ Problems state updated:", problems);
  }, [problems]);

  // Set current problem's code when language changes or problem changes
  useEffect(() => {
    if (problems.length > 0 && problems[currentProblemIndex]) {
      // Use the proper starting code for the selected language
      setCode(defaultCode[language]);
    }
  }, [language, currentProblemIndex, problems]);
  const currentProblem = problems[currentProblemIndex];

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  // Toggle theme mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? "vs-light" : "vs-dark");
  };

  // Move to next problem
  const handleNextProblem = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
      setTestResults([]);
    }
  };

  // Move to previous problem
  const handlePrevProblem = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex(currentProblemIndex - 1);
      setTestResults([]);
    }
  };

  // Handle run code
  const handleRunCode = async () => {
    const currentProblem = problems[currentProblemIndex];
    if (!currentProblem) {
      console.error("No current problem to run");
      return;
    }

    setIsRunning(true); 
    const userEmail = localStorage.getItem('userEmail');

    const payload = {
      language,
      code,
      testId,
      questionNumber: currentProblemIndex,
      userId: userEmail,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/submissions/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setTestResults(result);
    } catch (error) {
      console.error("❌ Run failed:", error);
      toast.error("Failed to run code");

    } finally {
      setIsRunning(false); // ✅ Stop loader
    }
  };

 const handleSubmitCode = async () => {
  const currentProblem = problems[currentProblemIndex];
  if (!currentProblem) {
    console.error("No current problem to submit");
    return;
  }

  const userEmail = localStorage.getItem('userEmail');

  const payload = {
    language,
    code,
    testId,
    questionNumber: currentProblemIndex,
    userId: userEmail,
  };

  setIsSubmitting(true); // show loader if needed

  try {
    const response = await fetch(`${API_BASE_URL}/api/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    setTestResults(result);

    // ✅ Count how many test cases passed
    const total = result.length;
    const passed = result.filter((test) => test.passed).length;

    // ✅ Show toast with result summary
    alert(`Submitted! ✅ Passed ${passed} / ${total} test cases.`);

  } catch (error) {
    console.error("❌ Submission failed:", error);
    toast.error("❌ Failed to submit code");
  } finally {
    setIsSubmitting(false);
  }
};


  function debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedLayout = useRef(
    debounce(() => {
      if (monacoRef.current) {
        monacoRef.current.layout();
      }
    }, 100)
  ).current;

  // Setup resize handlers for panels
  useEffect(() => {
    const handleLeftResize = (e) => {
      if (e.buttons !== 1) return; // Only resize when primary mouse button is pressed

      const container = document.querySelector('.coding-container');
      const containerWidth = container.offsetWidth;
      const newLeftWidth = Math.min(Math.max(e.clientX, 250), containerWidth - 400);

      leftPanelRef.current.style.width = `${newLeftWidth}px`;
      rightPanelRef.current.style.width = `${containerWidth - newLeftWidth}px`;
    };
    const handleRightResize = (e) => {
      if (e.buttons !== 1) return;
      // Calculate the new height of the editor container based on mouse position
      const editorContainer = rightPanelRef.current;
      const resultsStartY = e.clientY - editorContainer.getBoundingClientRect().top;

      // Ensure height is within a valid range (not too small, not too large)
      const newEditorHeight = Math.min(Math.max(resultsStartY, 200), editorContainer.offsetHeight - 100);

      // Update the editor container's height
      if (editorContainerRef.current) {
        editorContainerRef.current.style.height = `${newEditorHeight}px`;
      }

      // Adjust the results panel height to match the remaining space
      if (resultsPanelRef.current) {
        resultsPanelRef.current.style.height = `calc(100% - ${newEditorHeight}px)`;
      }

      // Trigger Monaco layout to adjust for the new height
      requestAnimationFrame(() => {
        monacoRef.current?.layout();
      });
    };



    const leftResizer = resizeLeftRef.current;
    const rightResizer = resizeRightRef.current;

    if (leftResizer) {
      leftResizer.addEventListener('mousedown', () => {
        document.body.style.userSelect = 'none';
        document.addEventListener('mousemove', handleLeftResize);
      });
    }

    if (rightResizer) {
      rightResizer.addEventListener('mousedown', () => {
        document.body.style.userSelect = 'none';
        document.addEventListener('mousemove', handleRightResize);
      });
    }

    document.addEventListener('mouseup', () => {
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', handleLeftResize);
      document.removeEventListener('mousemove', handleRightResize);
      requestAnimationFrame(() => {
        monacoRef.current?.layout();
      });
    });

    return () => {
      document.removeEventListener('mouseup', () => { });
      document.removeEventListener('mousemove', handleLeftResize);
      document.removeEventListener('mousemove', handleRightResize);

    };
  }, []);

  // Get theme-based color classes
  const getThemeClasses = () => {
    return {
      background: isDarkMode ? 'bg-gray-900' : 'bg-gray-100',
      text: isDarkMode ? 'text-gray-200' : 'text-gray-800',
      navbar: isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300',
      panel: isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300',
      button: isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300',
      primaryButton: isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600',
      secondaryPanel: isDarkMode ? 'bg-gray-800' : 'bg-gray-100',
      border: isDarkMode ? 'border-gray-700' : 'border-gray-300',
      highlight: isDarkMode ? 'bg-gray-700' : 'bg-gray-200',
      resizer: isDarkMode ? 'bg-gray-700 hover:bg-blue-500' : 'bg-gray-300 hover:bg-blue-400',
    };

  };
  const themeClasses = getThemeClasses();

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${themeClasses.background} ${themeClasses.text}`}>
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-4">Loading coding environment...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${themeClasses.background} ${themeClasses.text}`}>
        <div className="text-center max-w-md p-4">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
          <p className="mb-4">{error}</p>
          <p className="text-sm">Please check your Internet  connection and try again.</p>
        </div>
      </div>
    );
  }

  // Handle case where problems haven't loaded yet
  if (problems.length === 0) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${themeClasses.background} ${themeClasses.text}`}>
        <div className="text-center max-w-md p-4">
          <h2 className="text-xl font-bold mb-2">No Problems Available</h2>
          <p>No coding problems were found. Please ensure your profile is configured correctly.</p>
        </div>
      </div>
    );
  }


  return (


    <div className={`flex flex-col h-screen ${themeClasses.background} ${themeClasses.text} rounded-sm`}>
      {/* Navbar */}
      <div className={`${themeClasses.navbar} border-b p-3 flex items-center justify-between`}>
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold text-blue-500">CodeSentry Coding Environment</div>

          {/* Problem List Dropdown */}
          <div className="relative">
            <button
              className={`flex items-center space-x-2 px-3 py-1 ${themeClasses.button} rounded-md`}
              onClick={() => setIsProblemListOpen(!isProblemListOpen)}
            >
              <List size={16} />
              <span>Problems</span>
              <ChevronDown size={16} />
            </button>

            {isProblemListOpen && (
              <div className={`absolute top-10 left-0 z-10 w-64 ${themeClasses.panel} border rounded-md shadow-lg`}>
                <div className="p-2">
                  {problems.map((problem, index) => (
                    <div
                      key={problem.id}
                      className={`p-2 rounded-md cursor-pointer ${currentProblemIndex === index ? 'bg-blue-600 text-white' : `hover:${themeClasses.highlight}`
                        }`}
                      onClick={() => {
                        setCurrentProblemIndex(index);
                        setIsProblemListOpen(false);
                        setTestResults([]);
                      }}
                    >
                      <div className="flex justify-between">
                        <span>
                          {problem.number}. {problem.title}
                        </span>
                        <span >{problem.marks} marks</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Left navigation */}
        <div className="flex items-center space-x-5"> <button className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200 shadow-sm ${currentProblemIndex === 0 ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60' : `${themeClasses.primaryButton} text-white hover:shadow-md`}`} onClick={handlePrevProblem} disabled={currentProblemIndex === 0} > <ChevronLeft size={16} className="transform transition-transform group-hover:-translate-x-0.5" /> <span>Previous</span> </button>

          <Timer isDarkMode={isDarkMode} />

          <button
            className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200 shadow-sm ${currentProblemIndex === problems.length - 1
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60'
              : `${themeClasses.primaryButton} text-white hover:shadow-md`
              }`}
            onClick={handleNextProblem}
            disabled={currentProblemIndex === problems.length - 1}
          >
            <span>Next</span>
            <ChevronRight size={16} className="transform transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center space-x-4">
          <button
            className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-700 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-500"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ?
              <Sun size={20} className="text-amber-400" /> :
              <Moon size={20} className="text-violet-500" />
            }
          </button>

          <button
            className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-sm hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-400"

            aria-label="End Test"
          >
            <LogOut size={18} />
            <span className="font-semibold tracking-wide text-sm">End Test</span>
          </button>

          <button className={`px-3.5 py-2 ${themeClasses.buttonSecondary} rounded-md flex items-center space-x-1.5 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400`}>
            <Settings size={16} />
            <span className="font-medium">Settings</span>
          </button>
        </div>

      </div>

      {/* Main coding container */}
      <div className="flex flex-1 overflow-hidden coding-container">
        {/* Left panel - Problem description */}
        <div
          ref={leftPanelRef}
          className={`w-[45%] border-r ${themeClasses.border} flex flex-col overflow-hidden`}
          style={{ minWidth: '250px' }}
        >
          {/* Tabs */}
          <div className={`flex border-b ${themeClasses.border}`}>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'problem' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setActiveTab('problem')}
            >
              Problem
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'submissions' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setActiveTab('submissions')}
            >
              Submissions
            </button>
          </div>

          {/* Problem content */}
          {activeTab === 'problem' ? (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">
                  {currentProblem.number}. {currentProblem.title}
                </h1>
                <span className="text-blue-500 font-medium">{currentProblem.marks} marks</span>
              </div>

              <div className={`prose ${isDarkMode ? 'prose-invert' : ''} max-w-none`}>
                <div
                  className="mb-6 whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: currentProblem.description }}
                />

                <h3 className="text-lg font-semibold mb-2">Examples:</h3>
                <div className="space-y-4">
                  {currentProblem.testCases.map((testCase, idx) => (
                    <div key={idx} className={`border ${themeClasses.border} rounded-md overflow-hidden`}>
                      <div className={`${themeClasses.secondaryPanel} px-3 py-1 font-medium`}>
                        Example {idx + 1}
                      </div>
                      <div className="p-3 space-y-2">
                        <div>
                          <span className="font-medium text-gray-500">Input:</span> {testCase.input}
                        </div>
                        <div>
                          <span className="font-medium text-gray-500">Output:</span> {testCase.output}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-2">Constraints:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {currentProblem.constraints.map((constraint, idx) => (
                    <li key={idx} className={isDarkMode ? "text-gray-300" : "text-gray-700"}>{constraint}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="text-center py-6 text-gray-500">
                No submissions yet.
              </div>
            </div>
          )}
        </div>

        {/* Resizer for left panel */}
        <div
          ref={resizeLeftRef}
          className={`w-1 ${themeClasses.resizer} cursor-col-resize`}
        />

        {/* Right panel - Code editor and results */}
        <div
          ref={rightPanelRef}
          className="w-[55%] flex-1 flex flex-col overflow-hidden"
        >
          {/* Code editor */}
          <div
            ref={editorContainerRef}
            className="flex-1 flex flex-col editor-container"
            style={{ height: '70%' }}
          >
            <div className={`${themeClasses.secondaryPanel} border-b ${themeClasses.border} p-2 flex justify-between items-center`}>
              <div className="relative">
                <button
                  className={`flex items-center space-x-2 px-3 py-1 ${themeClasses.button} rounded-md`}
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                >
                  <span>{languages.find(lang => lang.value === language)?.label}</span>
                  <ChevronDown size={16} />
                </button>

                {isLanguageDropdownOpen && (
                  <div className={`absolute top-10 left-0 z-10 w-40 ${themeClasses.panel} border rounded-md shadow-lg`}>
                    {languages.map((lang) => (
                      <div
                        key={lang.value}
                        className={`p-2 cursor-pointer ${language === lang.value ? 'bg-blue-600 text-white' : `hover:${themeClasses.highlight}`
                          }`}
                        onClick={() => handleLanguageChange(lang.value)}
                      >
                        {lang.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center space-x-2 disabled:opacity-50"
                  onClick={handleRunCode}
                  disabled={isRunning}
                >
                  <Play size={16} />
                  <span>{isRunning ? "Running..." : "Run"}</span>
                </button>

                <button
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center space-x-2 disabled:opacity-50"
                  onClick={handleSubmitCode}
                  disabled={isSubmitting}
                >
                  <Send size={16} />
                  <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                </button>

              </div>

            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
              <MonacoEditorWrapper
                ref={monacoRef}
                language={language}
                code={code}
                theme={theme}
                onChange={handleEditorChange}
              />

            </div>
          </div>

          {/* Resizer for editor and results */}
          <div
            ref={resizeRightRef}
            className={`h-1 ${themeClasses.resizer} cursor-row-resize`}
          />

          {/* Test results */}
          <div
            ref={resultsPanelRef}
            className={`border-t ${themeClasses.border} overflow-hidden`}
            style={{ height: '30%' }}
          >
            <div className={`${themeClasses.secondaryPanel} p-2 flex justify-between items-center border-b ${themeClasses.border}`}>
              <span className="font-medium">Test Results</span>
            </div>

            <div className="overflow-y-auto h-full p-4">
              {testResults.length > 0 ? (
                <div className="space-y-4">
                  {testResults.map((result, idx) => (
                    <TestCaseResult key={idx} result={result} idx={idx} isDarkMode={isDarkMode} />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Run your code to see results
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default withFaceVerification(CodingEnvironment);