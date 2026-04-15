import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { BenefitsSection } from "@/components/benefits-section"
import { WelcomeVideoSection } from "@/components/welcome-video-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TeachersSection } from "@/components/teachers-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PortalSection } from "@/components/portal-section"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <BenefitsSection />
        <WelcomeVideoSection />
        <HowItWorksSection />
        <TeachersSection />
        <TestimonialsSection />
        <PortalSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
