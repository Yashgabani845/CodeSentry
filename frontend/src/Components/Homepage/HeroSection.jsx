import React, { useState } from 'react';

const HeroSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      window.location.href = '/signup?email=' + encodeURIComponent(email);
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary-700 to-secondary-700 pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Secure & Reliable Coding Assessments for Your Hiring Process
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            CodeSentry provides an all-in-one platform for technical interviews,
            coding assessments, and skills evaluation with advanced anti-cheating measures.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
              type="email"
              placeholder="Enter your work email"
              className="px-5 py-3 rounded-lg w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit"
              className="bg-white text-primary-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Get Started
            </button>
          </form>
          
          <div className="flex items-center text-white/80 text-sm">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span>Free 14-day trial • No credit card required</span>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-gray-800 py-2 px-4 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-4 text-white text-sm font-mono">CodeSentry Live Environment</div>
            </div>
            <div className="bg-gray-900 p-4 font-mono text-sm text-green-400 h-64 overflow-y-auto">
              <p><span className="text-blue-400">function</span> <span className="text-yellow-300">sortArray</span>(<span className="text-orange-300">arr</span>) {'{'}</p>
              <p>&nbsp;&nbsp;<span className="text-blue-400">if</span> (!arr || arr.length === 0) {'{'}</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">return</span> [];</p>
              <p>&nbsp;&nbsp;{'}'}</p>
              <p>&nbsp;&nbsp;<span className="text-blue-400">return</span> arr.sort(<span className="text-orange-300">(a, b) =</span>( a - b));</p>
              <p>{'}'}</p>
              <br/>
              <p><span className="text-gray-500">Test your function</span></p>
              <p><span className="text-yellow-300">const</span> numbers = [5, 3, 8, 1, 2];</p>
              <p><span className="text-yellow-300">const</span> sorted = sortArray(numbers);</p>
              <p>console.log(sorted); <span className="text-gray-500">// [1, 2, 3, 5, 8]</span></p>
            
            </div>
          </div>
          
          <div className="absolute -bottom-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
            <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm font-medium">Live Monitoring Active</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-8 items-center">
          <div className="text-center text-white/90">
            <p className="text-sm uppercase font-semibold mb-2 text-white/70">Trusted by leading companies</p>
          </div>
          {['Tech Inc.', 'DevCorp', 'CodeMasters', 'InnovateSoft', 'ByteWorks'].map((company) => (
            <div key={company} className="text-white/90 text-lg font-semibold">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;