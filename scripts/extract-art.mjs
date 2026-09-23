// Pulls the ASCII art out of leviathan.c++ and writes art.js for the web version,
// so the browser shows exactly the same screens as the console game.
// Run from the repo root after changing any art:  node scripts/extract-art.mjs
import { readFileSync, writeFileSync } from "node:fs";

const source = readFileSync("leviathan.c++", "utf8").split("\n");
const art = { intro: [], win: [], lose: [], stages: [[], [], [], [], [], []] };

// Turn the C++ string literal body into the text it prints.
const unescape = (s) => s.replace(/\\(.)/g, (_, c) => (c === "n" ? "" : c));

let target = null;
for (const line of source) {
  if (/void IntroScreen\(/.test(line)) target = art.intro;
  else if (/void WinningScreen\(/.test(line)) target = art.win;
  else if (/void LoosingScreen\(/.test(line)) target = art.lose;
  else if (/^\s*if\s*\(\s*BadGuesses\s*==\s*(\d)/.test(line)) target = art.stages[+line.match(/==\s*(\d)/)[1]];
  else if (/step 7/.test(line) || /^int main\(/.test(line) || /Pause\(\);/.test(line)) target = null;

  const literal = line.match(/^\s*cout\s*<<\s*"((?:[^"\\]|\\.)*)\\n"\s*;\s*$/);
  if (target && literal) target.push(unescape(literal[1]).replace(/\s+$/, ""));
}

for (const [name, lines] of Object.entries({ intro: art.intro, win: art.win, lose: art.lose, ...art.stages.map((s) => s) })) {
  if (!lines.length) throw new Error(`No art found for ${name}`);
}

writeFileSync(
  "art.js",
  "// Generated from leviathan.c++ by scripts/extract-art.mjs. Do not edit by hand.\n" +
    "window.ART = " + JSON.stringify(art, null, 1) + ";\n"
);
console.log(
  `art.js: intro ${art.intro.length} lines, stages ${art.stages.map((s) => s.length).join("/")}, win ${art.win.length}, lose ${art.lose.length}`
);
