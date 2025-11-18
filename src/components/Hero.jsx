import React from 'react'

function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              The Smartest Way to
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}Earn More
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Omni automatically analyzes your purchases and tells you which card earns the most points, cash back, or perks—every time. Maximize rewards with zero effort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Start Your Free Trial
              </button>
              <button className="px-8 py-4 bg-white text-gray-700 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-300">
                Join the Waitlist
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <i className="fas fa-check-circle text-green-500"></i>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-check-circle text-green-500"></i>
                <span>14-day free trial</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <i className="fas fa-credit-card text-white text-xl"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Recommended Card</p>
                      <p className="text-sm text-gray-500">Best for this purchase</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Chase Sapphire</span>
                      <span className="font-bold text-green-600">+3x points</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-100 opacity-60">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Amex Gold</span>
                      <span className="font-bold text-gray-400">+1x points</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

