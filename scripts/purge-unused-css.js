#!/usr/bin/env node

/**
 * Purge unused CSS classes from the normalized CSS file
 *
 * This script analyzes all TypeScript/TSX files in the src directory
 * and removes CSS classes that are not used in the codebase.
 *
 * Usage: node scripts/purge-unused-css.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import postcss from 'postcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSS_FILE = path.join(__dirname, '../src/styles/app.css');
const SRC_DIR = path.join(__dirname, '../src');

console.log('🔍 Analyzing codebase for CSS class usage...');

// Read the CSS file
let css = fs.readFileSync(CSS_FILE, 'utf8');

// Extract all class names from CSS
const classRegex = /\.([a-zA-Z0-9_-]+)(?=[^}]*\{)/g;
const allClasses = new Set();
let match;

while ((match = classRegex.exec(css)) !== null) {
  allClasses.add(match[1]);
}

console.log(`📊 Found ${allClasses.size} unique CSS classes in stylesheet`);

// Find all TypeScript/TSX files
const files = glob.sync('**/*.{ts,tsx}', {
  cwd: SRC_DIR,
  absolute: true,
  ignore: ['**/*.test.ts', '**/*.test.tsx', '**/node_modules/**']
});

console.log(`📂 Scanning ${files.length} source files...`);

// Read all source files and find used classes
const usedClasses = new Set();

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // Find className="..." and className={...}
  const classNameRegex = /className\s*=\s*["'`]([^"'`]+)["'`]/g;
  const classNameTemplateRegex = /className\s*=\s*\{[^}]*["'`]([^"'`]+)["'`][^}]*\}/g;

  // Also find classes in template literals with ${...}
  const templateLiteralRegex = /className\s*=\s*\{`([^`]*)`\}/g;

  // Find classes in ternary expressions: className={condition ? 'class1' : 'class2'}
  const ternaryRegex = /className\s*=\s*\{[^}]*\?\s*["'`]([^"'`]+)["'`]\s*:\s*["'`]([^"'`]+)["'`][^}]*\}/g;

  let match;
  while ((match = classNameRegex.exec(content)) !== null) {
    const classes = match[1].split(/\s+/);
    classes.forEach(cls => {
      if (cls && allClasses.has(cls)) {
        usedClasses.add(cls);
      }
    });
  }

  while ((match = classNameTemplateRegex.exec(content)) !== null) {
    const classes = match[1].split(/\s+/);
    classes.forEach(cls => {
      if (cls && allClasses.has(cls)) {
        usedClasses.add(cls);
      }
    });
  }

  while ((match = templateLiteralRegex.exec(content)) !== null) {
    // Extract static parts from template literal (ignore ${...} parts)
    const staticParts = match[1].split(/\$\{[^}]+\}/);
    staticParts.forEach(part => {
      const classes = part.split(/\s+/);
      classes.forEach(cls => {
        if (cls && allClasses.has(cls)) {
          usedClasses.add(cls);
        }
      });
    });
  }

  while ((match = ternaryRegex.exec(content)) !== null) {
    // Extract both sides of ternary
    const classes1 = match[1].split(/\s+/);
    const classes2 = match[2].split(/\s+/);
    [...classes1, ...classes2].forEach(cls => {
      if (cls && allClasses.has(cls)) {
        usedClasses.add(cls);
      }
    });
  }
});

console.log(`✅ Found ${usedClasses.size} classes used in codebase`);

// Calculate unused classes
const unusedClasses = new Set([...allClasses].filter(cls => !usedClasses.has(cls)));
console.log(`🗑️  Found ${unusedClasses.size} unused classes`);

if (unusedClasses.size === 0) {
  console.log('\n✅ No unused classes found! CSS is already optimized.');
  process.exit(0);
}

// Show sample of unused classes
if (unusedClasses.size > 0) {
  const sample = [...unusedClasses].slice(0, 10);
  console.log(`\n📋 Sample of unused classes (showing ${sample.length} of ${unusedClasses.size}):`);
  sample.forEach(cls => console.log(`   - ${cls}`));
  if (unusedClasses.size > 10) {
    console.log(`   ... and ${unusedClasses.size - 10} more`);
  }
}

// Ask for confirmation (in a real scenario, you'd use a prompt library)
console.log(`\n⚠️  This will remove ${unusedClasses.size} unused CSS classes.`);
console.log(`💡 To proceed, set PURGE_CSS=true environment variable`);

if (process.env.PURGE_CSS !== 'true') {
  console.log('\n❌ Purge cancelled. Run with PURGE_CSS=true to proceed.');
  console.log('   Example: PURGE_CSS=true node scripts/purge-unused-css.js');
  process.exit(0);
}

// Remove unused classes from CSS using PostCSS
console.log('\n🔧 Removing unused classes using PostCSS...');

// Parse CSS with PostCSS
const root = postcss.parse(css);

// Walk through all rules and remove unused ones
root.walkRules(rule => {
  // Get all selectors for this rule
  const selectors = rule.selector.split(',').map(s => s.trim());

  // Filter out selectors that only contain unused classes
  const keptSelectors = selectors.filter(selector => {
    // Extract class names from this selector
    const classMatches = selector.match(/\.([a-zA-Z0-9_-]+)/g);

    if (!classMatches) {
      // Keep selectors without class names (element selectors, IDs, etc.)
      return true;
    }

    // Check if any class in this selector is used
    const hasUsedClass = classMatches.some(classMatch => {
      const className = classMatch.substring(1); // Remove the dot
      return usedClasses.has(className);
    });

    return hasUsedClass;
  });

  if (keptSelectors.length === 0) {
    // Remove the entire rule if no selectors are kept
    rule.remove();
  } else if (keptSelectors.length < selectors.length) {
    // Update the selector list if some were removed
    rule.selector = keptSelectors.join(', ');
  }
});

// Remove empty at-rules (media queries, etc.)
root.walkAtRules(atRule => {
  if (atRule.nodes && atRule.nodes.length === 0) {
    atRule.remove();
  }
});

// Convert back to string
css = root.toString();

// Write the purged CSS
const backupFile = CSS_FILE.replace('.css', '.backup.css');
fs.writeFileSync(backupFile, fs.readFileSync(CSS_FILE, 'utf8'));
console.log(`💾 Backup created: ${backupFile}`);

fs.writeFileSync(CSS_FILE, css, 'utf8');

// Get file sizes
const originalSize = fs.statSync(backupFile).size;
const purgedSize = fs.statSync(CSS_FILE).size;
const reduction = ((originalSize - purgedSize) / originalSize * 100).toFixed(2);

console.log(`\n📊 File size comparison:`);
console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB`);
console.log(`   Purged: ${(purgedSize / 1024).toFixed(2)} KB`);
console.log(`   Reduction: ${reduction}%`);

console.log('\n✅ CSS purge complete!');
console.log(`\n💡 If something breaks, restore from: ${backupFile}`);

