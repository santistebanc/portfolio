import {
  siReact, siTypescript, siJavascript, siTailwindcss, siRedux, siVite, siNextdotjs, siCss,
  siNodedotjs, siPostgresql, siGraphql, siTrpc, siPrisma, siHono, siExpress, siMongodb, siRedis,
  siBun, siCloudflare, siDocker, siGithubactions, siGit, siCypress, siJest, siStorybook,
  siFigma, siClaude, siCursor, siSentry, siWebpack, siUnity, siNpm, siApollographql,
} from 'simple-icons'

const iconMap: Record<string, { path: string }> = {
  React: siReact,
  'React 19': siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Tailwind: siTailwindcss,
  'Tailwind CSS': siTailwindcss,
  'Tailwind v4': siTailwindcss,
  Redux: siRedux,
  Vite: siVite,
  'Vite 8': siVite,
  'Next.js': siNextdotjs,
  CSS: siCss,
  'Node.js': siNodedotjs,
  PostgreSQL: siPostgresql,
  GraphQL: siGraphql,
  tRPC: siTrpc,
  Prisma: siPrisma,
  Hono: siHono,
  Express: siExpress,
  MongoDB: siMongodb,
  Redis: siRedis,
  Bun: siBun,
  Cloudflare: siCloudflare,
  Docker: siDocker,
  'GitHub Actions': siGithubactions,
  Git: siGit,
  Cypress: siCypress,
  Jest: siJest,
  Storybook: siStorybook,
  Figma: siFigma,
  'Claude Code': siClaude,
  Cursor: siCursor,
  Sentry: siSentry,
  Webpack: siWebpack,
  Unity: siUnity,
  npm: siNpm,
  Apollo: siApollographql,
}

export function TechIcon({ name, size = 12 }: { name: string; size?: number }) {
  const icon = iconMap[name]
  if (!icon) return null
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  )
}
