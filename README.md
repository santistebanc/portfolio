# Carlos Santisteban ? Portfolio

Public site: https://carlos.santisteban.site

One React/TypeScript app, using the selected Web design engineer (Wayfinding) design. Career Desk is a separate private repository: https://github.com/santistebanc/career-desk. This repo contains no career dashboard, interview tools, private profile data or alternative app versions.

## Develop and check

Requires Node 22.12+.

```powershell
npm ci
npm run dev
npm test
npm run check:public
npm run build
```

- `src/App.tsx` assembles the single homepage.
- `src/content.ts` contains presentation copy, section navigation and the two public CV links.
- `src/data/projects.ts` contains public project, skill and experience records.
- `src/styles.css` and `src/Tweaks.tsx` provide the Wayfinding theme and visitor preferences.
- `public/` contains only reviewed assets, one English CV and one German CV.
- `tools/` validates public files and imports reviewed career exports; it does not read private facts.

All project screenshots are local. The page loads Archivo and JetBrains Mono from Google Fonts, with system fallbacks. Public files are explicitly allowlisted in `public-files.json`; adding an asset requires updating that list.

## Import an approved Career Desk release

In the private career-desk checkout, review and approve the exact text, then export a current release:

```powershell
npm run career:cli -- bundle --id release_ID --out exports/public-release
```

In this public checkout:

```powershell
npm run import:career -- ../career-desk/exports/public-release
# Review the destination and its reported current hash before applying:
npm run import:career -- ../career-desk/exports/public-release --apply --expected-current HASH_OR_missing
git diff
npm test
npm run check:public
npm run build
```

The importer rejects private metadata, extra files, symlinks and hash mismatches. It never commits, pushes or deploys. Export hashes verify integrity, not a digital signature of approval: import only the bundle you intentionally exported.

English CV channels replace `/Carlos_Santisteban_CV.pdf`; the German channel replaces `/Carlos_Santisteban_CV_DE.pdf`. A portfolio narrative export writes `/career/portfolio.html`, independently of the homepage presentation and project case studies. No public build needs the private repo, the career store or credentials for either.

## Deployment

A push to `main` runs tests, the public-file check and the production build, then deploys `dist/` to GitHub Pages. Pull requests run the same checks without deploying. CVs are imported public artifacts; the site build does not generate them or modify source files.
