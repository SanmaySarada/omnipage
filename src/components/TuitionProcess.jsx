import React from 'react'

function TuitionProcess() {
  return (
    <section className="scroll-snap-section py-32 px-6 relative" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-accent font-mono text-xs uppercase tracking-widest mb-4 block">The Process</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white leading-tight">Seamless Integration</h2>
          </div>
          <p className="text-base text-slate-300 max-w-md pb-1 font-light leading-relaxed font-sans">No school onboarding. No complicated forms. Just value returned to your family.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="group relative bg-surface p-10 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col h-full">
            <div className="mb-12 flex justify-end items-start">
              <span className="font-serif text-4xl text-white/40 italic">1</span>
            </div>
            <div className="mt-auto">
              <h3 className="text-2xl font-medium mb-4 text-white">Link Account</h3>
              <p className="text-base text-slate-300 leading-relaxed font-light font-sans">Connect your funding source securely via Plaid. We support 10,000+ US financial institutions instantly.</p>
            </div>
          </div>
          <div className="group relative bg-surface p-10 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col h-full">
            <div className="mb-12 flex justify-end items-start">
              <span className="font-serif text-4xl text-white/40 italic">2</span>
            </div>
            <div className="mt-auto">
              <h3 className="text-2xl font-medium mb-4 text-white">Pay Tuition</h3>
              <p className="text-base text-slate-300 leading-relaxed font-light font-sans">Make payments through your school's existing portal. Our system detects the transaction automatically.</p>
            </div>
          </div>
          <div className="group relative bg-surface p-10 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col h-full">
            <div className="mb-12 flex justify-end items-start">
              <span className="font-serif text-4xl text-white/40 italic">3</span>
            </div>
            <div className="mt-auto">
              <h3 className="text-2xl font-medium mb-4 text-white">Earn Rewards</h3>
              <p className="text-base text-slate-300 leading-relaxed font-light font-sans">Receive up to 2% back in points. Redeem for travel, future education credits, or cash back.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TuitionProcess
