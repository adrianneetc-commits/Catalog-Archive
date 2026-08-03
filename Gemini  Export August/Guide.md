Here is the updated script, refactored into a single, production-ready, standalone CLI tool.

It adds a **shebang (`#!/usr/usr/bin/env node`)**, **makes itself executable** automatically upon first run (`chmod +x`), handles **dynamic argument parsing**, and includes built-in **help flags** (`--help` / `-h`).

### Dynamic Gemini Exporter CLI

```javascript
#!/usr/bin/env node

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIG & CONSTANTS ---
const KNOWN_LANGS = [
    'bash', 'shell', 'sh', 'zsh', 'python', 'javascript', 'js', 'json',
    'html', 'css', 'sql', 'java', 'c', 'c++', 'cpp', 'csharp', 'c#',
    'typescript', 'ts', 'yaml', 'yml', 'xml', 'ruby', 'go', 'golang',
    'rust', 'php', 'powershell', 'plaintext', 'text', 'markdown', 'md'
];

// Automatically ensure the script file has execution permissions on Unix systems
function ensureExecutable() {
    try {
        if (process.platform !== 'win32') {
            const __filename = fileURLToPath(import.meta.url);
            const stats = fs.statSync(__filename);
            // Check if user execute permission (0100) is set
            if (!(stats.mode & 0o100)) {
                fs.chmodSync(__filename, stats.mode | 0o100);
            }
        }
    } catch {
        // Silently continue if permission setting is restricted
    }
}

function showHelp() {
    console.log(`
🚀 Gemini Shared Link Exporter CLI

Usage:
  ./export-gemini.js <gemini-share-url> [output-filename.md]

Options:
  -h, --help    Show this help message

Examples:
  ./export-gemini.js "https://gemini.google.com/share/xxxxxx"
  ./export-gemini.js "https://gemini.google.com/share/xxxxxx" custom_name.md
`);
}

// --- HELPER FUNCTIONS ---

function formatBareLanguageLabels(markdown) {
    const langAlternation = KNOWN_LANGS
        .map((l) => l.replace(/[+#]/g, '\\$&'))
        .join('|');
    const labelPattern = new RegExp(`^(${langAlternation})\\s*$`, 'i');

    const lines = markdown.split('\n');
    const out = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        if (labelPattern.test(line.trim()) && !line.trim().startsWith('```')) {
            const lang = line.trim().toLowerCase();
            const codeLines = [];
            let j = i + 1;

            while (
                j < lines.length &&
                lines[j].trim() !== '' &&
                lines[j].trim() !== '---' &&
                !lines[j].startsWith('###') &&
                !lines[j].startsWith('```')
            ) {
                codeLines.push(lines[j]);
                j++;
            }

            if (codeLines.length > 0) {
                out.push('```' + lang);
                out.push(...codeLines);
                out.push('```');
                i = j;
                continue;
            }
        }

        out.push(line);
        i++;
    }

    return out.join('\n');
}

// --- MAIN SCRAPER RUNNER ---

const run = async () => {
    ensureExecutable();

    const args = process.argv.slice(2);

    if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
        showHelp();
        process.exit(0);
    }

    const url = args[0];
    const customOutputFile = args[1];

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        console.error("❌ Error: Invalid URL provided. Please provide a full Gemini share link.");
        process.exit(1);
    }

    const browser = await puppeteer.launch({ 
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36');

    try {
        console.log(`🚀 Accessing: ${url}`);
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        console.log("⏳ Waiting for page hydration...");
        await new Promise(r => setTimeout(r, 4000));

        const data = await page.evaluate((knownLangs) => {
            const titleElement = document.querySelector('h1');
            const title = titleElement?.innerText?.trim() || "Gemini Export";

            function detectLanguage(el) {
                const pre = el.closest('pre');
                const candidates = [el, el.parentElement, pre, pre?.parentElement].filter(Boolean);

                for (const c of candidates) {
                    const cls = c.className || '';
                    const classMatch = typeof cls === 'string' && cls.match(/language-([\w+#]+)/i);
                    if (classMatch) return classMatch[1].toLowerCase();

                    const dataLang = c.getAttribute && (c.getAttribute('data-language') || c.getAttribute('data-lang'));
                    if (dataLang) return dataLang.toLowerCase();
                }

                const container = pre || el;
                let sibling = container.previousElementSibling;
                if (sibling) {
                    const t = sibling.innerText?.trim().toLowerCase();
                    if (t && knownLangs.includes(t)) return t;
                }
                const parent = container.parentElement;
                if (parent && parent.firstElementChild && parent.firstElementChild !== container) {
                    const t = parent.firstElementChild.innerText?.trim().toLowerCase();
                    if (t && knownLangs.includes(t)) return t;
                }

                return '';
            }

            function childrenToMarkdown(el) {
                let result = '';
                el.childNodes.forEach((node) => {
                    result += nodeToMarkdown(node);
                });
                return result;
            }

            function nodeToMarkdown(node) {
                if (node.nodeType === Node.TEXT_NODE) return node.textContent;
                if (node.nodeType !== Node.ELEMENT_NODE) return '';

                const tag = node.tagName.toLowerCase();

                switch (tag) {
                    case 'script':
                    case 'style':
                        return '';
                    case 'br':
                        return '\n';
                    case 'hr':
                        return '\n\n---\n\n';
                    case 'strong':
                    case 'b': {
                        const inner = childrenToMarkdown(node).trim();
                        return inner ? `**${inner}**` : '';
                    }
                    case 'em':
                    case 'i': {
                        const inner = childrenToMarkdown(node).trim();
                        return inner ? `*${inner}*` : '';
                    }
                    case 'code': {
                        if (node.closest('pre')) return '';
                        return '`' + node.innerText.trim() + '`';
                    }
                    case 'a': {
                        const href = node.getAttribute('href') || '';
                        const text = childrenToMarkdown(node).trim() || node.innerText.trim();
                        return href ? `[${text}](${href})` : text;
                    }
                    case 'pre': {
                        const lang = detectLanguage(node) || 'text';
                        return `\n\n\`\`\`${lang}\n${node.innerText.trim()}\n\`\`\`\n\n`;
                    }
                    case 'h1':
                    case 'h2':
                    case 'h3':
                    case 'h4':
                    case 'h5':
                    case 'h6': {
                        const level = parseInt(tag[1], 10);
                        const text = childrenToMarkdown(node).trim();
                        return text ? `\n\n${'#'.repeat(level)} ${text}\n\n` : '';
                    }
                    case 'blockquote': {
                        const inner = childrenToMarkdown(node).trim();
                        if (!inner) return '';
                        const quoted = inner.split('\n').map((l) => `> ${l}`).join('\n');
                        return `\n\n${quoted}\n\n`;
                    }
                    case 'ul': {
                        let items = '';
                        node.querySelectorAll(':scope > li').forEach((li) => {
                            const text = childrenToMarkdown(li).trim().replace(/\n+/g, ' ');
                            if (text) items += `- ${text}\n`;
                        });
                        return items ? `\n\n${items}\n` : '';
                    }
                    case 'ol': {
                        let items = '';
                        let idx = 1;
                        node.querySelectorAll(':scope > li').forEach((li) => {
                            const text = childrenToMarkdown(li).trim().replace(/\n+/g, ' ');
                            if (text) {
                                items += `${idx}. ${text}\n`;
                                idx++;
                            }
                        });
                        return items ? `\n\n${items}\n` : '';
                    }
                    case 'p':
                    case 'div': {
                        const inner = childrenToMarkdown(node).trim();
                        return inner ? `\n\n${inner}\n\n` : '';
                    }
                    default:
                        return childrenToMarkdown(node);
                }
            }

            function collapseBlankLines(text) {
                return text.replace(/\n{3,}/g, '\n\n').trim();
            }

            const selectors = [
                '.shared-conversation-turn', 
                '.p-message-content', 
                'code', 
                'pre', 
                '.markdown',
                'div[role="article"]'
            ];
            
            const elements = Array.from(document.querySelectorAll(selectors.join(',')));
            
            let markdown = `# ${title}\n\n`;
            let seenText = new Set();
            let count = 0;

            elements.forEach((el) => {
                const rawText = el.innerText.trim();

                if (!rawText || rawText.length <= 10 || seenText.has(rawText) || rawText === title) {
                    return;
                }

                const isCodeBlock = el.tagName === 'PRE' || (el.tagName === 'CODE' && el.closest('pre'));
                const isStandaloneCode = el.tagName === 'CODE' && !el.closest('pre');

                if (isCodeBlock) {
                    const lang = detectLanguage(el) || 'text';
                    markdown += `\`\`\`${lang}\n${rawText}\n\`\`\`\n\n`;
                } else if (isStandaloneCode) {
                    markdown += '`' + rawText + '`\n\n';
                } else {
                    const isUser = el.closest('.user-query') || rawText.toLowerCase().startsWith('you\n');
                    const label = isUser ? "### User" : "### Gemini";
                    const formatted = collapseBlankLines(childrenToMarkdown(el)) || rawText;
                    markdown += `${label}\n\n${formatted}\n\n---\n\n`;
                }

                seenText.add(rawText);
                count++;
            });

            return { markdown, title, count };
        }, KNOWN_LANGS);

        if (data.count === 0) {
            console.error("❌ No parseable content found on the target page.");
        } else {
            const finalMarkdown = formatBareLanguageLabels(data.markdown);

            let fileName = customOutputFile;
            if (!fileName) {
                const safeTitle = data.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                fileName = `${safeTitle}.md`;
            }

            fs.writeFileSync(fileName, finalMarkdown);
            console.log(`✅ Success! Exported ${data.count} content blocks to: ${path.resolve(fileName)}`);
        }

    } catch (err) {
        console.error("❌ Error processing request:", err.message);
    } finally {
        await browser.close();
    }
};

run();

```

---

### Setup Instructions

1. **Save the file** as `export-gemini.js`.
2. **Make it executable via your terminal** (manually):
```bash
chmod +x export-gemini.js

```


3. *(Optional)* **Make it globally accessible** system-wide:
```bash
sudo mv export-gemini.js /usr/local/bin/export-gemini

```



### Usage

**Basic Usage:**

```bash
./export-gemini.js "https://gemini.google.com/share/your-share-id"

```

**Custom Output File:**

```bash
./export-gemini.js "https://gemini.google.com/share/your-share-id" my_conversation.md

```
