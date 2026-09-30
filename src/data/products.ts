import { productIsgController, productBmsShot, productVcu } from '../lib/assets'

export type Sector = 'Automotive' | 'Industrial' | 'Defence'

export type ProductEntry = {
  slug: string
  name: string
  /** Shown as the mono label over the name. */
  category: string
  sector: Sector
  /** The line under the name on the Products page. */
  blurb: string
  /** The shorter line the industry pages use, where the reference differs. */
  shortBlurb?: string
  image?: string
  imageAlt?: string
  /** Engineering themes for the detail page, from the matching capability lists. */
  highlights: string[]
}

/**
 * The product catalogue, as the 29 Sep reference ("Phase 1 Wireframes")
 * defines it: seven automotive, four defence, four industrial. Names,
 * categories and lines are the reference's, in its order.
 *
 * Photography exists for three of the fifteen — the controller, BMS and
 * VCU shots already approved for the homepage. The rest render the
 * reference's own "Product image" placeholder until photographs arrive.
 *
 * No specifications, ratings or certifications appear here; none have
 * been supplied, and the detail page says so rather than inventing them.
 */
export const PRODUCTS: ProductEntry[] = [
  {
    slug: 'motor-controllers',
    name: 'Motor Controllers',
    category: 'Power Electronics',
    sector: 'Automotive',
    blurb: 'High-efficiency control for traction and auxiliary motors.',
    image: productIsgController,
    imageAlt: 'Motor controller unit',
    highlights: ['Motors & Motor Controllers', 'Control Algorithms', 'Motor Control', 'HW-SW Co-Development'],
  },
  {
    slug: 'battery-management-systems',
    name: 'Battery Management Systems',
    category: 'Energy Storage',
    sector: 'Automotive',
    blurb: 'Cell monitoring, balancing and protection for EV packs.',
    image: productBmsShot,
    imageAlt: 'Battery management system board',
    highlights: ['Battery Management Systems', 'Energy Management', 'Embedded Software'],
  },
  {
    slug: 'dc-dc-converters',
    name: 'DC-DC Converters',
    category: 'Power Electronics',
    sector: 'Automotive',
    blurb: 'Reliable conversion between high- and low-voltage networks.',
    highlights: ['DC-DC Converters', 'Power Electronics', 'Hardware Validation'],
  },
  {
    slug: 'onboard-chargers',
    name: 'Onboard Chargers',
    category: 'Charging',
    sector: 'Automotive',
    blurb: 'Compact AC charging integrated into the vehicle.',
    highlights: ['Charging Systems', 'Power Electronics', 'System Integration'],
  },
  {
    slug: 'offboard-chargers',
    name: 'Offboard Chargers',
    category: 'Charging',
    sector: 'Automotive',
    blurb: 'DC fast-charging hardware for depots and fleets.',
    highlights: ['Charging Systems', 'Electronics Integration', 'Compliance Verification'],
  },
  {
    slug: 'vehicle-control-units',
    name: 'Vehicle Control Units',
    category: 'Vehicle Electronics',
    sector: 'Automotive',
    blurb: 'Central coordination of powertrain and vehicle functions.',
    image: productVcu,
    imageAlt: 'Vehicle control unit',
    highlights: ['VCU Development', 'Diagnostics', 'Gateway Development'],
  },
  {
    slug: 'body-control-units',
    name: 'Body Control Units',
    category: 'Vehicle Electronics',
    sector: 'Automotive',
    blurb: 'Lighting, access and comfort functions in one controller.',
    highlights: ['BCU Development', 'Power Distribution', 'Diagnostics'],
  },

  {
    slug: 'motor-controllers-and-inverters',
    name: 'Motor Controllers & Inverters',
    category: 'Defence Electronics',
    sector: 'Defence',
    blurb: 'Traction and turret drives for tracked and wheeled platforms.',
    shortBlurb: 'Drives for tracked and wheeled platforms.',
    highlights: ['Motors, Controllers & Inverters', 'Power Electronics', 'Rugged & Vehicle Electronics'],
  },
  {
    slug: 'rugged-vehicle-electronics',
    name: 'Rugged Vehicle Electronics',
    category: 'Defence Electronics',
    sector: 'Defence',
    blurb: 'Electronics built for shock, vibration and extreme temperatures.',
    shortBlurb: 'Built for shock, vibration and extreme temperatures.',
    highlights: ['Rugged & Vehicle Electronics', 'Embedded Processing', 'Sensor Integration'],
  },
  {
    slug: 'embedded-processing-platforms',
    name: 'Embedded Processing Platforms',
    category: 'Embedded',
    sector: 'Defence',
    blurb: 'Deterministic compute for mission-critical applications.',
    shortBlurb: 'Deterministic compute for mission systems.',
    highlights: ['Embedded Software', 'RTOS Development', 'Real-Time Applications'],
  },
  {
    slug: 'sensor-and-subsystem-integration',
    name: 'Sensor & Subsystem Integration',
    category: 'Integration',
    sector: 'Defence',
    blurb: 'Integrated electronic subsystems for modernization programmes.',
    shortBlurb: 'Integrated subsystems for modernization.',
    highlights: ['Sensor Integration', 'System Architecture', 'Integration Support'],
  },

  {
    slug: 'motion-controllers',
    name: 'Motion Controllers',
    category: 'Motion',
    sector: 'Industrial',
    blurb: 'Precise, efficient control for industrial drives and automation.',
    highlights: ['Motion Controllers', 'Drives & Controls', 'Motor Control Systems'],
  },
  {
    slug: 'energy-management-systems',
    name: 'Energy Management Systems',
    category: 'Energy',
    sector: 'Industrial',
    blurb: 'Monitor and optimise energy use across plants and assets.',
    shortBlurb: 'Monitor and optimise energy use across plants.',
    highlights: ['Energy Management', 'Power Electronics', 'Data Acquisition'],
  },
  {
    slug: 'edge-gateways',
    name: 'Edge Gateways',
    category: 'IIoT',
    sector: 'Industrial',
    blurb: 'Connect equipment and stream data securely to the cloud.',
    shortBlurb: 'Connect equipment and stream data securely.',
    highlights: ['IIoT & Edge Computing', 'Equipment Connectivity', 'Industrial Networking'],
  },
  {
    slug: 'condition-monitoring-units',
    name: 'Condition Monitoring Units',
    category: 'Analytics',
    sector: 'Industrial',
    blurb: 'Sensor-based health monitoring for predictive maintenance.',
    shortBlurb: 'Sensor-based health monitoring for assets.',
    highlights: ['Condition Monitoring', 'AI-Based Analytics', 'Failure Prediction'],
  },
]

export const PRODUCT_SECTORS: Sector[] = ['Automotive', 'Industrial', 'Defence']

export function productBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function productsIn(sector: Sector) {
  return PRODUCTS.filter((p) => p.sector === sector)
}

export const CATALOGUE_URL = {
  lucasTvs: 'https://lucas-tvs.com/automotive-solutions-products/',
  inel: 'https://indianippon.com/Products-Solutions',
}
