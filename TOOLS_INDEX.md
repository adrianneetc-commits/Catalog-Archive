# Catalog-Archive Tools Index

## Quick Reference

This document provides a comprehensive catalog of all tools, scripts, and resources in the Catalog-Archive.

---

## 🎨 Web Tools

### Code & Syntax Highlighting
**File:** `TOOLS/code-highlighter/inkline.html`
**Purpose:** Multi-language code syntax highlighter with support for:
- JavaScript, TypeScript, Python, Java, C#, C++, PHP, Go, Lua, Markdown
- Curly-brace language detection
- Custom theme support

**Features:**
- Real-time syntax highlighting
- Store and restore mechanism for comments/strings
- Keyword and function highlighting
- Number, decorator, and variable recognition

---

### CSS Extraction Tool
**File:** `TOOLS/css-extraction/css-extractor.html`
**Purpose:** Extract and isolate CSS from HTML documents
**Status:** Active (v08.03.26 available in archive)

**Features:**
- Parse HTML and extract stylesheet references
- Inline or separate CSS output
- Style analyzer

---

### Markdown Conversion
**Files:**
- `TOOLS/markdown-conversion/html-to-markdown.html` — Convert HTML to Markdown
- `TOOLS/markdown-conversion/markdown-preview-exporter.html` — Live preview with export
- `SCRIPTS/utilities/markdown-key-conversion-dictionary.json` — Keyboard shortcut mappings

**Purpose:** Bidirectional conversion between HTML and Markdown formats

**Features:**
- Real-time preview
- Keyboard shortcut support
- Export to Markdown or HTML
- Chat export capability

---

### Terminal Session Formatter
**File:** `TOOLS/terminal-formatting/terminal-session-formatter.html`
**Purpose:** Parse raw terminal transcripts into organized command/response blocks

**Features:**
- zsh Custom prompt preset (status line + ζ prompt)
- Generic preset ($, >, #)
- Custom regex preset support
- Multiple theme options (Amber Ink, Midnight Navy, Terminal Green, Solarized Dark)
- Styled HTML export
- Markdown copy
- File upload support

---

### KaTeX Playground
**File:** `TOOLS/katex-playground/katex-interactive-preview.html`
**Purpose:** Interactive LaTeX/KaTeX mathematical notation renderer

**Features:**
- Real-time math rendering
- Live preview
- Support for complex equations
- Export options

---

### Dashboards
**Files:**
- `TOOLS/dashboards/index.html` — Main dashboard/index
- `TOOLS/dashboards/home-dashboard.html` — Home page
- `TOOLS/dashboards/page-elements-dashboard.html` — HTML element reference

**Purpose:** Central hub for accessing all tools and resources

---

## 🔧 Scripts & Automation

### Drafts App Integration
**Location:** `SCRIPTS/drafts-app/`

**Files:**
- `format-post-html.js` — Format Drafts content into HTML
  - Converts draft text to HTML
  - Adds ID tags to headers (lowercase, hyphenated)
  - Customizes image tags with styling
  - Backup creation before processing

- `format-post-html.json` — Configuration metadata
- `export-actions-json.js` — Export all Drafts actions as JSON for backup/analysis

---

### Gemini Tools
**Location:** `SCRIPTS/gemini-tools/`

**Files:**
- `cli-gem.js` — CLI tool for Gemini interaction and execution

**Documentation:**
- `docs/guide.md` — Complete usage guide
- `docs/permissions.md` — Permission troubleshooting (chmod, sudo)
- `docs/run-clipboard-scripts.md` — Terminal integration guide
- `docs/clipboard-execute-details.md` — Clipboard execution workflow

**Purpose:** Execute scripts and commands via clipboard with Gemini AI integration

---

## 🎨 Styles & Themes

### CSS Styles
**File:** `STYLES/css/style-feminine.css`
**Purpose:** Custom stylesheet with feminine design aesthetic

---

### CotEditor Themes
**Location:** `STYLES/editor-themes/CotEditor/`

**Themes:**
- `anura-dark.cottheme` — Dark theme variant
- `mono.cottheme` — Monochrome minimal theme
- `resinifictrix-dark.cottheme` — Dark theme with specific color palette

---

## 💾 Data & Backups

### Drafts App Workspaces
**Location:** `DATA/drafts-workspaces/`

13 pre-configured workspace files for organizing Drafts app content:
- DOCUMENTATION + GUIDES
- HTML
- JSON
- MARKDOWN
- SCRIPTS
- SNIPPETS
- TERMINAL COMMANDS
- LISTS AND TABLES
- MY JAVASCRIPT
- IMPORTED & SHARED
- Templates
- import processor
- 𝑫𝑨𝑺𝑯𝑩𝑶𝑨𝑹𝑫

---

### Audit Logs
**Location:** `DATA/audit-logs/`

**Files:**
- `2026-08-06-audit-actions.txt` — Audit snapshot from August 6
- `2026-08-27-audit-actions.txt` — Audit snapshot from August 27 (latest)
- `2026-08-06-audit-dictionary.txt` — Action dictionary from August 6
- `2026-08-27-audit-dictionary.txt` — Action dictionary from August 27 (latest)

**Purpose:** Track Drafts app action configurations and changes over time

---

## 📚 Reference & Documentation

### Main Documentation
- `README.md` — Project overview
- `TOOLS_INDEX.md` — This file
- `REORGANIZATION_PLAN.md` — Migration and cleanup plan
- `MIGRATION_LOG.md` — Detailed log of all changes (generated)
- `MAINTENANCE.md` — How to maintain this structure going forward

### Guides
- `REFERENCE/guides/markdown-editor-with-history.html` — Markdown editor with full history tracking

### Setup & Contributing
- `REFERENCE/docs/SETUP.md` — Initial setup instructions
- `REFERENCE/docs/STRUCTURE.md` — Detailed structure documentation
- `REFERENCE/docs/CONTRIBUTING.md` — Contribution guidelines

---

## 👤 Personal & Scratch

**Location:** `SCRATCH/`

- `personal-profile/adrianne-profile.md` — Personal profile information
- `personal-profile/welcome-page.html` — Welcome/intro page
- `personal-profile/markdown-viewer-master-output.html` — Master markdown output viewer
- `analysis/duplicate-finder-20260827.numbers` — Spreadsheet for duplicate analysis
- `archives/files.zip` — Archived files collection

---

## 🗄️ Archives

**Location:** `DATA/archives/`

- `html-index-archive.html` — Archived version of online HTML index
- `deprecated-tools/` — Tools no longer in active use
- `test-artifacts/` — Testing and experimental files

---

## 📊 Statistics

| Category | Count | Status |
|----------|-------|--------|
| Active Tools | 8 | ✅ Production |
| Scripts | 5 | ✅ Production |
| Themes | 3 | ✅ Active |
| Workspaces | 13 | ✅ Configured |
| Documentation Files | 10+ | ✅ Current |
| Audit Logs | 4 | ✅ Up to date |
| **Total** | **~100+** | ✅ Organized |

---

## 🔍 How to Use This Index

1. **Looking for a specific tool?** Use Ctrl+F and search the tool name
2. **Need documentation?** Check the "Reference & Documentation" section
3. **Want to understand the structure?** See `REFERENCE/docs/STRUCTURE.md`
4. **Need to add something new?** Follow guidelines in `REFERENCE/docs/CONTRIBUTING.md`
5. **Maintaining this archive?** See `REFERENCE/guides/MAINTENANCE.md`

---

## 🚀 Quick Start

### For Web Tools
1. Navigate to `TOOLS/` directory
2. Choose your tool
3. Open the `.html` file in a web browser
4. Most tools are self-contained and require no installation

### For Scripts
1. Navigate to `SCRIPTS/` directory
2. Check the `docs/` subfolder for usage instructions
3. Follow the setup guide for your specific tool

### For Accessing Drafts Workspaces
1. Files are in `DATA/drafts-workspaces/`
2. Import each `.draftsWorkspace` file into Drafts app
3. Each workspace is pre-configured for a specific category

---

*Last Updated: 2026-09-10*
*Repository: adrianneetc-commits/Catalog-Archive*
