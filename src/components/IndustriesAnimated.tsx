import CircularSplitRoll from '@/components/ui/circular-split-roll'
import {
  industryTwoThreeWheeler,
  industryPassenger,
  industryCommercial,
  industryIndustrial,
} from '../lib/assets'

const INDUSTRIES = [
  {
    title: 'Two & Three-Wheelers',
    description: 'High-volume platforms tuned for efficiency and cost.',
    image: industryTwoThreeWheeler,
    alt: 'Electric three-wheeler auto-rickshaw on a city street',
  },
  {
    title: 'Passenger Vehicles',
    description: 'Full-featured control and safety architectures.',
    image: industryPassenger,
    alt: 'Passenger car on an urban road',
  },
  {
    title: 'Commercial & Off-Highway',
    description: 'Durability-first design for heavy-duty cycles.',
    image: industryCommercial,
    alt: 'Heavy-duty commercial truck at dusk',
  },
  {
    title: 'Industrial Power Systems',
    description: 'Stationary and industrial power conversion.',
    image: industryIndustrial,
    alt: 'Wind turbines beside industrial battery storage containers',
  },
]

const HEADER = (
  <div className="relative pt-8 lg:pt-10">
    {/* Oversized watermark behind the heading — same treatment as the
        original static Industries section. */}
    <p
      aria-hidden
      className="watermark pointer-events-none absolute inset-x-0 top-2 text-center font-display text-[8vw] leading-none font-bold whitespace-nowrap uppercase select-none lg:top-0 lg:text-[80px]"
    >
      Industries we serve
    </p>

    <div className="shell relative">
      <header className="mx-auto max-w-[973px] text-center">
        <h2 className="font-display text-[24px] leading-[1.15] font-medium text-ink sm:text-[30px] lg:text-[38px]">
          Built for How Each Segment Actually Operates.
        </h2>
        <p className="mx-auto mt-3 max-w-[955px] font-body text-[14px] leading-[1.5] text-body lg:text-[15px]">
          From urban mobility to heavy-duty operations, our solutions are
          engineered to deliver performance, reliability, and efficiency
          across every application.
        </p>
      </header>
    </div>
  </div>
)

export function IndustriesAnimated() {
  return (
    <section id="industries" className="relative overflow-hidden py-8 lg:py-12">
      <CircularSplitRoll
        items={INDUSTRIES}
        header={HEADER}
        radius={260}
        cardSize={240}
        viewportHeight="100vh"
        titleSize="clamp(20px, 2.4vw, 36px)"
        sectionHeight={90}
        background="transparent"
        titleColor="var(--color-ink)"
        textCenterScale={1.1}
        imageCenterScale={1.15}
        focusPhase={0}
      />
    </section>
  )
}
