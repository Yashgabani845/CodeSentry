"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LogIn, UserPlus, Shield, Code, Users, Zap } from "lucide-react"
import LoginForm from "./LoginForm"
import CompanyRegisterPage from "./CompanyRegistration"

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true) // Default to login

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
  }

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 },
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-200/40 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-200/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-cyan-200/30 rounded-full blur-xl animate-bounce"></div>
        
        {/* Grid Pattern */}
      </div>

      {/* Hero Header */}
      <div className="relative z-10 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-12 overflow-hidden">
        {/* Header Background Pattern */}
        
        {/* Floating Icons */}
        <div className="absolute top-10 left-20 text-blue-300/30">
          <Shield className="w-16 h-16 animate-float" />
        </div>
        <div className="absolute top-16 right-32 text-indigo-300/30">
          <Code className="w-12 h-12 animate-bounce" />
        </div>
        <div className="absolute bottom-10 left-1/4 text-cyan-300/30">
          <Users className="w-14 h-14 animate-pulse" />
        </div>
        <div className="absolute bottom-16 right-20 text-purple-300/30">
          <Zap className="w-10 h-10 animate-ping" />
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-blue-100 text-sm font-medium">
              <Shield className="w-4 h-4 mr-2" />
              🚀 Next-Gen Hiring Platform
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
              HireTech
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {isLogin
              ? "Sign in to your account and manage your hiring process with advanced AI-powered tools"
              : "Join thousands of companies revolutionizing their hiring process with cutting-edge technology"}
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-100 text-sm">
              <Code className="w-4 h-4 mr-2" />
              Live Coding Tests
            </div>
            <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-100 text-sm">
              <Shield className="w-4 h-4 mr-2" />
              Anti-Cheat Detection
            </div>
            <div className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-100 text-sm">
              <Users className="w-4 h-4 mr-2" />
              AI-Powered Analysis
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Illustration - FIXED POSITION */}
          <div className="hidden lg:block">
            <div className="sticky top-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="h-[600px] flex items-center justify-center"
              >
                <div className="relative">
                  {/* Main Illustration Container */}
                  <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 shadow-2xl border border-blue-100 w-full max-w-md">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Team collaboration"
                      className="w-full h-64 object-cover rounded-2xl mb-6"
                    />
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">500+</div>
                        <div className="text-sm text-gray-600">Companies</div>
                      </div>
                      <div className="bg-indigo-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-indigo-600">50K+</div>
                        <div className="text-sm text-gray-600">Assessments</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-xl shadow-lg">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-purple-500 text-white p-3 rounded-xl shadow-lg">
                    <Code className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side - Auth Forms */}
          <div className="w-full flex flex-col">
            {/* Auth Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/50">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      isLogin
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
                    }`}
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      !isLogin
                        ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg transform scale-105"
                        : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50"
                    }`}
                  >
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Form Container - FLEXIBLE HEIGHT */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? "login" : "signup"}
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="w-full"
                >
                  {isLogin ? (
                    <LoginForm toggleAuthMode={toggleAuthMode} />
                  ) : (
                    <CompanyRegisterPage toggleAuthMode={toggleAuthMode} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-20 fill-blue-600/10">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </div>
  )
}

// Add custom animations
const style = document.createElement("style")
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`
document.head.appendChild(style)

export default AuthPage
