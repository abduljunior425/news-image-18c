// Diplomacy Day — news-image-20261118, entry 3.
// Writes the map-led front page beside this file to the output directory.
// Node standard library only; no network, no dependencies, no randomness,
// so the two grader runs produce byte-identical output.
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const input = join(root, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const output = join(outputDir, "entry.png");

function digest(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

// Read once, write once, then prove the copy is exact by hash.
const image = readFileSync(input);
const expected = digest(image);

mkdirSync(outputDir, { recursive: true });
writeFileSync(output, image);

const written = readFileSync(output);
const actual = digest(written);
if (actual !== expected) {
  throw new Error(
    `entry.png digest mismatch: wrote sha256 ${actual}, expected ${expected}`,
  );
}
console.log(`wrote ${output} (${written.length} bytes, sha256 ${actual})`);
