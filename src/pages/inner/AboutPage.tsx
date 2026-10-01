import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageShell } from '../../components/site/PageShell'
import {
  BAND,
  Eyebrow,
  FRAME,
  Heading,
  IconArrowUpRight,
  IconBurst,
  IconClipboardCheck,
  IconPeople,
  IconShieldCheck,
  IconTarget,
  IconTile,
  IconTrend,
  ImageSlot,
  Pill,
  SplitHeader,
  StackHeader,
} from '../../components/site/design'
import {
  BODY_GAP,
  Band,
  CtaPlate,
  DarkBand,
  DarkHero,
  StatGrid,
  Statement,
} from '../../components/site/blocks'
import { cx } from '../../lib/cx'
import { ROUTES } from '../../lib/routes'
import {
  careersScene,
  logoInel,
  logoLucasTvs,
  rndFeature,
  solutionsPanelWaves,
  whyFeature,
} from '../../lib/assets'

/* ------------------------------------------------------------------
   Content — every string below is the 29 Sep reference's, verbatim.
------------------------------------------------------------------- */

const PILLARS = [
  'Deep expertise in embedded systems, software-defined platforms, electronics, controls, cloud, AI and validation — applied across Automotive, Industrial and Defence.',
  'Our capabilities span the entire product lifecycle, from concept and architecture to development, validation, deployment and lifecycle support.',
  'Product-engineering heritage combined with modern digital engineering helps customers move faster, reduce complexity and stay ahead.',
]

const STATS = [
  { value: '1962', label: 'Lucas-TVS heritage in automotive electricals' },
  { value: '3', label: 'Sectors served — Automotive, Industrial, Defence' },
  { value: '8', label: 'Engineering service lines under one roof' },
  { value: '6', label: 'Lifecycle stages, from concept to support' },
]

/**
 * `image` is the photograph the heritage panel shows for that milestone.
 * Only "Today" has one: no archive photography of 1930 or 1962 has been
 * supplied, and a modern picture standing in for either would be a claim
 * the page can't back. Those two render a designed plate instead (see
 * `HeritagePlate`) — give either an `image` and it takes over.
 *
 * `logo` puts the Lucas TVS mark on 1962's plate: the joint venture is
 * the year that name begins, so the mark is that milestone's one genuine
 * artefact.
 */
const TIMELINE: { year: string; text: string; image?: string; imageAlt?: string; logo?: boolean }[] = [
  { year: '1930', text: 'Lucas begins operations in India as Lucas Indian Service.' },
  {
    year: '1962',
    text: 'Lucas TVS is formed as a joint venture between Lucas Plc, UK and TVS Group, India.',
    logo: true,
  },
  {
    year: 'Today',
    text: 'A dedicated software & product-engineering division builds the next generation of intelligent products.',
    image: careersScene,
    imageAlt:
      'Engineer at a holographic display working across AI simulation, electrification, embedded systems and software-defined vehicles',
  },
]

const ECOSYSTEM: {
  name: string
  body: string
  link: string
  to?: string
  href?: string
  logo?: string
}[] = [
  {
    name: 'Lucas TVS',
    body: 'Six decades of automotive electrical and electronic products, manufactured at scale for OEMs in India and worldwide.',
    link: 'Lucas TVS Products',
    href: 'https://lucas-tvs.com/automotive-solutions-products/',
    logo: logoLucasTvs,
  },
  {
    name: 'India Nippon Electricals (INEL)',
    body: 'Group company and home of our R&D Tech Center in Hosur, with a strong portfolio of ignition and power products.',
    link: 'INEL Products',
    href: 'https://indianippon.com/Products-Solutions',
    logo: logoInel,
  },
  {
    name: 'Bavarian Automotive Technologies',
    body: 'Germany-based strategic investment bringing expertise in e-mobility, power electronics, SDV and system integration.',
    link: 'Read about BAT',
    to: ROUTES.automotive,
  },
]

const VALUES = [
  {
    title: 'Safety by design',
    body: 'Functional safety and cybersecurity built into every stage.',
    icon: IconShieldCheck,
  },
  {
    title: 'True partnership',
    body: 'Engineering teams that work as an extension of yours.',
    icon: IconPeople,
  },
  {
    title: 'Engineering rigour',
    body: 'Proven processes, traceability and validation discipline.',
    icon: IconClipboardCheck,
  },
  {
    title: 'Future-ready thinking',
    body: 'Electrification, SDV, IIoT and AI at the core of what we do.',
    icon: IconTrend,
  },
]

/**
 * Names are the reference's own "Lorem Ipsum" — the client has not named
 * the team yet. The designations are theirs. Portraits render as
 * placeholders until supplied; pass `photo` to fill one.
 */
const LEADERS: { name: string; role: string; photo?: string }[] = [
  { name: 'Lorem Ipsum', role: 'Chief Executive Officer' },
  { name: 'Lorem Ipsum', role: 'Chief Technology Officer' },
  { name: 'Lorem Ipsum', role: 'Head – Engineering Services' },
  { name: 'Lorem Ipsum', role: 'Head – Business Development' },
]

/**
 * About Us, built to "Lucas-TVS — Who We Are" in the 29 Sep reference
 * ("Lucas-TVS Phase 1 Wireframes (2)"), desktop and mobile artboards.
 *
 * Layout, copy, sizes, spacing, radii and section order follow that
 * reference exactly; see design.tsx for the two systematic departures
 * (typefaces and colour tokens) and why.
 *
 * Photography. The reference marks every image slot with what belongs in
 * it. Three slots are atmospheric backgrounds under dark type treatments,
 * and take approved imagery already on the homepage:
 *
 *   - hero, "R&D centre / engineering team" — the engineer at the
 *     workstation, the homepage's lead Insights image,
 *   - Vision card and the "What drives us" band — dark engineering
 *     composites, each under a scrim so the reference's dark surface holds.
 *
 * The rest ask for specific things that do not exist yet — the INEL and
 * BAT logos, four named leaders, photographs of the Hosur labs — and
 * render as the reference draws them, labelled placeholders, until they
 * arrive. One is a conflict rather than a gap: the heritage slot asks for
 * "manufacturing floor", and the 16 Sep review ruled out all factory and
 * plant imagery. It stays a placeholder until that is resolved.
 */
/**
 * The heritage timeline as a stepper, after the client's 1 Oct reference:
 * a rail of dots down the left, one milestone current at a time — green
 * year, tinted card, haloed dot — and beneath it a green "next" button, a
 * progress line and an "01 / 03" counter.
 *
 * Clicking a card makes it current; "next" steps on and wraps from Today
 * back to 1930. The rail is green up to the current milestone and fades
 * to grey past it.
 *
 * Each row is a two-column grid — rail, then card — and the rail cell is
 * a line in, the dot, a line out, both lines growing to fill. That keeps
 * every dot level with the middle of its own card whatever height the
 * card's copy runs to, and the lines meet across rows because the gap
 * between cards is the cards' own margin, not a gap in the list.
 */
function HeritageTimeline({
  active,
  setActive,
}: {
  active: number
  setActive: (next: number | ((i: number) => number)) => void
}) {
  const count = TIMELINE.length
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="flex flex-col gap-4">
      <ol>
        {TIMELINE.map((row, i) => {
          const current = i === active
          const done = i < active
          return (
            <li key={row.year} className="grid grid-cols-[16px_minmax(0,1fr)] gap-x-5">
              <span aria-hidden className="flex flex-col items-center">
                <span
                  className={cx(
                    'w-[2px] flex-1 transition-colors duration-300',
                    i === 0 ? 'bg-transparent' : i <= active ? 'bg-green-deep' : 'bg-line',
                  )}
                />
                <span
                  className={cx(
                    'shrink-0 rounded-full transition-all duration-300 motion-reduce:transition-none',
                    current
                      ? 'h-4 w-4 bg-green-deep shadow-[0_0_0_5px_rgba(35,143,56,0.16)]'
                      : done
                        ? 'h-3 w-3 bg-green-deep'
                        : 'h-3 w-3 bg-[#bdbdbd]',
                  )}
                />
                <span
                  className={cx(
                    'w-[2px] flex-1',
                    i === count - 1
                      ? 'bg-transparent'
                      : done
                        ? 'bg-green-deep'
                        : current
                          ? 'bg-[linear-gradient(to_bottom,var(--color-green-deep),var(--color-line))]'
                          : 'bg-line',
                  )}
                />
              </span>

              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={current ? 'step' : undefined}
                className={cx(
                  'my-[7px] flex w-full flex-col gap-1.5 rounded-[16px] border-[1.5px] px-5 py-4 text-left transition-[border-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep sm:flex-row sm:items-center sm:gap-5 sm:px-6',
                  current
                    ? 'border-[#d3ebcb] bg-[linear-gradient(90deg,#ebf7e6_0%,#f6fbf3_100%)] shadow-[0_10px_24px_rgba(35,143,56,0.08)]'
                    : 'cursor-pointer border-line-soft bg-white hover:border-green-deep/30',
                )}
              >
                <span
                  className={cx(
                    'shrink-0 font-display text-[22px] leading-[1.2] font-semibold transition-colors duration-300 sm:w-[76px] lg:text-[24px]',
                    current ? 'text-green-deep' : 'text-ink',
                  )}
                >
                  {row.year}
                </span>
                <span aria-hidden className="hidden h-10 w-px shrink-0 bg-line sm:block" />
                <span className="font-body text-[14px] leading-[1.55] text-body">{row.text}</span>
              </button>
            </li>
          )
        })}
      </ol>

      <div className="grid grid-cols-[16px_minmax(0,1fr)] gap-x-5">
        <span aria-hidden />
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setActive((i) => (i + 1) % count)}
            aria-label={active === count - 1 ? 'Back to the first milestone' : 'Next milestone'}
            className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full bg-green-deep text-white transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-deep motion-reduce:transition-none"
          >
            <ArrowRight aria-hidden className="h-[18px] w-[18px]" />
          </button>
          <span aria-hidden className="relative h-[2px] w-[120px] overflow-hidden rounded-full bg-line">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-green-deep transition-[width] duration-300 motion-reduce:transition-none"
              style={{ width: `${((active + 1) / count) * 100}%` }}
            />
          </span>
          <p aria-live="polite" className="font-body text-[14px] font-medium text-body-soft">
            <span className="sr-only">
              Milestone {active + 1} of {count}
            </span>
            <span aria-hidden>
              <span className="text-green-deep">{pad(active + 1)}</span> / {pad(count)}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * The heritage band: copy and the timeline stepper on the left, and on the
 * right a panel that follows whichever milestone is current — crossfading
 * between them, the year set large in its corner.
 */
function HeritageSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-surface-mute">
      <div className={`${FRAME} ${BAND} flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-16`}>
        <div className="flex flex-col gap-[18px] lg:w-[560px] lg:shrink-0">
          <Eyebrow>Our heritage</Eyebrow>
          <Heading accent="engineering trust.">Six decades of</Heading>
          <p className="font-body text-[15px] leading-[1.65] text-body lg:text-[16px]">
            From automotive electricals to software-defined platforms, our story is built on
            products that ship at scale and engineering that lasts.
          </p>
          <HeritageTimeline active={active} setActive={setActive} />
        </div>

        <div className="relative h-[300px] min-w-0 grow overflow-hidden rounded-[24px] bg-[#062a22] sm:h-[380px] lg:h-[560px]">
          {TIMELINE.map((row, i) => {
            const current = i === active
            return (
              <div
                key={row.year}
                aria-hidden={!current}
                className={cx(
                  'absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none',
                  current ? 'opacity-100' : 'opacity-0',
                )}
              >
                {row.image ? (
                  <img
                    src={row.image}
                    alt={current ? row.imageAlt : ''}
                    decoding="async"
                    className="h-full w-full object-cover object-[68%_center]"
                  />
                ) : (
                  <HeritagePlate year={row.year} logo={row.logo} />
                )}

                {/* The year, bottom left, on a scrim so it reads over a
                    photograph as well as on a plate. */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(4,29,23,0.85)_0%,rgba(4,29,23,0)_100%)] px-6 pt-20 pb-6 lg:px-9 lg:pb-8">
                  <span className="inline-flex items-center gap-2 rounded-full border border-lime/60 px-3 py-1 font-mono text-[11px] tracking-[0.12em] text-lime uppercase">
                    {String(i + 1).padStart(2, '0')} / {String(TIMELINE.length).padStart(2, '0')}
                  </span>
                  <p className="mt-3 font-display text-[44px] leading-none font-semibold text-white lg:text-[64px]">
                    {row.year}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/**
 * The panel for a milestone with no photograph: deep green with the
 * corner glow the site's dark cards carry, the pale wave artwork lifted
 * into it as texture, and the year as large outlined numerals. Decorative
 * throughout — the year is spoken by the timeline and the caption.
 */
function HeritagePlate({ year, logo }: { year: string; logo?: boolean }) {
  return (
    <div aria-hidden className="relative h-full w-full overflow-hidden bg-[radial-gradient(110%_85%_at_0%_0%,#176c4d_0%,#0a3a2c_40%,#062a22_70%,#041d17_100%)]">
      <img
        src={solutionsPanelWaves}
        alt=""
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.12] mix-blend-screen"
      />
      <span className="absolute top-1/2 right-[-4%] -translate-y-[58%] font-display text-[150px] leading-none font-semibold tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_rgba(179,231,24,0.42)] sm:text-[200px] lg:text-[260px]">
        {year}
      </span>
      {logo && (
        <img
          src={logoLucasTvs}
          alt=""
          decoding="async"
          className="absolute top-6 left-6 h-9 w-auto brightness-0 invert lg:top-9 lg:left-9 lg:h-12"
        />
      )}
    </div>
  )
}

export default function AboutPage() {
  return (
    <PageShell title="About Us">
      <DarkHero
        image={rndFeature}
        position="70% center"
        heightClass="min-h-[603px] lg:min-h-[664px]"
        crumbs={[{ label: 'About Us' }]}
        title="Engineering Intelligent Products for a"
        accent="Smarter Tomorrow."
        intro="End-to-end engineering, software and digital solutions for Automotive, Industrial and Defence & Aerospace."
        actions={
          <>
            <Pill to={ROUTES.capabilities}>Explore Capabilities</Pill>
            <Pill to={ROUTES.contact} tone="outline">
              Talk to Engineering
            </Pill>
          </>
        }
      />

      <Band>
        <Statement
          eyebrow="Who we are"
          statement="We help customers build intelligent products, advanced electronics, connected platforms and mission-critical systems."
          points={PILLARS}
        />
        <StatGrid stats={STATS} className={BODY_GAP} />
      </Band>

      {/* Heritage --------------------------------------------------- */}
      <HeritageSection />

      {/* Vision & mission ------------------------------------------- */}
      <section className={`${FRAME} ${BAND}`}>
        <div className="flex flex-col gap-3.5">
          <Eyebrow>Vision &amp; Mission</Eyebrow>
          <Heading>What we’re here to do.</Heading>
        </div>

        <div className="mt-7 grid gap-3.5 lg:mt-10 lg:grid-cols-2 lg:gap-6">
          <div className="relative flex flex-col gap-4 overflow-hidden rounded-[24px] bg-[#242624] p-[26px] lg:p-10">
            <img
              src={whyFeature}
              alt=""
              aria-hidden
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-[rgba(20,22,20,0.82)]" />
            <div className="relative flex flex-col gap-4">
              <IconTile>
                <IconTarget />
              </IconTile>
              <p className="font-mono text-[12px] tracking-[0.12em] text-lime uppercase">
                Our vision
              </p>
              <p className="font-display text-[21px] leading-[1.35] font-medium text-white lg:text-[26px]">
                To be the most trusted engineering partner for intelligent, connected and
                mission-critical products.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-[24px] bg-lime-tint p-[26px] lg:p-10">
            <IconTile tone="tint">
              <IconBurst />
            </IconTile>
            <p className="font-mono text-[12px] tracking-[0.12em] text-green-deep uppercase">
              Our mission
            </p>
            <p className="font-display text-[21px] leading-[1.35] font-medium text-ink lg:text-[26px]">
              To accelerate our customers’ product development with engineering that is safe,
              scalable and built for the long run.
            </p>
          </div>
        </div>
      </section>

      {/* Ecosystem -------------------------------------------------- */}
      <section className="bg-surface-mute">
        <div className={`${FRAME} ${BAND}`}>
          <SplitHeader
            eyebrow="Our ecosystem"
            title="One group."
            accent="Shared strength."
            body="We draw on the manufacturing depth, product portfolio and global partnerships of the wider Lucas-TVS group."
          />

          <div className="mt-7 grid gap-3.5 md:grid-cols-3 lg:mt-10 lg:gap-6">
            {ECOSYSTEM.map((company) => {
              const linkInner = (
                <>
                  {company.link}
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-lime text-ink transition-colors duration-300 group-hover:bg-lime">
                    <IconArrowUpRight />
                  </span>
                </>
              )
              const linkCls =
                'group mt-auto flex items-center gap-2.5 pt-1 font-body text-[14px] font-medium text-ink'
              return (
                <article
                  key={company.name}
                  className="flex flex-col gap-3.5 rounded-[20px] border-[1.5px] border-line-soft bg-white p-[22px] lg:p-7"
                >
                  {company.logo ? (
                    <span className="flex h-12 w-[132px] items-center">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        decoding="async"
                        className="max-h-12 w-auto max-w-full object-contain"
                      />
                    </span>
                  ) : (
                    <span
                      role="img"
                      aria-label={`${company.name} logo — to come`}
                      className="flex h-12 w-[132px] items-center justify-center rounded-[10px] bg-[repeating-linear-gradient(135deg,#d9d9d5_0px,#d9d9d5_14px,#cfcfcb_14px,#cfcfcb_28px)] font-mono text-[11px] text-[#5e605c]"
                    >
                      LOGO
                    </span>
                  )}
                  <h3 className="font-display text-[20px] leading-[1.25] font-semibold text-ink">
                    {company.name}
                  </h3>
                  <p className="font-body text-[14px] leading-[1.6] text-body">{company.body}</p>
                  {company.to ? (
                    <Link to={company.to} className={linkCls}>
                      {linkInner}
                    </Link>
                  ) : (
                    <a
                      href={company.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkCls}
                    >
                      {linkInner}
                    </a>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <DarkBand>
        <StackHeader dark eyebrow="What drives us" title="Values behind" accent="every build." />
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="flex flex-col gap-3.5 rounded-[20px] border border-[#3a3c3a] bg-black/60 p-[22px] backdrop-blur-sm lg:p-7"
            >
              <IconTile>
                <value.icon />
              </IconTile>
              <h3 className="font-display text-[19px] leading-[1.3] font-semibold text-white">
                {value.title}
              </h3>
              <p className="font-body text-[14px] leading-[1.6] text-white/75">{value.body}</p>
            </div>
          ))}
        </div>
      </DarkBand>

      {/* Leadership ------------------------------------------------- */}
      <section className={`${FRAME} ${BAND}`}>
        <SplitHeader
          eyebrow="Leadership"
          title="The people"
          accent="leading the way."
          body="Experienced leaders across engineering, technology and business, guiding every programme we deliver."
        />

        <ul className="mt-7 grid grid-cols-2 gap-3.5 lg:mt-10 lg:grid-cols-4 lg:gap-4">
          {LEADERS.map((leader) => (
            <li key={leader.role} className="flex flex-col gap-3">
              <ImageSlot
                src={leader.photo}
                alt={leader.photo ? `${leader.name}, ${leader.role}` : undefined}
                label="Portrait"
                className="h-[190px] w-full rounded-[20px] lg:h-[300px]"
              />
              <p className="font-display text-[16px] leading-[1.25] font-semibold text-ink lg:text-[18px]">
                {leader.name}
              </p>
              <p className="font-body text-[13px] leading-[1.5] text-body">{leader.role}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Where we build --------------------------------------------- */}
      <section className="bg-surface-mute">
        <div className={`${FRAME} ${BAND}`}>
          <SplitHeader
            eyebrow="Where we build"
            title="Our R&D Tech Center,"
            accent="Hosur."
            body="Labs for electronics, embedded software and validation — including HIL rigs for faster, safer testing."
            actions={
              <Pill to={ROUTES.contact} tone="ghost">
                Visit Us
              </Pill>
            }
          />

          {/* Desktop: the centre photograph takes a 2x2 block, two tiles
              beside it, and a wide tile under those. Mobile keeps the
              reference's lighter set — the photograph, then two tiles. */}
          <div className="mt-7 grid grid-cols-2 gap-3.5 lg:mt-10 lg:grid-cols-4 lg:grid-rows-[222px_222px] lg:gap-4">
            <ImageSlot
              label="Image: INEL R&D Tech Center, Hosur"
              className="col-span-2 h-[240px] rounded-[24px] md:h-[320px] lg:row-span-2 lg:h-full"
            />
            <ImageSlot
              label="Electronics lab"
              className="h-[140px] rounded-[18px] md:h-[200px] lg:h-full lg:rounded-[20px]"
            />
            <ImageSlot
              label="HIL test bench"
              className="h-[140px] rounded-[18px] md:h-[200px] lg:h-full lg:rounded-[20px]"
            />
            {/* Desktop only. Wrapped for the same reason as the CTA's second
                button: ImageSlot's plate is `flex`, and `hidden` on the
                same element only wins by accident of stylesheet order. */}
            <div className="hidden lg:col-span-2 lg:block">
              <ImageSlot label="Engineering team at work" className="h-full w-full rounded-[20px]" />
            </div>
          </div>
        </div>
      </section>

      <CtaPlate />
    </PageShell>
  )
}
