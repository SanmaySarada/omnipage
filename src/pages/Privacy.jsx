import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TuitionNavbar from '../components/TuitionNavbar'
import TuitionFooter from '../components/TuitionFooter'

function Privacy() {
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
                Privacy Policy for Omni
              </h1>
              <div className="text-slate-400 space-y-8">
                <p 
                  style={{ animationDelay: isLoaded ? '0.2s' : '0s' }}
                  className={`text-base text-slate-400 font-light font-sans ${isLoaded ? 'animate-fade-in' : ''}`}
                >
                  <strong className="text-white">Last Updated:</strong> Tuesday, December 30, 2025
                </p>

                <div className="space-y-6">
                  <div 
                    style={{ animationDelay: isLoaded ? '0.3s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">Introduction</h2>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans">
                      Omni ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application ("App"). Please read this Privacy Policy carefully. By using our App, you agree to the collection and use of information in accordance with this policy.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '0.4s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">Information We Collect</h2>
                    
                    <h3 className="text-xl md:text-2xl font-serif font-light text-white mt-6 mb-3">Personal Information</h3>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mb-4">
                      When you create an account, we collect:
                    </p>
                    <ul className="list-none space-y-3 text-base text-slate-400 font-light font-sans ml-4">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span><strong className="text-white">Email Address</strong>: Used for account creation and authentication via Sign In with Apple</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span><strong className="text-white">User ID</strong>: A unique identifier associated with your account</span>
                      </li>
                    </ul>

                    <h3 className="text-xl md:text-2xl font-serif font-light text-white mt-6 mb-3">Financial Information</h3>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mb-4">
                      Through our integration with Plaid, we collect and store:
                    </p>
                    <ul className="list-none space-y-3 text-base text-slate-400 font-light font-sans ml-4">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span><strong className="text-white">Bank Account Information</strong>: Institution names, account types, and account identifiers</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span><strong className="text-white">Credit Card Information</strong>: Card issuer, last 4 digits, card type, network, and status</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span><strong className="text-white">Account Balances</strong>: Current balances and credit limits</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span><strong className="text-white">Transaction Data</strong>: Transaction amounts, dates, merchant names, categories, and locations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span><strong className="text-white">Rewards Information</strong>: Points earned, reward multipliers, and category-based rewards</span>
                      </li>
                    </ul>

                    <h3 className="text-xl md:text-2xl font-serif font-light text-white mt-6 mb-3">Location Information</h3>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mb-4">
                      We collect your device's location data when you grant permission. This information is used to:
                    </p>
                    <ul className="list-none space-y-3 text-base text-slate-400 font-light font-sans ml-4">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Provide location-based card recommendations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Suggest optimal cards for nearby merchants</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Improve the relevance of card suggestions</span>
                      </li>
                    </ul>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mt-4">
                      You can control location access through your device settings. Location data is collected only when the App is in use.
                    </p>

                    <h3 className="text-xl md:text-2xl font-serif font-light text-white mt-6 mb-3">Usage Data</h3>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mb-4">
                      We may collect information about how you use the App, including:
                    </p>
                    <ul className="list-none space-y-3 text-base text-slate-400 font-light font-sans ml-4">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>App features accessed</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Time spent in the App</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Onboarding completion status</span>
                      </li>
                    </ul>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '0.5s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">How We Use Your Information</h2>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mb-4">
                      We use the collected information for the following purposes:
                    </p>
                    <ol className="list-decimal list-inside space-y-3 text-base text-slate-400 font-light font-sans ml-4">
                      <li><strong className="text-white">Service Provision</strong>: To provide, maintain, and improve our services</li>
                      <li><strong className="text-white">Card Recommendations</strong>: To analyze your spending patterns and recommend optimal credit cards for different merchants and categories</li>
                      <li><strong className="text-white">Rewards Tracking</strong>: To calculate and display rewards earned across your cards</li>
                      <li><strong className="text-white">Transaction Management</strong>: To sync, categorize, and display your transaction history</li>
                      <li><strong className="text-white">Account Management</strong>: To manage your account, authenticate users, and provide customer support</li>
                      <li><strong className="text-white">Location-Based Features</strong>: To provide personalized card recommendations based on your location</li>
                    </ol>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '0.6s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">Third-Party Services</h2>
                    
                    <h3 className="text-xl md:text-2xl font-serif font-light text-white mt-6 mb-3">Plaid</h3>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mb-4">
                      We use Plaid Inc. ("Plaid") to securely connect your financial accounts. When you connect an account through Plaid:
                    </p>
                    <ul className="list-none space-y-3 text-base text-slate-400 font-light font-sans ml-4">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>You will be redirected to Plaid's secure authentication flow</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Plaid accesses your financial account information on our behalf</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Plaid's use of your information is governed by their Privacy Policy: <a href="https://plaid.com/legal/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 underline">https://plaid.com/legal/</a></span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>We receive transaction and account data from Plaid to provide our services</span>
                      </li>
                    </ul>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mt-4">
                      <strong className="text-white">Important</strong>: We do not store your bank account credentials. All authentication is handled securely through Plaid.
                    </p>

                    <h3 className="text-xl md:text-2xl font-serif font-light text-white mt-6 mb-3">Supabase</h3>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mb-4">
                      We use Supabase for:
                    </p>
                    <ul className="list-none space-y-3 text-base text-slate-400 font-light font-sans ml-4">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>User authentication and account management</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Secure data storage in a PostgreSQL database</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Backend API services</span>
                      </li>
                    </ul>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mt-4">
                      Your data is stored securely with Row Level Security (RLS) policies to ensure only you can access your information.
                    </p>

                    <h3 className="text-xl md:text-2xl font-serif font-light text-white mt-6 mb-3">Google Places API</h3>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans">
                      We may use Google Places API to enhance merchant location data. Google's use of data is governed by their Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 underline">https://policies.google.com/privacy</a>
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '0.7s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">Data Security</h2>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mb-4">
                      We implement appropriate technical and organizational security measures to protect your personal information:
                    </p>
                    <ul className="list-none space-y-3 text-base text-slate-400 font-light font-sans ml-4">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span><strong className="text-white">Encryption</strong>: Data is encrypted in transit using HTTPS/TLS</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span><strong className="text-white">Authentication</strong>: Secure authentication via Sign In with Apple and Supabase Auth</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span><strong className="text-white">Access Controls</strong>: Row Level Security policies ensure data isolation between users</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span><strong className="text-white">Secure Storage</strong>: Financial data is stored in secure databases with restricted access</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span><strong className="text-white">Token Management</strong>: Plaid access tokens are securely stored and managed</span>
                      </li>
                    </ul>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mt-4">
                      However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '0.8s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">Data Retention</h2>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans">
                      We retain your personal information for as long as necessary to:
                    </p>
                    <ul className="list-none space-y-3 text-base text-slate-400 font-light font-sans ml-4 mt-4">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Provide our services to you</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Comply with legal obligations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Resolve disputes and enforce our agreements</span>
                      </li>
                    </ul>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mt-4">
                      You may request deletion of your account and associated data at any time by contacting us or using the account deletion feature in the App.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '0.9s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">Your Rights and Choices</h2>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mb-4">
                      You have the following rights regarding your personal information:
                    </p>
                    <ol className="list-decimal list-inside space-y-3 text-base text-slate-400 font-light font-sans ml-4">
                      <li><strong className="text-white">Access</strong>: You can access your personal information through the App</li>
                      <li><strong className="text-white">Correction</strong>: You can update your account information in the App settings</li>
                      <li><strong className="text-white">Deletion</strong>: You can request deletion of your account and data</li>
                      <li><strong className="text-white">Location Controls</strong>: You can enable or disable location services through your device settings</li>
                      <li><strong className="text-white">Account Disconnection</strong>: You can disconnect linked financial institutions at any time</li>
                    </ol>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mt-4">
                      To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '1.0s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">Children's Privacy</h2>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans">
                      Our App is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '1.1s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">Changes to This Privacy Policy</h2>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mb-4">
                      We may update our Privacy Policy from time to time. We will notify you of any changes by:
                    </p>
                    <ul className="list-none space-y-3 text-base text-slate-400 font-light font-sans ml-4">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Posting the new Privacy Policy in the App</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Updating the "Last Updated" date at the top of this policy</span>
                      </li>
                    </ul>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mt-4">
                      You are advised to review this Privacy Policy periodically for any changes. Changes are effective when posted.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '1.2s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">California Privacy Rights</h2>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mb-4">
                      If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
                    </p>
                    <ul className="list-none space-y-3 text-base text-slate-400 font-light font-sans ml-4">
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Right to know what personal information is collected</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Right to delete personal information</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Right to opt-out of the sale of personal information (we do not sell your personal information)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span>Right to non-discrimination for exercising your privacy rights</span>
                      </li>
                    </ul>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '1.3s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">International Users</h2>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans">
                      If you are using our App from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States where our servers are located. By using our App, you consent to the transfer of your information to the United States.
                    </p>
                  </div>

                  <div 
                    style={{ animationDelay: isLoaded ? '1.4s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">Contact Us</h2>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans mb-4">
                      If you have any questions about this Privacy Policy or our data practices, please contact us at:
                    </p>
                    <div className="bg-surface/50 rounded-xl border border-white/5 p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center">
                          <span className="material-symbols-outlined text-accent text-xl">email</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Email</p>
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
                    style={{ animationDelay: isLoaded ? '1.5s' : '0s' }}
                    className={isLoaded ? 'animate-fly-in-bottom' : ''}
                  >
                    <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">Consent</h2>
                    <p className="text-base text-slate-400 font-light leading-relaxed font-sans">
                      By using Omni, you consent to our Privacy Policy and agree to its terms.
                    </p>
                  </div>

                  <p 
                    style={{ animationDelay: isLoaded ? '1.6s' : '0s' }}
                    className={`text-base text-slate-400 font-light font-sans italic mt-8 pt-8 border-t border-white/10 ${isLoaded ? 'animate-fade-in' : ''}`}
                  >
                    This Privacy Policy is effective as of the date listed above and applies to all users of the Omni mobile application.
                  </p>
                </div>

                <div 
                  style={{ animationDelay: isLoaded ? '1.7s' : '0s' }}
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

export default Privacy
