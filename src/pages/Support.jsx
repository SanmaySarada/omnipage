import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Support() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`flex min-h-svh flex-col cohesive-gradient ${isLoaded ? 'animate-in' : 'page-load-animate'}`}>
      <div className="grow">
        <main className="relative overflow-hidden md:overflow-visible">
          <Navbar isLoaded={isLoaded} />
          <section className="py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 
                style={{fontFamily: "'EB Garamond', 'EB Garamond Fallback', serif", animationDelay: isLoaded ? '0.5s' : '0s'}} 
                className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
              >
                Omni Support
              </h1>
              <div 
                style={{animationDelay: isLoaded ? '0.6s' : '0s'}} 
                className={`text-white space-y-8 ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
              >
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/90">
                  We're here to help.
                </p>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/90">
                  If you have questions about Omni, need assistance with your account, or want to report a bug or issue, please reach out and we'll get back to you as soon as possible.
                </p>
                
                <div className="space-y-6 mt-12">
                  <h2 className="text-2xl md:text-3xl font-semibold text-white">Contact Support</h2>
                  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-400/30 flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/70 uppercase tracking-wider">Email</p>
                        <a 
                          href="mailto:josh29@stanford.edu" 
                          className="text-2xl md:text-3xl font-semibold text-white hover:text-purple-300 transition-colors inline-flex items-center gap-2 group"
                        >
                          <span>josh29@stanford.edu</span>
                          <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-white/10">
                      <p className="text-base md:text-lg text-white/90 mb-4">
                        When contacting support, please include:
                      </p>
                      <ul className="list-none space-y-3 text-base md:text-lg text-white/90">
                        <li className="flex items-start gap-3">
                          <span className="text-purple-300 mt-1">•</span>
                          <span>The email associated with your Omni account</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-purple-300 mt-1">•</span>
                          <span>A brief description of the issue or question</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-purple-300 mt-1">•</span>
                          <span>Screenshots or screen recordings (if applicable)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 mt-12">
                  <h2 className="text-2xl md:text-3xl font-semibold text-white">Common Topics We Can Help With</h2>
                  <ul className="list-disc list-inside space-y-2 text-base md:text-lg lg:text-xl text-white/90 ml-4">
                    <li>Account access or sign-in issues</li>
                    <li>Card and rewards recommendations</li>
                    <li>Location-based card suggestions</li>
                    <li>Data accuracy or missing transactions</li>
                    <li>Feature requests or feedback</li>
                    <li>Privacy or data-related questions</li>
                  </ul>
                </div>

                <div className="space-y-4 mt-12">
                  <h2 className="text-2xl md:text-3xl font-semibold text-white">Response Time</h2>
                  <p className="text-base md:text-lg lg:text-xl text-white/90">
                    We typically respond within 24–48 hours during business days.
                  </p>
                </div>

                <div className="mt-16">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
                  >
                    <svg 
                      className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-base md:text-lg font-medium text-white">Back to Home</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Support
