# Carlos Santisteban — Portfolio

Public site: https://carlos.santisteban.site

A single-page React/TypeScript site with the "Wayfinding" design.

## Develop

Requires Node 22.12+.

```sh
npm ci
npm run dev           # local dev server
npm test              # tool tests
npm run check:public  # only allowlisted files in public/
npm run build
```

| Path | What it holds |
|---|---|
| `src/App.tsx` | The homepage |
| `src/base-content.ts`, `src/data/projects.ts` | Copy, projects, skills and experience |
| `src/career-content.json` | Reviewed copy overrides, merged by `src/content.ts` |
| `src/styles.css`, `src/Tweaks.tsx` | Theme and visitor preferences |
| `public/` | Reviewed assets and the English CV; listed in `public-files.json` |
| `tools/` | Public-file check and the content importer |

Content updates arrive as a reviewed export and go through `npm run import:career -- <export-dir>`. The importer rejects unexpected files and hash mismatches, and never commits or deploys.

## Deploy

A push to `main` runs the tests, the public-file check and the build, then deploys `dist/` to GitHub Pages. Pull requests run the same checks without deploying.
