"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, X } from 'lucide-react'

const Step2_CompanyDescription = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({})
  const [logoPreview, setLogoPreview] = useState(null)
  const [localData, setLocalData] = useState({
    description: formData.description || "",
    linkedinUrl: formData.linkedinUrl || "",
    companyLogo: formData.companyLogo || null,
  })

  const validateForm = () => {
    const newErrors = {}

    if (!localData.description.trim()) {
      newErrors.description = "Company description is required"
    } else if (localData.description.trim().length < 50) {
      newErrors.description = "Description should be at least 50 characters"
    }

    if (localData.linkedinUrl && !/^https?:\/\/(www\.)?linkedin\.com\/company\/.+/.test(localData.linkedinUrl)) {
      newErrors.linkedinUrl = "Please enter a valid LinkedIn company URL"
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setErrors((prev) => ({ ...prev, companyLogo: "File size should be less than 5MB" }))
        return
      }

      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, companyLogo: "Please upload an image file" }))
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target.result)
      }
      reader.readAsDataURL(file)

      handleChange("companyLogo", file)
      setErrors((prev) => ({ ...prev, companyLogo: "" }))
    }
  }

  const removeLogo = () => {
    setLogoPreview(null)
    handleChange("companyLogo", null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Company Profile</h2>
        <p className="text-gray-600">Help candidates learn more about your company</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Company Description / About Us *</label>
          <textarea
            value={localData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={6}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Tell us about your company, mission, values, and what makes you unique..."
          />
          <div className="flex justify-between items-center mt-1">
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            <p className="text-gray-400 text-sm ml-auto">{localData.description.length}/500 characters</p>
          </div>
        </div>

        {/* LinkedIn URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn Company Page</label>
          <input
            type="url"
            value={localData.linkedinUrl}
            onChange={(e) => handleChange("linkedinUrl", e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.linkedinUrl ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="https://www.linkedin.com/company/your-company"
          />
          {errors.linkedinUrl && <p className="text-red-500 text-sm mt-1">{errors.linkedinUrl}</p>}
        </div>

        {/* Company Logo Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Company Logo</label>

          {!logoPreview ? (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" id="logo-upload" />
              <label htmlFor="logo-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Click to upload your company logo</p>
                <p className="text-sm text-gray-400">PNG, JPG, GIF up to 5MB</p>
              </label>
            </div>
          ) : (
            <div className="relative inline-block">
              <img
                src={logoPreview || "/placeholder.svg"}
                alt="Company Logo Preview"
                className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200"
              />
              <button
                type="button"
                onClick={removeLogo}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {errors.companyLogo && <p className="text-red-500 text-sm mt-1">{errors.companyLogo}</p>}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={prevStep}
            className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300"
          >
            Previous Step
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Continue to Next Step
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default Step2_CompanyDescription
