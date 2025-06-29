import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Send, LogOut, List, Settings, ChevronDown, Sun, Moon, CheckCircle, XCircle } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withFaceVerification } from './FaceDetection';
import MonacoEditorWrapper from './MonaccoWrapper';
import TestCaseResult from './TestcaseResults';
// --- Custom Timer ---
import { useNavigate, useParams } from 'react-router-dom';

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

// --- Custom Timer for End Time ---
function EndTimeTimer({ endTime, onTimerEnd, isDarkMode }) {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (!endTime) return;
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(endTime);
      const diff = Math.max(0, Math.floor((end - now) / 1000));
      setSecondsLeft(diff);
      if (diff <= 0) {
        clearInterval(interval);
        onTimerEnd && onTimerEnd();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime, onTimerEnd]);

  if (!endTime || secondsLeft <= 0) {
    return (
      <div className={`px-4 py-1 rounded-lg ${isDarkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-700"} font-bold text-lg animate-pulse`}>
        Time's Up!
      </div>
    );
  }
  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className={`px-4 py-1 rounded-lg font-bold text-lg shadow-md ${isDarkMode ? "bg-gray-900 border-2 border-blue-800 text-blue-300" : "bg-blue-50 border-2 border-blue-300 text-blue-700"}`}>
      ⏰ Time Left: <span className="tabular-nums">{hours.toString().padStart(2, "0")}</span>:
      <span className="tabular-nums">{minutes.toString().padStart(2, "0")}</span>:
      <span className="tabular-nums">{seconds.toString().padStart(2, "0")}</span>
    </div>
  );
}

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

  // New states for strict timing and submission
  const [testDetails, setTestDetails] = useState(null);
  const [testStatus, setTestStatus] = useState('available'); // available, ended, out-of-window
  const [submissions, setSubmissions] = useState([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);

  const leftPanelRef = useRef(null);
  const monacoRef = useRef(null);
  const rightPanelRef = useRef(null);
  const resultsPanelRef = useRef(null);
  const editorContainerRef = useRef(null);
  const resizeLeftRef = useRef(null);
  const resizeRightRef = useRef(null);
  const { testId } = useParams();
  const navigate = useNavigate();

  // --- Redirect if no userEmail ---
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      window.location.href = "https://code-sentry.vercel.app/login";
    }
  }, []);

  // --- Fetch problems and test details on mount ---
  useEffect(() => {
    const fetchTestAndQuestions = async () => {
      setIsLoading(true);
      try {
        const testResponse = await fetch(`${API_BASE_URL}/api/tests/${testId}`);
        if (!testResponse.ok) throw new Error(`HTTP error! Status: ${testResponse.status}`);
        const test = await testResponse.json();
        setTestDetails(test);

        // Check if user already submitted for this test
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
          const submissionRes = await fetch(`${API_BASE_URL}/api/submissions/all`);
          if (submissionRes.ok) {
            const allSubs = await submissionRes.json();
            const userTestSubs = allSubs.filter(
              sub => sub.testId === testId && sub.userId === userEmail
            );
            if (userTestSubs.length > 0) {
              setTestStatus('ended');
              setSubmissions(userTestSubs);
              setIsLoading(false);
              return;
            }
            // For submissions tab (show all for this user/test)
            setSubmissions(allSubs.filter(sub => sub.testId === testId && sub.userId === userEmail));
          }
        }

        // Check the test window
        const now = new Date();
        const startTime = new Date(test.startTime);
        const endTime = new Date(test.endTime);
        if (now < startTime || now > endTime) {
          setTestStatus('out-of-window');
          setIsLoading(false);
          return;
        }

        // Load coding problems
        if (test && (test.testType === "CODING" || test.testType === "coding") && Array.isArray(test.questionIds)) {
          const questionPromises = test.questionIds.map(id =>
            fetch(`${API_BASE_URL}/api/coding-tests/${id}`)
              .then(res => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status} for question ID: ${id}`);
                return res.json();
              })
          );
          const questions = await Promise.all(questionPromises);
          const numberedQuestions = questions.map((q, index) => ({
            ...q,
            number: index + 1,
            startingCode: defaultCode,
          }));
          setProblems(numberedQuestions);
        } else {
          throw new Error("Invalid test data structure");
        }
        setTestStatus('available');
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestAndQuestions();
  }, [testId]);

  // Debug logging for component state
  useEffect(() => {
    console.log("✅ Problems state updated:", problems);
  }, [problems]);

  // Set current problem's code when language changes or problem changes
  useEffect(() => {
    if (problems.length > 0 && problems[currentProblemIndex]) {
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

  // Strict timer: handle timer end as end test
  const handleTimerEnd = () => {
    handleEndTest(true);
  };

  // End test button logic
  const handleEndTest = async (fromTimer = false) => {
    if (testStatus === 'ended') return;
    await handleSubmitCode(true); // submit, silent
    setTestStatus('ended');
    toast.info(fromTimer ? "Test window ended. Your code is auto-submitted." : "Test ended and submission sent.");
  };

  // Submit code logic, supports silent mode for end test, preserves old functionality
  const handleSubmitCode = async (silent = false) => {
    const currentProblem = problems[currentProblemIndex];
    if (!currentProblem) return;

    const userEmail = localStorage.getItem('userEmail');
    const payload = {
      language,
      code,
      testId,
      questionNumber: currentProblemIndex,
      userId: userEmail,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
      setTestResults(result);

      const total = result.length;
      const passed = result.filter((test) => test.passed).length;
      if (!silent) alert(`Submitted! ✅ Passed ${passed} / ${total} test cases.`);
    } catch (error) {
      if (!silent) {
        console.error("❌ Submission failed:", error);
        toast.error("❌ Failed to submit code");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Run code logic (unchanged)
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
      setTestResults(result);
    } catch (error) {
      console.error("❌ Run failed:", error);
      toast.error("Failed to run code");
    } finally {
      setIsRunning(false);
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
      if (e.buttons !== 1) return;
      const container = document.querySelector('.coding-container');
      const containerWidth = container.offsetWidth;
      const newLeftWidth = Math.min(Math.max(e.clientX, 250), containerWidth - 400);
      leftPanelRef.current.style.width = `${newLeftWidth}px`;
      rightPanelRef.current.style.width = `${containerWidth - newLeftWidth}px`;
    };
    const handleRightResize = (e) => {
      if (e.buttons !== 1) return;
      const editorContainer = rightPanelRef.current;
      const resultsStartY = e.clientY - editorContainer.getBoundingClientRect().top;
      const newEditorHeight = Math.min(Math.max(resultsStartY, 200), editorContainer.offsetHeight - 100);
      if (editorContainerRef.current) {
        editorContainerRef.current.style.height = `${newEditorHeight}px`;
      }
      if (resultsPanelRef.current) {
        resultsPanelRef.current.style.height = `calc(100% - ${newEditorHeight}px)`;
      }
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

  // Fallback: out of test window
  if (testStatus === 'out-of-window' && testDetails) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen ${themeClasses.background} ${themeClasses.text}`}>
        <div className="text-center max-w-md p-6 border rounded shadow-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-blue-100 dark:shadow-blue-900">
          <XCircle className="mx-auto text-red-500 animate-bounce" size={54} />
          <h2 className="text-2xl font-bold mb-3 mt-4 text-red-600">Test Window Closed</h2>
          <p className="mb-6 font-medium text-lg">
            The test was conducted between<br />
            <span className="font-semibold">{new Date(testDetails.startTime).toLocaleString()}</span> and <span className="font-semibold">{new Date(testDetails.endTime).toLocaleString()}</span>.
          </p>
          <p className="text-gray-500 text-md bg-red-50 dark:bg-red-900 rounded px-3 py-2 font-semibold">You cannot access this test at this time.</p>
        </div>
      </div>
    );
  }

  // Fallback: test ended/submitted
  if (testStatus === 'ended' && testDetails) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen ${themeClasses.background} ${themeClasses.text}`}>
        <div className="text-center max-w-md p-6 border rounded shadow-xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-green-100 dark:shadow-green-900">
          <CheckCircle className="mx-auto text-green-500 animate-bounce" size={54} />
          <h2 className="text-2xl font-bold mb-3 mt-4 text-green-700">Test Submitted</h2>
          <p className="mb-6 font-medium text-lg">
            You have submitted the test.<br />
            <span className="font-semibold">Test window:</span><br />
            <span className="font-semibold">{new Date(testDetails.startTime).toLocaleString()}</span> – <span className="font-semibold">{new Date(testDetails.endTime).toLocaleString()}</span>
          </p>
          <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-4 mt-4 shadow-inner border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold mb-2 text-blue-700 dark:text-blue-300 text-left">Your Submissions:</h3>
            {submissions.length > 0 ? (
              <ul className="space-y-2 text-left">
                {submissions.map((sub, idx) => (
                  <li key={sub._id || idx} className="border rounded-md p-2 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-900 shadow-sm">
                    <div className="flex justify-between">
                      <span>Problem: <span className="font-semibold">#{(sub.questionNumber || (idx+1))}</span></span>
                      <span className="text-xs text-gray-400">{new Date(sub.createdAt || Date.now()).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500 mt-1">Language: <span className="font-semibold">{sub.language}</span></span>
                      <span className="block text-xs text-gray-500 mt-1">Score: <span className="font-semibold">{Array.isArray(sub.results) ? `${sub.results.filter(r => r.passed).length} / ${sub.results.length}` : '-'}</span></span>
                    </div>
                    <details className="mt-2">
                      <summary className="text-blue-600 cursor-pointer text-sm font-bold">View Code & Results</summary>
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                        <pre className="overflow-x-auto text-xs bg-gray-200 dark:bg-gray-900 p-2 rounded">{sub.code}</pre>
                        <div className="mt-2">
                          {Array.isArray(sub.results) && sub.results.map((r, i) => (
                            <div key={i} className="flex items-center space-x-2">
                              {r.passed ? <CheckCircle size={14} className="text-green-500" /> : <XCircle size={14} className="text-red-500" />}
                              <span className="text-xs">Input: <code>{r.input}</code> &rarr; Output: <code>{r.actualOutput}</code> {r.passed ? '' : <span className="text-red-500">(wrong)</span>}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 bg-blue-100 dark:bg-blue-900 rounded px-2 py-1">No submissions were found for your account.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${themeClasses.background} ${themeClasses.text}`}>
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-4 text-lg font-semibold">Loading coding environment...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${themeClasses.background} ${themeClasses.text}`}>
        <div className="text-center max-w-md p-6 rounded-lg shadow-lg border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
          <p className="mb-4">{error}</p>
          <p className="text-sm text-red-700">Please check your Internet connection and try again.</p>
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
                      className={`p-2 rounded-md cursor-pointer ${currentProblemIndex === index ? 'bg-blue-600 text-white' : `hover:${themeClasses.highlight}`}`}
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
        <div className="flex items-center space-x-5">
          <button className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200 shadow-sm ${currentProblemIndex === 0 ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60' : `${themeClasses.primaryButton} text-white hover:shadow-md`}`} onClick={handlePrevProblem} disabled={currentProblemIndex === 0} >
            <ChevronLeft size={16} className="transform transition-transform group-hover:-translate-x-0.5" />
            <span>Previous</span>
          </button>
          {/* --- EndTime Timer --- */}
          <EndTimeTimer endTime={testDetails?.endTime} onTimerEnd={handleTimerEnd} isDarkMode={isDarkMode} />
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
            onClick={handleEndTest}
            disabled={testStatus === 'ended'}
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
              className={`px-4 py-2 font-medium ${activeTab === 'problem' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('problem')}
            >
              Problem
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'submissions' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
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
              <div className="bg-blue-50 dark:bg-gray-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4 shadow-inner">
                <h3 className="font-bold text-blue-700 dark:text-blue-200 mb-2 text-lg">Your Submissions</h3>
                {submissions.length > 0 ? (
                  <ul className="space-y-4 text-left">
                    {submissions
                      .filter(sub => sub.questionId === problems[currentProblemIndex]?.id)
                      .map((sub, idx) => (
                        <li key={sub._id || idx} className="border rounded-md p-2 bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-900 shadow-sm">
                          <div className="flex justify-between">
                            <span className="font-semibold">Submission #{idx + 1}</span>
                            <span className="text-xs text-gray-400">{new Date(sub.createdAt || Date.now()).toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="block text-xs text-gray-500 mt-1">Language: <span className="font-semibold">{sub.language}</span></span>
                            <span className="block text-xs text-gray-500 mt-1">Score: <span className="font-semibold">{Array.isArray(sub.results) ? `${sub.results.filter(r => r.passed).length} / ${sub.results.length}` : '-'}</span></span>
                          </div>
                          <details className="mt-2">
                            <summary className="text-blue-600 cursor-pointer text-sm font-bold">View Code & Results</summary>
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                              <pre className="overflow-x-auto text-xs bg-gray-200 dark:bg-gray-900 p-2 rounded">{sub.code}</pre>
                              <div className="mt-2">
                                {Array.isArray(sub.results) && sub.results.map((r, i) => (
                                  <div key={i} className="flex items-center space-x-2">
                                    {r.passed ? <CheckCircle size={14} className="text-green-500" /> : <XCircle size={14} className="text-red-500" />}
                                    <span className="text-xs">Input: <code>{r.input}</code> &rarr; Output: <code>{r.actualOutput}</code> {r.passed ? '' : <span className="text-red-500">(wrong)</span>}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </details>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <div className="text-gray-500">No submissions yet.</div>
                )}
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
                  disabled={testStatus === 'ended'}
                >
                  <span>{languages.find(lang => lang.value === language)?.label}</span>
                  <ChevronDown size={16} />
                </button>
                {isLanguageDropdownOpen && (
                  <div className={`absolute top-10 left-0 z-10 w-40 ${themeClasses.panel} border rounded-md shadow-lg`}>
                    {languages.map((lang) => (
                      <div
                        key={lang.value}
                        className={`p-2 cursor-pointer ${language === lang.value ? 'bg-blue-600 text-white' : `hover:${themeClasses.highlight}`}`}
                        onClick={() => {
                          if (testStatus !== 'ended') handleLanguageChange(lang.value);
                        }}
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
                  disabled={isRunning || testStatus === 'ended'}
                >
                  <Play size={16} />
                  <span>{isRunning ? "Running..." : "Run"}</span>
                </button>
                <button
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center space-x-2 disabled:opacity-50"
                  onClick={() => handleSubmitCode()}
                  disabled={isSubmitting || testStatus === 'ended'}
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
                onChange={setCode}
                readOnly={testStatus === 'ended'}
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
      <ToastContainer />
    </div>
  );
};

export default withFaceVerification(CodingEnvironment);