import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Omni Card - Earn Rewards on Tuition',
  description: 'Pay tuition with your credit card. Earn rewards on your biggest expense. Zero fees for schools.',
  keywords: ['tuition payments', 'student rewards', 'credit card rewards', 'college payments', 'university tuition', 'payment processing'],
  openGraph: {
    title: 'Omni Card - Earn Rewards on Tuition',
    description: 'Pay tuition with your credit card. Earn rewards on your biggest expense.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
