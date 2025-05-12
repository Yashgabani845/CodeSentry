const AISection = () => {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">AI-Powered Cheating Detection</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our advanced AI technology monitors and analyzes candidate behavior in real-time to ensure the integrity of your technical assessments.
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Advanced Pattern Recognition</h3>
                    <p className="mt-2 text-gray-600">
                      Our AI identifies patterns in coding behavior that suggest potential plagiarism or unauthorized assistance.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Real-time Facial Analysis</h3>
                    <p className="mt-2 text-gray-600">
                      Detect multiple people, gaze direction, and suspicious movements during assessment sessions.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Intelligent Audio Monitoring</h3>
                    <p className="mt-2 text-gray-600">
                      Detect conversations, background noise, and other audio indicators of potential collaboration.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Comprehensive Reporting</h3>
                    <p className="mt-2 text-gray-600">
                      Receive detailed reports of all detected anomalies with timestamps and confidence scores.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-secondary-600 to-primary-700 rounded-2xl shadow-xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">AI Proctoring Report</h3>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Copy-Paste Detection</span>
                      <span className="px-2 py-1 bg-red-500 rounded text-xs font-semibold">High Risk</span>
                    </div>
                    <p className="text-sm text-white/80">Multiple instances of external code pasting detected at 14:32, 14:45</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Facial Analysis</span>
                      <span className="px-2 py-1 bg-yellow-400 text-yellow-900 rounded text-xs font-semibold">Medium Risk</span>
                    </div>
                    <p className="text-sm text-white/80">Frequent off-screen gaze detected, possible reference to external materials</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Audio Analysis</span>
                      <span className="px-2 py-1 bg-green-500 rounded text-xs font-semibold">Low Risk</span>
                    </div>
                    <p className="text-sm text-white/80">No suspicious audio detected during assessment session</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">AI Code Similarity</span>
                      <span className="px-2 py-1 bg-red-500 rounded text-xs font-semibold">High Risk</span>
                    </div>
                    <p className="text-sm text-white/80">85% match with online solution from stackoverflow.com</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <span className="block text-sm font-semibold mb-2">Overall Assessment Integrity</span>
                  <div className="w-full bg-white/20 rounded-full h-4 mb-2">
                    <div className="bg-red-500 h-4 rounded-full w-[35%]"></div>
                  </div>
                  <span className="text-lg font-bold">35% - Review Recommended</span>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center animate-pulse-slow">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default AISection;