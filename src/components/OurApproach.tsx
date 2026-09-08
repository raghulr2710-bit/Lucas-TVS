import {
  Lightbulb,
  Cpu,
  Settings,
  SquareCheck,
  Rocket,
  RefreshCw,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'
import { approachBackdrop } from '../lib/assets'

const STEPS: { no: string; title: string; description: string; icon: LucideIcon }[] = [
  {
    no: '01',
    title: 'Concept',
    description: 'Requirements & feasibility',
    icon: Lightbulb,
  },
  {
    no: '02',
    title: 'Architecture',
    description: 'System & software',
    icon: Cpu,
  },
  {
    no: '03',
    title: 'Development',
    description: 'Embedded, electronics, software',
    icon: Settings,
  },
  {
    no: '04',
    title: 'Validation',
    description: 'MIL/SIL/HIL, functional safety',
    icon: SquareCheck,
  },
  {
    no: '05',
    title: 'Deployment',
    description: 'Integration & release',
    icon: Rocket,
  },
  {
    no: '06',
    title: 'Lifecycle Support',
    description: 'Sustaining, updates, OTA',
    icon: RefreshCw,
  },
]

/** Home2-only. */
export function OurApproach() {
  return (
    <section className="shell-wide pt-16 pb-20 lg:pt-32 lg:pb-32">
      <div className="relative overflow-hidden rounded-[24px]">
        <img
          src={approachBackdrop}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative px-5 pt-10 pb-10 sm:px-8 lg:px-12 lg:pt-14 lg:pb-16">
          <p className="font-sans text-[13px] font-semibold tracking-[3px] text-white/85 uppercase lg:text-[14px]">
            Our Engineering Approach
          </p>
          <h2 className="mt-3 max-w-[640px] font-display text-[30px] leading-[1.15] font-medium text-white sm:text-[38px] lg:text-[44px]">
            From Concept To <span className="text-lime">Lifecycle.</span>
          </h2>
          <p className="mt-4 max-w-[620px] font-body text-[14px] leading-[1.5] text-white/75 lg:text-[16px]">
            A comprehensive engineering journey that transforms ideas into
            intelligent, real-world solutions and keeps them evolving for a
            smarter tomorrow.
          </p>

          {/* Steps -------------------------------------------------- */}
          <div className="relative mt-10 lg:mt-14">
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:flex lg:gap-0">
              {STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className="group relative flex flex-col lg:flex-1 lg:px-2 lg:first:pl-0 lg:last:pr-0"
                >
                  {/* Icon node + connecting line to the next step (desktop only) */}
                  <div className="relative flex items-center">
                    <span className="relative z-10 grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full border border-lime/70 bg-black/50 shadow-[0_0_16px_rgba(163,230,53,0.35)] backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-lime/15 group-hover:shadow-[0_0_28px_rgba(163,230,53,0.65)] lg:h-[54px] lg:w-[54px]">
                      <step.icon
                        aria-hidden
                        strokeWidth={1.75}
                        className="h-[20px] w-[20px] text-lime lg:h-[24px] lg:w-[24px]"
                      />
                    </span>

                    {i < STEPS.length - 1 && (
                      <span className="ml-2 hidden h-px flex-1 bg-lime/35 lg:block" />
                    )}

                    {i < STEPS.length - 1 && (
                      <ChevronRight
                        aria-hidden
                        className="absolute top-1/2 -right-1 hidden h-4 w-4 -translate-y-1/2 text-lime/70 lg:block"
                      />
                    )}
                  </div>

                  {/* Card ------------------------------------------- */}
                  <div className="mt-4 flex-1 rounded-[10px] border-b-[3px] border-lime bg-black/45 p-3.5 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-black/65 group-hover:shadow-[0_12px_28px_rgba(163,230,53,0.18)] lg:p-4">
                    <p className="font-mono text-[11px] tracking-[1px] text-white/45 transition-colors duration-300 group-hover:text-lime/80">
                      {step.no}
                    </p>
                    <h3 className="mt-1 font-display text-[15px] leading-[1.2] font-medium text-white lg:text-[16px]">
                      {step.title}
                    </h3>
                    <p className="mt-1 font-body text-[12.5px] leading-[1.4] text-white/70 transition-colors duration-300 group-hover:text-white/90 lg:text-[13.5px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
