"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const Step1_CompanyDetails = ({ formData, updateFormData, nextStep }) => {
  const [errors, setErrors] = useState({})
  const [localData, setLocalData] = useState({
    companyName: formData.companyName || "",
    companyEmail: formData.companyEmail || "",
    website: formData.website || "",
    industry: formData.industry || "",
    companySize: formData.companySize || "",
    establishedYear: formData.establishedYear || "",
  })

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Consulting",
    "Media & Entertainment",
    "Real Estate",
    "Other",
  ]

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
  ]

  const validateForm = () => {
    const newErrors = {}

    if (!localData.companyName.trim()) {
      newErrors.companyName = "Company name is required"
    }

    if (!localData.companyEmail.trim()) {
      newErrors.companyEmail = "Company email is required"
    } else if (!/\S+@\S+\.\S+/.test(localData.companyEmail)) {
      newErrors.companyEmail = "Please enter a valid email address"
    }

    if (!localData.website.trim()) {
      newErrors.website = "Website is required"
    } else if (!/^https?:\/\/.+\..+/.test(localData.website)) {
      newErrors.website = "Please enter a valid website URL"
    }

    if (!localData.industry) {
      newErrors.industry = "Please select an industry"
    }

    if (!localData.companySize) {
      newErrors.companySize = "Please select company size"
    }

    if (!localData.establishedYear) {
      newErrors.establishedYear = "Established year is required"
    } else if (localData.establishedYear < 1800 || localData.establishedYear > new Date().getFullYear()) {
      newErrors.establishedYear = "Please enter a valid year"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      updateFormData(localData)
      nextStep()
    }
  }

  const handleChange = (field, value) => {
    setLocalData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/50"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Company Details</h2>
        <p className="text-gray-600">Tell us about your company</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
          <input
            type="text"
            value={localData.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
            className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 ${
              errors.companyName ? "border-red-300 bg-red-50/50" : "border-gray-200 hover:border-gray-300"
            }`}
            placeholder="Enter your company name"
          />
          {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
        </div>

        {/* Company Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Company Email *</label>
          <input
            type="email"
            value={localData.companyEmail}
            onChange={(e) => handleChange("companyEmail", e.target.value)}
            className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 ${
              errors.companyEmail ? "border-red-300 bg-red-50/50" : "border-gray-200 hover:border-gray-300"
            }`}
            placeholder="company@example.com"
          />
          {errors.companyEmail && <p className="text-red-500 text-sm mt-1">{errors.companyEmail}</p>}
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Official Website *</label>
          <input
            type="url"
            value={localData.website}
            onChange={(e) => handleChange("website", e.target.value)}
            className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 ${
              errors.website ? "border-red-300 bg-red-50/50" : "border-gray-200 hover:border-gray-300"
            }`}
            placeholder="https://www.yourcompany.com"
          />
          {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Industry / Domain *</label>
          <select
            value={localData.industry}
            onChange={(e) => handleChange("industry", e.target.value)}
            className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 ${
              errors.industry ? "border-red-300 bg-red-50/50" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <option value="">Select your industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
        </div>

        {/* Company Size */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Company Size *</label>
          <select
            value={localData.companySize}
            onChange={(e) => handleChange("companySize", e.target.value)}
            className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 ${
              errors.companySize ? "border-red-300 bg-red-50/50" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <option value="">Select company size</option>
            {companySizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          {errors.companySize && <p className="text-red-500 text-sm mt-1">{errors.companySize}</p>}
        </div>

        {/* Established Year */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Established Year *</label>
          <input
            type="number"
            value={localData.establishedYear}
            onChange={(e) => handleChange("establishedYear", Number.parseInt(e.target.value))}
            className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 ${
              errors.establishedYear ? "border-red-300 bg-red-50/50" : "border-gray-200 hover:border-gray-300"
            }`}
            placeholder="2020"
            min="1800"
            max={new Date().getFullYear()}
          />
          {errors.establishedYear && <p className="text-red-500 text-sm mt-1">{errors.establishedYear}</p>}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Continue to Next Step
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default Step1_CompanyDetails
