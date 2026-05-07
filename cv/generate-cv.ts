import { renderToFile } from '@react-pdf/renderer';
import React from 'react';
import path from 'path';
import { fileURLToPath } from 'url';
import CV from './cv-component';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generatePDF() {
  const outputPath = path.join(__dirname, '..', 'public', 'Carlos_Santisteban_CV.pdf');
  console.log('Generating CV PDF...');
  await renderToFile(React.createElement(CV), outputPath);
  console.log(`✓ CV generated: ${outputPath}`);
}

generatePDF().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
