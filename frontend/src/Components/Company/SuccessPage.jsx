"use client"
import { motion } from "framer-motion"
import { CheckCircle, ArrowRight, Mail, Settings } from "lucide-react"

const SuccessPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-8"
      >
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Registration Successful! 🎉</h2>
        <p className="text-xl text-gray-600 mb-6">
          Welcome to HireTech! Your company account has been created successfully.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-center gap-2 text-blue-700 mb-2">
            <Mail className="h-5 w-5" />
            <span className="font-semibold">Check Your Email</span>
          </div>
          <p className="text-blue-600 text-sm">
            We've sent a verification email to your registered email address. Please verify your email to activate your
            account.
          </p>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h3>
        <div className="grid md:grid-cols-2 gap-4 text-left">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <h4 className="font-semibold text-gray-900">Verify Email</h4>
            </div>
            <p className="text-gray-600 text-sm">Click the verification link in your email to activate your account</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">2</span>
              </div>
              <h4 className="font-semibold text-gray-900">Setup Dashboard</h4>
            </div>
            <p className="text-gray-600 text-sm">Complete your profile and start creating your first assessment</p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <button className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
          <Settings className="h-5 w-5" />
          Go to Dashboard
          <ArrowRight className="h-5 w-5" />
        </button>

        <button className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center gap-2">
          <Mail className="h-5 w-5" />
          Resend Verification Email
        </button>
      </motion.div>

      {/* Support */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 pt-6 border-t border-gray-200"
      >
        <p className="text-gray-500 text-sm">
          Need help getting started?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-800 underline">
            Contact our support team
          </a>{" "}
          or{" "}
          <a href="#" className="text-blue-600 hover:text-blue-800 underline">
            view our documentation
          </a>
        </p>
      </motion.div>
    </motion.div>
  )
}

export default SuccessPage
