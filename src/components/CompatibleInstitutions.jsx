import React from 'react'

function CompatibleInstitutions() {
  return (
    <section className="py-12 border-y border-white/5 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-slate-400 font-serif italic text-lg mb-8">Compatible with thousands of institutions</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center justify-items-center opacity-40 hover:opacity-80 transition-opacity duration-700">
          <div className="h-8 w-32 bg-white rounded-sm"></div>
          <div className="h-6 w-40 bg-white rounded-sm"></div>
          <div className="h-10 w-28 bg-white rounded-sm"></div>
          <div className="h-7 w-36 bg-white rounded-sm"></div>
          <div className="h-8 w-32 bg-white rounded-sm"></div>
        </div>
      </div>
    </section>
  )
}

export default CompatibleInstitutions
