const CTASection = () => {
    return (
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Technical Interviews?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join hundreds of companies that trust CodeSentry for their technical hiring process.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <a 
              href="/signup" 
              className="px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300"
            >
              Start Free Trial
            </a>
            <a 
              href="/demo" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300"
            >
              Request Demo
            </a>
          </div>
          
          <p className="text-white/80 text-sm">
            No credit card required • 14-day free trial • Full platform access
          </p>
        </div>
      </section>
    );
  };
  
  export default CTASection;