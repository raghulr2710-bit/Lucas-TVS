import { PageShell } from '../../components/site/PageShell'
import { ImageSlot, Pill, SplitHeader } from '../../components/site/design'
import {
  BODY_GAP,
  Band,
  CtaPlate,
  DarkBand,
  DarkHero,
  FeatureCard,
  StepGrid,
} from '../../components/site/blocks'
import { LIFECYCLE, STANDARDS } from '../../data/capabilities'
import { ROUTES } from '../../lib/routes'
import { rndFeature } from '../../lib/assets'

/**
 * Engineering & R&D. Not drawn in the reference; every block and line on
 * it is lifted from pages that are — the Hosur Tech Center from About, the
 * lifecycle from Capabilities, the standards from Quality — so the page
 * adds a route, not new claims. The facility photographs are the same
 * outstanding set About waits on.
 */
export default function EngineeringRdPage() {
  return (
    <PageShell title="Engineering & R&D">
      <DarkHero
        image={rndFeature}
        position="70% center"
        heightClass="min-h-[564px] lg:min-h-[640px]"
        crumbs={[{ label: 'Capabilities', to: ROUTES.capabilities }, { label: 'Engineering & R&D' }]}
        title="Our R&D Tech Center,"
        accent="Hosur."
        intro="Labs for electronics, embedded software and validation — including HIL rigs for faster, safer testing."
        actions={
          <>
            <Pill to={ROUTES.contact}>Talk to Engineering</Pill>
            <Pill to={ROUTES.capabilities} tone="outline">
              Explore Capabilities
            </Pill>
          </>
        }
      />

      <Band tone="mute">
        <SplitHeader
          eyebrow="Where we build"
          title="Our R&D Tech Center,"
          accent="Hosur."
          body="India Nippon Electricals Limited (INEL) R&D Tech Center, Plot No-137, Phase-1, SIPCOT Industrial Complex, Hosur, Tamil Nadu - 635126"
          actions={
            <Pill to={ROUTES.contact} tone="ghost">
              Visit Us
            </Pill>
          }
        />
        <div className={`${BODY_GAP} grid grid-cols-2 gap-3.5 lg:grid-cols-4 lg:grid-rows-[222px_222px] lg:gap-4`}>
          <ImageSlot
            label="Image: INEL R&D Tech Center, Hosur"
            className="col-span-2 h-[240px] rounded-[24px] md:h-[320px] lg:row-span-2 lg:h-full"
          />
          <ImageSlot label="Electronics lab" className="h-[140px] rounded-[18px] md:h-[200px] lg:h-full lg:rounded-[20px]" />
          <ImageSlot label="HIL test bench" className="h-[140px] rounded-[18px] md:h-[200px] lg:h-full lg:rounded-[20px]" />
          <div className="hidden lg:col-span-2 lg:block">
            <ImageSlot label="Engineering team at work" className="h-full w-full rounded-[20px]" />
          </div>
        </div>
      </Band>

      <DarkBand>
        <SplitHeader
          dark
          eyebrow="Our engineering approach"
          title="From Concept To"
          accent="Lifecycle."
          body="A comprehensive engineering journey that turns ideas into intelligent, real-world solutions — and keeps them evolving."
        />
        <StepGrid steps={LIFECYCLE} />
      </DarkBand>

      <Band>
        <SplitHeader
          eyebrow="Standards we engineer to"
          title="Safe & secure"
          accent="by design."
          body="Our safety and cybersecurity practices are aligned with the leading international standards."
          actions={
            <Pill to={ROUTES.quality} tone="ghost">
              Quality & Standards →
            </Pill>
          }
        />
        <div className={`${BODY_GAP} grid gap-3.5 md:grid-cols-3 lg:gap-6`}>
          {STANDARDS.map((standard) => (
            <FeatureCard
              key={standard.code}
              icon={<standard.icon />}
              title={standard.code}
              body={standard.body}
              titleClassName="text-[26px] leading-[1.25] lg:text-[32px]"
            />
          ))}
        </div>
      </Band>

      <CtaPlate />
    </PageShell>
  )
}
