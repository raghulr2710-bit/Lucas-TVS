import ReactLenis from 'lenis/react'
import { SiteHeader } from './components/SiteHeader'
import { Hero } from './components/Hero'
import { WhoWeAre } from './components/WhoWeAre'
import { Industries } from './components/Industries'
import { SolutionShowcase } from './components/SolutionShowcase'
import { ResearchDevelopment } from './components/ResearchDevelopment'
import { GlobalPresence } from './components/GlobalPresence'
import { Awards } from './components/Awards'
import { WhyChooseUs } from './components/WhyChooseUs'
import { MarqueeBand } from './components/MarqueeBand'
import { Sustainability } from './components/Sustainability'
import { Careers } from './components/Careers'
import { Insights } from './components/Insights'
import { SiteFooter } from './components/SiteFooter'

export default function App() {
  return (
    <ReactLenis root>
      <div className="relative overflow-x-hidden">
        <SiteHeader />
        <main>
          <Hero />
          <WhoWeAre />
          <Industries />
          <SolutionShowcase />
          <ResearchDevelopment />
          <GlobalPresence />
          <Awards />
          <WhyChooseUs />
          <MarqueeBand />
          <Sustainability />
          <Careers />
          <Insights />
        </main>
        <SiteFooter />
      </div>
    </ReactLenis>
  )
}
