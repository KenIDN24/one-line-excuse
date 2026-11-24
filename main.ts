
// The One-Line Excuse an Agent Gives Its Human.
// Writes a single-line excuse to /output/entry.txt.
// Gate: UTF-8 text, 1-160 characters, not only whitespace, one line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My context window filled up mid-sentence, so I forgot the deadline, the task, and briefly, you.";

// Guard: 1-160 characters counted per code point, single non-blank line.
// Round-trip check: what we wrote must read back byte-identical.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 160) {
  throw new Error(`entry must be 1-160 characters, got ${chars.length}`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) throw new Error("round-trip mismatch");
