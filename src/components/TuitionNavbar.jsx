import React, { useState, useEffect } from 'react'

function TuitionNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
      isScrolled 
        ? 'border-white/10 bg-deep-purple/60 backdrop-blur-xl shadow-lg' 
        : 'border-white/5 bg-deep-purple/40 backdrop-blur-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a className="inline-flex shrink-0 items-center justify-center" href="/">
            <img
              src="/assets/omni-logo.png"
              alt="Omni"
              className="h-8 md:h-10 w-auto"
            />
            <span className="sr-only">Omni</span>
          </a>
        </div>
        <div className="hidden lg:flex items-center gap-10">
          <a className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide" href="#how-it-works">Process</a>
          <a className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide" href="#benefits">Benefits</a>
          <a className="text-sm font-medium text-slate-400 hover:text-white transition-colors tracking-wide" href="#security">Security</a>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="#waitlist" 
            className="bg-white text-deep-purple px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-all inline-block"
          >
            Join waitlist
          </a>
        </div>
      </div>
    </nav>
  )
}

export default TuitionNavbar
