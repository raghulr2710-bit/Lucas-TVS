import { Button } from './primitives'
import { facilityAerial } from '../lib/assets'

const STATS = [
  { value: '3', label: 'Sectors served' },
  { value: '5', label: 'Focus areas' },
  { value: '8', label: 'Engineering service lines' },
  { value: '∞', label: 'Concept → SOP lifecycle' },
]

export function WhoWeAre() {
  return (
    <section id="about" className="shell-wide pb-16 lg:pb-24">
      <div className="relative">
        {/*
          The photo export carries a transparent notch across its top-left
          corner that this copy block is designed to sit in. At `lg` the block
          is absolutely placed into that notch; below `lg` it runs in normal
          flow and the image is cropped from the bottom so the notch never
          shows.
        */}
        <div className="mb-8 lg:absolute lg:top-[6px] lg:left-[36px] lg:z-10 lg:mb-0 lg:w-[540px]">
          <p className="font-body text-[18px] leading-none font-medium text-green lg:text-[20px]">
            Who we are
          </p>
          <h2 className="mt-4 max-w-[514px] font-display text-[28px] leading-[1.15] font-medium text-ink sm:text-[34px] lg:mt-6 lg:text-[40px]">
            Products, Systems &amp; Engineering Services
          </h2>
          <p className="mt-4 max-w-[532px] font-body text-[15px] leading-[1.5] text-body lg:mt-5 lg:text-[16px]">
            We deliver end-to-end engineering, software and digital solutions
            that help customers build intelligent products, advanced
            electronics, connected platforms and mission-critical systems.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[15px]">
          <img
            src={facilityAerial}
            alt="Aerial view of the Lucas-TVS manufacturing campus at sunset"
            className="h-[380px] w-full object-cover object-bottom sm:h-[460px] lg:h-auto lg:object-fill"
          />

          <Button
            variant="ghost"
            className="absolute top-5 right-5 !border-white !bg-white !px-9 shadow-[0_4px_4px_0_rgba(211,211,211,0.25),inset_0_0_4px_0_rgba(0,0,0,0.25)] lg:top-[47px] lg:right-[40px]"
          >
            Explore More
          </Button>

          <dl className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-x-6 gap-y-4 bg-black/[0.18] px-5 py-5 backdrop-blur-[2px] lg:flex lg:flex-nowrap lg:justify-between lg:gap-x-6 lg:px-[48px] lg:py-[24px]">
            {STATS.map((stat) => (
              <div key={stat.label} className="lg:min-w-[130px] lg:shrink-0">
                <dt className="font-plex text-[26px] leading-none font-semibold tracking-[-1.6px] text-white lg:text-[45.7px]">
                  {stat.value}
                </dt>
                <dd className="mt-1.5 font-body text-[10px] leading-[1.27] tracking-[1.1px] text-white uppercase lg:mt-4 lg:text-[15px] lg:tracking-[1.38px] lg:whitespace-nowrap">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
