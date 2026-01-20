import React from 'react'

function TuitionHero() {
  return (
    <section className="scroll-snap-section relative pt-40 pb-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] glow-spot opacity-40 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center relative z-10">
        <div className="lg:col-span-6 flex flex-col gap-10">
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-8xl font-serif font-light leading-[1.1] tracking-tight text-white text-balance">
              Rewards on <br/>
              <span className="italic text-accent">tuition.</span>
            </h1>
            <p className="text-lg text-slate-400 font-light max-w-lg leading-relaxed">
              Transform your largest household expense into a rewarding asset. Pay tuition as usual, earn points seamlessly, and invest in your family's future.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-5">
            <button className="bg-white text-deep-purple px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-slate-200 transition-all transform hover:-translate-y-1">Join the waitlist</button>
            <button className="bg-transparent text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest border border-white/20 hover:bg-white/5 transition-all">How it works</button>
          </div>
          <div className="pt-8 border-t border-white/10 flex gap-8 items-center">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="material-symbols-outlined text-accent text-lg">check_circle</span>
              <span className="text-xs font-medium uppercase tracking-wider">No Credit Check</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="material-symbols-outlined text-accent text-lg">check_circle</span>
              <span className="text-xs font-medium uppercase tracking-wider">No Fees</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 relative perspective-3d">
          <div className="relative transform rotate-3d-initial hover:rotate-3d-hover transition-all duration-700 ease-out">
            <div className="bg-[#1e1628] rounded-[2rem] p-10 aspect-[4/5.2] flex flex-col justify-between border border-white/10 shadow-2xl shadow-black/50 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                  <div className="flex justify-end items-start z-10 mb-6">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Omni Card</span>
              </div>
              <div className="space-y-6 z-10 relative">
                <div className="glass-panel p-6 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Tuition Payment</span>
                    <span className="text-xs text-white font-mono">Pending</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-white font-serif text-xl">St. Marks Academy</span>
                    <span className="text-white font-mono">$12,450.00</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="h-12 w-[1px] bg-gradient-to-b from-white/20 to-accent"></div>
                </div>
                <div className="glass-panel p-6 rounded-xl border border-accent/30 bg-accent/5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-accent text-lg">check_circle</span>
                    <span className="text-xs text-accent uppercase tracking-wider font-medium">ACH Payment Successful</span>
                  </div>
                  <p className="text-xs text-slate-400 font-light">Payment processed via ACH transfer</p>
                </div>
                <div className="flex justify-center">
                  <div className="h-12 w-[1px] bg-gradient-to-b from-white/20 to-accent"></div>
                </div>
                <div className="bg-gradient-to-br from-accent to-royal p-8 rounded-2xl text-white shadow-lg text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" style={{ top: '60240px' }}></div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 relative z-10">Rewards Earned</p>
                  <h4 className="text-5xl font-serif font-light relative z-10">+12,450</h4>
                  <p className="text-xs mt-2 opacity-80 relative z-10">Points credited instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TuitionHero
