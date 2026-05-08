import React from 'react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { Document, Page, Text, View, StyleSheet, Svg, Path, Circle, Rect, Link, Font } from '@react-pdf/renderer';
import * as simpleIcons from 'simple-icons';

interface Icon {
  path: string;
  hex: string;
}

Font.register({
  family: 'Outfit',
  fonts: [
    { src: path.join(__dirname, '../node_modules/@fontsource/outfit/files/outfit-latin-400-normal.woff'), fontWeight: 400 },
    { src: path.join(__dirname, '../node_modules/@fontsource/outfit/files/outfit-latin-500-normal.woff'), fontWeight: 500 },
    { src: path.join(__dirname, '../node_modules/@fontsource/outfit/files/outfit-latin-700-normal.woff'), fontWeight: 700 },
    { src: path.join(__dirname, '../node_modules/@fontsource/outfit/files/outfit-latin-800-normal.woff'), fontWeight: 800 },
    { src: path.join(__dirname, '../node_modules/@fontsource/outfit/files/outfit-latin-900-normal.woff'), fontWeight: 900 },
    { src: path.join(__dirname, '../node_modules/@fontsource/outfit/files/outfit-latin-500-normal.woff'), fontWeight: 500, fontStyle: 'italic' },
    { src: path.join(__dirname, '../node_modules/@fontsource/outfit/files/outfit-latin-700-normal.woff'), fontWeight: 700, fontStyle: 'italic' },
    { src: path.join(__dirname, '../node_modules/@fontsource/outfit/files/outfit-latin-900-normal.woff'), fontWeight: 900, fontStyle: 'italic' },
  ],
});

const palette = {
  darkTeal: '#1f2338',
  oceanBlue: '#4f5b7a',
  emerald: '#6b8068',
  goldenPollen: '#d4920a',
  bubblegumPink: '#b87a08',
  light: '#f7f9ff',
  paper: '#ffffff',
  borderSoft: '#d7dcee',
  pattern: '#bcc6df',
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Outfit',
    fontSize: 11.1,
    fontWeight: 400,
    color: palette.darkTeal,
    backgroundColor: palette.paper,
  },
  header: {
    position: 'relative',
    marginBottom: 10,
    padding: '7 8 6 8',
  },
  headerRule: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: palette.borderSoft,
  },
  compactHeader: {
    position: 'relative',
    marginBottom: 12,
    padding: '8 10 7 10',
  },
  name: {
    fontSize: 31.5,
    fontWeight: 500,
    color: palette.darkTeal,
    marginBottom: 4,
    letterSpacing: 0.1,
  },
  title: {
    fontSize: 13.1,
    color: palette.emerald,
    fontWeight: 700,
    fontStyle: 'italic',
  },
  titleSoft: {
    fontSize: 13.1,
    color: palette.emerald,
    fontWeight: 300,
    fontStyle: 'italic',
  },
  contactInfo: {
    fontSize: 9,
    color: palette.oceanBlue,
    lineHeight: 1.6,
    marginTop: 8,
  },
  contactRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  section: {
    marginTop: 6,
    marginBottom: 3,
  },
  jobBlock: {
    marginBottom: 7,
    padding: '4 0 8 14',
    backgroundColor: palette.paper,
    borderBottom: `1 solid ${palette.light}`,
    borderLeft: `1 solid ${palette.goldenPollen}`,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    backgroundColor: palette.paper,
    padding: '3 0',
    borderRadius: 3,
    borderBottom: `1 solid ${palette.goldenPollen}`,
  },
  sectionTitle: {
    fontSize: 12.1,
    fontWeight: 700,
    color: palette.darkTeal,
    marginBottom: 0,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginLeft: 5,
  },
  summaryText: {
    fontSize: 10.5,
    lineHeight: 1.6,
    fontWeight: 400,
    color: palette.darkTeal,
    backgroundColor: palette.paper,
    borderLeft: `3 solid ${palette.emerald}`,
    borderRadius: 4,
    padding: '5 8',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 10.9,
    fontWeight: 'bold',
    color: palette.darkTeal,
    marginBottom: 3,
  },
  company: {
    fontSize: 11.6,
    fontWeight: 'bold',
    color: palette.oceanBlue,
    marginBottom: 3,
  },
  companyName: {
    fontSize: 13.9,
    fontWeight: 700,
    color: palette.emerald,
  },
  dateRange: {
    fontSize: 9.2,
    color: palette.oceanBlue,
    fontWeight: 400,
    fontStyle: 'italic',
    backgroundColor: palette.light,
    padding: '2 6',
  },
  locationMeta: {
    fontSize: 8.8,
    color: palette.oceanBlue,
    fontWeight: 400,
    fontStyle: 'normal',
  },
  dates: {
    fontSize: 8,
    color: palette.darkTeal,
    fontStyle: 'italic',
    marginBottom: 4,
    backgroundColor: palette.light,
    padding: '2px 6px',
    borderRadius: 3,
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 10,
    lineHeight: 1.5,
    fontWeight: 400,
    color: palette.darkTeal,
    marginBottom: 3,
    marginTop: 1,
  },
  bulletPoint: {
    fontSize: 9.9,
    lineHeight: 1.45,
    fontWeight: 400,
    color: palette.darkTeal,
    marginLeft: 12,
    marginBottom: 1,
  },
  experienceParagraph: {
    fontSize: 10.5,
    lineHeight: 1.5,
    fontWeight: 400,
    color: palette.darkTeal,
    marginTop: 2,
    marginBottom: 1,
  },
  keyEmphasis: {
    fontWeight: 700,
    color: palette.darkTeal,
  },
  categoryTitle: {
    fontSize: 10.1,
    fontWeight: 'bold',
    color: palette.bubblegumPink,
    marginTop: 10,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  educationItem: {
    marginBottom: 8,
    padding: '4 0 8 14',
    backgroundColor: palette.paper,
    borderBottom: `1 solid ${palette.light}`,
    borderLeft: `1 solid ${palette.goldenPollen}`,
  },
  educationTitle: {
    fontSize: 13.9,
    fontWeight: 800,
    color: palette.emerald,
    marginBottom: 2,
  },
  educationInstitution: {
    fontSize: 10,
    color: palette.darkTeal,
    marginBottom: 2,
    fontWeight: 400,
  },
  educationDates: {
    fontSize: 8.6,
    color: palette.darkTeal,
    fontStyle: 'italic',
    backgroundColor: palette.light,
    padding: '3px 8px',
    borderRadius: 3,
    alignSelf: 'flex-start',
  },
  competencyItem: {
    fontSize: 10.8,
    fontWeight: 400,
    color: palette.darkTeal,
    marginBottom: 9,
    marginLeft: 12,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  skillTag: {
    fontSize: 8.6,
    color: palette.darkTeal,
    backgroundColor: palette.light,
    padding: '4px 10px',
    marginRight: 6,
    marginBottom: 6,
    borderRadius: 12,
    border: `1 solid ${palette.oceanBlue}`,
  },
  pageBreak: {
    marginTop: 40,
    marginBottom: 10,
  },
  iconText: {
    fontSize: 15.3,
    fontWeight: 'bold',
    color: palette.bubblegumPink,
    marginRight: 8,
  },
  techBadgeWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2,
  },
  techBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.light,
    border: `1 solid ${palette.borderSoft}`,
    borderRadius: 6,
    padding: '3 7',
    marginRight: 5,
    marginBottom: 5,
  },
  techBadgeText: {
    fontSize: 9.8,
    fontWeight: 400,
    color: palette.darkTeal,
    marginLeft: 4,
  },
});

const techIconMap: Record<string, Icon | null> = {
  React: (simpleIcons as Record<string, Icon>).siReact,
  TypeScript: (simpleIcons as Record<string, Icon>).siTypescript,
  JavaScript: (simpleIcons as Record<string, Icon>).siJavascript,
  Redux: (simpleIcons as Record<string, Icon>).siRedux,
  Apollo: (simpleIcons as Record<string, Icon>).siApollographql,
  Zustand: null,
  MaterialUI: (simpleIcons as Record<string, Icon>).siMui,
  'Tailwind CSS': (simpleIcons as Record<string, Icon>).siTailwindcss,
  'Styled Components': (simpleIcons as Record<string, Icon>).siStyledcomponents,
  'CSS Modules': (simpleIcons as Record<string, Icon>).siCssmodules,
  Shadcn: (simpleIcons as Record<string, Icon>).siShadcnui,
  Webpack: (simpleIcons as Record<string, Icon>).siWebpack,
  Vite: (simpleIcons as Record<string, Icon>).siVite,
  ReactRouter: (simpleIcons as Record<string, Icon>).siReactrouter,
  HTML: (simpleIcons as Record<string, Icon>).siHtml5,
  CSS: (simpleIcons as Record<string, Icon>).siCss,
  'Node.js': (simpleIcons as Record<string, Icon>).siNodedotjs,
  PostgreSQL: (simpleIcons as Record<string, Icon>).siPostgresql,
  GraphQL: (simpleIcons as Record<string, Icon>).siGraphql,
  tRPC: (simpleIcons as Record<string, Icon>).siTrpc,
  Prisma: (simpleIcons as Record<string, Icon>).siPrisma,
  NextAuth: null,
  MongoDB: (simpleIcons as Record<string, Icon>).siMongodb,
  Redis: (simpleIcons as Record<string, Icon>).siRedis,
  Convex: (simpleIcons as Record<string, Icon>).siConvex,
  'REST APIs': null,
  WebSockets: null,
  Express: (simpleIcons as Record<string, Icon>).siExpress,
  Hono: (simpleIcons as Record<string, Icon>).siHono,
  Fastify: (simpleIcons as Record<string, Icon>).siFastify,
  'Next.js': (simpleIcons as Record<string, Icon>).siNextdotjs,
  'Geckos.io': null,
  Partykit: null,
  SQL: (simpleIcons as Record<string, Icon>).siPostgresql,
  AWS: null,
  Cloudflare: (simpleIcons as Record<string, Icon>).siCloudflare,
  Git: (simpleIcons as Record<string, Icon>).siGit,
  Docker: (simpleIcons as Record<string, Icon>).siDocker,
  Cypress: (simpleIcons as Record<string, Icon>).siCypress,
  Playwright: null,
  Jest: (simpleIcons as Record<string, Icon>).siJest,
  'React Testing Library': (simpleIcons as Record<string, Icon>).siTestinglibrary,
  Storybook: (simpleIcons as Record<string, Icon>).siStorybook,
  GitHub: (simpleIcons as Record<string, Icon>).siGithub,
  'GitHub Actions': (simpleIcons as Record<string, Icon>).siGithubactions,
  ESLint: (simpleIcons as Record<string, Icon>).siEslint,
  Prettier: (simpleIcons as Record<string, Icon>).siPrettier,
  'Claude Code': (simpleIcons as Record<string, Icon>).siClaude,
  Codex: null,
  Cursor: (simpleIcons as Record<string, Icon>).siCursor,
  Sentry: (simpleIcons as Record<string, Icon>).siSentry,
  'AI SDK': null,
  Figma: (simpleIcons as Record<string, Icon>).siFigma,
  Jira: (simpleIcons as Record<string, Icon>).siJira,
  Slack: null,
  'Agent Skills/MCPs': null,
  RAG: null,
  bun: (simpleIcons as Record<string, Icon>).siBun,
  pnpm: (simpleIcons as Record<string, Icon>).siPnpm,
  yarn: (simpleIcons as Record<string, Icon>).siYarn,
  npm: (simpleIcons as Record<string, Icon>).siNpm,
};

const frontendSkills = [
  'React', 'TypeScript', 'JavaScript', 'Redux', 'Apollo', 'Zustand', 'MaterialUI',
  'Tailwind CSS', 'Styled Components', 'CSS Modules', 'Shadcn', 'Webpack', 'Vite',
  'ReactRouter', 'HTML', 'CSS',
];

const backendSkills = [
  'Node.js', 'PostgreSQL', 'GraphQL', 'tRPC', 'Prisma', 'NextAuth', 'MongoDB', 'Redis',
  'Convex', 'REST APIs', 'Apollo', 'WebSockets', 'Express', 'Hono', 'Fastify', 'Next.js',
  'Geckos.io', 'Partykit', 'SQL', 'AWS', 'Cloudflare',
];

const toolsSkills = [
  'Git', 'Docker', 'Cypress', 'Playwright', 'Jest', 'React Testing Library',
  'GitHub', 'GitHub Actions', 'ESLint', 'Prettier', 'Claude Code', 'Codex', 'Cursor',
  'Sentry', 'AI SDK', 'Figma', 'Jira', 'Slack', 'Agent Skills/MCPs', 'RAG', 'bun',
  'pnpm', 'yarn', 'npm',
];

const TechBadge = ({ label }: { label: string }) => {
  const icon = techIconMap[label];

  if (!icon) {
    return React.createElement(
      View,
      { style: styles.techBadge },
      React.createElement(
        Svg,
        { width: 9, height: 9, viewBox: '0 0 24 24' },
        React.createElement(Circle, { cx: '12', cy: '12', r: '8', fill: palette.oceanBlue })
      ),
      React.createElement(Text, { style: styles.techBadgeText }, label)
    );
  }

  return React.createElement(
    View,
    { style: styles.techBadge },
    React.createElement(
      Svg,
      { width: 10, height: 10, viewBox: '0 0 24 24' },
      React.createElement(Path, { d: icon.path, fill: `#${icon.hex}` })
    ),
    React.createElement(Text, { style: styles.techBadgeText }, label)
  );
};

const renderSkillBadges = (skills: string[]) =>
  React.createElement(
    View,
    { style: styles.techBadgeWrap },
    ...skills.map((skill) => React.createElement(TechBadge, { key: skill, label: skill }))
  );

const EmailIcon = ({ size = 8, color = palette.oceanBlue }) => React.createElement(
  Svg,
  { width: size, height: size, viewBox: '0 0 24 24', style: { marginRight: 4 } },
  React.createElement(Path, { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', fill: color }),
  React.createElement(Path, { d: 'M22 6l-10 6L2 6', stroke: 'white', strokeWidth: '1.5', fill: 'none' })
);

const LinkIcon = ({ size = 8, color = palette.oceanBlue }) => React.createElement(
  Svg,
  { width: size, height: size, viewBox: '0 0 24 24', style: { marginRight: 4 } },
  React.createElement(Path, { d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', stroke: color, fill: 'none', strokeWidth: '2' }),
  React.createElement(Path, { d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71', stroke: color, fill: 'none', strokeWidth: '2' })
);

const GitHubIcon = ({ size = 8, color = palette.oceanBlue }) => React.createElement(
  Svg,
  { width: size, height: size, viewBox: '0 0 24 24', style: { marginRight: 4 } },
  React.createElement(Path, { d: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22', stroke: color, fill: 'none', strokeWidth: '2' })
);

const LocationIcon = ({ size = 8, color = palette.oceanBlue }) => React.createElement(
  Svg,
  { width: size, height: size, viewBox: '0 0 24 24', style: { marginRight: 4 } },
  React.createElement(Path, { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', stroke: color, fill: 'none', strokeWidth: '2' }),
  React.createElement(Circle, { cx: '12', cy: '10', r: '3', stroke: color, fill: 'none', strokeWidth: '2' })
);

const WorkIcon = ({ size = 12, color = palette.bubblegumPink }) => React.createElement(
  Svg,
  { width: size, height: size, viewBox: '0 0 24 24', style: { marginRight: 6, marginTop: -2 } },
  React.createElement(Path, { d: 'M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z', stroke: color, fill: 'none', strokeWidth: '2' }),
  React.createElement(Path, { d: 'M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', stroke: color, fill: 'none', strokeWidth: '2' })
);

const GraduationCapIcon = ({ size = 12, color = palette.bubblegumPink }) => React.createElement(
  Svg,
  { width: size, height: size, viewBox: '0 0 24 24', style: { marginRight: 6, marginTop: -2 } },
  React.createElement(Path, { d: 'M22 10v6M2 10l10 5 10-5', stroke: color, fill: 'none', strokeWidth: '2' }),
  React.createElement(Path, { d: 'M6 12v5c3 3 9 3 12 0v-5', stroke: color, fill: 'none', strokeWidth: '2' })
);

const ZapIcon = ({ size = 12, color = palette.bubblegumPink }) => React.createElement(
  Svg,
  { width: size, height: size, viewBox: '0 0 24 24', style: { marginRight: 6, marginTop: -2 } },
  React.createElement(Path, { d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', stroke: color, fill: 'none', strokeWidth: '2' })
);

const WrenchIcon = ({ size = 12, color = palette.bubblegumPink }) => React.createElement(
  Svg,
  { width: size, height: size, viewBox: '0 0 24 24', style: { marginRight: 6, marginTop: -2 } },
  React.createElement(Path, { d: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z', stroke: color, fill: 'none', strokeWidth: '2' })
);

const CV = () => React.createElement(
  Document,
  null,

  // PAGE 1: Header + Summary + Experience
  React.createElement(
    Page,
    { size: 'A4', style: styles.page },

    React.createElement(
      View,
      { style: styles.header },
      React.createElement(View, { style: styles.headerRule }),
      React.createElement(
        View,
        { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' } },
        React.createElement(
          View,
          { style: { flex: 1, paddingRight: 16 } },
          React.createElement(Text, { style: styles.name }, 'Carlos Santisteban'),
          React.createElement(
            Text,
            { style: styles.title },
            'Fullstack Engineer ',
            React.createElement(Text, { style: styles.titleSoft }, 'with focus on'),
            ' Frontend'
          )
        ),
        React.createElement(
          View,
          { style: { marginTop: 3, alignItems: 'flex-end' } },
          React.createElement(
            View,
            { style: { flexDirection: 'row', marginBottom: 12 } },
            React.createElement(LinkIcon, { size: 12, color: palette.goldenPollen }),
            React.createElement(Link, { src: 'https://carlos.santisteban.site', style: { fontSize: 12, fontWeight: 700, color: palette.goldenPollen } }, 'carlos.santisteban.site')
          ),
          React.createElement(
            View,
            { style: { flexDirection: 'row', marginBottom: 4 } },
            React.createElement(EmailIcon, { size: 10, color: palette.oceanBlue }),
            React.createElement(Text, { style: { fontSize: 9, color: palette.darkTeal } }, 'carlos.santisteban@outlook.com')
          ),
          React.createElement(
            View,
            { style: { flexDirection: 'row', marginBottom: 4 } },
            React.createElement(GitHubIcon, { size: 10, color: palette.oceanBlue }),
            React.createElement(Link, { src: 'https://github.com/santistebanc', style: { fontSize: 9, color: palette.oceanBlue } }, 'github.com/santistebanc')
          ),
          React.createElement(
            View,
            { style: { flexDirection: 'row', marginBottom: 4 } },
            React.createElement(LocationIcon, { size: 10, color: palette.oceanBlue }),
            React.createElement(Text, { style: { fontSize: 9, color: palette.darkTeal } }, 'Berlin, Germany')
          ),
          React.createElement(
            Text,
            { style: { fontSize: 9, color: palette.oceanBlue } },
            'Mexican & Spanish (full EU citizen)'
          )
        )
      )
    ),

    React.createElement(
      View,
      { style: { marginTop: 6, marginBottom: 2 } },
      React.createElement(
        Text,
        { style: styles.summaryText },
        'Software engineer with 8+ years of experience in web development, primarily with JavaScript/TypeScript and React. ' +
        'Web development is both my profession and hobby — I\'m genuinely passionate about building functional, good-looking applications with solid UX. ' +
        'I keep up with the latest tools and have been actively using AI-assisted development to work more productively, ' +
        'while maintaining good software fundamentals. Always learning, always experimenting.'
      )
    ),

    React.createElement(
      View,
      { style: { ...styles.section, marginTop: 7, marginBottom: 3 } },
      React.createElement(
        View,
        { style: styles.sectionHeader },
        React.createElement(WorkIcon, { size: 14 }),
        React.createElement(Text, { style: styles.sectionTitle }, 'PROFESSIONAL EXPERIENCE')
      ),

      React.createElement(
        View,
        { style: { ...styles.jobBlock, marginBottom: 10, paddingBottom: 2 } },
        React.createElement(
          View,
          { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 } },
          React.createElement(Text, { style: styles.companyName }, 'Lingoda — Software Engineer'),
          React.createElement(
            View,
            { style: { flexDirection: 'row', alignItems: 'center' } },
            React.createElement(Text, { style: styles.locationMeta }, 'Berlin'),
            React.createElement(Text, { style: { marginLeft: 6, color: palette.oceanBlue } }, '•'),
            React.createElement(Text, { style: { ...styles.dateRange, marginLeft: 6 } }, 'Jun 2021 – Mar 2025')
          )
        ),
        React.createElement(
          Text,
          { style: styles.experienceParagraph },
          'Worked on a language learning platform at a Berlin startup, building interactive practice features including quizzes and flashcards, developing frontend experiences with ',
          React.createElement(Text, { style: styles.keyEmphasis }, 'React and TypeScript'),
          ', implementing UI with ',
          React.createElement(Text, { style: styles.keyEmphasis }, 'MaterialUI'),
          ', and contributing to ',
          React.createElement(Text, { style: styles.keyEmphasis }, 'GraphQL state management with Apollo'),
          ' while collaborating with cross-functional teams and backend services built on ',
          React.createElement(Text, { style: styles.keyEmphasis }, 'NestJS and PostgreSQL'),
          '.'
        )
      ),

      React.createElement(
        View,
        { style: { ...styles.jobBlock, marginBottom: 10, paddingBottom: 2 } },
        React.createElement(
          View,
          { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 } },
          React.createElement(Text, { style: styles.companyName }, 'Quandoo — Software Engineer'),
          React.createElement(
            View,
            { style: { flexDirection: 'row', alignItems: 'center' } },
            React.createElement(Text, { style: styles.locationMeta }, 'Berlin'),
            React.createElement(Text, { style: { marginLeft: 6, color: palette.oceanBlue } }, '•'),
            React.createElement(Text, { style: { ...styles.dateRange, marginLeft: 6 } }, 'Sep 2017 – Jan 2021')
          )
        ),
        React.createElement(
          Text,
          { style: styles.experienceParagraph },
          'Contributed across multiple teams on a restaurant reservation platform, building advanced ',
          React.createElement(Text, { style: styles.keyEmphasis }, 'UI components'),
          ' such as interactive carousels and responsive layouts, implementing ',
          React.createElement(Text, { style: styles.keyEmphasis }, 'SEO improvements with server-side rendering'),
          ', developing scalable features with ',
          React.createElement(Text, { style: styles.keyEmphasis }, 'React and Redux'),
          ', and creating reusable components with ',
          React.createElement(Text, { style: styles.keyEmphasis }, 'Styled Components'),
          ' to improve overall user experience.'
        )
      ),

      React.createElement(
        View,
        { style: { ...styles.jobBlock, marginBottom: 10, paddingBottom: 2 } },
        React.createElement(
          View,
          { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 } },
          React.createElement(Text, { style: styles.companyName }, 'Market Logic Software — Web Developer'),
          React.createElement(
            View,
            { style: { flexDirection: 'row', alignItems: 'center' } },
            React.createElement(Text, { style: styles.locationMeta }, 'Berlin'),
            React.createElement(Text, { style: { marginLeft: 6, color: palette.oceanBlue } }, '•'),
            React.createElement(Text, { style: { ...styles.dateRange, marginLeft: 6 } }, 'Mar 2016 – Jul 2016')
          )
        ),
        React.createElement(
          Text,
          { style: styles.experienceParagraph },
          'Worked on advanced ',
          React.createElement(Text, { style: styles.keyEmphasis }, 'UI components for data visualization'),
          ', creating interactive graphs with ',
          React.createElement(Text, { style: styles.keyEmphasis }, 'React and D3.js'),
          ', developing dynamic widgets for data representation, and focusing on intuitive user interfaces.'
        )
      ),

      React.createElement(
        View,
        { style: { ...styles.jobBlock, marginBottom: 10, paddingBottom: 2 } },
        React.createElement(
          View,
          { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 } },
          React.createElement(Text, { style: styles.companyName }, 'AISA — Software Developer'),
          React.createElement(
            View,
            { style: { flexDirection: 'row', alignItems: 'center' } },
            React.createElement(Text, { style: styles.locationMeta }, 'Mexico'),
            React.createElement(Text, { style: { marginLeft: 6, color: palette.oceanBlue } }, '•'),
            React.createElement(Text, { style: { ...styles.dateRange, marginLeft: 6 } }, 'Apr 2015 – Jun 2015')
          )
        ),
        React.createElement(
          Text,
          { style: styles.experienceParagraph },
          'Contributed to ',
          React.createElement(Text, { style: styles.keyEmphasis }, 'legal document management systems'),
          ' for government institutions, designing and programming UI forms and controls in ',
          React.createElement(Text, { style: styles.keyEmphasis }, 'Windows Presentation Foundation (WPF)'),
          ', developing applications with ',
          React.createElement(Text, { style: styles.keyEmphasis }, 'C#'),
          ', working with large ',
          React.createElement(Text, { style: styles.keyEmphasis }, 'SQL databases'),
          ', and collaborating on institution-wide management systems.'
        )
      )
    ),

    React.createElement(
      View,
      { style: { marginTop: 5 } },
      React.createElement(
        View,
        { style: styles.sectionHeader },
        React.createElement(GraduationCapIcon, { size: 14 }),
        React.createElement(Text, { style: styles.sectionTitle }, 'EDUCATION')
      ),
      React.createElement(
        View,
        { style: styles.educationItem },
        React.createElement(
          View,
          { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 } },
          React.createElement(Text, { style: styles.educationTitle }, 'Bachelor of IT Engineering'),
          React.createElement(Text, { style: styles.dateRange }, 'Aug 2012 – May 2017')
        ),
        React.createElement(Text, { style: styles.educationInstitution }, 'Tecnológico de Monterrey, Mexico'),
        React.createElement(
          Text,
          { style: { ...styles.experienceParagraph, marginBottom: 0 } },
          'Comprehensive studies covering ',
          React.createElement(Text, { style: styles.keyEmphasis }, 'Object-Oriented Programming'),
          ', ',
          React.createElement(Text, { style: styles.keyEmphasis }, 'Data Structures'),
          ', Databases, Networks, Servers and Operating Systems, ',
          React.createElement(Text, { style: styles.keyEmphasis }, 'IT Security'),
          ', and ',
          React.createElement(Text, { style: styles.keyEmphasis }, 'Cloud Computing'),
          '.'
        )
      )
    )
  ),

  // PAGE 2: Skills + Competencies
  React.createElement(
    Page,
    { size: 'A4', style: styles.page },

    React.createElement(
      View,
      { style: styles.compactHeader },
      React.createElement(View, { style: styles.headerRule }),
      React.createElement(
        View,
        { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } },
        React.createElement(Text, { style: { fontSize: 15, fontWeight: 600, color: palette.darkTeal } }, 'Carlos Santisteban'),
        React.createElement(Text, { style: { fontSize: 10, color: palette.oceanBlue, fontWeight: 'bold' } }, 'Skills & Competencies')
      )
    ),

    React.createElement(
      View,
      { style: { ...styles.section, marginTop: 8, marginBottom: 6 } },
      React.createElement(
        View,
        { style: styles.sectionHeader },
        React.createElement(WrenchIcon, { size: 14 }),
        React.createElement(Text, { style: styles.sectionTitle }, 'TECHNICAL SKILLS')
      ),
      React.createElement(
        View,
        { style: { marginTop: 6 } },
        React.createElement(
          View,
          { style: { marginBottom: 8, paddingBottom: 6, borderBottom: `1 solid ${palette.light}` } },
          React.createElement(Text, { style: { fontSize: 9.3, fontWeight: 'bold', color: palette.oceanBlue, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 } }, 'Frontend'),
          renderSkillBadges(frontendSkills)
        ),
        React.createElement(
          View,
          { style: { marginBottom: 8, paddingBottom: 6, borderBottom: `1 solid ${palette.light}` } },
          React.createElement(Text, { style: { fontSize: 9.3, fontWeight: 'bold', color: palette.oceanBlue, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 } }, 'Backend & Data'),
          renderSkillBadges(backendSkills)
        ),
        React.createElement(
          View,
          { style: { marginBottom: 2 } },
          React.createElement(Text, { style: { fontSize: 9.3, fontWeight: 'bold', color: palette.oceanBlue, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 } }, 'Tools & Practices'),
          renderSkillBadges(toolsSkills)
        )
      )
    ),

    React.createElement(
      View,
      { style: { ...styles.section, marginTop: 10, marginBottom: 6 } },
      React.createElement(
        View,
        { style: styles.sectionHeader },
        React.createElement(ZapIcon, { size: 14 }),
        React.createElement(Text, { style: styles.sectionTitle }, 'CORE COMPETENCIES')
      ),
      React.createElement(
        View,
        { style: { flexDirection: 'row', marginTop: 10 } },
        React.createElement(
          View,
          { style: { flex: 1, paddingRight: 10 } },
          React.createElement(Text, { style: styles.competencyItem }, '• Routing and State Management'),
          React.createElement(Text, { style: styles.competencyItem }, '• API Design'),
          React.createElement(Text, { style: styles.competencyItem }, '• Responsive Design & UX/UI'),
          React.createElement(Text, { style: styles.competencyItem }, '• AI-Assisted Development'),
          React.createElement(Text, { style: styles.competencyItem }, '• Unit Testing & CI/CD'),
          React.createElement(Text, { style: styles.competencyItem }, '• Code Quality & Code Reviews'),
          React.createElement(Text, { style: styles.competencyItem }, '• Performance Optimization'),
          React.createElement(Text, { style: styles.competencyItem }, '• Server-Side Rendering (SSR)')
        ),
        React.createElement(
          View,
          { style: { flex: 1, paddingLeft: 10 } },
          React.createElement(Text, { style: styles.competencyItem }, '• Debugging and Troubleshooting'),
          React.createElement(Text, { style: styles.competencyItem }, '• Code Splitting and Lazy Loading'),
          React.createElement(Text, { style: styles.competencyItem }, '• Web Vitals and Lighthouse'),
          React.createElement(Text, { style: styles.competencyItem }, '• SEO Optimization'),
          React.createElement(Text, { style: styles.competencyItem }, '• Client-Server Interaction'),
          React.createElement(Text, { style: styles.competencyItem }, '• Documentation'),
          React.createElement(Text, { style: styles.competencyItem }, '• Cross-Functional Team Collaboration'),
          React.createElement(Text, { style: styles.competencyItem }, '• Agile Methodology')
        )
      )
    )
  )
);

export default CV;
