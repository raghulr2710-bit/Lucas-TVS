import { insightCar, insightFeature, insightTruck } from '../lib/assets'

export type InsightCategory = 'News' | 'Articles' | 'Case Studies' | 'Whitepapers' | 'Events'

export type Insight = {
  slug: string
  title: string
  category: InsightCategory
  /**
   * The mono label on the card. Usually the category in the singular
   * ("ARTICLE"); the reference sometimes labels by topic instead
   * ("DEFENCE"), so it is its own field.
   */
  label: string
  /** As printed; empty where the reference gives no date. */
  dateLabel: string
  summary: string
  image?: string
  imageAlt?: string
  /** Body paragraphs. Empty until the article text is supplied. */
  body: string[]
}

export const INSIGHT_FILTERS = ['All', 'News', 'Articles', 'Case Studies', 'Whitepapers', 'Events'] as const

/**
 * Insights & Resources entries, as the 29 Sep reference lists them.
 *
 * The first three are the stories already running on the homepage, with
 * the reference's updated summaries. The other six are the reference's
 * new entries, titles and dates as drawn. Two of those carry lorem ipsum
 * summaries in the reference itself; they are kept as drawn, since that
 * placeholder text is the client's, and flagged in the handover.
 *
 * No entry has article text yet. Each links to its own page, which says
 * the body is still to come.
 */
export const INSIGHTS: Insight[] = [
  {
    slug: 'lucas-tvs-invests-in-bat-germany',
    title: 'Lucas-TVS invests in BAT, Germany',
    category: 'News',
    label: 'News · Featured',
    dateLabel: '',
    summary:
      'Strengthening e-mobility, power electronics and software-defined vehicle capabilities for global OEMs.',
    image: insightFeature,
    imageAlt: 'Engineer reviewing motor telemetry beside a robotic assembly cell',
    body: [],
  },
  {
    slug: 'software-and-product-engineering-division-launched',
    title: 'Software & Product Engineering division launched',
    category: 'News',
    label: 'News',
    dateLabel: '',
    summary: 'Lucas-TVS launches its Software & Product Engineering division.',
    image: insightTruck,
    imageAlt: 'Commercial truck on a highway at dusk',
    body: [],
  },
  {
    slug: 'defence-modernization-programs',
    title: 'Defence modernization programs',
    category: 'News',
    label: 'Defence',
    dateLabel: '',
    summary: 'Supporting defence modernization and localization programmes.',
    image: insightCar,
    imageAlt: 'Passenger car on a tree-lined street',
    body: [],
  },
  {
    slug: 'why-software-defined-vehicles-need-a-new-engineering-model',
    title: 'Why software-defined vehicles need a new engineering model',
    category: 'Articles',
    label: 'Article',
    dateLabel: 'Sep 2026',
    summary: 'How platform thinking changes the way OEMs build and update vehicles.',
    body: [],
  },
  {
    slug: 'cutting-validation-time-with-hardware-in-the-loop-testing',
    title: 'Cutting validation time with hardware-in-the-loop testing',
    category: 'Case Studies',
    label: 'Case Study',
    dateLabel: 'Sep 2026',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
    body: [],
  },
  {
    slug: 'functional-safety-in-ev-powertrains-iso-26262-in-practice',
    title: 'Functional safety in EV powertrains: ISO 26262 in practice',
    category: 'Whitepapers',
    label: 'Whitepaper',
    dateLabel: 'Sep 2026',
    summary: 'A practical view of safety goals, analysis and evidence for EV systems.',
    body: [],
  },
  {
    slug: 'predictive-maintenance-from-machine-data-to-decisions',
    title: 'Predictive maintenance: from machine data to decisions',
    category: 'Articles',
    label: 'Article',
    dateLabel: 'Sep 2026',
    summary: 'Turning condition monitoring into measurable uptime gains.',
    body: [],
  },
  {
    slug: 'meet-our-engineers-at-lorem-ipsum-expo-2026',
    title: 'Meet our engineers at Lorem Ipsum Expo 2026',
    category: 'Events',
    label: 'Event',
    dateLabel: 'Sep 2026',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    body: [],
  },
  {
    slug: 'building-rugged-electronics-for-defence-platforms',
    title: 'Building rugged electronics for defence platforms',
    category: 'Articles',
    label: 'Article',
    dateLabel: 'Sep 2026',
    summary: 'Design choices that keep electronics reliable in extreme conditions.',
    body: [],
  },
]

export function insightBySlug(slug: string) {
  return INSIGHTS.find((i) => i.slug === slug)
}

/** The lead story and the two beside it; the grid is everything after. */
export const FEATURED_INSIGHT = INSIGHTS[0]
export const SIDE_INSIGHTS = INSIGHTS.slice(1, 3)
export const GRID_INSIGHTS = INSIGHTS.slice(3)

export function cardLabel(insight: Insight) {
  return insight.dateLabel ? `${insight.label} · ${insight.dateLabel}` : insight.label
}
