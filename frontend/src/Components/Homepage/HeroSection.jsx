"use client"

import { useState } from "react"
import { Play, Shield, Eye, CheckCircle } from "lucide-react"

const HeroSection = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim() !== "") {
      window.location.href = "/signup?email=" + encodeURIComponent(email)
    }
  }

  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 pt-28 pb-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fillOpacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-100 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-400/30">
              <span>🚀</span>
              Next-Gen Hiring Platform
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Revolutionize Your <span className="text-blue-300">Technical Hiring</span>{" "}
                <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  Process
                </span>
              </h1>

              <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl">
                Complete hiring solution with live coding tests, aptitude assessments, advanced cheating detection, face
                recognition, and automated candidate evaluation - all in one secure platform.
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your company email"
                className="h-12 px-4 rounded-lg bg-white border-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg sm:min-w-80"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="h-12 px-8 bg-white text-blue-700 hover:bg-blue-50 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border-0"
              >
                Get Started Free
              </button>
            </form>

            {/* Action Links */}
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="flex items-center justify-center sm:justify-start text-blue-200 hover:text-white transition-colors duration-200">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo Video
              </button>
              <div className="flex items-center text-blue-200 text-sm">
                <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                No credit card required
              </div>
            </div>
          </div>

          {/* Right Content - Code Editor */}
          <div className="relative">
            {/* Main Code Editor */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Editor Header */}
              <div className="bg-gray-800 py-3 px-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-white text-sm font-mono">HireTech Live Environment</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs font-medium">LIVE</span>
                </div>
              </div>

              {/* Code Content */}
              <div className="bg-gray-900 p-6 font-mono text-sm h-80 overflow-y-auto">
                <div className="mb-1">
                  <span className="text-blue-400">function</span>{" "}
                  <span className="text-yellow-300">findOptimalCandidate</span>
                  <span className="text-white">(</span>
                  <span className="text-orange-300">candidates</span>
                  <span className="text-white">) {"{"}</span>
                </div>


                <div className="ml-4 mb-1">
                  <span className="text-blue-400">const</span> <span className="text-yellow-300">scores</span>{" "}
                  <span className="text-white">=</span> <span className="text-white">candidates.map(</span>
                  <span className="text-orange-300">candidate</span> <span className="text-white">=&gt; {"{"}</span>
                </div>

                <div className="ml-8 mb-1">
                  <span className="text-blue-400">return</span> <span className="text-white">{"{"}</span>
                </div>

                <div className="ml-12 text-white mb-1">name: candidate.name,</div>
                <div className="ml-12 mb-1">
                  <span className="text-white">technical: </span>
                  <span className="text-green-400">calculateTechnicalScore</span>
                  <span className="text-white">(candidate),</span>
                </div>
                <div className="ml-12 mb-1">
                  <span className="text-white">aptitude: </span>
                  <span className="text-green-400">evaluateAptitude</span>
                  <span className="text-white">(candidate)</span>
                </div>

                <div className="ml-8 text-white mb-1">{"}"}</div>
                <div className="ml-4 text-white mb-2">{"});"}</div>

                <div className="ml-4 mb-1">
                  <span className="text-blue-400">return</span> <span className="text-white">scores</span>
                </div>
                <div className="ml-8 mb-1">
                  <span className="text-white">.</span>
                  <span className="text-green-400">sort</span>
                  <span className="text-white">((</span>
                  <span className="text-orange-300">a, b</span>
                  <span className="text-white">) =&gt; (b.technical + b.aptitude) - (a.technical + a.aptitude))</span>
                </div>
                <div className="ml-8 text-white mb-2">[0];</div>
                <div className="text-white mb-4">{"}"}</div>

                <div className="mb-1">
                  <span className="text-blue-400">const</span> <span className="text-yellow-300">topCandidate</span>{" "}
                  <span className="text-white">=</span> <span className="text-green-400">findOptimalCandidate</span>
                  <span className="text-white">(applicants);</span>
                </div>
                <div className="mb-4">
                  <span className="text-green-400">console.log</span>
                  <span className="text-white">(</span>
                  <span className="text-orange-300">'Best match:'</span>
                  <span className="text-white">, topCandidate);</span>
                </div>

                {/* Test Result */}
                <div className="mt-6 p-4 bg-gray-800 rounded-lg border-l-4 border-green-400">
                  <div className="text-green-400 text-xs font-medium">✓ Test Passed - Execution Time: 0.23ms</div>
                  <div className="text-blue-300 text-xs">Memory Usage: 2.1MB</div>
                </div>
              </div>
            </div>

            {/* Floating Security Indicators */}
            <div className="absolute -bottom-6 -right-6 bg-red-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center transform -rotate-2">
              <Shield className="w-4 h-4 mr-2" />
              <div>
                <div className="text-sm font-semibold">Anti-Cheat Active</div>
                <div className="text-xs opacity-90">Face Recognition ON</div>
              </div>
            </div>

            <div className="absolute -top-4 -left-4 bg-blue-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              <div>
                <div className="text-sm font-semibold">Live Monitoring</div>
                <div className="text-xs opacity-90">Real-time Analysis</div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute top-1/2 -left-8 bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-xl border border-white/20">
              <div className="text-2xl font-bold text-blue-300">99.9%</div>
              <div className="text-xs text-white">Cheat Detection</div>
            </div>

            <div className="absolute bottom-1/4 -right-8 bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-xl border border-white/20">
              <div className="text-2xl font-bold text-green-300">70%</div>
              <div className="text-xs text-white">Faster Hiring</div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 pt-12 border-t border-blue-600/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-blue-200">Companies Trust Us</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-sm text-blue-200">Assessments Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-sm text-blue-200">Programming Languages</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-blue-200">Platform Availability</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
