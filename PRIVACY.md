# Privacy and camera behavior

## Stored data

The game uses browser `localStorage`, key `keyboard-island-v1`, for completed chapters, checkpoint/typed progress, per-key success/error counts, rewards, owned/equipped room decorations, stickers, play duration, and preferences. There is no name, account, email, advertising ID, or device fingerprint field.

The save is local to a browser profile and origin. It is not encrypted against other software or users with access to that browser profile. There is no cloud sync or automatic backup. Browser settings can clear it; this release has no full-reset or export/import UI.

## Camera

1. The default character is a cartoon. No camera is requested on page load or when merely entering diver mode.
2. Clicking the camera button invokes `getUserMedia` with `audio: false` and video constraints.
3. The browser displays its own permission prompt. The game cannot bypass it.
4. Video is drawn into an in-memory canvas. A local worker runs the bundled MediaPipe model and returns bounding-box geometry to the page for smoothing/cropping.
5. Frames are not recorded, serialized for upload, sent to a remote inference API, or written to browser storage. The code performs face detection, not identification.
6. Camera tracks stop on explicit close, leaving the mode, page hiding, Esc, or page unload. The worker is terminated on camera stop. A stream arriving after the player has left is immediately stopped.
7. If permissions or detection fail, cartoon play or centered manual cropping remains available.

The face model and runtime are served as static assets from the same host. The project does not require Google, Microsoft, or another model CDN during play. Your host can receive standard HTTP logs for loading those static files; it does not receive camera frames from this application.

## Other network traffic

First-party game code contains no analytics, advertising, account requests, telemetry endpoint, or cloud-TTS fallback. The optional voice pack is played as same-origin static files. Browser extensions, operating-system services and hosting-provider logs are outside this application's control.

## For families and contributors

Have a parent or guardian help with camera permission. Keep faces and private saves out of public bug reports. Testing in this repository uses synthetic media; it never needs access to a child's camera or personal data.

## 中文摘要

进度只保存在当前浏览器的 `localStorage`。摄像头默认关闭，主动点击并允许后才使用，只请求视频，不请求麦克风；人脸检测和画面裁切在本机运行，不录像、不上传、不保存画面或人脸坐标。退出体验、隐藏页面、按 Esc 或关闭摄像头会停止视频轨道和 Worker。游戏没有账号、云同步、广告或统计追踪；托管服务仍可能记录普通网页请求日志。请不要把孩子照片、录音或私人存档提交到公开问题中。
