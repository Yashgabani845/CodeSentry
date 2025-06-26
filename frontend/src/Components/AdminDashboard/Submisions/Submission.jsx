"use client"

import { useEffect, useState } from "react"
import {
  ChevronDown,
  User,
  Code,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Calendar,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Monitor,
  Activity,
} from "lucide-react"

// Utility: fetch with error check
async function fetchWithError(url, options = {}) {
  const res = await fetch(url, options)
  if (!res.ok) {
    const error = await res.text()
    throw new Error(error || "Network error")
  }
  return res.json()
}

// Enhanced Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-16">
    <div className="relative">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <BookOpen className="h-5 w-5 text-blue-600" />
      </div>
    </div>
    <span className="ml-4 text-gray-600 font-medium">Loading your dashboard...</span>
  </div>
)

// Enhanced Error Message Component
const ErrorMessage = ({ error }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-lg border border-red-200 p-8 max-w-md w-full">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-red-100 rounded-full p-3">
          <XCircle className="h-8 w-8 text-red-600" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Something went wrong</h3>
      <p className="text-gray-600 text-center text-sm leading-relaxed">
        {error.includes("User not found")
          ? "No user was found with the email from your localStorage. Please check your login or registration."
          : error}
      </p>
    </div>
  </div>
)

// Enhanced Stats Card Component
const StatsCard = ({ icon: Icon, title, value, description, color, trend }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-green-600">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-medium">{trend}</span>
        </div>
      )}
    </div>
    <div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm font-medium text-gray-700 mb-1">{title}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </div>
)

// Enhanced Test Card Component
const TestCard = ({ test, submissions, onShowUserDetails, userDetailsMap, showUserDetailFor }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const testSubmissions = submissions.filter((s) => s.testId === test.id)

  const totalSubmissions = testSubmissions.length
  const avgScore =
    testSubmissions.length > 0
      ? (testSubmissions.reduce((acc, sub) => {
          const passed = sub.results?.filter((r) => r.passed).length || 0
          const total = sub.results?.length || 1
          return acc + passed / total
        }, 0) /
          testSubmissions.length) *
        100
      : 0

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Enhanced Test Header */}
      <div
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{test.testName}</h3>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                    {test.testType}
                  </span>
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      test.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {test.isActive ? "Active" : "Inactive"}
                  </span>
                  <span className="text-sm text-gray-500">
                    ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{test.id}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{test.totalMarks ?? "-"}</p>
                  <p className="text-gray-500 text-xs">Total Marks</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{totalSubmissions}</p>
                  <p className="text-gray-500 text-xs">Submissions</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{avgScore.toFixed(1)}%</p>
                  <p className="text-gray-500 text-xs">Avg Score</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">
                    {test.startTime ? new Date(test.startTime).toLocaleDateString() : "-"}
                  </p>
                  <p className="text-gray-500 text-xs">Start Date</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">
                    {test.endTime ? new Date(test.endTime).toLocaleDateString() : "-"}
                  </p>
                  <p className="text-gray-500 text-xs">End Date</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-6 flex items-center gap-3">
            {totalSubmissions > 0 && (
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{totalSubmissions}</p>
                <p className="text-xs text-gray-500">submissions</p>
              </div>
            )}
            <div className={`p-2 rounded-lg transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Expandable Submissions Section */}
      {isExpanded && (
        <div className="border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white">
          {testSubmissions.length === 0 ? (
            <div className="p-8 text-center">
              <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-700 mb-2">No submissions yet</h4>
              <p className="text-gray-500 text-sm">This test hasn't received any submissions.</p>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Submissions ({testSubmissions.length})
                </h4>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Passed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Failed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Partial</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {testSubmissions.map((submission) => (
                  <SubmissionCard
                    key={submission.id}
                    submission={submission}
                    onShowUserDetails={onShowUserDetails}
                    userDetailsMap={userDetailsMap}
                    showUserDetailFor={showUserDetailFor}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Enhanced Submission Card Component
const SubmissionCard = ({ submission, onShowUserDetails, userDetailsMap, showUserDetailFor }) => {
  const [showCode, setShowCode] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const passedTests = submission.results?.filter((r) => r.passed).length || 0
  const totalTests = submission.results?.length || 0
  const successRate = totalTests > 0 ? (passedTests / totalTests) * 100 : 0

  const getStatusColor = () => {
    if (successRate === 100) return "bg-green-500"
    if (successRate >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getStatusBg = () => {
    if (successRate === 100) return "bg-green-50 border-green-200"
    if (successRate >= 50) return "bg-yellow-50 border-yellow-200"
    return "bg-red-50 border-red-200"
  }

  return (
    <div className={`rounded-lg border-2 p-5 hover:shadow-md transition-all duration-200 ${getStatusBg()}`}>
      {/* Enhanced Submission Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
            <span className="px-3 py-1 bg-white border border-gray-200 text-gray-700 text-sm rounded-full font-mono font-medium">
              #{submission.id}
            </span>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
            {submission.language}
          </span>
          <span className="text-sm text-gray-600">
            Q: <span className="font-mono font-medium">{submission.questionId}</span>
          </span>
        </div>

        {totalTests > 0 && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">
                {passedTests}/{totalTests}
              </p>
              <p className="text-xs text-gray-500">tests passed</p>
            </div>
            <div className="w-12 h-12 relative">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={successRate === 100 ? "#10b981" : successRate >= 50 ? "#f59e0b" : "#ef4444"}
                  strokeWidth="2"
                  strokeDasharray={`${successRate}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-700">{successRate.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced User Info Section */}
      <div className="flex items-center gap-3 mb-4 p-3 bg-white bg-opacity-50 rounded-lg">
        <User className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-600">
          User ID: <span className="font-mono font-medium">{submission.userId || "N/A"}</span>
        </span>
        {submission.userId && (
          <button
            onClick={() => onShowUserDetails(submission.userId, submission.id)}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-all duration-150 font-medium"
          >
            {showUserDetailFor[submission.id] ? (
              <>
                <EyeOff className="h-3 w-3" />
                Hide Details
              </>
            ) : (
              <>
                <Eye className="h-3 w-3" />
                Show Details
              </>
            )}
          </button>
        )}
      </div>

      {/* Enhanced User Details Expandable */}
      {showUserDetailFor[submission.id] && (
        <div className="mb-4 p-4 bg-white border border-blue-200 rounded-lg shadow-sm">
          {userDetailsMap[submission.userId] ? (
            userDetailsMap[submission.userId].error ? (
              <div className="flex items-center gap-2 text-red-600">
                <XCircle className="h-4 w-4" />
                <span className="text-sm">{userDetailsMap[submission.userId].error}</span>
              </div>
            ) : (
              <UserDetailView user={userDetailsMap[submission.userId]} />
            )
          ) : (
            <div className="flex items-center gap-2 text-gray-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm">Loading user details...</span>
            </div>
          )}
        </div>
      )}

      {/* Enhanced Action Buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setShowCode(!showCode)}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-white hover:bg-gray-50 text-gray-700 rounded-lg border border-gray-200 transition-all duration-150 font-medium shadow-sm"
        >
          <Code className="h-4 w-4" />
          {showCode ? "Hide Code" : "View Code"}
        </button>

        {submission.results?.length > 0 && (
          <button
            onClick={() => setShowResults(!showResults)}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-white hover:bg-gray-50 text-gray-700 rounded-lg border border-gray-200 transition-all duration-150 font-medium shadow-sm"
          >
            <CheckCircle className="h-4 w-4" />
            {showResults ? "Hide Results" : "View Results"}
          </button>
        )}
      </div>

      {/* Enhanced Code Section */}
      {showCode && submission.code && (
        <div className="mb-4">
          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-gray-800 px-4 py-3 text-sm text-gray-300 border-b border-gray-700 flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span className="font-medium">{submission.language} Code</span>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <pre className="p-4 text-sm text-gray-100 overflow-x-auto leading-relaxed">
              <code>{submission.code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Enhanced Test Results Section */}
      {showResults && submission.results?.length > 0 && (
        <div className="mb-4">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 border-b border-gray-200 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Test Results ({passedTests}/{totalTests} passed)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Input</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Expected</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Actual</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {submission.results.map((result, idx) => (
                    <tr
                      key={idx}
                      className={`border-t transition-colors ${
                        result.passed ? "bg-green-50 hover:bg-green-100" : "bg-red-50 hover:bg-red-100"
                      }`}
                    >
                      <td className="px-4 py-3 font-mono text-xs bg-gray-50">{String(result.input)}</td>
                      <td className="px-4 py-3 font-mono text-xs">{String(result.expectedOutput)}</td>
                      <td className="px-4 py-3 font-mono text-xs">{String(result.actualOutput)}</td>
                      <td className="px-4 py-3 text-center">
                        {result.passed ? (
                          <div className="flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <XCircle className="h-5 w-5 text-red-600" />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Cheating Detection Images */}
      <div className="mt-4">
        <CheatingDetectionImages submissionId={submission.id} />
      </div>
    </div>
  )
}

// Enhanced User Detail Component
const UserDetailView = ({ user }) => {
  if (!user) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <User className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h5 className="font-semibold text-gray-900">
            {user.firstName} {user.lastName}
          </h5>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <div>
            <span className="font-medium text-gray-700">Role:</span>
            <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">{user.role}</span>
          </div>
          {user.gender && (
            <div>
              <span className="font-medium text-gray-700">Gender:</span>
              <span className="ml-2 text-gray-900">{user.gender}</span>
            </div>
          )}
          {user.dob && (
            <div>
              <span className="font-medium text-gray-700">Date of Birth:</span>
              <span className="ml-2 text-gray-900">{user.dob}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          {user.mobileNumber && (
            <div>
              <span className="font-medium text-gray-700">Mobile:</span>
              <span className="ml-2 text-gray-900">{user.mobileNumber}</span>
            </div>
          )}
        </div>
      </div>

      {user.bio && (
        <div className="pt-3 border-t border-gray-200">
          <span className="font-medium text-gray-700">Bio:</span>
          <p className="mt-1 text-gray-900 text-sm leading-relaxed">{user.bio}</p>
        </div>
      )}

      {(user.educationDetails || user.experienceDetails) && (
        <div className="pt-3 border-t border-gray-200 space-y-3">
          {user.educationDetails && (
            <div>
              <span className="font-medium text-gray-700">Education:</span>
              <p className="mt-1 text-gray-900 text-sm leading-relaxed">{user.educationDetails}</p>
            </div>
          )}
          {user.experienceDetails && (
            <div>
              <span className="font-medium text-gray-700">Experience:</span>
              <p className="mt-1 text-gray-900 text-sm leading-relaxed">{user.experienceDetails}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Enhanced Cheating Detection Component
const CheatingDetectionImages = ({ submissionId }) => {
  return (
    <div className="border-t border-gray-200 pt-4">
      <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <Monitor className="h-4 w-4" />
        Proctoring Captures
      </h5>
      <div className="flex gap-3">
        <div className="relative group">
          <img
            src="https://placehold.co/100x75?text=Camera+1"
            alt="Proctoring capture 1"
            className="rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 shadow-sm"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200"></div>
        </div>
        <div className="relative group">
          <img
            src="https://placehold.co/100x75?text=Screen+Rec"
            alt="Screen recording capture"
            className="rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 shadow-sm"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200"></div>
        </div>
      </div>
    </div>
  )
}

// Main Enhanced Component
export default function EnhancedTestDashboard() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [tests, setTests] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [error, setError] = useState("")
  const [userDetailsMap, setUserDetailsMap] = useState({})
  const [showUserDetailFor, setShowUserDetailFor] = useState({})

  useEffect(() => {
    async function init() {
      try {
        let email = localStorage.getItem("userEmail")
        if (!email) {
          setError("No email found in localStorage.")
          setLoading(false)
          return
        }

        if (email.startsWith('"') && email.endsWith('"')) {
          email = email.slice(1, -1)
        }

        const userData = await fetchWithError(
          `http://localhost:8080/api/users/by-email?email=${encodeURIComponent(email)}`,
        )
        setUser(userData)

        const testsData = await fetchWithError(`http://localhost:8080/api/tests/by-user/${userData.id}`)
        setTests(testsData)

        const allSubmissions = await fetchWithError(`http://localhost:8080/api/submissions/all`)
        const myTestIds = new Set(testsData.map((t) => t.id))
        const filtered = allSubmissions.filter((sub) => sub.userId && myTestIds.has(sub.testId))
        setSubmissions(filtered)

        setLoading(false)
      } catch (e) {
        setError(e.message || "Something went wrong")
        setLoading(false)
      }
    }
    init()
  }, [])

  const handleShowUserDetails = async (userId, submissionId) => {
    if (!userId) {
      setUserDetailsMap((prev) => ({
        ...prev,
        [userId]: { error: "Submission does not have a valid userId." },
      }))
      setShowUserDetailFor((prev) => ({
        ...prev,
        [submissionId]: true,
      }))
      return
    }

    if (userDetailsMap[userId]) {
      setShowUserDetailFor((prev) => ({
        ...prev,
        [submissionId]: !prev[submissionId],
      }))
      return
    }

    try {
      const user1 = JSON.parse(localStorage.getItem("user"))
      const res = await fetchWithError(`http://localhost:8080/api/users/${user1.id}`)
      setUserDetailsMap((prev) => ({
        ...prev,
        [userId]: res,
      }))
      setShowUserDetailFor((prev) => ({
        ...prev,
        [submissionId]: true,
      }))
    } catch (e) {
      setUserDetailsMap((prev) => ({
        ...prev,
        [userId]: { error: e.message },
      }))
      setShowUserDetailFor((prev) => ({
        ...prev,
        [submissionId]: true,
      }))
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />

  const totalSubmissions = submissions.length
  const activeTests = tests.filter((t) => t.isActive).length
  const avgScore =
    submissions.length > 0
      ? (submissions.reduce((acc, sub) => {
          const passed = sub.results?.filter((r) => r.passed).length || 0
          const total = sub.results?.length || 1
          return acc + passed / total
        }, 0) /
          submissions.length) *
        100
      : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Test Management Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor and analyze your test performance and submissions</p>
            </div>
          </div>

          {user && (
            <div className="bg-white border border-blue-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={BookOpen}
            title="Total Tests"
            value={tests.length}
            description="Tests you've created"
            color="bg-blue-600"
          />

          <StatsCard
            icon={Users}
            title="Total Submissions"
            value={totalSubmissions}
            description="Across all your tests"
            color="bg-green-600"
          />

          <StatsCard
            icon={Activity}
            title="Active Tests"
            value={activeTests}
            description="Currently running"
            color="bg-orange-600"
          />

          <StatsCard
            icon={TrendingUp}
            title="Average Score"
            value={`${avgScore.toFixed(1)}%`}
            description="Overall performance"
            color="bg-purple-600"
          />
        </div>

        {/* Enhanced Tests List */}
        <div>
          {tests.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6">
                <BookOpen className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tests Created Yet</h3>
              <p className="text-gray-500 mb-6">
                Start by creating your first test to see submissions and analytics here.
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Create Your First Test
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Your Tests</h2>
                <p className="text-sm text-gray-600">
                  {tests.length} test{tests.length !== 1 ? "s" : ""} created
                </p>
              </div>
              {tests.map((test) => (
                <TestCard
                  key={test.id}
                  test={test}
                  submissions={submissions}
                  onShowUserDetails={handleShowUserDetails}
                  userDetailsMap={userDetailsMap}
                  showUserDetailFor={showUserDetailFor}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
