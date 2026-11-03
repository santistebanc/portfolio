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
- `src/content.ts` merges approved Career Desk overrides from `src/career-content.json` with the existing presentation in `src/base-content.ts`. Section navigation and the default English CV link stay with the portfolio.
- `src/data/projects.ts` contains public project, skill and experience records.
- `src/styles.css` and `src/Tweaks.tsx` provide the Wayfinding theme and visitor preferences.
- `public/` contains only reviewed assets and one English CV (currently the Product Engineer CV).
- `tools/` validates public files and imports reviewed career exports; it does not read private facts.

All project screenshots are local. The page loads Archivo and JetBrains Mono from Google Fonts, with system fallbacks. Public files are explicitly allowlisted in `public-files.json`; adding an asset requires updating that list.

## Career Desk content

Career Desk v2 is agent-first and maintains a separate private profile. Agents save a versioned portfolio document there with exact public content overrides, inspect the destination, obtain exact-content approval, then apply using the observed destination hash. The resulting `src/career-content.json` changes homepage wording without importing private profile data or changing the design. Its initial empty object preserves the entire existing page. Arrays replace a section's list; object sections merge with the baseline. Review with `git diff`, tests, the public-file check and the production build. Publication through Career Desk never commits, pushes or deploys.

English CV publication targets `public/Carlos_Santisteban_CV.pdf` (published from Career Desk with `primary: true`, currently the Product Engineer CV). The public-file check would also accept extra English variants under `public/cv/`, but none are published. Other-language documents remain private. The public build never reads the private Career Desk store. See the private app's agent CLI `schema` for `document.save`, `publication.inspect`, `document.approve` and `publication.apply`.

### Legacy bundle imports

The old bundle importer remains available for already exported v1 bundles. In this public checkout:

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

English CV channels replace `/Carlos_Santisteban_CV.pdf`. German CVs remain private in Career Desk and are rejected by the public importer. A portfolio narrative export writes `/career/portfolio.html`, independently of the homepage presentation and project case studies. No public build needs the private repo, the career store or credentials for either.

## Deployment

A push to `main` runs tests, the public-file check and the production build, then deploys `dist/` to GitHub Pages. Pull requests run the same checks without deploying. CVs are imported public artifacts; the site build does not generate them or modify source files.
