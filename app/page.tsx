import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { BenefitsSection } from "@/components/benefits-section"
import { WelcomeVideoSection } from "@/components/welcome-video-section"
// import { HowItWorksSection } from "@/components/how-it-works-section"
import { TeachersSection } from "@/components/teachers-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { PortalSection } from "@/components/portal-section"
import { PrivateClassesSection } from "@/components/private-classes-section"
import { AcademicSupportSection } from "@/components/academic-support-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export const dynamic = "force-dynamic"

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <WelcomeVideoSection />
        <BenefitsSection />
        <TeachersSection />
        <TestimonialsSection />
        <PortalSection />
        <PricingSection />
        <PrivateClassesSection />
        <AcademicSupportSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
