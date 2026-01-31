import Link from 'next/link'
import { FooterSocials } from './footer-socials'

const footerLinks = {
  nav: [
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#features', label: 'Features' },
    { href: '#faq', label: 'FAQ' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo & Tagline */}
          <div className="md:col-span-2">
            <Link href="/" className="font-bold text-xl">
              Omni Card
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              Earn rewards on your biggest expense. Pay tuition with your credit card.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Omni Card. All rights reserved.
          </p>
          <FooterSocials />
        </div>
      </div>
    </footer>
  )
}
