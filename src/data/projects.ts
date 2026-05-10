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
  title: 'OV Berlin — Cinema Listings',
  description:
    'Browse every OV and OmU film playing in Berlin right now — showtimes, IMDb ratings, Rotten Tomatoes scores, trailers, and cinema maps. Data refreshes every 6 hours via GitHub Actions. PWA, installable, works offline.',
  tech: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Fuse.js', 'GitHub Actions'],
  screenshot: 'https://raw.githubusercontent.com/santistebanc/berlin-cinema/main/docs/screenshot1.png',
  screenshotAlt: 'OV Berlin — cinema listings app',
  liveUrl: 'https://ovberlin.site',
  githubUrl: 'https://github.com/santistebanc/berlin-cinema',
}

export const projects: Project[] = [
  {
    id: 'flyscan',
    title: 'Flyscan',
    description: 'Flight comparison tool scraping Skyscanner and Kiwi simultaneously. Filter by price, duration, stops, and inspect full itinerary timelines.',
    tech: ['React', 'Bun', 'Vite', 'Hono', 'TypeScript'],
    screenshot: 'https://raw.githubusercontent.com/santistebanc/flyscan/master/docs/screenshots/app.png',
    screenshotAlt: 'Flyscan — flight comparison',
    liveUrl: 'https://flyscan.site',
    liveLabel: 'Live →',
    githubUrl: 'https://github.com/santistebanc/flyscan',
    gradClass: 'grad-1',
  },
  {
    id: 'rankzap',
    title: 'RankZap',
    description: 'Real-time mobile-first ranked-voting. Drag to rank, submit, watch live tallies with Borda, Dowdall, and Copeland modes.',
    tech: ['React', 'TypeScript', 'dnd-kit', 'Tailwind'],
    screenshot: 'https://raw.githubusercontent.com/santistebanc/rankzap/main/public/rankzap-screenshot.png',
    screenshotAlt: 'Rankzap — ranked voting app',
    liveUrl: 'https://rankzap.site',
    liveLabel: 'Live →',
    githubUrl: 'https://github.com/santistebanc/rankzap',
    gradClass: 'grad-2',
  },
  {
    id: 'snapquiz',
    title: 'SnapQuiz',
    description: 'Real-time multiplayer quiz for groups on a TV screen. Players buzz in, answer by voice or tap. AI generates questions from any topic.',
    tech: ['React', 'TypeScript', 'PartyKit', 'OpenAI'],
    screenshot: 'https://raw.githubusercontent.com/santistebanc/snapquiz/main/docs/screenshot.png',
    screenshotAlt: 'SnapQuiz — multiplayer quiz',
    liveUrl: 'https://snapquiz.fun/',
    liveLabel: 'Live →',
    githubUrl: 'https://github.com/santistebanc/snapquiz',
    gradClass: 'grad-3',
  },
  {
    id: 'treem',
    title: 'Treem',
    description: 'Declarative state management library. Describe your app as a plain object tree — state, derived values, actions — then call run() to get a live interface.',
    tech: ['TypeScript', 'Library', 'Reactive'],
    screenshot: 'https://raw.githubusercontent.com/santistebanc/treem/main/Treem.png',
    screenshotAlt: 'Treem — state management library',
    liveUrl: 'https://santistebanc.github.io/treem/',
    liveLabel: 'Examples →',
    githubUrl: 'https://github.com/santistebanc/treem',
    gradClass: 'grad-1',
  },
  {
    id: 'minitanks',
    title: 'MiniTanks',
    description: 'Tank game I built in university, now playable in the browser via Ruffle. Survive enemy waves, collect crates, use cover.',
    tech: ['Flash', 'ActionScript 3', 'Ruffle'],
    screenshot: 'https://raw.githubusercontent.com/santistebanc/minitanks/master/assets/demo-screenshot.png',
    screenshotAlt: 'MiniTanks — browser game',
    liveUrl: 'https://santistebanc.github.io/miniTanks/',
    liveLabel: 'Play →',
    githubUrl: 'https://github.com/santistebanc/minitanks',
    gradClass: 'grad-4',
  },
  {
    id: 'minigames',
    title: 'Minigames',
    description: 'Fast-paced mobile arcade built with Phaser.js. Each run drops you into rotating 10-second challenges — survive, react, score.',
    tech: ['Phaser.js', 'JavaScript', 'Mobile'],
    screenshot: 'https://raw.githubusercontent.com/santistebanc/minigames/master/assets/screenshot1.png',
    screenshotAlt: 'Minigames — mobile arcade',
    liveUrl: 'https://santistebanc.github.io/minigames/',
    liveLabel: 'Play →',
    githubUrl: 'https://github.com/santistebanc/minigames',
    gradClass: 'grad-2',
  },
]

export const otherProjects: OtherProject[] = [
  {
    id: 'supercar',
    title: 'Super Kart Racing',
    description: 'Timed kart racing game with AI-driven opponents. Choose laps and tune acceleration, speed, and steering. Highscores saved in a leaderboard.',
    tech: ['Unity', 'C#', 'Game Dev'],
    githubUrl: 'https://github.com/santistebanc/supercar',
  },
  {
    id: 'multikey',
    title: 'Multikey',
    description: 'TypeScript library for multi-dimensional mapping. MultiMap, UniqueList, UniqueSet — efficient structures for caching and hierarchical lookups.',
    tech: ['TypeScript', 'npm', 'Library'],
    githubUrl: 'https://github.com/santistebanc/multikey',
  },
  {
    id: 'room-server',
    title: 'Room Server',
    description: 'Generic PartyKit backend for realtime key/value state. CAS operations, TTL, presence, broadcast, schema validation, and scheduling — used by RankZap and SnapQuiz.',
    tech: ['PartyKit', 'TypeScript', 'WebSockets', 'KV'],
    githubUrl: 'https://github.com/santistebanc/room-server',
  },
]

export const skills = [
  {
    title: 'Frontend',
    tags: ['React', 'TypeScript', 'JavaScript', 'Tailwind', 'Zustand', 'Vite', 'Next.js', 'CSS'],
  },
  {
    title: 'Backend & Data',
    tags: ['Node.js', 'PostgreSQL', 'GraphQL', 'tRPC', 'Prisma', 'Hono', 'Express', 'Redis'],
  },
  {
    title: 'Realtime & Infra',
    tags: ['PartyKit', 'WebSockets', 'Bun', 'Cloudflare', 'AWS', 'Docker', 'GitHub Actions'],
  },
  {
    title: 'Tooling & Practice',
    tags: ['Git', 'Cypress', 'Playwright', 'Jest', 'Figma', 'Claude Code', 'Codex', 'Cursor', 'Sentry'],
  },
]

export const experience = [
  {
    company: 'Lingoda',
    role: 'Software Engineer — Language learning platform',
    period: 'Jun 2021 – Mar 2025 · Berlin',
    logoUrl: 'https://www.lingoda.com/favicon.ico',
  },
  {
    company: 'Quandoo',
    role: 'Software Engineer — Restaurant reservations',
    period: 'Sep 2017 – Jan 2021 · Berlin',
  },
  {
    company: 'Market Logic Software',
    role: 'Web Developer — Data visualization UIs',
    period: 'Mar 2016 – Jul 2016 · Berlin',
  },
  {
    company: 'AISA',
    role: 'Software Developer — Government systems',
    period: 'Apr 2015 – Jun 2015 · Mexico',
  },
]
