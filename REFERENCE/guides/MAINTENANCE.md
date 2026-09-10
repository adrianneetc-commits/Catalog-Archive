# Repository Maintenance Guide

## Overview

This guide provides best practices for maintaining the Catalog-Archive repository structure going forward.

---

## 📋 Regular Maintenance Tasks

### Monthly Checklist

- [ ] Review new files added to scratch area
- [ ] Consolidate similar audit logs
- [ ] Check for accidental duplicate creations
- [ ] Verify all links in documentation are correct
- [ ] Update TOOLS_INDEX.md if any tools were modified

### Quarterly Reviews

- [ ] Audit all tools for deprecated or unused versions
- [ ] Review test artifacts in `DATA/archives/test-artifacts/`
- [ ] Update workspace files if Drafts app structure changes
- [ ] Verify documentation reflects current state

---

## 🗂️ File Organization Rules

### When Adding New Files

1. **Web Tools (.html files)**
   - Place in appropriate subdirectory under `TOOLS/`
   - Create logical category if needed (e.g., `TOOLS/new-category/`)
   - Keep naming consistent: use lowercase with hyphens
   - Example: `TOOLS/my-new-tool/my-new-tool.html`

2. **Scripts (.js, .py, .sh files)**
   - Organize by purpose/tool in `SCRIPTS/`
   - Create subdirectories for related scripts
   - Include documentation in adjacent `docs/` folder
   - Example: `SCRIPTS/my-tool/my-script.js`

3. **Configuration Files (.json, .config)**
   - Store alongside the tool/script they configure
   - Use descriptive names matching their tool
   - Example: `SCRIPTS/my-tool/config.json`

4. **Documentation (.md files)**
   - Place in `docs/` within the tool/script folder
   - Or in `REFERENCE/` for cross-tool documentation
   - Use clear, descriptive filenames

5. **Data & Backups**
   - Organize by type in `DATA/` subdirectories
   - Include dates in filenames for time-sensitive data
   - Archive old versions in `DATA/archives/`
   - Example: `DATA/audit-logs/2026-09-10-audit-actions.txt`

6. **Personal/Scratch Files**
   - Keep in `SCRATCH/` until they're production-ready
   - Move to appropriate category when finalized
   - Archive old versions in `SCRATCH/archives/`

---

## 🔍 Duplicate Detection & Prevention

### How to Identify Duplicates

1. **Content Comparison**
   ```bash
   # Compare file sizes (quick check)
   ls -lh file1.html file2.html
   
   # Compare content hash
   sha256sum file1.html file2.html
   ```

2. **Visual Inspection**
   - Open files side-by-side
   - Compare timestamps and version notes
   - Check for "copy", "v2", "backup", "old" in filenames

3. **Git History**
   ```bash
   git log --oneline -- filename
   git show commit:path/to/file
   ```

### Duplicate Prevention

1. **Before Creating a New File**
   - Search TOOLS_INDEX.md for similar tools
   - Check if a newer version already exists
   - Look for "archive" or "deprecated" folders

2. **Naming Convention**
   - Avoid: `tool.html`, `tool_copy.html`, `tool-v2.html`
   - Use: `tool.html` (primary), archive others in `archives/` folder
   - If versioning needed: `tool-YYYY-MM-DD.html`

3. **Version Control**
   - Keep ONE primary version in active directory
   - Archive older versions: `archives/tool-2026-08-01.html`
   - Document version history in related `.md` file

---

## 📝 Updating Documentation

### When You Add/Modify Files

1. **Update TOOLS_INDEX.md**
   - Add entry to appropriate section
   - Include file path, purpose, and features
   - Add to statistics table if applicable

2. **Update STRUCTURE.md**
   - Reflect new directory structure
   - Document any organizational changes
   - Update file counts and categories

3. **Update MIGRATION_LOG.md**
   - Add entry: `[DATE] Added X / Modified Y / Removed Z`
   - Include brief description of changes
   - Reference the commit hash if available

4. **Create/Update tool-specific docs**
   - If adding a complex tool, create README.md in its folder
   - Document setup, usage, and configuration
   - Include examples and common issues

### Documentation Template

For new tools, create a `README.md` in the tool folder:

```markdown
# Tool Name

## Description
Brief overview of what this tool does.

## Features
- Feature 1
- Feature 2
- Feature 3

## Usage
Step-by-step instructions.

## Configuration
Any setup required.

## Known Issues
Any limitations or bugs.

## Version History
- v1.0 (2026-09-10) - Initial release
```

---

## 🗑️ Cleanup Guidelines

### Safe to Delete
- `.DS_Store` files (macOS system files)
- `*-copy.html`, `*-v2.html` (obvious duplicates)
- Files with UUID-only names without documentation
- Empty or malformed files (0 bytes)
- Temporary test files older than 3 months

### Before Deleting
1. Search the repository for references to the file
2. Check git history to understand its purpose
3. Verify it's not imported by other tools
4. Consider archiving instead of deleting

### Archive Instead of Delete
- Files that might be useful reference material
- Old versions of active tools
- Experimental code that might be revisited
- Historical audit logs or snapshots

---

## 🔄 Workflow for Adding Content

### New Tool Workflow

1. **Create in branch**
   ```bash
   git checkout -b feature/add-new-tool
   ```

2. **Organize file**
   - Create `TOOLS/new-tool/` directory
   - Place main file: `new-tool.html`
   - Create docs: `docs/README.md`

3. **Update index**
   - Edit `TOOLS_INDEX.md`
   - Add entry with description
   - Include file path and features

4. **Commit & Push**
   ```bash
   git add TOOLS/new-tool/
   git add TOOLS_INDEX.md
   git commit -m "feat: Add new tool description"
   git push origin feature/add-new-tool
   ```

5. **Create Pull Request**
   - Reference this guide
   - Explain tool purpose
   - Link to any related issues

### Script/Automation Workflow

1. Place in appropriate `SCRIPTS/` subdirectory
2. Include configuration files (.json, .env, etc.)
3. Create comprehensive `docs/README.md`
4. Add to TOOLS_INDEX.md Scripts section
5. Link from main README.md if widely useful

### Data/Backup Workflow

1. Organize by type in `DATA/` subdirectories
2. Include date in filename
3. Document purpose in adjacent `.txt` file if needed
4. Archive previous versions yearly
5. Update MAINTENANCE.md if audit process changes

---

## 🚨 Troubleshooting Common Issues

### Problem: Duplicate Files Keep Being Created

**Solution:**
1. Check TOOLS_INDEX.md before creating anything new
2. Search for similar tool names
3. If multiple versions exist, consolidate them
4. Keep primary version, archive others

### Problem: File Structure Is Getting Messy

**Solution:**
1. Run quarterly audit (see Quarterly Reviews above)
2. Move scattered files to appropriate categories
3. Create `.cleanup` folder for deprecated items
4. Update MIGRATION_LOG.md with reorganization

### Problem: Lost Track of What a File Does

**Solution:**
1. Check TOOLS_INDEX.md first
2. Open the file and look at comments/header
3. Search git history: `git log --oneline -- filename`
4. Ask in commit messages or documentation

### Problem: Need to Find Files by Keyword

**Solution:**
```bash
# Search in filenames
find . -type f -name "*keyword*"

# Search in file contents
grep -r "keyword" --include="*.html" --include="*.js" --include="*.md"

# Check TOOLS_INDEX.md
grep -i "keyword" TOOLS_INDEX.md
```

---

## 📊 Monitoring Repository Health

### Repository Statistics to Track

```bash
# Count files by type
find . -type f | cut -d'.' -f2 | sort | uniq -c | sort -rn

# Find large files
find . -type f -size +5M

# Count duplicates
find . -type f -exec sha256sum {} \; | sort | uniq -d

# List files by modification date
find . -type f -printf '%T@ %p\n' | sort -n | tail -20
```

### Red Flags
- Multiple files with similar names
- Many `.DS_Store` files appearing
- Files in wrong category folders
- Extremely large files (likely binaries)
- Files with no clear purpose or documentation

---

## 🤝 Contributing Guidelines

When contributing to this repository:

1. **Before Adding:**
   - Check if similar tool/script already exists
   - Review TOOLS_INDEX.md to avoid duplicates
   - Propose new categories if needed

2. **When Adding:**
   - Follow naming conventions (lowercase, hyphens)
   - Include documentation
   - Update TOOLS_INDEX.md
   - Keep files organized in proper folders

3. **When Modifying:**
   - Update version in documentation
   - Update MIGRATION_LOG.md
   - Keep archives of old versions
   - Test changes before committing

4. **When Removing:**
   - Search for references first
   - Move to `archives/` instead of deleting
   - Document why it was removed
   - Update MIGRATION_LOG.md

---

## 📞 Need Help?

Refer to:
- `TOOLS_INDEX.md` — Find a specific tool
- `REFERENCE/docs/STRUCTURE.md` — Understand organization
- `REFERENCE/docs/CONTRIBUTING.md` — Contribution process
- Git history — See what changed and when
- Individual tool `docs/README.md` — Tool-specific help

---

*Last Updated: 2026-09-10*
*Repository: adrianneetc-commits/Catalog-Archive*
