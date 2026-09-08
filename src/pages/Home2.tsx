import { SiteHeader } from '../components/SiteHeader'
import { Hero } from '../components/Hero'
import { WhoWeAre } from '../components/WhoWeAre'
import { IndustriesAnimated } from '../components/IndustriesAnimated'
import { FocusAreas } from '../components/FocusAreas'
import { EngineeringServices } from '../components/EngineeringServices'
import { OurApproach } from '../components/OurApproach'
import { IntegratedEngineeringStack } from '../components/IntegratedEngineeringStack'
import { WhyChooseUs } from '../components/WhyChooseUs'
import { MarqueeBand } from '../components/MarqueeBand'
import { Sustainability } from '../components/Sustainability'
import { Careers } from '../components/Careers'
import { Insights } from '../components/Insights'
import { SiteFooter } from '../components/SiteFooter'

export default function Home2() {
  return (
    <div className="relative">
      <SiteHeader />
      <main>
        <Hero />
        <WhoWeAre />
        <IndustriesAnimated />
        <FocusAreas />
        <EngineeringServices />
        <OurApproach />
        <IntegratedEngineeringStack />
        <WhyChooseUs />
        <MarqueeBand />
        <Sustainability />
        <Careers />
        <Insights />
      </main>
      <SiteFooter />
    </div>
  )
}
