import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { PageShell } from '../../components/site/PageShell'
import {
  Eyebrow,
  IconChat,
  IconDocument,
  IconMail,
  IconPeople,
  IconPhone,
  IconPin,
  ImageSlot,
  Pill,
  StackHeader,
} from '../../components/site/design'
import { BODY_GAP, Band, DarkHero, FeatureCard } from '../../components/site/blocks'
import { COMPANY, ROUTES } from '../../lib/routes'
import { rndFeature } from '../../lib/assets'

const FIELD =
  'h-[50px] w-full rounded-[12px] border-[1.5px] border-line-soft bg-white px-4 font-body text-[15px] text-ink transition-colors duration-200 focus:border-green-deep focus:outline-none'

/**
 * Contact Us, built to the Contact artboards of the 29 Sep reference.
 * Copy is the reference's.
 *
 * Two things here are the reference's placeholders, shown as drawn but
 * deliberately not wired up:
 *
 *   - Phone "+91 00000 00000" and email "info@lucastvs.co.in". They are
 *     printed as text, not as tel:/mailto: links — the number is plainly
 *     a placeholder, and the address has not been confirmed as a real,
 *     monitored inbox. A link that silently loses an enquiry is worse
 *     than no link.
 *   - The form. No recipient has been named, so submitting it posts
 *     nowhere: it validates, then says plainly that the form is not yet
 *     connected. It does not pretend to have sent anything.
 */
export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <PageShell title="Contact Us">
      <DarkHero
        image={rndFeature}
        position="70% center"
        heightClass="min-h-[525px] lg:min-h-[640px]"
        crumbs={[{ label: 'Contact Us' }]}
        title="Let’s Build"
        accent="What’s Next."
        intro="Tell us about your programme and we’ll route it to the engineering team that owns it."
        actions={
          <>
            <Pill href="#enquiry">Send an Enquiry</Pill>
            <Pill to={ROUTES.careers} tone="outline">
              Careers
            </Pill>
          </>
        }
      />

      <Band tone="mute" id="enquiry">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:gap-16">
          {/* Form ------------------------------------------------------ */}
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-5 rounded-[24px] border-[1.5px] border-line-soft bg-white p-[22px] lg:w-[720px] lg:shrink-0 lg:p-10"
          >
            <Eyebrow>Engineering enquiries</Eyebrow>
            <h2 className="font-display text-[24px] leading-[1.26] font-medium text-ink lg:text-[30px]">
              Tell us about your programme
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full name">
                {(id) => <input id={id} name="name" required autoComplete="name" className={FIELD} />}
              </Field>
              <Field label="Company">
                {(id) => <input id={id} name="company" autoComplete="organization" className={FIELD} />}
              </Field>
              <Field label="Work email">
                {(id) => <input id={id} name="email" type="email" required autoComplete="email" className={FIELD} />}
              </Field>
              <Field label="Phone">
                {(id) => <input id={id} name="phone" type="tel" autoComplete="tel" className={FIELD} />}
              </Field>
            </div>

            <Field label="Industry">
              {(id) => (
                <select id={id} name="industry" className={`${FIELD} appearance-none`}>
                  <option>Automotive</option>
                  <option>Industrial</option>
                  <option>Defence &amp; Aerospace</option>
                  <option>Other</option>
                </select>
              )}
            </Field>

            <Field label="How can we help?">
              {(id) => (
                // 144px, not the reference's written 120: its textarea is
                // content-box, so the drawn box is 120 plus padding and
                // border. Tailwind boxes are border-box; this is the height
                // the reference actually renders.
                <textarea
                  id={id}
                  name="message"
                  required
                  className="h-[144px] w-full resize-none rounded-[12px] border-[1.5px] border-line-soft bg-white px-4 py-3 font-body text-[15px] text-ink transition-colors duration-200 focus:border-green-deep focus:outline-none"
                />
              )}
            </Field>

            <button
              type="submit"
              className="h-[52px] self-start rounded-full bg-lime px-[30px] font-body text-[16px] font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              Submit Enquiry →
            </button>

            {submitted && (
              <p role="status" className="rounded-[12px] border-[1.5px] border-dashed border-line bg-surface-mute px-4 py-3 font-body text-[13px] leading-[1.5] text-body">
                This form is not connected yet, so nothing has been sent. The address enquiries
                should go to is still to be confirmed.
              </p>
            )}

            <p className="font-body text-[12px] text-body">
              By submitting, you agree to our privacy policy. We typically respond within two working
              days.
            </p>
          </form>

          {/* Details --------------------------------------------------- */}
          <div className="flex min-w-0 grow flex-col gap-5">
            <dl className="flex flex-col gap-[22px] rounded-[24px] bg-lime-tint p-[22px] lg:p-8">
              <Detail icon={<IconPin />} label="Address">
                India Nippon Electricals Limited (INEL) R&amp;D Tech Center, Plot No-137, Phase-1, SIPCOT
                Industrial Complex, Hosur, Tamil Nadu - 635126
              </Detail>
              <Detail icon={<IconPhone />} label="Phone">
                +91 00000 00000
              </Detail>
              <Detail icon={<IconMail />} label="Email">
                info@lucastvs.co.in
              </Detail>
            </dl>
            <ImageSlot label="Map — INEL R&D Tech Center, Hosur" className="h-[240px] w-full rounded-[24px] lg:h-[300px]" />
          </div>
        </div>
      </Band>

      <Band>
        <StackHeader eyebrow="Other ways to reach us" title="The right team," accent="first time." />
        <div className={`${BODY_GAP} grid gap-3.5 md:grid-cols-3 lg:gap-6`}>
          <FeatureCard
            icon={<IconChat />}
            title="Engineering Enquiries"
            body="Programmes, partnerships and technical discussions."
            link={{ label: 'Talk to Engineering', href: '#enquiry' }}
          />
          <FeatureCard
            icon={<IconPeople />}
            title="Careers"
            body="Explore roles and life at Lucas TVS."
            link={{ label: 'View Open Roles', href: COMPANY.careersPortal }}
          />
          <FeatureCard
            icon={<IconDocument />}
            title="Media & Events"
            body="Press, speaking invitations and publications."
            link={{ label: 'Latest Insights', to: ROUTES.insights }}
          />
        </div>
      </Band>
    </PageShell>
  )
}

function Field({ label, children }: { label: string; children: (id: string) => ReactNode }) {
  const id = useId()
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-body text-[14px] leading-[1.65] font-medium text-ink">
        {label}
      </label>
      {children(id)}
    </div>
  )
}

function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3.5">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px] bg-white text-ink">{icon}</span>
      <div className="flex flex-col gap-1">
        <dt className="font-mono text-[11px] tracking-[0.1em] text-green-deep uppercase">{label}</dt>
        <dd className="font-body text-[15px] leading-[1.55] text-ink">{children}</dd>
      </div>
    </div>
  )
}
