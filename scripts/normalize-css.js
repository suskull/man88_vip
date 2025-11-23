#!/usr/bin/env node

/**
 * Normalize CSS file by removing Vue.js scoped CSS attributes
 *
 * This script removes [data-v-*] attributes from the cloned CSS file
 * to make it usable in a React application.
 *
 * Usage: node scripts/normalize-css.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, '../clone-src/app.e55b041b.css');
const OUTPUT_FILE = path.join(__dirname, '../src/styles/app.css');

console.log('🔧 Normalizing CSS file...');
console.log(`📂 Input: ${INPUT_FILE}`);
console.log(`📂 Output: ${OUTPUT_FILE}`);

// Read the CSS file
let css = fs.readFileSync(INPUT_FILE, 'utf8');

// Count original occurrences
const originalDataVCount = (css.match(/\[data-v-[a-f0-9]+\]/g) || []).length;
console.log(`\n📊 Found ${originalDataVCount} Vue scoped attributes to remove`);

// Remove all [data-v-*] attributes
// This regex matches [data-v-XXXXXXXX] where X is a hex character
css = css.replace(/\[data-v-[a-f0-9]+\]/g, '');

// Clean up multiple spaces that might result from removal
css = css.replace(/  +/g, ' ');

// Clean up empty selectors (lines that are just commas or spaces)
css = css.replace(/^[\s,]+$/gm, '');

// Clean up duplicate commas in selectors
css = css.replace(/,\s*,/g, ',');

// Clean up trailing commas before opening braces
css = css.replace(/,\s*\{/g, ' {');

// Clean up leading commas in selectors
css = css.replace(/^\s*,/gm, '');

// Verify removal
const remainingDataVCount = (css.match(/\[data-v-[a-f0-9]+\]/g) || []).length;

if (remainingDataVCount > 0) {
  console.warn(`⚠️  Warning: ${remainingDataVCount} Vue scoped attributes still remain`);
} else {
  console.log('✅ All Vue scoped attributes removed successfully');
}

// Create output directory if it doesn't exist
const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`📁 Created directory: ${outputDir}`);
}

// Write the normalized CSS
fs.writeFileSync(OUTPUT_FILE, css, 'utf8');

// Get file sizes
const inputSize = fs.statSync(INPUT_FILE).size;
const outputSize = fs.statSync(OUTPUT_FILE).size;
const reduction = ((inputSize - outputSize) / inputSize * 100).toFixed(2);

console.log(`\n📊 File size comparison:`);
console.log(`   Original: ${(inputSize / 1024).toFixed(2)} KB`);
console.log(`   Normalized: ${(outputSize / 1024).toFixed(2)} KB`);
console.log(`   Reduction: ${reduction}%`);

console.log('\n✅ CSS normalization complete!');
console.log(`\n💡 Next steps:`);
console.log(`   1. Import the normalized CSS in your app: import '../styles/app.css'`);
console.log(`   2. After all tasks are complete, run the CSS purge script to remove unused classes`);

