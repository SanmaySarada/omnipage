import React from 'react'

function TuitionSecurity() {
  return (
    <section className="scroll-snap-section py-32 px-6 bg-surface/20" id="security">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 border-b border-white/5 pb-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-serif font-light text-white mb-4">Built for trust.</h2>
            <p className="text-lg text-slate-400 font-light">Security isn't a feature—it's the foundation of everything we build.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-[2rem] overflow-hidden">
          <div className="p-10 bg-deep-purple hover:bg-surface transition-colors duration-300">
            <h4 className="text-lg font-medium text-white mb-2">AES-256 Encryption</h4>
            <p className="text-sm text-slate-400 leading-relaxed">Data encrypted at rest and in transit using military standards.</p>
          </div>
          <div className="p-10 bg-deep-purple hover:bg-surface transition-colors duration-300">
            <h4 className="text-lg font-medium text-white mb-2">Plaid Verified</h4>
            <p className="text-sm text-slate-400 leading-relaxed">We never store bank credentials. Direct integration via Plaid.</p>
          </div>
          <div className="p-10 bg-deep-purple hover:bg-surface transition-colors duration-300">
            <h4 className="text-lg font-medium text-white mb-2">Privacy First</h4>
            <p className="text-sm text-slate-400 leading-relaxed">Minimised data collection. We only see what is necessary.</p>
          </div>
          <div className="p-10 bg-deep-purple hover:bg-surface transition-colors duration-300">
            <h4 className="text-lg font-medium text-white mb-2">24/7 Monitoring</h4>
            <p className="text-sm text-slate-400 leading-relaxed">Automated systems scan for suspicious activity continuously.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TuitionSecurity
