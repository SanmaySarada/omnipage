import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TuitionNavbar from '../components/TuitionNavbar'
import TuitionFooter from '../components/TuitionFooter'

function Support() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-svh flex-col cohesive-gradient">
      <div className="grow">
        <main className="relative">
          <TuitionNavbar />
          <section className="py-32 px-6">
            <div className="max-w-4xl mx-auto">
              <h1 
                style={{ animationDelay: isLoaded ? '0.1s' : '0s' }}
                className={`text-4xl md:text-5xl font-serif font-light text-white mb-6 ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
              >
                Omni Support
              </h1>
              <div className="text-slate-400 space-y-8">
                <p 
                  style={{ animationDelay: isLoaded ? '0.2s' : '0s' }}
                  className={`text-base text-slate-400 font-light leading-relaxed font-sans ${isLoaded ? 'animate-fade-in' : ''}`}
                >
                  We're here to help.
                </p>
                <p 
                  style={{ animationDelay: isLoaded ? '0.3s' : '0s' }}
                  className={`text-base text-slate-400 font-light leading-relaxed font-sans ${isLoaded ? 'animate-fade-in' : ''}`}
                >
                  If you have questions about Omni, need assistance with your account, or want to report a bug or issue, please reach out and we'll get back to you as soon as possible.
                </p>
                
                <div 
                  style={{ animationDelay: isLoaded ? '0.4s' : '0s' }}
                  className={`space-y-6 mt-12 ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
                >
                  <h2 className="text-2xl md:text-3xl font-serif font-light text-white">Contact Support</h2>
                  <div 
                    style={{ animationDelay: isLoaded ? '0.5s' : '0s' }}
                    className={`bg-surface/50 rounded-xl border border-white/5 p-8 space-y-6 ${isLoaded ? 'animate-fade-in' : ''}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                        <span className="material-symbols-outlined text-accent text-xl">email</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Email</p>
                        <a 
                          href="mailto:josh29@stanford.edu" 
                          className="text-xl md:text-2xl font-medium text-white hover:text-accent transition-colors inline-flex items-center gap-2 group"
                        >
                          <span>josh29@stanford.edu</span>
                          <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-white/10">
                      <p className="text-base text-slate-400 font-light font-sans mb-4">
                        When contacting support, please include:
                      </p>
                      <ul className="list-none space-y-3 text-base text-slate-400 font-light font-sans">
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>The email associated with your Omni account</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>A brief description of the issue or question</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>Screenshots or screen recordings (if applicable)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div 
                  style={{ animationDelay: isLoaded ? '0.6s' : '0s' }}
                  className={`space-y-6 mt-12 ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
                >
                  <h2 className="text-2xl md:text-3xl font-serif font-light text-white">Common Topics We Can Help With</h2>
                  <ul className="list-none space-y-3 text-base text-slate-400 font-light font-sans ml-4">
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">•</span>
                      <span>Account access or sign-in issues</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">•</span>
                      <span>Card and rewards recommendations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">•</span>
                      <span>Location-based card suggestions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">•</span>
                      <span>Data accuracy or missing transactions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">•</span>
                      <span>Feature requests or feedback</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">•</span>
                      <span>Privacy or data-related questions</span>
                    </li>
                  </ul>
                </div>

                <div 
                  style={{ animationDelay: isLoaded ? '0.8s' : '0s' }}
                  className={`space-y-4 mt-12 ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
                >
                  <h2 className="text-2xl md:text-3xl font-serif font-light text-white">Response Time</h2>
                  <p className="text-base text-slate-400 font-light leading-relaxed font-sans">
                    We typically respond within 24–48 hours during business days.
                  </p>
                </div>

                <div 
                  style={{ animationDelay: isLoaded ? '1.0s' : '0s' }}
                  className={`mt-16 ${isLoaded ? 'animate-fade-in' : ''}`}
                >
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
                    <span className="text-base font-medium text-white">Back to Home</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <TuitionFooter />
    </div>
  )
}

export default Support
