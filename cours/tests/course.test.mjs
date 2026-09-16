import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import vm from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const context = vm.createContext({ window: {} });
for (const name of ["course.js", "speaker-notes.js"]) {
  vm.runInContext(readFileSync(resolve(root, name), "utf8"), context, { filename: name });
}
const course = context.window.COURSE;
const notes = context.window.SPEAKER_NOTES;
const slides = course.lessons.flatMap(l => l.slides);

test("Every sequence has a unique routable identifier and a complete conductor", () => {
  const ids = slides.map(s => s.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(Object.keys(notes).sort(), [...ids].sort());
  for (const slide of slides) {
    assert.match(slide.id, /^[a-z][a-z0-9-]*$/);
    for (const key of ["title", "lead", "kind", "takeaway"]) assert.ok(slide[key]?.trim(), slide.id + ":" + key);
    assert.ok(Number.isInteger(slide.minutes) && slide.minutes > 0);
    for (const key of ["goal", "question", "answer", "pitfall", "transition"]) assert.ok(notes[slide.id][key]?.trim(), slide.id + ":" + key);
    for (const key of ["say", "demo"]) {
      assert.ok(notes[slide.id][key].length > 0);
      assert.ok(notes[slide.id][key].every(text => typeof text === "string" && text.trim()));
    }
  }
});

test("All visual structures can be rendered without missing fields", () => {
  for (const slide of slides) {
    const visual = slide.visual;
    assert.ok(["cards", "flow", "table", "code", "quiz"].includes(visual.type));
    if (["cards", "flow"].includes(visual.type)) {
      assert.ok(visual.items.length > 0);
      assert.ok(visual.items.every(row => row.length === 2 && row.every(text => typeof text === "string" && text.length)));
    } else if (visual.type === "table") {
      assert.ok(visual.headers.length > 1);
      assert.ok(visual.rows.every(row => row.length === visual.headers.length));
    } else if (visual.type === "code") {
      assert.ok(visual.code.length && visual.label.length);
    } else {
      assert.ok(visual.questions.length > 0);
    }
  }
});

test("Pinned repository sources and all lesson references exist", () => {
  assert.match(course.revision, /^[0-9a-f]{40}$/);
  for (const source of Object.values(course.sources)) assert.ok(existsSync(resolve(root, "..", source.path)), source.path);
  for (const lesson of course.lessons) {
    assert.ok(lesson.slides.length);
    for (const key of lesson.sources) assert.ok(course.sources[key], key);
  }
});

test("Audience and landing page never import oral notes; teacher does", () => {
  for (const name of ["index.html", "audience.html"]) {
    const html = readFileSync(resolve(root, name), "utf8");
    assert.ok(!html.includes("speaker-notes.js"));
    assert.ok(!html.includes("SPEAKER_NOTES"));
  }
  assert.ok(readFileSync(resolve(root, "teacher.html"), "utf8").includes('src="speaker-notes.js"'));
});

test("All HTML scripts, stylesheets and icons are local existing files", () => {
  for (const name of ["index.html", "audience.html", "teacher.html"]) {
    const html = readFileSync(resolve(root, name), "utf8");
    for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
      assert.ok(!match[1].startsWith("http"), "Unexpected remote dependency");
      assert.ok(existsSync(resolve(root, match[1])), match[1]);
    }
  }
});

test("The browser application is valid JavaScript", () => {
  assert.doesNotThrow(() => new vm.Script(readFileSync(resolve(root, "app.js"), "utf8")));
});
