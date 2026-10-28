import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'client');
export default defineConfig({ root, plugins: [react()], publicDir: false,
  build: { outDir: '../dist', emptyOutDir: true, sourcemap: false } });
