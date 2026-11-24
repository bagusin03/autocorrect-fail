// Funniest Autocorrect Fail entry for make.fun
// "u-zeroxfive-funniest-autocorrect-fail-ddf82154".
// Writes exactly one line (under 200 characters) to /output/entry.txt:
// a single autocorrect fail and nothing else.
// Fully offline and deterministic: no network, no clock, no randomness,
// no environment reads. The fail is a fixed string literal below.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const FAIL =
  "I meant to text my friend 'Good luck on your exam!' but autocorrect sent 'Good luck on your exorcism!' She's still not talking to me.";

// Gate guard: the sealed scorer only accepts UTF-8 text of 1-199 characters,
// a single line, not only whitespace. Refuse to write anything else.
// Also refuse carriage returns, and sanity-check that the fail actually
// contains both the intended word and the wrong word it turned into.
if (
  FAIL.length < 1 ||
  FAIL.length > 199 ||
  FAIL.trim().length === 0 ||
  FAIL.includes("\n") ||
  FAIL.includes("\r") ||
  !FAIL.includes("exam") ||
  !FAIL.includes("exorcism")
) {
  throw new Error("fail line fails the 1-199 character single-line gate");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", FAIL, "utf8");

// Verify the exact bytes that were written, so a partial or altered write
// is caught here instead of at the sealed scorer.
if (readFileSync("/output/entry.txt", "utf8") !== FAIL) {
  throw new Error("written entry.txt does not match the fail line");
}
