import React from 'react'
import TuitionNavbar from '../components/TuitionNavbar'
import TuitionHero from '../components/TuitionHero'
import TuitionProcess from '../components/TuitionProcess'
import TuitionBenefits from '../components/TuitionBenefits'
import TuitionWaitlist from '../components/TuitionWaitlist'
import TuitionSecurity from '../components/TuitionSecurity'
import TuitionFAQ from '../components/TuitionFAQ'
import TuitionFooter from '../components/TuitionFooter'

function Home() {
  return (
    <div className="flex min-h-svh flex-col cohesive-gradient">
      <div className="grow">
        <main className="relative">
          <TuitionNavbar />
          <TuitionHero />
          <TuitionProcess />
          <TuitionBenefits />
          <TuitionWaitlist />
          <TuitionSecurity />
          <TuitionFAQ />
        </main>
      </div>
      <TuitionFooter />
    </div>
  )
}

export default Home
