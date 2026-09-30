import { useParams } from 'react-router-dom'
import { PageShell } from '../../components/site/PageShell'
import { Eyebrow, ImageSlot, Pill, SplitHeader, StackHeader } from '../../components/site/design'
import {
  BODY_GAP,
  Band,
  CtaPlate,
  DarkBand,
  DarkHero,
  FeatureCard,
  MoreTile,
  ProductTile,
  SectorCard,
  SectorPills,
  SolutionRow,
  Statement,
} from '../../components/site/blocks'
import { BAT, INDUSTRIES, industryBySlug, type Industry } from '../../data/industries'
import { CATALOGUE_URL, productsIn } from '../../data/products'
import { ROUTES, insightPath } from '../../lib/routes'
import NotFoundPage from './NotFoundPage'

/**
 * Automotive, Industrial and Defence & Aerospace — one template, built to
 * the three industry artboards of the 29 Sep reference, which share it.
 * Each page's copy lives in data/industries.ts.
 *
 * Sections, as drawn: hero with the sector switcher · the opportunity ·
 * focus areas · [Automotive only: the BAT investment band] · solutions,
 * alternating · the sector's products · the other two sectors · closing
 * plate.
 */
export default function IndustryPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const industry = industryBySlug(slug)
  if (!industry) return <NotFoundPage />

  const others = INDUSTRIES.filter((i) => i.slug !== industry.slug)
  const products = productsIn(industry.sector)
  const isAutomotive = industry.slug === 'automotive'

  return (
    <PageShell title={industry.label}>
      <DarkHero
        image={industry.heroImage}
        position={industry.heroPosition ?? '65% center'}
        heightClass={industry.heroHeight}
        crumbs={[{ label: 'Industries', to: ROUTES.industries }, { label: industry.label }]}
        title={industry.title}
        accent={industry.accent}
        intro={industry.intro}
        actions={
          <>
            <Pill to={ROUTES.contact}>Talk to Engineering</Pill>
            <Pill to={ROUTES.capabilities} tone="outline">
              Explore Capabilities
            </Pill>
          </>
        }
        below={
          <SectorPills
            items={INDUSTRIES.map((i) => ({ label: i.label, to: i.to, current: i.slug === industry.slug }))}
          />
        }
      />

      <Band>
        <Statement
          eyebrow="The opportunity"
          statement={industry.opportunity.statement}
          points={industry.opportunity.points}
        />
      </Band>

      <Band tone="mute">
        <StackHeader eyebrow="Key focus areas" title="Where we" accent="focus." />
        <div className={`${BODY_GAP} grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6`}>
          {industry.focusAreas.map((area) => (
            <FeatureCard key={area.title} icon={<area.icon />} title={area.title} body={area.body} />
          ))}
        </div>
      </Band>

      {isAutomotive && <BatBand />}

      <Band>
        <SplitHeader
          eyebrow={industry.solutionsEyebrow}
          title="Solutions that"
          accent="deliver."
          body="Engineering capabilities packaged for the challenges your programmes face today."
        />
        <div className="mt-7 flex flex-col gap-12 lg:mt-14 lg:gap-[72px]">
          {industry.solutions.map((solution, i) => (
            <SolutionRow
              key={solution.title}
              flip={i % 2 === 1}
              solution={{ ...solution, icon: <solution.icon /> }}
            />
          ))}
        </div>
      </Band>

      <ProductsBand industry={industry} products={products} isAutomotive={isAutomotive} />

      <Band tone="mute">
        <StackHeader eyebrow="Other industries" title="One core," accent="three sectors." />
        <div className={`${BODY_GAP} grid gap-3.5 md:grid-cols-2 lg:gap-6`}>
          {others.map((other) => (
            <SectorCard
              key={other.slug}
              image={other.cardImage}
              imageLabel={other.cardImageLabel}
              title={other.label}
              body={other.cardBody}
              to={other.to}
            />
          ))}
        </div>
      </Band>

      <CtaPlate />
    </PageShell>
  )
}

function ProductsBand({
  industry,
  products,
  isAutomotive,
}: {
  industry: Industry
  products: ReturnType<typeof productsIn>
  isAutomotive: boolean
}) {
  return (
    <Band tone="mute">
      <SplitHeader
        eyebrow={industry.products.eyebrow}
        title={industry.products.title}
        accent="Products."
        body={industry.products.body}
        actions={
          isAutomotive ? (
            <Pill href={CATALOGUE_URL.lucasTvs} tone="ghost">
              Lucas TVS Products ↗
            </Pill>
          ) : (
            <Pill to={ROUTES.products} tone="ghost">
              All Products →
            </Pill>
          )
        }
      />
      <ul className={`${BODY_GAP} grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4`}>
        {products.map((product) => (
          <li key={product.slug}>
            <ProductTile
              product={{ ...product, blurb: isAutomotive ? product.blurb : (product.shortBlurb ?? product.blurb) }}
            />
          </li>
        ))}
        {isAutomotive && (
          <li>
            <MoreTile label="All Products & Platforms" to={ROUTES.products} />
          </li>
        )}
      </ul>
    </Band>
  )
}

/** Automotive only: the strategic investment in BAT, Germany. */
function BatBand() {
  return (
    <DarkBand>
      <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-14">
        <div className="flex flex-col gap-[18px] lg:w-[600px] lg:shrink-0">
          <Eyebrow tone="light">{BAT.eyebrow}</Eyebrow>
          <p className="font-display text-[30px] leading-[1.15] font-semibold text-white lg:text-[40px]">
            {BAT.title} <span className="text-lime">{BAT.accent}</span>
          </p>
          {BAT.paragraphs.map((text) => (
            <p key={text} className="font-body text-[15px] leading-[1.65] text-white/80">
              {text}
            </p>
          ))}
          <div className="flex flex-wrap gap-3">
            <Pill to={insightPath('lucas-tvs-invests-in-bat-germany')}>Read the story</Pill>
          </div>
        </div>

        <div className="flex min-w-0 grow flex-col gap-3.5">
          <ImageSlot
            tone="dark"
            label="Image: BAT engineering facility"
            className="h-[200px] w-full rounded-[20px] lg:h-[260px]"
          />
          <ul className="grid grid-cols-2 gap-3.5">
            {BAT.tiles.map((tile) => (
              <li
                key={tile.title}
                className="flex flex-col gap-1 rounded-[16px] border border-[#3a3c3a] bg-black/60 p-4"
              >
                <span className="font-display text-[17px] leading-[1.25] font-semibold text-lime">
                  {tile.title}
                </span>
                <span className="font-body text-[13px] text-white/75">{tile.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DarkBand>
  )
}
