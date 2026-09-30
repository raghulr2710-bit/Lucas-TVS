import { PageShell } from '../../components/site/PageShell'
import { IconTile, IconTrend, Pill, StackHeader } from '../../components/site/design'
import { ArrowCircle, BODY_GAP, Band, CtaPlate, DarkHero, SmartLink } from '../../components/site/blocks'
import { windFarm } from '../../lib/assets'

/**
 * Sustainability.
 *
 * READ BEFORE REVIEW: this page is in neither version of the Phase 1
 * reference, and the client's 16 Sep review cut sustainability from this
 * site on the grounds that it belongs on the Lucas-TVS corporate site. It
 * exists only because it was on the requested page list.
 *
 * It therefore makes no environmental claims of its own — no targets,
 * figures, policies or certifications, none of which have been supplied
 * and all of which carry real risk if wrong. It points to the group site
 * and stops. It is not linked from the header; it is reachable from the
 * footer and from search.
 */
export default function SustainabilityPage() {
  return (
    <PageShell title="Sustainability">
      <DarkHero
        image={windFarm}
        position="center 60%"
        heightClass="min-h-[525px] lg:min-h-[600px]"
        crumbs={[{ label: 'Sustainability' }]}
        title="Sustainability at"
        accent="Lucas-TVS."
        intro="For the Lucas-TVS group’s sustainability commitments and reporting, visit the corporate site."
        actions={
          <Pill href="https://lucas-tvs.com" tone="outline">
            Visit lucas-tvs.com ↗
          </Pill>
        }
      />

      <Band>
        <StackHeader eyebrow="Group sustainability" title="Where to" accent="find it." />
        <SmartLink
          href="https://lucas-tvs.com"
          className={`${BODY_GAP} group flex items-center justify-between gap-4 rounded-[20px] border-[1.5px] border-line-soft bg-white p-[22px] lg:p-7`}
        >
          <span className="flex items-center gap-[18px]">
            <IconTile tone="tint">
              <IconTrend />
            </IconTile>
            <span className="flex flex-col gap-1">
              <span className="font-display text-[19px] leading-[1.25] font-semibold text-ink">Lucas-TVS corporate site</span>
              <span className="font-body text-[13px] text-body">lucas-tvs.com</span>
            </span>
          </span>
          <ArrowCircle />
        </SmartLink>
      </Band>

      <CtaPlate />
    </PageShell>
  )
}

