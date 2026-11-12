// Public presentation copy and project data.
export { featuredProject, projects, otherProjects, skills, experience } from './data/projects'

export const person = {
  name: 'Carlos Santisteban',
  role: 'Software Engineer',
  location: 'Berlin, Germany',
  email: 'carlos.santisteban@outlook.com',
  github: 'https://github.com/santistebanc',
  githubLabel: 'github.com/santistebanc',
  tagline:
    'Software engineer with 8+ years of experience building user-facing products end to end, from interface to API and data, focused on interfaces where functionality and ease of use matter as much as visual polish.',
}

export const boardRows = [
  { value: '8+', unit: 'Years', detail: 'Professional product work' },
  { value: 'UX', unit: 'Focus', detail: 'Usability-focused interfaces' },
  { value: 'AI', unit: 'Workflows', detail: 'Practical developer productivity' },
] as const

export const workIntro =
  'Independent web, desktop and mobile apps that show how I approach usable interfaces, data and sync, real-time features, and AI-assisted development. My production experience comes from team work at Lingoda, Quandoo, Market Logic, and AISA.'

export const aiIntro =
  'I use AI for research, planning, implementation, testing, verification and monitoring, and build AI features into apps, while bringing the architecture direction and usability judgment AI still lacks.'

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
    'Complete applications across platforms: offline-first web apps and PWAs, real-time multi-user apps, desktop apps with Tauri and cross-platform apps with React Native (Expo), backed by Node.js and Python APIs, SQLite and Cloudflare. AI-assisted from 2025, fully agent-driven since 2026.',
  Lingoda:
    'Student-facing features of the language-learning platform in React, TypeScript and GraphQL. On the post-class practice feature, owned the quiz, flashcard, matching and dialogue interfaces and their session flow, scoring, retries, hints and progress.',
  Quandoo:
    'Built the restaurant discovery and booking portal in React and Redux: campaign pages, widgets, search filters, server-side rendering and SEO. Led the investigation into upgrading React Router v3 to v5 and built a working proof of concept.',
  'Market Logic Software':
    'React UI components, D3.js data visualizations and dynamic widgets for a market intelligence platform.',
  AISA: 'C# / WPF forms for government document-management software over SQL.',
}

export const education = {
  title: 'Bachelor of IT Engineering',
  school: 'Tecnológico de Monterrey, Mexico',
  note: 'DAAD scholarship exchange semester in Informatics at Hochschule Furtwangen, Germany.',
}

export const cta = {
  heading: "Let's build something great together.",
  body: 'Open to full-time roles and exciting freelance work. Based in Berlin, available immediately.',
}

export const cvMain = { label: 'Download CV', href: '/Carlos_Santisteban_CV.pdf' }

export const sections = [
  { id: 'work', line: '1', label: 'Work' },
  { id: 'ai-workflow', line: '2', label: 'AI workflow' },
  { id: 'about', line: '3', label: 'About' },
  { id: 'skills', line: '4', label: 'Skills' },
  { id: 'contact', line: '5', label: 'Contact' },
] as const
