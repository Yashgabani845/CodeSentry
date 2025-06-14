import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Users, TrendingUp, Shield, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'TechCorp',
    content: 'The face recognition technology gave us complete confidence in our remote assessments. We saw a 40% improvement in hiring quality.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    companyLogo: '🏢'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Talent Acquisition Lead',
    company: 'StartupXYZ',
    content: 'The automatic mailing system saved us 20+ hours per week. The scalable coding environment perfectly matches our tech stack.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    companyLogo: '🚀'
  },
  {
    name: 'Emily Johnson',
    role: 'HR Director',
    company: 'Global Solutions',
    content: 'With 90%+ detection accuracy, we eliminated cheating concerns completely. The analytics help us make data-driven decisions.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    companyLogo: '🌐'
  }
];

const stats = [
  { 
    icon: Users, 
    value: '2,000+', 
    label: 'Companies Trust Us',
    description: 'From startups to enterprises',
    color: 'blue'
  },
  { 
    icon: Award, 
    value: '50,000+', 
    label: 'Tests Completed',
    description: 'Successful assessments delivered',
    color: 'green'
  },
  { 
    icon: TrendingUp, 
    value: '90%+', 
    label: 'Detection Accuracy',
    description: 'Anti-cheating effectiveness',
    color: 'purple'
  },
  { 
    icon: Star, 
    value: '4.9/5', 
    label: 'Customer Rating',
    description: 'Based on 500+ reviews',
    color: 'orange'
  }
];

const WhyTrustUsSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of companies who have transformed their hiring process with our platform
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center"
            >
              <div className={`inline-flex p-4 rounded-full mb-6 ${
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                'bg-orange-100 text-orange-600'
              }`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-gray-900 mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Customers Say
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 bg-blue-500 p-3 rounded-full shadow-lg">
                  <Quote className="w-6 h-6 text-white" />
                </div>

                {/* Star Rating */}
                <div className="flex mb-6 mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Content */}
                <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-gray-200"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-2xl">{testimonial.companyLogo}</span>
                      <span className="text-blue-600 font-semibold">{testimonial.company}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security & Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 rounded-3xl p-8 md:p-12 border border-blue-100"
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Enterprise-Grade Security & Compliance
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your data and assessments are protected by industry-leading security standards and compliance certifications
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'SOC 2 Type II', icon: Shield, color: 'green' },
              { name: 'GDPR Compliant', icon: Shield, color: 'blue' },
              { name: 'ISO 27001', icon: Shield, color: 'purple' },
              { name: 'CCPA Ready', icon: Shield, color: 'red' }
            ].map((cert, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group cursor-pointer"
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                  cert.color === 'green' ? 'bg-green-100 text-green-600' :
                  cert.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  cert.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  <cert.icon className="w-10 h-10" />
                </div>
                <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {cert.name}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Security Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">256-bit</div>
              <div className="text-gray-700">SSL Encryption</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">99.9%</div>
              <div className="text-gray-700">Uptime SLA</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-700">Security Monitoring</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyTrustUsSection;