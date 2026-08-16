export type GradClass = 'grad-1' | 'grad-2' | 'grad-3' | 'grad-4'

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  screenshot?: string
  screenshotAlt: string
  liveUrl?: string
  liveLabel?: string
  githubUrl: string
  gradClass: GradClass
}

export interface OtherProject {
  id: string
  title: string
  description: string
  tech: string[]
  liveUrl?: string
  liveLabel?: string
  githubUrl: string
}

export const featuredProject = {
  title: 'OV Berlin - Cinema Listings',
  description:
    'Public PWA for finding original-version cinema screenings in Berlin, with automated data refresh, rating/trailer enrichment, offline support, maps, and fast search/filter UX. Built and deployed end to end.',
  tech: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Fuse.js', 'GitHub Actions'],
  screenshot: '/ovberlin-screenshot.png',
  screenshotAlt: 'OV Berlin cinema listings app',
  liveUrl: 'https://ovberlin.online',
  githubUrl: 'https://github.com/santistebanc/berlin-cinema',
}

export const projects: Project[] = [
  {
    id: 'flyscan',
    title: 'Flyscan',
    description: 'Flight comparison interface that aggregates multiple providers into a filterable itinerary view, with emphasis on search UX, loading states, result comparison, and deployment.',
    tech: ['React', 'Bun', 'Vite', 'TypeScript'],
    screenshot: 'https://raw.githubusercontent.com/santistebanc/flyscan/master/docs/screenshots/app.png',
    screenshotAlt: 'Flyscan flight comparison',
    liveUrl: 'https://flyscan.site',
    liveLabel: 'Live ->',
    githubUrl: 'https://github.com/santistebanc/flyscan',
    gradClass: 'grad-1',
  },
  {
    id: 'rankzap',
    title: 'RankZap',
    description: 'Real-time mobile-first ranked-voting product. Drag to rank, submit, and watch live tallies across Borda, Dowdall, and Copeland modes.',
    tech: ['React', 'TypeScript', 'dnd-kit', 'Tailwind'],
    screenshot: '/rankzap-screenshot.png',
    screenshotAlt: 'RankZap ranked voting app',
    liveUrl: 'https://rankzap.site',
    liveLabel: 'Live ->',
    githubUrl: 'https://github.com/santistebanc/rankzap',
    gradClass: 'grad-2',
  },
  {
    id: 'snapquiz',
    title: 'SnapQuiz',
    description: 'Realtime multiplayer quiz for groups on a shared screen and mobile devices, with AI-generated questions, room coordination, and voice or tap answering flows.',
    tech: ['React', 'TypeScript', 'PartyKit', 'OpenAI'],
    screenshot: 'https://raw.githubusercontent.com/santistebanc/snapquiz/main/docs/screenshot.png',
    screenshotAlt: 'SnapQuiz multiplayer quiz',
    liveUrl: 'https://snapquiz.fun/',
    liveLabel: 'Live ->',
    githubUrl: 'https://github.com/santistebanc/snapquiz',
    gradClass: 'grad-3',
  }
]

export const otherProjects: OtherProject[] = [
  {
    id: 'room-server',
    title: 'Room Server',
    description: 'Generic PartyKit backend for realtime key/value state. CAS operations, TTL, presence, broadcast, schema validation, and scheduling - used by RankZap and SnapQuiz.',
    tech: ['PartyKit', 'TypeScript', 'WebSockets', 'KV'],
    githubUrl: 'https://github.com/santistebanc/room-server',
  },
  {
    id: 'treem',
    title: 'Treem',
    description: 'Declarative state management library. Describe an app as a plain object tree - state, derived values, actions - then call run() to get a live interface.',
    tech: ['TypeScript', 'Library', 'Reactive'],
    liveUrl: 'https://santistebanc.github.io/treem/',
    liveLabel: 'Examples ->',
    githubUrl: 'https://github.com/santistebanc/treem',
  },
  {
    id: 'multikey',
    title: 'Multikey',
    description: 'TypeScript library for multi-dimensional mapping. MultiMap, UniqueList, UniqueSet - efficient structures for caching and hierarchical lookups.',
    tech: ['TypeScript', 'npm', 'Library'],
    githubUrl: 'https://github.com/santistebanc/multikey',
  },
  {
    id: 'minitanks',
    title: 'MiniTanks',
    description: 'Tank game built in university, now playable in the browser via Ruffle. Survive enemy waves, collect crates, and use cover.',
    tech: ['Flash', 'ActionScript 3', 'Ruffle'],
    liveUrl: 'https://santistebanc.github.io/miniTanks/',
    liveLabel: 'Play ->',
    githubUrl: 'https://github.com/santistebanc/minitanks',
  },
  {
    id: 'minigames',
    title: 'Minigames',
    description: 'Fast-paced mobile arcade built with Phaser.js. Each run drops you into rotating 10-second challenges - survive, react, score.',
    tech: ['Phaser.js', 'JavaScript', 'Mobile'],
    liveUrl: 'https://santistebanc.github.io/minigames/',
    liveLabel: 'Play ->',
    githubUrl: 'https://github.com/santistebanc/minigames',
  },
  {
    id: 'supercar',
    title: 'Super Kart Racing',
    description: 'Timed kart racing game with AI-driven opponents. Choose laps and tune acceleration, speed, and steering. Highscores saved in a leaderboard.',
    tech: ['Unity', 'C#', 'Game Dev'],
    githubUrl: 'https://github.com/santistebanc/supercar',
  },
]


export const skills = [
  {
    title: 'Product UI Engineering',
    tags: ['JavaScript', 'TypeScript', 'React', 'UI Architecture', 'Forms', 'Design Systems', 'CSS'],
  },
  {
    title: 'Full-Stack Product Delivery',
    tags: ['Node.js', 'REST APIs', 'GraphQL', 'PostgreSQL', 'WebSockets', 'PWA'],
  },
  {
    title: 'AI-Assisted Development',
    tags: ['AI SDKs', 'AI Workflows', 'Agent Skills', 'MCPs', 'LLM APIs', 'Prototyping'],
  },
  {
    title: 'Quality & Release',
    tags: ['Playwright', 'Debugging', 'Code Review', 'GitHub Actions', 'Docker', 'CI/CD'],
  },
]

export const experience = [
  {
    company: 'Independent Product Development',
    role: 'Frontend-focused web apps, UX, and AI-assisted workflows',
    period: 'Apr 2025 - Present - Berlin',
  },
  {
    company: 'Lingoda',
    role: 'Software Engineer - student learning and practice flows',
    period: 'Jun 2021 - Mar 2025 - Berlin',
    logoUrl: 'https://www.lingoda.com/favicon.ico',
  },
  {
    company: 'Quandoo',
    role: 'Software Engineer - consumer booking, SEO, and performance',
    period: 'Sep 2017 - Jan 2021 - Berlin',
  },
  {
    company: 'Market Logic Software',
    role: 'Web Developer - data visualization UIs',
    period: 'Mar 2016 - Jul 2016 - Berlin',
  },
  {
    company: 'AISA',
    role: 'Software Developer - document management systems',
    period: 'Apr 2015 - Jun 2015 - Mexico',
  },
]
