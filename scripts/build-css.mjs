/**
 * Dhaka College International Hall - CSS Builder & Bundler
 * Compiles modular CSS files into a high-performance production stylesheet.
 * Standard Node.js ES Module (Zero external dependencies)
 */

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const cssDir = path.join(root, 'css');

const CSS_MODULES = [
  { file: 'variables.css', title: '1. Variables & Design Tokens' },
  { file: 'base.css', title: '2. Global Base Reset & Typography' },
  { file: 'layout.css', title: '3. Layout, Navbar & Footer' },
  { file: 'components/buttons.css', title: '4. Buttons & Interactive Controls' },
  { file: 'components/cards.css', title: '5. Student Cards & Batch Headers' },
  { file: 'components/modals.css', title: '6. Modals, Drawers & Lightboxes' },
  { file: 'pages/home.css', title: '7. Homepage Hero & Preview' },
  { file: 'pages/results.css', title: '8. Academic Results & Exam Cards' },
  { file: 'pages/pages.css', title: '9. Clubs, Socials, Gallery & Birthday Pages' },
  { file: 'pages/roommates.css', title: '10. Roommate Grids & Parallel Views' },
];

async function buildCss() {
  console.log('Compiling modular CSS files into css/style.css...');
  let combined = `/**
 * Dhaka College International Hall - Master Design System
 * Compiled Production Stylesheet (v8.4)
 * Generated automatically from modular CSS sources.
 */\n\n`;

  let totalRules = 0;

  for (const mod of CSS_MODULES) {
    const fullPath = path.join(cssDir, mod.file);
    if (!existsSync(fullPath)) {
      console.error(`Error: Module file not found: ${mod.file}`);
      process.exit(1);
    }

    let content = await readFile(fullPath, 'utf8');

    // Strip top comment banner if it exists
    content = content.replace(/^\/\*\*[\s\S]*?\*\/\s*/, '');

    combined += `/* ==========================================================================\n`;
    combined += `   ${mod.title} (css/${mod.file})\n`;
    combined += `   ========================================================================== */\n\n`;
    combined += content.trim() + '\n\n';

    const opens = (content.match(/\{/g) || []).length;
    totalRules += opens;
  }

  const outputPath = path.join(cssDir, 'style.css');
  await writeFile(outputPath, combined, 'utf8');

  const sizeKb = (Buffer.byteLength(combined, 'utf8') / 1024).toFixed(1);
  console.log(`Successfully compiled css/style.css (${sizeKb} KB, ~${totalRules} rule blocks across ${CSS_MODULES.length} modules).`);
}

buildCss().catch(err => {
  console.error('CSS Build Failed:', err);
  process.exit(1);
});
