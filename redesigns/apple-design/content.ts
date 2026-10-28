/**
 * Copy that lives in components of the main site (or in career-profile.md),
 * gathered here so this redesign does not depend on markup it doesn't own.
 * Project, skill and experience data are imported from ../../src/data/projects.
 */

export const EMAIL = 'carlos.santisteban@outlook.com'
export const GITHUB = 'https://github.com/santistebanc'

export const heroFacts = [
  { value: '8+', unit: 'years', label: 'Professional product work' },
  { value: 'React', unit: '+ TypeScript', label: 'Frontend product focus' },
  { value: 'AI', unit: 'workflows', label: 'Practical developer productivity' },
] as const

export const productionStories = [
  {
    company: 'Lingoda',
    kicker: 'Student learning & practice',
    title: 'Lingobites',
    body:
      'An in-house interactive practice feature that replaced a third-party quiz service: vocabulary flashcards, multiple choice, matching and dialogue completion, with progress tracking, gamification and AI-generated exercises under human review.',
    role:
      'Major frontend ownership of the student experience in a team of five to six: exercise UI and types, session flow, routing, animations, state, progress and gamification, plus planning, API discussions, QA and release iteration.',
    stack: ['React', 'Apollo', 'GraphQL', 'NestJS', 'OpenAI SDK', 'PostgreSQL'],
    outcome:
      'Positive student feedback, improved engagement and retention indicators, and part of Lingoda’s product value proposition.',
  },
  {
    company: 'Quandoo',
    kicker: 'Consumer booking, SEO & performance',
    title: 'Router migration',
    body:
      'The consumer booking site, a large React app with custom server-side rendering, was held back by an old React Router version that blocked React and library upgrades.',
    role:
      'Led the investigation and plan: researched upgrade paths, mapped every router touchpoint, wrote the recommendation, presented the tradeoffs, shaped a gradual migration with senior developers and helped implement it.',
    stack: ['React', 'SSR', 'styled-components', 'React Router'],
    outcome: 'Shipped without breaking SSR or styling, and unblocked React and related upgrades.',
  },
] as const

export const quandooProof = [
  'Reusable campaign-page structures for seasonal and promotional pages',
  'A widely used slider/carousel for discovery pages, iterated for performance',
  'Search and availability filter improvements in the booking flow',
  'SEO work: structured content, metadata, canonicals, internal linking, indexability',
  'Coaching and code review for junior engineers',
] as const

export const aiSteps = [
  {
    icon: 'research',
    title: 'Research',
    body: 'Explore the problem space, tool choices, frameworks, and architecture risks before committing to a direction.',
  },
  {
    icon: 'decide',
    title: 'Decide',
    body: 'Use structured grilling sessions to clarify behavior, scope, architecture, and tradeoffs.',
  },
  {
    icon: 'prototype',
    title: 'Prototype',
    body: 'Generate small interactive prototypes to test direction and uncover missing product details.',
  },
  {
    icon: 'build',
    title: 'Build in slices',
    body: 'Implement vertical slices, often TDD-oriented, so each slice can be reviewed, tested, and steered.',
  },
  {
    icon: 'review',
    title: 'Review and verify',
    body: 'Inspect UX, architecture, code quality, correctness, types, edge cases, and product fit.',
  },
  {
    icon: 'ship',
    title: 'Ship and maintain',
    body: 'Use AI support for deployment, CI, hosting, monitoring, analytics, and maintenance.',
  },
] as const

export const aiIconPaths = {
  research: 'M11 4a7 7 0 1 0 4.9 12l3.6 3.6 1.4-1.4-3.6-3.6A7 7 0 0 0 11 4Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z',
  decide: 'M5 4h14v3H5V4Zm0 6h14v3H5v-3Zm0 6h9v3H5v-3Zm12.5-.5 1.4 1.4-3.6 3.6-2.2-2.2 1.4-1.4.8.8 2.2-2.2Z',
  prototype: 'M4 5h16v10H4V5Zm2 2v6h12V7H6Zm3 10h6v2H9v-2Zm-3 2h12v2H6v-2Z',
  build: 'M8 4h8l1.5 3H20v13H4V7h2.5L8 4Zm1.2 2-1 2H6v10h12V8h-2.2l-1-2H9.2Zm1.8 4 4 2-4 2v-4Z',
  review: 'M4 5h12v2H4V5Zm0 4h12v2H4V9Zm0 4h8v2H4v-2Zm13.2.2 1.4 1.4-4.4 4.4-2.4-2.4 1.4-1.4 1 1 3-3Z',
  ship: 'M12 3l7 4v5c0 4.3-2.9 7.4-7 9-4.1-1.6-7-4.7-7-9V7l7-4Zm0 2.3L7 8.1V12c0 3 1.8 5.3 5 6.7 3.2-1.4 5-3.7 5-6.7V8.1l-5-2.8Zm-1 3.7h2v4h3l-4 4-4-4h3V9Z',
} as const

/** CV PDFs served from public/. Company-specific application variants are left out on purpose. */
export const cvPrimary = { label: 'Résumé', detail: 'General · English · PDF', href: '/Carlos_Santisteban_CV.pdf' }

export const cvVariants = [
  { label: 'Software Engineer', detail: 'English', href: '/software-engineer/Carlos_Santisteban_CV.pdf' },
  { label: 'Frontend Engineer', detail: 'English', href: '/frontend-engineer/Carlos_Santisteban_CV.pdf' },
  { label: 'React Engineer', detail: 'English', href: '/react-engineer/Carlos_Santisteban_CV.pdf' },
  { label: 'Full-Stack Engineer', detail: 'English', href: '/full-stack-engineer/Carlos_Santisteban_CV.pdf' },
  { label: 'AI-Assisted Product Engineer', detail: 'English', href: '/ai-assisted-product-engineer/Carlos_Santisteban_CV.pdf' },
  { label: 'Software Engineer', detail: 'Deutsch', href: '/software-engineer/Carlos_Santisteban_CV_DE.pdf' },
] as const
