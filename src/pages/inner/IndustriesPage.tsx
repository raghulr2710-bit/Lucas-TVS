import { PageShell } from '../../components/site/PageShell'
import { Pill, SplitHeader, StackHeader } from '../../components/site/design'
import {
  ArrowCircle,
  BODY_GAP,
  Band,
  CtaPlate,
  DarkHero,
  SectorCard,
  SmartLink,
} from '../../components/site/blocks'
import { INDUSTRIES } from '../../data/industries'
import { TECHNOLOGIES } from '../../data/technologies'
import { ROUTES } from '../../lib/routes'
import { approachBackdrop } from '../../lib/assets'

/**
 * Industries landing. Not drawn in the reference — the reference's
 * "Industries" nav item goes straight to Automotive — but the site has
 * three sector pages and needs a page that introduces all three, so this
 * one is assembled from the reference's own blocks and copy: the sector
 * cards and lines used on Capabilities, the "One engineering core" line,
 * and the five technology areas.
 */
export default function IndustriesPage() {
  return (
    <PageShell title="Industries">
      <DarkHero
        image={approachBackdrop}
        position="60% center"
        heightClass="min-h-[564px] lg:min-h-[640px]"
        crumbs={[{ label: 'Industries' }]}
        title="One Engineering Core,"
        accent="Three Sectors."
        intro="The same teams, tools and processes serve Automotive, Industrial and Defence — so learning in one sector strengthens the others."
        actions={
          <>
            <Pill to={ROUTES.contact}>Talk to Engineering</Pill>
            <Pill to={ROUTES.capabilities} tone="outline">
              Explore Capabilities
            </Pill>
          </>
        }
      />

      <Band>
        <StackHeader eyebrow="Industries we serve" title="Choose your" accent="sector." />
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

      <Band tone="mute">
        <SplitHeader
          eyebrow="Technologies"
          title="Five areas,"
          accent="every sector."
          body="The technology areas our engineering teams are organised around, applied across all three industries."
          actions={
            <Pill to={ROUTES.technologies} tone="ghost">
              All Technologies →
            </Pill>
          }
        />
        <ul className={`${BODY_GAP} grid gap-3.5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4`}>
          {TECHNOLOGIES.map((tech) => (
            <li key={tech.id}>
              <SmartLink
                to={`${ROUTES.technologies}#${tech.id}`}
                className="group flex h-full flex-col justify-between gap-6 rounded-[18px] border-[1.5px] border-line-soft bg-white p-5 transition-colors duration-300 hover:border-green-deep/50"
              >
                <span className="font-display text-[17px] leading-[1.25] font-semibold text-ink">{tech.name}</span>
                <ArrowCircle />
              </SmartLink>
            </li>
          ))}
        </ul>
      </Band>

      <CtaPlate />
    </PageShell>
  )
}
