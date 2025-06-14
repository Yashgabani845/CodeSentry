
import { Play, Shield, Users, Code, Brain, Mail, Eye, BarChart3, CheckCircle } from "lucide-react"
import { useNavigate } from 'react-router-dom';

export default function Owner() {
    const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            🚀 Next-Gen Hiring Platform
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Revolutionize Your
            <span className="text-blue-600 block">Hiring Process</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Complete hiring solution with coding tests, aptitude assessments, advanced cheating detection, face
            recognition, and automated candidate evaluation - all in one powerful platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
  onClick={() => {
    navigate('/owner');
    window.scrollTo(0, 0);
  }}
  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center transition-colors shadow-lg"
>
  <Users className="mr-2 h-5 w-5" />
  Register Your Company
</button>

            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-semibold flex items-center transition-colors">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo Video
            </button>
          </div>
        </div>

        {/* Demo Video Section */}
        <div className="mb-16">
          <div className="relative max-w-4xl mx-auto">
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Coding platform interface"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-6 transition-all">
                  <Play className="h-12 w-12 text-white ml-1" />
                </button>
              </div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm opacity-80">See HireTech in Action</p>
                <p className="text-xl font-semibold">Complete Platform Walkthrough</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Coding Environment */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Code className="h-8 w-8 text-blue-600" />
              </div>
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                alt="Coding"
                className="w-12 h-12 rounded-lg ml-auto object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Custom Coding Environment</h3>
            <p className="text-gray-600 mb-4">
              Built-in IDE with multiple programming languages and real-time code execution
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Multiple Languages Support
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Real-time Code Testing
              </div>
            </div>
          </div>

          {/* Aptitude Tests */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                alt="Testing"
                className="w-12 h-12 rounded-lg ml-auto object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aptitude Assessments</h3>
            <p className="text-gray-600 mb-4">
              Comprehensive tests to evaluate logical reasoning and problem-solving skills
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Logical Reasoning Tests
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Quantitative Analysis
              </div>
            </div>
          </div>

          {/* Anti-Cheating */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-lg">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <img
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                alt="Security"
                className="w-12 h-12 rounded-lg ml-auto object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Security</h3>
            <p className="text-gray-600 mb-4">
              Multi-layered cheating detection with face recognition and behavior monitoring
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Face Recognition System
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Copy-Paste Detection
              </div>
            </div>
          </div>

          {/* Automated Mailing */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <img
                src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                alt="Email"
                className="w-12 h-12 rounded-lg ml-auto object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Automated Communication</h3>
            <p className="text-gray-600 mb-4">Seamless candidate communication with automated test invitations</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Auto Test Link Generation
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Status Update Notifications
              </div>
            </div>
          </div>

          {/* Monitoring */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Eye className="h-8 w-8 text-orange-600" />
              </div>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                alt="Monitoring"
                className="w-12 h-12 rounded-lg ml-auto object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Monitoring</h3>
            <p className="text-gray-600 mb-4">Live proctoring with AI-powered behavior analysis</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Live Proctoring System
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                AI Behavior Analysis
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <BarChart3 className="h-8 w-8 text-indigo-600" />
              </div>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                alt="Analytics"
                className="w-12 h-12 rounded-lg ml-auto object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Analytics</h3>
            <p className="text-gray-600 mb-4">Comprehensive scoring, analysis, and automated shortlisting</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Automated Scoring System
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Smart Candidate Shortlisting
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
