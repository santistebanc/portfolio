import React from 'react';
import { Document, Page, Text, View, StyleSheet, Svg, Path, Circle, Link } from '@react-pdf/renderer';

const palette = {
  text: '#20242f',
  muted: '#5f6675',
  accent: '#2563eb',
  accentSoft: '#eef4ff',
  border: '#d8dde8',
  paper: '#ffffff',
};

const styles = StyleSheet.create({
  page: { padding: '24 28', fontFamily: 'Helvetica', fontSize: 9.4, lineHeight: 1.34, color: palette.text, backgroundColor: palette.paper },
  header: { paddingBottom: 4, marginBottom: 5, borderBottom: `1 solid ${palette.border}` },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 18 },
  name: { fontSize: 23, fontWeight: 700, lineHeight: 1.0, marginBottom: 7 },
  headline: { fontSize: 12, fontWeight: 700, color: palette.accent, lineHeight: 1.15, marginBottom: 3 },
  subtitle: { fontSize: 9.3, color: palette.muted, lineHeight: 1.22 },
  contact: { alignItems: 'flex-end', marginTop: 2 },
  contactRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  portfolioRow: { flexDirection: 'row', alignItems: 'center', height: 20, marginBottom: 7, padding: '0 6', backgroundColor: palette.accentSoft, borderRadius: 4 },
  portfolioLabel: { fontSize: 8.3, lineHeight: 1, color: palette.muted, marginRight: 4 },
  portfolioLink: { fontSize: 10.2, lineHeight: 1, fontWeight: 700, color: palette.accent, textDecoration: 'none' },
  contactText: { fontSize: 8.7, color: palette.muted },
  contactLink: { fontSize: 8.7, color: palette.accent, textDecoration: 'none' },
  section: { marginTop: 6 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', paddingBottom: 2, marginBottom: 4, borderBottom: `1 solid ${palette.border}` },
  sectionIconWrap: { width: 14, height: 14, marginRight: 6, borderRadius: 3, backgroundColor: palette.accentSoft, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontSize: 10, fontWeight: 700, color: palette.text, textTransform: 'uppercase', letterSpacing: 0.7 },
  summary: { fontSize: 9.6, lineHeight: 1.4, padding: '6 8', backgroundColor: palette.accentSoft, borderLeft: `3 solid ${palette.accent}` },
  job: { marginBottom: 5 },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 2 },
  company: { fontSize: 10.5, fontWeight: 700, color: palette.text },
  role: { fontSize: 9.3, color: palette.muted, marginBottom: 2 },
  meta: { fontSize: 8.6, color: palette.muted },
  paragraph: { fontSize: 9.2, color: palette.text, lineHeight: 1.34 },
  compactBlock: { marginBottom: 7, paddingBottom: 6, borderBottom: `1 solid ${palette.border}` },
  skillRow: { marginBottom: 4 },
  skillLabel: { fontSize: 9, fontWeight: 700, color: palette.text },
  skillText: { fontSize: 9, color: palette.muted, lineHeight: 1.32 },
  listItem: { fontSize: 9.5, lineHeight: 1.42, color: palette.text, marginBottom: 3 },
  roomyHeader: { paddingBottom: 7, marginBottom: 8 },
  roomySection: { marginTop: 10 },
  roomySectionHeading: { paddingBottom: 3, marginBottom: 6 },
  roomySummary: { fontSize: 9.8, lineHeight: 1.5, padding: '8 9' },
  roomySkillRow: { marginBottom: 6 },
  roomySkillText: { fontSize: 9.2, lineHeight: 1.42 },
  roomyJob: { marginBottom: 9 },
  roomyJobHeader: { marginBottom: 3 },
  roomyRole: { marginBottom: 3 },
  roomyParagraph: { fontSize: 9.35, lineHeight: 1.45 },
});

export type CVVariantKey = 'software' | 'softwareDe' | 'frontend' | 'react' | 'fullstack' | 'ai' | 'almedia' | 'baobab' | 'kelea' | 'stablewatch';

type Job = {
  company: string;
  role: string;
  meta: string;
  body: string;
};

type Project = {
  title: string;
  meta: string;
  body: string;
};

type CVVariant = {
  label: string;
  filename: string;
  headline: string;
  subtitle: string;
  summary: string;
  jobs: Job[];
  projects?: Project[];
  skillGroups: [string, string][];
  strengthsTitle: string;
  strengths: string[];
  sectionTitles?: {
    summary: string;
    technicalSkills: string;
    experience: string;
    projects: string;
    education: string;
  };
  portfolioLabel?: string;
  contactLocation?: string;
  educationTitle?: string;
  educationMeta?: string;
  educationDetails?: string;
};

const jobs = [
  {
    company: 'Independent Web Development',
    role: 'Web apps, UX, and AI-assisted delivery workflows',
    meta: 'Berlin | Apr 2025 - Present',
    body: 'Designed and built independent React/TypeScript web applications across polished UI, search/filter and comparison flows, realtime interactions, PWA/offline behavior, data pipelines, deployment automation, debugging, and iteration. Applied modern web tooling, full-stack delivery patterns, and AI-assisted development workflows while owning architecture decisions, product direction, and final behavior.',
  },
  {
    company: 'Lingoda',
    role: 'Software Engineer - Language learning platform',
    meta: 'Berlin | Jun 2021 - Mar 2025',
    body: 'Built user-facing features for a live online language learning platform. Had major frontend ownership of Lingobites student-facing exercise flows, including interactive UI, multiple exercise types, routing, animations, state handling, progress tracking, gamification, and flashcard integration. Helped replace a constrained third-party quiz system with an in-house solution, working with React, Apollo/GraphQL, Material UI, product, design, backend, QA, bug fixing, and release iteration.',
  },
  {
    company: 'Quandoo',
    role: 'Software Engineer - Restaurant reservation platform',
    meta: 'Berlin | Sep 2017 - Jan 2021',
    body: 'Built and improved the consumer restaurant booking site across search, discovery, reservation, promotional, SEO, and performance surfaces. Led investigation and planning for a major React Router migration, mapping dependencies, comparing options, documenting tradeoffs, and helping preserve custom SSR and styled-components behavior while unblocking React/library upgrades. Also worked on metadata, canonicals, internal linking, indexability, availability filters, and time-to-first-paint/time-to-interactive improvements.',
  },
  {
    company: 'Market Logic Software',
    role: 'Web Developer - Data visualization UIs',
    meta: 'Berlin | Mar 2016 - Jul 2016',
    body: 'Built data-heavy UI components, interactive graphs, and dynamic widgets with React and D3.js for an enterprise market intelligence platform. Worked on interfaces that translated research and insight data into usable visual product surfaces.',
  },
  {
    company: 'AISA',
    role: 'Software Developer - Government document systems',
    meta: 'Mexico | Apr 2015 - Jun 2015',
    body: 'Built UI forms and controls for legal document management systems using C#, WPF, and SQL databases. Contributed to internal software for capturing, validating, and managing structured document data in government workflows.',
  },
];

const recentJobs = jobs.filter((job) => job.company !== 'AISA');

const spanishRecentJobs: Job[] = [
  {
    company: 'Desarrollo independiente de aplicaciones web',
    role: 'Aplicaciones web, UX y flujos de desarrollo asistidos por IA',
    meta: 'Berlín | abr 2025 - presente',
    body: 'Diseñé y desarrollé aplicaciones web independientes con React y TypeScript, incluyendo interfaces pulidas, búsqueda, filtros, comparación, interacciones en tiempo real, soporte PWA/offline, pipelines de datos y automatización del despliegue. Asumí la responsabilidad de la arquitectura, la dirección del producto y el resultado final.',
  },
  {
    company: 'Lingoda',
    role: 'Software Engineer - Plataforma de aprendizaje de idiomas',
    meta: 'Berlín | jun 2021 - mar 2025',
    body: 'Construí funcionalidades frontend de producción para una plataforma de aprendizaje online, incluyendo ejercicios interactivos, quizzes, flashcards, routing, animaciones, gestión de estado, seguimiento de progreso, gamificación e integración con GraphQL/Apollo. Colaboré con producto, diseño, backend y QA para reemplazar una herramienta externa limitada por una experiencia interna más flexible y pulida.',
  },
  {
    company: 'Quandoo',
    role: 'Software Engineer - Plataforma de reservas de restaurantes',
    meta: 'Berlín | sep 2017 - ene 2021',
    body: 'Mejoré la web consumer de reservas en áreas de búsqueda, discovery, reserva, promociones y rendimiento. Lideré la investigación y planificación de una migración importante de React Router, mapeando dependencias, comparando opciones, documentando tradeoffs y ayudando a preservar SSR y styled-components mientras se desbloqueaban upgrades de React y librerías.',
  },
      {
        company: 'Market Logic Software',
        role: 'Web Developer - Interfaces de visualización de datos',
        meta: 'Berlín | mar 2016 - jul 2016',
        body: 'Desarrollé componentes de UI intensivos en datos, gráficos interactivos y widgets dinámicos con React y D3.js para una plataforma enterprise de market intelligence.',
      },
];

const selectedProjects: Project[] = [
  {
    title: 'OV Berlin',
    meta: 'React, TypeScript, PWA, GitHub Actions',
    body: 'Cinema listings app for original-version screenings in Berlin, with automated data refresh, rating/trailer enrichment, offline support, maps, and fast search/filter UX.',
  },
  {
    title: 'Flyscan / RankZap / SnapQuiz',
    meta: 'React, TypeScript, Bun, PartyKit, OpenAI',
    body: 'Product prototypes covering flight comparison UX, realtime ranked voting, multiplayer quiz rooms, reusable WebSocket state, loading states, and deployment.',
  },
];

const spanishProjects: Project[] = [
  {
    title: 'OV Berlin',
    meta: 'React, TypeScript, PWA, GitHub Actions',
    body: 'App de cartelera para funciones en version original en Berlin, con actualizacion automatizada de datos, enriquecimiento con ratings/trailers, soporte offline, mapas y busqueda/filtros rapidos.',
  },
  {
    title: 'Flyscan / RankZap / SnapQuiz',
    meta: 'React, TypeScript, Bun, PartyKit, OpenAI',
    body: 'Prototipos de producto con comparacion de vuelos, ranked voting realtime, salas multiplayer de quiz, estado WebSocket reutilizable, estados de carga y despliegue.',
  },
];

export const cvVariants: Record<CVVariantKey, CVVariant> = {
  software: {
    label: 'Software Engineer',
    filename: 'software-engineer/Carlos_Santisteban_CV.pdf',
    headline: 'Software Engineer',
    subtitle: 'User-facing web applications, maintainable systems, and AI-assisted development',
    summary:
      'Software engineer with 8+ years of experience building user-facing web applications, reusable UI components, interactive workflows, and production features. Strong in React, TypeScript, JavaScript, and modern web development, with practical full-stack experience across APIs, data, deployment, and iteration. Works well with product, design, backend, QA, and cross-functional teams.',
    jobs,
    skillGroups: [
      ['Frontend & Architecture', 'React, TypeScript, JavaScript, component architecture, Redux Toolkit, React Context, TanStack Query, Zustand, Apollo Client, complex product workflows, responsive UI, SSR, routing, monorepos, Material UI, styled-components'],
      ['Data & Product Delivery', 'GraphQL, REST APIs, Node.js, PostgreSQL, WebSockets, browser APIs, PWA/offline support, performance, technical SEO, Docker, GitHub Actions, CI/CD'],
      ['Quality & Engineering Practices', 'Unit, component, and end-to-end testing, debugging, code review, technical planning, mentoring, cross-functional collaboration, AI-assisted development'],
    ],
    strengthsTitle: 'Engineering Strengths',
    strengths: [
      'Building maintainable JavaScript/TypeScript applications with clear UI architecture and pragmatic full-stack ownership.',
      'Turning ambiguous requirements into shippable software across frontend, APIs, data, deployment, and iteration.',
      'Debugging production-facing features, reviewing code, refactoring, and collaborating closely with product, design, backend, and QA.',
    ],
  },
  softwareDe: {
    label: 'Software Engineer Deutsch',
    filename: 'software-engineer/Carlos_Santisteban_CV_DE.pdf',
    headline: 'Softwareentwickler',
    subtitle: 'User-facing Webanwendungen, wartbare Systeme und KI-gestuetzte Entwicklung',
    summary:
      'Softwareentwickler mit mehr als 8 Jahren Erfahrung im Aufbau nutzerorientierter Webanwendungen, wiederverwendbarer UI-Komponenten, interaktiver Workflows und produktiver Features. Stark in React, TypeScript, JavaScript und moderner Webentwicklung, mit praktischer Full-Stack-Erfahrung in APIs, Daten, Deployment und Iteration. Erfahren in der Zusammenarbeit mit Produkt, Design, Backend, QA und funktionsuebergreifenden Teams.',
    jobs: [
      {
        company: 'Unabhaengige Webentwicklung',
        role: 'Webanwendungen, UX und KI-gestuetzte Entwicklungsablaeufe',
        meta: 'Berlin | Apr. 2025 - heute',
        body: 'Konzeption und Entwicklung unabhaengiger React/TypeScript-Webanwendungen mit ausgearbeiteten Benutzeroberflaechen, Such-, Filter- und Vergleichsablaeufen, Echtzeitinteraktionen, PWA/Offline-Verhalten, Datenpipelines und Deployment-Automatisierung. Verantwortung fuer Architekturentscheidungen, Produktrichtung und finales Verhalten.',
      },
      {
        company: 'Lingoda',
        role: 'Softwareentwickler - Sprachlernplattform',
        meta: 'Berlin | Juni 2021 - Maerz 2025',
        body: 'Entwicklung nutzerorientierter Features fuer eine Live-Online-Sprachlernplattform. Wesentliche Frontend-Verantwortung fuer Lingobites-Uebungsablaeufe, inklusive interaktiver UI, mehrerer Uebungstypen, Routing, Animationen, State Handling, Fortschrittstracking, Gamification und Flashcard-Integration. Mitwirkung beim Ersatz eines eingeschraenkten externen Quizsystems durch eine interne Loesung mit React, Apollo/GraphQL, Material UI, Produkt, Design, Backend, QA und Release-Iteration.',
      },
      {
        company: 'Quandoo',
        role: 'Softwareentwickler - Restaurant-Reservierungsplattform',
        meta: 'Berlin | Sep. 2017 - Jan. 2021',
        body: 'Aufbau und Verbesserung der Consumer-Restaurantbuchungsseite ueber Suche, Discovery, Reservierung, Promotions, SEO und Performance hinweg. Leitung der Untersuchung und Planung einer groesseren React-Router-Migration mit Abhaengigkeitsanalyse, Optionsvergleich, dokumentierten Tradeoffs und Erhalt von individuellem SSR- sowie styled-components-Verhalten. Arbeit an Metadaten, Canonicals, interner Verlinkung, Indexierbarkeit, Verfuegbarkeitsfiltern und Performance.',
      },
      {
        company: 'Market Logic Software',
        role: 'Webentwickler - Datenvisualisierungs-UIs',
        meta: 'Berlin | Maerz 2016 - Juli 2016',
        body: 'Entwicklung datenintensiver UI-Komponenten, interaktiver Diagramme und dynamischer Widgets mit React und D3.js fuer eine Enterprise-Plattform fuer Market Intelligence.',
      },
      {
        company: 'AISA',
        role: 'Softwareentwickler - Behoerdliche Dokumentensysteme',
        meta: 'Mexiko | Apr. 2015 - Juni 2015',
        body: 'Entwicklung von UI-Formularen und Steuerelementen fuer juristische Dokumentenmanagementsysteme mit C#, WPF und SQL-Datenbanken. Mitarbeit an interner Software zur Erfassung, Validierung und Verwaltung strukturierter Dokumentdaten in behoerdlichen Arbeitsablaeufen.',
      },
    ],
    skillGroups: [
      ['Frontend & Architektur', 'React, TypeScript, JavaScript, Komponentenarchitektur, Redux Toolkit, React Context, TanStack Query, Zustand, Apollo Client, komplexe Produkt-Workflows, responsive UI, SSR, Routing, Monorepos, Material UI, styled-components'],
      ['Daten & Produktentwicklung', 'GraphQL, REST APIs, Node.js, PostgreSQL, WebSockets, Browser-APIs, PWA/Offline-Support, Performance, technisches SEO, Docker, GitHub Actions, CI/CD'],
      ['Qualitaet & Entwicklungspraxis', 'Unit-, Komponenten- und End-to-End-Tests, Debugging, Code Review, technische Planung, Mentoring, funktionsuebergreifende Zusammenarbeit, KI-gestuetzte Entwicklung'],
    ],
    strengthsTitle: 'Staerken als Entwickler',
    strengths: [
      'Aufbau wartbarer JavaScript/TypeScript-Anwendungen mit klarer UI-Architektur und pragmatischer Full-Stack-Verantwortung.',
      'Uebersetzung unklarer Anforderungen in auslieferbare Software ueber Frontend, APIs, Daten, Deployment und Iteration hinweg.',
      'Debugging produktionsnaher Features, Code Review, Refactoring und enge Zusammenarbeit mit Produkt, Design, Backend und QA.',
    ],
    sectionTitles: {
      summary: 'Profil',
      technicalSkills: 'Technische Kompetenzen',
      experience: 'Berufserfahrung',
      projects: 'Ausgewaehlte Projekte',
      education: 'Ausbildung',
    },
    portfolioLabel: 'Portfolio:',
    contactLocation: 'Berlin, Deutschland | mexikanischer & spanischer EU-Buerger',
    educationTitle: 'Bachelor in IT Engineering - Tecnologico de Monterrey, Mexiko',
    educationMeta: 'Aug. 2012 - Mai 2017',
    educationDetails:
      'Studieninhalte: objektorientierte Programmierung, Datenstrukturen, Datenbanken, Netzwerke, Server, Betriebssysteme, IT-Sicherheit und Cloud Computing. DAAD-Austauschsemester in Informatik an der Hochschule Furtwangen, Deutschland.',
  },
  frontend: {
    label: 'Frontend Engineer',
    filename: 'frontend-engineer/Carlos_Santisteban_CV.pdf',
    headline: 'Frontend Engineer',
    subtitle: 'React, TypeScript, UI systems and workflows, and polished user-facing features',
    summary:
      'Frontend engineer with 8+ years of experience building user-facing web applications, reusable React components, responsive interfaces, state management, API design, efficient caching, performance optimizations, interactive widgets, and polished product UX. Strong in React, TypeScript, UI libraries, REST/GraphQL integration, and modern web UI.',
    jobs,
    skillGroups: [
      ['Frontend & Architecture', 'React, TypeScript, JavaScript, component architecture, Redux Toolkit, React Context, TanStack Query, Zustand, Apollo Client, complex product workflows, responsive UI, SSR, routing, monorepos, Material UI, styled-components'],
      ['Data & Product Delivery', 'GraphQL, REST APIs, Node.js, PostgreSQL, WebSockets, browser APIs, PWA/offline support, performance, technical SEO, Docker, GitHub Actions, CI/CD'],
      ['Quality & Engineering Practices', 'Unit, component, and end-to-end testing, debugging, code review, technical planning, mentoring, cross-functional collaboration, AI-assisted development'],
    ],
    strengthsTitle: 'Frontend Strengths',
    strengths: [
      'Building polished user-facing interfaces with maintainable React/TypeScript code and clear component boundaries.',
      'Designing forms, onboarding flows, quizzes, responsive interfaces, and interactive components with stable behavior.',
      'Integrating frontend surfaces with APIs, GraphQL/Apollo state, loading states, validation, and error handling.',
      'Collaborating with product, design, and backend teams to turn user flows into production-ready UI, using AI-assisted workflows for research, prototyping, debugging, and review.',
    ],
  },
  react: {
    label: 'React Engineer',
    filename: 'react-engineer/Carlos_Santisteban_CV.pdf',
    headline: 'React Engineer',
    subtitle: 'React, TypeScript, component architecture, product UI, and API-driven web apps',
    summary:
      'React engineer with 8+ years of experience building user-facing web applications, reusable components, product workflows, forms, search/filter experiences, interactive exercises, and API-driven interfaces. Strongest in React, TypeScript, JavaScript, component architecture, state management, GraphQL/Apollo integration, and polished frontend delivery. Comfortable in existing production codebases with product, design, backend, QA, code reviews, testing, debugging, and iterative releases.',
    jobs: recentJobs.map((job) =>
      job.company === 'Lingoda'
          ? {
              ...job,
              body: 'Built production React/TypeScript features for a live online language learning platform. Had major frontend ownership of Lingobites student-facing exercise flows, including reusable UI components, multiple exercise types, routing, animations, state handling, progress tracking, gamification, flashcard integration, and GraphQL/Apollo data integration. Worked with product, design, backend, QA, bug fixing, and release iteration.',
            }
          : job.company === 'Quandoo'
            ? {
                ...job,
                body: 'Built and improved a React-based consumer restaurant booking site across search, discovery, reservation, promotional, SEO, and performance surfaces. Led investigation and planning for a major React Router migration, mapping dependencies, comparing options, documenting tradeoffs, and helping preserve custom SSR and styled-components behavior while unblocking React/library upgrades.',
              }
            : job
    ),
    skillGroups: [
      ['Frontend & Architecture', 'React, TypeScript, JavaScript, component architecture, Redux Toolkit, React Context, TanStack Query, Zustand, Apollo Client, complex product workflows, responsive UI, SSR, routing, monorepos, Material UI, styled-components'],
      ['Data & Product Delivery', 'GraphQL, REST APIs, Node.js, PostgreSQL, WebSockets, browser APIs, PWA/offline support, performance, technical SEO, Docker, GitHub Actions, CI/CD'],
      ['Quality & Engineering Practices', 'Unit, component, and end-to-end testing, debugging, code review, technical planning, mentoring, cross-functional collaboration, AI-assisted development'],
    ],
    strengthsTitle: 'React Strengths',
    strengths: [
      'Building maintainable React/TypeScript interfaces with clear component boundaries, predictable state, and practical API integration.',
      'Turning product flows into polished UI across forms, search/filter experiences, learning flows, loading states, validation, and errors.',
      'Working effectively in larger production codebases: debugging, refactoring, reviewing code, preserving existing behavior, and shipping iterative improvements.',
      'Collaborating closely with product, design, backend, and QA while using AI-assisted workflows as a productivity tool without giving up engineering ownership.',
    ],
    educationDetails:
      'Coursework included programming, data structures, databases, networks, operating systems, IT security, and cloud computing. DAAD exchange semester in Informatics at Hochschule Furtwangen, Germany.',
  },
  fullstack: {
    label: 'Full-Stack Engineer',
    filename: 'full-stack-engineer/Carlos_Santisteban_CV.pdf',
    headline: 'Full-Stack Engineer',
    subtitle: 'React, TypeScript, Node.js, APIs, realtime features, and shipped web apps',
    summary:
      'Full-stack product engineer with 8+ years of experience building user-facing web applications and practical end-to-end product slices. Strongest in React, TypeScript, JavaScript, and modern frontend development, with hands-on experience across Node.js, REST/GraphQL APIs, PostgreSQL, WebSockets, scraping/enrichment pipelines, PWA/offline behavior, deployment, debugging, and iteration. Experienced with product, design, and backend collaboration in production environments.',
    jobs,
    skillGroups: [
      ['Frontend & Architecture', 'React, TypeScript, JavaScript, component architecture, Redux Toolkit, React Context, TanStack Query, Zustand, Apollo Client, complex product workflows, responsive UI, SSR, routing, monorepos, Material UI, styled-components'],
      ['Data & Product Delivery', 'GraphQL, REST APIs, Node.js, PostgreSQL, WebSockets, browser APIs, PWA/offline support, performance, technical SEO, Docker, GitHub Actions, CI/CD'],
      ['Quality & Engineering Practices', 'Unit, component, and end-to-end testing, debugging, code review, technical planning, mentoring, cross-functional collaboration, AI-assisted development'],
    ],
    strengthsTitle: 'Full-Stack Strengths',
    strengths: [
      'Owning end-to-end feature slices across frontend, APIs, data, deployment, and iteration.',
      'Building user-facing React/TypeScript interfaces backed by practical API, database, and realtime implementation work.',
      'Shipping project applications with search, comparison, PWA/offline behavior, WebSockets, validation, and deployment work.',
      'Debugging across the stack, making pragmatic technical tradeoffs, and collaborating with product, design, backend, and cross-functional teams.',
    ],
  },
  ai: {
    label: 'AI-Assisted Product Engineer',
    filename: 'ai-assisted-product-engineer/Carlos_Santisteban_CV.pdf',
    headline: 'Frontend / Product Engineer',
    subtitle: 'React, TypeScript, practical AI-assisted workflows, and AI-enabled web apps',
    summary:
      'Frontend/product engineer with 8+ years of experience building user-facing web applications, strongest in React, TypeScript, JavaScript, product UI, and large production codebases. Uses practical AI-assisted workflows for prototyping, debugging, architecture exploration, implementation, refactoring, and product polish. Has built selected web apps and practical AI-enabled features while keeping ownership of product direction, architecture choices, review, deployment, and final behavior.',
    jobs: recentJobs.map((job) =>
      job.company === 'Lingoda'
        ? {
            ...job,
            body: 'Built production frontend features for Lingoda, including practice exercises, quizzes, flashcards, and student-facing flows. Contributed to Lingobites, an interactive practice feature with AI-generated exercise content and human-in-the-loop quality review. Built the student-facing exercise UI, session flow, state management, progress tracking, gamification behavior, and integration of existing flashcards.',
          }
        : job
    ),
    skillGroups: [
      ['Frontend & Architecture', 'React, TypeScript, JavaScript, component architecture, Redux Toolkit, React Context, TanStack Query, Zustand, Apollo Client, complex product workflows, responsive UI, SSR, routing, monorepos, Material UI, styled-components'],
      ['Data & Product Delivery', 'GraphQL, REST APIs, Node.js, PostgreSQL, WebSockets, browser APIs, PWA/offline support, performance, technical SEO, Docker, GitHub Actions, CI/CD'],
      ['Quality & Engineering Practices', 'Unit, component, and end-to-end testing, debugging, code review, technical planning, mentoring, cross-functional collaboration, AI-assisted development'],
    ],
    strengthsTitle: 'AI-Assisted Product Strengths',
    strengths: [
      'Using AI as a productivity accelerator while retaining engineering judgment, code review, and product ownership.',
      'Combining production frontend experience with rapid prototyping, architecture exploration, and full-stack delivery.',
      'Building practical AI-enabled product flows without presenting as an ML researcher.',
      'Turning product ideas into deployed React/TypeScript applications with clear UX, maintainable behavior, and final responsibility for shipped code.',
    ],
  },
  almedia: {
    label: 'React TypeScript Frontend Engineer',
    filename: 'almedia-junior-frontend-engineer/Carlos_Santisteban_CV.pdf',
    headline: 'Frontend Engineer - React, TypeScript, Product UI',
    subtitle: 'Berlin-based frontend engineer for React/TypeScript product teams',
    summary:
      'Frontend-focused engineer based in Berlin with deep React/TypeScript experience building user-facing product flows, polished UI, search/filter interfaces, interactive exercises, and production features. I learn quickly, experiment with new tools and product ideas, and use AI-assisted development workflows to move faster while keeping care for clean, tested product work.',
    jobs: recentJobs.map((job) =>
      job.company === 'Lingoda'
          ? {
              ...job,
              body: 'Built production frontend features for a live online language learning platform, including student practice flows, quizzes, flashcards, routing, animations, state handling, progress tracking, gamification, and GraphQL/Apollo integration. Worked closely with product, design, backend, and QA to replace constrained third-party quiz tooling with a polished in-house learning experience.',
            }
          : job.company === 'Quandoo'
            ? {
                ...job,
                body: 'Improved a consumer restaurant booking site across search, discovery, reservation, promotional, and performance surfaces. Worked on availability filters, metadata, internal linking, indexability, performance improvements, and a major React Router migration plan that preserved SSR and styled-components behavior while unblocking frontend upgrades.',
              }
            : job
    ),
    skillGroups: [
      ['Frontend & Architecture', 'React, TypeScript, JavaScript, component architecture, Redux Toolkit, React Context, TanStack Query, Zustand, Apollo Client, complex product workflows, responsive UI, SSR, routing, monorepos, Material UI, styled-components'],
      ['Data & Product Delivery', 'GraphQL, REST APIs, Node.js, PostgreSQL, WebSockets, browser APIs, PWA/offline support, performance, technical SEO, Docker, GitHub Actions, CI/CD'],
      ['Quality & Engineering Practices', 'Unit, component, and end-to-end testing, debugging, code review, technical planning, mentoring, cross-functional collaboration, AI-assisted development'],
    ],
    strengthsTitle: 'Frontend Fit',
    strengths: [
      'Strong match for React/TypeScript frontend product work, with real production experience in user-facing flows and selected shipped apps.',
      'Comfortable in cross-functional product teams, translating design and product intent into maintainable UI with API integration, loading states, validation, and iteration.',
      'Excited by a high-pace, high-ownership environment and intentionally open to a hands-on role with mentorship, feedback, and fast learning.',
      'Uses AI-assisted development workflows as a practical everyday toolkit while keeping responsibility for code quality and final behavior.',
    ],
  },
  stablewatch: {
    label: 'StableWatch Frontend Engineer',
    filename: 'stablewatch-frontend-engineer/Carlos_Santisteban_CV.pdf',
    headline: 'Frontend Engineer - React, TypeScript, Data UI',
    subtitle: 'Interfaces for data-heavy products and everyday user workflows',
    summary:
      'Frontend engineer based in Berlin, focused on React and TypeScript applications. I turn complex requirements and API data into interfaces that are easy to understand and use. My work covers component design, SSR, browser performance, testing, and release, in close collaboration with product, design, and backend teams.',
    jobs: recentJobs.map((job) =>
      job.company === 'Independent Web Development'
        ? {
            ...job,
            role: 'Independent frontend applications',
            body: 'Built and deployed React and TypeScript applications with responsive interfaces, search and filtering, comparison views, data visualizations, realtime interactions, and PWA/offline support. The work spans REST APIs, WebSockets, browser APIs, data ingestion and normalization, automated refresh pipelines, and CI/CD. Used modern component and styling tools alongside GitHub Actions, Cloudflare, and Vercel for delivery.',
          }
        : job.company === 'Lingoda'
          ? {
              ...job,
              body: 'Worked on the student-facing React application for a live online learning platform. For Lingobites, I built exercise types, quizzes, flashcards, session routing, progress tracking, and gamification. I connected these flows to GraphQL through Apollo and worked with product, design, backend, and QA as the feature changed through testing and release.',
            }
          : job.company === 'Quandoo'
            ? {
                ...job,
                body: 'Worked on Quandoo\'s React booking site, from restaurant discovery and availability filters to reservation and campaign pages. I improved page performance and technical SEO, and built reusable promotional components. I also mapped the application\'s routing dependencies and helped migrate React Router without breaking its custom SSR and styled-components setup.',
              }
            : job.company === 'Market Logic Software'
              ? {
                  ...job,
                  body: 'Built React components and D3.js charts for an enterprise market intelligence product. The interfaces turned research data into graphs and interactive widgets that users could explore.',
                }
            : job
    ),
    skillGroups: [
      ['Frontend & UI', 'React, Next.js, TypeScript, JavaScript, Tailwind CSS, shadcn/ui, Material UI, styled-components, responsive UI, component architecture, design systems'],
      ['Data & Performance', 'D3.js, GraphQL, Apollo Client, REST APIs, SSR, lazy loading, routing, state management, browser APIs, performance optimization, technical SEO'],
      ['Delivery & Quality', 'Node.js, PostgreSQL, WebSockets, Cloudflare, Vercel, GitHub Actions, CI/CD, unit and end-to-end testing, debugging, code review, cross-functional collaboration'],
    ],
    strengthsTitle: 'Frontend Fit',
    strengths: [
      'Makes complex product data easier to explore through clear, responsive interfaces.',
      'Builds reusable React components with consistent styling and predictable state.',
      'Works across SSR, loading behavior, browser performance, testing, and CI/CD.',
      'Keeps product, design, and backend teammates involved as features move toward release.',
    ],
    educationDetails:
      'Studied programming, data structures, databases, networks, operating systems, IT security, and cloud computing. Completed a DAAD exchange semester in Informatics at Hochschule Furtwangen, Germany.',
  },
  baobab: {
    label: 'TypeScript Full-Stack Engineer',
    filename: 'baobab-jr-full-stack-engineer/Carlos_Santisteban_CV.pdf',
    headline: 'Full-Stack Engineer - TypeScript, React, Node.js',
    subtitle: 'Berlin-based engineer using AI-assisted workflows to ship product features',
    summary:
      'Frontend-focused full-stack engineer based in Berlin with strong React, TypeScript, JavaScript, and practical Node.js experience. I enjoy turning product requirements into working software and use AI-assisted development workflows for prototyping, implementation, debugging, refactoring, and test coverage while keeping ownership of code quality, security, performance, and final behavior.',
    jobs: jobs.map((job) =>
      job.company === 'Lingoda'
          ? {
              ...job,
              body: 'Built production frontend features for a live online learning platform, including interactive exercises, quizzes, flashcards, routing, state handling, progress tracking, gamification, GraphQL/Apollo integration, bug fixing, and release iteration. Worked closely with product, design, backend, and QA to translate changing requirements into maintainable student-facing features.',
            }
          : job.company === 'Quandoo'
            ? {
                ...job,
                body: 'Improved a consumer booking platform across search, discovery, reservation, promotional, and performance surfaces. Led investigation and planning for a major React Router migration, mapping dependencies, comparing options, documenting tradeoffs, and preserving SSR and styled-components behavior while unblocking React and library upgrades.',
              }
            : job
    ),
    skillGroups: [
      ['Frontend & Architecture', 'React, TypeScript, JavaScript, component architecture, Redux Toolkit, React Context, TanStack Query, Zustand, Apollo Client, complex product workflows, responsive UI, SSR, routing, monorepos, Material UI, styled-components'],
      ['Data & Product Delivery', 'GraphQL, REST APIs, Node.js, PostgreSQL, WebSockets, browser APIs, PWA/offline support, performance, technical SEO, Docker, GitHub Actions, CI/CD'],
      ['Quality & Engineering Practices', 'Unit, component, and end-to-end testing, debugging, code review, technical planning, mentoring, cross-functional collaboration, AI-assisted development'],
    ],
    strengthsTitle: 'Full-Stack Fit',
    strengths: [
      'Building TypeScript product features across React frontend, API integration, data flow, testing, release, and iteration.',
      'Using AI coding tools as a productivity multiplier while validating, refactoring, and testing generated code carefully.',
      'Comfortable translating product requirements and technical specs into maintainable implementation steps.',
      'Collaborating with product, design, backend, QA, and senior engineers in agile teams with open code review.',
    ],
  },
  kelea: {
    label: 'Frontend Developer Spanish',
    filename: 'kelea-frontend-developer/Carlos_Santisteban_CV.pdf',
    headline: 'Frontend Developer - React, TypeScript y UX',
    subtitle: 'Ingeniero frontend con experiencia en producto, calidad y colaboración',
    summary:
      'Frontend developer con 8+ años de experiencia construyendo aplicaciones web orientadas al usuario con React, TypeScript y JavaScript. Me enfoco en interfaces mantenibles, flujos de producto, integración de APIs, testing, code review y colaboración cercana con producto, diseño, backend y QA. Español nativo e inglés profesional.',
    jobs: spanishRecentJobs,
    projects: spanishProjects,
    skillGroups: [
      ['Frontend y Arquitectura', 'React, TypeScript, JavaScript, arquitectura de componentes, Redux Toolkit, React Context, TanStack Query, Zustand, Apollo Client, flujos de producto complejos, UI responsive, SSR, routing, monorepos, Material UI, styled-components'],
      ['Datos y Entrega de Producto', 'GraphQL, REST APIs, Node.js, PostgreSQL, WebSockets, APIs del navegador, soporte PWA/offline, rendimiento, SEO técnico, Docker, GitHub Actions, CI/CD'],
      ['Calidad y Prácticas de Ingeniería', 'Pruebas unitarias, de componentes y end-to-end, debugging, code review, planificación técnica, mentoría, colaboración multifuncional, desarrollo asistido por IA'],
    ],
    strengthsTitle: 'Encaje Frontend',
    strengths: [
      'Experiencia sólida en React/TypeScript para construir interfaces de producto mantenibles y cuidadas.',
      'Práctica habitual con testing, code review, pull requests, debugging y entrega en equipos ágiles.',
      'Colaboración cercana con producto, diseño, backend y QA para convertir requisitos en software útil y estable.',
      'Perfil bilingüe español/inglés, cómodo en entornos remotos y multiculturales.',
    ],
    sectionTitles: {
      summary: 'Perfil',
      technicalSkills: 'Competencias Técnicas',
      experience: 'Experiencia',
      projects: 'Proyectos Seleccionados',
      education: 'Educación',
    },
    portfolioLabel: 'Portfolio:',
    contactLocation: 'Berlín, Alemania | Ciudadanía mexicana y española UE',
    educationTitle: 'Bachelor of Engineering (B.E.), Information Technology - Tecnológico de Monterrey, México',
    educationMeta: 'ago 2012 - may 2017',
    educationDetails:
      '',
  },
};

const sectionIcons: Record<string, string> = {
  Summary: 'M4 5h16v2H4V5Zm0 5h16v2H4v-2Zm0 5h10v2H4v-2Z',
  Perfil: 'M4 5h16v2H4V5Zm0 5h16v2H4v-2Zm0 5h10v2H4v-2Z',
  Experience: 'M9 5h6l1 2h4v12H4V7h4l1-2Zm1.2 2-.5 1h4.6l-.5-1h-3.6ZM6 10v7h12v-7H6Z',
  Experiencia: 'M9 5h6l1 2h4v12H4V7h4l1-2Zm1.2 2-.5 1h4.6l-.5-1h-3.6ZM6 10v7h12v-7H6Z',
  'Selected Projects': 'M4 5h16v14H4V5Zm2 2v10h12V7H6Zm2 2h8v2H8V9Zm0 4h5v2H8v-2Z',
  'Ausgewaehlte Projekte': 'M4 5h16v14H4V5Zm2 2v10h12V7H6Zm2 2h8v2H8V9Zm0 4h5v2H8v-2Z',
  'Proyectos Seleccionados': 'M4 5h16v14H4V5Zm2 2v10h12V7H6Zm2 2h8v2H8V9Zm0 4h5v2H8v-2Z',
  Education: 'M12 4 3 8l9 4 9-4-9-4Zm-5 7v4c2.8 2 7.2 2 10 0v-4l-5 2.2L7 11Z',
  Educación: 'M12 4 3 8l9 4 9-4-9-4Zm-5 7v4c2.8 2 7.2 2 10 0v-4l-5 2.2L7 11Z',
  'Technical Skills': 'M8.5 7 4 12l4.5 5 1.5-1.3L6.8 12l3.2-3.7L8.5 7Zm7 0L14 8.3l3.2 3.7-3.2 3.7 1.5 1.3L20 12l-4.5-5Zm-4 11 2-12h-2l-2 12h2Z',
  'Competencias Técnicas': 'M8.5 7 4 12l4.5 5 1.5-1.3L6.8 12l3.2-3.7L8.5 7Zm7 0L14 8.3l3.2 3.7-3.2 3.7 1.5 1.3L20 12l-4.5-5Zm-4 11 2-12h-2l-2 12h2Z',
  'Engineering Strengths': 'M4 5h11v2H4V5Zm0 6h11v2H4v-2Zm0 6h8v2H4v-2Zm13.2-1.8 1.4 1.4-3.6 3.6-2.2-2.2 1.4-1.4.8.8 2.2-2.2Z',
  'Frontend Strengths': 'M4 5h11v2H4V5Zm0 6h11v2H4v-2Zm0 6h8v2H4v-2Zm13.2-1.8 1.4 1.4-3.6 3.6-2.2-2.2 1.4-1.4.8.8 2.2-2.2Z',
  'Full-Stack Strengths': 'M4 5h11v2H4V5Zm0 6h11v2H4v-2Zm0 6h8v2H4v-2Zm13.2-1.8 1.4 1.4-3.6 3.6-2.2-2.2 1.4-1.4.8.8 2.2-2.2Z',
  'AI-Assisted Product Strengths': 'M4 5h11v2H4V5Zm0 6h11v2H4v-2Zm0 6h8v2H4v-2Zm13.2-1.8 1.4 1.4-3.6 3.6-2.2-2.2 1.4-1.4.8.8 2.2-2.2Z',
  'Frontend Fit': 'M4 5h11v2H4V5Zm0 6h11v2H4v-2Zm0 6h8v2H4v-2Zm13.2-1.8 1.4 1.4-3.6 3.6-2.2-2.2 1.4-1.4.8.8 2.2-2.2Z',
  'Full-Stack Fit': 'M4 5h11v2H4V5Zm0 6h11v2H4v-2Zm0 6h8v2H4v-2Zm13.2-1.8 1.4 1.4-3.6 3.6-2.2-2.2 1.4-1.4.8.8 2.2-2.2Z',
};

const renderIcon = (kind: 'link' | 'email' | 'github' | 'location') => {
  const common = { width: 8, height: 8, viewBox: '0 0 24 24', style: { marginRight: 4, alignSelf: 'center' } };
  if (kind === 'email') {
    return React.createElement(Svg, common, React.createElement(Path, { d: 'M4 4h16v16H4z', stroke: palette.muted, fill: 'none', strokeWidth: 2 }), React.createElement(Path, { d: 'M4 7l8 6 8-6', stroke: palette.muted, fill: 'none', strokeWidth: 2 }));
  }
  if (kind === 'github') {
    return React.createElement(Svg, common, React.createElement(Path, { d: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-4a3.4 3.4 0 0 0-1-2.6c3.1-.4 6.4-1.5 6.4-7A5.5 5.5 0 0 0 20 4.8 5 5 0 0 0 19.9 1S18.7.7 16 2.5a13.5 13.5 0 0 0-8 0C5.3.7 4.1 1 4.1 1A5 5 0 0 0 4 4.8a5.5 5.5 0 0 0-1.5 3.8c0 5.4 3.3 6.6 6.4 7A3.4 3.4 0 0 0 8 18v4', stroke: palette.muted, fill: 'none', strokeWidth: 2 }));
  }
  if (kind === 'location') {
    return React.createElement(Svg, common, React.createElement(Path, { d: 'M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z', stroke: palette.muted, fill: 'none', strokeWidth: 2 }), React.createElement(Circle, { cx: 12, cy: 10, r: 3, stroke: palette.muted, fill: 'none', strokeWidth: 2 }));
  }
  return React.createElement(Svg, common, React.createElement(Path, { d: 'M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7', stroke: palette.muted, fill: 'none', strokeWidth: 2 }));
};

const renderSectionIcon = (title: string) =>
  React.createElement(
    View,
    { style: styles.sectionIconWrap },
    React.createElement(
      Svg,
      { width: 8, height: 8, viewBox: '0 0 24 24' },
      React.createElement(Path, { d: sectionIcons[title] ?? sectionIcons.Summary, fill: palette.accent })
    )
  );

const Section = ({ title, children, roomy = false }: { title: string; children: React.ReactNode; roomy?: boolean }) =>
  React.createElement(
    View,
    { style: [styles.section, roomy && styles.roomySection] },
    React.createElement(
      View,
      { style: [styles.sectionHeading, roomy && styles.roomySectionHeading] },
      renderSectionIcon(title),
      React.createElement(Text, { style: styles.sectionTitle }, title)
    ),
    children
  );

const ContactRow = ({ icon, children }: { icon: 'link' | 'email' | 'github' | 'location'; children: React.ReactNode }) =>
  React.createElement(View, { style: styles.contactRow }, renderIcon(icon), children);

const CV = ({ variant = 'software' }: { variant?: CVVariantKey }) => {
  const content = cvVariants[variant];
  const roomy = variant === 'stablewatch';
  const sectionTitles = content.sectionTitles ?? {
    summary: 'Summary',
    technicalSkills: 'Technical Skills',
    experience: 'Experience',
    projects: 'Selected Projects',
    education: 'Education',
  };
  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: 'A4', style: styles.page },
      React.createElement(
        View,
        { style: [styles.header, roomy && styles.roomyHeader] },
        React.createElement(
          View,
          { style: styles.headerRow },
          React.createElement(
            View,
            { style: { flex: 1 } },
            React.createElement(Text, { style: styles.name }, 'Carlos Santisteban'),
            React.createElement(Text, { style: styles.headline }, content.headline),
            React.createElement(Text, { style: styles.subtitle }, content.subtitle)
          ),
          React.createElement(
            View,
            { style: styles.contact },
            React.createElement(
              View,
              { style: styles.portfolioRow },
              renderIcon('link'),
              React.createElement(Text, { style: styles.portfolioLabel }, content.portfolioLabel ?? 'Portfolio:'),
              React.createElement(Link, { src: 'https://carlos.santisteban.site', style: styles.portfolioLink }, 'carlos.santisteban.site')
            ),
            React.createElement(ContactRow, { icon: 'email' }, React.createElement(Text, { style: styles.contactText }, 'carlos.santisteban@outlook.com')),
            React.createElement(ContactRow, { icon: 'github' }, React.createElement(Link, { src: 'https://github.com/santistebanc', style: styles.contactLink }, 'github.com/santistebanc')),
            React.createElement(ContactRow, { icon: 'location' }, React.createElement(Text, { style: styles.contactText }, content.contactLocation ?? 'Berlin, Germany | Mexican & Spanish EU citizen'))
          )
        )
      ),
      Section({
        title: sectionTitles.summary,
        roomy,
        children: React.createElement(Text, { style: [styles.summary, roomy && styles.roomySummary] }, content.summary),
      }),
      Section({
        title: sectionTitles.technicalSkills,
        roomy,
        children: React.createElement(View, null, ...content.skillGroups.map(([label, text]) => React.createElement(View, { key: label, style: [styles.skillRow, roomy && styles.roomySkillRow] }, React.createElement(Text, { style: styles.skillLabel }, `${label}:`), React.createElement(Text, { style: [styles.skillText, roomy && styles.roomySkillText] }, text)))),
      }),
      Section({
        title: sectionTitles.experience,
        roomy,
        children: React.createElement(View, null, ...content.jobs.map((job) => React.createElement(View, { key: job.company, style: [styles.job, roomy && styles.roomyJob] }, React.createElement(View, { style: [styles.jobHeader, roomy && styles.roomyJobHeader] }, React.createElement(Text, { style: styles.company }, job.company), React.createElement(Text, { style: styles.meta }, job.meta)), React.createElement(Text, { style: [styles.role, roomy && styles.roomyRole] }, job.role), React.createElement(Text, { style: [styles.paragraph, roomy && styles.roomyParagraph] }, job.body)))),
      }),
      Section({
        title: sectionTitles.education,
        roomy,
        children: React.createElement(
          View,
          null,
          React.createElement(
            View,
            { style: [styles.jobHeader, roomy && styles.roomyJobHeader] },
            React.createElement(Text, { style: styles.company }, content.educationTitle ?? 'Bachelor of IT Engineering - Tecnologico de Monterrey, Mexico'),
            React.createElement(Text, { style: styles.meta }, content.educationMeta ?? 'Aug 2012 - May 2017')
          ),
          React.createElement(
            Text,
            { style: [styles.paragraph, roomy && styles.roomyParagraph] },
            content.educationDetails ?? 'Coursework: object-oriented programming, data structures, databases, networks, servers, operating systems, IT security, and cloud computing. DAAD scholarship exchange semester in Informatics at Hochschule Furtwangen, Germany.'
          )
        ),
      })
    )
  );
};

export default CV;
