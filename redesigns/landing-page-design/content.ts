// All copy for the landing-page-design redesign.
// Facts come from README.md, career-profile.md, src/data/projects.ts and cv/cv-component.ts.
// Copy rule from the design system: no hyphens inside visible prose.

export const EMAIL = 'carlos.santisteban@outlook.com'
export const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Role for Carlos Santisteban')}`
export const GITHUB = 'https://github.com/santistebanc'

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'production', label: 'Production' },
  { id: 'ai', label: 'AI workflow' },
  { id: 'about', label: 'About' },
  { id: 'faq', label: 'FAQ' },
  { id: 'cv', label: 'CV' },
] as const

export const employers = ['Lingoda', 'Quandoo', 'Market Logic Software', 'AISA']

export const benefits = [
  {
    icon: 'ph-squares-four',
    title: 'Product UI that holds up in large codebases',
    body: '8+ years in production web apps, mostly React and TypeScript: forms, onboarding, booking and learning flows, search and filters, and the awkward UI states between them.',
    proof: 'Lingoda · Quandoo',
  },
  {
    icon: 'ph-flag-checkered',
    title: 'Features carried all the way to release',
    body: 'I join planning and API discussions, build the interface, test it, fix what QA finds, and keep iterating after release with product, design and backend.',
    proof: 'Lingobites at Lingoda',
  },
  {
    icon: 'ph-path',
    title: 'Risky changes, planned before they are made',
    body: 'I led the investigation for a React Router migration in a large SSR codebase: mapped every touchpoint, compared options, documented the tradeoffs, and helped migrate gradually.',
    proof: 'Router migration at Quandoo',
  },
  {
    icon: 'ph-stack',
    title: 'Full stack when the feature needs it',
    body: 'Node.js, GraphQL and REST APIs, PostgreSQL, WebSockets, data pipelines and GitHub Actions, used to deliver product slices end to end.',
    proof: 'OV Berlin · RankZap · Room Server',
  },
  {
    icon: 'ph-sparkle',
    title: 'AI speed, with my name on the code',
    body: 'I use coding agents and AI SDKs to prototype, debug and iterate faster. Architecture, UX, review and final responsibility stay with me.',
    proof: 'See how I build with AI',
    proofHref: '#ai',
  },
]

export const taglineLines = [
  'Ambiguous requirements,',
  'turned into interfaces',
  'people actually use,',
  'then carried to release.',
]

export const cases = [
  {
    id: 'lingobites',
    company: 'Lingoda',
    period: 'Jun 2021 → Mar 2025',
    title: 'Lingobites: interactive practice for a live language learning platform',
    context:
      'Lingoda students book live video classes with freelance teachers. Lingobites is the practice layer that reinforces each class: vocabulary flashcards, multiple choice, matching and dialogue completion.',
    problem:
      'The old exercises ran on a third party quiz service that limited styling, integration and exercise types, and every exercise was written by hand. The team replaced it with an in house system with progress tracking, gamification and AI generated exercises reviewed by people.',
    role:
      'In a product team of five or six, I had major frontend ownership of the student experience: exercise UI and types, session flow, routing, animations, state handling, progress and gamification, plus moving the existing flashcards into the new flow. I also joined planning, API discussions, QA, bug fixing and release iteration.',
    outcome:
      'Positive student feedback, and a feature that became part of Lingoda’s product offering, delivered through changing designs and awkward legacy data shapes.',
    stack: ['React', 'Apollo', 'GraphQL', 'Material UI', 'NestJS', 'OpenAI SDK', 'PostgreSQL'],
  },
  {
    id: 'router',
    company: 'Quandoo',
    period: 'Sep 2017 → Jan 2021',
    title: 'React Router migration in a large server rendered booking site',
    context:
      'Quandoo’s consumer restaurant booking site was a large React app with custom server side rendering through renderToString, styled components style collection and client rehydration.',
    problem:
      'An old React Router version blocked React and library upgrades. Routing was coupled deep into the app, so any change put SSR and styling at risk.',
    role:
      'I led the investigation: researched router options and upgrade paths, mapped every touchpoint, analyzed risk and effort, wrote the recommendation and presented the tradeoffs. Then I shaped a gradual plan with senior developers and helped implement it.',
    outcome: 'The migration shipped with SSR and styling behavior intact, and unblocked React and related library upgrades.',
    stack: ['React', 'React Router', 'SSR', 'styled components'],
    extra: {
      title: 'Also at Quandoo',
      items: [
        'Reusable campaign page structures for seasonal promotions, built with design and product',
        'A widely used slider and carousel for discovery pages, later tuned for performance',
        'Search and availability filter improvements in the booking flow',
        'SEO work: structured content, metadata, canonical URLs, internal linking and indexability',
        'Time to first paint and time to interactive improvements',
        'Coaching and code review for junior engineers',
      ],
    },
  },
]

export const featured = {
  title: 'OV Berlin',
  tagline: 'Original version films playing in Berlin',
  body: 'A public PWA for finding original version screenings in Berlin. A Node scraping pipeline runs every 6 hours on GitHub Actions, collects showtimes from critic.de and berlin.de, adds posters, ratings and trailers from TMDb and OMDb, and commits a static movies.json. The React app loads everything at once, so search and filters feel instant and the app keeps working offline.',
  facts: ['Refreshed every 6 hours', 'Works offline', 'Maps, ratings, trailers'],
  tech: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Fuse.js', 'Node.js', 'GitHub Actions'],
  screenshot: '/ovberlin-screenshot.png',
  alt: 'OV Berlin app showing a grid of films with posters, ratings and showtimes',
  liveUrl: 'https://ovberlin.online',
  liveLabel: 'ovberlin.online',
  githubUrl: 'https://github.com/santistebanc/berlin-cinema',
}

export const projects = [
  {
    id: 'flyscan',
    title: 'Flyscan',
    body: 'Flight comparison that pulls several providers into one filterable itinerary timeline, sortable by price, duration and stops. A Bun backend uses Effect.ts for validation, errors and async orchestration.',
    tech: ['React', 'TypeScript', 'Bun', 'Effect.ts', 'Vite'],
    screenshot: 'https://raw.githubusercontent.com/santistebanc/flyscan/master/docs/screenshots/app.png',
    alt: 'Flyscan flight results shown on an interactive timeline',
    liveUrl: 'https://flyscan.site',
    githubUrl: 'https://github.com/santistebanc/flyscan',
  },
  {
    id: 'rankzap',
    title: 'RankZap',
    body: 'Realtime, mobile first ranked voting. Create a poll room, share the link, drag options into order and watch live tallies across Borda, Dowdall and Copeland modes.',
    tech: ['React', 'TypeScript', 'dnd kit', 'Tailwind', 'PartyKit'],
    screenshot: '/rankzap-screenshot.png',
    alt: 'RankZap poll where voters drag options into a ranked order',
    liveUrl: 'https://rankzap.site',
    githubUrl: 'https://github.com/santistebanc/rankzap',
  },
  {
    id: 'snapquiz',
    title: 'SnapQuiz',
    body: 'Realtime multiplayer quiz for a shared screen plus phones, with AI generated questions, room coordination, and voice or tap answers.',
    tech: ['React', 'TypeScript', 'PartyKit', 'OpenAI'],
    screenshot: 'https://raw.githubusercontent.com/santistebanc/snapquiz/main/docs/screenshot.png',
    alt: 'SnapQuiz shared screen showing a quiz question and player answers',
    liveUrl: 'https://snapquiz.fun/',
    githubUrl: 'https://github.com/santistebanc/snapquiz',
  },
]

export const otherProjects = [
  {
    title: 'Room Server',
    body: 'Generic PartyKit backend for realtime key value state: CAS operations, TTL, presence, broadcast, schema validation and scheduling. Powers RankZap and SnapQuiz.',
    tech: ['PartyKit', 'TypeScript', 'WebSockets'],
    githubUrl: 'https://github.com/santistebanc/room-server',
  },
  {
    title: 'Treem',
    body: 'Declarative state management library. Describe an app as a plain object tree of state, derived values and actions, then call run() to get a live interface.',
    tech: ['TypeScript', 'Library'],
    liveUrl: 'https://santistebanc.github.io/treem/',
    liveLabel: 'Examples',
    githubUrl: 'https://github.com/santistebanc/treem',
  },
  {
    title: 'Multikey',
    body: 'TypeScript library for multi dimensional mapping. MultiMap, UniqueList and UniqueSet for caching and hierarchical lookups.',
    tech: ['TypeScript', 'npm'],
    githubUrl: 'https://github.com/santistebanc/multikey',
  },
  {
    title: 'MiniTanks',
    body: 'Tank game built at university, now playable in the browser via Ruffle. Survive enemy waves, collect crates and use cover.',
    tech: ['ActionScript 3', 'Ruffle'],
    liveUrl: 'https://santistebanc.github.io/miniTanks/',
    liveLabel: 'Play',
    githubUrl: 'https://github.com/santistebanc/minitanks',
  },
  {
    title: 'Minigames',
    body: 'Mobile arcade built with Phaser.js. Each run drops you into rotating 10 second challenges: survive, react, score.',
    tech: ['Phaser.js', 'JavaScript'],
    liveUrl: 'https://santistebanc.github.io/minigames/',
    liveLabel: 'Play',
    githubUrl: 'https://github.com/santistebanc/minigames',
  },
  {
    title: 'Super Kart Racing',
    body: 'Timed kart racing against AI driven opponents. Choose laps, tune acceleration, speed and steering, and chase the leaderboard.',
    tech: ['Unity', 'C#'],
    githubUrl: 'https://github.com/santistebanc/supercar',
  },
]

export const aiPhases = [
  {
    phase: 'Understand',
    steps: [
      {
        icon: 'ph-magnifying-glass',
        title: 'Research',
        body: 'Explore the problem space, tool choices, frameworks and architecture risks before committing to a direction.',
      },
      {
        icon: 'ph-list-checks',
        title: 'Decide',
        body: 'Use structured grilling sessions to pin down behavior, scope, architecture and tradeoffs.',
      },
    ],
  },
  {
    phase: 'Build',
    steps: [
      {
        icon: 'ph-cursor-click',
        title: 'Prototype',
        body: 'Generate small interactive prototypes to test direction and uncover missing product details.',
      },
      {
        icon: 'ph-stack-simple',
        title: 'Build in slices',
        body: 'Implement vertical slices, often test driven, so each one can be reviewed, tested and steered.',
      },
    ],
  },
  {
    phase: 'Ship',
    steps: [
      {
        icon: 'ph-seal-check',
        title: 'Review and verify',
        body: 'Inspect UX, architecture, code quality, correctness, types, edge cases and product fit.',
      },
      {
        icon: 'ph-rocket-launch',
        title: 'Ship and maintain',
        body: 'Use AI support for deployment, CI, hosting, monitoring, analytics and maintenance.',
      },
    ],
  },
]

export const experience = [
  {
    company: 'Independent product development',
    role: 'Frontend focused web apps, UX and AI assisted workflows',
    period: 'Apr 2025 → now',
    place: 'Berlin',
  },
  {
    company: 'Lingoda',
    role: 'Software Engineer · student learning and practice flows',
    period: 'Jun 2021 → Mar 2025',
    place: 'Berlin',
  },
  {
    company: 'Quandoo',
    role: 'Software Engineer · consumer booking, SEO and performance',
    period: 'Sep 2017 → Jan 2021',
    place: 'Berlin',
  },
  {
    company: 'Market Logic Software',
    role: 'Web Developer · data visualization UIs with React and D3.js',
    period: 'Mar 2016 → Jul 2016',
    place: 'Berlin',
  },
  {
    company: 'AISA',
    role: 'Software Developer · document management systems in C#, WPF and SQL',
    period: 'Apr 2015 → Jun 2015',
    place: 'Mexico',
  },
]

export const skills = [
  {
    title: 'Product UI engineering',
    tags: ['JavaScript', 'TypeScript', 'React', 'UI architecture', 'Forms', 'Design systems', 'CSS', 'Redux Toolkit', 'TanStack Query', 'Apollo Client', 'SSR'],
  },
  {
    title: 'Full stack product delivery',
    tags: ['Node.js', 'REST APIs', 'GraphQL', 'PostgreSQL', 'WebSockets', 'PWA'],
  },
  {
    title: 'AI assisted development',
    tags: ['AI SDKs', 'AI workflows', 'Agent skills', 'MCPs', 'LLM APIs', 'Prototyping'],
  },
  {
    title: 'Quality and release',
    tags: ['Playwright', 'Debugging', 'Code review', 'GitHub Actions', 'Docker', 'CI/CD'],
  },
]

export const faqs = [
  {
    q: 'What roles are you looking for?',
    a: 'Frontend, React, TypeScript and product engineering roles, plus frontend focused full stack roles, on user facing SaaS and product web apps. I’m open to full time roles and to good freelance work.',
  },
  {
    q: 'Where are you based, and do you work remotely?',
    a: 'I live in Berlin. I’m open to remote or hybrid roles in Germany or anywhere in the EU.',
  },
  {
    q: 'Do you need visa sponsorship?',
    a: 'No. I hold full EU citizenship, so there is no sponsorship or relocation paperwork.',
  },
  {
    q: 'When can you start?',
    a: 'I’m available immediately.',
  },
  {
    q: 'Which languages do you work in?',
    a: 'English is my working language. Spanish is my native language, and my German is intermediate.',
  },
  {
    q: 'Are you a frontend or a full stack engineer?',
    a: 'Frontend is my strongest area: React, TypeScript, component architecture, state and product UI. I’m comfortable going full stack with Node.js, APIs, data and deployment when the feature needs it.',
  },
  {
    q: 'How much of your independent work is written by AI?',
    a: 'The ideas, product direction, architecture, UX expectations, integration and review are mine. AI speeds up implementation, polish, debugging and refactoring, and I still read, understand and own every change.',
  },
  {
    q: 'What have you been doing since Lingoda?',
    a: 'Since April 2025 I’ve built independent React and TypeScript apps such as OV Berlin, Flyscan, RankZap and SnapQuiz, and explored modern deployment patterns and AI assisted workflows. They are not commercial products, but they kept me hands on. I’m now ready to rejoin a product team.',
  },
  {
    q: 'Can I see your code?',
    a: 'Yes. Every independent project on this page links to its source on GitHub. Production code belongs to my former employers, and I’m happy to walk through that work in an interview.',
  },
  {
    q: 'Which CV should I download?',
    a: 'They share the same history and differ in emphasis. Pick the one closest to the role you’re hiring for, or the software engineer CV if you’re unsure.',
  },
]

export const cvs = [
  { label: 'Software engineer', note: 'General · recommended', href: '/software-engineer/Carlos_Santisteban_CV.pdf' },
  { label: 'Frontend engineer', note: 'UI systems and product features', href: '/frontend-engineer/Carlos_Santisteban_CV.pdf' },
  { label: 'React engineer', note: 'Components, state and API driven UI', href: '/react-engineer/Carlos_Santisteban_CV.pdf' },
  { label: 'Full stack engineer', note: 'Node.js, APIs and realtime', href: '/full-stack-engineer/Carlos_Santisteban_CV.pdf' },
  { label: 'AI assisted product engineer', note: 'AI workflows and AI enabled apps', href: '/ai-assisted-product-engineer/Carlos_Santisteban_CV.pdf' },
  { label: 'Softwareentwickler', note: 'Deutsch', href: '/software-engineer/Carlos_Santisteban_CV_DE.pdf', lang: 'de' },
]
