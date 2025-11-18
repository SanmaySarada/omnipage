import React from 'react'

function Benefits() {
  const benefits = [
    {
      icon: 'fa-mobile-alt',
      title: 'Simple, Clean, and Built for Speed',
      description: 'Made for everyday use, Omni gives you the answer you need in seconds, with a frictionless interface built for iOS.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop'
    }
  ]

  return (
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
              <i className="fas fa-mobile-alt text-white text-2xl"></i>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Clean, and
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}Built for Speed
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Made for everyday use, Omni gives you the answer you need in seconds, with a frictionless interface built for iOS.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-check text-green-600 text-sm"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Instant Recommendations</h4>
                  <p className="text-gray-600">Get card suggestions in seconds, not minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-check text-green-600 text-sm"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Zero Effort Required</h4>
                  <p className="text-gray-600">Omni works automatically in the background</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-check text-green-600 text-sm"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Beautiful iOS Design</h4>
                  <p className="text-gray-600">Intuitive interface that feels natural</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="aspect-[9/16] bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-mobile-alt text-6xl text-gray-300 mb-4"></i>
                  <p className="text-gray-400">iOS App Preview</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benefits

