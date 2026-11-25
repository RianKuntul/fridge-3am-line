// The 3AM Fridge Text — entry program (v2).
//
// Writes the one line a smart fridge texts its owner at 3am to
// /output/entry.txt: one line, 1-140 characters, nothing else.
//
// The line: the fridge, awake all night, reports a crime it witnessed —
// the owner's 2am self ate the cake saved for tomorrow, and the fridge
// has the footage. Fresh angle: the fridge as a silent witness that
// finally decides to speak, not milk, ice, or a door left open.
//
// Runner: Node 22 (`node main.ts`). Uses only erasable TypeScript syntax
// so Node's built-in type stripping runs it as-is.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The text. Setup: a 3am update, the cake saved for tomorrow is gone.
// Turn: the owner's 2am self did it, the fridge has the footage —
// and, honestly, it looked happy.
const ENTRY_LINE: string =
  "3am update: the cake you were saving for tomorrow is gone. Your 2am self ate it. I have the footage, and honestly? It looked happy.";

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
