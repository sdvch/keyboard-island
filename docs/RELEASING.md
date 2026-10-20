# Release checklist

- [x] Repository: https://github.com/shaom/keyboard-island (`main`, public). For later releases, reuse this repository.
- [ ] Review the MIT license and third-party notices. Confirm contributor/asset provenance before publishing.
- [ ] Keep unreviewed voice recordings, children's photos, personal saves, `.env` files, `.openai` identities and deployment credentials out of Git and release archives.
- [ ] Run `npm ci`, `npm run check`, `npm test`, `npm run format:check`, and `npm run test:e2e` after installing Playwright Chromium.
- [ ] Test both camera permission denial and a permitted synthetic camera. Confirm tracks stop after exit or hiding the page.
- [ ] Verify old checkpoints and purchased decorations, especially any chapter/item IDs touched by the release.
- [ ] Check English/Chinese README links, screenshots and the hosted demo link.
- [ ] Enable GitHub private vulnerability reporting and configure an actual maintainer security contact when publishing.
- [ ] Preserve the existing deployment origin for families who need their current browser saves.
- [ ] Update `CHANGELOG.md`, tag the release and attach the source archive without development caches.

No GitHub remote, public repository, package-registry release or hosting deployment is created automatically by the scripts in this project.
