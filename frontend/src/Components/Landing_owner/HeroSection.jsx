import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle, Shield, Users, Zap, Building2 } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
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
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-16 h-16 border-2 border-blue-200 rounded-xl opacity-30"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            x: [0, -80, 0],
            y: [0, 80, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-32 left-16 w-12 h-12 bg-blue-100 rounded-full opacity-40"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 right-8 w-8 h-8 border-2 border-blue-300 rotate-45 opacity-25"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:pr-8"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-6 py-3 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-semibold shadow-sm"
            >
              <Shield className="w-4 h-4 mr-2" />
              Trusted by 2,500+ Companies Worldwide
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900"
            >
              Transform Your
              <br />
              <span className="text-blue-600 relative">
                Hiring Process
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" fill="none">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.2, duration: 1.5 }}
                    d="M5 7c50-3 100-3 150 0s100 3 140-2"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl text-gray-600 leading-relaxed max-w-2xl"
            >
              Conduct secure coding assessments with AI-powered anti-cheating technology, automated workflows, and intelligent analytics. Scale your technical hiring with complete confidence.
            </motion.p>

            {/* Key Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl border border-green-100 shadow-sm">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">97% Accuracy</div>
                  <div className="text-sm text-gray-600">Face Recognition</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">90%+ Detection</div>
                  <div className="text-sm text-gray-600">Cheating Prevention</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl border border-purple-100 shadow-sm">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Auto Workflow</div>
                  <div className="text-sm text-gray-600">Email & Reports</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-xl border border-orange-100 shadow-sm">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">No Setup Fees</div>
                  <div className="text-sm text-gray-600">Enterprise Ready</div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Building2 className="w-5 h-5" />
                <span>Register Company</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center space-x-2 text-gray-700 border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>

          
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 1.2 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Professional team collaboration"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-blue-600 bg-opacity-10"></div>
              </motion.div>

              {/* Floating Dashboard Card */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 max-w-sm"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Assessment Complete</div>
                    <div className="text-sm text-gray-500">JavaScript Developer</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">95%</div>
                    <div className="text-xs text-gray-600">Score</div>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">45m</div>
                    <div className="text-xs text-gray-600">Time</div>
                  </div>
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">100%</div>
                    <div className="text-xs text-gray-600">Valid</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Live Candidates</div>
                    <div className="text-2xl font-bold text-orange-600">247</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Background Accent */}
            <div className="absolute -inset-4 bg-blue-50 rounded-3xl -z-10 opacity-50"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;