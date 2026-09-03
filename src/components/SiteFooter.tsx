import { Button } from './primitives'
import { logoLucasTvsFooter } from '../lib/assets'

const COLUMNS = [
  {
    heading: 'Company',
    links: ['About', 'Quality & Standards', 'Global Presence', 'Careers', 'Contact'],
  },
  {
    heading: 'Products',
    links: [
      'Traction Motors',
      'Motor Controllers',
      'Battery Management',
      'DC-DC Converters',
      'On-board Chargers',
      'Control Units',
    ],
  },
  {
    heading: 'Capabilities',
    links: [
      'Hardware Engineering',
      'Embedded Software',
      'Functional Safety',
      'Validation & Testing',
      'Electronics Design',
      'Manufacturing',
    ],
  },
  {
    heading: 'Resources',
    links: [
      'Insights',
      'Whitepapers',
      'Case Studies',
      'Locations',
      'Supplier enquiries',
    ],
  },
]

const LEGAL = ['LinkedIn', 'YouTube', 'X', 'Privacy', 'Terms']

export function SiteFooter() {
  return (
    <footer className="shell-wide pb-10">
      <div className="relative overflow-hidden rounded-[15px] border-2 border-line bg-white px-6 pt-8 pb-6 lg:px-[36px] lg:pt-[26px]">
        {/* Masthead --------------------------------------------------- */}
        <div className="gap-8 lg:flex lg:items-start lg:justify-between">
          <div className="lg:max-w-[542px]">
            <img
              src={logoLucasTvsFooter}
              alt="Lucas-TVS"
              className="h-[54px] w-auto lg:h-[67px]"
            />
            <p className="mt-6 font-sans text-[15px] leading-[1.38] text-body-soft lg:mt-[32px] lg:text-[16px]">
              Auto-electricals, embedded software and electrified powertrain
              systems, engineered and manufactured in India since 1962.
            </p>
          </div>

          <div className="mt-8 rounded-[14.75px] border-[1.054px] border-lime bg-lime/[0.19] p-[30px] lg:mt-[2px] lg:w-[590px] lg:shrink-0">
            <div className="gap-6 sm:flex sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-display text-[20px] leading-none text-black lg:text-[22px]">
                  Engineering enquiries
                </p>
                <p className="mt-3 max-w-[338px] font-sans text-[15px] leading-[1.38] text-body-soft lg:text-[16px]">
                  Tell us about your programme and we will route you to the
                  right team.
                </p>
              </div>
              <Button className="mt-5 shrink-0 sm:mt-0">
                Talk to Engineering
              </Button>
            </div>
          </div>
        </div>

        {/* Link columns ----------------------------------------------- */}
        <nav className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:mt-[80px] lg:gap-x-[75px]">
          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h2 className="font-display text-[15px] leading-[1.27] tracking-[1.74px] text-green uppercase lg:text-[17px]">
                {column.heading}
              </h2>
              <ul className="mt-6 space-y-4 lg:mt-[34px]">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-sans text-[15px] leading-[1.23] text-body transition-colors hover:text-ink"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Oversized wordmark ----------------------------------------- */}
        <p
          aria-hidden
          className="watermark mt-8 overflow-hidden text-center font-display text-[16vw] leading-none font-bold whitespace-nowrap uppercase select-none lg:mt-[10px] lg:text-[212px]"
        >
          <span>l</span>
          <span className="lowercase">ucas</span>
          <span> TVS</span>
        </p>

        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="font-mono text-[10px] leading-[1.29] tracking-[0.98px] text-black">
            © 2026 Lucas-TVS Limited · All rights reserved
          </p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {LEGAL.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="font-sans text-[11.6px] leading-[1.23] text-black transition-colors hover:text-green"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
