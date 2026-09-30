import { Link } from 'react-router-dom'
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
import { ROUTES } from '../../lib/routes'
import { logoInel, logoLucasTvs, rndFeature, whyFeature } from '../../lib/assets'

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

const TIMELINE = [
  { year: '1930', text: 'Lucas begins operations in India as Lucas Indian Service.' },
  {
    year: '1962',
    text: 'Lucas TVS is formed as a joint venture between Lucas Plc, UK and TVS Group, India.',
  },
  {
    year: 'Today',
    text: 'A dedicated software & product-engineering division builds the next generation of intelligent products.',
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
      <section className="bg-surface-mute">
        <div
          className={`${FRAME} ${BAND} flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-16`}
        >
          <div className="flex flex-col gap-[18px] lg:w-[560px] lg:shrink-0">
            <Eyebrow>Our heritage</Eyebrow>
            <Heading accent="engineering trust.">Six decades of</Heading>
            <p className="font-body text-[15px] leading-[1.65] text-body lg:text-[16px]">
              From automotive electricals to software-defined platforms, our story is built on
              products that ship at scale and engineering that lasts.
            </p>
            <ol className="flex flex-col gap-[18px]">
              {TIMELINE.map((row) => (
                <li
                  key={row.year}
                  className="flex gap-5 rounded-[16px] border-[1.5px] border-line-soft bg-white px-5 py-[18px]"
                >
                  <span className="w-[72px] shrink-0 font-display text-[22px] leading-[1.27] font-semibold text-green-deep">
                    {row.year}
                  </span>
                  <span className="font-body text-[15px] leading-[1.55] text-body">{row.text}</span>
                </li>
              ))}
            </ol>
          </div>

          <ImageSlot
            label="Image: heritage photography / manufacturing floor"
            className="h-[260px] min-w-0 grow rounded-[24px] lg:h-[560px]"
          />
        </div>
      </section>

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
