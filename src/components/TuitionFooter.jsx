import React from 'react'
import { Link } from 'react-router-dom'

function TuitionFooter() {
  return (
    <footer className="scroll-snap-section py-8 px-6 border-t border-white/10 bg-deep-purple/40 backdrop-blur-lg mt-auto">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <a className="inline-flex shrink-0 items-center justify-center" href="/">
            <img
              src="/assets/omni-logo.png"
              alt="Omni"
              className="h-5 md:h-6 w-auto"
            />
            <span className="sr-only">Omni</span>
          </a>
        </div>
        <div className="flex justify-center gap-8">
          <Link className="text-sm text-slate-300 hover:text-white transition-colors" to="/tos">Terms of Service</Link>
          <Link className="text-sm text-slate-300 hover:text-white transition-colors" to="/privacy">Privacy Policy</Link>
          <Link className="text-sm text-slate-300 hover:text-white transition-colors" to="/support">Contact Support</Link>
        </div>
      </div>
    </footer>
  )
}

export default TuitionFooter
