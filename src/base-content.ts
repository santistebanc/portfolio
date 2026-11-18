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
    'I’ve built practice exercises for language students at Lingoda and restaurant search at Quandoo. These days I’m building apps of my own.',
}

export const boardRows = [
  { value: '8+', unit: 'Years', detail: 'Professional software development' },
  { value: 'UI', unit: 'Development', detail: 'React and TypeScript' },
  { value: 'API', unit: 'Development', detail: 'Node.js and Python' },
] as const

export const workIntro =
  'These are apps I built independently. You can compare flight prices, find a film in its original language, split a bill, or run a ranked vote.'

export const aiIntro =
  'I use coding agents to compare approaches, build prototypes, and help write and test the code.'

export const aiSteps = [
  {
    title: 'Research',
    body: 'Compare tools and check where each option could cause problems.',
  },
  {
    title: 'Decide',
    body: 'Decide what the feature should do and what can wait.',
  },
  {
    title: 'Prototype',
    body: 'Try a small, working version to see what the plan missed.',
  },
  {
    title: 'Build one piece',
    body: 'Build one part that works end to end so I can test and review it on its own.',
  },
  {
    title: 'Review the result',
    body: 'Use the feature, read the code, and test what happens when things go wrong.',
  },
  {
    title: 'Ship and maintain',
    body: 'Use agents to help with deployment and follow up on problems after release.',
  },
] as const

/** Production highlights, condensed from the public CV. Keyed by company name in `experience`. */
export const highlights: Record<string, string> = {
  'Independent Product Development':
    'I build web, desktop and mobile apps, including apps that work offline and apps where several people can take part at once. I started using AI in 2025 and moved to an agent-driven workflow in 2026.',
  Lingoda:
    'I owned the exercises students use after class, including quizzes, flashcards, matching and dialogues. I built the screens and the logic for scoring, hints, retries and progress.',
  Quandoo:
    'I built search filters, campaign pages and booking widgets. I also worked on server-side rendering and SEO, and built a prototype to test the upgrade from React Router 3 to 5.',
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
  heading: 'Get in touch',
  body: 'I’m based in Berlin and available to start immediately for full-time or freelance work.',
}

export const cvMain = { label: 'Download CV', href: '/Carlos_Santisteban_CV.pdf' }

export const sections = [
  { id: 'work', line: '1', label: 'Work' },
  { id: 'ai-workflow', line: '2', label: 'AI workflow' },
  { id: 'about', line: '3', label: 'About' },
  { id: 'skills', line: '4', label: 'Skills' },
  { id: 'contact', line: '5', label: 'Contact' },
] as const
