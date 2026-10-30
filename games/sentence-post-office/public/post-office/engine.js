import { ALL_MISSIONS, ROUTES } from "./curriculum.js";
export const STORAGE_KEY = "sentence-post-office-v1";
const validIds = new Set(ALL_MISSIONS.map((m) => m.id));
const kinds = ["capital", "space", "punctuation", "spelling"];
const fresh = () => ({
  version: 1,
  sound: true,
  music: true,
  volume: 0.55,
  completed: [],
  records: {},
  route: "capital",
  index: 0,
  draft: null,
});

export function initialText(mission) {
  if (mission.routeId === "space")
    return mission.target.slice(0, mission.target.indexOf(" "));
  if (mission.routeId === "punctuation") return mission.target.slice(0, -1);
  return "";
}

// Native keyboard/IME/paste input goes through the same gate. Never skip an error.
export function acceptInput(previous, proposed, target) {
  let index = 0;
  while (index < proposed.length && proposed[index] === target[index]) index++;
  const blocked = index < proposed.length;
  return {
    text: blocked
      ? index >= previous.length
        ? proposed.slice(0, index)
        : previous
      : proposed,
    blocked,
    index,
    expected: target[index] || "",
    received: proposed[index] || "",
  };
}

export function diagnose(input, target) {
  if (input === target) return [];
  const issues = [];
  const actual = input.trim();
  const letters = (value) => value.replace(/[^a-z]/gi, "");
  const sameLetters =
    letters(actual).toLowerCase() === letters(target).toLowerCase();
  if (
    actual &&
    actual[0] !== target[0] &&
    actual[0].toUpperCase() === target[0]
  ) {
    issues.push({
      kind: "capital",
      index: input.indexOf(actual[0]),
      text: "看看第一个字母，它需要大写。",
    });
  }
  const wordShape = (value) => value.replace(/[^a-z ]/gi, "").toLowerCase();
  if (
    (sameLetters && wordShape(input) !== wordShape(target)) ||
    /^\s|\s$| {2}|[\r\n\t]/.test(input)
  ) {
    let index = 0;
    while (
      index < target.length &&
      input[index]?.toLowerCase() === target[index].toLowerCase()
    )
      index++;
    issues.push({
      kind: "space",
      index,
      text: "单词之间留一个空格，标点前后不多留。",
    });
  }
  const punctuation = (value) => (value.match(/[^a-z\s]/gi) || []).join("");
  if (
    actual.at(-1) !== target.at(-1) ||
    punctuation(actual) !== punctuation(target)
  ) {
    issues.push({
      kind: "punctuation",
      index: Math.max(
        0,
        input.trimEnd().length - (/[.!?]$/.test(actual) ? 1 : 0),
      ),
      text: `看看句子的结尾，要用 ${target.at(-1)} 印章。`,
    });
  }
  if (!sameLetters || letters(actual).slice(1) !== letters(target).slice(1)) {
    let index = 0;
    while (index < target.length && input[index] === target[index]) index++;
    issues.push({
      kind: "spelling",
      index,
      text: "对照上面的来信，看看字母有没有少写或写错。",
    });
  }
  return issues;
}

export function loadSave(raw) {
  const base = fresh();
  if (!raw) return base;
  try {
    const value = JSON.parse(raw);
    if (
      !value ||
      value.version !== 1 ||
      !Array.isArray(value.completed) ||
      typeof value.sound !== "boolean" ||
      !value.records ||
      typeof value.records !== "object"
    )
      return base;
    base.completed = [
      ...new Set(value.completed.filter((id) => validIds.has(id))),
    ];
    for (const id of base.completed) {
      const record = value.records[id];
      if (!record || typeof record !== "object") continue;
      base.records[id] = {
        independent: record.independent === true,
        lastIndependent: record.lastIndependent === true,
        plays: Math.min(
          99999,
          Math.max(1, Math.floor(Number(record.plays) || 1)),
        ),
        mistakes: Array.isArray(record.mistakes)
          ? [...new Set(record.mistakes.filter((k) => kinds.includes(k)))]
          : [],
      };
    }
    base.sound = value.sound;
    base.music = value.music !== false;
    base.volume =
      typeof value.volume === "number" && Number.isFinite(value.volume)
        ? Math.max(0, Math.min(1, value.volume))
        : base.volume;
    base.route = ROUTES.some((r) => r.id === value.route)
      ? value.route
      : base.route;
    base.index =
      Number.isInteger(value.index) && value.index >= 0 && value.index < 8
        ? value.index
        : 0;
    const draft = value.draft;
    if (
      draft &&
      validIds.has(draft.id) &&
      typeof draft.text === "string" &&
      draft.text.length <= 180
    ) {
      base.draft = {
        id: draft.id,
        text: draft.text,
        checks: Math.max(0, Math.floor(Number(draft.checks) || 0)),
        hints: Math.max(0, Math.floor(Number(draft.hints) || 0)),
        blocked: Math.max(0, Math.floor(Number(draft.blocked) || 0)),
        mistakes: Array.isArray(draft.mistakes)
          ? draft.mistakes.filter((k) => kinds.includes(k))
          : [],
      };
    }
    return base;
  } catch {
    return base;
  }
}

export function completeMission(save, mission, attempt) {
  const previous = save.records[mission.id];
  const independent =
    attempt.checks === 1 && attempt.hints === 0 && !attempt.blocked;
  return {
    ...save,
    completed: [...new Set([...save.completed, mission.id])],
    draft: null,
    records: {
      ...save.records,
      [mission.id]: {
        independent: independent || previous?.independent === true,
        lastIndependent: independent,
        plays: (previous?.plays || 0) + 1,
        mistakes: [
          ...new Set([...(previous?.mistakes || []), ...attempt.mistakes]),
        ],
      },
    },
  };
}
