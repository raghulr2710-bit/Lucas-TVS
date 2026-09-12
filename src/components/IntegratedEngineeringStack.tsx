import {
  Cpu,
  Code2,
  Network,
  Settings,
  Cloud,
  Brain,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { integratedStackBackdrop } from '../lib/assets'

const CAPABILITIES: { label: string; icon: LucideIcon }[] = [
  { label: 'Embedded Systems', icon: Cpu },
  { label: 'Software-Defined Platforms', icon: Code2 },
  { label: 'Electronics', icon: Network },
  { label: 'Controls', icon: Settings },
  { label: 'Cloud', icon: Cloud },
  { label: 'AI', icon: Brain },
  { label: 'Validation', icon: ShieldCheck },
]

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Home2-only. Was a single flat export (`software.png`) with the eyebrow,
 * heading and all seven chips baked into the pixels — unselectable,
 * unsearchable, and blurry on wide screens because one raster had to
 * stretch to the full card. Rebuilt as live markup over the supplied
 * backdrop; copy and chip order are unchanged from that artwork.
 */
export function IntegratedEngineeringStack() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="shell-wide pb-16 lg:pb-24">
      {/* The backdrop fades to near-white at its edges, so on the page's
          white background the card had no visible boundary. `border-line`
          is the same hairline the other cards on the page use. */}
      <div className="relative overflow-hidden rounded-[24px] border border-line bg-[#eef1f3]">
        {/* `object-right` keeps the vehicle anchored to the right edge as the
            card gets narrower, so the copy side stays the clean part of the
            photograph rather than being cropped into the lab equipment. */}
        <img
          src={integratedStackBackdrop}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-right"
        />

        {/* The backdrop is light but not uniform — this holds the text side
            near-white at every crop so the ink copy keeps its contrast. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent lg:via-white/75 lg:to-68%"
        />

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          // Wide enough at `lg` that the first four chips stay on one line,
          // matching the artwork's 4 + 3 wrap. At 620px they broke 2/4/1,
          // which also stretched the card tall enough that `object-cover`
          // started cropping the backdrop's clean left side away.
          className="relative max-w-[620px] px-6 py-10 sm:px-10 sm:py-12 lg:max-w-[880px] lg:px-12 lg:py-14"
        >
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-px w-7 bg-green" />
            <p className="font-sans text-[13px] leading-[1.25] font-medium text-green lg:text-[14px]">
              Hardware + software, under one roof
            </p>
          </div>

          <h2 className="mt-3 font-display text-[26px] leading-[1.15] font-medium text-ink sm:text-[32px] lg:text-[40px]">
            One integrated engineering stack<span className="text-green">.</span>
          </h2>

          <ul className="mt-6 flex flex-wrap gap-2.5 lg:mt-7 lg:gap-3">
            {CAPABILITIES.map((capability) => (
              <li key={capability.label}>
                <span className="inline-flex items-center gap-2 rounded-full border border-line-soft bg-white px-4 py-2.5 shadow-[0_2px_10px_rgba(16,24,40,0.06)] lg:px-[18px] lg:py-3">
                  <capability.icon
                    aria-hidden
                    strokeWidth={1.75}
                    className="h-[18px] w-[18px] shrink-0 text-green"
                  />
                  <span className="font-body text-[13px] leading-[1.2] font-medium whitespace-nowrap text-ink lg:text-[14px]">
                    {capability.label}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
