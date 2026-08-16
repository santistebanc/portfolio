import { renderToFile } from '@react-pdf/renderer';
import React from 'react';
import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import CV, { cvVariants, type CVVariantKey } from './cv-component';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generatePDF() {
  const publicDir = path.join(__dirname, '..', 'public');
  const distDir = path.join(__dirname, '..', 'dist');
  const variantKeys = Object.keys(cvVariants) as CVVariantKey[];

  console.log('Generating CV PDFs...');

  await mkdir(publicDir, { recursive: true });
  await mkdir(distDir, { recursive: true });

  for (const variant of variantKeys) {
    const outputPath = path.join(publicDir, cvVariants[variant].filename);
    await renderToFile(React.createElement(CV, { variant }), outputPath);
    console.log(`✓ ${cvVariants[variant].label}: ${outputPath}`);
  }

  const defaultOutputPath = path.join(publicDir, 'Carlos_Santisteban_CV.pdf');
  await renderToFile(React.createElement(CV, { variant: 'software' }), defaultOutputPath);
  console.log(`✓ Default CV: ${defaultOutputPath}`);

  for (const variant of variantKeys) {
    const outputPath = path.join(distDir, cvVariants[variant].filename);
    await renderToFile(React.createElement(CV, { variant }), outputPath);
    console.log(`✓ ${cvVariants[variant].label} dist copy: ${outputPath}`);
  }
}

generatePDF().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
