import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
        <Link
          to="/support"
          className="text-white/70 hover:text-white transition-colors text-sm md:text-base"
        >
          Support
        </Link>
        <span className="text-white/30 hidden sm:inline">•</span>
        <Link
          to="/privacy"
          className="text-white/70 hover:text-white transition-colors text-sm md:text-base"
        >
          Privacy
        </Link>
      </div>
    </footer>
  )
}

export default Footer
