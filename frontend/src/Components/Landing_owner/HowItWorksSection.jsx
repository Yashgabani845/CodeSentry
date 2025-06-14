import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Settings, Send, BarChart3, ArrowRight, Clock, CheckCircle, Building2 } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Register Your Company',
      description: 'Quick 2-minute setup with custom branding and team configuration for your organization.',
      time: '2 min',
      features: [
        'Custom company branding',
        'Team member invitations',
        'Role-based permissions'
      ]
    },
    {
      icon: Settings,
      title: 'Create Custom Tests',
      description: 'Design coding challenges tailored to your specific requirements and skill assessments.',
      time: '10 min',
      features: [
        'Multiple programming languages',
        'Custom test cases and scoring',
        'Difficulty level configuration'
      ]
    },
    {
      icon: Send,
      title: 'Invite Candidates',
      description: 'Automated email invitations with personalized instructions and scheduling options.',
      time: '1 min',
      features: [
        'Bulk email automation',
        'Personalized test links',
        'Automated reminders'
      ]
    },
    {
      icon: BarChart3,
      title: 'Analyze Results',
      description: 'Comprehensive analytics and intelligent candidate ranking with detailed insights.',
      time: '5 min',
      features: [
        'Real-time performance tracking',
        'Automated candidate ranking',
        'Detailed skill assessment'
      ]
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-8 h-8 border-2 border-blue-200 rounded-lg opacity-30"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-32 left-16 w-6 h-6 bg-blue-100 rounded-full opacity-40"
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
            <Clock className="w-4 h-4 mr-2" />
            Simple Process
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From setup to hire in under 24 hours with our streamlined, intuitive process designed for efficiency.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} space-y-6`}>
                {/* Step Number & Time */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{step.time}</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">{step.description}</p>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  {step.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <step.icon className="w-5 h-5" />
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Visual */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} relative`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
                >
                  {/* Step Illustration */}
                  <div className="h-64 bg-gray-50 flex items-center justify-center relative">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                      <step.icon className="w-12 h-12 text-blue-600" />
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-blue-200 rounded-full opacity-50"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-blue-300 rounded-full opacity-30"></div>
                    <div className="absolute top-1/2 left-8 w-4 h-4 bg-blue-400 rounded-full opacity-40"></div>
                  </div>
                  
                  {/* Card Footer */}
                  <div className="p-6 bg-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">Step {index + 1}</div>
                        <div className="text-sm text-gray-600">{step.title}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Time Required</div>
                        <div className="font-semibold text-blue-600">{step.time}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="w-px h-16 bg-gray-300 origin-top"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Start Hiring Smarter Today
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of companies who have transformed their technical hiring process with our comprehensive platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Building2 className="w-5 h-5" />
                  <span>Register Company</span>
                  <ArrowRight className="w-5 h-5" />
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;