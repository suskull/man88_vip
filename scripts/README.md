# CSS Processing Scripts

This directory contains scripts for processing and optimizing the CSS file cloned from the original lottery website.

## Scripts

### 1. normalize-css.js

**Purpose:** Remove Vue.js scoped CSS attributes from the cloned CSS file.

**What it does:**
- Reads `clone-src/app.e55b041b.css`
- Removes all `[data-v-*]` attributes (Vue.js scoped CSS)
- Cleans up resulting formatting issues
- Outputs normalized CSS to `src/styles/app.css`

**Usage:**
```bash
node scripts/normalize-css.js
```

**Output:**
- Creates `src/styles/app.css` with normalized CSS
- Reports number of attributes removed
- Shows file size reduction

**Example output:**
```
🔧 Normalizing CSS file...
📊 Found 39 Vue scoped attributes to remove
✅ All Vue scoped attributes removed successfully
📊 File size comparison:
   Original: 194.83 KB
   Normalized: 174.48 KB
   Reduction: 10.44%
```

### 2. purge-unused-css.js

**Purpose:** Remove unused CSS classes from the normalized CSS file.

**What it does:**
- Scans all TypeScript/TSX files in `src/` directory
- Extracts all CSS class names from the stylesheet
- Identifies which classes are actually used in the codebase
- Removes unused classes to reduce file size

**Usage:**

**Step 1: Dry run (analyze only)**
```bash
node scripts/purge-unused-css.js
```

This will show you:
- Total number of CSS classes found
- Number of classes used in codebase
- Number of unused classes
- Sample of unused classes

**Step 2: Execute purge (with confirmation)**
```bash
PURGE_CSS=true node scripts/purge-unused-css.js
```

**Safety features:**
- Creates backup file (`app.backup.css`) before purging
- Requires explicit confirmation via environment variable
- Shows detailed statistics before and after

**Example output:**
```
🔍 Analyzing codebase for CSS class usage...
📊 Found 2,847 unique CSS classes in stylesheet
📂 Scanning 45 source files...
✅ Found 312 classes used in codebase
🗑️  Found 2,535 unused classes

⚠️  This will remove 2,535 unused CSS classes.
💡 To proceed, set PURGE_CSS=true environment variable
```

## Workflow

### Initial Setup (Task 1)
1. Run normalize-css.js to create the normalized CSS file
2. Import the normalized CSS in your application

### Final Optimization (Task 14)
1. Complete all feature implementation tasks
2. Run purge-unused-css.js in dry-run mode to analyze
3. Review the list of unused classes
4. Run purge-unused-css.js with PURGE_CSS=true to execute
5. Test the application thoroughly
6. Keep the backup file for rollback if needed

## Technical Details

### normalize-css.js

**Regex patterns used:**
- `\[data-v-[a-f0-9]+\]` - Matches Vue scoped attributes
- `  +` - Cleans up multiple spaces
- `,\s*,` - Removes duplicate commas
- `,\s*\{` - Cleans up trailing commas

**File structure:**
```
Input:  clone-src/app.e55b041b.css
Output: src/styles/app.css
```

### purge-unused-css.js

**Class detection patterns:**
- `\.([a-zA-Z0-9_-]+)(?=[^}]*\{)` - Extracts class names from CSS
- `className\s*=\s*["'` ]([^"'` ]+)["'` ]` - Finds className in JSX
- `className\s*=\s*\{[^}]*["'` ]([^"'` ]+)["'` ][^}]*\}` - Finds dynamic className

**File structure:**
```
Input:  src/styles/app.css
Backup: src/styles/app.backup.css
Output: src/styles/app.css (purged)
```

## Notes

- Both scripts use ES modules (import/export)
- Scripts are safe to run multiple times
- normalize-css.js is idempotent (running multiple times produces same result)
- purge-unused-css.js creates backups for safety
- File size reductions are typically:
  - Normalization: ~10% reduction
  - Purging: ~60-80% reduction (depends on usage)

## Troubleshooting

**Issue:** Script fails with "require is not defined"
**Solution:** Scripts use ES modules. Make sure package.json has `"type": "module"`

**Issue:** Purge removes classes that are actually used
**Solution:** 
- Check if classes are added dynamically (not detected by static analysis)
- Restore from backup file
- Add classes to a safelist (modify script)

**Issue:** Application styling breaks after purge
**Solution:**
- Restore from `app.backup.css`
- Review the list of removed classes
- Identify which classes were incorrectly removed
- Update the detection patterns in purge-unused-css.js

## Future Improvements

Potential enhancements for these scripts:

1. **Safelist support:** Add ability to specify classes that should never be removed
2. **Dynamic class detection:** Better detection of dynamically constructed class names
3. **CSS minification:** Add minification step after purging
4. **Source maps:** Generate source maps for debugging
5. **Interactive mode:** Add prompts for user confirmation
6. **Detailed reporting:** Generate HTML report of removed classes

