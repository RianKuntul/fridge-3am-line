// The 3AM Fridge Text — entry program (v2).
//
// Writes the one line a smart fridge texts its owner at 3am to
// /output/entry.txt: one line, 1-140 characters, nothing else.
//
// The line: the fridge, awake all night, reports what it witnessed —
// the owner ate the leftovers hidden behind the pickles, standing in
// the dark like a raccoon. Fresh angle: the fridge as a silent witness
// that finally decides to speak — and snitch — not milk, ice, or a
// door left open.
//
// v2 revision: tightened the middle ("standing up, in the dark" ->
// "standing in the dark") and swapped the flat ending "I saw
// everything." for the punchline "I am telling everyone." — the fridge
// stops being a witness and becomes a gossip.
//
// Runner: Node 22 (`node main.ts`). Uses only erasable TypeScript syntax
// so Node's built-in type stripping runs it as-is.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The text. Setup: a 3am update, the leftovers hidden behind the
// pickles are gone. Turn: the owner ate them standing in the dark like
// a raccoon — and the fridge is telling everyone.
const ENTRY_LINE: string =
  "3am update: the leftovers you hid behind the pickles are gone. You ate them standing in the dark like a raccoon. I am telling everyone.";

const MIN_CHARS = 1;
const MAX_CHARS = 140;

function main(): void {
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath: string = join(outDir, "entry.txt");

  // Read-back gate: refuse anything outside 1-140 characters, or
  // anything that is only whitespace or spans more than one line.
  const length: number = [...ENTRY_LINE].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry line is ${length} characters, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (ENTRY_LINE.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (ENTRY_LINE.includes("\n")) {
    throw new Error("entry line must be a single line");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY_LINE, "utf8");
  console.log(`wrote ${length} characters to ${outPath}`);
}

main();
