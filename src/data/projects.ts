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
  githubUrl?: string
}

export interface OtherProject {
  id: string
  title: string
  description: string
  tech: string[]
  liveUrl?: string
  liveLabel?: string
  githubUrl?: string
}

export const featuredProject = {
  title: 'Flyscan - Flight Metasearch',
  description:
    'Flight metasearch app for the web and desktop (Windows, macOS and Linux). It searches several sources at once and merges the same flight from different sellers into one row, so price differences show. A Python service with a built-in queue keeps results in SQLite, so searches answer instantly from stored data and fetch only what is missing. The web version runs on flyscan.site; the desktop app adds more sources and signed automatic updates.',
  tech: ['Python', 'Flask', 'SQLite', 'React', 'TypeScript', 'Tauri', 'Docker'],
  screenshot: '/flyscan-screenshot.webp',
  screenshotAlt: 'Flyscan round-trip results with flight timelines and the selected flight in a side panel',
  liveUrl: 'https://flyscan.site',
  githubUrl: 'https://github.com/santistebanc/flyscan',
}

export const projects: Project[] = [
  {
    id: 'ovberlin',
    title: 'OV Berlin',
    description: 'Public PWA for finding original-version and subtitled screenings in Berlin cinemas. A Node.js pipeline merges two listing sources, resolves each film and cinema, and adds ratings, trailers and maps; the app offers fuzzy search, filters, grid and stacked showtime views, and works offline.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Node.js', 'PWA', 'GitHub Actions'],
    screenshot: '/ovberlin-screenshot.webp',
    screenshotAlt: 'OV Berlin film listings with posters, ratings and screening formats',
    liveUrl: 'https://ovberlin.online',
    githubUrl: 'https://github.com/santistebanc/berlin-cinema',
  },
  {
    id: 'splitnext',
    title: 'Splitnext',
    description: 'Offline-first shared-expense app for groups. Changes apply instantly, sync in real time across devices and wait on the device while offline. Each group lives in its own SQLite Durable Object, and expenses split equally, by shares or by exact amounts with fair rounding.',
    tech: ['React Native (Expo)', 'TypeScript', 'Hono', 'Cloudflare Durable Objects', 'D1', 'WebSockets'],
    screenshot: '/splitnext-screenshot.webp',
    screenshotAlt: 'Splitnext group balances, an expense split by shares, and the settle-up plan',
    githubUrl: 'https://github.com/santistebanc/splitnext',
  },
  {
    id: 'rankzap',
    title: 'RankZap',
    description: 'Real-time, mobile-first ranked-voting app. Share a poll by link or QR code, drag the options into order, and watch live tallies by Borda count, Dowdall or Copeland. Each poll runs in its own Durable Object, and hosts pick a colour that floods the whole poll.',
    tech: ['React', 'TypeScript', 'dnd-kit', 'Tailwind', 'Cloudflare Durable Objects', 'WebSockets'],
    screenshot: '/rankzap-screenshot.png',
    screenshotAlt: 'RankZap ballot being ranked, a closed poll with its winner, and the host view with live scores',
    liveUrl: 'https://rankzap.site',
    liveLabel: 'Live ->',
    githubUrl: 'https://github.com/santistebanc/rankzap',
  },
]

export const otherProjects: OtherProject[] = [
  {
    id: 'snapquiz',
    title: 'SnapQuiz',
    description: 'Real-time multiplayer party quiz. A shared screen hosts the game, players answer from their phones by tapping or speaking, and AI generates questions for any category.',
    tech: ['PartyKit', 'React', 'TypeScript', 'Vercel AI SDK', 'OpenAI'],
    githubUrl: 'https://github.com/santistebanc/snapquiz',
  },
  {
    id: 'cuecam',
    title: 'CueCam',
    description: 'Android app for recording videos to a song. It plays the song from a cue point on the phone, a TV or a speaker while the camera records, then syncs the take and replaces the room audio with the clean track.',
    tech: ['Kotlin', 'Jetpack Compose', 'Android'],
    liveUrl: 'https://github.com/santistebanc/cuecam-releases/releases/latest',
    liveLabel: 'Android download ->',
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
    id: 'minitanks',
    title: 'MiniTanks',
    description: 'Tank game built in university, now playable in the browser via Ruffle. Survive enemy waves, collect crates, and use cover.',
    tech: ['Flash', 'ActionScript 3', 'Ruffle'],
    liveUrl: 'https://santistebanc.github.io/miniTanks/',
    liveLabel: 'Play ->',
    githubUrl: 'https://github.com/santistebanc/miniTanks',
  },
]

export const skills = [
  {
    title: 'Frontend',
    tags: ['JavaScript', 'TypeScript', 'React', 'React Native (Expo)', 'Tauri', 'Redux', 'Zustand', 'React Query', 'GraphQL / Apollo', 'Tailwind CSS', 'Design Systems', 'PWA', 'SSR'],
  },
  {
    title: 'Backend & Data',
    tags: ['Node.js', 'Hono', 'Express', 'Python', 'REST / OpenAPI', 'WebSockets', 'PostgreSQL', 'SQLite', 'Cloudflare D1', 'Durable Objects', 'Supabase'],
  },
  {
    title: 'Quality & Delivery',
    tags: ['Vitest', 'Playwright', 'End-to-end Tests', 'Docker', 'GitHub Actions', 'Git', 'Monorepos', 'Sentry', 'Datadog'],
  },
  {
    title: 'AI-Assisted Development',
    tags: ['Claude Code', 'Codex', 'T3 Code', 'Agent Skills', 'Vercel AI SDK', 'OpenAI API'],
  },
]

export const experience = [
  {
    company: 'Independent Product Development',
    role: 'Full-stack web, desktop and mobile apps',
    period: 'Apr 2025 - Present - Berlin',
  },
  {
    company: 'Lingoda',
    role: 'Software Engineer - student-facing learning features',
    period: 'Jun 2021 - Mar 2025 - Berlin',
  },
  {
    company: 'Quandoo',
    role: 'Software Engineer - restaurant discovery and booking',
    period: 'Sep 2017 - Feb 2021 - Berlin',
  },
  {
    company: 'Market Logic Software',
    role: 'Software Development - data visualization UIs',
    period: 'Mar 2016 - Jul 2016 - Berlin',
  },
  {
    company: 'AISA',
    role: 'Software Developer - document management software',
    period: 'Apr 2015 - Jun 2015 - Mexico',
  },
]
