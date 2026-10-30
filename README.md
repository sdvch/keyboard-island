# Keyboard Island · 键盘小岛

[![CI](https://github.com/shaom/keyboard-island/actions/workflows/ci.yml/badge.svg)](https://github.com/shaom/keyboard-island/actions/workflows/ci.yml)
A gentle typing adventure for children who are just meeting a physical keyboard.

**[中文说明](README.zh-CN.md)** · [Play the hosted demo](https://keyboard-island-doudou.groovy-river-7567.chatgpt.site/) · [Privacy](PRIVACY.md) · [Contributing](CONTRIBUTING.md)

![Keyboard Island home screen](docs/images/home-preview.png)

Help Doudou wake fireflies, repair bridges, deliver letters, play music, and explore new worlds. Every correct key changes the scene. There is no countdown and mistakes never end a game.

## Game series

This repository now contains two independent games. Their websites, courses and browser saves are separate.

| Series                          | Play                                                                                                  | Source and local start                                                                                                   |
| ------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Keyboard Island · 键盘小岛      | [96-chapter adventure](https://keyboard-island-doudou.groovy-river-7567.chatgpt.site/)                | `public/` · `node scripts/serve.mjs`                                                                                     |
| Sentence Post Office · 句子邮局 | [32 English letters](https://sentence-post-office-doudou.groovy-river-7567.chatgpt.site/post-office/) | [games/sentence-post-office](games/sentence-post-office/README.md) · `node games/sentence-post-office/scripts/serve.mjs` |

[Open the illustrated series chooser](https://sentence-post-office-doudou.groovy-river-7567.chatgpt.site/). Sentence Post Office teaches initial capitals, spaces and punctuation with strict character gating, picture-led feedback and 16 collectible stamps. Its child interface uses simple English; parent settings use Chinese. The sections below document the original Keyboard Island game.

## What's included

- **96 chapters across 16 worlds**, with 288 story stages.
- Gradual practice: F/J and the home row → upper/lower rows → numbers → spaces, opposite-hand Shift, Backspace, Enter → short strings and sentences.
- Large illustrated targets, finger guides, musical feedback, stickers, and collectible badges.
- **36 room decorations** in six categories. Purchased items can be swapped for free.
- A free music playground.
- An optional live diver character: local face detection enlarges and follows a face inside a cartoon helmet. Camera access is off until explicitly enabled.
- Browser-local progress, per-key practice history, sound settings, and checkpoint recovery.

**Documentation is bilingual; the game interface, stories and voice scripts are currently Simplified Chinese.** Pinyin chapters practice Latin letters; they do not teach Chinese IME candidate selection. A physical QWERTY keyboard is recommended. Mobile layouts are provided, but the adventure is not designed around a touch keyboard.

## Quick start

Use **Node.js 20+**. No package installation or build step is needed to play:

```sh
node scripts/serve.mjs
```

Open **http://127.0.0.1:4173/**. To choose another port:

```sh
node scripts/serve.mjs --port 4180
```

Alternatively, serve the `public/` directory with any static HTTP server:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory public
```

Use HTTP on localhost or HTTPS when hosting. Opening `index.html` as `file://` is not supported for the camera worker and model loading. Camera permission and browser support are required only for the optional live character; the cartoon version works without a camera.

## Audio in this open-source edition

The synthesized **music and game sound effects are included** and run locally through Web Audio.

The original demo's prerecorded voice MP3s are **not included**: their service-specific redistribution rights have not been established. All **147 dialogue transcripts**, IDs and reference timings are available in [docs/voices/transcripts.json](docs/voices/transcripts.json). Without recordings, the game makes no voice-file requests and remains playable. There is no automatic system-TTS or cloud-TTS fallback.

To install a complete voice pack that you have permission to use:

```sh
node scripts/import-voices.mjs /absolute/path/to/authorized-mp3-directory
```

Name each file after a transcript ID, for example `intro-0.mp3` and `key-F.mp3`. The importer validates that all IDs are present, copies the files and generates the playback manifest. Enable voice in the game's parent settings afterward. The actual audio ending controls playback; reference timings do not cut recordings short. See [Voice packs](docs/VOICE_PACKS.md) before redistributing an audio pack.

The hosted demo is a separate deployment; the repository license does not grant rights to download or redistribute its recordings.

## Progress and privacy

Progress lives in `localStorage` under **`keyboard-island-v1`**. The same browser profile and origin retain progress after closing the tab or browser. A different scheme, hostname or port has a separate save. Private browsing, clearing site data, or browser storage policies may remove it. There is no account, cloud sync, save export/import, or full-reset UI in this release; completed chapters can be replayed from the map.

The camera requests **video only**, never the microphone. The bundled MediaPipe runtime and model run in a local worker; video is cropped into an in-memory canvas. The application does not record, encode, upload, or persist camera frames or face geometry. Leaving the mode, hiding the page, pressing Esc, or explicitly closing the camera stops it. [Read the complete privacy notes](PRIVACY.md).

The app code contains no analytics or advertising. A hosting provider can still receive ordinary HTTP access logs; that is outside the game's browser-local storage model.

## Development

```sh
npm ci
npm run check
npm test
npx playwright install chromium
npm run test:e2e
```

`check` verifies syntax, curriculum structure, local runtime references and SHA-256 hashes of bundled third-party files. Unit tests cover curriculum compatibility, voice-manifest handling, face-crop geometry and the static server. Browser tests cover the full journey, old checkpoints, keyboard defaults, room purchases and camera lifecycle using synthetic video. The full journey takes a few minutes. They do not access your real camera or use a child's photograph.

```sh
npm run format:check
npm run format
```

Formatting excludes the unmodified third-party runtime. CI runs checks, tests, formatting and browser smoke/flow tests on Linux. To use an existing Chromium locally, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable path.

## Project layout

```text
public/                 Static game; deploy this directory
  chapters.js           Append-only curriculum IDs and content
  app.js                Navigation, keyboard input, progress, rewards
  artwork.js            Original SVG characters and illustrations
  scenes.js             Original scene mechanics
  expansion-scenes.js   Additional world scenes
  room.js               Decoration catalog and equipped items
  sound.js              Local Web Audio music and effects
  voice.js              Optional audio scheduling and music ducking
  voice-clips.js        Voice metadata; URLs are null by default
  diver.js              Camera permission and diver gameplay
  face-camera.js        Smoothed cropping and worker lifecycle
  face-worker.js        Local detection; returns geometry only
  vendor/               Pinned MediaPipe runtime/model + license
scripts/                Development server, validation, voice importer
tests/                  Node.js unit/contract tests
e2e/                    Playwright browser tests
docs/                   Architecture, curriculum, transcripts, provenance
```

There is no backend, database, production framework dependency, bundler, or required API key. The camera assets are bundled so the game does not fetch a CDN or inference service at runtime.

## Deploy

Upload **the contents of `public/`** to any HTTPS static host. Set `public` as the publish directory; no build command is required. Keep the same origin across updates to preserve browser-local saves. If the site is embedded, the embedding page and browser policy must allow camera access. Native permission prompts cannot be bypassed by this game.

No OpenAI Sites identifiers, repository credentials, personal saves, or deployment history are part of this project. See [Architecture](docs/ARCHITECTURE.md), [the Chinese curriculum catalog](docs/curriculum/README.zh-CN.md), and [the release checklist](docs/RELEASING.md).

## Contribute and license

Useful contributions include accessibility improvements, original illustrations, more varied scenes, localization, browser compatibility, and recordings with explicit redistribution permission. Please start with [CONTRIBUTING.md](CONTRIBUTING.md).

First-party source, original SVG artwork, stories, scripts and documentation are **MIT licensed**. AI-assisted code and artwork were used during development. Third-party components keep their own licenses; the MediaPipe runtime and BlazeFace model are Apache-2.0. Emoji appearance depends on the platform's fonts. See [LICENSE](LICENSE) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
