/**
 * Copy specific to this redesign. Project, skill and experience data is read
 * from ../../src/data/projects.ts so both sites stay in sync.
 */

export const EMAIL = 'carlos.santisteban@outlook.com'
export const GITHUB = 'https://github.com/santistebanc'
export const CV_URL = '/Carlos_Santisteban_CV.pdf'

export const hero = {
  role: 'Software Engineer',
  location: 'Berlin, Germany',
  lede:
    'Software engineer building polished user-facing web apps, React and TypeScript interfaces, practical full-stack features, and AI-assisted development workflows.',
}

export const facts = [
  { value: '8+', unit: 'years', label: 'Professional product work' },
  { value: 'React', unit: '+ TypeScript', label: 'Frontend product focus' },
  { value: 'AI', unit: 'workflows', label: 'Practical developer productivity' },
]

/** The "strengths" object from the original hero code card, set as a spec sheet. */
export const strengths = [
  { key: 'UI', value: 'Forms, flows, systems' },
  { key: 'Stack', value: 'React, TypeScript, Node' },
  { key: 'Delivery', value: 'Plan, build, release' },
  { key: 'AI', value: 'Practical, reviewed, useful' },
]

export const work = {
  label: 'Portfolio examples',
  title: 'Polished apps, product flows, and useful systems',
  intro:
    'Independent web applications that show how I approach product UI, data flows, deployment, realtime interactions, and AI-assisted development. My production experience comes from team work at Lingoda, Quandoo, Market Logic, and AISA.',
}

export const method = {
  label: 'How I build with AI',
  title: 'Practical assistance, deliberate review',
  intro:
    'I use coding agents, reusable skills, and AI SDKs to accelerate planning, implementation, debugging, and iteration while staying responsible for architecture, UX, and code quality.',
  steps: [
    {
      title: 'Research',
      body: 'Explore the problem space, tool choices, frameworks, and architecture risks before committing to a direction.',
    },
    {
      title: 'Decide',
      body: 'Use structured grilling sessions to clarify behavior, scope, architecture, and tradeoffs.',
    },
    {
      title: 'Prototype',
      body: 'Generate small interactive prototypes to test direction and uncover missing product details.',
    },
    {
      title: 'Build in slices',
      body: 'Implement vertical slices, often TDD-oriented, so each slice can be reviewed, tested, and steered.',
    },
    {
      title: 'Review and verify',
      body: 'Inspect UX, architecture, code quality, correctness, types, edge cases, and product fit.',
    },
    {
      title: 'Ship and maintain',
      body: 'Use AI support for deployment, CI, hosting, monitoring, analytics, and maintenance.',
    },
  ],
}

export const about = {
  label: 'About',
  title: 'Hands-on software engineer',
}

export const contact = {
  label: 'Contact',
  lead: 'Open to full-time roles and exciting freelance work. Based in Berlin, available immediately.',
}

/** Role-focused CV variants that live in public/. Company-tailored ones are deliberately left out. */
export const cvVariants = [
  { label: 'Software Engineer', href: '/software-engineer/Carlos_Santisteban_CV.pdf' },
  { label: 'Frontend Engineer', href: '/frontend-engineer/Carlos_Santisteban_CV.pdf' },
  { label: 'React Engineer', href: '/react-engineer/Carlos_Santisteban_CV.pdf' },
  { label: 'Full-Stack Engineer', href: '/full-stack-engineer/Carlos_Santisteban_CV.pdf' },
  { label: 'AI-Assisted Product Engineer', href: '/ai-assisted-product-engineer/Carlos_Santisteban_CV.pdf' },
]
