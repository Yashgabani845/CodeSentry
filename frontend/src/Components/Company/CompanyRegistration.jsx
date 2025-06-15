import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Step1_CompanyDetails from './Step1_CompanyDetails';
import Step2_CompanyDescription from './Step2_CompanyDescription';
import Step3_AdminUserDetails from './Step3_AdminDetails';
import SuccessPage from './SuccessPage';

const CompanyRegisterPage = ({ toggleAuthMode }) => {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState({
      // Step 1 data
      companyName: "",
      companyEmail: "",
      website: "",
      industry: "",
      companySize: "",
      establishedYear: "",
  
      // Step 2 data
      description: "",
      linkedinUrl: "",
      companyLogo: null,
  
      // Step 3 data
      fullName: "",
      designation: "",
      adminEmail: "",
      password: "",
      agreeToTerms: false,
    })
  
    const totalSteps = 3
  
    const updateFormData = (stepData) => {
      setFormData((prev) => ({ ...prev, ...stepData }))
    }
  
    const nextStep = () => {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1)
      }
    }
  
    const prevStep = () => {
      if (currentStep > 1) {
        setCurrentStep((prev) => prev - 1)
      }
    }
  
    const handleSubmit = async () => {
      try {
        // Submit to backend
        const response = await fetch("/api/register-company", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
  
        if (response.ok) {
          setCurrentStep(4) // Success page
        }
      } catch (error) {
        console.error("Registration failed:", error)
      }
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
  
    const renderStep = () => {
      switch (currentStep) {
        case 1:
          return <Step1_CompanyDetails formData={formData} updateFormData={updateFormData} nextStep={nextStep} />
        case 2:
          return (
            <Step2_CompanyDescription
              formData={formData}
              updateFormData={updateFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )
        case 3:
          return (
            <Step3_AdminUserDetails
              formData={formData}
              updateFormData={updateFormData}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
            />
          )
        case 4:
          return <SuccessPage />
        default:
          return null
      }
    }
  
    // Show only the form without header and progress for multi-step
    if (currentStep <= totalSteps) {
      return (
        <div>
          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="flex items-center justify-center mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step <= currentStep
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-12 h-1.5 mx-2 rounded-full transition-all duration-300 ${
                        step < currentStep ? "bg-gradient-to-r from-blue-500 to-indigo-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <span className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
          </motion.div>
  
          {/* Form Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
  
          {/* Login Link */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={toggleAuthMode}
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                >
                  Sign in here
                </button>
              </p>
            </motion.div>
          )}
        </div>
      )
    }
  
    // Success page
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    )
  }
  
  export default CompanyRegisterPage
  