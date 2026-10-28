// Public presentation copy and project data. Private facts and drafts live in Career Desk.
export { featuredProject, projects, otherProjects, skills, experience } from './data/projects'

export const person = {
  name: 'Carlos Santisteban',
  role: 'Software Engineer',
  location: 'Berlin, Germany',
  email: 'carlos.santisteban@outlook.com',
  github: 'https://github.com/santistebanc',
  githubLabel: 'github.com/santistebanc',
  tagline:
    'Software engineer building polished user-facing web apps, React and TypeScript interfaces, practical full-stack features, and AI-assisted development workflows.',
}

export const boardRows = [
  { value: '8+', unit: 'Years', detail: 'Professional product work' },
  { value: 'React', unit: '+ TypeScript', detail: 'Frontend product focus' },
  { value: 'AI', unit: 'Workflows', detail: 'Practical developer productivity' },
] as const

export const workIntro =
  'Independent web applications that show how I approach product UI, data flows, deployment, realtime interactions, and AI-assisted development. My production experience comes from team work at Lingoda, Quandoo, Market Logic, and AISA.'

export const aiIntro =
  'I use coding agents, reusable skills, and AI SDKs to accelerate planning, implementation, debugging, and iteration while staying responsible for architecture, UX, and code quality.'

export const aiSteps = [
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
] as const

/** Production highlights, condensed from the public CV. Keyed by company name in `experience`. */
export const highlights: Record<string, string> = {
  'Independent Product Development':
    'React/TypeScript apps across search, filter and comparison flows, realtime interactions, PWA/offline behavior, data pipelines, and deployment automation.',
  Lingoda:
    'Major frontend ownership of Lingobites student-facing exercise flows: interactive UI, multiple exercise types, routing, animations, progress tracking, gamification, and flashcard integration.',
  Quandoo:
    'Led investigation and planning for a major React Router migration that preserved custom SSR and styled-components behavior while unblocking React and library upgrades.',
  'Market Logic Software':
    'Data-heavy UI components, interactive graphs, and dynamic widgets with React and D3.js for an enterprise market intelligence platform.',
  AISA: 'UI forms and controls for legal document management systems using C#, WPF, and SQL databases.',
}

export const education = {
  title: 'Bachelor of IT Engineering',
  school: 'Tecnologico de Monterrey, Mexico',
  note: 'DAAD scholarship exchange semester in Informatics at Hochschule Furtwangen, Germany.',
}

export const cta = {
  heading: "Let's build something great together.",
  body: 'Open to full-time roles and exciting freelance work. Based in Berlin, available immediately.',
}

export const cvMain = { label: 'Download CV', href: '/Carlos_Santisteban_CV.pdf' }

/** The only two public CV downloads. Role templates remain in Career Desk. */
export const cvVariants = [
  { label: 'CV in English', href: '/Carlos_Santisteban_CV.pdf' },
  { label: 'Lebenslauf auf Deutsch', href: '/Carlos_Santisteban_CV_DE.pdf' },
] as const

export const sections = [
  { id: 'work', line: '1', label: 'Work' },
  { id: 'ai-workflow', line: '2', label: 'AI workflow' },
  { id: 'about', line: '3', label: 'About' },
  { id: 'skills', line: '4', label: 'Skills' },
  { id: 'contact', line: '5', label: 'Contact' },
] as const
