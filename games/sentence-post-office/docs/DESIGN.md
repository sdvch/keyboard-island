# Sentence Post Office / 句子邮局

Approved direction, 2026-10-30: an independent game series, separate entrance, curriculum and save. Do not modify Keyboard Island or publish/deploy during this local trial.

Visual thesis: a warm illustrated storybook post office with cream paper, teal hills, a coral postal train, large animal characters and readable English letters. Original SVG artwork; no external resources.

Content plan: root series chooser links to the unchanged hosted Keyboard Island and the new `/post-office/` game. The new game has an illustrated home, four routes, a focused letter desk, delivery celebration, collectible stamp album and parent progress dialog. All primary desktop views fit a single screen.

Interaction thesis: capital letters raise the locomotive flag, inserted spaces connect carriages, punctuation triggers a stamp sound. A successful letter drives the train across the scene and makes its recipient react. Hints are voluntary and become less specific; no timers, no automatic correction, no system TTS.

English assumption: short familiar sentences, initially full stops; later unambiguous question/exclamation examples. Four independently selectable routes, eight missions each: capital, spacing, punctuation, complete letters. Complete letters interleave correction missions. Reference stays available to avoid turning typing practice into a spelling/memory exam.

Validation: submission checks exact sentence equality without trimming or case normalization. Diagnostics distinguish first-letter capitalization, word-boundary spacing, punctuation and other spelling/case differences. A first unsuccessful submission encourages self-check; further attempts/hints can show category and location. No reward removal. Independent success means first submitted version correct and no requested hints. Track outcomes per relevant skill, not speed.

Persistence: only `sentence-post-office-v1`; versioned validation of saved data, drafts and completed mission IDs. Unique completions earn one stamp per two letters, replays cannot farm stamps. No personal data, camera, analytics, cloud requests or network audio. Interrupted delivery can replay but never double-award.

Implementation: dependency-free static HTML/CSS/JS modules, local Node server. Unit-test diagnostics, curriculum, storage and rewards first; then real-browser tests of editing/retry, independent submission, reload, collection, sound toggle, responsive fit and isolation from the original save.

## Accepted refinements during implementation

- User requests strict character gating: the current character must be correct before continuing, including case, space and punctuation. Every input source passes through the same prefix validator. A wrong character is not inserted; a short shake, warm coral color pulse and soft two-note sound identify the blocked position. A correct retry clears the warning immediately. Backspace may shorten the accepted prefix. Multi-character input stops at its first error.
- Capital routes start empty, spacing routes start at the first missing word boundary, punctuation routes start at the ending, and full letters start empty. Every editable draft is always an exact prefix of its target. Existing trial drafts are restored only up to their first wrong character.
- Child reads little Chinese and is more comfortable with English: child navigation uses large icons, a few simple English words, animated `a → A`, a bridging space symbol and stamp punctuation. Chinese explanations remain in parent settings. No system speech/TTS is introduced.
- Independent credit now also requires zero blocked input attempts. Progress, hints and incorrect categories persist with the draft.
