# Validation of the prepared source release

Date: 2026-10-20. Tested locally on macOS with Node.js 22.22.2, Playwright 1.62.1 and installed Google Chrome in headless mode. This is a local validation record, not a claim that GitHub-hosted CI has already run.

Passed:

- JavaScript syntax, 96 chapter records, 16 world records, local HTML references and nine third-party file hashes.
- Prettier formatting checks for first-party source, tests, configuration and documentation.
- Six Node.js tests: 96-chapter contract/original lesson hash, 36 item IDs/categories, face crop geometry, absent optional audio behavior, static server confinement/MIME, and complete/incomplete voice-pack imports in a temporary directory.
- Five browser flow tests in one run: all 96 chapters completing and saving without any MP3 request, chapter 18 checkpoint and purchases, gameplay default-key handling, opt-in synthetic video with track shutdown, and permission-denied cartoon fallback.
- One additional browser test after the voice-control UI change: missing recordings are explicitly shown and voice controls are disabled.
- Source/archive hygiene: no production Site identity, machine-specific paths, private saves, credentials, child photos, or original voice MP3s.

The complete browser journey took approximately 2.4 minutes locally. CI allows more time for slower runners. The synthetic camera lifecycle test does not evaluate real-child face-detection accuracy, real hardware permissions, or every browser/OS combination. The bundled model remains unchanged from the existing game and is verified by hash.

The hosted game and its deployment source were not changed while preparing this repository.
