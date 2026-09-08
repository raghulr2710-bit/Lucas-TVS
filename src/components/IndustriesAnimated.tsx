import CircularSplitRoll from '@/components/ui/circular-split-roll'
import {
  sectorAutomotive,
  sectorIndustrial,
  sectorDefenceAerospace,
} from '../lib/assets'

const INDUSTRIES = [
  {
    title: 'Automotive',
    description:
      'Accelerating the transition to connected, electric, autonomous and software-defined mobility.',
    image: sectorAutomotive,
    alt: 'Electric SUV driving on a highway with a city skyline behind it',
  },
  {
    title: 'Industrial',
    description:
      'Enabling intelligent manufacturing, automation, digitalization and connected industrial ecosystems.',
    image: sectorIndustrial,
    alt: 'Robotic arm welding on an automated factory production line',
  },
  {
    title: 'Defence & Aerospace',
    description:
      'Supporting mission-critical programs through advanced engineering, embedded systems, electronics and digital technologies.',
    image: sectorDefenceAerospace,
    alt: 'Fighter jet flying past a mobile radar system at sunset',
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
          One Engineering Core, Three Sectors.
        </h2>
        <p className="mx-auto mt-3 max-w-[955px] font-body text-[14px] leading-[1.5] text-body lg:text-[15px]">
          Automotive, Industrial and Defence &amp; Aerospace — end-to-end
          engineering, software and digital solutions across every domain.
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
