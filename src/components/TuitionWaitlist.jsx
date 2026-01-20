import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

function TuitionWaitlist() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const trimmedName = name.trim()
    const trimmedEmail = email.trim().toLowerCase()

    if (!trimmedName || !trimmedEmail) {
      setError('Please fill in both name and email fields.')
      setLoading(false)
      return
    }

    try {
      // Check if email already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', trimmedEmail)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 is "not found" error, which is fine
        console.error('Error checking existing user:', checkError)
        throw checkError
      }

      if (existingUser) {
        setError("You've already signed up for the waitlist! We'll be in touch soon.")
        setLoading(false)
        return
      }

      // Insert new entry
      const { data: insertData, error: insertError } = await supabase
        .from('waitlist')
        .insert([
          {
            name: trimmedName,
            email: trimmedEmail,
            created_at: new Date().toISOString()
          }
        ])
        .select()

      if (insertError) {
        // Check for duplicate email error
        if (insertError.code === '23505' || 
            insertError.message?.includes('duplicate key') || 
            insertError.message?.includes('unique constraint') ||
            insertError.message?.includes('waitlist_email_unique')) {
          setError("You've already signed up for the waitlist! We'll be in touch soon.")
          setLoading(false)
          return
        }
        console.error('Error inserting to waitlist:', insertError)
        throw insertError
      }

      // Success - verify data was inserted
      if (insertData && insertData.length > 0) {
        console.log('✅ Successfully added to waitlist:', { name: trimmedName, email: trimmedEmail })
      }

      // Success
      setName('')
      setEmail('')
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
      }, 4000)
    } catch (err) {
      console.error('Error submitting to waitlist:', err)
      // Check for duplicate email error in catch block as well
      if (err.code === '23505' || 
          err.message?.includes('duplicate key') || 
          err.message?.includes('unique constraint') ||
          err.message?.includes('waitlist_email_unique')) {
        setError("You've already signed up for the waitlist! We'll be in touch soon.")
      } else {
        setError(err.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="waitlist" className="scroll-snap-section relative py-32 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-r from-deep-purple to-black opacity-90"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <span className="inline-block py-1 px-3 rounded-full border border-white/20 bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-8">
          Pilot Program Access
        </span>
        <h2 className="text-5xl md:text-7xl font-serif font-light text-white mb-6 leading-tight">
          The future of tuition <br/>is coming.
        </h2>
        <p className="text-xl text-slate-300 mb-12 font-light max-w-xl mx-auto">
          Join the waitlist for exclusive early access to the Omni platform. Limited spots available for the upcoming academic year.
        </p>
        <form className="max-w-md mx-auto space-y-4" onSubmit={handleSubmit}>
          <div>
            <input 
              className="w-full bg-white/10 border border-white/20 rounded-full py-4 px-6 text-white placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" 
              placeholder="Enter your name" 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="relative">
            <input 
              className="w-full bg-white/10 border border-white/20 rounded-full py-4 px-6 text-white placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all pr-24" 
              placeholder="Enter your email address" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <button 
              className="absolute right-2 top-2 bottom-2 bg-white text-black px-6 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Joining...' : 'Join'}
            </button>
          </div>
          {error && (
            <p className="text-sm text-red-400 mt-2">{error}</p>
          )}
          {submitted && (
            <p className="text-sm text-accent mt-2">Thank you! You've been added to the waitlist.</p>
          )}
          <p className="text-[10px] text-slate-300 mt-4 uppercase tracking-wider">No spam. Unsubscribe anytime.</p>
        </form>
      </div>
    </section>
  )
}

export default TuitionWaitlist
