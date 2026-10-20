# Architecture

## Runtime

`public/index.html` loads classic scripts in a deliberate order. The application uses shared lexical globals; there is no framework runtime or module bundler. Preserve script ordering when adding files. `app.js` owns navigation, keyboard events and persistent state. Views produce HTML and `render()` replaces the main view. Timers, audio and camera sessions must be cancelled when a player leaves their owning view.

`chapters.js` declares 96 stable, zero-based IDs in 16 six-chapter worlds. Each chapter has three phases and arrays of normalized input tokens. `makeSequence()` normally flattens them; one review chapter adapts to the local practice history. Ordinary letters are `A`–`Z`; an explicit uppercase target is `SHIFT+A`, etc. Space, backspace and return use `SPACE`, `BACKSPACE`, `ENTER`. Punctuation uses its literal character.

## Input and progression

The game maps physical `KeyboardEvent.code` values to targets. Ctrl, Meta and Alt combinations are excluded from game input. A capital target requires the opposite-side Shift to be held. Recognized gameplay keys cancel browser defaults so Space/Enter/Backspace do not scroll, activate a focused button, or navigate. Native OS shortcuts, extensions, browser chrome, IMEs and non-QWERTY layouts have separate constraints; the app does not intercept every system action.

Correct input updates the scene, plays an effect, records per-key results and writes a checkpoint. Phase animations briefly lock further input. Completing a chapter awards a first-clear or replay reward, records best stars, clears the checkpoint and offers the next chapter. Rewards are not tied to speed.

Do not change existing chapter IDs or sequences without a checkpoint migration. New content is appended. Room item IDs similarly survive label or visual changes. `roomLayout` is derived from old purchased item IDs when missing; each category equips one purchased item.

## Audio

`sound.js` builds Web Audio effects/music locally with separate mix buses. `voice.js` schedules short optional clips, invalidates stale requests, avoids a queue, and ducks music until actual playback ends. A null `VOICE_CLIPS[id].url` is a supported state and causes no audio request. Transcripts remain available independently of recordings. Runtime code never invokes a cloud speech service.

## Camera

`diver.js` owns permission and the media stream. `face-camera.js` renders mirrored crops and terminates the worker on stop. `face-worker.js` dynamically loads the local MediaPipe bundle/model, performs CPU inference, and reports geometry. A supplementary crop scan helps detect smaller faces; the main thread smooths center/size changes. There is also manual zoom and a no-model/no-camera path.

Generation tokens prevent an async model result or delayed permission response from reviving a closed camera session. Camera frames are ephemeral and are never included in save state. Keep the same no-recording/no-upload behavior in contributions.

## Dependencies and deployment

Production consists solely of `public/`. MediaPipe files are bundled, pinned and hash-checked; no CDN is required during play. The development server is a small Node.js HTTP server bound to loopback. CI/dev dependencies are isolated in `package.json`. A static HTTPS host can serve the project without Node.js in production.

Changing a deployment origin starts a new browser-local save; updating files at the same origin preserves existing saves. This source release intentionally contains no production Site identity or source repository history.
