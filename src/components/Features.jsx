import React, { useState, useEffect, useRef } from 'react'

function Features({ isLoaded }) {
  const features = [
    {
      icon: 'fa-map-marker-alt',
      title: 'Location-Based Card Selection',
      description: 'Uses your real-time location via Apple\'s Live Activities to instantly show the best credit card at any merchant. No guessing, no manual checking—just the optimal choice, automatically.',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: 'fa-gift',
      title: 'Bonus Offer Optimization',
      description: 'Aggregates all limited-time card offers and automatically tells you which ones to activate and how much you\'ll earn. Never miss a bonus opportunity again.',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      icon: 'fa-chart-line',
      title: 'Payment Tracking Dashboard',
      description: 'A complete financial overview that tracks spending, payments, upcoming bills, and total rewards earned across all cards. Think Rocket Money, but for credit card optimization.',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: 'fa-lightbulb',
      title: 'Card Recommendations Engine',
      description: 'Analyzes your historical transactions and spending patterns to recommend the best new cards to apply for, based on actual reward potential—not generic suggestions.',
      gradient: 'from-blue-400 to-cyan-500'
    }
  ]

  const [visibleCards, setVisibleCards] = useState(new Set())
  const cardRefs = useRef([])

  useEffect(() => {
    const observers = []

    cardRefs.current.forEach((cardRef, index) => {
      if (!cardRef) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set([...prev, index]))
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -80px 0px'
        }
      )

      observer.observe(cardRef)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            style={{fontFamily: "'EB Garamond', 'EB Garamond Fallback', serif", animationDelay: isLoaded ? '0.8s' : '0s'}} 
            className={`text-4xl md:text-5xl font-bold text-white mb-4 ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
          >
            Intelligence That Works
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {' '}Behind the Scenes
            </span>
          </h2>
          <p 
            style={{animationDelay: isLoaded ? '0.9s' : '0s'}} 
            className={`text-xl text-gray-300 max-w-2xl mx-auto ${isLoaded ? 'animate-fly-in-bottom' : ''}`}
          >
            Four core features that automate every aspect of credit card optimization
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const isVisible = visibleCards.has(index)

            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
                className={`feature-card bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-sm hover:shadow-xl hover:border-purple-500 transition-all duration-300 hover:-translate-y-1 ${isVisible ? 'visible' : ''}`}
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
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features

