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
  contactText: { fontSize: 8.7, color: palette.muted },
  contactLink: { fontSize: 8.7, color: palette.accent, textDecoration: 'none' },
  section: { marginTop: 8 },
  sectionTitle: { fontSize: 10, fontWeight: 700, color: palette.text, textTransform: 'uppercase', letterSpacing: 0.7, paddingBottom: 3, marginBottom: 5, borderBottom: `1 solid ${palette.border}` },
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
  miniHeader: { paddingBottom: 8, marginBottom: 10, borderBottom: `1 solid ${palette.border}`, flexDirection: 'row', justifyContent: 'space-between' },
});

const jobs = [
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
  ['Core', 'React, TypeScript, JavaScript, UI architecture, product UX'],
  ['Frontend', 'Forms, onboarding flows, responsive design, design systems, state management'],
  ['Backend', 'Node.js, REST/GraphQL APIs, PostgreSQL, Redis, WebSockets'],
  ['AI & Tooling', 'AI SDKs, AI-assisted development workflows, reusable agent skills, Playwright, GitHub Actions, Docker'],
];

const competencies = [
  'Building polished user-facing product surfaces with maintainable React/TypeScript code.',
  'Designing UI systems, forms, onboarding flows, responsive interfaces, and interactive components.',
  'Owning practical full-stack product slices across frontend, APIs, data, deployment, and iteration.',
  'Using AI-assisted workflows for research, prototyping, implementation, debugging, and review while staying accountable for architecture, UX, and code quality.',
  'Collaborating with product, design, backend, and cross-functional teams in startup/product environments.',
];

const renderIcon = (kind: 'link' | 'email' | 'github' | 'location') => {
  const common = { width: 8, height: 8, viewBox: '0 0 24 24', style: { marginRight: 4 } };
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

const Section = ({ title, children }: { title: string; children: React.ReactNode }) =>
  React.createElement(View, { style: styles.section }, React.createElement(Text, { style: styles.sectionTitle }, title), children);

const ContactRow = ({ icon, children }: { icon: 'link' | 'email' | 'github' | 'location'; children: React.ReactNode }) =>
  React.createElement(View, { style: styles.contactRow }, renderIcon(icon), children);

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
            React.createElement(Text, { style: styles.headline }, 'Product-Minded React/TypeScript Engineer'),
            React.createElement(Text, { style: styles.subtitle }, 'Frontend-focused delivery, UI systems, and AI-assisted development')
          ),
          React.createElement(
            View,
            { style: styles.contact },
            React.createElement(ContactRow, { icon: 'link' }, React.createElement(Link, { src: 'https://carlos.santisteban.site', style: styles.contactLink }, 'carlos.santisteban.site')),
            React.createElement(ContactRow, { icon: 'email' }, React.createElement(Text, { style: styles.contactText }, 'carlos.santisteban@outlook.com')),
            React.createElement(ContactRow, { icon: 'github' }, React.createElement(Link, { src: 'https://github.com/santistebanc', style: styles.contactLink }, 'github.com/santistebanc')),
            React.createElement(ContactRow, { icon: 'location' }, React.createElement(Text, { style: styles.contactText }, 'Berlin, Germany | Mexican & Spanish EU citizen'))
          )
        )
      ),
      Section({
        title: 'Summary',
        children: React.createElement(Text, { style: styles.summary }, 'Product-minded React/TypeScript engineer with 8+ years of professional experience building user-facing web applications, especially UI systems, onboarding flows, forms, interactive components, and polished product UX. Strongest in hands-on product engineering roles where UI quality, maintainable code, and practical full-stack ownership matter. Experienced with independent full-stack app delivery and AI-assisted development workflows across research, prototyping, implementation, debugging, deployment, and iteration.'),
      }),
      Section({
        title: 'Professional Experience',
        children: React.createElement(View, null, ...jobs.map((job) => React.createElement(View, { key: job.company, style: styles.job }, React.createElement(View, { style: styles.jobHeader }, React.createElement(Text, { style: styles.company }, job.company), React.createElement(Text, { style: styles.meta }, job.meta)), React.createElement(Text, { style: styles.role }, job.role), React.createElement(Text, { style: styles.paragraph }, job.body)))),
      }),
      Section({
        title: 'Independent Product Development',
        children: React.createElement(View, { style: styles.compactBlock }, React.createElement(View, { style: styles.jobHeader }, React.createElement(Text, { style: styles.company }, 'Independent full-stack applications'), React.createElement(Text, { style: styles.meta }, '2025 - Present')), React.createElement(Text, { style: styles.paragraph }, 'Built and deployed independent full-stack web applications with React/TypeScript, including polished PWA product UX, search/comparison interfaces, realtime multiplayer flows, reusable backend services, and AI-generated content features. Developed a practical AI-assisted delivery workflow combining research, structured decision-making, prototyping, vertical-slice implementation, manual review, deployment, and maintenance.')),
      })
    ),
    React.createElement(
      Page,
      { size: 'A4', style: styles.page },
      React.createElement(View, { style: styles.miniHeader }, React.createElement(Text, { style: { fontSize: 13, fontWeight: 700 } }, 'Carlos Santisteban'), React.createElement(Text, { style: { fontSize: 9.5, color: palette.muted } }, 'Product-Minded React/TypeScript Engineer')),
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
          React.createElement(View, { style: styles.col }, React.createElement(Text, { style: styles.company }, 'OV Berlin'), React.createElement(Text, { style: styles.paragraph }, 'Public PWA for finding original-version cinema screenings in Berlin, with automated data refresh, rating/trailer enrichment, offline support, maps, and fast search/filter UX. Built and deployed end to end.'), React.createElement(Text, { style: { ...styles.company, marginTop: 7 } }, 'Flyscan'), React.createElement(Text, { style: styles.paragraph }, 'Flight comparison interface that aggregates multiple providers into a filterable itinerary view, with emphasis on search UX, loading states, result comparison, and deployment.')),
          React.createElement(View, { style: styles.col }, React.createElement(Text, { style: styles.company }, 'SnapQuiz'), React.createElement(Text, { style: styles.paragraph }, 'Realtime group quiz app with TV and mobile flows, AI-generated questions, voice/tap answering, and multiplayer room coordination.'), React.createElement(Text, { style: { ...styles.company, marginTop: 7 } }, 'RankZap / Room Server'), React.createElement(Text, { style: styles.paragraph }, 'Realtime ranked-voting product and reusable PartyKit backend service for presence, key/value state, validation, scheduling, and WebSocket updates.'))
        ),
      }),
      Section({
        title: 'Education',
        children: React.createElement(View, null, React.createElement(View, { style: styles.jobHeader }, React.createElement(Text, { style: styles.company }, 'Bachelor of IT Engineering'), React.createElement(Text, { style: styles.meta }, 'Aug 2012 - May 2017')), React.createElement(Text, { style: styles.role }, 'Tecnologico de Monterrey, Mexico'), React.createElement(Text, { style: styles.paragraph }, 'Studies covered object-oriented programming, data structures, databases, networks, servers and operating systems, IT security, and cloud computing.')),
      })
    )
  );

export default CV;
