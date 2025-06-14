import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Users, Star } from 'lucide-react';

const CallToActionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 opacity-20"
      >
        <Rocket className="w-12 h-12 text-white" />
      </motion.div>
      
      <motion.div
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 opacity-20"
      >
        <Users className="w-16 h-16 text-white" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Main Headline */}
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Ready to Transform
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Your Hiring Process?
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Join thousands of companies who have revolutionized their technical hiring with our comprehensive assessment platform
          </p>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 md:gap-8 mt-12 mb-12"
          >
            <div className="flex items-center space-x-2 text-white">
              <Star className="w-5 h-5 text-yellow-300" />
              <span>30-day free trial</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Star className="w-5 h-5 text-yellow-300" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Star className="w-5 h-5 text-yellow-300" />
              <span>24/7 support</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Star className="w-5 h-5 text-yellow-300" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 flex items-center space-x-2"
            >
              <span>Register Your Company Today</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Schedule a Demo
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-16 text-blue-100"
          >
            <p className="text-sm mb-6">Trusted by 2,000+ companies worldwide</p>
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-xs text-blue-200">Assessments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-xs text-blue-200">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div className="text-xs text-blue-200">Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Urgency Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
            className="mt-12 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto"
          >
            <p className="text-white font-medium">
              🚀 <strong>Limited Time:</strong> Get 3 months free when you sign up before the end of this month!
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 md:h-20 fill-current text-gray-100" viewBox="0 0 1440 120">
          <path d="m0,0l40,10c40,10 120,30 200,35c80,5 160,-5 240,-5c80,0 160,10 240,15c80,5 160,5 240,10c80,5 160,15 240,15c80,0 160,-10 240,-15c80,-5 160,-5 200,-5l40,0l0,70l-40,0c-40,0 -120,0 -200,0c-80,0 -160,0 -240,0c-80,0 -160,0 -240,0c-80,0 -160,0 -240,0c-80,0 -160,0 -240,0c-80,0 -160,0 -240,0c-80,0 -160,0 -200,0l-40,0z" />
        </svg>
      </div>
    </section>
  );
};

export default CallToActionSection;