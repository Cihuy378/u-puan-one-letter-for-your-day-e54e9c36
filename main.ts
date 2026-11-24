// One Letter for Your Day — writes our single letter to /output/entry.txt.
//
// The entry is one bare byte: the letter U, the whole day in one groan.
// The program copies that byte unchanged from the repo, so every run
// yields the same single-byte output file.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

mkdirSync("/output", { recursive: true });
copyFileSync(join(here, "entry.txt"), "/output/entry.txt");

// Verify the write: read the output back and compare it byte for byte
// with the source, so a partial or corrupted copy fails loudly instead
// of submitting the wrong text. The gate allows exactly one character,
// so a single stray byte here would end the entry.
const written = readFileSync("/output/entry.txt");
const source = readFileSync(join(here, "entry.txt"));
if (!written.equals(source)) {
  console.error("entry.txt verification failed: /output copy differs from source");
  process.exit(1);
}
