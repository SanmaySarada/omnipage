import React from 'react'

function TuitionBenefits() {
  return (
    <section className="scroll-snap-section py-32 px-6" id="benefits">
      <div className="max-w-7xl mx-auto space-y-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-surface to-surface-highlight border border-white/5 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
              <div className="relative z-10 text-center space-y-4">
                <span className="text-6xl md:text-8xl font-serif text-white block">$4,822</span>
                <span className="text-xs font-mono uppercase tracking-widest text-accent">Average Lifetime Value</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-accent font-mono text-xs uppercase tracking-widest mb-6 block">Maximization</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-8 leading-tight text-white">Make every semester count.</h2>
            <p className="text-base text-slate-400 mb-12 font-light leading-relaxed font-sans">
              Tuition is often a family's single largest expense. Omni unlocks premium rewards on every payment, effectively lowering the cost of education over time.
            </p>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 text-slate-400">
                <span className="h-px w-8 bg-accent"></span>
                <span className="text-base font-light font-sans">Automated 529 Contributions</span>
              </li>
              <li className="flex items-center gap-4 text-slate-400">
                <span className="h-px w-8 bg-white/20"></span>
                <span className="text-base font-light font-sans">Zero Interest or Fees</span>
              </li>
              <li className="flex items-center gap-4 text-slate-400">
                <span className="h-px w-8 bg-white/20"></span>
                <span className="text-base font-light font-sans">Universal School Acceptance</span>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-accent font-mono text-xs uppercase tracking-widest mb-6 block">Simplicity</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-8 leading-tight text-white">A rewards layer, not a loan.</h2>
            <p className="text-base text-slate-400 mb-12 font-light leading-relaxed font-sans">
              Omni is not a line of credit. There are no credit checks and no impact on your credit score. We simply reward the money you are already spending.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TuitionBenefits
