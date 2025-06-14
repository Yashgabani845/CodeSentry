"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Users } from "lucide-react"
import Navbar from "../Homepage/Navbar"
import Footer from "../Homepage/Footer"

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  return (
    <><Navbar /><section className="bg-white py-20 relative overflow-hidden pt-40">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%236366f1&quot; fillOpacity=&quot;0.03&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Header Section */}
              <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-6 border border-blue-200">
                      <Mail className="w-4 h-4" />
                      Get In Touch
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                      Contact <span className="text-blue-600">Our Team</span>
                  </h1>

                  
              </div>

              <div className="grid lg:grid-cols-2 gap-16 items-start">
                  {/* Contact Information */}
                  <div className="space-y-8">
                      <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-6">Let's Start a Conversation</h2>
                          <p className="text-gray-600 mb-8">
                              We're here to help you streamline your technical hiring process. Reach out to us through any of the
                              channels below, and we'll get back to you within 24 hours.
                          </p>
                      </div>

                      {/* Contact Cards */}
                      <div className="space-y-6">
                          {/* Email Card */}
                          <div className=" p-6 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
                              <div className="flex items-start space-x-4">
                                  <div className="bg-blue-600 p-3 rounded-xl">
                                      <Mail className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                                      <div className="space-y-1">
                                          <a
                                              href="mailto:gabaniyash845@gmail.com"
                                              className="text-blue-600 hover:text-blue-700 transition-colors block"
                                          >
                                              gabaniyash846@gmail.com
                                          </a>
                                          <a
                                              href="mailto:thakkarmeet2145@gmail.com"
                                              className="text-blue-600 hover:text-blue-700 transition-colors block"
                                          >
                                              thakkarmeet2145@gmail.com
                                          </a>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          {/* Phone Card */}
                          <div className=" p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300">
                              <div className="flex items-start space-x-4">
                                  <div className="bg-blue-600 p-3 rounded-xl">
                                      <Phone className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                                      <a
                                          href="tel:7046996816"
                                        className="text-blue-600 hover:text-blue-700 transition-colors block"
                                      >
                                          +91 7046996816
                                      </a>
                                     
                                  </div>
                              </div>
                          </div>

                          {/* Office Card */}
                          <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300">
                              <div className="flex items-start space-x-4">
                                  <div className="bg-blue-600 p-3 rounded-xl">
                                      <MapPin className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                                     
                                      <p className="text-gray-600 text-sm">Nadiad , Gujarat</p>
                                  </div>
                              </div>
                          </div>
                      </div>

                  
                  </div>

                  {/* Contact Form */}
                  <div className="relative">
                      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                          {/* Form Header */}
                          <div className="bg-blue-600  p-6">
                              <h3 className="text-xl font-semibold text-white mb-2">Send us a Message</h3>
                              <p className="text-blue-100 text-sm">Fill out the form below and we'll get back to you soon.</p>
                          </div>

                          {/* Form Content */}
                          <div className="p-6">
                              {isSubmitted ? (
                                  <div className="text-center py-8">
                                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                          <CheckCircle className="w-8 h-8 text-green-600" />
                                      </div>
                                      <h4 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h4>
                                      <p className="text-gray-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                                  </div>
                              ) : (
                                  <form onSubmit={handleSubmit} className="space-y-6">
                                      {/* Name Fields */}
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <div>
                                              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                                  First Name *
                                              </label>
                                              <input
                                                  type="text"
                                                  id="firstName"
                                                  name="firstName"
                                                  value={formData.firstName}
                                                  onChange={handleInputChange}
                                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                  placeholder="John"
                                                  required />
                                          </div>
                                          <div>
                                              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                                                  Last Name *
                                              </label>
                                              <input
                                                  type="text"
                                                  id="lastName"
                                                  name="lastName"
                                                  value={formData.lastName}
                                                  onChange={handleInputChange}
                                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                  placeholder="Doe"
                                                  required />
                                          </div>
                                      </div>

                                      {/* Email and Mobile */}
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          <div>
                                              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                  Email Address *
                                              </label>
                                              <input
                                                  type="email"
                                                  id="email"
                                                  name="email"
                                                  value={formData.email}
                                                  onChange={handleInputChange}
                                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                  placeholder="john@company.com"
                                                  required />
                                          </div>
                                          <div>
                                              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                                                  Mobile Number *
                                              </label>
                                              <input
                                                  type="tel"
                                                  id="mobile"
                                                  name="mobile"
                                                  value={formData.mobile}
                                                  onChange={handleInputChange}
                                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                  placeholder="+91 9876543210"
                                                  required />
                                          </div>
                                      </div>

                                      {/* Subject */}
                                      <div>
                                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                              Subject *
                                          </label>
                                          <input
                                              type="text"
                                              id="subject"
                                              name="subject"
                                              value={formData.subject}
                                              onChange={handleInputChange}
                                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                              placeholder="How can we help you?"
                                              required />
                                      </div>

                                      {/* Message */}
                                      <div>
                                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                              Message *
                                          </label>
                                          <textarea
                                              id="message"
                                              name="message"
                                              value={formData.message}
                                              onChange={handleInputChange}
                                              rows={5}
                                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                              placeholder="Tell us more about your requirements..."
                                              required
                                          ></textarea>
                                      </div>

                                      {/* Submit Button */}
                                      <button
                                          type="submit"
                                          disabled={isSubmitting}
                                          className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                      >
                                          {isSubmitting ? (
                                              <>
                                                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                  Sending Message...
                                              </>
                                          ) : (
                                              <>
                                                  <Send className="w-5 h-5 mr-2" />
                                                  Send Message
                                              </>
                                          )}
                                      </button>
                                  </form>
                              )}
                          </div>
                      </div>

                  
                  </div>
              </div>

              
          </div>
      </section>
      <Footer/>
      </>
  )
}

export default ContactUs
