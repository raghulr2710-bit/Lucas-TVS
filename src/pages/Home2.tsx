import { SiteHeaderHome2 } from '../components/SiteHeaderHome2'
import { HeroHome2 } from '../components/HeroHome2'
import { WhoWeAre } from '../components/WhoWeAre'
import { IndustriesAnimatedHome2 } from '../components/IndustriesAnimatedHome2'
import { FocusAreas } from '../components/FocusAreas'
import { EngineeringServices } from '../components/EngineeringServices'
import { OurApproach } from '../components/OurApproach'
import { IntegratedEngineeringStack } from '../components/IntegratedEngineeringStack'
import { WhyChooseUsHome2 } from '../components/WhyChooseUsHome2'
import { MarqueeBand } from '../components/MarqueeBand'
import { SustainabilityHome2 } from '../components/SustainabilityHome2'
import { Careers } from '../components/Careers'
import { InsightsHome2 } from '../components/InsightsHome2'
import { SiteFooterHome2 } from '../components/SiteFooterHome2'

export default function Home2() {
  return (
    <div className="relative">
      <SiteHeaderHome2 />
      <main>
        <HeroHome2 />
        {/* Everything below the hero rides over it. The hero is `sticky
            top-0 z-0`, so it stays pinned while this block scrolls up and
            covers it — hence the opaque background here, without which the
            pinned video would show through the gaps between sections. */}
        <div className="relative z-10 bg-white">
          {/* Padding lives here, not in WhoWeAre — that component is shared
              with Home and NewHome, which keep their original spacing. */}
          <div className="pt-[100px]">
            <WhoWeAre />
          </div>
          <IndustriesAnimatedHome2 />
          <FocusAreas />
          <EngineeringServices />
          <OurApproach />
          <IntegratedEngineeringStack />
          <WhyChooseUsHome2 />
          <MarqueeBand />
          <SustainabilityHome2 />
          <Careers />
          <InsightsHome2 />
        </div>
      </main>
      {/* Also above the pinned hero — it's a sibling of <main>, so without
          its own layer it would share the z-0 band with the hero. */}
      <div className="relative z-10">
        <SiteFooterHome2 />
      </div>
    </div>
  )
}
