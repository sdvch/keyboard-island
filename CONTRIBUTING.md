# Contributing

Thank you for helping make keyboard practice welcoming and playful.

## Start locally

Use Node.js 20+. Run `npm ci`, then `npm run dev`. The interface is currently Chinese; documentation changes and localization contributions are welcome. Please describe the concrete interaction before proposing a large redesign.

Before submitting a pull request:

```sh
npm run check
npm test
npm run format:check
npx playwright install chromium
npm run test:e2e
```

For a camera change, test permission denial, camera-in-use errors, closing/navigating away, hidden tabs, delayed permission resolution, and model-loading failure. Use synthetic video or an adult contributor's explicitly consented footage locally. Never commit a child's face or a user's save.

## Keep existing progress compatible

- Append chapters to `CHAPTERS`. Do not reorder or renumber existing IDs.
- Keep the storage key `keyboard-island-v1` unless a tested migration is supplied.
- Keep decoration IDs stable; renamed labels must not invalidate purchases.
- Do not add speed penalties, lives, or time pressure without discussing the learning impact.
- Browser/OS shortcuts and real keyboard accessibility must continue to work outside active gameplay.

## Keep the project easy to run

Production is buildless HTML/CSS/JavaScript. Avoid adding a framework, backend, analytics, cloud inference, or a required API key for a small feature. Format first-party code with Prettier; do not reformat or patch vendored third-party files without a documented dependency update.

Include a focused browser test for keyboard handling, reward/accounting, save recovery, or camera lifecycle changes. A documentation-only change does not need a new test. Explain the change, why it helps a player, and what you verified.

## Artwork, audio, and licensing

Submit only work you may license under the project's MIT terms or an explicitly documented compatible asset license. Disclose AI-assisted assets and keep their provenance clear. Do not copy commercial game graphics, font files, voices, or recordings from the hosted demo. Voice contributions need explicit redistribution permission; see [Voice packs](docs/VOICE_PACKS.md).

By contributing, you agree to license your first-party contribution under this repository's MIT license. Third-party notices remain with their respective components.

## Communicating

Be kind, specific, and patient. Critique code or interaction design, not people. Do not post personal details, children's images, recordings, exact names, or browser save files in issues. For security concerns, follow [SECURITY.md](SECURITY.md).
