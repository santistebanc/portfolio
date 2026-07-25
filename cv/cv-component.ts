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
  header: { paddingBottom: 8, marginBottom: 9, borderBottom: `1 solid ${palette.border}` },
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
});

export type CVVariantKey = 'software' | 'frontend' | 'fullstack' | 'ai';

type Job = {
  company: string;
  role: string;
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
  skillGroups: [string, string][];
  strengthsTitle: string;
  strengths: string[];
};

const jobs = [
  {
    company: 'Independent Web Applications',
    role: 'Web apps, UX, and AI-assisted delivery workflows',
    meta: 'Berlin | Apr 2025 - Present',
    body: 'Stayed hands-on with React/TypeScript product work through independent web applications and prototypes. Built polished UI, search/filter and comparison flows, realtime interactions, PWA/offline behavior, data pipelines, deployment automation, debugging, and iteration while adopting AI-assisted development workflows. Used this period to explore modern web tooling, full-stack delivery patterns, and practical AI-assisted engineering while keeping ownership of architecture and final behavior.',
  },
  {
    company: 'Lingoda',
    role: 'Software Engineer - Language learning platform',
    meta: 'Berlin | Jun 2021 - Mar 2025',
    body: 'Built user-facing features for a live online language learning platform. Had major frontend ownership of Lingobites student-facing exercise flows, including interactive UI, multiple exercise types, routing, animations, state handling, progress tracking, gamification, and flashcard integration. Helped replace a constrained third-party quiz system with an in-house experience, working with React, Apollo/GraphQL, Material UI, product, design, backend, QA, bug fixing, and release iteration.',
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

export const cvVariants: Record<CVVariantKey, CVVariant> = {
  software: {
    label: 'Software Engineer',
    filename: 'Carlos_Santisteban_CV_Software_Engineer.pdf',
    headline: 'Software Engineer',
    subtitle: 'User-facing web applications, maintainable systems, and AI-assisted development',
    summary:
      'Software engineer with 8+ years of professional experience building user-facing web applications, reusable UI components, interactive workflows, and production features. Strong foundation in React, TypeScript, JavaScript, and modern web development, with practical full-stack experience across APIs, data, deployment, and iteration. Comfortable working with product, design, backend, QA, and cross-functional teams.',
    jobs,
    skillGroups: [
      ['Core Engineering', 'JavaScript, TypeScript, React, UI architecture, reusable components, state management, responsive web apps, CSS'],
      ['Backend & Data', 'Node.js, REST/GraphQL APIs, PostgreSQL, WebSockets, scraping/enrichment pipelines, integrations'],
      ['Quality & Delivery', 'Playwright, debugging, code review, GitHub Actions, Docker, deployment, CI/CD'],
      ['AI-Assisted Development', 'LLM/AI SDKs, coding agents, MCP workflows, research/prototyping/implementation loops'],
    ],
    strengthsTitle: 'Engineering Strengths',
    strengths: [
      'Building maintainable JavaScript/TypeScript applications with clear UI architecture and pragmatic full-stack ownership.',
      'Turning ambiguous requirements into working, shippable software across frontend, APIs, data, deployment, and iteration.',
      'Debugging production-facing features, reviewing code, refactoring, and collaborating closely with product, design, backend, QA, and cross-functional teams.',
    ],
  },
  frontend: {
    label: 'Frontend Engineer',
    filename: 'Carlos_Santisteban_CV_Frontend_Engineer.pdf',
    headline: 'Frontend Engineer',
    subtitle: 'React, TypeScript, UI systems, forms, and polished user-facing experiences',
    summary:
      'Frontend engineer with 8+ years of professional experience building user-facing web applications, reusable React components, responsive interfaces, forms, search/filter flows, quizzes, interactive widgets, and polished product UX. Strong professional foundation in React, TypeScript, JavaScript, Material UI, GraphQL/Apollo integration, and modern web UI. Best suited to teams that care about frontend quality, clear component architecture, product collaboration, and maintainable delivery in real codebases.',
    jobs: jobs.map((job) =>
      job.company === 'Independent Web Applications'
        ? {
            ...job,
            role: 'Frontend-focused web apps, UI systems, and AI-assisted delivery workflows',
            body: 'Stayed hands-on with React/TypeScript product work through independent web applications and prototypes. Focused on polished UI, responsive layouts, search/filter and comparison flows, realtime interactions, PWA/offline behavior, loading states, and iterative UX improvements.',
          }
        : job
    ),
    skillGroups: [
      ['Frontend Core', 'JavaScript, TypeScript, React, component architecture, hooks, context, state management, responsive interfaces'],
      ['Styling & UI Systems', 'CSS, responsive layout, Material UI, Tailwind, styled-components, design systems, forms, onboarding flows'],
      ['Integration & Testing', 'GraphQL/Apollo, REST APIs, Playwright, debugging, code review, browser tooling'],
      ['Delivery', 'GitHub Actions, deployment, CI/CD, AI-assisted research/prototyping/implementation workflows'],
    ],
    strengthsTitle: 'Frontend Strengths',
    strengths: [
      'Building polished user-facing interfaces with maintainable React/TypeScript code and clear component boundaries.',
      'Designing forms, onboarding flows, quizzes, responsive interfaces, and interactive components that feel stable and deliberate.',
      'Integrating frontend surfaces with APIs, GraphQL/Apollo state, loading states, validation, and error handling.',
      'Collaborating with product, design, and backend teams to turn user flows into production-ready UI while using AI-assisted workflows for research, prototyping, debugging, and review.',
    ],
  },
  fullstack: {
    label: 'Full-Stack Engineer',
    filename: 'Carlos_Santisteban_CV_Full_Stack_Engineer.pdf',
    headline: 'Full-Stack Engineer',
    subtitle: 'React, TypeScript, Node.js, APIs, realtime features, and shipped web apps',
    summary:
      'Full-stack product engineer with 8+ years of professional experience building user-facing web applications and practical end-to-end product slices. Strongest in React, TypeScript, JavaScript, and modern frontend development, with hands-on experience across Node.js, REST/GraphQL APIs, PostgreSQL, WebSockets, scraping/enrichment pipelines, PWA/offline behavior, deployment, debugging, and iteration. Experienced shipping independent applications end to end and collaborating with product, design, and backend teams in production environments.',
    jobs: jobs.map((job) =>
      job.company === 'Independent Web Applications'
        ? {
            ...job,
            role: 'Full-stack web apps, deployment, and AI-assisted delivery workflows',
            body: 'Stayed hands-on with full-stack web application work using modern JavaScript/TypeScript tooling. Built practical slices across UI, APIs, scraping/enrichment pipelines, realtime interactions, PWA/offline behavior, deployment automation, debugging, and iteration.',
          }
        : job
    ),
    skillGroups: [
      ['Frontend', 'JavaScript, TypeScript, React, UI architecture, forms, responsive interfaces, CSS, Material UI, Tailwind, PWA behavior'],
      ['Backend & Data', 'Node.js, REST/GraphQL APIs, PostgreSQL, WebSockets, PartyKit, scraping/enrichment pipelines'],
      ['Delivery & Quality', 'Playwright, debugging, code review, GitHub Actions, Docker, deployment, CI/CD'],
      ['AI-Assisted Development', 'LLM/AI SDKs, coding agents, MCP workflows, research/prototyping/implementation loops'],
    ],
    strengthsTitle: 'Full-Stack Strengths',
    strengths: [
      'Owning end-to-end feature slices across frontend, APIs, data, deployment, and iteration.',
      'Building user-facing React/TypeScript interfaces backed by practical API, database, and realtime implementation work.',
      'Shipping independent applications with search, comparison, PWA/offline behavior, WebSockets, validation, and deployment concerns.',
      'Debugging across the stack, making pragmatic technical tradeoffs, and collaborating with product, design, backend, and cross-functional teams.',
    ],
  },
  ai: {
    label: 'AI-Assisted Product Engineer',
    filename: 'Carlos_Santisteban_CV_AI_Assisted_Product_Engineer.pdf',
    headline: 'Frontend / Product Engineer',
    subtitle: 'React, TypeScript, practical AI-assisted workflows, and AI-enabled web apps',
    summary:
      'Frontend/product engineer with 8+ years of professional experience building user-facing web applications, strongest in React, TypeScript, JavaScript, product UI, and large production codebases. Recently adopted practical AI-assisted development workflows for prototyping, debugging, architecture exploration, implementation, refactoring, and product polish. Has built independent web apps and practical AI-enabled features while keeping ownership of product direction, architecture choices, review, deployment, and final behavior.',
    jobs: jobs.map((job) =>
      job.company === 'Lingoda'
        ? {
            ...job,
            body: 'Built production frontend features for Lingoda, including practice exercises, quizzes, flashcards, and student-facing flows. Contributed to Lingobites, an interactive practice feature with AI-generated exercise content and human-in-the-loop quality review. Built the student-facing exercise UI, session flow, state management, progress tracking, gamification behavior, and integration of existing flashcards.',
          }
        : job.company === 'Independent Web Applications'
          ? {
              ...job,
              role: 'React/TypeScript apps and AI-assisted delivery workflows',
              body: 'Built independent React/TypeScript applications while adopting AI-assisted development as a productivity multiplier. Used AI tools for prototyping, UI iteration, debugging, refactoring, architecture exploration, and practical OpenAI/API experiments while owning product ideas, UX direction, integration, review, deployment, and final behavior.',
            }
          : job
    ),
    skillGroups: [
      ['Core Engineering', 'React, TypeScript, JavaScript, frontend architecture, component design, state management, CSS/UI implementation'],
      ['AI-Assisted Delivery', 'Codex/ChatGPT-style workflows, Claude-assisted design, coding agents, prototyping, debugging, review'],
      ['AI-Enabled Features', 'OpenAI API integrations, AI-generated content/questions, RAG/TTS/STT experimentation'],
      ['Product Delivery', 'Feature planning, UI polish, full-stack slices, testing, release, collaboration with product/design/backend'],
    ],
    strengthsTitle: 'AI-Assisted Product Strengths',
    strengths: [
      'Using AI as a productivity accelerator while retaining engineering judgment, code review, and product ownership.',
      'Combining production frontend experience with rapid prototyping, architecture exploration, and full-stack delivery.',
      'Building practical AI-enabled product flows without positioning as an ML researcher.',
      'Turning product ideas into deployed React/TypeScript applications with clear UX, maintainable behavior, and final responsibility for shipped code.',
    ],
  },
};

const sectionIcons: Record<string, string> = {
  Summary: 'M4 5h16v2H4V5Zm0 5h16v2H4v-2Zm0 5h10v2H4v-2Z',
  Experience: 'M9 5h6l1 2h4v12H4V7h4l1-2Zm1.2 2-.5 1h4.6l-.5-1h-3.6ZM6 10v7h12v-7H6Z',
  Education: 'M12 4 3 8l9 4 9-4-9-4Zm-5 7v4c2.8 2 7.2 2 10 0v-4l-5 2.2L7 11Z',
  'Technical Skills': 'M8.5 7 4 12l4.5 5 1.5-1.3L6.8 12l3.2-3.7L8.5 7Zm7 0L14 8.3l3.2 3.7-3.2 3.7 1.5 1.3L20 12l-4.5-5Zm-4 11 2-12h-2l-2 12h2Z',
  'Engineering Strengths': 'M4 5h11v2H4V5Zm0 6h11v2H4v-2Zm0 6h8v2H4v-2Zm13.2-1.8 1.4 1.4-3.6 3.6-2.2-2.2 1.4-1.4.8.8 2.2-2.2Z',
  'Frontend Strengths': 'M4 5h11v2H4V5Zm0 6h11v2H4v-2Zm0 6h8v2H4v-2Zm13.2-1.8 1.4 1.4-3.6 3.6-2.2-2.2 1.4-1.4.8.8 2.2-2.2Z',
  'Full-Stack Strengths': 'M4 5h11v2H4V5Zm0 6h11v2H4v-2Zm0 6h8v2H4v-2Zm13.2-1.8 1.4 1.4-3.6 3.6-2.2-2.2 1.4-1.4.8.8 2.2-2.2Z',
  'AI-Assisted Product Strengths': 'M4 5h11v2H4V5Zm0 6h11v2H4v-2Zm0 6h8v2H4v-2Zm13.2-1.8 1.4 1.4-3.6 3.6-2.2-2.2 1.4-1.4.8.8 2.2-2.2Z',
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

const Section = ({ title, children }: { title: string; children: React.ReactNode }) =>
  React.createElement(
    View,
    { style: styles.section },
    React.createElement(
      View,
      { style: styles.sectionHeading },
      renderSectionIcon(title),
      React.createElement(Text, { style: styles.sectionTitle }, title)
    ),
    children
  );

const ContactRow = ({ icon, children }: { icon: 'link' | 'email' | 'github' | 'location'; children: React.ReactNode }) =>
  React.createElement(View, { style: styles.contactRow }, renderIcon(icon), children);

const CV = ({ variant = 'software' }: { variant?: CVVariantKey }) => {
  const content = cvVariants[variant];

  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: 'A4', style: styles.page },
      React.createElement(
        View,
        { style: styles.header },
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
              React.createElement(Text, { style: styles.portfolioLabel }, 'Portfolio:'),
              React.createElement(Link, { src: 'https://carlos.santisteban.site', style: styles.portfolioLink }, 'carlos.santisteban.site')
            ),
            React.createElement(ContactRow, { icon: 'email' }, React.createElement(Text, { style: styles.contactText }, 'carlos.santisteban@outlook.com')),
            React.createElement(ContactRow, { icon: 'github' }, React.createElement(Link, { src: 'https://github.com/santistebanc', style: styles.contactLink }, 'github.com/santistebanc')),
            React.createElement(ContactRow, { icon: 'location' }, React.createElement(Text, { style: styles.contactText }, 'Berlin, Germany | Mexican & Spanish EU citizen'))
          )
        )
      ),
      Section({
        title: 'Summary',
        children: React.createElement(Text, { style: styles.summary }, content.summary),
      }),
      Section({
        title: 'Technical Skills',
        children: React.createElement(View, null, ...content.skillGroups.map(([label, text]) => React.createElement(View, { key: label, style: styles.skillRow }, React.createElement(Text, { style: styles.skillLabel }, `${label}:`), React.createElement(Text, { style: styles.skillText }, text)))),
      }),
      Section({
        title: 'Experience',
        children: React.createElement(View, null, ...content.jobs.map((job) => React.createElement(View, { key: job.company, style: styles.job }, React.createElement(View, { style: styles.jobHeader }, React.createElement(Text, { style: styles.company }, job.company), React.createElement(Text, { style: styles.meta }, job.meta)), React.createElement(Text, { style: styles.role }, job.role), React.createElement(Text, { style: styles.paragraph }, job.body)))),
      }),
      Section({
        title: 'Education',
        children: React.createElement(View, { style: styles.jobHeader }, React.createElement(Text, { style: styles.company }, 'Bachelor of IT Engineering - Tecnologico de Monterrey, Mexico'), React.createElement(Text, { style: styles.meta }, 'Aug 2012 - May 2017')),
      })
    )
  );
};

export default CV;
