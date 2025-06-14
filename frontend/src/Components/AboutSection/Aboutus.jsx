
"use client"

import { useState } from "react"
import { Users, Target, Award, Lightbulb, Shield, Heart, Globe } from "lucide-react"
import yash from "./yash.jpg"
import meet from "./meet.png"
import Navbar from "../Homepage/Navbar"
import Footer from "../Homepage/Footer"

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("mission")

  const teamMembers = [
    {
      name: "Yash Gabani",
      image: yash,
      description: "Full-stack developer passionate about streamlining hiring.",
      email: "gabaniyash845@gmail.com",
    },
    {
      name: "Meet Thakkar",
      image: meet,
      description: "Developer focused on building secure and scalable solutions.",
      email: "thakkarmeet2145@gmail.com",
    },
  ]

  const milestones = [
    {
      year: "2025",
      title: "Made in 2025",
      description: "This project was built by two passionate developers to change the way hiring works.",
    },
    {
      year: "Future",
      title: "Looking Ahead",
      description: "We aim to achieve the best results and build strong collaborations with clients.",
    },
  ]

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description:
        "We prioritize data security and privacy in every aspect of our platform, ensuring your hiring process remains confidential and protected.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Constantly pushing boundaries with cutting-edge technology to solve complex hiring challenges and improve recruitment outcomes.",
    },
    {
      icon: Heart,
      title: "People-Centric",
      description:
        "We believe great hiring starts with understanding people. Our platform is designed to reveal true potential beyond traditional metrics.",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description:
        "Empowering companies worldwide to build diverse, talented teams through fair and comprehensive assessment methods.",
    },
  ]

  return (
    <><Navbar /><section className="bg-white py-20 relative overflow-hidden pt-40">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%232563eb&quot; fillOpacity=&quot;0.03&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6 border border-blue-200">
            <Users className="w-4 h-4" />
            About HireTech
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Transforming <span className="text-blue-600">Technical Hiring</span>
            <br />
            One Assessment at a Time
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            We're on a mission to make technical hiring more efficient, fair, and insightful. Our platform combines
            cutting-edge technology with human expertise to help companies identify and hire the best technical talent.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-20">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
  alt="HireTech team working together"
  width={800}
  height={400}
  className="w-full h-96 object-cover"
/>

     
           
          </div>
        </div>

        {/* Mission, Vision, Story Tabs */}
        <div className="mb-20">
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-xl">
              {["mission", "vision", "story"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 capitalize ${activeTab === tab ? "bg-blue-600 text-white shadow-lg" : "text-gray-600 hover:text-gray-900"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {activeTab === "mission" && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To revolutionize technical hiring by providing comprehensive, secure, and intelligent assessment
                  solutions that help companies identify true technical potential while ensuring a fair and transparent
                  evaluation process for all candidates.
                </p>
              </div>
            )}

            {activeTab === "vision" && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To become the global standard for technical talent assessment, creating a world where hiring decisions
                  are based on actual skills and potential rather than bias or incomplete information.
                </p>
              </div>
            )}

            {activeTab === "story" && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Our Story</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Founded in 2020 by experienced technologists who witnessed the challenges of hiring, HireTech was born
                  to eliminate bias and elevate skill-based hiring for a better future.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape how we build our products and serve our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Meet the Developers</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Built in 2025 by two developers with a shared vision: to provide a simple and effective hiring process.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100 w-64"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="w-40 h-40 object-cover rounded-full mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{member.description}</p>
                <a href={`mailto:${member.email}`} className="text-blue-600 text-sm underline">
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Key milestones that have shaped our company and platform over the years.
            </p>
          </div>

          <div className="relative space-y-12">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200 z-0"></div>
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
              >
                <div className="w-1/2 p-6">
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <h4 className="text-blue-600 font-semibold mb-2">{milestone.year}</h4>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    
    </section>
    <Footer/>
    </>
  )
}

export default AboutUs
