import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Code, Mail, Eye, BarChart3, Settings, CheckCircle, Users, Zap, Building2 } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-32 right-16 w-12 h-12 border-2 border-blue-200 rounded-lg opacity-30"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            x: [0, -60, 0],
            y: [0, 60, 0]
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-40 left-20 w-8 h-8 bg-blue-100 rounded-full opacity-40"
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-semibold shadow-sm mb-6"
          >
            <Zap className="w-4 h-4 mr-2" />
            Powerful Features
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Smart Hiring Made
            <br />
            <span className="text-blue-600 relative">
              Simple & Secure
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" fill="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ delay: 1, duration: 1.5 }}
                  viewport={{ once: true }}
                  d="M5 7c50-3 100-3 150 0s100 3 140-2"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to conduct secure, comprehensive technical assessments at scale with complete confidence and accuracy.
          </p>
        </motion.div>

        {/* Main Feature - Anti-Cheating */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-700 text-sm font-medium mb-6">
                  <Shield className="w-4 h-4 mr-2" />
                  Advanced Security
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-6">
                  Face Recognition with 97% Accuracy
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our AI-powered anti-cheating system uses advanced face recognition technology to ensure test integrity. Real-time monitoring with 90%+ detection accuracy prevents fraud and maintains assessment credibility.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-100">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Real-time face detection</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-100">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Copy-paste prevention</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-100">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Screen monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-100">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Behavioral analysis</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                {/* Security Monitor Mockup */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-semibold text-gray-900">Security Monitor</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                  
                  {/* Face Recognition Visual */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-3 relative overflow-hidden">
                      <img 
                        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200"
                        alt="Face recognition"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-2 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">Identity Verified</div>
                      <div className="text-xs text-green-600 font-semibold">97% Confidence</div>
                    </div>
                  </div>
                  
                  {/* Security Metrics */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                      <span className="text-sm text-gray-600">Face Detection</span>
                      <span className="text-sm font-medium text-green-600">Active</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
                      <span className="text-sm text-gray-600">Screen Recording</span>
                      <span className="text-sm font-medium text-blue-600">Recording</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-50 rounded-lg">
                      <span className="text-sm text-gray-600">Copy Prevention</span>
                      <span className="text-sm font-medium text-orange-600">Blocked</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating Security Badge */}
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 bg-red-500 text-white p-3 rounded-full shadow-lg"
                >
                  <Shield className="w-6 h-6" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Coding Environment */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="bg-white rounded-2xl p-8 h-full border border-gray-200 hover:shadow-xl transition-all duration-300 shadow-lg">
              <div className="bg-blue-500 p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Scalable Coding Environment</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Cloud-based IDE with multiple programming languages, real-time compilation, and custom test cases for comprehensive assessment.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-xs font-mono text-gray-700 border border-gray-200">
                <div className="text-blue-600 font-semibold">function</div>
                <div className="ml-2">solve(input) {`{`}</div>
                <div className="ml-4 text-green-600">// Your code here</div>
                <div className="ml-4 text-gray-500">return result;</div>
                <div className="ml-2">{`}`}</div>
              </div>
            </div>
          </motion.div>

          {/* Automatic Mailing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="bg-white rounded-2xl p-8 h-full border border-gray-200 hover:shadow-xl transition-all duration-300 shadow-lg">
              <div className="bg-green-500 p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Automatic Mailing System</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Streamlined email automation sends test invitations with custom templates, scheduling, and follow-up reminders automatically.
              </p>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="text-sm font-medium text-gray-900">Test Invitation Sent</div>
                </div>
                <div className="text-xs text-gray-600">To: candidate@company.com</div>
                <div className="text-xs text-gray-500 mt-1">Scheduled: Today 2:30 PM</div>
              </div>
            </div>
          </motion.div>

          {/* Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="bg-white rounded-2xl p-8 h-full border border-gray-200 hover:shadow-xl transition-all duration-300 shadow-lg">
              <div className="bg-purple-500 p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Intelligent Analytics</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Detailed performance analytics and intelligent reporting provide actionable insights for data-driven hiring decisions.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Overall Performance</span>
                  <span className="font-semibold text-purple-600">94%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "94%" }}
                    transition={{ delay: 0.5, duration: 1 }}
                    viewport={{ once: true }}
                    className="bg-purple-500 h-2 rounded-full"
                  ></motion.div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Code Quality: 92%</span>
                  <span>Time Efficiency: 96%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Real-time Monitoring */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 shadow-lg">
              <div className="bg-orange-500 p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Monitoring</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Live candidate monitoring with screen recording, keystroke analysis, and behavioral pattern detection for complete assessment integrity.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600">247 Active Sessions</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">100% Uptime</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enterprise Setup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 shadow-lg">
              <div className="bg-indigo-500 p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Zero Setup Enterprise</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Enterprise-ready platform with no setup fees, instant deployment, custom branding, and dedicated support for seamless integration.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">No Setup Fees</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">Custom Branding</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">API Access</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Transform Your Hiring?</h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Join 2,500+ companies already using our platform to hire the best technical talent with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Building2 className="w-5 h-5" />
                <span>Register Company</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-700 border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                Schedule Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;