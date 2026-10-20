# Optional voice packs

The source release contains **147 Chinese scripts**, reference durations and stable clip IDs in `voices/transcripts.json`. Original demo recordings are intentionally absent.

## Produce a compatible pack

1. Record original speech or use a service whose terms permit your intended use and redistribution. Obtain the speaker's explicit permission. Prefer adult voice actors for a child-facing character.
2. Export one MP3 per ID, e.g. `intro-0.mp3`, `key-F.mp3`, `hands.mp3`. Keep each line short and match the provided script. Reference durations describe the previous pack, not a mandatory length; the player follows actual audio completion.
3. Place all 147 files in one directory. Import them with `node scripts/import-voices.mjs /path/to/pack`.
4. Run the checks and browser tests, then enable voice in the parent settings and listen to opening, manual hint, mistake, completion, mute and navigation transitions.
5. Document the pack's author/producer, source/service, date, license, attribution, consent and permitted redistribution. Do not publish an audio pack until its provenance is established.

`public/voices/**/*.mp3` is git-ignored by default. This protects the source release from accidentally acquiring unreviewed recordings. Intentionally contributing a reviewed pack needs an explicit repository policy change and its license files; do not simply force-add old demo media.

The importer never calls a TTS service, accepts secrets, or changes game progress. It validates file presence/size before copying; it cannot establish permission, prove a voice is original, or validate every MP3 codec. Listen and test the completed pack yourself.
