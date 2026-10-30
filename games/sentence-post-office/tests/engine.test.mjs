import test from "node:test";
import assert from "node:assert/strict";
import {
  diagnose,
  loadSave,
  completeMission,
  STORAGE_KEY,
  acceptInput,
  initialText,
} from "../public/post-office/engine.js";
import { ROUTES, missionsFor } from "../public/post-office/curriculum.js";

test("accepts only the exact reference, without trimming or case folding", () => {
  assert.deepEqual(diagnose("The cat is happy.", "The cat is happy."), []);
  assert.equal(
    diagnose("the cat is happy.", "The cat is happy.")[0].kind,
    "capital",
  );
  assert.ok(
    diagnose("The cat is happy. ", "The cat is happy.").some(
      (x) => x.kind === "space",
    ),
  );
});
test("distinguishes omitted spaces, punctuation and spelling without false space errors", () => {
  assert.deepEqual(
    diagnose("Thecatis happy", "The cat is happy.").map((x) => x.kind),
    ["space", "punctuation"],
  );
  assert.deepEqual(
    diagnose("The dog is happy.", "The cat is happy.").map((x) => x.kind),
    ["spelling"],
  );
  assert.equal(
    diagnose("The cat is happy?", "The cat is happy.")[0].kind,
    "punctuation",
  );
  assert.equal(
    diagnose("The Cat is happy.", "The cat is happy.")[0].kind,
    "spelling",
  );
  assert.equal(
    diagnose("The cat, is happy.", "The cat is happy.")[0].kind,
    "punctuation",
  );
});
test("every mission has a valid sentence and training seeds contain their intended error", () => {
  const ids = new Set();
  for (const route of ROUTES) {
    const missions = missionsFor(route.id);
    assert.equal(missions.length, 8);
    for (const mission of missions) {
      assert.match(mission.target, /^[A-Z][a-z ]+[.!?]$/);
      assert.equal(ids.has(mission.id), false);
      ids.add(mission.id);
      assert.ok(diagnose(mission.seed, mission.target).length);
      if (route.id !== "letters")
        assert.deepEqual(
          diagnose(mission.seed, mission.target).map((x) => x.kind),
          [route.id],
        );
    }
  }
  assert.equal(ids.size, 32);
});
test("corrupt, future and malformed saves recover without touching the island key", () => {
  assert.notEqual(STORAGE_KEY, "keyboard-island-v1");
  for (const raw of [
    "{",
    "null",
    '{"version":99}',
    '{"version":1,"completed":["fake"],"sound":"yes"}',
  ]) {
    const save = loadSave(raw);
    assert.equal(save.completed.length, 0);
    assert.equal(save.sound, true);
  }
});
test("completion awards once, records first-attempt independence and retains other progress", () => {
  let save = loadSave(null);
  const mission = missionsFor("capital")[0];
  save = completeMission(save, mission, { checks: 1, hints: 0, mistakes: [] });
  assert.equal(save.completed.length, 1);
  assert.equal(save.records[mission.id].independent, true);
  save = completeMission(save, mission, {
    checks: 2,
    hints: 1,
    mistakes: ["capital"],
  });
  assert.equal(save.completed.length, 1);
  assert.equal(save.records[mission.id].independent, true);
  assert.equal(save.records[mission.id].plays, 2);
  assert.equal(save.records[mission.id].lastIndependent, false);
});
test("wrong case, missing space and missing punctuation block the current position", () => {
  assert.deepEqual(acceptInput("", "t", "The cat."), {
    text: "",
    blocked: true,
    index: 0,
    expected: "T",
    received: "t",
  });
  assert.equal(acceptInput("", "h", "The cat.").text, "");
  assert.equal(acceptInput("", "T", "The cat.").text, "T");
  assert.equal(acceptInput("The", "Thec", "The cat.").text, "The");
  assert.equal(acceptInput("The", "The ", "The cat.").text, "The ");
  assert.equal(acceptInput("The cat", "The cat!", "The cat.").text, "The cat");
  assert.equal(acceptInput("The cat", "The cat.", "The cat.").blocked, false);
});
test("multi-character input stops at the first error; deletion of correct suffix is allowed", () => {
  const result = acceptInput("The", "The cat runs?", "The cat runs.");
  assert.equal(result.text, "The cat runs");
  assert.equal(result.expected, ".");
  assert.equal(result.blocked, true);
  assert.equal(acceptInput("The cat", "The ca", "The cat.").text, "The ca");
  assert.equal(acceptInput("The cat", "Te cat", "The cat.").text, "The cat");
});
test("each training start is a correct prefix and previous errors prevent independent credit", () => {
  for (const mission of ROUTES.flatMap((route) => missionsFor(route.id)))
    assert.ok(mission.target.startsWith(initialText(mission)));
  assert.equal(initialText(missionsFor("capital")[0]), "");
  assert.equal(initialText(missionsFor("space")[0]), "The");
  assert.equal(
    initialText(missionsFor("punctuation")[0]),
    "The bear is sleepy",
  );
  const save = completeMission(loadSave(null), missionsFor("letters")[0], {
    checks: 1,
    hints: 0,
    blocked: 1,
    mistakes: ["capital"],
  });
  assert.equal(save.records["letters-1"].independent, false);
});
