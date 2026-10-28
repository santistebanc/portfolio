# Carlos Santisteban — Portfolio

🌐 **Live site: [carlos.santisteban.site](https://carlos.santisteban.site)**

Personal portfolio site built with React, TypeScript, and Vite. Deployed to GitHub Pages.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **@react-pdf/renderer** for CV generation
- **simple-icons** for tech badge icons

## Development

```bash
npm install
npm run dev
```

## CV Generation

The CV PDF is generated at build time and served statically:

```bash
npm run generate-cv
```

Output: `public/Carlos_Santisteban_CV.pdf`

## Build & Deploy

```bash
npm run build   # generates CV, then compiles and bundles
```

Deployed via GitHub Pages. The `build` script runs `generate-cv` automatically so the PDF is always up to date.

## Consolidated work

`main` contains the current portfolio, CV generator, career profile tools, and design alternatives. The deployed homepage uses `src/`; alternative designs remain in `redesigns/` and are not included in the normal production build.

- `redesigns/saved-wip/` preserves the publishable source and assets from the former `redesign-wip` branch (`c470913`). Its CV and package files are a historical snapshot.
- The other directories in `redesigns/` preserve the five independent design explorations.
- `tools/profile-builder/` and `tools/career-dashboard/` document the private career workflow.
- `reports/` and `research_notes/` retain the career tooling research.

Private notes, interview state, temporary files, and Jobcenter documents are excluded from version control. Jobcenter files are stored separately in the user's Documents folder.

Validation: `npm run test:profile`, `npm run test:career`, `npm run build`, and `npm run career:build`.
