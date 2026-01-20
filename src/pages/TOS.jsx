import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TuitionNavbar from '../components/TuitionNavbar'
import TuitionFooter from '../components/TuitionFooter'

function TOS() {
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
                Terms of Service for Omni
              </h1>
              <div className="text-slate-300 space-y-8">
                <p 
                  style={{ animationDelay: isLoaded ? '0.2s' : '0s' }}
                  className={`text-base text-slate-300 font-light font-sans ${isLoaded ? 'animate-fade-in' : ''}`}
                >
                  <strong className="text-white">Last Updated:</strong> Tuesday, December 30, 2025
                </p>

                <div className="space-y-6">
                  <div 
                    style={{ animationDelay: isLoaded ? '0.3s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">1. Introduction</h2>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans">
                      Welcome to Omni ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of the Omni mobile application ("App") and related services (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access or use the Service.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '0.4s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">2. Acceptance of Terms</h2>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans mb-4">
                      By creating an account, accessing, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not use the Service.
                    </p>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans">
                      You must be at least 18 years old and have the legal capacity to enter into these Terms. If you are using the Service on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '0.5s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">3. Description of Service</h2>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans mb-4">
                      Omni is a smart credit card rewards optimization service that:
                    </p>
                    <ul className="list-none space-y-3 text-base text-slate-300 font-light font-sans ml-4">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Connects to your financial accounts through third-party services (e.g., Plaid) to access transaction data</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Analyzes your spending patterns and credit card rewards programs</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Provides recommendations for optimal credit card usage based on merchant categories and locations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Tracks and displays rewards earned across your credit cards</span>
                      </li>
                    </ul>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans mt-4">
                      We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time, with or without notice.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '0.6s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">4. User Accounts</h2>
                    <h3 className="text-xl md:text-2xl font-serif font-light text-white mt-6 mb-3">Account Creation</h3>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans mb-4">
                      To use the Service, you must create an account. You agree to:
                    </p>
                    <ul className="list-none space-y-3 text-base text-slate-300 font-light font-sans ml-4">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Provide accurate, current, and complete information during registration</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Maintain and promptly update your account information</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Maintain the security of your account credentials</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Accept responsibility for all activities that occur under your account</span>
                      </li>
                    </ul>

                    <h3 className="text-xl md:text-2xl font-serif font-light text-white mt-6 mb-3">Account Security</h3>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans">
                      You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account or any other breach of security.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '0.7s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">5. Use of Service</h2>
                    <h3 className="text-xl md:text-2xl font-serif font-light text-white mt-6 mb-3">Permitted Use</h3>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans mb-4">
                      You may use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
                    </p>
                    <ul className="list-none space-y-3 text-base text-slate-300 font-light font-sans ml-4">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Use the Service in any way that violates any applicable federal, state, local, or international law or regulation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Attempt to gain unauthorized access to the Service, other accounts, or computer systems</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Interfere with or disrupt the Service or servers connected to the Service</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Use any robot, spider, or other automatic device to access the Service</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Reverse engineer, decompile, or disassemble any portion of the Service</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Remove any copyright, trademark, or other proprietary notices from the Service</span>
                      </li>
                    </ul>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '0.8s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">6. Financial Information and Third-Party Services</h2>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans mb-4">
                      The Service integrates with third-party financial services (e.g., Plaid) to access your financial account information. By using the Service, you acknowledge and agree that:
                    </p>
                    <ul className="list-none space-y-3 text-base text-slate-300 font-light font-sans ml-4">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>We do not store your bank account credentials or login information</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Your use of third-party services is subject to their respective terms of service and privacy policies</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>We are not responsible for the accuracy, completeness, or timeliness of financial data provided by third-party services</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>You are responsible for maintaining the security of your financial accounts</span>
                      </li>
                    </ul>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans mt-4">
                      <strong className="text-white">Important:</strong> Omni provides recommendations and information for informational purposes only. We do not provide financial, investment, or legal advice. You should consult with qualified professionals before making financial decisions.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '0.9s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">7. Intellectual Property</h2>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans mb-4">
                      The Service and its original content, features, and functionality are owned by Omni and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                    </p>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans">
                      You may not copy, modify, distribute, sell, or lease any part of the Service or included software, nor may you reverse engineer or attempt to extract the source code of that software, unless laws prohibit those restrictions or you have our written permission.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '1.0s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">8. Disclaimer of Warranties</h2>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans mb-4">
                      THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
                    </p>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans">
                      We do not warrant that:
                    </p>
                    <ul className="list-none space-y-3 text-base text-slate-300 font-light font-sans ml-4 mt-4">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>The Service will be uninterrupted, secure, or error-free</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Any defects or errors will be corrected</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>The Service is free of viruses or other harmful components</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>The results obtained from using the Service will be accurate or reliable</span>
                      </li>
                    </ul>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '1.1s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">9. Limitation of Liability</h2>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans mb-4">
                      TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL OMNI, ITS AFFILIATES, AGENTS, DIRECTORS, EMPLOYEES, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE, THE SERVICE.
                    </p>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans">
                      OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE USE OF THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO US, IF ANY, FOR ACCESSING THE SERVICE DURING THE TWELVE (12) MONTHS PRIOR TO THE CLAIM, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '1.2s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">10. Indemnification</h2>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans">
                      You agree to defend, indemnify, and hold harmless Omni and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable attorney's fees and costs, arising out of or in any way connected with your access to or use of the Service, your violation of these Terms, or your violation of any third-party right, including without limitation any intellectual property or privacy right.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '1.3s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">11. Termination</h2>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans mb-4">
                      We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms.
                    </p>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans">
                      Upon termination, your right to use the Service will cease immediately. You may terminate your account at any time by contacting us or using the account deletion feature in the App.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '1.4s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">12. Changes to Terms</h2>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans mb-4">
                      We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
                    </p>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans">
                      What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised Terms.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '1.5s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">13. Governing Law</h2>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans">
                      These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in California.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '1.6s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">14. Severability</h2>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans">
                      If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have between us regarding the Service.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '1.7s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">15. Contact Us</h2>
                    <p className="text-base text-slate-300 font-light leading-relaxed font-sans mb-4">
                      If you have any questions about these Terms of Service, please contact us at:
                    </p>
                    <div className="bg-surface/50 rounded-xl border border-white/5 p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                          <span className="material-symbols-outlined text-accent text-xl">email</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-300 uppercase tracking-wider mb-1">Email</p>
                          <a 
                            href="mailto:josh29@stanford.edu" 
                            className="text-lg font-medium text-white hover:text-accent transition-colors inline-flex items-center gap-2 group"
                          >
                            <span>josh29@stanford.edu</span>
                            <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '1.8s' : '0s' }}
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
            </div>
          </section>
        </main>
      </div>
      <TuitionFooter />
    </div>
  )
}

export default TOS
