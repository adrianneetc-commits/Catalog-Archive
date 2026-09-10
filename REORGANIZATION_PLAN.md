# Catalog-Archive Reorganization Plan

## Overview
This document outlines the comprehensive reorganization of the Catalog-Archive repository to eliminate duplicates, consolidate tools, and create a logical, maintainable structure.

## Issues Identified

### Exact Duplicates to Remove
1. **Gemini CLI Tool**
   - `Gemini Export August/CLI Gem.js`
   - `Gemini Export August/Gemini Clipboard Runner/adri_execute_gem_getter.js` ← DELETE

2. **CSS Extractor (3 copies)**
   - `HTML Webpages/CSS Extractor/CSS Extractor.html` (PRIMARY)
   - `HTML Webpages/CSS Extractor/08.03.26/CSS Extractor.html` (VERSION ARCHIVE)
   - `My Web Tools/CSS Extractor/CSS Extractor.html` ← DELETE
   - `My Web Tools/CSS Extractor/08.03.26/CSS Extractor.html` ← DELETE

3. **KaTeX Playground (2 copies)**
   - `HTML Webpages/KaTeX Playground/KaTeX Interactive Preview.html` (PRIMARY)
   - `My Web Tools/KaTeX Playground/` ← DELETE ENTIRE FOLDER

4. **HTML to Markdown Converter (2 copies)**
   - `HTML to Markdown Converter.html` (PRIMARY)
   - `My Web Tools/Markdown & HTML Conversins/HTML_Markdown_Converter.html` ← DELETE

5. **Terminal Session Formatters (3 copies)**
   - `Web Code Database/Terminal Session Formatter.html` (PRIMARY)
   - `Web Code Database/Terminal Session Formatter copy.html` ← DELETE
   - `Web Code Database/Terminal Session Formatter 2.html` ← DELETE

6. **Audit Logs**
   - `DraftsApp Database/Database 003 - Audit Database/Audit Action Dictionary List 2026-08-06-10-45-01.txt` (KEEP)
   - `DraftsApp Database/Database 003 - Audit Database/Audit Action Dictionary List 2026-08-27-18-16-08.txt` (KEEP - newer)
   - Compare and consolidate if content is identical

### Conceptual Duplicates
- Multiple versions of similar tools (Markdown converters, Diff tools)
- Similar audit log entries from different dates
- Workspace backups for same categories

### System Clutter
- 15+ `.DS_Store` files (macOS metadata) ← ALL DELETE
- `Icon\r` (empty malformed file) ← DELETE
- `Web Code Database/TEST NOT APPROVED/` folder (testing artifacts) ← MOVE TO ARCHIVE

### Organizational Issues
- `My Web Tools/` duplicates `HTML Webpages/` ← DELETE ENTIRE FOLDER
- Mixed media in audit database (HEIF image) ← RELOCATE
- Test files scattered without clear purpose ← CONSOLIDATE
- UUID-named files without context ← DOCUMENT OR REMOVE

## New Directory Structure

```
Catalog-Archive/
│
├── TOOLS/                          # Production web applications
│   ├── code-highlighter/
│   │   └── inkline.html
│   ├── css-extraction/
│   │   ├── css-extractor.html
│   │   └── archive/
│   │       └── 08.03.26-css-extractor.html
│   ├── markdown-conversion/
│   │   ├── html-to-markdown.html
│   │   └── markdown-preview-exporter.html
│   ├── terminal-formatting/
│   │   └── terminal-session-formatter.html
│   ├── katex-playground/
│   │   └── katex-interactive-preview.html
│   └── dashboards/
│       ├── index.html
│       ├── home-dashboard.html
│       └── page-elements-dashboard.html
│
├── SCRIPTS/                        # Automation and scripting
│   ├── drafts-app/
│   │   ├── format-post-html.js
│   │   ├── format-post-html.json
│   │   └── export-actions-json.js
│   ├── gemini-tools/
│   │   ├── cli-gem.js
│   │   └── docs/
│   │       ├── guide.md
│   │       ├── permissions.md
│   │       ├── run-clipboard-scripts.md
│   │       └── clipboard-execute-details.md
│   └── utilities/
│       └── markdown-key-conversion-dictionary.json
│
├── STYLES/                         # CSS and themes
│   ├── css/
│   │   └── style-feminine.css
│   └── editor-themes/
│       └── CotEditor/
│           ├── anura-dark.cottheme
│           ├── mono.cottheme
│           └── resinifictrix-dark.cottheme
│
├── DATA/                           # Backups and archives
│   ├── drafts-workspaces/          # All 13 .draftsWorkspace files
│   ├── audit-logs/
│   │   ├── 2026-08-06-audit-actions.txt
│   │   ├── 2026-08-27-audit-actions.txt
│   │   ├── 2026-08-06-audit-dictionary.txt
│   │   └── 2026-08-27-audit-dictionary.txt
│   └── archives/
│       ├── html-index-archive.html
│       └── deprecated-tools/
│           ├── vault-databases/
│           ├── link-management-vault.html
│           └── test-artifacts/
│
├── REFERENCE/                      # Documentation
│   ├── README.md
│   ├── TOOLS_INDEX.md              # New: Comprehensive tool catalog
│   ├── MIGRATION_LOG.md            # New: Track all changes
│   ├── docs/
│   │   ├── SETUP.md
│   │   ├── STRUCTURE.md
│   │   └── CONTRIBUTING.md
│   └── guides/
│       ├── markdown-editor-with-history.html
│       └── MAINTENANCE.md          # New: How to maintain this structure
│
├── SCRATCH/                        # Personal notes and analysis
│   ├── personal-profile/
│   │   ├── adrianne-profile.md
│   │   ├── welcome-page.html
│   │   └── markdown-viewer-master-output.html
│   ├── analysis/
│   │   └── duplicate-finder-20260827.numbers
│   └── archives/
│       └── files.zip
│
└── .cleanup/                       # Files to delete (Git can't track deletions well in this format)
    ├── DELETEME-DS_Store-files.txt
    ├── DELETEME-MyWebTools-folder.txt
    ├── DELETEME-TestNotApproved-folder.txt
    └── DELETEME-DuplicateFiles.txt
```

## Migration Steps

### Phase 1: Deduplication
- [ ] Verify content of duplicate files
- [ ] Keep primary versions
- [ ] Archive or remove duplicates

### Phase 2: Reorganization
- [ ] Create new directory structure
- [ ] Move files to appropriate locations
- [ ] Verify all references are correct

### Phase 3: Documentation
- [ ] Create TOOLS_INDEX.md with descriptions
- [ ] Create MIGRATION_LOG.md documenting all changes
- [ ] Update STRUCTURE.md with new organization
- [ ] Create MAINTENANCE.md for future updates

### Phase 4: Cleanup
- [ ] Remove all .DS_Store files
- [ ] Remove duplicate files
- [ ] Remove empty/malformed files
- [ ] Archive test artifacts

## Files to Delete

### Exact Duplicates
```
Gemini Export August/Gemini Clipboard Runner/adri_execute_gem_getter.js
My Web Tools/CSS Extractor/CSS Extractor.html
My Web Tools/CSS Extractor/08.03.26/CSS Extractor.html
My Web Tools/KaTeX Playground/KaTeX Interactive Preview.html
My Web Tools/Markdown & HTML Conversins/HTML_Markdown_Converter.html
Web Code Database/Terminal Session Formatter copy.html
Web Code Database/Terminal Session Formatter 2.html
```

### System Clutter
```
.DS_Store (all instances - 15+)
Icon\r
```

### Entire Folders to Remove
```
My Web Tools/
Web Code Database/TEST NOT APPROVED/ (except Web Link Management Vault.html)
```

## Status
- **Branch:** `reorganize/deduplication-and-structure`
- **Created:** 2026-09-10
- **Target Completion:** Incremental migration
