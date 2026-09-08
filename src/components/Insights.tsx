import { Button, ChevronPill, Eyebrow } from './primitives'
import { insightFeature, insightTruck, insightCar } from '../lib/assets'

const ARTICLES = [
  {
    title: 'Software & Product Engineering division launched',
    blurb: 'Lucas-TVS launches its Software & Product Engineering division.',
    image: insightTruck,
    alt: 'Commercial truck on a highway at dusk',
  },
  {
    title: 'Defence modernization programs',
    blurb:
      'Supporting defence modernization & localization programs.',
    image: insightCar,
    alt: 'Passenger car parked on a tree-lined city street',
  },
]

export function Insights() {
  return (
    <section id="insights" className="shell pb-16 lg:pb-24">
      <header className="gap-12 lg:flex lg:items-start lg:justify-between">
        <div className="lg:max-w-[500px]">
          <Eyebrow>Insights &amp; Events</Eyebrow>
          <h2 className="mt-3 font-display text-[28px] leading-[1.15] font-medium text-ink sm:text-[34px] lg:text-[40px]">
            Insights That Shape the Future of Mobility
          </h2>
        </div>

        <div className="mt-6 lg:mt-0 lg:max-w-[625px] lg:flex-1">
          <p className="font-body text-[15px] leading-[1.5] text-body lg:text-[16px]">
            Stay updated with the latest developments in engineering, software
            and defence technologies.
          </p>
          <Button className="mt-6">All insights</Button>
        </div>
      </header>

      <div className="mt-10 grid gap-6 lg:mt-[58px] lg:grid-cols-[572fr_585fr] lg:gap-[23px]">
        {/* Lead story ------------------------------------------------- */}
        <article className="relative min-h-[420px] overflow-hidden rounded-[15px] lg:min-h-[459px]">
          <img
            src={insightFeature}
            alt="Engineer reviewing motor telemetry beside a robotic assembly cell"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <ChevronPill
            className="absolute top-[9px] right-[10px] !h-[52px] !w-[106px] !bg-white"
            iconClassName="h-[26px] w-[26px]"
            label="Read the lead story"
          />

          <div className="absolute inset-x-0 bottom-0 p-[10px]">
            <div className="rounded-[15px] p-[28px]">
              <h3 className="max-w-[512px] font-display text-[26px] leading-[1.15] font-medium text-white lg:text-[35px]">
                Lucas-TVS invests in BAT, Germany
              </h3>
              <p className="mt-4 max-w-[493px] font-body text-[15px] leading-[1.5] text-white lg:text-[16px]">
                Lucas-TVS invests in Bavarian Automotive Technologies (BAT),
                Germany — strengthening e-mobility and power electronics
                capabilities.
              </p>
            </div>
          </div>
        </article>

        {/* Secondary stories ------------------------------------------ */}
        <div className="grid gap-6 lg:gap-[29px]">
          {ARTICLES.map((article) => (
            <article
              key={article.title}
              className="flex gap-4 rounded-[15px] border border-[#e0e0e0] bg-surface-mute p-[9px] sm:gap-[25px] lg:min-h-[215px]"
            >
              <img
                src={article.image}
                alt={article.alt}
                className="h-[120px] w-[110px] shrink-0 rounded-[12px] object-cover sm:h-[197px] sm:w-[187px]"
              />

              <div className="flex min-w-0 flex-1 flex-col py-1 sm:py-[7px]">
                <h3 className="font-display text-[18px] leading-[1.2] font-medium text-ink lg:text-[22px]">
                  {article.title}
                </h3>
                <p className="mt-3 font-body text-[13px] leading-[1.5] text-body lg:text-[14px]">
                  {article.blurb}
                </p>

                <a
                  href="#"
                  className="mt-auto inline-flex items-center gap-3 pt-4 font-body text-[15px] text-body lg:text-[16px]"
                >
                  Read More
                  <ChevronPill label={`Read more: ${article.title}`} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
