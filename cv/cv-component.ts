import React from 'react';
import path from 'path';
import { fileURLToPath } from 'url';
import { Document, Page, Text, View, StyleSheet, Svg, Path, Circle, Link, Font } from '@react-pdf/renderer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

Font.register({
  family: 'Outfit',
  fonts: [
    { src: path.join(__dirname, '../node_modules/@fontsource/outfit/files/outfit-latin-400-normal.woff'), fontWeight: 400 },
    { src: path.join(__dirname, '../node_modules/@fontsource/outfit/files/outfit-latin-500-normal.woff'), fontWeight: 500 },
    { src: path.join(__dirname, '../node_modules/@fontsource/outfit/files/outfit-latin-700-normal.woff'), fontWeight: 700 },
  ],
});

const palette = {
  text: '#20242f',
  muted: '#5f6675',
  accent: '#2563eb',
  accentSoft: '#eef4ff',
  border: '#d8dde8',
  paper: '#ffffff',
};

const styles = StyleSheet.create({
  page: { padding: '28 30', fontFamily: 'Outfit', fontSize: 9.8, lineHeight: 1.42, color: palette.text, backgroundColor: palette.paper },
  header: { paddingBottom: 10, marginBottom: 11, borderBottom: `1 solid ${palette.border}` },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 18 },
  name: { fontSize: 24, fontWeight: 700, lineHeight: 1.0, marginBottom: 8 },
  headline: { fontSize: 12.3, fontWeight: 700, color: palette.accent, lineHeight: 1.15, marginBottom: 3 },
  subtitle: { fontSize: 9.8, color: palette.muted, lineHeight: 1.25 },
  contact: { alignItems: 'flex-end', marginTop: 2 },
  contactRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  portfolioRow: { flexDirection: 'row', alignItems: 'center', height: 20, marginBottom: 7, padding: '0 6', backgroundColor: palette.accentSoft, borderRadius: 4 },
  portfolioLabel: { fontSize: 8.3, lineHeight: 1, color: palette.muted, marginRight: 4 },
  portfolioLink: { fontSize: 10.2, lineHeight: 1, fontWeight: 700, color: palette.accent, textDecoration: 'none' },
  contactText: { fontSize: 8.7, color: palette.muted },
  contactLink: { fontSize: 8.7, color: palette.accent, textDecoration: 'none' },
  section: { marginTop: 8 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', paddingBottom: 3, marginBottom: 5, borderBottom: `1 solid ${palette.border}` },
  sectionIconWrap: { width: 14, height: 14, marginRight: 6, borderRadius: 3, backgroundColor: palette.accentSoft, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontSize: 10, fontWeight: 700, color: palette.text, textTransform: 'uppercase', letterSpacing: 0.7 },
  summary: { fontSize: 10.1, lineHeight: 1.48, padding: '7 9', backgroundColor: palette.accentSoft, borderLeft: `3 solid ${palette.accent}` },
  job: { marginBottom: 7 },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 2 },
  company: { fontSize: 10.5, fontWeight: 700, color: palette.text },
  role: { fontSize: 9.3, color: palette.muted, marginBottom: 2 },
  meta: { fontSize: 8.6, color: palette.muted },
  paragraph: { fontSize: 9.6, color: palette.text, lineHeight: 1.43 },
  compactBlock: { marginBottom: 7, paddingBottom: 6, borderBottom: `1 solid ${palette.border}` },
  skillRow: { marginBottom: 7 },
  skillLabel: { fontSize: 9.4, fontWeight: 700, color: palette.text },
  skillText: { fontSize: 9.4, color: palette.muted, lineHeight: 1.45 },
  listItem: { fontSize: 9.5, lineHeight: 1.42, color: palette.text, marginBottom: 3 },
  twoCol: { flexDirection: 'row', gap: 18 },
  col: { flex: 1 },
  projectItem: { marginTop: 0 },
  projectItemSpaced: { marginTop: 7 },
  projectTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 1 },
  projectLiveLink: { fontSize: 8.3, color: palette.accent, textDecoration: 'none' },
  miniHeader: { paddingBottom: 8, marginBottom: 10, borderBottom: `1 solid ${palette.border}`, flexDirection: 'row', justifyContent: 'space-between' },
});

const jobs = [
  {
    company: 'Independent Product Development',
    role: 'Web apps, product UX, and AI-assisted delivery workflows',
    meta: 'Berlin | Apr 2025 - Present',
    body: 'Built and shipped independent web applications with modern JavaScript/TypeScript tooling and AI-assisted development workflows. Focused on polished product UX, search/comparison interfaces, realtime interactions, PWA behavior, deployment, and iteration. Developed a practical AI-assisted delivery workflow combining research, structured decision-making, prototyping, vertical-slice implementation, manual review, deployment, and maintenance.',
  },
  {
    company: 'Lingoda',
    role: 'Software Engineer - Language learning platform',
    meta: 'Berlin | Jun 2021 - Mar 2025',
    body: 'Built user-facing product features for a production learning platform, with a strong focus on React/TypeScript UI quality, student-facing practice flows, quizzes, flashcards, reusable components, Material UI implementation, GraphQL/Apollo state management, and collaboration with product, design, and backend teams.',
  },
  {
    company: 'Quandoo',
    role: 'Software Engineer - Restaurant reservation marketplace',
    meta: 'Berlin | Sep 2017 - Jan 2021',
    body: 'Contributed to a consumer-facing marketplace across responsive booking and discovery interfaces. Built reusable React/Redux UI components, interactive carousels, server-rendered pages, SEO improvements, and frontend features that supported restaurant search, reservation, and marketplace browsing workflows.',
  },
  {
    company: 'Market Logic Software',
    role: 'Web Developer - Data visualization UIs',
    meta: 'Berlin | Mar 2016 - Jul 2016',
    body: 'Worked on advanced UI components for data visualization, creating interactive graphs and dynamic widgets with React and D3.js for data-heavy product surfaces.',
  },
  {
    company: 'AISA',
    role: 'Software Developer - Government document systems',
    meta: 'Mexico | Apr 2015 - Jun 2015',
    body: 'Built UI forms and controls for legal document management systems using C#, WPF, and SQL databases, collaborating on institution-wide internal software.',
  },
];

const skillGroups = [
  ['Product UI Engineering', 'JavaScript, TypeScript, React, UI architecture, forms, onboarding flows, responsive interfaces, design systems'],
  ['Full-Stack Product Delivery', 'Node.js, REST/GraphQL APIs, PostgreSQL, Redis, WebSockets, PWA/offline behavior'],
  ['AI-Assisted Development', 'LLM/AI SDKs, coding agents, reusable agent skills, MCP workflows, research/prototyping/implementation loops'],
  ['Quality & Release', 'Playwright, debugging, code review, GitHub Actions, Docker, deployment, CI/CD'],
];

const competencies = [
  'Building polished user-facing product surfaces with maintainable JavaScript/TypeScript code and modern UI architecture.',
  'Designing UI systems, forms, onboarding flows, responsive interfaces, and interactive components.',
  'Owning practical full-stack product slices across frontend, APIs, data, deployment, and iteration.',
  'Using AI-assisted workflows for research, prototyping, implementation, debugging, and review while staying accountable for architecture, UX, and code quality.',
  'Collaborating with product, design, backend, and cross-functional teams in startup/product environments.',
];

const sectionIcons: Record<string, string> = {
  Summary: 'M4 5h16v2H4V5Zm0 5h16v2H4v-2Zm0 5h10v2H4v-2Z',
  Experience: 'M9 5h6l1 2h4v12H4V7h4l1-2Zm1.2 2-.5 1h4.6l-.5-1h-3.6ZM6 10v7h12v-7H6Z',
  Education: 'M12 4 3 8l9 4 9-4-9-4Zm-5 7v4c2.8 2 7.2 2 10 0v-4l-5 2.2L7 11Z',
  'Technical Skills': 'M8.5 7 4 12l4.5 5 1.5-1.3L6.8 12l3.2-3.7L8.5 7Zm7 0L14 8.3l3.2 3.7-3.2 3.7 1.5 1.3L20 12l-4.5-5Zm-4 11 2-12h-2l-2 12h2Z',
  'Product Engineering Strengths': 'M4 5h11v2H4V5Zm0 6h11v2H4v-2Zm0 6h8v2H4v-2Zm13.2-1.8 1.4 1.4-3.6 3.6-2.2-2.2 1.4-1.4.8.8 2.2-2.2Z',
  'Selected Independent Work': 'M4 5h7v6H4V5Zm9 0h7v6h-7V5ZM4 13h7v6H4v-6Zm9 0h7v6h-7v-6Z',
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

const ProjectItem = ({
  title,
  liveUrl,
  liveLabel,
  children,
  spaced = false,
}: {
  title: string;
  liveUrl: string;
  liveLabel: string;
  children: string;
  spaced?: boolean;
}) =>
  React.createElement(
    View,
    { style: spaced ? styles.projectItemSpaced : styles.projectItem },
    React.createElement(
      View,
      { style: styles.projectTitleRow },
      React.createElement(Text, { style: styles.company }, title),
      React.createElement(Link, { src: liveUrl, style: styles.projectLiveLink }, liveLabel)
    ),
    React.createElement(Text, { style: styles.paragraph }, children)
  );

const CV = () =>
  React.createElement(
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
            React.createElement(Text, { style: styles.headline }, 'Product-Minded Software Engineer'),
            React.createElement(Text, { style: styles.subtitle }, 'User-facing product engineering, UI systems, and AI-assisted development')
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
        children: React.createElement(Text, { style: styles.summary }, 'Product-minded software engineer with 8+ years of professional experience building user-facing web applications, especially UI systems, onboarding flows, forms, interactive components, and polished product UX. Strong professional foundation in React, TypeScript, JavaScript, and modern web UI, with the fundamentals to adapt across adjacent frontend stacks. Strongest in hands-on product engineering roles where UI quality, maintainable code, and practical full-stack ownership matter. Experienced with independent full-stack app delivery and AI-assisted development workflows across research, prototyping, implementation, debugging, deployment, and iteration.'),
      }),
      Section({
        title: 'Experience',
        children: React.createElement(View, null, ...jobs.map((job) => React.createElement(View, { key: job.company, style: styles.job }, React.createElement(View, { style: styles.jobHeader }, React.createElement(Text, { style: styles.company }, job.company), React.createElement(Text, { style: styles.meta }, job.meta)), React.createElement(Text, { style: styles.role }, job.role), React.createElement(Text, { style: styles.paragraph }, job.body)))),
      }),
      Section({
        title: 'Education',
        children: React.createElement(View, null, React.createElement(View, { style: styles.jobHeader }, React.createElement(Text, { style: styles.company }, 'Bachelor of IT Engineering'), React.createElement(Text, { style: styles.meta }, 'Aug 2012 - May 2017')), React.createElement(Text, { style: styles.role }, 'Tecnologico de Monterrey, Mexico'), React.createElement(Text, { style: styles.paragraph }, 'Studies covered object-oriented programming, data structures, databases, networks, servers and operating systems, IT security, and cloud computing.')),
      })
    ),
    React.createElement(
      Page,
      { size: 'A4', style: styles.page },
      React.createElement(View, { style: styles.miniHeader }, React.createElement(Text, { style: { fontSize: 13, fontWeight: 700 } }, 'Carlos Santisteban'), React.createElement(Text, { style: { fontSize: 9.5, color: palette.muted } }, 'Product-Minded Software Engineer')),
      Section({
        title: 'Technical Skills',
        children: React.createElement(View, null, ...skillGroups.map(([label, text]) => React.createElement(View, { key: label, style: styles.skillRow }, React.createElement(Text, { style: styles.skillLabel }, `${label}:`), React.createElement(Text, { style: styles.skillText }, text)))),
      }),
      Section({
        title: 'Product Engineering Strengths',
        children: React.createElement(View, null, ...competencies.map((item) => React.createElement(Text, { key: item, style: styles.listItem }, `- ${item}`))),
      }),
      Section({
        title: 'Selected Independent Work',
        children: React.createElement(
          View,
          { style: styles.twoCol },
          React.createElement(
            View,
            { style: styles.col },
            React.createElement(ProjectItem, { title: 'OV Berlin', liveUrl: 'https://ovberlin.site', liveLabel: 'ovberlin.site' }, 'Public PWA for finding original-version cinema screenings in Berlin, with automated data refresh, rating/trailer enrichment, offline support, maps, and fast search/filter UX. Built and deployed end to end.'),
            React.createElement(ProjectItem, { title: 'Flyscan', liveUrl: 'https://flyscan.site', liveLabel: 'flyscan.site', spaced: true }, 'Flight comparison interface that aggregates multiple providers into a filterable itinerary view, with emphasis on search UX, loading states, result comparison, and deployment.')
          ),
          React.createElement(
            View,
            { style: styles.col },
            React.createElement(ProjectItem, { title: 'SnapQuiz', liveUrl: 'https://snapquiz.fun/', liveLabel: 'snapquiz.fun' }, 'Realtime group quiz app with TV and mobile flows, AI-generated questions, voice/tap answering, and multiplayer room coordination.'),
            React.createElement(ProjectItem, { title: 'RankZap', liveUrl: 'https://rankzap.site', liveLabel: 'rankzap.site', spaced: true }, 'Realtime ranked-voting product with mobile-first drag-and-drop ranking, live tallies, multiple voting modes, presence, validation, and WebSocket updates.')
          )
        ),
      })
    )
  );

export default CV;
