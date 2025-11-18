import React from 'react'

function Features() {
  const features = [
    {
      icon: 'fa-bolt',
      title: 'Real-Time Card Recommendations',
      description: 'Omni shows you the best card to use at any merchant based on rewards rates, categories, and point valuations—so you never leave value on the table.',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: 'fa-chart-line',
      title: 'Automatic Savings Tracking',
      description: 'See exactly how much extra you\'re earning with Omni. Track bonus rewards, monthly savings, and total points generated across all your cards.',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      icon: 'fa-brain',
      title: 'Personalized Reward Insights',
      description: 'Omni learns your cards, your spending habits, and your favorite merchants to deliver tailored advice that maximizes your earning potential.',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: 'fa-store',
      title: 'Merchant-Level Optimization',
      description: 'From big retailers to local shops, Omni identifies merchant category codes (MCCs) and applies the correct rewards for each of your cards—instantly.',
      gradient: 'from-blue-400 to-cyan-500'
    }
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need to
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {' '}Maximize Rewards
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Powerful features designed to help you earn more from every purchase
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-sm hover:shadow-xl hover:border-purple-500 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6`}>
                <i className={`fas ${feature.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

