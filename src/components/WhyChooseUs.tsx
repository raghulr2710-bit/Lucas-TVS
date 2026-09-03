import { Button, Eyebrow } from './primitives'
import {
  whyFeature,
  whyQualityFirst,
  whyEngineeringExcellence,
  whyGlobalPerspective,
  whySustainableMobility,
} from '../lib/assets'

const PILLARS = [
  {
    title: 'Quality First',
    image: whyQualityFirst,
    alt: 'Close-up of a circuit board under green lighting',
  },
  {
    title: 'Engineering Excellence',
    image: whyEngineeringExcellence,
    alt: 'Robotic arm on an automated production line',
  },
  {
    title: 'Global Perspective',
    image: whyGlobalPerspective,
    alt: 'Illuminated globe representing worldwide operations',
  },
  {
    title: 'Sustainable Mobility',
    image: whySustainableMobility,
    alt: 'Wind turbines on a forested ridge at sunset',
  },
]

export function WhyChooseUs() {
  return (
    <section className="shell pb-4 lg:pb-8">
      <header className="gap-12 lg:flex lg:items-start lg:justify-between">
        <div className="lg:max-w-[590px]">
          <Eyebrow className="!text-[18px]">Why Chose us</Eyebrow>
          <h2 className="mt-3 font-display text-[28px] leading-[1.15] font-medium text-ink sm:text-[34px] lg:text-[40px]">
            Driving Future Mobility Through Innovation
          </h2>
        </div>

        <div className="mt-6 lg:mt-2 lg:max-w-[660px] lg:flex-1">
          <p className="font-body text-[15px] leading-[1.5] text-body lg:text-[16px]">
            Our Research &amp; Development ecosystem combines engineering
            expertise, advanced testing, and intelligent product design to
            create next-generation mobility solutions.
          </p>
          <Button className="mt-6">Explore More</Button>
        </div>
      </header>

      <div className="mt-10 flex gap-[18px] overflow-x-auto pb-2 lg:mt-[86px] lg:overflow-visible">
        {/*
          Feature card. The Figma export is a flat mock of the whole row, so
          the crop below is carried across verbatim to isolate the first card.
        */}
        <article className="relative h-[420px] w-[300px] shrink-0 overflow-hidden rounded-[18.3px] sm:w-[420px] lg:h-[576px] lg:w-[549px]">
          <img
            src={whyFeature}
            alt="Digital twin of an electric vehicle in an engineering bay, captioned “Engineering Tomorrow, Today.”"
            className="absolute max-w-none"
            style={{
              height: '163.71%',
              width: '257.33%',
              left: '-7.22%',
              top: '-54.12%',
            }}
          />
        </article>

        {/* Pillars ---------------------------------------------------- */}
        {PILLARS.map((pillar) => (
          <article
            key={pillar.title}
            className="relative h-[420px] w-[110px] shrink-0 overflow-hidden rounded-[18.3px] lg:h-[576px] lg:w-[140px]"
          >
            <img
              src={pillar.image}
              alt={pillar.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/[0.66]" />

            <h3 className="absolute bottom-6 left-1/2 origin-center -translate-x-1/2 rotate-180 font-display text-[22px] font-medium whitespace-nowrap text-white lg:text-[30px] [writing-mode:vertical-rl]">
              {pillar.title}
            </h3>
          </article>
        ))}
      </div>
    </section>
  )
}
