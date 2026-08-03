What changed:
execSync('pbpaste') integration: Added a getClipboardUrl() function that uses Node's built-in child_process module to read the clipboard contents directly.
Flexible execution: You can now simply run ./export-gemini.js with a link copied to your clipboard. If you want to specify a custom filename while using the clipboard link, you can pass it directly like ./export-gemini.js custom_name.md. Passing an explicit URL as the first argument still takes priority.
