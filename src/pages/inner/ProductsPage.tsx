import { useMemo, useState } from 'react'
import { PageShell } from '../../components/site/PageShell'
import { Eyebrow, FRAME, Pill, SplitHeader, StackHeader } from '../../components/site/design'
import {
  ArrowCircle,
  BODY_GAP,
  Band,
  ChipFilter,
  CtaPlate,
  DarkBand,
  DarkHero,
  MoreTile,
  PillSearch,
  ProductTile,
  SmartLink,
} from '../../components/site/blocks'
import { CATALOGUE_URL, PRODUCTS, PRODUCT_SECTORS, productsIn, type Sector } from '../../data/products'
import { ROUTES } from '../../lib/routes'
import { focusElectrification, focusGridElectrification, logoLucasTvs } from '../../lib/assets'

const ALL = 'All Products'
const ALL_CATEGORIES = 'All Categories'
const CATEGORIES = [ALL_CATEGORIES, ...new Set(PRODUCTS.map((p) => p.category))]

const PORTFOLIO = [
  {
    name: 'Lucas TVS Products',
    body: 'Starters, alternators, motors and more',
    href: CATALOGUE_URL.lucasTvs,
    logo: logoLucasTvs,
  },
  {
    name: 'India Nippon Electricals Products',
    body: 'Ignition, power and electronic products',
    href: CATALOGUE_URL.inel,
  },
]

/**
 * Products & Platforms, built to the Products artboards of the 29 Sep
 * reference. Copy and product lines are the reference's.
 *
 * The explore grid works: the sector chips, the search field and the
 * category menu all filter it, across the whole catalogue.
 *
 * At rest it is exactly the reference — "All Products" chosen, the
 * automotive range in the grid — because on this page "all products" is
 * the page, not the grid: the defence and industrial ranges each have
 * their own band further down. Putting all fifteen in the grid as well
 * would show eight of them twice, and on a phone stack sixteen cards
 * before the first band. The moment any filter or search is applied, the
 * grid ranges over all fifteen.
 */
export default function ProductsPage() {
  const [sector, setSector] = useState<string>(ALL)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(ALL_CATEGORIES)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (sector === ALL && category === ALL_CATEGORIES && !q) return productsIn('Automotive')
    return PRODUCTS.filter(
      (p) =>
        (sector === ALL || p.sector === sector) &&
        (category === ALL_CATEGORIES || p.category === category) &&
        (!q || `${p.name} ${p.category} ${p.blurb}`.toLowerCase().includes(q)),
    )
  }, [sector, query, category])

  return (
    <PageShell title="Products & Platforms">
      <DarkHero
        image={focusElectrification}
        position="70% center"
        heightClass="min-h-[525px] lg:min-h-[640px]"
        crumbs={[{ label: 'Products & Platforms' }]}
        title="Hardware That Ships at"
        accent="Volume."
        intro="High-performance hardware and systems for next-generation mobility, industry and defence — backed by the Lucas-TVS group."
        actions={
          <>
            <Pill href="#explore">Explore Products</Pill>
            <Pill to={ROUTES.contact} tone="outline">
              Talk to Engineering
            </Pill>
          </>
        }
      />

      {/* Explore -------------------------------------------------------- */}
      <Band id="explore">
        <SplitHeader
          eyebrow="Explore our products"
          title="Built for"
          accent="electrified platforms."
          body="Featured automotive hardware, engineered and manufactured at scale."
        />

        <div className={`${BODY_GAP} flex flex-col gap-5 lg:gap-10`}>
          <ChipFilter
            label="Filter by sector"
            options={[ALL, ...PRODUCT_SECTORS]}
            value={sector}
            onChange={setSector}
          />
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <PillSearch
              value={query}
              onChange={setQuery}
              placeholder="Search products, e.g. Inverter, BMS…"
              label="Search products"
            />
            <label className="relative">
              <span className="sr-only">Filter by category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-11 w-full appearance-none rounded-full border-[1.5px] border-line-soft bg-white pr-10 pl-[18px] font-body text-[13px] text-ink focus:border-green-deep focus:outline-none sm:w-auto"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <span aria-hidden className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[11px] text-ink">
                ▾
              </span>
            </label>
          </div>

          {results.length > 0 ? (
            <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {results.map((product) => (
                <li key={product.slug}>
                  <ProductTile product={product} />
                </li>
              ))}
              <li>
                <MoreTile label="View the full Lucas TVS catalogue" href={CATALOGUE_URL.lucasTvs} />
              </li>
            </ul>
          ) : (
            <p className="rounded-[18px] border-[1.5px] border-dashed border-line-soft p-8 text-center font-body text-[15px] text-body">
              No products match those filters.{' '}
              <button
                type="button"
                onClick={() => {
                  setSector(ALL)
                  setQuery('')
                  setCategory(ALL_CATEGORIES)
                }}
                className="font-medium text-green-deep underline-offset-4 hover:underline"
              >
                Clear filters
              </button>
            </p>
          )}
        </div>
      </Band>

      {/* Featured platform -------------------------------------------- */}
      <DarkBand>
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex flex-col gap-[18px] lg:w-[520px] lg:shrink-0">
            <Eyebrow tone="light">Featured platform</Eyebrow>
            <p className="font-display text-[30px] leading-[1.15] font-semibold text-white lg:text-[40px]">
              Electrification &amp;
              <br />
              <span className="text-lime">Powertrain</span>
            </p>
            <p className="font-body text-[15px] leading-[1.6] text-white/80">
              Motors, controllers, inverters, battery management and charging — engineered together
              for 2, 3 and 4-wheelers, commercial and off-highway vehicles.
            </p>
            <div className="flex flex-wrap gap-3">
              <Pill to={ROUTES.automotive}>View Products</Pill>
              <Pill to={ROUTES.contact} tone="outline">
                Talk to Engineering
              </Pill>
            </div>
          </div>
          <img
            src={focusGridElectrification}
            alt="Exploded view of an electric drive unit — rotor, stator, gearbox and housing"
            decoding="async"
            className="h-[240px] w-full min-w-0 rounded-[20px] object-cover lg:h-[380px] lg:grow"
          />
        </div>
      </DarkBand>

      <SectorRange
        sector="Defence"
        tone="mute"
        eyebrow="Defence"
        title="Our Product Range for"
        accent="Defence."
        body="Localized, rugged electronics for modernization programmes."
        link={{ label: 'Defence & Aerospace →', to: ROUTES.defence }}
      />
      <SectorRange
        sector="Industrial"
        tone="white"
        eyebrow="Industrial"
        title="Products for"
        accent="smarter factories."
        body="Hardware and platforms that connect, control and optimise industrial operations."
        link={{ label: 'Industrial →', to: ROUTES.industrial }}
      />

      {/* Group portfolio ------------------------------------------------ */}
      <Band tone="mute">
        <StackHeader eyebrow="Group portfolio" title="Leveraging the wider" accent="Lucas-TVS ecosystem." />
        <div className={`${BODY_GAP} grid gap-3.5 lg:grid-cols-2 lg:gap-6`}>
          {PORTFOLIO.map((item) => (
            <SmartLink
              key={item.name}
              href={item.href}
              className="group flex items-center justify-between gap-4 rounded-[20px] border-[1.5px] border-line-soft bg-white p-[22px] lg:p-7"
            >
              <span className="flex items-center gap-[18px]">
                {item.logo ? (
                  <span className="flex h-11 w-[110px] shrink-0 items-center">
                    <img src={item.logo} alt="" aria-hidden decoding="async" className="max-h-11 w-auto" />
                  </span>
                ) : (
                  <span
                    role="img"
                    aria-label="Logo — to come"
                    className="h-11 w-[110px] shrink-0 rounded-[10px] bg-[repeating-linear-gradient(135deg,#d9d9d5_0px,#d9d9d5_14px,#cfcfcb_14px,#cfcfcb_28px)]"
                  />
                )}
                <span className="flex flex-col gap-1">
                  <span className="font-display text-[19px] leading-[1.25] font-semibold text-ink">{item.name}</span>
                  <span className="font-body text-[13px] text-body">{item.body}</span>
                </span>
              </span>
              <ArrowCircle />
            </SmartLink>
          ))}
        </div>
      </Band>

      <CtaPlate />
    </PageShell>
  )
}

/** A sector's four-card range, with its header and onward link. */
function SectorRange({
  sector,
  tone,
  eyebrow,
  title,
  accent,
  body,
  link,
}: {
  sector: Sector
  tone: 'white' | 'mute'
  eyebrow: string
  title: string
  accent: string
  body: string
  link: { label: string; to: string }
}) {
  return (
    <section className={tone === 'mute' ? 'bg-surface-mute' : undefined}>
      <div className={`${FRAME} py-14 lg:py-24`}>
        <SplitHeader
          eyebrow={eyebrow}
          title={title}
          accent={accent}
          body={body}
          actions={
            <Pill to={link.to} tone="ghost">
              {link.label}
            </Pill>
          }
        />
        <ul className={`${BODY_GAP} grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4`}>
          {productsIn(sector).map((product) => (
            <li key={product.slug}>
              <ProductTile product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
