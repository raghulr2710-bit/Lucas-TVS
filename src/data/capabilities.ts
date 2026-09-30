import type { ComponentType } from 'react'
import {
  IconBoard,
  IconBurst,
  IconChip,
  IconClipboardCheck,
  IconCode,
  IconCube,
  IconGauge,
  IconLink,
  IconNetwork,
  IconPeople,
  IconShieldCheck,
} from '../components/site/design'

export type ServiceLine = {
  title: string
  body: string
  tags: string[]
  icon: ComponentType
}

/**
 * The eight service lines, as the Capabilities artboard of the 29 Sep
 * reference sets them: title, one line, and its tags. All eight now carry
 * a description — the earlier wireframe left three blank.
 */
export const SERVICE_LINES: ServiceLine[] = [
  {
    title: 'Product Engineering',
    body: 'From concept development through deployment and lifecycle management.',
    tags: ['Requirements Engineering', 'System Architecture & Design', 'Model-Based Development', 'Product Lifecycle Management', 'Verification & Validation'],
    icon: IconCube,
  },
  {
    title: 'Embedded Systems Engineering',
    body: 'Intelligent embedded platforms for connected products.',
    tags: ['Embedded Software', 'RTOS & BSP', 'Device Drivers & Middleware', 'Firmware', 'Application Development', 'Hardware Development'],
    icon: IconChip,
  },
  {
    title: 'Electronics Engineering',
    body: 'Hardware development for next-generation products.',
    tags: ['Electronic Design', 'Power Electronics', 'PCB Design', 'Hardware Validation', 'System Integration'],
    icon: IconBoard,
  },
  {
    title: 'Software Engineering',
    body: 'Scalable software platforms and applications.',
    tags: ['Application Development', 'Embedded Software', 'Cloud Applications', 'Middleware', 'Integration Services'],
    icon: IconCode,
  },
  {
    title: 'Functional Safety & Cybersecurity',
    body: 'Safe and secure by design — ISO 26262, IEC 61508 and ISO 21434.',
    tags: ['ISO 26262', 'IEC 61508', 'FMEA · FTA · HARA', 'Secure Software Development', 'ISO 21434', 'Secure Embedded Platforms'],
    icon: IconShieldCheck,
  },
  {
    title: 'Electronics & Controls Engineering',
    body: 'Motor control, power electronics and hardware-software co-development.',
    tags: ['Control Algorithms', 'Power Electronics Software', 'Motor Control', 'Battery Management Systems', 'Electronics Integration', 'HW-SW Co-Development'],
    icon: IconGauge,
  },
  {
    title: 'Digital Engineering',
    body: 'AI, IIoT, cloud and edge to make products and operations smarter.',
    tags: ['AI & Machine Learning', 'Industrial IoT', 'Cloud & Edge', 'Predictive Maintenance'],
    icon: IconNetwork,
  },
  {
    title: 'Verification & Testing',
    body: 'Quality, reliability, compliance and performance you can prove.',
    tags: ['MIL / SIL / HIL', 'Automated Test Frameworks', 'Integration Testing', 'Performance Validation', 'Compliance Verification', 'Certification Support'],
    icon: IconClipboardCheck,
  },
]

/** "From Concept To Lifecycle." — the six stages and their sub-lines. */
export const LIFECYCLE = [
  { title: 'Concept', sub: 'Requirements & feasibility' },
  { title: 'Architecture', sub: 'System & software' },
  { title: 'Development', sub: 'Embedded, electronics, software' },
  { title: 'Validation', sub: 'MIL / SIL / HIL testing' },
  { title: 'Deployment', sub: 'Integration & production support' },
  { title: 'Lifecycle Support', sub: 'Updates, sustaining & obsolescence' },
]

/** "Flexible models, clear ownership." */
export const ENGAGEMENT_MODELS: { title: string; body: string; icon: ComponentType }[] = [
  {
    title: 'Dedicated Engineering Teams',
    body: 'A long-term team that works as an extension of yours, with shared tools and cadence.',
    icon: IconPeople,
  },
  {
    title: 'End-to-End Product Development',
    body: 'One partner from requirements to production, with a single point of accountability.',
    icon: IconCube,
  },
  {
    title: 'Specialist Services',
    body: 'Targeted expertise — safety cases, validation, migration or performance tuning.',
    icon: IconBurst,
  },
]

/** "Tested at every level." — Quality & Standards. */
export const VALIDATION_LEVELS = [
  { title: 'Model-in-the-Loop', sub: 'Validate algorithms early' },
  { title: 'Software-in-the-Loop', sub: 'Test code on virtual targets' },
  { title: 'Hardware-in-the-Loop', sub: 'Real ECUs, simulated world' },
  { title: 'Integration Testing', sub: 'Systems working together' },
  { title: 'Performance Validation', sub: 'Proven under real load' },
  { title: 'Compliance & Certification', sub: 'Evidence for approval' },
]

/**
 * The three standards. The reference presents them as standards the
 * practices are aligned with — not as certifications held — and so does
 * the site.
 */
export const STANDARDS = [
  {
    code: 'ISO 26262',
    body: 'Functional safety for road vehicles — hazard analysis, safety goals and safety cases.',
    icon: IconShieldCheck,
  },
  {
    code: 'IEC 61508',
    body: 'Functional safety for electrical, electronic and programmable systems across industries.',
    icon: IconClipboardCheck,
  },
  {
    code: 'ISO 21434',
    body: 'Cybersecurity engineering for vehicles — threat analysis and secure development.',
    icon: IconLink,
  },
]
