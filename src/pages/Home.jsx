import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CTA from '../components/CTA'

function Home() {
  return (
    <div className="flex min-h-svh flex-col cohesive-gradient">
      <div className="grow">
        <main className="relative overflow-hidden md:overflow-visible">
          <Navbar />
          <Hero />
          <CTA />
        </main>
      </div>
    </div>
  )
}

export default Home

