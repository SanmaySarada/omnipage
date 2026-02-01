import { HeroSection } from '@/components/hero/hero-section'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

export default function Page() {
  return (
    <>
      <HeroSection />

      {/* Animation Infrastructure Demo - Remove after Phase 4 verification */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl font-bold">Scroll Animation Demo</h2>
            <p className="text-muted-foreground mt-2">
              This section verifies the animation infrastructure works correctly.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <ScrollReveal direction="up" delay={0}>
              <div className="p-6 rounded-xl bg-surface border border-border">
                <h3 className="font-semibold mb-2">Slide Up</h3>
                <p className="text-sm text-muted-foreground">Default animation direction</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <div className="p-6 rounded-xl bg-surface border border-border">
                <h3 className="font-semibold mb-2">Staggered</h3>
                <p className="text-sm text-muted-foreground">0.1s delay for stagger effect</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="p-6 rounded-xl bg-surface border border-border">
                <h3 className="font-semibold mb-2">Third Card</h3>
                <p className="text-sm text-muted-foreground">0.2s delay completes sequence</p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="left" delay={0.3} className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              This text slides in from the right (direction="left" means content starts offset right)
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">Section placeholder</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <p className="text-muted-foreground">Section placeholder</p>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Calculator</h2>
          <p className="text-muted-foreground">Section placeholder</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">FAQ</h2>
          <p className="text-muted-foreground">Section placeholder</p>
        </div>
      </section>
    </>
  )
}
