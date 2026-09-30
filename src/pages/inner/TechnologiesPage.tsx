import { PageShell } from '../../components/site/PageShell'
import { Pill, SplitHeader, StackHeader } from '../../components/site/design'
import {
  BODY_GAP,
  Band,
  CtaPlate,
  DarkHero,
  SectorCard,
  SolutionRow,
} from '../../components/site/blocks'
import { INDUSTRIES } from '../../data/industries'
import { TECHNOLOGIES } from '../../data/technologies'
import { ROUTES } from '../../lib/routes'
import { focusAiDigital } from '../../lib/assets'

/**
 * Technologies. Not drawn in the reference; built from its blocks so it
 * sits in the same family — the alternating solution rows from the
 * industry pages, the sector cards from Capabilities.
 *
 * Each area is a section with an id (`#electrification` and so on), so the
 * Industries landing can link straight to one.
 *
 * Worth a decision at review: the homepage already names these five areas
 * twice (focus grid and Solutions finder), so this page is a third
 * statement of them.
 */
export default function TechnologiesPage() {
  return (
    <PageShell title="Technologies">
      <DarkHero
        image={focusAiDigital}
        position="65% center"
        heightClass="min-h-[564px] lg:min-h-[640px]"
        crumbs={[{ label: 'Capabilities', to: ROUTES.capabilities }, { label: 'Technologies' }]}
        title="Five areas,"
        accent="every sector."
        intro="The technology areas our engineering teams are organised around — applied across Automotive, Industrial and Defence."
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
        <SplitHeader
          eyebrow="Technologies"
          title="Where we"
          accent="focus."
          body="Engineering capabilities packaged for the challenges your programmes face today."
        />
        <div className="mt-7 flex flex-col gap-12 lg:mt-14 lg:gap-[72px]">
          {TECHNOLOGIES.map((tech, i) => (
            <div key={tech.id} id={tech.id} className="scroll-mt-[104px]">
              <SolutionRow
                flip={i % 2 === 1}
                solution={{
                  title: tech.name,
                  description: tech.blurb,
                  items: tech.items,
                  icon: <tech.icon />,
                  image: tech.image,
                  imageLabel: tech.imageAlt,
                }}
              />
            </div>
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
