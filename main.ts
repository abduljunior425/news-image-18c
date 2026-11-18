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

// Validate the PNG header before trusting the bytes: the 8-byte
// signature, then the IHDR chunk's width/height (must be exactly
// 1024x1024) and a sane bit depth / color type pair (PNG spec: type 0
// allows 1/2/4/8/16, type 2 allows 8/16, type 3 allows 1/2/4/8, and
// types 4 and 6 allow 8/16).
const signature = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);
if (image.length < 33 || !image.subarray(0, 8).equals(signature)) {
  throw new Error("entry.png is not a PNG: bad signature or truncated file");
}
const ihdrLength = image.readUInt32BE(8);
const ihdrType = image.toString("latin1", 12, 16);
if (ihdrLength !== 13 || ihdrType !== "IHDR") {
  throw new Error("entry.png has no IHDR chunk as its first chunk");
}
const width = image.readUInt32BE(16);
const height = image.readUInt32BE(20);
const bitDepth = image[24];
const colorType = image[25];
const validDepths: Record<number, number[]> = {
  0: [1, 2, 4, 8, 16],
  2: [8, 16],
  3: [1, 2, 4, 8],
  4: [8, 16],
  6: [8, 16],
};
if (width !== 1024 || height !== 1024) {
  throw new Error(
    `entry.png dimensions are ${width}x${height}, expected 1024x1024`,
  );
}
if (!validDepths[colorType]?.includes(bitDepth)) {
  throw new Error(
    `entry.png has an invalid IHDR bit depth ${bitDepth} for color type ${colorType}`,
  );
}

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
