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
