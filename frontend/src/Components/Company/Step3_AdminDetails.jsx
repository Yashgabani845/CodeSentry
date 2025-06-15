"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Check } from "lucide-react"

const Step3_AdminUserDetails = ({ formData, updateFormData, prevStep, handleSubmit }) => {
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [localData, setLocalData] = useState({
    fullName: formData.fullName || "",
    designation: formData.designation || "",
    adminEmail: formData.adminEmail || "",
    password: formData.password || "",
    agreeToTerms: formData.agreeToTerms || false,
  })

  const validateForm = () => {
    const newErrors = {}

    if (!localData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!localData.designation.trim()) {
      newErrors.designation = "Designation is required"
    }

    if (!localData.adminEmail.trim()) {
      newErrors.adminEmail = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(localData.adminEmail)) {
      newErrors.adminEmail = "Please enter a valid email address"
    }

    if (!localData.password) {
      newErrors.password = "Password is required"
    } else if (localData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(localData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number"
    }

    if (!localData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      updateFormData(localData)
      await handleSubmit()
      setIsSubmitting(false)
    }
  }

  const handleChange = (field, value) => {
    setLocalData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const getPasswordStrength = () => {
    const password = localData.password
    let strength = 0

    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++

    return strength
  }

  const getStrengthColor = () => {
    const strength = getPasswordStrength()
    if (strength <= 2) return "bg-red-500"
    if (strength <= 3) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = () => {
    const strength = getPasswordStrength()
    if (strength <= 2) return "Weak"
    if (strength <= 3) return "Medium"
    return "Strong"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin User Details</h2>
        <p className="text-gray-600">Create your admin account to manage the platform</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            value={localData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        {/* Designation */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Designation *</label>
          <input
            type="text"
            value={localData.designation}
            onChange={(e) => handleChange("designation", e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.designation ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., CEO, HR Manager, CTO"
          />
          {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
        </div>

        {/* Admin Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            value={localData.adminEmail}
            onChange={(e) => handleChange("adminEmail", e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.adminEmail ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="your.email@company.com"
          />
          {errors.adminEmail && <p className="text-red-500 text-sm mt-1">{errors.adminEmail}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={localData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Create a strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {localData.password && (
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                    style={{ width: `${(getPasswordStrength() / 5) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{getStrengthText()}</span>
              </div>
            </div>
          )}

          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Terms Agreement */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={localData.agreeToTerms}
              onChange={(e) => handleChange("agreeToTerms", e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={prevStep}
            className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300"
            disabled={isSubmitting}
          >
            Previous Step
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Creating Account...
              </>
            ) : (
              <>
                <Check className="h-5 w-5" />
                Complete Registration
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default Step3_AdminUserDetails
