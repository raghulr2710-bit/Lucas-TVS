import { PageShell } from '../../components/site/PageShell'
import { Pill, SplitHeader, StackHeader } from '../../components/site/design'
import {
  BODY_GAP,
  Band,
  CtaPlate,
  DarkBand,
  DarkHero,
  FeatureCard,
  SectorCard,
  ServiceCard,
  StatGrid,
  StepGrid,
} from '../../components/site/blocks'
import { ENGAGEMENT_MODELS, LIFECYCLE, SERVICE_LINES } from '../../data/capabilities'
import { INDUSTRIES } from '../../data/industries'
import { ROUTES } from '../../lib/routes'
import { focusAiDigital } from '../../lib/assets'

const STATS = [
  { value: '8', label: 'Engineering service lines' },
  { value: '3', label: 'Sectors served with one engineering core' },
  { value: '6', label: 'Lifecycle stages covered end to end' },
  { value: 'MIL', accent: '·SIL·HIL', label: 'Validation at every level' },
]

/**
 * Capabilities (Engineering Services), built to the Capabilities artboards
 * of the 29 Sep reference, desktop and mobile. Copy is the reference's.
 *
 * Sections, as drawn: hero · "One engineering core" with the stat row ·
 * the eight service lines · the lifecycle on a dark band · engagement
 * models · the three sectors · closing plate.
 */
export default function CapabilitiesPage() {
  return (
    <PageShell title="Engineering Services">
      <DarkHero
        image={focusAiDigital}
        position="65% center"
        heightClass="min-h-[564px] lg:min-h-[640px]"
        crumbs={[{ label: 'Capabilities' }]}
        title="Capabilities That Drive"
        accent="Innovation."
        intro="From concept to deployment, our engineering services span embedded systems, electronics, software, safety and validation."
        actions={
          <>
            <Pill to={ROUTES.contact}>Talk to Engineering</Pill>
            <Pill to={ROUTES.products} tone="outline">
              View Products
            </Pill>
          </>
        }
      />

      <Band>
        <SplitHeader
          eyebrow="Horizontal by design"
          title="One engineering core."
          accent="Every sector."
          body="The same teams, tools and processes serve Automotive, Industrial and Defence — so learning in one sector strengthens the others."
        />
        <StatGrid stats={STATS} className={BODY_GAP} />
      </Band>

      <Band tone="mute">
        <StackHeader eyebrow="What we do" title="Eight service lines," accent="one partner." />
        <div className={`${BODY_GAP} grid gap-3.5 lg:grid-cols-2 lg:gap-6`}>
          {SERVICE_LINES.map((line) => (
            <ServiceCard
              key={line.title}
              icon={<line.icon />}
              title={line.title}
              body={line.body}
              tags={line.tags}
            />
          ))}
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
        <StackHeader eyebrow="How we engage" title="Flexible models," accent="clear ownership." />
        <div className={`${BODY_GAP} grid gap-3.5 md:grid-cols-3 lg:gap-6`}>
          {ENGAGEMENT_MODELS.map((model) => (
            <FeatureCard
              key={model.title}
              icon={<model.icon />}
              title={model.title}
              body={model.body}
              link={{ label: 'Discuss your programme', to: ROUTES.contact }}
            />
          ))}
        </div>
      </Band>

      <Band tone="mute">
        <StackHeader eyebrow="Industries we serve" title="One Engineering Core," accent="Three Sectors." />
        <div className={`${BODY_GAP} grid gap-3.5 md:grid-cols-3 lg:gap-6`}>
          {INDUSTRIES.map((industry) => (
            <SectorCard
              key={industry.slug}
              image={industry.cardImage}
              imageLabel={industry.cardImageLabel}
              title={industry.label}
              body={industry.cardBody}
              to={industry.to}
            />
          ))}
        </div>
      </Band>

      <CtaPlate />
    </PageShell>
  )
}
