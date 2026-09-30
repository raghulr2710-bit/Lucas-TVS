import { PageShell } from '../../components/site/PageShell'
import {
  IconBoard,
  IconBurst,
  IconChip,
  IconClipboardCheck,
  IconGauge,
  IconNetwork,
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
  ArrowCircle,
  BODY_GAP,
  Band,
  DarkBand,
  DarkHero,
  FeatureCard,
  SmartLink,
  StepGrid,
} from '../../components/site/blocks'
import { COMPANY } from '../../lib/routes'
import { careersScene } from '../../lib/assets'

const REASONS = [
  { title: 'Work on real-world impact', body: 'Products that ship on vehicles, factories and defence platforms.', icon: IconTarget },
  { title: 'Collaborate with experts', body: 'Learn alongside experienced engineers across disciplines.', icon: IconPeople },
  { title: 'Grow your career', body: 'Clear growth paths, mentoring and continuous learning.', icon: IconTrend },
  { title: 'Shape a smarter tomorrow', body: 'Work on electrification, SDV, IIoT and AI.', icon: IconBurst },
]

const TEAMS = [
  { title: 'Embedded Software', icon: IconChip },
  { title: 'Electronics Hardware', icon: IconBoard },
  { title: 'Controls & Power Electronics', icon: IconGauge },
  { title: 'Functional Safety & Security', icon: IconShieldCheck },
  { title: 'Cloud, Data & AI', icon: IconNetwork },
  { title: 'Verification & Testing', icon: IconClipboardCheck },
]

const HIRING_STEPS = [
  { title: 'Apply', sub: 'Pick a role on our careers portal' },
  { title: 'Conversation', sub: 'Meet the team, talk engineering' },
  { title: 'Technical Round', sub: 'Solve a real-world problem' },
  { title: 'Offer & Onboarding', sub: 'Get set up to build from day one' },
]

/**
 * Careers, built to the Careers artboards of the 29 Sep reference. Copy is
 * the reference's.
 *
 * Every role link goes to the careers portal the reference names
 * (career.lucas-tvs.com); the site lists no roles itself. The six "Life
 * at Lucas TVS" photographs are still to come — the earlier wireframe
 * noted they need consent from the people in them — so they render as the
 * reference draws them until supplied.
 */
export default function CareersPage() {
  const portal = COMPANY.careersPortal

  return (
    <PageShell title="Careers">
      <DarkHero
        image={careersScene}
        position="72% center"
        heightClass="min-h-[588px] lg:min-h-[692px]"
        crumbs={[{ label: 'Careers' }]}
        title="Solve hard engineering problems."
        accent="Build what’s next."
        intro="Join a young software & product-engineering division inside Lucas-TVS — electrification, SDV, embedded systems, defence electronics and AI."
        actions={
          <>
            <Pill href={portal}>View Open Roles</Pill>
            <Pill href="#life" tone="outline">
              Life at Lucas TVS
            </Pill>
          </>
        }
      />

      <Band>
        <SplitHeader
          eyebrow="Why join us"
          title="More than a job."
          accent="A mission."
          body="We believe an organization’s most valued assets are its people — who individually and collectively make our goals possible."
        />
        <div className={`${BODY_GAP} grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6`}>
          {REASONS.map((reason) => (
            <FeatureCard key={reason.title} icon={<reason.icon />} title={reason.title} body={reason.body} />
          ))}
        </div>
      </Band>

      <Band tone="mute">
        <SplitHeader
          eyebrow="Teams we hire for"
          title="Find your"
          accent="place."
          actions={
            <Pill href={portal} tone="ghost">
              See All Roles ↗
            </Pill>
          }
        />
        <ul className={`${BODY_GAP} grid gap-3.5 md:grid-cols-2 lg:grid-cols-3 lg:gap-4`}>
          {TEAMS.map((team) => (
            <li key={team.title}>
              <SmartLink
                href={portal}
                label={`${team.title} roles on the careers portal`}
                className="group flex items-center justify-between gap-3.5 rounded-[18px] border-[1.5px] border-line-soft bg-white px-5 py-[18px] transition-colors duration-300 hover:border-green-deep/50"
              >
                <span className="flex items-center gap-3.5">
                  <IconTile tone="tint">
                    <team.icon />
                  </IconTile>
                  <span className="font-display text-[17px] leading-[1.25] font-semibold text-ink">{team.title}</span>
                </span>
                <ArrowCircle />
              </SmartLink>
            </li>
          ))}
        </ul>
      </Band>

      <Band id="life">
        <StackHeader eyebrow="Life at Lucas TVS" title="Where curious engineers" accent="thrive." />
        {/* Desktop: a tall photograph, a wide one, then four tiles —
            4 columns x 2 rows of 230px. A phone keeps the reference's
            lighter set: the team photograph full width, two tiles under it. */}
        <div className={`${BODY_GAP} grid grid-cols-2 gap-3.5 lg:grid-cols-4 lg:grid-rows-[230px_230px] lg:gap-4`}>
          <div className="col-span-2 h-[240px] lg:col-span-1 lg:row-span-2 lg:h-auto">
            <ImageSlot label="Engineering team" className="h-full w-full rounded-[24px]" />
          </div>
          <div className="hidden lg:col-span-2 lg:block">
            <ImageSlot label="Collaboration in the lab" className="h-full w-full rounded-[20px]" />
          </div>
          <ImageSlot label="Hackathon" className="h-[150px] w-full rounded-[18px] lg:h-full lg:rounded-[20px]" />
          <ImageSlot label="Test track day" className="h-[150px] w-full rounded-[18px] lg:h-full lg:rounded-[20px]" />
          <div className="hidden lg:block">
            <ImageSlot label="Team celebration" className="h-full w-full rounded-[20px]" />
          </div>
          <div className="hidden lg:block">
            <ImageSlot label="Learning session" className="h-full w-full rounded-[20px]" />
          </div>
        </div>
      </Band>

      <DarkBand>
        <SplitHeader
          dark
          eyebrow="How we hire"
          title="A simple,"
          accent="transparent process."
          body="Four steps from application to your first day — usually within a few weeks."
          actions={<Pill href={portal}>View Open Roles ↗</Pill>}
        />
        <StepGrid steps={HIRING_STEPS} />
      </DarkBand>
    </PageShell>
  )
}
