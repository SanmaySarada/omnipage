import React from 'react'

function TuitionFAQ() {
  return (
    <section className="scroll-snap-section py-32 px-6" id="faq">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-serif font-light text-center mb-16 text-white">Common Questions</h2>
        <div className="space-y-4">
          <details className="group bg-surface/50 rounded-xl border border-white/5 overflow-hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-white font-medium text-lg hover:bg-white/5 transition-colors">
              Does my school need to partner with Omni?
              <span className="material-symbols-outlined group-open:rotate-180 transition-transform duration-300 text-slate-400">expand_more</span>
            </summary>
            <div className="px-6 pb-6 pt-2 text-slate-400 font-light leading-relaxed">
              No. Omni is built as a rewarding layer that sits on top of your existing school workflow. As long as your school accepts payments via ACH or bank transfer, Omni can verify and reward those payments automatically.
            </div>
          </details>
          <details className="group bg-surface/50 rounded-xl border border-white/5 overflow-hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-white font-medium text-lg hover:bg-white/5 transition-colors">
              What is the reward rate?
              <span className="material-symbols-outlined group-open:rotate-180 transition-transform duration-300 text-slate-400">expand_more</span>
            </summary>
            <div className="px-6 pb-6 pt-2 text-slate-400 font-light leading-relaxed">
              Standard users earn up to 1% back on tuition. Pilot participants and users with partnered financial institutions can earn up to 2%.
            </div>
          </details>
          <details className="group bg-surface/50 rounded-xl border border-white/5 overflow-hidden">
            <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-white font-medium text-lg hover:bg-white/5 transition-colors">
              How do you handle privacy?
              <span className="material-symbols-outlined group-open:rotate-180 transition-transform duration-300 text-slate-400">expand_more</span>
            </summary>
            <div className="px-6 pb-6 pt-2 text-slate-400 font-light leading-relaxed">
              We only access the financial transaction data required to verify the tuition payment. We never sell student data, and we never share your specific financial records with your school.
            </div>
          </details>
        </div>
      </div>
    </section>
  )
}

export default TuitionFAQ
