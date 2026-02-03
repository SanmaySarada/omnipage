import { HeroSection } from '@/components/hero/hero-section'
import { HowYouEarnSection } from '@/components/how-you-earn'
import { FeatureGrid, AudienceTabs, DiscoveryPreview } from '@/components/content-sections'

export default function Page() {
  return (
    <>
      <HeroSection />

      <HowYouEarnSection />

      <FeatureGrid />

      <AudienceTabs />

      <DiscoveryPreview />

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
